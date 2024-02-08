const { DBManager } = require('./DBManager');
const { CronJob } = require('./CronJob');
const { Event } = require('./Event');
const { CommandRegistry } = require('./Command');

class Bot {
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

    static getCurrentBot(botManager, dbManager, init) {
        let ret = new Bot();
        ret.dbManager = dbManager.getInstance(init);
        ret.botManager = botManager;
        ret.bot = ret.botManager.getCurrentBot();

        ret.bot.addListener('notificationPosted', (sbn, rm) => {
            ret.dbManager.addChannel(sbn);
        });

        // NOTE: 이렇게 하면 봇 소스가 여러 개일 때, 컴파일 때마다 초기화되어서
        //  한 쪽 봇 코드의 말만 듣는 현상이 생김. 그렇다고 off를 뺄 수는 없어 그냥 둠.
        ret.bot.addListener('startCompile', () => {
            ret.dbManager.stop();
            ret.cronManager.off();
            ret.cronManager.setWakeLock(false);
        });

        return ret;
    }

    on(event, listener) {
        if (!Object.values(Event).includes(event)) {
            throw new Error('Invalid event');
        }

        switch (event) {
            case Event.COMMAND:
                this.commandEvent = listener;
                break;
            case Event.MESSAGE:
                // TEST: 여러 lazy 명령어가 동시에 들어올 때, 어떻게 처리되는지 테스트
                this.dbManager.on(event, (chat, channel) => {
                    for (let i = 0; i < this._lazyArgsQueue.length; i++) {
                        const [prevChat, prevChannel, cmd, args] = this._lazyArgsQueue[i];

                        if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
                            cmd.executeLazy(chat, prevChat, channel, prevChannel, args);
                            this._lazyArgsQueue.splice(i, 1);

                            return;
                        }
                    }

                    const { cmd, args } = this.commandRegistry.get(chat, channel);

                    if (cmd) {
                        this.commandEvent(chat, channel, cmd, args);
                        cmd.execute(chat, channel, args);

                        if (cmd.lazy === true) {
                            this._lazyArgsQueue.push([chat, channel, cmd, args]);
                        }
                    }

                    listener(chat, channel);
                });
                break;
            default:
                this.dbManager.on(event, listener);
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

class BotManager {
    constructor(botManager) {
        this.botManager = botManager;
        this.dbManager = DBManager;
    }

    getCurrentBot(init) {
        return Bot.getCurrentBot(this.botManager, this.dbManager, init);
    }

    getChannelById(i) {
        return this.dbManager.getChannelById(i);
    }
}

exports.get = botManager => new BotManager(botManager);