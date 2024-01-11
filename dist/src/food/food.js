const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
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

        let meals = [0, 1, 2].map(i =>
            data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"]
                .replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim()
        );

        let subCmd = chat.text.split(" ").slice(1).join(" ");
        if (subCmd === "아침")
            channel.send(meals[0]);
        else if (subCmd === "점심")
            channel.send(meals[1]);
        else if (subCmd === "저녁")
            channel.send(meals[2]);
        else
            channel.send(meals.join("\n\n"));
    }
});

app.start();

bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});
