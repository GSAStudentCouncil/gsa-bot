const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const cronjob = require('cronJob').CronJob;
const datetime = require('datetime').DateTime;
const tokenizer = require('tokenizer').Tokenizer;
var _ = require('utils');

const app = manager.getInstance({});
const i2c = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").i2c;
const model = tokenizer(JSON.parse(FileStream.read("/sdcard/msgbot/food.json") || "{}"));

/** @param {DateTime} dt */
const getMeals = (dt) => {
    const options = [
        ["ATPT_OFCDC_SC_CODE", "F10"],
        ["SD_SCHUL_CODE", 7380031],
        ["MLSV_YMD", dt.toString('YYMMDD')],
        ["Type", "json"],
    ];

    const apiLink = "https://open.neis.go.kr/hub/mealServiceDietInfo?" + options.map(option => option.join("=")).join("&");
    const data = JSON.parse(org.jsoup.Jsoup.connect(apiLink).get().text());

    return [0, 1, 2].map(i =>
        data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"]
            .replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim()
    );
}

app.on("message", (chat, channel) => {
    const command = model(chat.text.trim(), {
        date: '오늘',
        time: null,
        what: null
    });

    if (command.what === "급식") {
        // TODO: datetime 모듈의 parse 메서드를 사용하도록 수정
        let date;
        switch (command.date) {
            case '그끄저께':
                date = datetime.yesterday().sub(2).day();
                break;
            case '그제':
                date = datetime.yesterday().sub().day();
                break;
            case '어제':
                date = datetime.yesterday();
                break;
            case "오늘":
                date = datetime.today();
                break;
            case "내일":
                date = datetime.tomorrow();
                break;
            case "모레":
                date = datetime.tomorrow().add().day();
                break;
            case "글피":
                date = datetime.tomorrow().add(2).day();
                break;
            case "그글피":
                date = datetime.tomorrow().add(3).day();
                break;
            default:
                Log.error("Invalid date: " + command.date);
                return;
        }

        const meals = getMeals(date);

        let mealString;
        switch (command.time) {
            case "아침":
                mealString = meals[0];
                break;
            case "점심":
                mealString = meals[1];
                break;
            case "저녁":
                mealString = meals[2];
                break;
            case null:
                mealString = meals.join("\n\n");
                break;
            default:
                Log.error("Invalid time: " + command.time);
                return;
        }
        channel.send(_.f("🍚 {time} 급식\n─────\n{meals}", {
            time: date.toString(command.date + ' ' + (command.time || '') + ' (M월 D일)'),
            meals: mealString
        }));
    }
});

cronjob.add("0 0 * * *", () => {
    const date = datetime.today();
    const meals = getMeals(date);

    for (let id in i2c) {
        const channel = manager.getChannelById(id);
        channel.send(_.f("🍚 오늘({}) 급식\n─────\n{}", date.toString('M월 D일'), meals.join("\n\n")));
    }
});

cronjob.add("40 11 * * *", () => {
    const date = datetime.today();
    const meals = getMeals(date);

    for (let id in i2c) {
        const channel = manager.getChannelById(id);
        channel.send(_.f("🍚 점심 급식\n─────\n{}", meals[1]));
    }
});

cronjob.add("20 16 * * *", () => {
    const date = datetime.today();
    const meals = getMeals(date);

    for (let id in i2c) {
        const channel = manager.getChannelById(id);
        channel.send(_.f("🍚 저녁 급식\n─────\n{}", meals[2]));
    }
});

app.start();
cronjob.setWakeLock(true);

bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});
