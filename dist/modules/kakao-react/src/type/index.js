const bot = BotManager.getCurrentBot();
exports.ReactionType = {
    CANCEL: 0,
    HEART: 1,
    LIKE: 2,
    CHECK: 3,
    LAUGH: 4,
    SURPRISE: 5,
    SAD: 6,
}
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});
