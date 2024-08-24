"use strict";

var bot = BotManager.getCurrentBot();
var Jsoup = org.jsoup.Jsoup;
var _require = require('BotOperator/CronJob'),
  CronJob = _require.CronJob;
var _require2 = require('BotOperator/DateTime'),
  DateTime = _require2.DateTime;
CronJob.setWakeLock(true);
var getMeals = function getMeals(dt, bullet) {
  var options = [['ATPT_OFCDC_SC_CODE', 'F10'], ['SD_SCHUL_CODE', 7380031], ['MLSV_YMD', dt.toString('YYMMDD')], ['Type', 'xml']];
  try {
    var doc = Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?".concat(options.map(function (opt) {
      return opt.join('=');
    }).join('&'))).get();

    // 에러 코드 처리
    var resultElements = doc.select('RESULT > CODE');
    if (!resultElements.isEmpty() && !resultElements.text().equals('INFO-000')) {
      Log.e('Error code of resultElements: ' + resultElements.text());
      return [null, null, null];
    }

    // 에러 코드 처리 2
    var headElements = doc.select('head > RESULT > CODE');
    if (!headElements.isEmpty() && !headElements.text().equals('INFO-000')) {
      Log.e('Error code of headElements: ' + headElements.text());
      return [null, null, null];
    }
    var elements = doc.select('row');
    var meals = [null, null, null];
    for (var i = 0; i < elements.length; i++) {
      var element = elements.get(i);
      var mealType = String(element.select('MMEAL_SC_CODE').text());
      var dishName = String(element.select('DDISH_NM').text()).split(/ (?:\(\d+\.?(?:.\d+)*\))?(?:<br\/>|$)/g).filter(Boolean).map(function (e) {
        return bullet + e;
      }).join('\n');
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

CronJob.add("* * * * *", function () {
  java.lang.Thread.sleep(1 * 1000);
  var dt = DateTime.now();
  Log.info("after: " + dt);
});
CronJob.add("* * * * *", function () {
  var dt = DateTime.now();
  Log.info("before: " + dt);
}, {
  before: 1 * 1000
});

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

bot.addListener(Event.START_COMPILE, function () {
  CronJob.setWakeLock(false);
  CronJob.off();
});