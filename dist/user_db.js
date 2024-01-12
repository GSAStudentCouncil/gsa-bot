const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const app = manager.getInstance({});

const basePath = "/sdcard/msgbot";
const userDBPath = basePath + "/users.json";
const channelDBPath = basePath + "/channel2id.json";

let userDB = JSON.parse(FileStream.read(userDBPath) || "{}");
let channelDB = JSON.parse(FileStream.read(channelDBPath) || JSON.stringify({
    'c2i': {},  // channel to id
    'i2c': {},  // id to channel
}));

/**
 * @param {User} user
 * @param {Channel} channel
 */
function userReload(user, channel) {
    userDB[user.id] = {
        name: user.name,
        channelId: channel.id,
    };
}

app.on("message", (chat, channel) => {
    const matched = /^광곽 (\d+)기$/.match(channel.name);
    if (matched == null) return;

    // 채널 갱신
    if (!(channel.id in channelDB.i2c)) {
        channelDB.i2c[channel.id] = channel.name;
        channelDB.c2i[channel.name] = channel.id;
        FileStream.write(channelDBPath, JSON.stringify(channelDB, null, 4));

        channel.members.forEach(user => userReload(user, channel));
        FileStream.write(userDBPath, JSON.stringify(userDB, null, 4));
    }

    // 유저 갱신
    if (!(chat.user.id in userDB) ||
        !(userDB[chat.user.id].name === chat.user.name && userDB[chat.user.id].channelId === channel.id)) {
        userReload(user, channel);
        FileStream.write(userDBPath, JSON.stringify(userDB, null, 4));
    }
});

app.start();
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});
