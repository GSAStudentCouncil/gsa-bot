"use strict";

var _require = require('../index'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var _require2 = require('../../DateTime'),
  DateTime = _require2.DateTime;
var fs = require('fs');

// new StructuredCommand.Builder()
//     .setName('add')
//     .setDescription('add command')
//     .setUsage('add <num1:int> <num2:int?>')
//     .setExamples('add 7 8')
//     .setExecute((self, chat, channel, { num1, num2 }) => {
//         console.log(num1, num2);
//         console.log('합(add2):', num1 + num2);
//     })
//     .build().register();

// new StructuredCommand.Builder()
//     .setName('add2')
//     .setDescription('add command')
//     .setUsage('add <numbers:int[]?>')
//     .setExamples('add 1 2 3 4 5')
//     .setExecute((self, chat, channel, { numbers }) => {
//         console.log('합(add):', numbers.reduce((a, b) => a + b, 0));
//     })
//     .build().register();

// new NaturalCommand.Builder()
//     .setName('할 일')
//     .setDescription('할 일 추가 명령어')
//     .setQuery({})
//     .setExamples('오늘 병원 하기', '숙제 하기 다음 주 월요일')
//     .setUseDateParse(true)
//     .setExecute((self, chat, channel, { datetime }) => {
//         console.log('할 일:', chat.text, '| 날짜:', datetime.humanize());
//     })
//     .build().register();

// new NaturalCommand.Builder()
//     .setName('급식')
//     .setDescription('급식 명령어')
//     .setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.' +
//         '\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.')
//     .setCronJob({ '오늘': '0 0 * * *', '점심': '40 11 * * *', '저녁': '20 16 * * *' }, (self, tag) => {
//         console.log('executeCron:', tag);
//     })
//     .setQuery({ meal: null })
//     .setUseDateParse(true)
//     .setExecute((self, chat, channel, { meal, datetime }) => {
//         console.log('급식:', meal, '| 날짜:', datetime.humanize(), '| text:', chat.text, '| rawText:', chat.rawText);
//         console.log(self.manual());
//     })
//     .build().register();

// new StructuredCommand.Builder()
//     .setName('todo1')
//     .setDescription('할 일 추가 명령어, StructuredCommand')
//     .setUsage('todo <날짜:date duration=true>')
//     .setExecute((self, chat, channel, { 날짜: { from, to } }) => {
//         channel.send('todo1:', from.humanize(), '~', to.humanize());
//     })
//     .build().register();

// new NaturalCommand.Builder()
//     .setName('todo2')
//     .setDescription('할 일 추가 명령어, NaturalCommand')
//     .setQuery({})
//     .setUseDateParse(true, true)
//     .setExecute((self, chat, channel, { datetime: { from, to } }) => {
//         channel.send('todo2: ' + from.humanize() + '~' + to.humanize() + chat.filteredText);
//     })
//     .build().register();

new NaturalCommand.Builder().setName('event').setDescription('event command').setQuery({
  school_event: null
}).setUseDateParse(true, true).setExecute(function (self, chat, channel, _ref) {
  var school_event = _ref.school_event,
    _ref$datetime = _ref.datetime,
    from = _ref$datetime.from,
    to = _ref$datetime.to;
  var events = JSON.parse(fs.readFileSync('global_modules/bot-manager/Command/test/school_events.json', 'utf-8'));
  var satisfied = [];
  for (var date in events) {
    var dt = DateTime.parse(date);
    if (from.le(dt) && dt.le(to)) {
      satisfied.push("".concat(dt.toString('M월 D일'), ": ").concat(events[date]));
    }
  }
  channel.send("\uD83D\uDCC5 ".concat(from.humanize(), " ~ ").concat(to.humanize(), " \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\u2014\u2014\u2014\n").concat(satisfied.join('\n')));
}).build().register();

// new NaturalCommand.Builder()
//     .setName('test')
//     .setDescription('test command')
//     .setQuery({ meal: null, datetime: () => DateTime.now() })
//     .setUseDateParse(true, false, false)
//     .setExecute((self, chat, channel, { datetime }) => {
//         channel.send(datetime.humanize(), chat.filteredText);
//     })
//     .build().register();

function onMessage(chat, channel) {
  var _CommandRegistry$get = CommandRegistry.get(chat, channel),
    cmd = _CommandRegistry$get.cmd,
    args = _CommandRegistry$get.args;
  if (cmd) cmd.execute(chat, channel, args);
}
onMessage({
  text: '행사 3월 3일부터 다음 주 까지'
}, {
  name: 'test room',
  id: 982981398,
  send: function send() {
    var _console;
    return (_console = console).log.apply(_console, arguments);
  }
});