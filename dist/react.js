const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const { ReactClient, ReactionType } = require('kakao-react');

const client = ReactClient.create({
    accessToken: '3abf56a9e5ef90b38a61001720643dbf',
    deviceUUID: '55be5c17869d5085',     // adb shell settings get secure android_id
});

const app = manager.getInstance({});

app.on("message", (chat, channel) => {
    const [ command, type ] = chat.text.trim().split(' ');

    if (command === "반응") {
        if (type === undefined || isNaN(Number(type)) || type < 0 || type > 6) {
            channel.send("반응 [타입]\nCANCEL: 0\nHEART: 1\nLIKE: 2\nCHECK: 3\nLAUGH: 4\nSURPRISE: 5\nSAD: 6");
            return;
        }

        client.react(channel.id, chat.id, type);
    }
});

app.start();

bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});
