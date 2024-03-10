const manager = require('../../global_modules/DBManager').DBManager;
const { ReactClient, ReactionType } = require('kakao-react');

const Settings = android.provider.Settings;

const client = ReactClient.create({
    accessToken: '3abf56a9e5ef90b38a61001720643dbf',
    deviceUUID: Settings.Security.getString(App.getContext().getContentResolver(), Settings.Secure.ANDROID_ID),
});

const app = manager.getInstance({});

app.on("message", (chat, channel) => {
    client.react(channel.id, chat.id, ReactionType.LIKE);
});

app.start();
