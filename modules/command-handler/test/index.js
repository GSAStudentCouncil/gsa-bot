const { Command, StructuredCommand, TokenizedCommand } = require('../index.js');
const fs = require("fs");

let commands = [];

// TEST: TokenizedCommand
let cmd = new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string length=3> 알림 <기수1:int min=30> <기수2:ints>',
    rooms: ['공지방'],
    examples: [
        '학생회 알림 1 2 3',
        '정보부 알림 1'
    ]
}).on((chat, channel, args) => {
    console.log(args);
});

commands.push(cmd);

((chat, channel) => {
    for (let cmd of commands) {
        let matched = chat.text.match(cmd.regex);
        if (matched !== null) {    // 명령어 자체는 만족하나, 세부 속성까지도 만족하는지 확인
            let groups = matched.slice(1);  // 매치된 인자들
            let flag = true;    // 세부 속성을 만족하는지 여부

            let args = {};
            cmd.args.forEach((arg, i) => {
                let ret = arg.parse(groups[i]);
                if (ret === false) {
                    flag = false;
                    return false;
                }

                args[arg.name] = ret;
            });

            if (!flag)  // 세부 속성을 만족하지 못했을 경우
                continue;

            if (cmd.rooms.length !== 0 && !cmd.rooms.includes(channel.name))    // 방이 포함되어 있지 않을 경우
                continue;

            cmd.callback(chat, channel, args);

            break; // 여러 명령어가 만족할 수 있으나, 가장 먼저 만족한 명령어만 실행
        }
    }
})({ text: '학생회 알림 1 2 3' }, null);

let cmd2 = new TokenizedCommand({
    name: '급식',
    description: '급식을 알려줍니다.',
    query: {
        date: {
            type: 'date',
            optional: true,
            default: new Date()
        },
        time: {
            type: 'time',
            optional: true,
            default: new Date()
        },
        meal: {
            type: 'meal',
            optional: true,
            default: '점심'
        }
    },
    rooms: ['공지방'],
    examples: [
        '급식',
        '급식 점심',
        '급식 내일 저녁',
        '급식 그제 아침',
        '급식 2018-12-25 점심',
        '급식 2018-12-25 12:30',
        '급식 2018-12-25 12:30 점심'
    ]
}).on((chat, channel, args) => {
    console.log(args);
});
