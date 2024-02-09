const BotManager = require('../../BotManager').get(BotManager);
const bot = BotManager.getCurrentBot();

// TODO: member permission command
// TODO: natural command와 date parser의 합작
let { StructuredCommand, NaturalCommand } = require('../../BotManager/Command');
let Event = require('../../BotManager/Event').Event;

let 공지방 = BotManager.getChannelById('394288262769869');

bot.addCommand(new StructuredCommand.Builder()
    .setName('학생회 알림')
    .setDescription('알림을 보냅니다.')
    .setUsage('<부서:string length=3> 알림 <기수:int[]?>')
    .setExamples(
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    )
    .setExecute((self, chat, channel, args) => {
        공지방.send('execute: ' + JSON.stringify(args, null, 4));
    })
    .setExecuteLazy((self, chat, prevChat, channel, prevChannel, args) => {
        공지방.send('executeLazy: ' + JSON.stringify(args, null, 4));
    })
    .setCronjobs({
        '오늘': "20 19 * * *",
        '점심': "21 19 * * *",
        '저녁': "22 19 * * *"
    })
    .setExecuteCron((tag) => {
        공지방.send('executeCron: ' + tag);
    })
    .build()
);

bot.on(Event.COMMAND, (chat, channel, command, args) => {
    공지방.send('Event.COMMAND: ' + command.name);
});

bot.on(Event.MESSAGE, (chat, channel) => {
    공지방.send('Event.MESSAGE: ' + chat.text);
});

// TEST: 뒤에 start해도 정상 작동하지?
bot.start();