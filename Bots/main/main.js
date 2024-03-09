const BotManager = require('../../global_modules/bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const Jsoup = org.jsoup.Jsoup;
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/bot-manager/Command');
const { Event } = require('../../global_modules/bot-manager/Event');
const { DateTime } = require("../../global_modules/bot-manager/DateTime");

// 기본 유틸 함수들
FileStream.writeObject = (path, data) => FileStream.write(path, JSON.stringify(data));
FileStream.readObject = (path, defaultValue={}) => JSON.parse(FileStream.read(path) ?? JSON.stringify(defaultValue));
const f = {
	josa: (str, josa) => {
		hasJong = (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;

		switch (josa) {
			case '이가':
			case '가':
				return str + (hasJong ? '이가' : '가');
			case '을':
			case '를':
				return str + (hasJong ? '을' : '를');
			case '은':
			case '는':
				return str + (hasJong ? '은' : '는');
			case '으로':
			case '로':
				return str + (hasJong ? '으로' : '로');
			case '과':
			case '와':
				return str + (hasJong ? '과' : '와');
			default:
				return str + josa;
		}
	},
	warn: msg => `⚠ ${msg}`,
	error: msg => `❌ ${msg}`,
	success: msg => `✅ ${msg}`,
	info: msg => `ℹ️ ${msg}`
};

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

// 봇 가동 시작
bot.start();

// db 갱신
bot.on(Event.MESSAGE, (chat, channel) => {
	// 기수 톡방 및 톡방 내 학생들 추가
	if (!(channel.id in db.channels.i2c) && isStudentRoom(channel.name)) {
		db.channelReload(channel);
		FileStream.writeObject(paths.channels, db.channels);
		
		channel.members.forEach(user => db.userReload(user, channel));
		FileStream.writeObject(paths.users, db.users);
		
		studentRooms[channel.name] = channel;
		rooms[channel.name] = channel;
	}
	
	// 이름 변경 적용
	if (chat.user.id in db.users && db.users[chat.user.id].name !== chat.user.name) {
		db.users[chat.user.id].name = chat.user.name;
		FileStream.writeObject(paths.users, db.users);
	}
});

// 급식 명령어

/**
 * @param {DateTime} dt
 */
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

	// TEST: 석식, 중식까지만 있는 날

	if (data.mealServiceDietInfo[0].head[1].RESULT.CODE !== "INFO-000")
		return Array(3).fill('급식 정보가 없습니다.');
	
	// 순서대로 아침, 점심, 저녁
	return [0, 1, 2].map(i => {
		// .replace(/\(\d+(?:.\d+)*\)/g, "")
		if (data.mealServiceDietInfo[1].row[i] != null) {
			let ddish = data.mealServiceDietInfo[1].row[i].DDISH_NM
				.replace(/\s*\(\d+(?:.\d+)*\)\s+/g, '\n').replace(/\(\d+(?:.\d+)*\)/g, '').replace(/([가-힣ㄱ-ㅎㅏ-ㅣ)]) /g, '$1\n').split('\n').slice(0, -1);
			return ddish.map(e => '· ' + e).join('\n');
		}
		else
			return '급식 정보가 없습니다.';
	});
}

bot.addCommand(new NaturalCommand.Builder()
	.setName('급식', '🍚')
	.setDescription(
		'입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.\n' +
		'예를 들어, 아침과 점심 시간 사이에 명령어를 호출하면 점심 급식을 알려주고, 점심과 저녁 시간 사이에는 저녁 급식을 알려줍니다.\n' +
		'또한, 매일 자정 그 날의 모든 급식을 알려주고, 3교시에서 4교시로 가는 쉬는 시간에는 점심, 7교시 이후 청소 시간에 저녁 급식을 정기적으로 전송합니다.'
	)
	.setExamples(
		'그그그그끄저께 급식',
		'오늘 밥',
		'모레 급식',
		'석식',
		'내일 점심밥',
		'금요일 아침',
		'급식 3/29',
		'급식 다다음주 목요일'
	)
	.setQuery({ 급식: null, datetime: () => DateTime.now() })
	.setUseDateParse(true, false, false)
	.setExecute((self, chat, channel, { 급식, datetime }) => {		
		// TODO: manual에 date parse 유무 넣기 
		if (급식 === '조식' || (급식 === '아침' && chat.filteredText.length === 0))	// '금요일 아침에는 ~~~' 같은 메세지에는 걸리지 않도록
			datetime = datetime.parse('아침');
		else if (급식 === '중식' || (급식 === '점심' && chat.filteredText.length === 0))
			datetime = datetime.parse('점심');
		else if (급식 === '석식' || (급식 === '저녁' && chat.filteredText.length === 0))
			datetime = datetime.parse('저녁');

		let meals = getMeals(datetime);

		if (datetime.eq({ hour: 0, minute: 0 }))
			channel.send(`${self.icon} ${datetime.humanize(true)} 급식\n—————\n[조식]\n${meals[0]}\n\n[중식]\n${meals[1]}\n\n[석식]\n${meals[2]}`);
		else if (datetime.isWeekend() ? datetime.lt({ hour: 8, minute: 50 }) : datetime.lt({ hour: 8, minute: 10 }))
			channel.send(`${self.icon} ${datetime.humanize(true)} 조식\n—————\n${meals[0]}`);
		else if (datetime.lt({ hour: 13, minute: 10 }))
			channel.send(`${self.icon} ${datetime.humanize(true)} 중식\n—————\n${meals[1]}`);
		else if (datetime.lt({ hour: 19, minute: 10}))
			channel.send(`${self.icon} ${datetime.humanize(true)} 석식\n—————\n${meals[2]}`);
		else {
			datetime = datetime.add({ day: 1 });
			meals = getMeals(datetime);
			channel.send(`${self.icon} ${datetime.humanize(true)} 조식\n—————\n${meals[0]}`);
		}
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
			msg = `${self.icon} ${dt.humanize(true)} 급식\n—————\n[조식]\n${meals[0]}\n\n[중식]\n${meals[1]}\n\n[석식]\n${meals[2]}`;
		else if (tag === '점심')
			msg = `${self.icon} ${dt.humanize(true)} 중식\n—————\n${meals[1]}`;
		else if (tag === '저녁')
			msg = `${self.icon} ${dt.humanize(true)} 석식\n—————\n${meals[2]}`;
		
		for (let 기수 in studentRooms)
			studentRooms[기수].send(msg);
	})
	.build()
);

// 공지 명령어
bot.addCommand(new StructuredCommand.Builder()
	.setName('공지', '🔔')
	.setDescription(
		"학생회 공지를 전송합니다. 기수를 지정하지 않으면 재학 중인 기수 톡방에 전송됩니다.\n" +
		"먼저 입력 양식에 맞춰 명령어를 작성해 전송한 뒤, 공지사항을 작성해 한 번 더 전송하세요.\n" +
		"공지사항 내용 대신 메시지로 '취소'라고 보낼 경우 공지 명령어가 중단됩니다."
	)
	.setUsage("<부서:str> 알림 <기수:int[]? min=39>")
	.setChannels(rooms['공지방'])
	.setExamples(
		['{사용자}: 생체부 알림', '봇: ' + f.info('{사용자}님, 39, 40, 41기에 생체부로서 공지할 내용을 작성해주세요.'), '{사용자}: 기숙사 3월 기상곡입니다 ...'],
		['{사용자}: 정책부 알림 39', '봇: ' + f.info('{사용자}님, 39기에 정책부로서 공지할 내용을 작성해주세요.'), '{사용자}: 정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'],
		['{사용자}: 홍보부 알림 40 41', '봇: ' + f.info('{사용자}님, 40, 41기에 홍보부로서 공지할 내용을 작성해주세요.'), '{사용자}: 취소', '봇: ' + f.success('취소되었습니다.')]
	)
	.setExecute((self, chat, channel, args) => {
		const 부서List = ["회장", "부회장", "학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

		if (!부서List.includes(args.부서)) {
			channel.send(f.warn(`'${f.josa(args.부서, '는')}' 적절한 부서가 아닙니다.\n가능한 부서: ${부서List.join(', ')}`));
			return;
		}
		
		if (args.기수.length === 0) {
			const thirdNth = DateTime.now().year - 2000 + 15;
			args.기수 = [thirdNth, thirdNth + 1, thirdNth + 2];
		}
		
		channel.send(f.info(`${chat.user.name}님, ${args.기수.join(', ')}기에 ${f.josa(args.부서, '로')}서 공지할 내용을 작성해주세요.`));
	},
	(self, chat, prevChat, channel, prevChannel, { 부서, 기수 }) => {
		if (chat.text === '취소') {
			channel.send(f.success('취소되었습니다.'));
			return;
		}
		
		for (let n of 기수) {
			if (!studentRooms[n])
				channel.send(f.warn(`${n}기 톡방은 존재하지 않습니다.`))

			studentRooms[n].send(`${self.icon} ${부서} 알림\n—————\n${chat.text}`)
				.then(() => channel.send(f.success(`${n}기에 ${부서} 공지가 전송되었습니다.`)))
				.catch(e => channel.send(f.warn(`${n}기에 ${부서} 공지 전송에 실패했습니다.`)));
		}
	})
	.build()
);

// 도움말 명령어
bot.addCommand(new StructuredCommand.Builder()
	.setName('도움말', '❓')
	.setDescription("명령어에 대한 상세한 도움말을 표시합니다. 명령어 이름을 생략할 경우, 대신 등록되어 있는 명령어 목록을 전부 출력합니다.")
	.setUsage('도움말 <name:str?>')
	.setExamples('도움말', '도움말 공지', '도움말 급식', '도움말 행사')
	.setExecute((self, chat, channel, { name }) => {		
		if (name != null) {
			const found = CommandRegistry.data.find(cmd => cmd.name === name);
			
			if (found != null) {
				channel.send(found.manual());
				return;
			}
			else
				channel.send(f.warn(`명령어 이름이 '${name}'인 명령어는 존재하지 않습니다.`));
		}
		
		let ret = [
			'📦 명령어 목록',
			'——————'
		];
		
		CommandRegistry.loop(cmd => ret.push(`· ${cmd.icon} ${cmd.name}`));

		ret.push('');
		ret.push('"도움말 <명령어>"로\n세부 도움말을 확인하세요.');
		
		channel.send(ret.join('\n'));
	})
	.build()
);

// 학사일정 명령어

/**
 * @param {DateTime} from
 * @param {DateTime} to
 */
const getEvents = (from, to) => {
	const events = Database.readObject('school_events.json');
	const satisfied = [];
	
	for (let date in events) {
		let dt = DateTime.parse(date);
		
		if (from.le(dt) && dt.le(to)) {
			satisfied.push(`· ${dt.toString('MM/DD')}: ${events[date]}`);
		}
	}
	
	return satisfied;
};

bot.addCommand(new NaturalCommand.Builder()
	.setName('행사', '📅')
	.setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.')
	.setExamples('행사', '행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사')
	.setUseDateParse(true, true)
	.setQuery({ 학교행사: null })
	.setExecute((self, chat, channel, { 학교행사, datetime: { from, to } }) => {
		const events = getEvents(from, to);
		
		if (events.length > 0)
			channel.send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n—————\n${events.join('\n')}`);
		else
			channel.send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n—————\n해당 기간에 학사일정이 없습니다.`);
	})
	.setCronJob({
		'매주': '0 0 * * 1',
		'매일': '0 0 * * 0,2-6'
	}, (self, tag) => {
		let events;
		
		// TODO: 매주, 매일 이거 통합하고 아래 코드도 미완성임 지금 보면

		if (tag === '매주')
			events = getEvents(DateTime.today(), DateTime.sunday());
		else if (tag === '매일')
			events = getEvents(DateTime.today(), DateTime.today());

		if (events.length > 0)
			channel.send(`${self.icon} 이번 주 학사일정\n—————\n${events.join('\n')}`);
		else
			channel.send(`${self.icon} 이번 주 학사일정\n—————\n해당 기간에 학사일정이 없습니다.`);
	})
	.build()
);