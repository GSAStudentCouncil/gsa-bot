import { Event, Message, BotManager, org } from '../../d.js';

const bot = BotManager.getCurrentBot();

let isDualMessenger = 95;

/**
 * @param {Message} msg
 */
function onMessage(msg) {
    if (msg.systemUserId !== isDualMessenger)
        return;

    let options = [
        ["ATPT_OFCDC_SC_CODE", "F10"],
        ["SD_SCHUL_CODE", 7380031],
        ["MLSV_YMD", "231113"],
        ["Type", "json"],
    ]

    let apiLink = "https://open.neis.go.kr/hub/mealServiceDietInfo?";
    apiLink += options.map(e => e.join('=')).join('&');
    console.log(apiLink);

    let tmp = org.jsoup.Jsoup.connect(apiLink).get();

    let text = tmp.html();
    console.log(text);

    // let json = JSON.parse(txt.replace(/\n/g, '\\n'));
    // console.log(json);
    //
    // let foods = json['mealServiceDietInfo'][1]['row'].map(e => e['DDISH_NM'].split(/ ?<br\/>/));
    //
    // for (let food of foods) {
    //     console.log(food);
    // }
}
bot.on(Event.MESSAGE, onMessage);
