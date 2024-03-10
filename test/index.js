const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../global_modules/BotOperator/Command/index');
const { DateTime } = require('../global_modules/BotOperator/DateTime');
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

new NaturalCommand.Builder()
    .setName('급식', '🍚')
    .setDescription('급식 명령어')
    .setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.' +
        '\n또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.')
    .setCronJob({ '오늘': '0 0 * * *', '점심': '40 11 * * *', '저녁': '20 16 * * *' }, (self, tag) => {
        console.log('executeCron:', tag);
    })
    .setQuery({ 급식: undefined, datetime: NaN })
    .setUseDateParse(true)
    .setExecute((self, chat, channel, { 급식, datetime }) => {
        if (chat.filteredText.replace(/\s+/g, '').length > 3)
			return;
		
		if (Number.isNaN(datetime))
			datetime = DateTime.now();

		if (급식 === '조식' || 급식 === '아침')
			datetime = datetime.parse('아침');
		else if (급식 === '중식' || 급식 === '점심')
			datetime = datetime.parse('점심');
		else if (급식 === '석식' || 급식 === '저녁')
			datetime = datetime.parse('저녁');

        console.log('급식:', 급식, '| 날짜:', datetime.humanize(), '| 채팅:', chat.filteredText);
    })
    .build().register();

// const getEvents = (from, to) => {
// 	const events = JSON.parse(fs.readFileSync('test/school_events.json', 'utf-8'));
// 	const satisfied = [];
	
// 	for (let date in events) {
// 		let dt = DateTime.parse(date);
		
// 		if (from.le(dt) && dt.le(to)) {
// 			satisfied.push(`· ${dt.toString('M월 D일')}: ${events[date]}`);
// 		}
// 	}
	
// 	return satisfied;
// };

// new NaturalCommand.Builder()
// 	.setName('행사', '📅')
// 	.setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.')
// 	.setExamples('행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사')
// 	.setUseDateParse(true, true)
// 	.setQuery({ 학교행사: null })
// 	.setExecute((self, chat, channel, { 학교행사, datetime: { from, to } }) => {
// 		if (chat.filteredText.replace(/\s+/g, '').length > 3)
// 			return;

// 		const events = getEvents(from, to);
		
// 		if (events.length > 0)
// 			channel.send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n—————\n${events.join('\n')}`);
// 		else
// 			channel.send(`${self.icon} 학사일정 (${from.humanize(true)} ~ ${to.humanize(true)})\n—————\n해당 기간에 학사일정이 없습니다.`);
// 	})
// 	.build().register();

function onMessage(chat, channel) {
    const { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd)
        cmd.execute(chat, channel, args);
}
onMessage({ text: '내일 밥' }, { name: 'test room', id: 982981398, send: (...msg) => console.log(...msg) });