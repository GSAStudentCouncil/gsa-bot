# gsa-bot

광주과학고등학교 공식 카카오톡 봇 레포지토리입니다.  
이 프로젝트는 `d.ts` 파일이 구현되어 있어, 타입 힌트를 제공합니다. 따라서, IDE(ex. PyCharm, WebStorm)를 사용하여 개발하는 것을 권장합니다.

> [!NOTE]
> 봇 앱은 ES5 문법까지만 지원하므로 `src` 폴더 내에서 코딩을 한 후, [`package.json`](package.json)에 정의된 `npm run build-js` 등의 커맨드로 `src` 폴더 내의 소스 파일들을 쉽게 트랜스파일한 파일을 사용하면 됩니다.

## 구동 환경

NoxPlayer와 서버로 카카오톡을 24시간 구동합니다.  
NoxPlayer의 ROOT 기능을 이용해 슈퍼유저 권한을 부여한 [메신저봇R](https://play.google.com/store/apps/details?id=com.xfl.msgbot) 앱을 사용합니다.  
파일 공유에는 `adb`를 이용합니다.

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
  - 버그 수정
  - `main.js` 코드 개선
  - 급식이 없으면 cronjob 무시. 매일 학사 일정 알림 기능에서도 내용 없으면 무시. TODO: