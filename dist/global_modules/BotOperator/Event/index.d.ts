import { Args, Command } from "../Command";
import { DateTime } from "../DateTime";
import { Chat, Channel, OpenChatJoinedFeed, InviteFeed, LeaveFeed, OpenChatKickedFeed, DeleteFeed, MemberTypeChangedFeed } from "../DBManager/classes";
import { ChangeUserType } from "../DBManager/types";

export namespace Event {
    export const MESSAGE = 'message';
    export const COMMAND = 'command';
    export const JOIN = 'join';
    export const INVITE = 'invite';
    export const LEAVE = 'leave';
    export const KICK = 'kick';
    export const DELETE = 'delete';
    export const HIDE = 'hide';
    export const MEMBER_TYPE_CHANGE = 'member_type_change';
    export const OPEN_PROFILE_CHANGE = 'open_profile_change';
}

export interface EventMap {
    'message': (chat: Chat, channel: Channel) => void;
    'command': (chat: Chat, channel: Channel, command: Command, args: Args) => void;
    'join': (chat: OpenChatJoinedFeed, channel: Channel) => void;
    'invite': (chat: InviteFeed, channel: Channel) => void;
    'leave': (chat: LeaveFeed, channel: Channel) => void;
    'kick': (chat: LeaveFeed | OpenChatKickedFeed, channel: Channel) => void;
    'delete': (chat: DeleteFeed, channel: Channel) => void;
    'hide': (chat: Chat, channel: Channel) => void;
    'member_type_change': (chat: MemberTypeChangedFeed, channel: Channel) => void;
    'open_profile_change': (beforeUser: ChangeUserType, afterUser: ChangeUserType, channel: Channel) => void;
}