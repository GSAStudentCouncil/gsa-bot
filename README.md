# gsa-bot

광주과학고등학교 공식 카카오톡 봇 레포지토리입니다.  
이 프로젝트는 `d.ts` 파일이 구현되어 있어, 타입 힌트를 제공합니다. 따라서, IDE(ex. PyCharm, WebStorm)를 사용하여 개발하는 것을 권장합니다.

> [!NOTE]
> 봇 앱은 ES5 문법까지만 지원하므로 `src` 폴더 내에서 코딩을 한 후, [`package.json`](package.json)에 정의된 `npm run ready` 커맨드로 소스 파일들을 babel로 트랜스파일한 파일을 사용하면 됩니다.

## 구동 환경

NoxPlayer와 서버로 카카오톡을 24시간 구동합니다.  
NoxPlayer의 ROOT 기능을 이용해 슈퍼유저 권한을 부여한 [메신저봇R](https://play.google.com/store/apps/details?id=com.xfl.msgbot) 앱을 사용합니다.  
데이터 전송에는 `adb`를 이용합니다.

```shell
adb connect 127.0.0.1:62001
adb push /dist/example.js /sdcard/msgbot/bots/example/example.js
adb pull /dist/example.js /sdcard/msgbot/bots/example/example.js
```

간단하게 위와 같은 방식으로 파일을 공유합니다. `dist` 폴더 내에 빌드된 소스 파일들을 `adb`를 사용해 메신저봇 내부 폴더로 전송해주세요.

## 사용한 모듈

- [`BotOperator`](https://github.com/essentialib/BotOperator)
  - `DBManager`
  - `CronJob`
  - [`DateTime`](https://github.com/essentialib/datetime)
  - `Command`

모듈에 대해 더 자세한 것을 확인하려면 [basic.md](https://github.com/essentialib/BotOperator/blob/main/markdown/basic.md), [command.md](https://github.com/essentialib/BotOperator/blob/main/markdown/command.md)를 확인하세요.

## 패치 노트

### [v1.0](https://github.com/GSAStudentCouncil/gsa-bot/releases/tag/v1.0)

- `main.js` 구현
- 모듈 `DateTime`, `Command`, `BotOperator` 구현

### [v1.1](https://github.com/GSAStudentCouncil/gsa-bot/releases/tag/v1.1)

- 메시지 디자인 개선
- `main.js` 코드 개선
- 학사 일정이 없으면 학사 일정 cronjob 무시.
- 급식이 없으면 급식 cronjob 무시.

### [v1.2](https://github.com/GSAStudentCouncil/gsa-bot/releases/tag/v1.2)

- 명령어 남용 문제로 명령어 민감도 낮춤.
- 개인 톡방 채널용 DB 생성
- 방이름 보안 강화 (그룹챗, 인원수>80 조건 추가)
- 급식 파싱 보수 및 보안 강화
- Google Javascript Style 채택

### [v1.3](https://github.com/GSAStudentCouncil/gsa-bot/releases/tag/v1.3)

- 급식 명령어의 내용이 너무 커서 `\u200b`를 500개 추가하여 더보기로 볼 수 있게 함.
- `CronJob`이 제대로 실행되지 않던 버그 수정.
- 급식 정보를 파싱하는 `getMeals` 함수의 버그 수정.
- 명령어 인식률을 지정할 수 있는 `NaturalCommand.Builder#setUseDateParse`의 첫 번째 인자로 `margin`을 추가. 해당 명령어에서 파싱되는 문자열을 제외한 나머지 문자열에서 공백을 제외한 문자열을 몇 자나 허용할 것인가를 정하는 인자. 기본값은 3.
- Log를 보내는 전용 방을 추가. 앞으로 모든 명령어의 사용 로그는 Log 방으로 전송됨. `Bot#setLogRoom`으로 설정 가능.
- 봇에 디버그 모드를 추가함. 새로 추가된 `디버그 명령어`를 사용하여 디버그 모드를 활성화할 수 있음. 디버그 모드가 활성화되면 봇은 디버그 방에만 응답함. `Bot#isDebugMod`로 확인 가능.
- 디버그 용도의 방을 추가할 수 있게 됨. `Bot#setDebugRooms`으로 설정 가능.
- `CronJob` 모듈의 버전을 v1.2로 업데이트함.
