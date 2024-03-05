const manager = require('../../global_modules/DBManager').DBManager;
const app = manager.getInstance({});

const c2i = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").c2i;
const kinds = ["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

app.on("message", (chat, channel) => {
    if (!["공지방"].includes(channel.name)) return;

    // TODO: 이거 다시 편하게 답장 아닌걸로

    const [ kind, cmdName, n1, n2, n3 ] = chat.source.text.trim().replace(/ {2,}/g, ' ').split(" ");

    let nths = [n1, n2, n3].filter(n => n !== undefined && /\d+/.test(n));   // 입력한 기수만 거르기
    if (nths.length === 0) {    // 아무 기수도 특정하지 않으면 전체 기수를 가리킴
        const max = Math.max.apply(null, Object.keys(c2i).filter(x => /\d+/.test(x)).map(Number));
        nths = [max - 2, max - 1, max].map(String);
    }

    if (kinds.includes(kind) && cmdName === "알림") {
        for (let i = 0, nth = nths[i]; i < nths.length; i++) {
            if (c2i[nth] === undefined) {
                channel.send(nth + " 에 전송 실패하였습니다.\n" + "\"" + nth + "\" 채널이 존재하지 않습니다.");
                return;
            }

            const idChannel = manager.getChannelById(c2i[String(nth)]);
            idChannel.send('🔔 ' + kind + '\n─────\n' + chat.text).then(
                _ => channel.send(idChannel.name + " 에 전송하였습니다."),
                e => channel.send(idChannel.name + " 에 전송 실패하였습니다.\n" + e.toString())
            );
        }
    }
});

app.start();