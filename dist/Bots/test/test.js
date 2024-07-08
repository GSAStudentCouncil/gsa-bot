"use strict";

var bot = BotManager.getCurrentBot();
var _require = require('BotOperator/DateTime'),
  DateTime = _require.DateTime;
var Jsoup = org.jsoup.Jsoup;

/**
 * @param {DateTime} dt
 * @param {String} bullet
 * @return {String[]}
 */
var getMeals = function getMeals(dt, bullet) {
  var options = [['ATPT_OFCDC_SC_CODE', 'F10'], ['SD_SCHUL_CODE', 7380031], ['MLSV_YMD', dt.toString('YYMMDD')], ['Type', 'xml']];
  try {
    var doc = Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?" + options.map(function (opt) {
      return opt.join('=');
    }).join('&')).get();

    // 에러 코드 처리
    var resultElements = doc.select('RESULT > CODE');
    if (!resultElements.isEmpty() && !resultElements.text().equals('INFO-000')) {
      Log.e("1\n" + resultElements.text());
      return [null, null, null];
    }

    // 에러 코드 처리 2
    var headElements = doc.select('head > RESULT > CODE');
    if (!headElements.isEmpty() && !headElements.text().equals('INFO-000')) {
      Log.e("2\n" + headElements.text());
      return [null, null, null];
    }
    var elements = doc.select('row');
    var breakfast = null;
    var lunch = null;
    var dinner = null;
    for (var i = 0; i < elements.length; i++) {
      var element = elements.get(i);
      Log.e("3_" + String(i) + "\n" + element.text());
      var mealType = element.select('MMEAL_SC_CODE').text();
      Log.e("4_" + String(i) + "\n" + mealType);
      Log.e("5_" + String(i) + "\n" + element.select('DDISH_NM').text());
      var dishName = element.select('DDISH_NM').text().split(/ (?:\(\d+\.?(?:.\d+)*\))?(?:<br\/>|$)/g).filter(Boolean).map(function (e) {
        return bullet + e;
      }).join('\n');
      if (mealType === '1') {
        breakfast = dishName;
      } else if (mealType === '2') {
        lunch = dishName;
      } else if (mealType === '3') {
        dinner = dishName;
      }
    }
    return [breakfast, lunch, dinner];
  } catch (err) {
    Log.i(err.name + "\n——\n" + err.message + "\n" + err.stack.trimEnd());
    return [null, null, null];
  }
};
bot.addListener(Event.MESSAGE, function (msg) {
  var meals = getMeals(DateTime.now(), '• ');
});