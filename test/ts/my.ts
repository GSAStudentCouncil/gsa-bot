import { Channel, Chat, DeleteFeed, InviteFeed, LeaveFeed, MemberTypeChangedFeed, OpenChatJoinedFeed, OpenChatKickedFeed } from "../../global_modules/BotOperator/DBManager/classes";
import { ChangeUserType } from "../../global_modules/BotOperator/DBManager/types";

interface EventMap {
    'tick': () => void;
    'compile': () => void;
    'message': (chat: Chat, channel: Channel) => void;
    'join': (chat: OpenChatJoinedFeed, channel: Channel) => void;
    'invite': (chat: InviteFeed, channel: Channel) => void;
    'leave': (chat: LeaveFeed, channel: Channel) => void;
    'kick': (chat: LeaveFeed | OpenChatKickedFeed, channel: Channel) => void;
    'delete': (chat: DeleteFeed, channel: Channel) => void;
    'hide': (chat: Chat, channel: Channel) => void;
    'member_type_change': (chat: MemberTypeChangedFeed, channel: Channel) => void;
    'open_profile_change': (beforeUser: ChangeUserType, afterUser: ChangeUserType, channel: Channel) => void;
}

type ListenerMap = { [K in keyof EventMap]: EventMap[K][] };

class Bot {
    name: string;
    listeners: ListenerMap;

    constructor(name: string, listeners: ListenerMap = {} as ListenerMap) {
        this.name = name;
        this.listeners = listeners;
    }

    start() {

    }

    stop() {

    }

    onTick(func: EventMap['tick']) {
        this.listeners.tick.push(func);
    }

    onCompile(func: EventMap['compile']) {
        this.listeners.compile.push(func);
    }

    onMessage(func: EventMap['message']) {
        this.listeners.message.push(func);
    }

    onJoin(func: EventMap['join']) {
        this.listeners.join.push(func);
    }

    onInvite(func: EventMap['invite']) {
        this.listeners.invite.push(func);
    }

    onLeave(func: EventMap['leave']) {
        this.listeners.leave.push(func);
    }

    onKick(func: EventMap['kick']) {
        this.listeners.kick.push(func);
    }

    onDelete(func: EventMap['delete']) {
        this.listeners.delete.push(func);
    }

    onHide(func: EventMap['hide']) {
        this.listeners.hide.push(func);
    }

    onMemberTypeChange(func: EventMap['member_type_change']) {
        this.listeners.member_type_change.push(func);
    }

    onOpenProfileChange(func: EventMap['open_profile_change']) {
        this.listeners.open_profile_change.push(func);
    }

    on<E extends keyof EventMap>(event: E, func: EventMap[E]) {
        this.listeners[event].push(func);
    }
}

class Command {
    name: string;
    description: string;
    aliases: string[];

    constructor(name: string, description: string, aliases: string[] = []) {
        this.name = name;
        this.description = description;
        this.aliases = aliases;
    }
}

const Int = {};
const Str = {};

const $ = {
    급식: ['밥', '급식', '메뉴'],
    날짜: ['날짜', '일자'],
    기간: ['기간', '날짜'],
    검색: ['검색', '찾기'],

};

const mealCommand = new Command($.급식)
    .case([$.날짜], (chat, channel, 날짜: Date) => {
    })
    .case([$.검색, $.날짜], (chat, channel, 검색: string, 날짜: Date) => {
    })

const mealCommand = (chat, channel) => ({
    '급식': {
        '날짜': (급식: string, 날짜: Date) => {

        },
        '기간': (급식: string, 기간: { start: Date, end: Date }) => {
            channel.send(기간.end.getTime() - 기간.start.getTime());
        },
    }
});

const noticeCommand = 

const mealOrder = context`${$.coffee_name} 주문`;
const mealSearch = command`${$.coffee_name} ${Str}`;

function command(strings: TemplateStringsArray, ...args: any[]) {
    return new Command(strings[0], args[0]);
}

const bot = new Bot('my');
bot.start();