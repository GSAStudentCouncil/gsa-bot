# gsa-bot
광주과학고등학교 공식 카카오톡 봇 레포지토리입니다. 
> [!TIP]
> 이 레포지토리는 IDE를 이용한 개발에 최적화되어있습니다.(`d.ts` 파일을 이용해 자동완성을 지원) 또한, `packages.json` 파일에 정의되어있는 `npm run build-api2` 등의 커맨드를 통해 `src` 폴더 내의 소스 파일들을 빌드할 수 있습니다. 이는 `dist` 폴더 내에 저장됩니다.
---
### 구동 환경
NoxPlayer와 서버로 카카오톡을 24시간 실행하고,`adb`를 이용하여 파일을 공유합니다.
NoxPlayer의 ROOT 기능을 이용해 슈퍼유저 권한을 부여한 [메신저봇 R](https://play.google.com/store/apps/details?id=com.xfl.msgbot) 앱을 사용합니다.

```shell
adb connect 127.0.0.1:62001
adb push /dist/example.js /sdcard/msgbot/bots/example/example.js
adb pull /dist/example.js /sdcard/msgbot/bots/example/example.js
```
간단하게 위와 같은 방식으로 파일을 공유합니다.

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
