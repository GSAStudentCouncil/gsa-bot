const { CommandRegistry, StructuredCommand, NaturalCommand, Position } = require('../index.js');
const fs = require("fs");

new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string length=3> 알림 <기수1:int max=30> <기수2:ints>',
    rooms: ['공지방'],
    examples: [
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    ],
    execute: (chat, channel, args, self) => {
        console.log(args);
    }
}).register();

cmd2 = new NaturalCommand({
    name: '급식',
    description: '급식을 알려줍니다.',
    query: {
        date: '오늘',
        time: () => {
            let now = new Date();
            if (now.getHours() < 8)
                return '아침';
            else if (now.getHours() < 13)
                return '점심';
            else if (now.getHours() < 19)
                return '저녁';
            else
                return null;
        },
        what: { 급식: null }
    },
    rooms: ['공지방'],
    examples: [
        '급식',
        '급식 2019-01-01',
        '급식 2019-01-01 점심',
        '급식 2019-01-01 점심 1'
    ],
    execute: (chat, channel, args, self) => {
        console.log(args);
    }
})

fs.writeFileSync('test.txt', cmd2.manual());

function onMessage(chat, channel) {
    let cmd = CommandRegistry.get(chat.text, channel.name);

    if (cmd !== null)
        cmd.execute(chat, channel);
}

onMessage({ text: '오늘 밥' }, { name: '공지방' });