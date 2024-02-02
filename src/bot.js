const manager = require('../modules/DBManager').DBManager;
const cronjob = require('../modules/cronJob').CronJob;
const { datetime } = require('../modules/datetime');
const { CommandRegistry, NaturalCommand, StructuredCommand } = require('../modules/command-handler');

FileStream.writeObject = (path, data) => FileStream.write(path, JSON.stringify(data));
FileStream.readObject = (path, offset={}) => {
    const read = FileStream.read(path);
    return read == null ? offset : JSON.parse(read);
};

const app = manager.getInstance({});

const paths = {
    users: "/sdcard/msgbot/users.json",
    channels: "/sdcard/msgbot/channels.json"
};

const DB = {
    users: FileStream.readObject(paths.users),
    channels: FileStream.readObject(paths.channels, { i2c: {}, c2i: {} }),
    userReload: (user, channel) => {
        DB.users[user.id] = { name: user.name, channelId: channel.id }
    },
    channelReload: channel => {
        DB.channels.i2c[channel.id] = channel.name;
        DB.channels.c2i[channel.name] = channel.id;
    }
};

let lazyArguments = [];

app.start();
cronjob.setWakeLock(true);

app.on('message', (chat, channel) => {
    if (lazyArguments.length !== 0) {
        const [ prevChat, prevChannel, args, cmd ] = lazyArguments;

        if ((chat.user.id === prevChat.user.id && channel.id === prevChannel.id)) {
            cmd.execute(chat, channel, args, cmd, prevChat, prevChannel);

            lazyArguments = [];
            return;
        }
    }

    if (chat.text.startsWith('도움말')) {
        const subcommand = chat.text.substring(3).trim();
        let found = null;

        for (let cmd of CommandRegistry.data) {
            if (subcommand === cmd.name) {
                found = cmd;
                break;
            }
        }

        if (found == null)
            channel.send(`[세부 도움말]\n${CommandRegistry.data.map(d => `도움말 ${d.name}`).join('\n')}`);
        else
            channel.send(found.manual());

        return;
    }

    const { cmd, args } = CommandRegistry.get(chat.text, channel.id);

    if (cmd !== null) {
        if (cmd.name === '학생회 공지') {
            lazyArguments = [chat, channel, args, cmd];
            channel.send(`${chat.user.name}님, ${args.부서} 공지글을 작성해주세요.`);
        }
        else
            cmd.execute(chat, channel, args, cmd);
    }

    if (!(channel.id in DB.channels.i2c) || !(channel.name in DB.channels.c2i) ||
        !(DB.channels.i2c[channel.id] === channel.name && DB.channels.c2i[channel.name] === channel.id)) {
        DB.channelReload(channel);
        FileStream.writeObject(paths.channels, DB.channels);

        channel.members.forEach(user => DB.userReload(user, channel));
        FileStream.writeObject(paths.users, DB.users);
    }

    if (!(chat.user.id in DB.users) ||
        !(DB.users[chat.user.id].name === chat.user.name && DB.users[chat.user.id].channelId === channel.id)) {
        DB.userReload(chat.user, channel);
        FileStream.writeObject(paths.users, DB.users);
    }
});

////////////////////// 도움말 //////////////////////

StructuredCommand.add({
    name: '도움말',
    description: '도움말을 표시합니다. 세부 도움말을 보고 싶은 경우, "도움말 [명령어]"를 입력하세요.',
    usage: '도움말 <명령어:strings0>',
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

    for (let id in DB.channels.i2c) {
        const channel = manager.getChannelById(id);
        channel.send(`🍚 ${time} 급식\n─────\n${meal}`);
    }
};

cronjob.add("0 0 * * *", () => mealCronjob("오늘"));
cronjob.add("40 11 * * *", () => mealCronjob("점심"));
cronjob.add("20 16 * * *", () => mealCronjob("저녁"));

NaturalCommand.add({
    name: '급식',
    description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
    query: {
        'date': '오늘',
        'time': () => {
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
        'what': { '급식': null }  // FIXME: optional로 들어감
    },
    examples: [
        '오늘 밥',
        '오늘 급식',
        '내일 식사',
        '내일 저녁 식사',
        '모레 점심 밥'
    ],
    execute: (chat, channel, args, self) => {
        const date = datetime.parse(args.date).set(datetime.today().time);
        const meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(args.time)];

        channel.send(`🍚 ${args.date} ${args.time} 급식\n─────\n${meal}`);
    }
});

////////////////////// 공지 //////////////////////

StructuredCommand.add({
    name: '공지',
    description: "학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n명령어를 작성한 뒤, 다음 메시지 내용을 공지 메시지로 처리합니다.",
    usage: "<부서:string length=3> 알림 <기수:ints0 min=39>",
    rooms: [DB.channels.c2i['공지방']],
    examples: [
        '생체부 알림\n기숙사 3월 기상곡입니다 ...',
        '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'
    ],
    execute: (chat, channel, args, self, prevChat, prevChannel) => {
        if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
            channel.send("학생회 종류가 잘못되었습니다.");
            return;
        }

        if (args.기수.length === 0) {
            const max = Math.max(...Object.keys(DB.channels.c2i).filter(x => /\d+/.test(x)).map(Number));
            args.기수 = [max - 2, max - 1, max];
        }

        for (let n of args.기수) {
            n = String(n);

            if (!(n in DB.channels.c2i)) {
                channel.send(`${n} 에 전송 실패하였습니다.\n"${n}" 채널이 존재하지 않습니다.`);
                return;
            }

            const idChannel = manager.getChannelById(DB.channels.c2i[n]);
            idChannel.send(`🔔 ${args.부서}\n─────\n${chat.text}`).then(
                _ => channel.send(`${idChannel.name} 에 전송하였습니다.`),
                e => channel.send(`${idChannel.name} 에 전송 실패하였습니다.\n${e.toString()}`)
            );
        }
    }
});