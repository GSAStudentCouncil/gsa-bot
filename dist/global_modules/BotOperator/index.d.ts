import { DBManager } from "./DBManager";
import { CronJobFactor } from "./CronJob/cron-job-manager/lib/cron-job-factor";
import { Command, Execute, Registry, Args } from "./Command";
import { Channel, Chat } from "./DBManager/classes";
import { InstanceType } from "./DBManager/types";
import { EventMap } from "./Event";

export declare class Bot {
    constructor();

    public dbManager: DBManager;
    public cronManager: CronJobFactor;
    public botManager: any;
    public commandRegistry: Registry;
    public commandEvent: Execute<any>;
    private _lazyQueue: [Chat, Channel, Command, Args][];

    public isDebugMod: boolean;
    public logRoom: Channel | null;

    static getCurrentBot(botManager: any, dbManager: DBManager, init?: InstanceType): Bot;
    executeCommand(chat: Chat, channel: Channel): void;
    
    on<E extends keyof EventMap>(event: E, listener: EventMap[E]): this;
    addListener<E extends keyof EventMap>(event: E, listener: EventMap[E]): this;

    off<E extends keyof EventMap>(event: E, listener: EventMap[E]): this;
    removeListener<E extends keyof EventMap>(event: E, listener: EventMap[E]): this;

    eventNames(): (keyof EventMap | string | symbol)[];
    rawListeners<E extends keyof EventMap> (event: E): EventMap[E][];
    listeners<E extends keyof EventMap> (event: E): EventMap[E][];
    listenerCount<E extends keyof EventMap> (event: E): number;

    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): this;

    start(): void;
    stop(): void;
    close(): void;
    addChannel(sdn: any): void;
    addCommand(command: Command): void;
    setWakeLock(setWakeLock: boolean): void;
    setDebugMode(isDebugMod: boolean): void;
    setLogRoom(logRoom: Channel): void;
    setDebugRooms(...debugRooms: Channel[]): void;
}

export declare class BotOperator {
    constructor(botManager: any);

    public botManager: any;
    public dbManager: DBManager;

    getCurrentBot: (init?: InstanceType) => Bot;
    getChannelById: typeof Channel.get;
}

export declare function from(botManager: any): BotOperator;