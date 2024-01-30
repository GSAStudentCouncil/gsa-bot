'use strict';

var bot = BotManager.getCurrentBot();
var manager = require('DBManager').DBManager;
var cronjob = require('cronJob').CronJob;
var datetime = require('datetime').DateTime;
var tokenizer = require('tokenizer').Tokenizer;
var _ = require('utils');

var app = manager.getInstance({});
var i2c = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").i2c;
var model = tokenizer(JSON.parse(FileStream.read("/sdcard/msgbot/food.json") || "{}"));

/** @param {DateTime} dt */
var getMeals = function getMeals(dt) {
    var options = [["ATPT_OFCDC_SC_CODE", "F10"], ["SD_SCHUL_CODE", 7380031], ["MLSV_YMD", dt.toString('YYMMDD')], ["Type", "json"]];

    var apiLink = "https://open.neis.go.kr/hub/mealServiceDietInfo?" + options.map(function (option) {
        return option.join("=");
    }).join("&");
    var data = JSON.parse(org.jsoup.Jsoup.connect(apiLink).get().text());

    return [0, 1, 2].map(function (i) {
        return data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"].replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim();
    });
};

app.on("message", function (chat, channel) {
    var command = model(chat.text.trim(), {
        date: '오늘',
        time: null,
        what: null
    });

    if (command.what === "급식") {
        // TODO: datetime 모듈의 parse 메서드를 사용하도록 수정
        var dt = void 0;
        switch (command.date) {
            case '그끄저께':
                dt = datetime.yesterday().sub(2).day();
                break;
            case '그제':
                dt = datetime.yesterday().sub().day();
                break;
            case '어제':
                dt = datetime.yesterday();
                break;
            case "오늘":
                dt = datetime.today();
                break;
            case "내일":
                dt = datetime.tomorrow();
                break;
            case "모레":
                dt = datetime.tomorrow().add().day();
                break;
            case "글피":
                dt = datetime.tomorrow().add(2).day();
                break;
            case "그글피":
                dt = datetime.tomorrow().add(3).day();
                break;
            default:
                Log.error("Invalid date: " + command.date);
                return;
        }
        dt.time = datetime.today().time;

        var meals = getMeals(dt);

        if (command.time === null) {
            if (dt.is().before({ hour: 8, minute: 30 })) command.time = "아침";else if (dt.is().before({ hour: 13, minute: 30 })) command.time = "점심";else if (dt.is().before({ hour: 19, minute: 30 })) command.time = "저녁";
        }

        var mealString = void 0;
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
            default:
                Log.error("Invalid time: " + command.time);
                return;
        }

        channel.send(_.f("🍚 {time} 급식\n─────\n{meals}", {
            time: dt.toString(command.date + ' ' + (command.time || '') + ' (M월 D일)'),
            meals: mealString
        }));
    }
});

cronjob.add("0 0 * * *", function () {
    var date = datetime.today();
    var meals = getMeals(date);

    for (var id in i2c) {
        var channel = manager.getChannelById(id);
        channel.send(_.f("🍚 오늘 ({}) 급식\n─────\n{}", date.toString('M월 D일'), meals.join("\n\n")));
    }
});

cronjob.add("40 11 * * *", function () {
    var date = datetime.today();
    var meals = getMeals(date);

    for (var id in i2c) {
        var channel = manager.getChannelById(id);
        channel.send(_.f("🍚 점심 급식\n─────\n{}", meals[1]));
    }
});

cronjob.add("20 16 * * *", function () {
    var date = datetime.today();
    var meals = getMeals(date);

    for (var id in i2c) {
        var channel = manager.getChannelById(id);
        channel.send(_.f("🍚 저녁 급식\n─────\n{}", meals[2]));
    }
});

app.start();
cronjob.setWakeLock(true);

bot.addListener(Event.NOTIFICATION_POSTED, function (sbn, rm) {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, function () {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});

