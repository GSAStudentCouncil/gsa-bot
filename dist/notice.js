const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const app = manager.getInstance({});

const ids = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").c2i;
const kinds = ["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

app.on("message", (chat, channel) => {
    if (!["공지방"].includes(channel.name)) return;
    if (!chat.isReply()) return;

    const [ kind, cmdName, n1, n2, n3 ] = chat.source.text.trim().split(" ");

    let nths = [n1, n2, n3].filter(n => n !== undefined);   // 입력한 기수만 거르기
    if (nths.length === 0) {    // 아무 기수도 특정하지 않으면 전체 기수를 가리킴
        const max = Math.max.apply(null, Object.keys(ids).map(Number));
        nths = [String(max - 2), String(max - 1), String(max)];
    }

    if (kinds.includes(kind) && cmdName === "알림") {
        nths.forEach(nth => {
            const idChannel = manager.getChannelById(ids[nth]);
            idChannel.send('🔔 ' + kind + '\n─────\n' + chat.text).then(
                _ => channel.send(idChannel.name + " 에 전송하였습니다."),
                e => channel.send(idChannel.name + " 에 전송 실패하였습니다.\n" + e.toString())
            );
        });
    }
});

app.start();
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});
