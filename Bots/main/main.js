const BotManager = require('../../global_modules/bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/bot-manager/Command');
const { Event } = require('../../global_modules/bot-manager/Event');
const { DateTime } = require("../../global_modules/bot-manager/DateTime");

// 기본 유틸 함수들
FileStream.writeObject = (path, data) => FileStream.write(path, JSON.stringify(data));
FileStream.readObject = (path, defaultValue={}) => JSON.parse(FileStream.read(path) ?? JSON.stringify(defaultValue));

// 저장 경로
const paths = {
	users: "/sdcard/msgbot/users.json",
	channels: "/sdcard/msgbot/channels.json"
};

// 유저, 채널 데이터베이스 관리 객체
const db = {
	users: FileStream.readObject(paths.users),
	channels: FileStream.readObject(paths.channels, { i2c: {}, c2i: {} }),
	userReload: (user, channel) => {
		// user.id, channel.id 도 string 타입
		db.users[user.id] = {
			name: user.name,    // 카톡 이름
			nth: Number(channel.name)   // 기수
		};
	},
	channelReload: channel => {
		db.channels.i2c[channel.id] = channel.name;
		db.channels.c2i[channel.name] = channel.id;
	}
};

// db.channels: object[string, string] -> rooms: object[string, Channel] 변환
const studentRooms = {};   // 기수방만 분리
const rooms = {};
const isStudentRoom = name => /^\d+$/.test(name);

for (let [ name, id ] of Object.entries(db.channels.c2i)) {
	if (isStudentRoom(name))
		studentRooms[name] = BotManager.getChannelById(id);
	rooms[name] = BotManager.getChannelById(id);
}

// db 갱신
bot.on(Event.MESSAGE, (chat, channel) => {
	// 기수 톡방 및 톡방 내 학생들 추가
	if (!(channel.id in db.channels.i2c) && isStudentRoom(channel.name)) {
		db.channelReload(channel);
		FileStream.writeObject(paths.channels, db.channels);
		
		channel.members.forEach(user => db.userReload(user, channel));
		FileStream.writeObject(paths.users, db.users);
	}
	
	// 이름 변경 적용
	if (chat.user.id in db.users && (db.users[chat.user.id].name !== chat.user.name)) {
		db.users[chat.user.id].name = chat.user.name;
		FileStream.writeObject(paths.users, db.users);
	}
});

// 급식 명령어
const getMeals = dt => {
	const options = [
		["ATPT_OFCDC_SC_CODE", "F10"],
		["SD_SCHUL_CODE", 7380031],
		["MLSV_YMD", dt.toString('YYMMDD')],
		["Type", "json"],
	];
	
	const data = JSON.parse(org.jsoup.Jsoup.connect(
		`https://open.neis.go.kr/hub/mealServiceDietInfo?${options.map(opt => opt.join('=')).join('&')}`
	).get().text());
	
	// 순서대로 아침, 점심, 저녁
	return [0, 1, 2].map(i =>
		data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"]
			.replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim()
	);
}

bot.addCommand(new NaturalCommand.Builder()
	.setName('급식')
	.setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.\n' +
		'또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.')
	.setExamples('오늘 밥', '모레 급식', '급식 저녁', '내일 점심 밥', '...등 자유로운 형태')
	.setQuery({ meal: 'empty', datetime: () => DateTime.now() })
	.setUseDateParse(true)
	.setExecute((self, chat, channel, { meal, datetime }) => {
		// '아침 뭐냐' 에서 '뭐냐' 를 제거해서 원본 메시지에서 date parse 한 부분만을 얻는 작업
		const dateString = chat.rawText.replace(chat.text, '').trim();
		
		// '아침', '점심', '저녁' 으로도 급식 명령어로 인식하게 함.
		if (!(meal === 'empty' && (dateString === '아침' || dateString === '점심' || dateString === '저녁')))
			return;
		
		const meals = getMeals(datetime);
		
		if (datetime.lt({ hour: 8, minute: 30}))
			channel.send(`🍚 ${datetime.humanize(true)} 아침 급식\n—————\n${meals[0]}`);
		else if (datetime.lt({ hour: 13, minute: 30 }))
			channel.send(`🍚 ${datetime.humanize(true)} 점심 급식\n—————\n${meals[1]}`);
		else if (datetime.lt({ hour: 19, minute: 30}))
			channel.send(`🍚 ${datetime.humanize(true)} 저녁 급식\n—————\n${meals[2]}`);
		else
			channel.send(`🍚 ${datetime.humanize(true)} 급식\n—————\n[아침]\n${meals[0]}\n\n[점심]\n${meals[1]}\n\n[저녁]\n${meals[2]}`);
	})
	.setCronJob({
		'오늘': '0 0 * * *',
		'점심': '40 11 * * *',
		'저녁': '20 16 * * *'
	},
	(self, tag) => {
		const dt = DateTime.now();
		const meals = getMeals(dt);
		
		let msg;
		if (tag === '오늘')
			msg = `🍚 ${dt.humanize(true)} 급식\n—————\n[아침]\n${meals[0]}\n\n[점심]\n${meals[1]}\n\n[저녁]\n${meals[2]}`;
		else if (tag === '점심')
			msg = `🍚 ${dt.humanize(true)} 점심 급식\n—————\n${meals[1]}`;
		else if (tag === '저녁')
			msg = `🍚 ${dt.humanize(true)} 저녁 급식\n—————\n${meals[2]}`;
		
		for (let 기수 in studentRooms)
			studentRooms[기수].send(msg);
	})
	.build()
);

// 공지 명령어
bot.addCommand(new StructuredCommand.Builder()
	.setName('공지')
	.setDescription("학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n" +
		"명령어를 작성한 뒤, 메시지를 한 번 더 보내세요. 그 메시지 내용을 공지 메시지로 처리합니다.\n" +
		"두 번째 메시지로 '취소'라고 보낼 경우 공지 명령어가 중단됩니다.")
	.setUsage("<부서:str length=3> 알림 <기수:int[]? min=39>")
	.setChannels(rooms['공지방'])
	.setExamples('생체부 알림\n기숙사 3월 기상곡입니다 ...', '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...')
	.setExecute((self, chat, channel, args) => {
		if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
			channel.send(`${args.부서}는 적절한 부서가 아닙니다.\n가능한 부서: 학생회, 생체부, 환경부, 통계부, 문예부, 체육부, 홍보부, 정책부, 정보부, 총무부`);
			return;
		}
		
		if (args.기수.length === 0) {
			// Math.max(...['29', '30', '31']) = 31 나옴. 놀랍게도 문자열 배열도 작동함.
			const max = Math.max(...Object.keys(studentRooms));
			args.기수 = [max, max - 1, max - 2];
		}
		
		channel.send(`${chat.user.name}님, ${args.기수.join(', ')}기에 ${args.부서}로서 공지할 내용을 작성해주세요`);
	},
	(self, chat, prevChat, channel, prevChannel, { 부서, 기수 }) => {
		if (chat.text === '취소') {
			channel.send('취소되었습니다.');
			return;
		}
		
		for (let n of 기수)
			studentRooms[n].send(`🔔 ${부서} 알림\n—————\n${chat.text}`);
	})
	.build()
);

// 도움말 명령어
bot.addCommand(new StructuredCommand.Builder()
	.setName('도움말')
	.setDescription("명령어에 대한 상세한 도움말을 표시합니다. `name`을 생략할 경우, 명령어 목록을 전부 출력하고, `name`을 명시한 경우 그 명령어의 도움말을 출력합니다.")
	.setUsage('도움말 <name:str?>')
	.setExamples('도움말', '도움말 공지', '도움말 급식')
	.setExecute((self, chat, channel, { name }) => {
		if (name != null) {
			const found = CommandRegistry.data.find(cmd => cmd.name === name);
			
			if (found != null)
				channel.send(found.manual());
			else
				channel.send(`명령어 이름이 '${name}'인 명령어는 존재하지 않습니다.`);
		}
		else {
			let ret = [
				'📦 명령어 목록',
				'——————'
			];
			
			CommandRegistry.loop(cmd => {
				if (cmd.name !== '도움말')
					ret.push(`· ${cmd.name}`)
			});
			ret.push('');
			ret.push('세부 도움말을 보고 싶은 경우, "도움말 <명령어>"를 입력하세요.');
			
			channel.send(ret.join('\n'));
		}
	})
	.build()
);

// 학사일정 명령어
const getEvents = (from, to) => {
	const events = Database.readObject('school_events.json');
	const satisfied = [];
	
	for (let date in events) {
		let dt = DateTime.parse(date);
		
		if (from.le(dt) && dt.le(to)) {
			satisfied.push(`· ${dt.toString('M월 D일')}: ${events[date]}`);
		}
	}
	
	return satisfied;
};

bot.addCommand(new NaturalCommand.Builder()
	.setName('행사')
	.setDescription('학사일정을 알려줍니다.')
	.setExamples('행사', '행사 3월 1일', '행사 3월 1일부터 3월 5일까지')
	.setUseDateParse(true, true)
	.setQuery({ school_event: null })
	.setExecute((self, chat, channel, { school_event, datetime: { from, to } }) => {
		const events = getEvents(from, to);
		
		if (events.length > 0)
			channel.send(`📅 ${from.humanize()} ~ ${to.humanize()} 학사일정\n—————\n${events.join('\n')}`);
		else
			channel.send(`📅 ${from.humanize()} ~ ${to.humanize()} 학사일정\n—————\n해당 기간에 학사일정이 없습니다.`);
	})
	.setCronJob({
		'매주': '0 0 * * 1',
		'매일': '0 0 * * 0,2-6'
	}, (self, tag) => {
		let events;
		
		if (tag === '매주')
			events = getEvents(DateTime.today(), DateTime.sunday());
		else if (tag === '매일')
			events = getEvents(DateTime.today(), DateTime.today());

		if (events.length > 0)
			channel.send(`📅 이번 주 학사일정\n—————\n${events.join('\n')}`);
		else
			channel.send(`📅 이번 주 학사일정\n—————\n해당 기간에 학사일정이 없습니다.`);
	})
	.build()
);