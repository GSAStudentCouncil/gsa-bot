"use strict";

var BotOperator = require('BotOperator').from(BotManager);
var bot = BotOperator.getCurrentBot();
var _require = require('BotOperator/Command'),
  StructuredCommand = _require.StructuredCommand;
var logRoom = BotOperator.getChannelById('413032741340672'); // 로그방
bot.setLogRoom(logRoom);

/**
 * @param {DateTime} dt
 * @param {String} bullet
 * @return {String[]}
 */
var getMeals = function getMeals(dt, bullet) {
  var options = [['ATPT_OFCDC_SC_CODE', 'F10'], ['SD_SCHUL_CODE', 7380031], ['MLSV_YMD', dt.toString('YYMMDD')], ['Type', 'xml']];
  try {
    var doc = org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?".concat(options.map(function (opt) {
      return opt.join('=');
    }).join('&'))).get();

    // 에러 코드 처리
    var resultElements = doc.select('RESULT > CODE');
    if (!resultElements.isEmpty() && !resultElements.text().equals('INFO-000')) {
      return [null, null, null];
    }

    // 에러 코드 처리 2
    var headElements = doc.select('head > RESULT > CODE');
    if (!headElements.isEmpty() && !headElements.text().equals('INFO-000')) {
      return [null, null, null];
    }
    var elements = doc.select('row');
    var breakfast = null;
    var lunch = null;
    var dinner = null;
    for (var i = 0; i < elements.length; i++) {
      var element = elements.get(i);
      var mealType = element.select('MMEAL_SC_CODE').text();
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
  } catch (e) {
    if (logRoom != null) logRoom.error("\uAE09\uC2DD \uC815\uBCF4\uB97C \uAC00\uC838\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.\n\n".concat(e));
    return [null, null, null];
  }
};
bot.addCommand(new StructuredCommand.Builder().setName('cronjob', 'C').setDescription('CronJob test').setUsage('cronjob').setExecute(function () {}).setCronJob([{
  cron: '* * * * *',
  comment: 'Every minute'
}], function (self, index, dt) {
  Log.debug(getMeals(dt, '•').join('\n\n'));
}).build());
bot.start();