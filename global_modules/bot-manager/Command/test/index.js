const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../index');
const { DateTime } = require('../../DateTime');
const fs = require('fs');

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

new StructuredCommand.Builder()
    .setName('todo1')
    .setDescription('할 일 추가 명령어, StructuredCommand')
    .setUsage('todo <날짜:date duration=true>')
    .setExecute((self, chat, channel, { 날짜: { from, to } }) => {
        console.log('todo1:', from.humanize(), '~', to.humanize());
    })
    .build().register();

new NaturalCommand.Builder()
    .setName('todo2')
    .setDescription('할 일 추가 명령어, NaturalCommand')
    .setQuery({})
    .setUseDateParse(true, true)
    .setExecute((self, chat, channel, { datetime: { from, to } }) => {
        console.log('todo2:', from.humanize(), '~', to.humanize(), chat.text);
    })
    .build().register();

new NaturalCommand.Builder()
    .setName('event')
    .setDescription('event command')
    .setQuery({ school_event: null })
    .setUseDateParse(true, true)
    .setExecute((self, chat, channel, { school_event, datetime: { from, to } }) => {
        const events = JSON.parse(fs.readFileSync('school_events.json', 'utf-8'));
        const satisfied = [];
        
        for (let date in events) {
            let dt = DateTime.parse(date);
            
            if (from.le(dt) && dt.le(to)) {
                satisfied.push(`${dt.toString('M월 D일')}: ${events[date]}`);
            }
        }
        
        console.log(`📅 ${from.humanize()} ~ ${to.humanize()} 학사일정\n—————\n${satisfied.join('\n')}`);
    })
    .build().register();

function onMessage(chat, channel) {
    const { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd) {
        cmd.execute(chat, channel, args);
    }
}
onMessage({ text: '어제부터 4월 5일까지 행사' }, { name: 'test room', id: 982981398 });