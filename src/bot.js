const manager = require('../modules/DBManager').DBManager;
const cronjob = require('../modules/cronJob').CronJob;
const { datetime } = require('../modules/datetime');
const { CommandRegistry, NaturalCommand, StructuredCommand } = require('../modules/command-handler');

const app = manager.getInstance({});

FileStream.writeObject = (path, data) => FileStream.write(path, JSON.stringify(data));
FileStream.readObject = (path, offset={}) => {
    const read = FileStream.read(path);
    return read == null ? offset : JSON.parse(read);
};

const paths = {
    users: "/sdcard/msgbot/users.json",
    channels: "/sdcard/msgbot/channels.json"
};

const db = {
    users: FileStream.readObject(paths.users),
    channels: FileStream.readObject(paths.channels, { i2c: {}, c2i: {} }),
    userReload: (user, channel) => {
        db.users[user.id] = { name: user.name, channelId: channel.id }
    },
    channelReload: channel => {
        db.channels.i2c[channel.id] = channel.name;
        db.channels.c2i[channel.name] = channel.id;
    }
};

const students_room = {};
const channels = {};
for (let name in db.channels.c2i) {
    if (/^\d+$/.test(name))     // 채널명이 '39', '40' 과 같은 경우
        students_room[Number(name)] = manager.getChannelById(db.channels.c2i[name]);

    channels[name] = manager.getChannelById(db.channels.c2i[name]);
}

let lazyArguments = [];

app.start();
cronjob.setWakeLock(true);

app.on('message', (chat, channel) => {

});

app.on('message', (chat, channel) => {
    CommandRegistry.run(chat, channel);

    // 지연 명령어 실행 처리
    if (lazyArguments.length !== 0) {
        const [ prevChat, prevChannel, args, cmd ] = lazyArguments;

        if ((chat.user.id === prevChat.user.id && channel.id === prevChannel.id)) {
            cmd.execute(chat, channel, args, cmd, prevChat, prevChannel);

            lazyArguments = [];
            return;
        }
    }

    const { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd !== null) {
        // 지연 명령어 처리
        if (cmd.name === '학생회 공지') {
            if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
                channel.send("학생회 종류가 잘못되었습니다.");  
                return;
            }

            lazyArguments = [ chat, channel, args, cmd ];
            channel.send(`${chat.user.name}님, ${args.부서} 공지글을 작성해주세요. 취소하려면 "취소"를 입력하세요.`);
        }
        else
            cmd.execute(chat, channel, args, cmd);
    }

    // 채널이 없으면 추가하고, 이름이나 아이디가 달라지면 업데이트. 채널의 멤버도 업데이트.
    if (!(channel.id in db.channels.i2c) || !(channel.name in db.channels.c2i) ||
        !(db.channels.i2c[channel.id] === channel.name && db.channels.c2i[channel.name] === channel.id)) {
        db.channelReload(channel);
        FileStream.writeObject(paths.channels, db.channels);

        channel.members.forEach(user => db.userReload(user, channel));
        FileStream.writeObject(paths.users, db.users);
    }

    // 유저가 없으면 추가하고, 이름이나 채널이 달라지면 업데이트.
    if (!(chat.user.id in db.users) ||
        !(db.users[chat.user.id].name === chat.user.name && db.users[chat.user.id].channelId === channel.id)) {
        db.userReload(chat.user, channel);
        FileStream.writeObject(paths.users, db.users);
    }
});

////////////////////// 도움말 //////////////////////

StructuredCommand.add({
    name: '도움말',
    description: '도움말을 표시합니다.',
    usage: '도움말 <명령어:string[]?>',
    examples: [
        '도움말',
        '도움말 급식',
        '도움말 공지'
    ],
    execute: (chat, channel, args, self) => {
        args.명령어 = (args.명령어 || []).join(' ');

        if (args.명령어 === '' || !(args.명령어 in CommandRegistry.data)) {
            let ret = [
                '📦 명령어 목록',
                '——————'
            ];

            CommandRegistry.loop(cmd => {
                if (cmd.name !== '도움말')
                    ret.push(`· ${cmd.name}`)
            });
            ret.push('');
            ret.push('세부 도움말을 보고 싶은 경우, "도움말 <명령어>"를 입력하세요.');

            channel.send(ret.join('\n'));
        } else {
            const found = CommandRegistry.data[args.명령어];
            channel.send(found.manual());
        }
    }
});

////////////////////// 급식 //////////////////////

function web(string, options) {
    return JSON.parse(org.jsoup.Jsoup.connect(string[0].concat(options.map(option => option.join("=")).join("&"))).get().text());
}

/** @param {datetime} date */
const getMeals = date => {
    const options = [
        ["ATPT_OFCDC_SC_CODE", "F10"],
        ["SD_SCHUL_CODE", 7380031],
        ["MLSV_YMD", '240110'], // FIXME: date.toString('YYMMDD')
        ["Type", "json"],
    ];

    const data = web`https://open.neis.go.kr/hub/mealServiceDietInfo?${options}`;

    return [0, 1, 2].map(i =>
        data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"]
            .replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim()
    );
};

const mealCronjob = time => {
    const date = datetime.today();

    let meal;
    if (time === "오늘") {
        const meals = getMeals(date);
        meal = `[아침]\n${meals[0]}\n\n[점심]\n${meals[1]}\n\n[저녁]\n${meals[2]}`;
    }
    else if (time === "아침" || time === "점심" || time === "저녁")
        meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(time)];
    else
        return;

    for (let 기수 in students_room) {
        students_room[기수].send(`🍚 오늘 ${time} 급식\n—————\n${meal}`);
    }
};

cronjob.add("0 0 * * *", () => mealCronjob("오늘"));
cronjob.add("40 11 * * *", () => mealCronjob("점심"));
cronjob.add("20 16 * * *", () => mealCronjob("저녁"));

NaturalCommand.add({
    name: '급식',
    description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
    query: {
        '날짜': '오늘',
        '시간': () => {
            const dt = datetime.now();

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
        const date = datetime.parse(args.날짜).set(datetime.today().시간);
        const meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(args.시간)];

        channel.send(`🍚 ${args.날짜} ${args.시간} 급식\n—————\n${meal}`);
    }
});

////////////////////// 공지 //////////////////////

StructuredCommand.add({
    name: '공지',
    description: "학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n명령어를 작성한 뒤, 다음 메시지 내용을 공지 메시지로 처리합니다.",
    usage: "<부서:string length=3> 알림 <기수:int[]? min=39>",
    channels: [channels['공지방']],
    examples: [
        '생체부 알림\n기숙사 3월 기상곡입니다 ...',
        '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'
    ],
    execute: (chat, channel, args, self, prevChat, prevChannel) => {
        if (chat.content === '취소') {
            channel.send('공지 전송이 취소되었습니다.');
            return;
        }

        if (args.기수.length === 0) {
            const max = Math.max(...Object.keys(students_room));
            args.기수 = [max - 2, max - 1, max];
        }

        for (let 기수 of args.기수) {
            if (!(기수 in students_room)) {
                channel.send(`${기수} 에 전송 실패하였습니다.\n"${기수}" 채널이 존재하지 않습니다.`);
                return;
            }

            students_room[기수].send(`🔔 ${args.부서}\n—————\n${chat.text}`).then(
                _ => channel.send(`${기수} 에 전송하였습니다.`),
                e => channel.send(`${기수} 에 전송 실패하였습니다.\n${e.toString()}`)
            );
        }
    }
});