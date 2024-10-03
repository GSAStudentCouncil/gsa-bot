const { DBManager } = require('./DBManager');
const { CronJob } = require('./CronJob');
const { Event } = require('./Event');
const { CommandRegistry, StructuredCommand, Command } = require('./Command');
const { DateTime } = require('./DateTime');
const { isValidChannel, compress } = require('./util');

const IS_DIST = false;

/**
 * @param {Command} cmd
 * @param {Chat} chat
 * @param {Channel} channel
 * @param {Object} args
 */
const DefaultLog = (cmd, chat, channel, args) => {
    return [
        `유저: ${chat.user.name}(${chat.user.id})`,
        `채널: ${channel.name}(${channel.id})`,
        `메시지: ${chat.text}`,
        `호출된 명령어: ${cmd instanceof StructuredCommand ?
            "StructuredCommand" :
            "NaturalCommand"}(${cmd.icon} ${cmd.name})`,
        `명령어 인자: ${JSON.stringify(args)}`,
        `시간: ${DateTime.now().toString()}`
    ].join('\n');
};

/**
 * @param {Command} cmd
 * @param {Chat} chat
 * @param {Chat} prevChat
 * @param {Channel} channel
 * @param {Channel} prevChannel
 * @param {Object} args
 */
const LazyLog = (cmd, chat, prevChat, channel, prevChannel, args) => {
    return [
        `유저: ${chat.user.name}(${chat.user.id})`,
        `채널: ${channel.name}(${channel.id})`,
        `메시지: ${chat.text}`,
        `호출된 명령어: Lazy of ${cmd instanceof StructuredCommand ?
            "StructuredCommand" :
            "NaturalCommand"}(${cmd.icon} ${cmd.name})`,
        `명령어 인자: ${JSON.stringify(args)}`,
        `시간: ${DateTime.now().toString()}`
    ].join('\n');
};

try {
    class Bot {
        constructor() {
            this.bot = null;

            this.dblistener = null;
            this.cronManager = CronJob;
            this.botManager = null;
            this.commandRegistry = CommandRegistry;
            this.commandRegistry.setCronManager(this.cronManager);

            this.isDebugMod = false;
            this.logRoom = null;
            this.debugRooms = [];

            this.commandEvent = (chat, channel, command, args) => {};
            this.executeCommand = (chat, channel) => {
                for (let i = 0; i < this._lazyQueue.length; i++) {
                    const [prevChat, prevChannel, cmd, args] = this._lazyQueue[i];
                    
                    if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
                        cmd.executeLazy(chat, prevChat, channel, prevChannel, args);
                        
                        if (isValidChannel(this.logRoom))
                            this.logRoom.send(LazyLog(cmd, chat, prevChat, channel, prevChannel, args));
                        
                        this._lazyQueue.splice(i, 1);
                        return;
                    }
                }
                
                const { cmd, args } = this.commandRegistry.get(chat, channel, this.debugRooms, this.isDebugMod);
                if (cmd == null) return;
                
                this.commandEvent(chat, channel, cmd, args);
                cmd.execute(chat, channel, args);
                
                if (isValidChannel(this.logRoom))
                    this.logRoom.send(DefaultLog(cmd, chat, channel, args));
                
                if (cmd.lazy)
                    this._lazyQueue.push([chat, channel, cmd, args]);
            };
            
            this._lazyQueue = [];
        }
        
        static getCurrentBot(botManager, dbManager, init) {
            let ret = new Bot();
            ret.dblistener = dbManager.getInstance(init);
            ret.botManager = botManager;
            ret.bot = ret.botManager.getCurrentBot();
            
            ret.dblistener.on(Event.MESSAGE, ret.executeCommand);
            
            ret.bot.addListener('notificationPosted', (sbn, rm) => {
                ret.dblistener.addChannel(sbn);
            });
            
            ret.bot.addListener('startCompile', () => {
                ret.dblistener.stop();
                ret.cronManager.setWakeLock(false);
                ret.cronManager.off();
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
                    // 이벤트 리스너는 여러 개가 등록 가능하므로, 컴파일하면 명령어 찾아내는 리스너 하나는 자동 등록되고, 나머지 커스텀 리스너는 이렇게 따로 추가되는거로.
                    this.dblistener.on(event, listener);
                    break;
                default:
                    this.dblistener.on(event, listener);
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
                    this.dblistener.off(event, listener);
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
            this.dblistener.start();
            this.cronManager.setWakeLock(true);
        }

        stop() {
            this.dblistener.stop();
            this.cronManager.setWakeLock(false);
            this.cronManager.off();
        }

        close() {
            this.dblistener.close();
        }

        addChannel(sbn) {
            this.dblistener.addChannel(sbn);
        }

        addCommand(cmd) {
            this.commandRegistry.register(cmd, this.logRoom);
        }

        setWakeLock(setWakeLock) {
            this.cronManager.setWakeLock(setWakeLock);
        }

        setDebugMode(isDebugMod) {
            this.isDebugMod = isDebugMod;
        }

        setLogRoom(logRoom) {
            this.logRoom = logRoom;
        }

        setDebugRooms(...debugRooms) {
            this.debugRooms = debugRooms;
        }
    }

    class BotOperator {
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

    exports.from = botManager => new BotOperator(botManager);
} catch (e) {
    Log.e(e + '\n' + e.stack);
}