/**
 * 광주과학고등학교 카카오톡 봇 ver. 2024
 * 
 * @checklist
 * 1. 오픈 프로필이 적어도 1개 존재해야함 ✅
 * 2. `debugRoom`, `staffRoom`의 id가 정확히 설정되어있어야함 (따로 미리 구해야함) ✅
 * 3. 모든 기수 방의 이름이 정확히 기수로만 되어있어야함 (39, 40, ...)
 * 		- 봇 초대 -> 봇 계정에서 채팅방 이름 바꾸기 -> `.` 메시지 보내서 채널 등록 순서로 진행
 * 4. 봇 코드를 컴파일한 뒤 명령어를 사용하기 전에 `.`과 같은 더미 메시지를 보내서 봇이 채널을 등록할 수 있게 해야함
 */

const BotOperator = require('../../global_modules/BotOperator').from(BotManager);
const bot = BotOperator.getCurrentBot();

const Jsoup = org.jsoup.Jsoup;
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/BotOperator/Command');
const { Event } = require('../../global_modules/BotOperator/Event');
const { DateTime } = require("../../global_modules/BotOperator/DateTime");

// 파일 경로
const paths = {
	users: "/sdcard/msgbot/users.json",
	channels: "/sdcard/msgbot/channels.json"
};

// 파일 입출력
const FS = {
	...FileStream,
	writeObject: (path, data) => FileStream.write(path, JSON.stringify(data)),
	readObject: (path, defaultValue = {}) => JSON.parse(FileStream.read(path) ?? JSON.stringify(defaultValue))
};

// 유저, 채널 데이터베이스 관리
const DB = {
	users: FS.readObject(paths.users),
	channels: FS.readObject(paths.channels, { i2c: {}, c2i: {} }),	// i2c: id to customName, c2i: customName to id
	reloadUser: (user, channel) => {
		// user.id, channel.id 도 string 타입
		DB.users[user.id] = {
			name: user.name,    // 카톡 이름
			nth: Number(channel.customName)   // 기수
		};
	},
	reloadChannel: channel => {
		DB.channels.i2c[channel.id] = channel.customName;
		DB.channels.c2i[channel.customName] = channel.id;
	}
};

// 유틸리티 함수
const _ = {
	josa: (str, josa) => {
		const hasJong = (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;

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
	info: msg => `ℹ️ ${msg}`,
	isNumber: name => /^\d+$/.test(name),
	isNaN: n => Number.isNaN(n),
	catch: (err, channel) => {
		const error = `${_.error(err.name)}\n——\n${err.message}\n${err.stack.trimEnd()}`;

		Log.e(error);
		if (channel != null && typeof channel.send === 'function')
			channel.send(error);
	},
	compress: '\u200b'.repeat(500)
};

// 채널 객체에 메시지 전송을 위한 유틸리티 함수
/**
 * @param {Channel} channel 
 * @param {Command} command
 */
const $ = (channel) => {
	const send = (...msg) => {
		const content = msg.join(' ');

		if (channel != null && typeof channel.send === 'function') {
			channel.send(content).catch(e => {
				_.catch(e, debugRoom);
				if (debugRoom != null && typeof debugRoom.send === 'function')
					debugRoom.send('보내려던 내용' + _.compress + '\n\n' + content);
			});
		}
	};
	const warn = msg => send(_.warn(msg));
	const error = msg => send(_.error(msg));
	const success = msg => send(_.success(msg));
	const info = msg => send(_.info(msg));

	return { send, warn, error, success, info };
};

// db.channels: object[string, string] -> rooms: object[string, Channel] 변환
const staffRoom = BotOperator.getChannelById('381748032476273');	// 학생회방
const debugRoom = BotOperator.getChannelById('382089527597301');	// 디버그방

/** 기수 톡방 @type { { [key: string]: Channel } } */
const studentRooms = {};

/** 모든 방 @type { { [key: string]: Channel } } */
const rooms = {};

for (let [name, id] of Object.entries(DB.channels.c2i)) {
	if (_.isNumber(name))
		studentRooms[name] = BotOperator.getChannelById(id);

	rooms[name] = BotOperator.getChannelById(id);
}

try {
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

		// 순서대로 아침, 점심, 저녁
		let ret = Array(3).fill(null);

		if ('RESULT' in data && data.RESULT.CODE !== "INFO-000")
			return ret;
		else if (data.mealServiceDietInfo[0].head[1].RESULT.CODE !== "INFO-000")
			return ret;

		for (let i = 0; i < data.mealServiceDietInfo[1].row.length; i++) {
			let ddish = data.mealServiceDietInfo[1].row[i].DDISH_NM
				.replace(/\s*\(\d+(?:.\d+)*\)\s+/g, '\n').replace(/\(\d+\.?(?:.\d+)*\)/g, '').replace(/([가-힣ㄱ-ㅎㅏ-ㅣ)]) /g, '$1\n').split('\n').slice(0, -1);

			ret[Number(data.mealServiceDietInfo[1].row[i].MMEAL_SC_CODE) - 1] = ddish.map(e => '· ' + e).join('\n');
		}

		return ret;
	}

	bot.addCommand(new NaturalCommand.Builder()
		.setName('급식', '🍚')
		.setDescription(
			'입력한 시간에 맞춰 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 시각으로 설정됩니다.\n' +
			'예를 들어, 아침과 점심 시간 사이에 명령어를 호출하면 점심 급식을 알려주고, 점심과 저녁 시간 사이에는 저녁 급식을 알려줍니다.\n' +
			'또한, 매일 자정 그 날의 모든 급식을 알려주고, 3교시에서 4교시로 가는 쉬는 시간에는 점심, 7교시 이후 청소 시간에 저녁 급식을 정기적으로 전송합니다.'
		)
		.setExamples(
			'그제 급식',
			'오늘 밥',
			'모레 급식',
			'석식',
			'내일 점심밥',
			'금요일 아침',
			'급식 3/29',
			'급식 다다음주 목요일'
		)
		.setQuery({ 급식: null, datetime: NaN })
		.setUseDateParse(true, false, false)
		.setExecute((self, chat, channel, { 급식, datetime }) => {
			// 명령어 오호출 방지를 위해 날짜를 파싱하지 않은 경우에는 급식 토큰이 있는 경우에만 반응 (공백 미포함 3글자 여유로 줌)
			if (chat.filteredText.replace(/\s+/g, '').length > 3)
				return;

			if (_.isNaN(datetime))
				datetime = DateTime.now();

			if (급식 === '조식' || 급식 === '아침')
				datetime = datetime.parse('아침');
			else if (급식 === '중식' || 급식 === '점심')
				datetime = datetime.parse('점심');
			else if (급식 === '석식' || 급식 === '저녁')
				datetime = datetime.parse('저녁');

			// TODO: manual에 date parse 유무 넣기

			let meals = getMeals(datetime).map(e => e ? e : '급식 정보가 없습니다.');

			if (datetime.eq({ hour: 0, minute: 0 }))
				$(channel).send(`${self.icon} ${datetime.humanize(true)} 급식\n——\n[조식]\n${meals[0]}\n\n[중식]\n${meals[1]}\n\n[석식]\n${meals[2]}`);
			else if (datetime.isWeekend() ? datetime.lt({ hour: 8, minute: 50 }) : datetime.lt({ hour: 8, minute: 10 }))
				$(channel).send(`${self.icon} ${datetime.humanize(true)} 조식\n——\n${meals[0]}`);
			else if (datetime.lt({ hour: 13, minute: 10 }))
				$(channel).send(`${self.icon} ${datetime.humanize(true)} 중식\n——\n${meals[1]}`);
			else if (datetime.lt({ hour: 19, minute: 10 }))
				$(channel).send(`${self.icon} ${datetime.humanize(true)} 석식\n——\n${meals[2]}`);
			else {
				datetime = datetime.add({ day: 1 });
				meals = getMeals(datetime);
				$(channel).send(`${self.icon} ${datetime.humanize(true)} 조식\n——\n${meals[0]}`);
			}
		})
		.setCronJob([
			{ cron: '0 0 * * *', comment: '매일 자정에 그 날의 모든 메뉴 전송' },
			{ cron: '40 11 * * *', comment: '3교시 쉬는 시간 (11:40)에 점심 메뉴 전송' },
			{ cron: '20 16 * * *', comment: '7교시 이후 청소 시간 (16:20)에 저녁 메뉴 전송' }
		], (self, index, dt) => {
			const meals = getMeals(dt);

			let msg;
			if (index === 0 && meals.filter(Boolean).length > 0)
				msg = `${self.icon} ${dt.humanize(true)} 급식\n——\n[조식]\n${meals[0]}\n\n[중식]\n${meals[1]}\n\n[석식]\n${meals[2]}`;
			else if (index === 1 && meals[1] != null)
				msg = `${self.icon} ${dt.humanize(true)} 중식\n——\n${meals[1]}`;
			else if (index === 2 && meals[2] != null)
				msg = `${self.icon} ${dt.humanize(true)} 석식\n——\n${meals[2]}`;

			for (let 기수 in studentRooms)
				if (msg != null)
					$(studentRooms[기수]).send(msg);
		})
		.build()
	);

	// 공지 명령어
	bot.addCommand(new StructuredCommand.Builder()
		.setName('공지', '📢')
		.setDescription(
			"학생회 공지를 전송합니다. 기수를 지정하지 않으면 재학 중인 기수 톡방에 전송됩니다.\n" +
			"먼저 입력 양식에 맞춰 명령어를 작성해 전송한 뒤, 공지사항을 작성해 한 번 더 전송하세요.\n" +
			"공지사항 내용 대신 메시지로 '취소'라고 보낼 경우 공지 명령어가 중단됩니다."
		)
		.setUsage(`<부서:str> 알림 <기수:int[]? min=${DateTime.now().year - 2000 + 15} max=${DateTime.now().year - 2000 + 17}>`)
		.setChannels(staffRoom)
		.setExamples(
			['$user: 생체부 알림', '봇: ' + _.info('$user님, 39, 40, 41기에 생체부로서 공지할 내용을 작성해주세요.'), '$user: 기숙사 3월 기상곡입니다 ...'],
			['$user: 정책부 알림 39', '봇: ' + _.info('$user님, 39기에 정책부로서 공지할 내용을 작성해주세요.'), '$user: 정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'],
			['$user: 홍보부 알림 40 41', '봇: ' + _.info('$user님, 40, 41기에 홍보부로서 공지할 내용을 작성해주세요.'), '$user: 취소', '봇: ' + _.success('취소되었습니다.')]
		)
		.setExecute((self, chat, channel, args) => {
			const 부서List = ["회장", "부회장", "학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

			// 부서가 적절한지 확인
			if (!부서List.includes(args.부서)) {
				$(channel).warn(`${_.josa(args.부서, '는')} 적절한 부서가 아닙니다.\n\n가능한 부서: ${부서List.join(', ')}`);
				return;
			}

			// 기수가 없으면 재학 중인 기수로 설정
			if (args.기수.length === 0) {
				const thirdNth = DateTime.now().year - 2000 + 15;
				args.기수 = [thirdNth, thirdNth + 1, thirdNth + 2];
			}

			$(channel).info(`${chat.user.name}님, ${_.josa(args.부서, '로')}서 ${args.기수.join(', ')}기에 공지할 내용을 작성해주세요.`);
		},
			(self, chat, prevChat, channel, prevChannel, { 부서, 기수 }) => {
				// 취소 시 중단
				if (chat.text === '취소') {
					$(channel).success('취소되었습니다.');
					return;
				}

				// 공지 전송
				for (let n of 기수) {
					if (!studentRooms[n]) {
						$(channel).warn(`${n}기 톡방은 존재하지 않습니다.`);
						continue;
					}

					studentRooms[n].send(`${self.icon} ${부서} 알림\n——\n${chat.text}`)
						.then(() => $(channel).success(`${n}기에 ${부서} 공지가 전송되었습니다.`))
						.catch(e => $(channel).warn(`${n}기에 ${부서} 공지 전송에 실패했습니다.\n${e}`));
				}
			})
		.build()
	);

	// 도움말 명령어
	bot.addCommand(new StructuredCommand.Builder()
		.setName('도움말', '❓')
		.setDescription("명령어에 대한 상세한 도움말을 표시합니다. 명령어 이름을 생략할 경우, 대신 등록되어 있는 명령어 목록을 전부 출력합니다.")
		.setUsage('도움말 <명령어:str?>')
		.setExamples('도움말', '도움말 공지', '도움말 급식', '도움말 행사')
		.setExecute((self, chat, channel, { 명령어 }) => {
			// 명령어 이름이 주어진 경우
			if (명령어 != null) {
				const found = CommandRegistry.data.find(cmd => cmd.name === 명령어);

				// 명령어가 존재하는 경우
				if (found != null) {
					$(channel).send(found.manual({ user: chat.user.name }));
					return;
				}
				else
					$(channel).warn(`명령어 이름이 '${명령어}'인 명령어는 존재하지 않습니다.`);
			}

			let ret = [];

			ret.push('📦 명령어 목록');
			ret.push('———');
			CommandRegistry.loop(cmd => {
				if (cmd.channels.map(c => c.id).includes(channel.id))
					ret.push(`· ${cmd.name} (${cmd.icon})`)
			});
			ret.push('\n"도움말 <명령어>"로\n세부 도움말을 확인하세요.');

			$(channel).send(ret.join('\n'));
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
				satisfied.push(`· ${dt.toString('M월 D일')}: ${events[date]}`);
			}
		}

		return satisfied;
	};

	// TODO: 학교 학사일정 수정 기능(관리자방만 허용) 추가하기 - subcommand 개념 도입 필요
	bot.addCommand(new NaturalCommand.Builder()
		.setName('행사', '📅')
		.setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.')
		.setExamples('행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사')
		.setUseDateParse(true, true)
		.setQuery({ 학교행사: null })
		.setExecute((self, chat, channel, { 학교행사, datetime: { from, to } }) => {
			if (chat.filteredText.replace(/\s+/g, '').length > 3)	// TODO: 명령어 오호출 방지 setMargin(3) 구현
				return;	

			const events = getEvents(from, to);

			if (events.length > 0)
				$(channel).send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n——\n${events.join('\n')}`);
			else
				$(channel).send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n——\n해당 기간에 학사일정이 없습니다.`);
		})
		.setCronJob([
			{ cron: '0 0 * * 1', comment: '월요일 자정에는 그 주의 모든 일정을 전송' },
			{ cron: '0 0 * * 0,2-6', comment: '월요일을 제외한 모든 요일의 자정에는 그 날의 일정을 전송' }
		], (self, index, dt) => {
			let events;

			if (index === 0)
				events = getEvents(dt, DateTime.sunday());
			else if (index === 1)
				events = getEvents(dt, dt);

			for (let 기수 in studentRooms) {
				if (events.length > 0)
					$(studentRooms[기수]).send(`${self.icon} ${['이번 주', '오늘'][index]} 학사일정\n——\n${events.join('\n')}`);
			}
		})
		.build()
	);

	// 봇 가동 시작
	bot.start();

	// db 갱신
	bot.on(Event.MESSAGE, (chat, channel) => {
		if (!_.isNumber(channel.customName))
			return;

		// 기수 톡방 및 톡방 내 학생들 추가
		if (!(channel.id in DB.channels.i2c)) {
			DB.reloadChannel(channel);
			FS.writeObject(paths.channels, DB.channels);

			channel.members.forEach(user => DB.reloadUser(user, channel));
			FS.writeObject(paths.users, DB.users);

			studentRooms[channel.customName] = channel;
			rooms[channel.customName] = channel;
		}

		// 이름 변경 적용
		if (chat.user.id in DB.users && (DB.users[chat.user.id].name !== chat.user.name || DB.users[chat.user.id].nth !== Number(channel.customName))) {
			DB.users[chat.user.id].name = chat.user.name;
			DB.users[chat.user.id].nth = Number(channel.customName);
			FS.writeObject(paths.users, DB.users);
		}
	});
} catch (err) {
	_.catch(err, debugRoom);
}