# gsa-bot

광주과학고등학교 공식 카카오톡 봇 레포지토리입니다.

> [!TIP]
> 이 레포지토리는 IDE 자동 완성(`d.ts`)을 지원합니다.  
> `packages.json`에 정의된 `npm run build-api2` 등의 커맨드로 `src` 폴더 내의 소스 파일들을 쉽게 빌드할 수 있습니다.

---

### 구동 환경

NoxPlayer와 서버로 카카오톡을 24시간 구동합니다.  
NoxPlayer의 ROOT 기능을 이용해 슈퍼유저 권한을 부여한 [메신저봇R](https://play.google.com/store/apps/details?id=com.xfl.msgbot) 앱을 사용합니다.  
파일 공유에는 `adb`를 이용합니다.

```shell
adb connect 127.0.0.1:62001
adb push /dist/example.js /sdcard/msgbot/bots/example/example.js
adb pull /dist/example.js /sdcard/msgbot/bots/example/example.js
```

간단하게 위와 같은 방식으로 파일을 공유합니다. `dist` 폴더 내에 빌드된 소스 파일들을 `adb`를 사용해 메신저봇 내부 폴더로 전송해주세요.

### 사용한 모듈

- `cronjob`
- `datetime` @rhseung 자체 개발
- `DBManager`
- `kakao-react`
- `kakaolink`
- `tokeninzer` @rhseung 자체 개발

### to do

- [ ] 채팅방 공지글 불러오기
- [ ] 학생회 알림 공지 명령어 테스트하기
- [ ] 급식 명령어 완성하기
- [ ] 모든 명령어에 대한 도움말 만들기
- [ ] 모든 명령어를 `tokenizer`를 사용할 수 있게 하기
- [ ] `datetime` 모듈 완성하기
- [ ] `kakao-react` 모듈 테스트하기
- [ ] `kakaolink` 모듈 테스트하기

### 특정 상황 별 메시지

<details>
<summary>펼치기/접기</summary>

#### 오픈채팅에 들어왔을 때

```js
app.on("join", (chat, channel) => {
  channel.send(chat.joinUsers[0].nickName + "님 안녕하세요");
});
```

#### 단체톡방에 초대했을 때

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

#### 톡방에서 나갈 때

```js
app.on("leave", (chat, channel) => {
  if (chat.isKicked()) {
    channel.send(chat.leaveUser.nickName + "님이 강퇴당했어요");
  } else {
    channel.send(chat.leaveUser.nickName + "님 잘가요");
  }
});
```

#### 톡방에서 강퇴 당할 때

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

#### 누군가 메시지를 지웠을 때

```js
app.on("delete", (chat, channel) => {
  channel.send(chat.deletedChat.text + "메시지가 지워졌어요");
});
```

#### 방장이나 부방장이 메시지를 가렸을 때

```js
app.on("hide", (chat, channel) => {
  channel.send(chat.user.name + "님이 " + "메시지를 가렸어요");
});
```

#### 권한이 바뀔 때

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

#### 오픈채팅방에서 프로필을 바꿀 때

```js
app.on("open_profile_change", (beforeUser, afterUser, channel) => {
  channel.send(
    "누군가 프로필이 바뀌었어요\n" + beforeUser.name + "->" + afterUser.name
  );
});
```

</details>
