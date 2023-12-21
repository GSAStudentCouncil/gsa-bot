const manager = require('../modules/DBManager').DBManager;
const app = manager.getInstance({});

app.on("message", (chat, channel) => {
    if (chat.text.startsWith("급식")) {
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

        const meals = [
            data["mealServiceDietInfo"][0]["row"][0]["DDISH_NM"],
            data["mealServiceDietInfo"][0]["row"][1]["DDISH_NM"],
            data["mealServiceDietInfo"][0]["row"][2]["DDISH_NM"],
        ];

        channel.send()
    }
});

app.start();
