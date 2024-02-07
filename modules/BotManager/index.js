const { DBManager } = require('./DBManager');
const { CronJob } = require('./CronJob');
const { Event } = require('./Event');
const { StructuredCommand, NaturalCommand, CommandRegistry } = require('./Command');

class BotManager {
    constructor() {
        this.bot = null;

        this.dbManager = null;
        this.cronManager = CronJob;
        this.botManager = null;
        this.commandRegistry = CommandRegistry;
        this.commandRegistry.setCronManager(this.cronManager);

        this.commandEvent = (chat, channel, command, args) => {};

        this._lazyArgsQueue = [];
    }

    static getCurrentBot(init, botManager) {
        let ret = new BotManager();
        ret.dbManager = DBManager.getInstance(init);
        ret.botManager = botManager;
        ret.bot = ret.botManager.getCurrentBot();

        // TEST: 이벤트 리스너를 여기서 등록하면 되나?
        ret.bot.addListener('notification_posted', (sbn, rm) => {
            ret.dbManager.addChannel(sbn);
        });

        // NOTE: 이렇게 하면 봇 소스가 여러 개일 때, 컴파일 때마다 초기화되어서
        //  한 쪽 봇 코드의 말만 듣는 현상이 생김. 그렇다고 off를 뺄 수는 없어 그냥 둠.
        ret.bot.addListener('start_compile', () => {
            ret.dbManager.stop();
            ret.cronManager.off();
            ret.cronManager.setWakeLock(false);
        });

        return ret;
    }

    on(event, callback) {
        if (!(Object.values(Event).includes(event))) {
            throw new Error('Invalid event');
        }

        // TEST: 이벤트 리스너를 이렇게 동기적으로 구현해도 되나?
        switch (event) {
            case Event.COMMAND:
                this.commandEvent = callback;
                break;
            case Event.MESSAGE:
                this.bot.on('message', (chat, channel) => {
                    for (let i = 0; i < this._lazyArgsQueue.length; i++) {
                        const [prevChat, prevChannel, cmd, args] = this._lazyArgsQueue[i];

                        if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
                            cmd.executeLazy(chat, prevChat, channel, prevChannel, cmd, args);
                            this._lazyArgsQueue.splice(i, 1);

                            return;
                        }
                    }

                    const { cmd, args } = this.commandRegistry.get(chat, channel);

                    if (cmd) {
                        this.commandEvent(chat, channel, cmd, args);
                        cmd.execute(chat, channel, cmd, args);

                        if (cmd.lazy === true) {
                            this._lazyArgsQueue.push([chat, channel, cmd, args]);
                        }
                    }

                    callback(chat, channel);
                });
                break;
            default:
                this.dbManager.on(event, callback);
        }
    }

    start() {
        this.dbManager.start();
        this.cronManager.setWakeLock(true);
    }

    stop() {
        this.dbManager.stop();
    }

    close() {
        this.dbManager.close();
    }

    addChannel(sbn) {
        this.dbManager.addChannel(sbn);
    }

    addCommand(cmd) {
        this.commandRegistry.register(cmd);
    }

    setWakeLock(setWakeLock) {
        this.dbManager.setWakeLock(setWakeLock);
    }
}

exports = botManager => ({
    getCurrentBot: (init) => {
        BotManager.getCurrentBot(init)
    },
});