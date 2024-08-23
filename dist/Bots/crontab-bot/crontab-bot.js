"use strict";

var BotOperator = require('BotOperator').from(BotManager);
var Jsoup = org.jsoup.Jsoup;
var bot = BotOperator.getCurrentBot();
var _require = require('BotOperator/Command'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var _require2 = require('BotOperator/DateTime'),
  DateTime = _require2.DateTime;
var staffRoom = BotOperator.getChannelById('412937930061983'); // 학생회 임원방
var debugRoom1 = BotOperator.getChannelById('413027239498239'); // 디버그방1
var debugRoom2 = BotOperator.getChannelById('413028250715651'); // 디버그방2
var logRoom = BotOperator.getChannelById('413032741340672'); // 로그방

bot.setLogRoom(logRoom);
bot.setDebugRooms(debugRoom1, debugRoom2);
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
    Log.d(JSON.stringify(meals));
    return meals;
  } catch (e) {
    Log.e(e);
    return [null, null, null];
  }
};
bot.addCommand(new NaturalCommand.Builder().setName('급식', '🍚').setDescription("\uC785\uB825\uD55C \uC2DC\uAC04\uC5D0 \uB9DE\uCDB0 \uAE09\uC2DD\uC744 \uC804\uC1A1\uD569\uB2C8\uB2E4. \uC2DC\uAC04\uC744 \uC0DD\uB7B5\uD558\uBA74 \uBA54\uC2DC\uC9C0\uB97C \uC804\uC1A1\uD55C \uC2DC\uAC01\uC73C\uB85C \uC124\uC815\uB429\uB2C8\uB2E4.\n\uC608\uB97C \uB4E4\uC5B4, \uC544\uCE68\uACFC \uC810\uC2EC \uC2DC\uAC04 \uC0AC\uC774\uC5D0 \uBA85\uB839\uC5B4\uB97C \uD638\uCD9C\uD558\uBA74 \uC810\uC2EC \uAE09\uC2DD\uC744 \uC54C\uB824\uC8FC\uACE0, \uC810\uC2EC\uACFC \uC800\uB141 \uC2DC\uAC04 \uC0AC\uC774\uC5D0\uB294 \uC800\uB141 \uAE09\uC2DD\uC744 \uC54C\uB824\uC90D\uB2C8\uB2E4.\n\uB610\uD55C, \uB9E4\uC77C \uC790\uC815 \uADF8 \uB0A0\uC758 \uBAA8\uB4E0 \uAE09\uC2DD\uC744 \uC54C\uB824\uC8FC\uACE0, 3\uAD50\uC2DC\uC5D0\uC11C 4\uAD50\uC2DC\uB85C \uAC00\uB294 \uC26C\uB294 \uC2DC\uAC04\uC5D0\uB294 \uC810\uC2EC, 7\uAD50\uC2DC \uC774\uD6C4 \uCCAD\uC18C \uC2DC\uAC04\uC5D0 \uC800\uB141 \uAE09\uC2DD\uC744 \uC815\uAE30\uC801\uC73C\uB85C \uC804\uC1A1\uD569\uB2C8\uB2E4.").setExamples('그제 급식', '오늘 밥', '모레 급식', '석식', '내일 점심밥', '금요일 아침', '급식 3/29', '급식 다다음주 목요일').setQuery({
  급식: null,
  datetime: NaN
}).setUseDateParse(0, true, false, false).setExecute(function (self, chat, channel, _ref) {
  var 급식 = _ref.급식,
    datetime = _ref.datetime;
  if (isNaN(datetime)) {
    datetime = DateTime.now();
  }

  // 급식의 의미를 담은 토큰이 시간의 의미도 동시에 갖는 경우 처리
  if (급식 === '조식' || 급식 === '아침') {
    datetime = datetime.parse('아침');
  } else if (급식 === '중식' || 급식 === '점심') {
    datetime = datetime.parse('점심');
  } else if (급식 === '석식' || 급식 === '저녁') {
    datetime = datetime.parse('저녁');
  }
  var meals;

  // "오늘 밥" 같은 명령어는 급식 전체 출력
  if (datetime.eq({
    hour: 0,
    minute: 0
  })) {
    meals = getMeals(datetime, ' · ').map(function (e) {
      return e ? e : '급식 정보가 없습니다.';
    });
    var _msg = "".concat(self.icon, " ").concat(datetime.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\n\uD83C\uDF73 \uC870\uC2DD\n").concat(meals[0], "\n\n\uD83C\uDF54 \uC911\uC2DD\n").concat(meals[1], "\n\n\uD83C\uDF71 \uC11D\uC2DD\n").concat(meals[2]);
    channel.send(_msg);
    return;
  }
  meals = getMeals(datetime, '· ').map(function (e) {
    return e ? e : '급식 정보가 없습니다.';
  });
  var msg;

  // 급식 시간에 따라 메시지 전송
  if (datetime.isWeekend() ? datetime.lt({
    hour: 8,
    minute: 50
  }) : datetime.lt({
    hour: 8,
    minute: 10
  })) {
    msg = "\uD83C\uDF73 ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\n").concat(meals[0]);
  } else if (datetime.lt({
    hour: 13,
    minute: 10
  })) {
    msg = "\uD83C\uDF54 ".concat(datetime.humanize(true), " \uC911\uC2DD\n\u2014\u2014\n").concat(meals[1]);
  } else if (datetime.lt({
    hour: 19,
    minute: 10
  })) {
    msg = "\uD83C\uDF71 ".concat(datetime.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\n").concat(meals[2]);
  } else {
    // 저녁 시간이 끝난 후에 급식 명령어를 치는 건 내일 조식을 보겠다는 것으로 해석함
    datetime = datetime.add({
      day: 1
    });
    meals = getMeals(datetime, '· ').map(function (e) {
      return e ? e : '급식 정보가 없습니다.';
    });
    msg = "\uD83C\uDF73 ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\n").concat(meals[0]);
  }
  if (bot.isDebugMod) debugRoom1.send(msg);else channel.send(msg);
}).setCronJob([{
  cron: '* * * * *',
  comment: '매일 자정에 그 날의 모든 메뉴 전송'
}, {
  cron: '*/2 * * * *',
  comment: '3교시 쉬는 시간 (11:40)에 점심 메뉴 전송'
}, {
  cron: '*/3 * * * *',
  comment: '7교시 이후 청소 시간 (16:20)에 저녁 메뉴 전송'
}], function (self, index, dt) {
  Log.info(index + ": " + dt);
}).build());
bot.addCommand(new StructuredCommand.Builder().setName('math', '+').setDescription('addition operator').setUsage('math <number1:int> + <number2:int>').setExecute(function (self, chat, channel, _ref2) {
  var number1 = _ref2.number1,
    number2 = _ref2.number2;
  Log.info(number1 + number2);
}).build());
bot.addCommand(new StructuredCommand.Builder().setName('ping', 'P').setDescription('Ping test').setUsage('ping').setExecute(function () {
  Log.info('Pong!');
}).setCronJob([{
  cron: '* * * * *',
  comment: '매분마다 테스트'
}], function (self, index, dt) {
  Log.info('3: pong');
}).build());
bot.start();