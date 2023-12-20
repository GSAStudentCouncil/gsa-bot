const manager = require('../modules/DBManager').DBManager;
const app = manager.getInstance({});

const basePath = "/sdcard/msgbot";
const userDBPath = basePath + "/users.json";
const channelDBPath = basePath + "/channels.json";

let userDB = JSON.parse(FileStream.read(userDBPath) || "{}");
let channelDB = JSON.parse(FileStream.read(channelDBPath) || "{}");

/**
 * @param {User} user
 * @param {Channel} channel
 */
function userReload(user, channel) {
    userDB[user.id] = {
        name: user.name,
        channel: channel.id
    };
}

app.on("message", (chat, channel) => {
    // if (!/\d+기 톡방/.test(channel.name)) return;

    // 채널 갱신
    if (!(channel.id in channelDB) ||
        !(channelDB[channel.id] === channel.name)) {
        channelDB[channel.id] = channel.name;
        FileStream.write(channelDBPath, JSON.stringify(channelDB, null, 4));

        channel.members.forEach(user => userReload(user, channel));
        FileStream.write(userDBPath, JSON.stringify(userDB, null, 4));
    }

    // 유저 갱신
    if (!(chat.user.id in userDB) ||
        !(userDB[chat.user.id].name === chat.user.name && userDB[chat.user.id].channel === channel.id)) {
        userReload(user, channel);
        FileStream.write(userDBPath, JSON.stringify(userDB, null, 4));
    }
});

app.start();