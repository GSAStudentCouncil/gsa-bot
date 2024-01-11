const manager = require('../modules/DBManager').DBManager;
const cronjob = require('../modules/cronJob').CronJob;
const app = manager.getInstance({});

const i2c = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").i2c;

// TODO: 매일 자정 내일 급식 총 출력
// TODO: 급식 출력 이쁘게

const getMeals = () => {
    const year = String(new Date().getFullYear() % 100);
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const date = String(new Date().getDate()).padStart(2, "0");

    const options = [
        ["ATPT_OFCDC_SC_CODE", "F10"],
        ["SD_SCHUL_CODE", 7380031],
        ["MLSV_YMD", year + month + date],
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
    const [ command, time ] = chat.text.trim().split(' ');
    // TODO: tokenizer 적용

    if (command === "급식") {
        const meals = getMeals();

        // TODO: time 생략 시 시간대 고려하여 출력
        switch (time) {
            case "아침":
                channel.send(meals[0]);
                break;
            case "점심":
                channel.send(meals[1]);
                break;
            case "저녁":
                channel.send(meals[2]);
                break;
            case undefined:
                channel.send(meals.join("\n\n"));
                break;
            default:
                Log.error("Invalid time: " + time);
        }
    }
});

cronjob.add("0 0 * * *", () => {
    const meals = getMeals();

    for (let id in i2c) {
        const channel = manager.getChannelById(id);
        channel.send("🍚 오늘의 급식\n─────\n" + meals.join("\n\n"));
    }
});

app.start();
