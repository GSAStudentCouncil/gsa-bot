const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const app = manager.getInstance({});

let channels = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}");
const kinds = ["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

const ids = {
    39: 90827345789234,
    40: 98723487902134,
    41: 97236487612323
}

app.on("message", (chat, channel) => {
    if (!["공지방"].includes(channel.name)) return;
    if (!chat.isReply()) return;

    let [ kind, cmdName, nth ] = chat.source.text.split(" ");
    if (nth != null) {
        nth = Number(nth);
        if (!(nth in ids)) return;
    }

    if (kinds.includes(kind) && cmdName === "알림") {
        // TODO: nth 적용
        for (let i = 0; i < ids.length; i++) {
            const idChannel = manager.getChannelById(ids[i]);
            idChannel.send('[' + args[0] + '에서 알립니다.]\n' + args.slice(1).join(" "))
                .then(
                    _ => channel.send(`${idChannel.name}에 전송하였습니다.`),
                    e => channel.send(`${idChannel.name}에 전송 실패. ${e}`)
                );
        }
    }
});

app.start();
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});
