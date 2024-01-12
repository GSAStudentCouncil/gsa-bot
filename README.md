# gsa-bot
```shell
adb connect 127.0.0.1:62001
```

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
  open_profile_change: (
    beforeUser: ChangeUserType,
    afterUser: ChangeUserType,
    channel: Channel
  ) => void;
};
```

## `index.js`

### 오픈채팅에 들어왔을 때 반응

```js
app.on("join", (chat, channel) => {
  channel.send(chat.joinUsers[0].nickName + "님 안녕하세요");
});
```

### 단체톡방에 초대했을 때 반응

```js
app.on("invite", (chat, channel) => {
  channel.send(
    chat.inviteUser.nickName +
      "님이" +
      chat.invitedUsers.map((e) => e.nickName).join(",") +
      "님을 초대했습니다"
  );
});
```

### 톡방에서 나갈 때

```js
app.on("leave", (chat, channel) => {
  if (chat.isKicked()) {
    channel.send(chat.leaveUser.nickName + "님이 강퇴당했어요");
  } else {
    channel.send(chat.leaveUser.nickName + "님 잘가요");
  }
});
```

### 톡방에서 강퇴 당할 때

```js
app.on("kick", (chat, channel) => {
  channel.send(
    chat.kickedBy.name +
      "님이 " +
      chat.kickedUser.nickName +
      "님을 강퇴했습니다"
  );
});
```

### 누군가 메시지를 지웠을 때

```js
app.on("delete", (chat, channel) => {
  channel.send(chat.deletedChat.text + "메시지가 지워졌어요");
});
```

### 방장이나 부방장이 메시지를 가렸을 때

```js
app.on("hide", (chat, channel) => {
  channel.send(chat.user.name + "님이 " + "메시지를 가렸어요");
});
```

### 권한이 바뀔 때

```js
app.on("member_type_change", (chat, channel) => {
  if (chat.isDemote()) {
    channel.send(chat.demoteUser.nickName + "님이 부방장에서 내려왔어요");
  } else if (chat.isPromote()) {
    channel.send(chat.promoteUser.nickName + "님이 부방장이 되었어요");
  } else if (chat.isHandover()) {
    channel.send(chat.newHost.nickName + "님이 새 방장이 되었어요");
  }
});
```

### 오픈채팅방에서 프로필을 바꿀 때

```js
app.on("open_profile_change", (beforeUser, afterUser, channel) => {
  channel.send(
    "누군가 프로필이 바뀌었어요\n" + beforeUser.name + "->" + afterUser.name
  );
});
```
