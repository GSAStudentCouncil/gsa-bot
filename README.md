# gsa-bot

listener events:
```ts
export type MessageEvents = {
    message: (chat: Chat, channel: Channel) => void;
    delete: (chat: DeleteFeed, channel: Channel) => void;
    hide: (chat: Chat, channel: Channel) => void;
    leave: (chat: LeaveFeed, channel: Channel) => void;
    join: (chat: OpenChatJoinedFeed, channel: Channel) => void;
    invite: (chat: InviteFeed, channel: Channel) => void;
    kick: (chat: KickedFeed, channel: Channel) => void;
    member_type_change: (chat: MemberTypeChangedFeed, channel: Channel) => void;
    open_profile_change: (beforeUser: ChangeUserType, afterUser: ChangeUserType, channel: Channel) => void;
};
```
