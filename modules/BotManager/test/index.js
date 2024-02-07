let BotManager = require('../../BotManager')(BotManager);
const bot = BotManager.getCurrentBot({});

let { StructuredCommandBuilder, NaturalCommandBuilder } = require('../../BotManager/Command');
let Event = require('../../BotManager/Event').Event;

bot.addCommand(new StructuredCommandBuilder()
    .setName('학생회 알림')
    .setDescription('알림을 보냅니다.')
    .setUsage('<부서:string length=3> 알림 <기수:int[]?>')
    .setExamples(
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    )
    .setExecute((chat, channel, self, args) => {
        console.log(args);
    })
    .setExecuteLazy((chat, prevChat, channel, prevChannel, self, args) => {
        console.log(args);
    })
    .setCronjobs({
        '오늘': "0 0 * * *",
        '점심': "40 11 * * *",
        '저녁': "20 16 * * *"
    })
    .setExecuteCron((tag) => {
        console.log(tag);
    })
    .build()
);

bot.start();

bot.on(Event.COMMAND, (chat, channel, command, args) => {

});