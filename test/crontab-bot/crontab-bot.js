let BotOperator = require('../../global_modules/BotOperator').from(BotManager);
var Jsoup = org.jsoup.Jsoup;
let bot = BotOperator.getCurrentBot();
let { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/BotOperator/Command');
let { DateTime } = require('../../global_modules/BotOperator/DateTime');

let staffRoom = BotOperator.getChannelById('412937930061983');	// 학생회 임원방
let debugRoom1 = BotOperator.getChannelById('413027239498239');	// 디버그방1
let debugRoom2 = BotOperator.getChannelById('413028250715651');	// 디버그방2
let logRoom = BotOperator.getChannelById('413032741340672');	// 로그방

bot.setLogRoom(logRoom);
bot.setDebugRooms(debugRoom1, debugRoom2);

let getMeals = (dt, bullet) => {
	let options = [
		['ATPT_OFCDC_SC_CODE', 'F10'],
		['SD_SCHUL_CODE', 7380031],
		['MLSV_YMD', dt.toString('YYMMDD')],
		['Type', 'xml']];
	
	try {
		let doc = Jsoup.connect(
			`https://open.neis.go.kr/hub/mealServiceDietInfo?${options.map(
				opt => opt.join('=')).join('&')}`).get();
		
		// 에러 코드 처리
		let resultElements = doc.select('RESULT > CODE');
		if (!resultElements.isEmpty() &&
		    !resultElements.text().equals('INFO-000')) {
            Log.e('Error code of resultElements: ' + resultElements.text());
			return [null, null, null];
		}
		
		// 에러 코드 처리 2
		let headElements = doc.select('head > RESULT > CODE');
		if (!headElements.isEmpty() &&
		    !headElements.text().equals('INFO-000')) {
            Log.e('Error code of headElements: ' + headElements.text());
			return [null, null, null];
		}
		
		let elements = doc.select('row');
		let meals = [null, null, null];
		
		for (let i = 0; i < elements.length; i++) {
			let element = elements.get(i);
			let mealType = String(element.select('MMEAL_SC_CODE').text());
			let dishName = String(element.select('DDISH_NM').text())
				.split(/ (?:\(\d+\.?(?:.\d+)*\))?(?:<br\/>|$)/g)
				.filter(Boolean)
				.map(e => bullet + e)
				.join('\n');
			
			meals[mealType - 1] = dishName;
		}
		
        Log.d(JSON.stringify(meals));
		return meals;
	} catch (e) {
		Log.e(e);
		return [null, null, null];
	}
};

bot.addCommand(new NaturalCommand.Builder()
    .setName('급식', '🍚')
    .setDescription(`입력한 시간에 맞춰 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 시각으로 설정됩니다.\n예를 들어, 아침과 점심 시간 사이에 명령어를 호출하면 점심 급식을 알려주고, 점심과 저녁 시간 사이에는 저녁 급식을 알려줍니다.\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 3교시에서 4교시로 가는 쉬는 시간에는 점심, 7교시 이후 청소 시간에 저녁 급식을 정기적으로 전송합니다.`)
    .setExamples('그제 급식', '오늘 밥', '모레 급식', '석식', '내일 점심밥', '금요일 아침', '급식 3/29', '급식 다다음주 목요일')
    .setQuery({
        급식: null,
        datetime: NaN,
    })
    .setUseDateParse(0, true, false, false)
    .setExecute((self, chat, channel, { 급식, datetime }) => {
        if (isNaN(datetime)) {
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
            channel.send(msg);
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

        if (bot.isDebugMod)
            debugRoom1.send(msg);
        else
            channel.send(msg);
    })
    .setCronJob([
        {
            cron: '* * * * *',
            comment: '매일 자정에 그 날의 모든 메뉴 전송',
        }, {
            cron: '*/2 * * * *',
            comment: '3교시 쉬는 시간 (11:40)에 점심 메뉴 전송',
        }, {
            cron: '*/3 * * * *',
            comment: '7교시 이후 청소 시간 (16:20)에 저녁 메뉴 전송',
        }
    ], (self, index, dt) => {
        Log.info(index + ": " + dt);
    })
    .build()
);

bot.addCommand(new StructuredCommand.Builder()
    .setName('math', '+')
    .setDescription('addition operator')
    .setUsage('math <number1:int> + <number2:int>')
    .setExecute((self, chat, channel, { number1, number2 }) => {
        Log.info(number1 + number2);
    })
    .build()
);

bot.addCommand(new StructuredCommand.Builder()
    .setName('ping', 'P')
    .setDescription('Ping test')
    .setUsage('ping')
    .setExecute(() => {
        Log.info('Pong!');
    })
    .setCronJob([
        { cron: '* * * * *', comment: '매분마다 테스트' }
    ], (self, index, dt) => {
        Log.info('3: pong');
    })
    .build()
);

bot.start();