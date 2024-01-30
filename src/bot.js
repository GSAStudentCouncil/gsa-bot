const manager = require('../modules/DBManager').DBManager;
const cronjob = require('../modules/cronJob').CronJob;
const datetime = require('../modules/datetime').datetime;
const { CommandRegistry, NaturalCommand, StructuredCommand } = require('../modules/command-handler');

const app = manager.getInstance({});
const channels = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}");

////////////////////// 급식 알리미 //////////////////////

/** @param {datetime} date */
const getMeals = date => {
    const options = [
        ["ATPT_OFCDC_SC_CODE", "F10"],
        ["SD_SCHUL_CODE", 7380031],
        ["MLSV_YMD", date.toString('YYMMDD')],
        ["Type", "json"],
    ];

    const apiLink = "https://open.neis.go.kr/hub/mealServiceDietInfo?" + options.map(option => option.join("=")).join("&");
    const data = JSON.parse(org.jsoup.Jsoup.connect(apiLink).get().text());

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

    for (let id in channels.i2c) {
        const channel = manager.getChannelById(id);
        channel.send(`🍚 ${time} 급식\n─────\n${meal}`);
    }
};

cronjob.add("0 0 * * *", () => mealCronjob("오늘"));
cronjob.add("40 11 * * *", () => mealCronjob("점심"));
cronjob.add("20 16 * * *", () => mealCronjob("저녁"));

NaturalCommand.add({
    name: '급식 알리미',
    description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
    query: {
        'date': '오늘',
        'time': () => {
            const dt = datetime.now();
            if (dt.is().before({ hour: 8, minute: 30 }))
                return "아침";
            else if (dt.is().before({ hour: 13, minute: 30 }))
                return "점심";
            else if (dt.is().before({ hour: 19, minute: 30 }))
                return "저녁";
            else
                return "아침";
        },
        'what': { '급식': null }
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

////////////////////// 학생회 공지 //////////////////////

StructuredCommand.add({
    name: '학생회 공지',
    description: "학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수에 전송됩니다.",
    usage: "<학생회:string length=3> 알림 <기수:ints0 min=39>",
    rooms: [channels.c2i['공지방']],
    examples: [
        '학생회 알림 39',
    ],
    execute: (chat, channel, args, self, prevChat, prevChannel) => {
        if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.학생회)) {
            channel.send("학생회 종류가 잘못되었습니다.");
            return;
        }

        if (args.기수.length === 0) {
            const max = Math.max(...Object.keys(channels.c2i).filter(x => /\d+/.test(x)).map(Number));
            args.기수 = [max - 2, max - 1, max];
        }

        for (let n of args.기수) {
            n = String(n);

            if (!(n in channels.c2i)) {
                channel.send(`${n} 에 전송 실패하였습니다.\n"${n}" 채널이 존재하지 않습니다.`);
                return;
            }

            const idChannel = manager.getChannelById(channels.c2i[n]);
            idChannel.send(`🔔 ${args.학생회}\n─────\n${chat.text}`).then(
                _ => channel.send(`${idChannel.name} 에 전송하였습니다.`),
                e => channel.send(`${idChannel.name} 에 전송 실패하였습니다.\n${e.toString()}`)
            );
        }
    }
});

////////////////////// 유저 데이터베이스 //////////////////////

let lazy = [];
app.on('message', (chat, channel) => {
    if (lazy.length !== 0) {
        const [ prevChat, prevChannel, args, cmd ] = lazy;

        if ((chat.user.id === prevChat.user.id && channel.id === prevChannel.id)) {
            cmd.execute(chat, channel, args, cmd, prevChat, prevChannel);

            lazy = [];
            return;
        }
    }

    const [ cmd, args ] = CommandRegistry.get(chat.text, channel.id);

    if (cmd === null)
        return;
    else if (cmd.name === '학생회 공지')
        lazy = [chat, channel, args, cmd];
    else
        cmd.execute(chat, channel, args, cmd);
});