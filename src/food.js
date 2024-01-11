const manager = require('../modules/DBManager').DBManager;
const app = manager.getInstance({});

app.on("message", (chat, channel) => {
    const [ command, time ] = chat.text.trim().split();

    if (command === "급식") {
        let options = [
            ["ATPT_OFCDC_SC_CODE", "F10"],
            ["SD_SCHUL_CODE", 7380031],
            ["MLSV_YMD", "231113"],
            ["Type", "json"],
        ];

        let apiLink = "https://open.neis.go.kr/hub/mealServiceDietInfo?";
        apiLink += options.map(option => option.join("=")).join("&");

        const text = org.jsoup.Jsoup.connect(apiLink).get().text();
        const data = JSON.parse(text);

        const meals = [0, 1, 2].map(i =>
            data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"]
                .replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim()
        );

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

app.start();
