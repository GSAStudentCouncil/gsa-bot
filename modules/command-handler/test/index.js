const { Command, StructuredCommand, TokenizedCommand } = require('../index.js');

let commands = [];

// TEST
let cmd = new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string> 알림 <기수:ints>',
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
            let groups = matched.slice(1);
            let flag = true;

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

            cmd.callback(chat, channel, args);

            return; // 여러 명령어가 만족할 수 있으나, 가장 먼저 만족한 명령어만 실행
        }
    }
})({ text: '학생회 알림 1 2 3' }, null);
