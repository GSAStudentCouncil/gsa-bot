const bot = BotManager.getCurrentBot();
var Jsoup = org.jsoup.Jsoup;
let { CronJob } = require('../../global_modules/BotOperator/CronJob');
let { DateTime } = require('../../global_modules/BotOperator/DateTime');
CronJob.setWakeLock(true);

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
		
		return meals;
	} catch (e) {
		Log.e(e);
		return [null, null, null];
	}
};

// CronJob.add("* * * * *", () => {
//     let dt = DateTime.now();
//     Log.info("after: " + dt);
// }, { before: -1*1000 });

CronJob.add("* * * * *", () => {
	java.lang.Thread.sleep(1*1000);
    let dt = DateTime.now();
    Log.info("after: " + dt);
},);

CronJob.add("* * * * *", () => {
    let dt = DateTime.now();
    Log.info("before: " + dt);
}, { before: 1*1000 });

// CronJob.add("*/2 * * * *", () => {
//     let dt = DateTime.now();
//     Log.info("1: " + dt);
// });

// CronJob.add("*/3 * * * *", () => {
//     let dt = DateTime.now();
//     Log.info("2: " + dt);
// });

// CronJob.add("* * * * *", () => {
//     let dt = DateTime.now();
    // Log.info("3: pong");
// });

bot.addListener(Event.START_COMPILE, () => {
    CronJob.setWakeLock(false);
    CronJob.off();
})
