/**
 * 광주과학고등학교 카카오톡 봇 ver. 2024
 *
 * @checklist
 * 1. 오픈 프로필이 적어도 1개 존재해야함 ✅
 * 2. `debugRoom`, `staffRoom`의 id가 정확히 설정되어있어야함 (Bots/extract 사용해서 구할 수 있음) ✅
 * 3. 모든 기수 방의 이름이 정확히 기수로만 되어있어야함 (39, 40, ...)
 *    - 봇 초대 -> 봇 계정에서 채팅방 이름 바꾸기 -> `.` 메시지 보내서 채널 등록 순서로 진행
 * 4. 봇 코드를 컴파일한 뒤 명령어를 사용하기 전에 `.`과 같은 더미 메시지를 보내서 봇이 채널을 등록할 수 있게 해야함
 */

const BotOperator = require('../../global_modules/BotOperator').from(BotManager);
const bot = BotOperator.getCurrentBot();

const Jsoup = org.jsoup.Jsoup;
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/BotOperator/Command');
const { Event } = require('../../global_modules/BotOperator/Event');
const { DateTime } = require('../../global_modules/BotOperator/DateTime');

// 파일 경로
const paths = {
	users: '/sdcard/msgbot/users.json',
	channels: '/sdcard/msgbot/channels.json',
	dmChannels: '/sdcard/msgbot/dmChannels.json',
};

// 파일 스트림 관리
const FS = {
	...FileStream,
	writeObject: (path, data) => FileStream.write(path, JSON.stringify(data)),
	readObject: (path, defaultValue = {}) => JSON.parse(
		FileStream.read(path) ?? JSON.stringify(defaultValue)),
};

// 유저, 채널 데이터베이스 관리
const DB = {
	users: FS.readObject(paths.users),
	channels: FS.readObject(paths.channels, {
		i2c: {},
		c2i: {},
	}),	// i2c: id to customName, c2i: customName to id
	dmChannels: FS.readObject(paths.dmChannels),
	reloadUser: (user, channel) => {
		// user.id, channel.id 도 string 타입
		DB.users[user.id] = {
			name: user.name,    // 카톡 이름
			nth: Number(channel.customName),   // 기수
		};
	},
	reloadChannel: channel => {
		DB.channels.i2c[channel.id] = channel.customName;
		DB.channels.c2i[channel.customName] = channel.id;
	},
};

// 유틸리티 함수
String.prototype.이가 = function () {
	const hasJong = _.hasJong(this);
	return this + (hasJong ? '이가' : '가');
}
String.prototype.을를 = function () {
	const hasJong = _.hasJong(this);
	return this + (hasJong ? '을' : '를');
}
String.prototype.은는 = function () {
	const hasJong = _.hasJong(this);
	return this + (hasJong ? '은' : '는');
}
String.prototype.으로 = function () {
	const hasJong = _.hasJong(this);
	return this + (hasJong ? '으로' : '로');
}
String.prototype.와과 = function () {
	const hasJong = _.hasJong(this);
	return this + (hasJong ? '과' : '와');
}

const _ = {
	hasJong: str => (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0,
	warn: msg => `⚠ ${msg}`,
	error: msg => `❌ ${msg}`,
	success: msg => `✅ ${msg}`,
	info: msg => `ℹ️ ${msg}`,
	isNumber: name => /^\d+$/.test(name),
	isNaN: n => Number.isNaN(n),
	catch: (err, channel) => {
		const error = `${
			err.name}\n——\n${err.message}\n${err.stack.trimEnd()}`;
		
		Log.e(error);
		if (channel != null && typeof channel.send === 'function') {
			channel.send(error);
		}
	},
	compress: '\u200b'.repeat(500),
};

// 채널 객체에 메시지 전송을 위한 유틸리티 함수
/** @param {Channel} channel */
const $ = (channel) => {
	const send = (...msg) => {
		const content = msg.join(' ');
		
		if (channel != null && typeof channel.send === 'function') {
			channel.send(content).catch(e => {
				_.catch(e, debugRoom);
				if (debugRoom != null && typeof debugRoom.send === 'function') {
					debugRoom.send('보내려던 내용' + _.compress + '\n\n' + content);
				}
			});
		}
	};
	
	const warn = msg => send(_.warn(msg));
	const error = msg => send(_.error(msg));
	const success = msg => send(_.success(msg));
	const info = msg => send(_.info(msg));
	
	return {
		send,
		warn,
		error,
		success,
		info,
	};
};

// db.channels: object[string, string] -> rooms: object[string, Channel] 변환
const staffRoom = BotOperator.getChannelById('412937930061983');	// 학생회 임원방
const debugRoom = BotOperator.getChannelById('382089527597301');	// 디버그방

/** 기수 톡방 @type { { [key: string]: Channel } } */
const studentRooms = {};

/** 모든 방 @type { { [key: string]: Channel } } */
const rooms = {};

for (let [name, id] of Object.entries(DB.channels.c2i)) {
	const ch = BotOperator.getChannelById(id);
	if (ch == null)
		continue;
	
	if (_.isNumber(name)) {
		if (ch.isGroupChannel() && ch.members.length > 80)  // 기수 톡방이 맞는지 검사 (조건: 최소 80명 이상)
			studentRooms[name] = ch;
	}
	
	rooms[name] = ch;
}

try {
	// 급식 명령어
	
	/**
	 * @param {DateTime} dt
	 * @param {String} bullet
	 * @return {String[]}
	 */
	const getMeals = (dt, bullet) => {
		const options = [
			['ATPT_OFCDC_SC_CODE', 'F10'],
			['SD_SCHUL_CODE', 7380031],
			['MLSV_YMD', dt.toString('YYMMDD')],
			['Type', 'xml']];
		
		try {
			const doc = Jsoup.connect(
				`https://open.neis.go.kr/hub/mealServiceDietInfo?${options.map(
					opt => opt.join('=')).join('&')}`).get();
			
			// 에러 코드 처리
			const resultElements = doc.select('RESULT > CODE');
			if (!resultElements.isEmpty() &&
			    !resultElements.text().equals('INFO-000')) {
				return [null, null, null];
			}
			
			// 에러 코드 처리 2
			const headElements = doc.select('head > RESULT > CODE');
			if (!headElements.isEmpty() &&
			    !headElements.text().equals('INFO-000')) {
				return [null, null, null];
			}
			
			const elements = doc.select('row');
			
			let breakfast = null;
			let lunch = null;
			let dinner = null;
			
			for (let i = 0; i < elements.length; i++) {
				const element = elements.get(i);
				const mealType = element.select('MMEAL_SC_CODE').text();
				const dishName = element.select('DDISH_NM').
					text().
					split(/ (?:\(\d+\.?(?:.\d+)*\))?(?:<br\/>|$)/g).
					filter(Boolean).
					map(e => bullet + e).
					join('\n');
				
				if (mealType === '1') {
					breakfast = dishName;
				}
				else if (mealType === '2') {
					lunch = dishName;
				}
				else if (mealType === '3') {
					dinner = dishName;
				}
			}
			
			return [breakfast, lunch, dinner];
		} catch (e) {
			_.error(e);
			return [null, null, null];
		}
	};
	
	bot.addCommand(new NaturalCommand.Builder()
		.setName('급식', '🍚')
		.setDescription(
			`입력한 시간에 맞춰 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 시각으로 설정됩니다.\n예를 들어, 아침과 점심 시간 사이에 명령어를 호출하면 점심 급식을 알려주고, 점심과 저녁 시간 사이에는 저녁 급식을 알려줍니다.\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 3교시에서 4교시로 가는 쉬는 시간에는 점심, 7교시 이후 청소 시간에 저녁 급식을 정기적으로 전송합니다.`
		)
		.setExamples('그제 급식', '오늘 밥', '모레 급식', '석식', '내일 점심밥', '금요일 아침', '급식 3/29', '급식 다다음주 목요일')
		.setQuery({
			급식: null,
			datetime: NaN,
		})
		.setUseDateParse(true, false, false).
		setExecute((self, chat, channel, {
			급식,
			datetime,
		}) => {
			// 명령어 오호출 방지를 위해 날짜를 파싱하지 않은 경우에는 급식 토큰이 있는 경우에만 반응 (공백 미포함 0글자 여유로 줌)
			if (chat.filteredText.replace(/\s+/g, '').length > 0) {
				return;
			}
			
			if (_.isNaN(datetime)) {
				datetime = DateTime.now();
			}
			
			// 급식의 의미를 담은 토큰이 시간의 의미도 동시에 갖는 경우 처리
			if (급식 === '조식' || 급식 === '아침') {
				datetime = datetime.parse('아침');
			}
			else if (급식 === '중식' || 급식 === '점심') {
				datetime = datetime.parse('점심');
			}
			else if (급식 === '석식' || 급식 === '저녁') {
				datetime = datetime.parse('저녁');
			}
			
			let meals;
			
			// "오늘 밥" 같은 명령어는 급식 전체 출력
			if (datetime.eq({ hour: 0, minute: 0 })) {
				meals = getMeals(datetime, ' · ').map(e => e ? e : '급식 정보가 없습니다.');
				let msg = `${self.icon} ${datetime.humanize(true)} 급식\n——\n🍳 조식\n${meals[0]}\n\n🍔 중식\n${meals[1]}\n\n🍱 석식\n${meals[2]}`;
				$(channel).send(msg);
				return;
			}
			
			meals = getMeals(datetime, '· ').map(e => e ? e : '급식 정보가 없습니다.');
			let msg;
			
			// 급식 시간에 따라 메시지 전송
			if (datetime.isWeekend() ? datetime.lt({hour: 8, minute: 50}) : datetime.lt({hour: 8, minute: 10})) {
				msg = `🍳 ${datetime.humanize(true)} 조식\n——\n${meals[0]}`;
			}
			else if (datetime.lt({hour: 13, minute: 10})) {
				msg = `🍔 ${datetime.humanize(true)} 중식\n——\n${meals[1]}`;
			}
			else if (datetime.lt({hour: 19, minute: 10})) {
				msg = `🍱 ${datetime.humanize(true)} 석식\n——\n${meals[2]}`;
			}
			else {	// 저녁 시간이 끝난 후에 급식 명령어를 치는 건 내일 조식을 보겠다는 것으로 해석함
				datetime = datetime.add({day: 1});
				meals = getMeals(datetime, '· ').map(e => e ? e : '급식 정보가 없습니다.');
				msg = `🍳 ${datetime.humanize(true)} 조식\n——\n${meals[0]}`;
			}
			
			$(channel).send(msg);
		})
		.setCronJob([
			{
				cron: '0 0 * * *',
				comment: '매일 자정에 그 날의 모든 메뉴 전송',
			}, {
				cron: '40 11 * * *',
				comment: '3교시 쉬는 시간 (11:40)에 점심 메뉴 전송',
			}, {
				cron: '20 16 * * *',
				comment: '7교시 이후 청소 시간 (16:20)에 저녁 메뉴 전송',
			}
		], (self, index, dt) => {
			let meals = getMeals(dt, ' · ');
			let msg;
			
			// 첫 번째 크론(자정)이면서 급식 정보가 있는 경우 전체 급식 출력
			if (index === 0 && meals.filter(Boolean).length > 0) {
				meals = meals.map(e => e ? e : '급식 정보가 없습니다.');
				msg = `${self.icon} ${dt.humanize(true)} 급식\n——\n🍳 조식\n${meals[0]}\n\n🍔 중식\n${meals[1]}\n\n🍱 석식\n${meals[2]}`;
			}
			else {	// 첫 번째 크론이 아니면 해당 시간의 급식만 출력
				meals = getMeals(dt, '· ');
				if (index === 1 && meals[1] != null) {
					msg = `🍔 ${dt.humanize(true)} 중식\n——\n${meals[1]}`;
				}
				else if (index === 2 && meals[2] != null) {
					msg = `🍱 ${dt.humanize(true)} 석식\n——\n${meals[2]}`;
				}
			}
			
			for (let 기수 in studentRooms) {
				if (msg == null)
					continue;
				
				$(studentRooms[기수]).send(msg);
			}
		})
		.build());
	
	// 공지 명령어
	bot.addCommand(new StructuredCommand.Builder()
		.setName('공지', '📢')
		.setDescription(`학생회 공지를 전송합니다. 기수를 지정하지 않으면 재학 중인 기수 톡방에 전송됩니다.\n먼저 입력 양식에 맞춰 명령어를 작성해 전송한 뒤, 공지사항을 작성해 한 번 더 전송하세요.\n공지사항 내용 대신 메시지로 \'취소\'라고 보낼 경우 공지 명령어가 중단됩니다.\n<부서>에는 다음과 같은 문자열이 들어갑니다. ${[
			'회장',
			'부회장',
			'학생회',
			'생체부',
			'환경부',
			'통계부',
			'문예부',
			'체육부',
			'홍보부',
			'정책부',
			'정보부',
			'총무부'].join(', ')}`)
		.setUsage(`<부서:str> 알림 <기수:int[]? min=${DateTime.now().year - 2000 + 15} max=${DateTime.now().year - 2000 + 17}>`)
		.setChannels(staffRoom)
		.setExamples([
			'$user: 생체부 알림',
			'봇: ' + _.info('$user님, 39, 40, 41기에 생체부로서 공지할 내용을 작성해주세요.'),
			'$user: 기숙사 3월 기상곡입니다 ...'], [
			'$user: 정책부 알림 39',
			'봇: ' + _.info('$user님, 39기에 정책부로서 공지할 내용을 작성해주세요.'),
			'$user: 정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'], [
			'$user: 홍보부 알림 40 41',
			'봇: ' + _.info('$user님, 40, 41기에 홍보부로서 공지할 내용을 작성해주세요.'),
			'$user: 취소',
			'봇: ' + _.success('취소되었습니다.')
		])
		.setExecute((self, chat, channel, { 부서, 기수List }) => {
			const 부서명List = [
				'회장',
				'부회장',
				'학생회',
				'생체부',
				'환경부',
				'통계부',
				'문예부',
				'체육부',
				'홍보부',
				'정책부',
				'정보부',
				'총무부'];

			// 부서가 적절한지 확인
			if (!부서명List.includes(부서)) {
				$(channel).warn(`${부서.은는} 적절한 부서가 아닙니다.\n\n가능한 부서: ${부서명List.join(', ')}`);
				return;
			}
			
			// 기수가 없으면 재학 중인 기수로 설정
			if (기수List.length === 0) {
				const thirdNth = DateTime.now().year - 2000 + 15;
				기수List = [thirdNth, thirdNth + 1, thirdNth + 2];
			}
			
			$(channel).info(`${chat.user.name}님, ${부서.으로}서 ${기수List.join(', ')}기에 공지할 내용을 작성해주세요.\n'취소'라고 보내면 중단됩니다.`);
		}, (self, chat, prevChat, channel, prevChannel, { 부서, 기수: 기수List }) => {
			// 취소 시 중단
			if (chat.text === '취소') {
				$(channel).success('취소되었습니다.');
				return;
			}
			
			// 공지 전송
			for (let 기수 of 기수List) {
				if (!studentRooms[기수]) {
					$(channel).warn(`${기수}기 톡방은 존재하지 않습니다.`);
					continue;
				}
				
				$(studentRooms[기수]).send(`${self.icon} ${부서} 알림\n——\n${chat.text}`).
					then(() => $(channel).success(`${기수}기에 ${부서} 공지가 전송되었습니다.`)).
					catch(e => $(channel).warn(`${기수}기에 ${부서} 공지 전송에 실패했습니다.\n${e}`));
			}
		})
		.build());
	
	// 도움말 명령어
	bot.addCommand(new StructuredCommand.Builder().
		setName('도움말', '❓').
		setDescription(
			'명령어에 대한 상세한 도움말을 표시합니다. 명령어 이름(또는 아이콘)을 생략할 경우, 대신 등록되어 있는 명령어 목록을 전부 출력합니다.').
		setUsage('도움말 <명령어:str?>').
		setExamples('도움말', '도움말 공지', '도움말 급식', '도움말 행사', '도움말 📅', '도움말 🍚').
		setExecute((self, chat, channel, { 명령어 }) => {
			// 명령어 이름이 주어진 경우
			if (명령어 != null) {
				const found = CommandRegistry.data.find(
					cmd => cmd.name === 명령어 || cmd.icon === 명령어);
				
				// 찾은 명령어가 존재하는 경우
				if (found != null) {
					$(channel).send(found.manual({user: chat.user.name}));
					return;
				}
				else {
					$(channel).warn(`명령어 이름이 '${명령어}'인 명령어는 존재하지 않습니다.`);
				}
			}
			
			let ret = [];
			
			ret.push('📦 명령어 목록');
			ret.push('———');
			CommandRegistry.loop(cmd => {
				if (cmd.channels.length === 0 ||
				    cmd.channels.map(c => c.id).includes(channel.id)) {
					ret.push(`· ${cmd.name} (${cmd.icon})`);
				}
			});
			ret.push('\n"도움말 <명령어>"로\n세부 도움말을 확인하세요.');
			
			$(channel).send(ret.join('\n'));
		}).
		build());
	
	// 학사일정 명령어
	
	/**
	 * @param {DateTime} from
	 * @param {DateTime} to
	 * @returns {string}
	 */
	const getEvents = (from, to) => {
		const events = Database.readObject('school_events.json');
		const satisfied = {};
		
		for (let date in events) {
			let dt = DateTime.parse(date);
			let dtString = dt.toString('M월 D일:');
			
			if (from.le(dt) && dt.le(to)) {
				if (!(dtString in satisfied)) {
					satisfied[dtString] = [];
				}
				
				for (let event of
					events[date].split(/,\s*/)) satisfied[dtString].push(
					`    · ${event}`);
			}
		}
		
		let msg = '';
		for (let dtString in satisfied) msg +=
			`${dtString}\n${satisfied[dtString].join('\n')}\n`;
		
		return msg.slice(0, -1);
	};
	
	// TODO: 학교 학사일정 수정 기능(관리자방만 허용) 추가하기 - subcommand 개념 도입 필요
	bot.addCommand(new NaturalCommand.Builder()
		.setName('행사', '📅')
		.setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.')
		.setExamples('행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사')
		.setUseDateParse(true, true)
		.setQuery({학교행사: null})
		.setExecute((self, chat, channel, {
			학교행사,
			duration: { from, to },
		}) => {
			// TODO: 명령어 오호출 방지 setMargin(1) 구현
			if (chat.filteredText.replace(/\s+/g, '').length > 0)
				return;
			
			const eventStr = getEvents(from, to);
			
			if (eventStr.length > 0) {
				$(channel).send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n——\n${eventStr}`);
			}
			else {
				$(channel).send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n——\n해당 기간에 학사일정이 없습니다.`);
			}
		})
		.setCronJob([
			{
				cron: '0 0 * * 1',
				comment: '월요일 자정에는 그 주의 모든 일정을 전송',
			}, {
				cron: '0 0 * * 0,2-6',
				comment: '월요일을 제외한 모든 요일의 자정에는 그 날의 일정을 전송',
			}
		], (self, index, dt) => {
			let eventStr;
			
			if (index === 0) {
				eventStr = getEvents(dt, DateTime.sunday());
			}
			else if (index === 1) {
				eventStr = getEvents(dt, dt);
			}
			
			for (let 기수 in studentRooms) {
				if (eventStr.length > 0) {
					$(studentRooms[기수]).send(`${self.icon} ${['이번 주', '오늘'][index]} 학사일정\n——\n${eventStr}`);
				}
			}
		})
		.build());
	
	// 봇 가동 시작
	bot.start();
	
	// db 갱신
	bot.on(Event.MESSAGE, (chat, channel) => {
		if (!_.isNumber(channel.customName)) {
			return;
		}
		
		// 개인 톡방 추가
		if (channel.isDirectChannel() && !(chat.user.id in DB.dmChannels)) {
			DB.dmChannels[chat.user.id] = channel.id;
			FS.writeObject(paths.dmChannels, DB.dmChannels);
		}
		
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
		if (chat.user.id in DB.users &&
		    (DB.users[chat.user.id].name !== chat.user.name ||
		     DB.users[chat.user.id].nth !== parseInt(channel.customName))) {
			DB.users[chat.user.id].name = chat.user.name;
			DB.users[chat.user.id].nth = Number(channel.customName);
			FS.writeObject(paths.users, DB.users);
		}
	});
} catch (err) {
	_.catch(err, debugRoom);
}