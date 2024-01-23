const bot = BotManager.getCurrentBot();
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});
