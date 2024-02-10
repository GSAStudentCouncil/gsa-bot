const { CommandRegistry, StructuredCommand, NaturalCommand } = require('../index.js');
const { Datetime } = require('../../datetime');
const fs = require('fs');

class Channel {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

공지방 = new Channel('공지방', 18768574);

cmd1 = new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string length=3> 알림 <기수:int[]?>',
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
    description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
    query: {
        '날짜': '오늘',
        '시간': () => {
            const dt = Datetime.now();

            if (dt.lt({ hour: 8, minute: 30 }))
                return "아침";
            else if (dt.lt({ hour: 13, minute: 30 }))
                return "점심";
            else if (dt.lt({ hour: 19, minute: 30 }))
                return "저녁";
            else
                return "아침";
        },
        '대상': [ '급식' ]
    },
    examples: [
        '오늘 밥',
        '오늘 급식',
        '내일 식사',
        '내일 저녁 식사',
        '모레 점심 밥'
    ],
    execute: (chat, channel, args, self) => {
        console.log(args);
        console.log(Datetime.parse(args.날짜).toString());
    }
});
cmd2.register();

function onMessage(chat, channel) {
    let { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd !== null)
        cmd.execute(chat, channel, args, cmd);
}

onMessage({ text: '내일 점심' }, 공지방);