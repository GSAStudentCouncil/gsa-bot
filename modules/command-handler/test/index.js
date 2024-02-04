const { CommandRegistry, StructuredCommand, NaturalCommand, Position } = require('../index.js');
fs = require('fs');

class Channel {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

공지방 = new Channel('공지방', 1);

cmd1 = new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string length=3> 알림 <기수:int[]? min=30>',
    channels: [공지방],
    examples: [
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    ],
    execute: (chat, channel, args, self) => {
        console.log(args);
    }
});
cmd1.register();

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
    channels: [공지방],
    examples: [
        '급식',
        '급식 2019-01-01',
        '급식 2019-01-01 점심',
        '급식 2019-01-01 점심 1'
    ],
    execute: (chat, channel, args, self) => {
        console.log(args);
    }
});
cmd2.register();

function onMessage(chat, channel) {
    let { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd !== null)
        cmd.execute(chat, channel, args, cmd);
}

onMessage({ text: '밥 오늘' }, { name: '공지방' });