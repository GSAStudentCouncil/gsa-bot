const { DBManager } = require('./DBManager');
const { CronJob } = require('./CronJob');
const { Event } = require('./Event');
const { CommandRegistry } = require('./Command');

const IS_DIST = false;

class Bot {
    constructor() {
        this.bot = null;

        this.dbManager = null;
        this.cronManager = CronJob;
        this.botManager = null;
        this.commandRegistry = CommandRegistry;
        this.commandRegistry.setCronManager(this.cronManager);

        this.commandEvent = (chat, channel, command, args) => {};
        this._findCommand = (chat, channel) => {
            for (let i = 0; i < this._lazyArgsQueue.length; i++) {
                const [prevChat, prevChannel, cmd, args] = this._lazyArgsQueue[i];
        
                if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
                    cmd.executeLazy(chat, prevChat, channel, prevChannel, args);
                    this._lazyArgsQueue.splice(i, 1);
        
                    return;
                }
            }
        
            const { cmd, args } = this.commandRegistry.get(chat, channel);
        
            if (cmd != null) {
                this.commandEvent(chat, channel, cmd, args);
                cmd.execute(chat, channel, args);
        
                if (cmd.lazy) {
                    this._lazyArgsQueue.push([chat, channel, cmd, args]);
                }
            }
        }

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

        ret.dbManager.on(Event.MESSAGE, ret._findCommand);

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
                // 이벤트 리스너는 여러 개가 등록 가능하므로, 컴파일하면 명령어 찾아내는 리스너 하나는 자동 등록되고, 나머지 커스텀 리스너는 이렇게 따로 추가되는거로.
                this.dbManager.on(event, listener);
                break;
            default:
                this.dbManager.on(event, listener);
        }

        return this;
    }

    addListener(event, listener) {
        return this.on(event, listener);
    }

    off(event, listener) {
        if (!Object.values(Event).includes(event)) {
            throw new Error('Invalid event');
        }

        // TODO: Event.COMMAND는 여러 리스너 공통임. 따로 안 됨 매뉴얼에 적기

        switch (event) {
            case Event.COMMAND:
                this.commandEvent = (chat, channel, command, args) => {};
                break;
            default:
                this.dbManager.off(event, listener);
        }

        return this;
    }

    removeListener(event, listener) {
        return this.off(event, listener);
    }

    eventNames() {
        return this.botManager.eventNames();
    }

    rawListeners(event) {
        return this.botManager.rawListeners(event);
    }

    listeners(event) {
        return this.botManager.listeners(event);
    }

    listenerCount(event) {
        return this.botManager.listenerCount(event);
    }

    getMaxListeners() {
        return this.botManager.getMaxListeners();
    }

    setMaxListeners(maxListeners) {
        return this.botManager.setMaxListeners(maxListeners);
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