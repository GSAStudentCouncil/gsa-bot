import request from 'sync-request';
import cheerio from 'cheerio';
import { convert } from 'html-to-text';

/**
 * 모든 정보는 여기서 참고했습니다.
 * - https://darktornado.github.io/KakaoTalkBot/docs/api2/api2/
 * - https://nolbo.github.io/pidoc/kbot/
 */

class Image {
    constructor(base64, bitmap) {
        this.base64 = base64;
        this.bitmap = bitmap;
    }

    getBase64() {
        return this.base64;
    }

    getBitmap() {
        return this.bitmap;
    }
}

class Room {
    /**
     * @param {string} name
     * @param {number} chatId
     * @param {boolean} isGroupChat
     * @param {boolean} isOpenChat
     * @param {Image} icon
     */
    constructor(name, chatId, isGroupChat, isOpenChat, icon) {
        this.name = name;
        this.chatId = chatId;
        this.isGroupChat = isGroupChat;
        this.isOpenChat = isOpenChat;
        this.icon = icon;
    }
}

class Author {
    /**
     * @param {string} name
     * @param {string} hash
     * @param {Image} avatar
     */
    constructor(name, hash, avatar) {
        this.name = name;
        this.hash = hash;
        this.avatar = avatar
    }
}

export class Message {
    /**
     * @param {string} content
     * @param {Room} room
     * @param {Author} author
     * @param {Image} image
     * @param {boolean} hasMention
     * @param {number} chatLogId
     * @param {string} packageName
     * @param {string[]} args
     * @param {string} command
     * @param {number} systemUserId
     */
    constructor(
        content,
        room,
        author,
        image,
        hasMention,
        chatLogId,
        packageName,
        args,
        command,
        systemUserId,
    ) {
        this.content = content;
        this.room = room;
        this.author = author;
        this.image = image;
        this.hasMention = hasMention;
        this.isMention = hasMention;
        this.chatLogId = chatLogId;
        this.packageName = packageName;
        this.args = args;
        this.command = command;
        this.systemUserId = systemUserId;
    }

    /**
     * 채팅이 수신된 채팅방으로 응답 전송
     * @param {string} text
     * @return {void}
     */
    reply(text) {
        console.log(text.toString());
    }

    /**
     * 채팅이 수신된 채팅방에 별도의 채팅을 보내지 않고 읽음으로 처리
     * @return {void}
     */
    markAsRead() {
    }
}

export class App {
    constructor() {
    }

    /**
     * 앱의 Context(컨텍스트)를 반환합니다.
     * @return {android.content.Context}
     */
    static getContext() {
    }

    /**
     * UI쓰레드 상에서 특정 함수를 실행합니다.
     * @param {function} task
     * @param {function(error, result)} onComplete
     * @return {void}
     */
    static runOnUiThread(task, onComplete) {
    }
}

export class AppData {
    constructor() {
    }

    /**
     * 해당 key로 저장되어 있는 boolean 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 false를 반환해요.
     * @param {string} key
     * @param {boolean} defaultValue
     * @return {boolean}
     */
    static getBoolean(key, defaultValue) {
    }

    /**
     * 해당 key로 저장되어 있는 int 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 0를 반환해요.
     * @param {string} key
     * @param {number} defaultValue
     * @return {number}
     */
    static getInt(key, defaultValue) {
    }

    /**
     * 해당 key로 저장되어 있는 String 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 null를 반환해요.
     * @param {string} key
     * @param {string} defaultValue
     * @return {string}
     */
    static getString(key, defaultValue) {
    }

    /**
     * 해당 key로 boolean 값을 저장해요.
     * @param {string} key
     * @param {boolean} value
     * @return {void}
     */
    static putBoolean(key, value) {
    }

    /**
     * 해당 key로 int 값을 저장해요.
     * @param {string} key
     * @param {number} value
     * @return {void}
     */
    static putInt(key, value) {
    }

    /**
     * 해당 key로 String 값을 저장해요.
     * @param {string} key
     * @param {string} value
     * @return {void}
     */
    static putString(key, value) {
    }

    /**
     * 해당 key로 저장되어 있는 값을 삭제해요.
     * @param {string} key
     * @return {void}
     */
    static remove(key) {
    }

    /**
     * AppData로 저장했던 모든 값들을 삭제해요.
     * @return {void}
     */
    static clear() {
    }
}

export class Bot {
    constructor() {
    }

    /**
     * 카카오톡봇 명령어의 접두어를 설정합니다.
     * @param {string} prefix
     * @return {void}
     */
    setCommandPrefix(prefix) {
    }

    /**
     * 특정 방에 메시지를 보냅니다.
     * 메시지를 보낼 방에 대한 세션의 존재 여부를 반환합니다.
     * @param {string} room
     * @param {string} msg
     * @param {string|null} packageName
     * @return {boolean}
     */
    send(room, msg, packageName = null) {
    }

    /**
     * 특정 방에 메시지를 수신할 수 있는지의 여부를 반환합니다.
     * @param {string} room
     * @param {string|null} packageName
     * @return {boolean}
     */
    canReply(room, packageName = null) {
    }

    /**
     * 카카오톡봇의 이름을 반환합니다.
     * @return {string}
     */
    getName() {
    }

    /**
     * 특정 스크립트의 작동 여부를 제어합니다.
     * @param {boolean} power
     * @return {void}
     */
    setPower(power) {
    }

    /**
     * 스크립트의 활성화 여부를 반환합니다.
     * @return {boolean}
     */
    getPower() {
    }

    /**
     * 스크립트를 컴파일합니다.
     * @return {void}
     */
    compile() {
    }

    /**
     * 스크립트를 컴파일 전 상태로 전환합니다.
     * @return {void}
     */
    unload() {
    }

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    on(eventName, listener) {
        switch (eventName) {
            case Event.MESSAGE:
            case Event.COMMAND:
                listener(msg);
                break;
            case Event.MEMBER_COUNT_CHANGED:
                listener({
                    room: room,
                    count: {
                        before: 0,
                        after: 1
                    }
                });
                break;
            default:
                listener();
        }
    }

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    addListener = this.on

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    off(eventName, listener) {
    }

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    removeListener = this.off

    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @return {void}
     */
    removeAllListeners(eventName) {
    }

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 첫 번째에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    prependListener(eventName, listener) {
    }

    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 배열로 반환합니다.
     * @param {string} eventName
     * @return {function[]}
     */
    listeners(eventName) {
    }

    /**
     * 채팅방의 메시지를 읽음 처리합니다.
     * 방에 대한 알림 읽기 세션을 찾을 수 있는지의 여부를 반환합니다.
     * @param {string} room
     * @param {string} packageName
     * @return {boolean}
     */
    markAsRead(room = 'last_room', packageName = 'last_name') {
    }
}

export class BotManager {
    constructor() {
    }

    /**
     * 스크립트에 할당된 Bot 객체를 반환합니다.
     * @return {Bot}
     */
    static getCurrentBot() {
        return new Bot();
    }

    /**
     * 특정 Bot 객체를 반환합니다.
     * @param {string} botName
     * @return {Bot}
     */
    static getBot(botName) {
    }

    /**
     * 메신저 앱에서 받은 메시지의 방 이름을 배열로 반환합니다.
     * @param {string} packageName
     * @return {string[]}
     */
    static getRooms(packageName = 'last_room') {
    }

    /**
     * 모든 Bot 인스턴스를 배열로 반환합니다.
     * @return {Bot[]}
     */
    static getBotList() {
    }

    /**
     * 특정 Bot의 활성화 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
    static getPower(botName) {
    }

    /**
     * 특정 Bot의 작동 여부를 제어합니다.
     * @param {string} botName
     * @param {boolean} power
     * @return {void}
     */
    static setPower(botName, power) {
    }

    /**
     * 특정 Bot을 컴파일합니다.
     * @param {string} botName
     * @param {boolean} throwOnError
     * @return {boolean}
     */
    static compile(botName, throwOnError = false) {
    }

    /**
     * 모든 Bot을 컴파일합니다.
     * @return {void}
     */
    static compileAll() {
    }

    /**
     * Bot이 한번도 컴파일된 적이 없을 경우 컴파일합니다.
     * 컴파일 에러 시 에러를 throw합니다. 반환값은 다음과 같습니다:
     *
     * - 컴파일에 실패함: 0
     * - 컴파일에 성공함: 1
     * - 컴파일된 적이 있음: 2
     * @param {string} scriptName
     * @param {boolean} throwOnError
     * @return {number}
     */
    static prepare(scriptName, throwOnError = false) {
    }

    /**
     * 특정 Bot의 컴파일 완료 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
    static isCompiled(botName) {
    }

    /**
     * Bot을 컴파일 전 상태로 전환합니다.
     * @return {void}
     */
    static unload() {
    }
}

export class Broadcast {
    constructor() {
    }

    /**
     * 모든 스크립트를 대상으로 특정 값을 브로드캐스트합니다.
     * @param {string} broadcastName
     * @param {function(value)} task
     * @return {void}
     */
    static send(broadcastName, task) {
    }

    /**
     * 특정 브로드캐스트에 대한 리스너를 추가합니다.
     * @param {string} broadcastName
     * @param {function(value)} task
     * @return {void}
     */
    static register(broadcastName, task) {
    }

    /**
     * 특정 브로드캐스트에 대한 특정 리스너를 제거합니다.
     * @param {string} broadcastName
     * @param {function} task
     * @return {void}
     */
    static unregister(broadcastName, task) {
    }

    /**
     * 브로드캐스트에 등록된 모든 리스너를 제거합니다.
     * @return {void}
     */
    static unregisterAll() {
    }
}

export class Database {
    constructor() {
    }

    /**
     * 특정 이름의 파일이 존재하는지의 여부를 반환합니다.
     * @param {string} fileName
     * @return {boolean}
     */
    static exists(fileName) {
    }

    /**
     * 특정 파일의 내용을 Object 형식으로 반환합니다.
     * 파일 내용의 형식이 JSON일 경우에만 가능합니다.
     * @param {string} fileName
     * @return {Object}
     */
    static readObject(fileName) {
    }

    /**
     * 특정 파일의 내용을 반환합니다.
     * @param {string} fileName
     * @return {string}
     */
    static readString(fileName) {
    }

    /**
     * 인자로 주어진 객체를 JSON String으로 변환한 값을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {Object} obj
     * @return {void}
     */
    static writeObject(fileName, obj) {
    }

    /**
     * 인자로 주어진 문자열을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {string} str
     * @return {void}
     */
    static writeString(fileName, str) {
    }
}

export class Device {
    constructor() {
    }

    /**
     * android.os.Build()값을 반환합니다.
     * @return {android.os.Build}
     */
    static getBuild() {
    }

    /**
     * 앱 구동 환경의 안드로이드 버전 코드를 반환합니다.
     * @return {number}
     */
    static getAndroidVersionCode() {
    }

    /**
     * 앱 구동 환경의 안드로이드 버전 이름을 반환합니다.
     * @return {string}
     */
    static getAndroidVersionName() {
    }

    /**
     * 앱 구동 기기의 브랜드명을 반환합니다.
     * @return {string}
     */
    static getPhoneBrand() {
    }

    /**
     * 앱 구동 기기의 모델명을 반환합니다.
     * @return {string}
     */
    static getPhoneModel() {
    }

    /**
     * 앱 구동 기기가 충전 중인지의 여부를 반환합니다.
     * @return {boolean}
     */
    static isCharging() {
    }

    /**
     * 앱 구동 기기의 충전기 타입을 반환합니다.
     * @return {'ac'|'wireless'|'usb'|'unknown'}
     */
    static getPlugType() {
    }

    /**
     * 앱 구동 기기의 배터리 잔량(%)을 반환합니다.
     * @return {number}
     */
    static getBatteryLevel() {
    }

    /**
     * 앱 구동 기기의 배터리 건강 상태를 나타내는 상수를 반환합니다.
     * 반환값은 다음과 같습니다:
     * - android.os.BatteryManager.BATTERY_HEALTH_UNKNOWN = 1 (0x00000001)
     * - android.os.BatteryManager.BATTERY_HEALTH_GOOD = 2 (0x00000002)
     * - android.os.BatteryManager.BATTERY_HEALTH_OVERHEAT = 3 (0x00000003)
     * - android.os.BatteryManager.BATTERY_HEALTH_DEAD = 4 (0x00000004)
     * - android.os.BatteryManager.BATTERY_HEALTH_VOLTAGE = 5 (0x00000005)
     * - android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE = 6 (0x00000006)
     * - android.os.BatteryManager.BATTERY_HEALTH_COLD = 7 (0x00000007)
     * @return {number}
     */
    static getBatteryHealth() {
    }

    /**
     * 앱 구동 기기의 배터리 온도(temp * 10)값을 반환합니다.
     * @return {number}
     */
    static getBatteryTemperature() {
    }

    /**
     * 앱 구동 기기의 배터리 전압(mV)을 반환합니다.
     * @return {number}
     */
    static getBatteryVoltage() {
    }

    /**
     * 앱 구동 기기의 배터리 상태를 나타내는 상수를 반환합니다.
     * 반환값은 다음과 같습니다:
     * - android.os.BatteryManager.BATTERY_STATUS_UNKNOWN = 1 (0x00000001)
     * - android.os.BatteryManager.BATTERY_STATUS_CHARGING = 2 (0x00000002)
     * - android.os.BatteryManager.BATTERY_STATUS_DISCHARGING = 3 (0x00000003)
     * - android.os.BatteryManager.BATTERY_STATUS_NOT_CHARGING = 4 (0x00000004)
     * - android.os.BatteryManager.BATTERY_STATUS_FULL = 5 (0x00000005)
     * @return {number}
     */
    static getBatteryStatus() {
    }

    /**
     * context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))값을 반환합니다.
     * @return {android.content.Intent}
     */
    static getBatteryIntent() {
    }
}

export const Event = {
    /**
     * 채팅이 수신되면 발생하는 이벤트에요.
     * ```
     * (chat) => {
     *   chat - 수신된 채팅의 정보가 담겨있는 객체
     *   chat.content - 수신된 채팅 내용
     *   chat.reply(msg) - 채팅이 수신된 채팅방으로 응답 전송
     *   chat.markAsRead() - 채팅이 수신된 채팅방에 별도의 채팅을 보내지 않고 읽음으로 처리
     *
     *   chat.room - 채팅이 수신된 방의 정보가 담겨있는 객체
     *   chat.room.name - 채팅이 수신된 방의 이름
     *   chat.room.chatId - 채팅이 수신된 방의 chat_id. 카톡 로컬 db 뜯으면 나오는 그 chat_id가 맞아요.
     *   chat.room.isGroupChat - 채팅이 수신된 방이 단체채팅방이라면 `true`, 1:1 채팅방이라면 `false`
     *   chat.room.isOpenChat - 채팅이 수신된 방이 오픈채팅방이라면 `true`, 아니라면 `false`
     *   chat.room.icon - 채팅이 수신된 방의 방 아이콘 정보가 담긴 객체
     *   chat.room.icon.getBase64() - 채팅이 수신된 방의 아이콘를 Base64로 인코딩된 문자열로 반환
     *   chat.room.icon.getBitmap() - 채팅이 수신된 방의 아이콘를 android.graphics.Bitmap 인스턴스로 반환
     *
     *   chat.author - 채팅을 보낸 사람의 정보가 담긴 객체
     *   chat.author.name - 채팅을 보낸 사람의 이름
     *   chat.author.hash - 채팅을 보낸 사람의 해시. 채팅방마다 다르며, 상대방이 무슨 짓을 하든 같은 계정이라면 절대로 바뀌지 않음. 현재 배포 중인 버전에는 아직 구현되어 있지 않아요.
     *   chat.author.avatar - 채팅을 보낸 사람의 프로필 사진을 가지고 올 수 있는 객체
     *   chat.author.avatar.getBase64() - 채팅을 보낸 사람의 프로필 사진을 Base64로 인코딩된 문자열로 반환
     *   chat.author.avatar.getBitmap() - 채팅을 보낸 사람의 프로필 사진을 android.graphics.Bitmap 인스턴스로 반환
     *
     *   chat.image - 수신된 채팅이 이미지라면 해당 이미지의 정보가 담긴 객체.
     *   chat.image.getBase64() - 수신된 이미지를 Base64로 인코딩된 문자열로 반환
     *   chat.image.getBitmap() - 수신된 이미지를 android.graphics.Bitmap 인스턴스로 반환
     *
     *   chat.hasMention - 수신된 채팅에 멘션이 포함된 경우 true, 아니면 false. 현재 배포 중인 버전에는 아직 구현되어 있지 않아요.
     *   chat.isMention - hasMention과 동일. 구버전 호환용이니 안쓰는거 권장
     *   chat.chatLogId - 수신된 채팅의 chatLogId
     *   chat.packageName - 채팅이 수신된 앱의 패키지명
     * }
     * ```
     */
    MESSAGE: 'message',

    /**
     * `Bot#setCommandPrefix(String prefix);`으로 설정한 문자열로 시작하는 채팅이 수신되면 발생하는 이벤트에요.
     * ```
     * (chat) => {
     *   chat - 수신된 채팅의 정보가 담겨있는 객체. Event.MESSAGE의 매개변수에 다음 필드 두 개가 추가됨
     *   chat.command - 수신된 채팅 내용을 띄어쓰기로 나눈 결과물 중 가장 앞에 있는 값에서 prefix를 제외한 부분
     *   chat.args - 수신된 채팅 내용을 띄어쓰기로 나눈 결과물 중 가장 앞에 있는 어절을 제외한 배열
     * }
     * ```
     */
    COMMAND: 'command',

    /**
     * 봇 컴파일이 시작되면 발생하는 이벤트에요.
     * 매개변수는 없어요
     */
    START_COMPILE: 'startCompile',

    /**
     * 매 틱(1초)마다 발생하는 이벤트에요.
     * 매개변수는 없어요
     */
    TICK: 'tick',

    /**
     * 상단바에 알림이 뜨면 발생하는 이벤트에요.
     * ```
     * (sbn, sm) => {
     *   sbn - NofiticationListenerService에 있는 onNotificationPosted 메서드의 의 매개변수로 넘어오는 StatusBarNotification 인스턴스
     *   sm - 동적으로 세션을 등록할 수 있게 해주는 객체 (SessionManager)
     *   - .bindSession(String packageName, String room, Notification.Action action);
     *   - .bindSession(String room, Notification.Action action);
     * }
     * ```
     */
    NOTIFICATION_POSTED: 'notificationPosted',

    /**
     * 상단바에 뜬 알림이 사라지면 발생하는 이벤트에요.
     * ```
     * (sbn, rankingMap, reason) => {
     *   sbn - NofiticationListenerService에 있는 onNotificationRemoved의 매개변수로 넘어오는 StatusBarNotification 인스턴스
     *   rankingMap - NofiticationListenerService에 있는 onNotificationRemoved의 매개변수로 넘어오는 NotificationListenerService.RankingMap 인스턴스
     *   reason - NofiticationListenerService에 있는 onNotificationRemoved의 매개변수로 넘어오는 reason
     * }
     * ```
     */
    NOTIFICATION_REMOVED: 'notificationRemoved',

    /**
     * 배터리 잔량이 바뀐게 감지되면 발생하는 이벤트에요
     * 배터리 잔량 확인 주기는 10초에요.
     * ```
     * (batteryStatus) => {
     *   batteryStatus - 배터리 정보가 담긴 객체
     *   batteryStatus.level.before - 배터리 잔량 변동이 감지되기 전 잔량
     *   batteryStatus.level.after - 배터리 잔량 변동이 감지된 후 현재 잔량
     *   batteryStatus.status - 배터리 상태 (1 ~ 5)
     * }
     * ```
     */
    BATTERY_LEVEL_CHANGED: 'batteryLevelChanged',

    /**
     * 오픈채팅방 입퇴장 API 사용시 방 인원수가 변하면 발생하는 이벤트에요.
     * ```
     * (data) => {
     *   data - 인원수 변동이 감지된 방의 정보가 담겨요.
     *   data.room -  인원수 변동이 감지된 방의 이름
     *
     *   data.count - 인원수 변동이 감지된 방의 인원수 정보
     *   data.count.before - 인원수 변동이 감지되기 직전의 인원수
     *   data.count.after - 인원수 변동이 감지된 직후의 인원수
     * }
     * ```
     */
    MEMBER_COUNT_CHANGED: 'memberCountChanged',

    Activity: class {
        // TODO: Activity
    }
}

export class FileStream {
    /**
     * 경로가 path인 파일에 저장되어 있는 내용의 뒤에 value를 붙여서 저장해요.
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
    static append(path, value) {
    }

    /**
     * 경로가 path인 파일에 저장된 내용을 읽어와요.
     * 읽으려는 파일이 없거나, 파일을 읽는 것을 실패하면 null을 반환해요.
     * @param {string} path
     * @return {string}
     */
    static read(path) {
    }

    /**
     * 경로가 path인 파일에 저장된 내용을 읽고, 그 내용이 JSON 형식이라고 가정하고 자바스크립트에 있는 객체로 바꿔서 반환해요.
     * @param {string} path
     * @return {object}
     */
    static readJson(path) {
    }

    /**
     * FileStream.save(path, value);와 동일
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
    static write(path, value) {
    }

    /**
     * FileStream.saveJson(path, json);과 동일
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
    static writeJson(path, json) {
    }

    /**
     * 해당 경로에 있는 파일을 삭제해요.
     * @param {string} path
     * @return {boolean}
     */
    static remove(path) {
    }

    /**
     * 파일 복사. 복사 성공시 true를 반환해요
     * @param {string} path1
     * @param {string} path2
     * @return {boolean}
     */
    static copyFile(path1, path2) {
    }

    /**
     * 폴더 생성.
     * @param {string} path
     * @return {boolean}
     */
    static createDir(path) {
    }

    /**
     * 내장메모리 최상위 경로 반환
     * @return {string}
     */
    static getSdcardPath() {
    }

    /**
     * 파일 이동
     * @param {string} path1
     * @param {string} path2
     * @return {string}
     */
    static moveFile(path1, path2) {
    }

    /**
     * 경로가 path인 파일에 value를 저장해요.
     * append가 true면 이미 저장되어 있는 내용 뒤에 붙이고, false라면 기존 내용은 사라지고 value로 대체
     * @param {string} path
     * @param {string} value
     * @param {boolean} append
     * @return {void}
     */
    static save(path, value, append = false) {
    }

    /**
     * 자바스크립트 객체인 json를 JSON 형식 문자열로 바꿔서 경로가 path인 파일에 저장해요.
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
    static saveJson(path, json) {
    }
}

export class GlobalLog {
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static info(log, showToast = false) {
    }

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static i = this.info;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static debug(log, showToast = false) {
    }

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static d = this.debug;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static error(log, showToast = false) {
    }

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static e = this.error;

    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    static clear() {
    }
}

export class Http {
    /**
     * 해당 url에 HTTP 요청을 비동기로 넣어요.
     * 비동기로 요청을 넣은 결과는 callBack으로 넘어와요.
     * ```
     * callback = (e, res, doc) => {
     *   e - 정상적으로 요청되지 않은 경우에만 값이 넘어오며, 요청을 넣는 과정에서 발생한 java.lang.Exception
     *   res - 정상적으로 요청된 경우에만 값이 넘어오며, 요청을 넣은 결과 org.jsoup.Connection.Response
     *   doc - 정상적으로 요청된 경우에만 값이 넘어오며, res에 .parse(); 메서드를 호출한 org.jsoup.nodes.Document
     * }
     * ```
     *
     * `key`인자가 String 타입인 경우, url을 의미해요.
     * `key`인자가 Object 타입인 경우, 인자 구조는 다음과 같아요.
     * ```
     * {
     *   "url": String, // 요청을 보낼 url
     *   "timeout": Number, // 타임아웃 (단위: 밀리초, 기본값: 3000)
     *   "method": String, // 메소드 (기본값: "GET". GET, POST, DELETE, PATCH, TRACE, PUT, OPTIONS 사용 가능)
     *   "headers": {}  // 헤더 정보
     * }
     * ```
     * @param {string | object} key
     * @param {function(error, response, body)} callBack
     * @return {void}
     */
    static request(key, callBack) {
    }
}

export class Log {
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static info(log, showToast = false) {
    }

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static i = this.info;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static debug(log, showToast = false) {
    }

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static d = this.debug;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static error(log, showToast = false) {
    }

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static e = this.error;

    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    static clear() {
    }
}

export class Security {
    /**
     * value의 해시 코드를 가지고와요.
     * java.lang.String 클래스에 있는 .hashCode(); 메서드를 호출한 그 결과물 맞아요.
     * @param {string} value
     * @return {number}
     */
    static hashCode(value) {
    }

    /**
     * value를 AES 암호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
    static aesEncode(key, initVector, value) {
    }

    /**
     * value를 AES 복호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
    static aesDecode(key, initVector, value) {
    }

    /**
     * value를 ARIA 암호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    static ariaEncode(key, value) {
    }

    /**
     * value를 ARIA 복호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    static ariaDecode(key, value) {
    }

    /**
     * value를 Base32 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base32Encode(value) {
    }

    /**
     * value를 Base32 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base32Decode(value) {
    }

    /**
     * value를 Base64 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base64Encode(value) {
    }

    /**
     * value를 Base64 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base64Decode(value) {
    }

    /**
     * value의 SHA-1 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha(value) {
    }

    /**
     * value의 SHA-256 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha256(value) {
    }

    /**
     * value의 SHA-384 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha384(value) {
    }

    /**
     * value의 SHA-512 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha512(value) {
    }
}

export const org = {
    jsoup: {
        Jsoup: class {
            constructor(url) {
                this.url = url;
            }

            /**
             * @param {string} url
             */
            static connect(url) {
                return new org.jsoup.Jsoup(url);
            }

            get() {
                return this;
            }

            html() {
                const res = request('GET', this.url);
                const $ = cheerio.load(res.getBody('utf8'));
                return $.find('br').replaceWith('\n').end().html();

                // FIXME: 구현체와 앱의 출력이 다름
                //  - 구현체는 html 파일에서 개행을 삭제해서 반환하는데, jsoup은 코드 그 자체(개행마저 살려)를 반환함.
            }

            text() {
                const res = request('GET', this.url);
                const $ = cheerio.load(res.getBody('utf8'));
                return $.find('br').replaceWith().text();

                // FIXME: 구현체와 앱의 출력이 미세하게 다름
                //  - 구현체는 개행이 공백으로 변하지 않지만, jsoup은 개행이 공백으로 변함.
            }
        }
    }
}

let room = new Room(
    'debug room',
    23454321234,
    true,
    false,
    new Image()
);
let author = new Author(
    '류현승',
    '1edfdf1a29a58e9e5565a59dab358829112af75d55a15383143149ab088a5592',
    new Image()
);
let image = new Image();
let msg = new Message(
    '/hello world',
    room, author, image,
    false,
    123456,
    'com.kakao.talk',
    ['world'],
    'hello',
    95
)