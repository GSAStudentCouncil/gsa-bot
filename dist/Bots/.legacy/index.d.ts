/**
 * 모든 정보는 여기서 참고했습니다.
 * - https://darktornado.github.io/KakaoTalkBot/docs/api2/api2/
 * - https://nolbo.github.io/pidoc/kbot/
 */

export namespace android {
    export namespace graphics {
        export class Bitmap {}
    }
    export namespace content {
        export class Context {}
    }
}

export interface Image {
    base64: string;
    bitmap: android.graphics.Bitmap;
    getBase64(): string;
    getBitmap(): android.graphics.Bitmap;
}

export interface Room {
    name: string;
    chatId: number;
    isGroupChat: boolean;
    isOpenChat: boolean;
    icon: Image;
}

export interface Author {
    name: string;
    hash: string;
    avatar: Image;
}

export interface Message {
    content: string;
    room: Room;
    author: Author;
    image: Image;
    hasMention: boolean;
    
    /** @deprecated */
    isMention: boolean;
    
    chatLogId: number;
    packageName: string;

    /**
     * 채팅이 수신된 채팅방으로 응답 전송
     */
    reply(text: string): void;

    /**
     * 채팅이 수신된 채팅방에 별도의 채팅을 보내지 않고 읽음으로 처리
     */
    markAsRead(): void;
}

export interface App {
    /**
     * 앱의 Context(컨텍스트)를 반환합니다.
     */
    getContext(): android.content.Context;

    /**
     * UI쓰레드 상에서 특정 함수를 실행합니다.
     */
    runOnUiThread(task: () => {}, onComplete: (error: string, result: string) => string): void;
}

export interface AppData {
    /**
     * 해당 key로 저장되어 있는 boolean 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 false를 반환해요.
     */
    getBoolean(key: string, defaultValue?: boolean): boolean;

    /**
     * 해당 key로 저장되어 있는 int 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 0를 반환해요.
     */
    getInt(key: string, defaultValue?: number): number;

    /**
     * 해당 key로 저장되어 있는 String 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 null를 반환해요.
     * @param {string} key
     * @param {string} defaultValue
     * @return {string}
     */
    getString(key, defaultValue): void;

    /**
     * 해당 key로 boolean 값을 저장해요.
     * @param {string} key
     * @param {boolean} value
     * @return {void}
     */
    putBoolean(key, value): void;

    /**
     * 해당 key로 int 값을 저장해요.
     * @param {string} key
     * @param {number} value
     * @return {void}
     */
    putInt(key, value): void;

    /**
     * 해당 key로 String 값을 저장해요.
     * @param {string} key
     * @param {string} value
     * @return {void}
     */
    putString(key, value): void;

    /**
     * 해당 key로 저장되어 있는 값을 삭제해요.
     * @param {string} key
     * @return {void}
     */
    remove(key): void;

    /**
     * AppData로 저장했던 모든 값들을 삭제해요.
     * @return {void}
     */
    clear(): void;
}

export interface Bot {
    /**
     * 카카오톡봇 명령어의 접두어를 설정합니다.
     */
    setCommandPrefix(prefix: string): void;

    /**
     * 특정 방에 메시지를 보냅니다.
     * 메시지를 보낼 방에 대한 세션의 존재 여부를 반환합니다.
     */
    send(room: string, msg: string, packageName?: string): boolean;

    /**
     * 특정 방에 메시지를 수신할 수 있는지의 여부를 반환합니다.
     */
    canReply(room: string, packageName?: string): boolean;

    /**
     * 카카오톡봇의 이름을 반환합니다.
     */
    getName(): string;

    /**
     * 특정 스크립트의 작동 여부를 제어합니다.
     */
    setPower(power: boolean): void;

    /**
     * 스크립트의 활성화 여부를 반환합니다.
     */
    getPower(): boolean;

    /**
     * 스크립트를 컴파일합니다.
     */
    compile(): void;

    /**
     * 스크립트를 컴파일 전 상태로 전환합니다.
     */
    unload(): void;

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     */
    on<E extends keyof Events>(event: E, listener: Events[E]): void;

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     */
    addListener<E extends keyof Events>(event: E, listener: Events[E]): void;

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     */
    off<E extends keyof Events>(event: E, listener: Events[E]): void;

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     */
    removeListener<E extends keyof Events>(event: E, listener: Events[E]): void;

    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @return {void}
     */
    removeAllListeners(eventName): void;

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 첫 번째에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    prependListener(eventName, listener): void;

    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 배열로 반환합니다.
     * @param {string} eventName
     * @return {function[]}
     */
    listeners(eventName): void;

    /**
     * 채팅방의 메시지를 읽음 처리합니다.
     * 방에 대한 알림 읽기 세션을 찾을 수 있는지의 여부를 반환합니다.
     * @param {string} room
     * @param {string} packageName
     * @return {boolean}
     */
    markAsRead(room?: string, packageName?: string): void;
}

export class BotManager {
    /**
     * 스크립트에 할당된 Bot 객체를 반환합니다.
     * @return {Bot}
     */
    static getCurrentBot(): void;

    /**
     * 특정 Bot 객체를 반환합니다.
     * @param {string} botName
     * @return {Bot}
     */
    static getBot(botName): void;

    /**
     * 메신저 앱에서 받은 메시지의 방 이름을 배열로 반환합니다.
     * @param {string} packageName
     * @return {string[]}
     */
    static getRooms(packageName?: string): void;

    /**
     * 모든 Bot 인스턴스를 배열로 반환합니다.
     * @return {Bot[]}
     */
    static getBotList(): void;

    /**
     * 특정 Bot의 활성화 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
    static getPower(botName): void;

    /**
     * 특정 Bot의 작동 여부를 제어합니다.
     * @param {string} botName
     * @param {boolean} power
     * @return {void}
     */
    static setPower(botName, power): void;

    /**
     * 특정 Bot을 컴파일합니다.
     * @param {string} botName
     * @param {boolean} throwOnError
     * @return {boolean}
     */
    static compile(botName, throwOnError?: boolean): void;

    /**
     * 모든 Bot을 컴파일합니다.
     * @return {void}
     */
    static compileAll(): void;

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
    static prepare(scriptName, throwOnError?: boolean): void;


    /**
     * 특정 Bot의 컴파일 완료 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
    static isCompiled(botName): void;

    /**
     * Bot을 컴파일 전 상태로 전환합니다.
     * @return {void}
     */
    static unload(): void;
}

export class Broadcast {
    /**
     * 모든 스크립트를 대상으로 특정 값을 브로드캐스트합니다.
     * @param {string} broadcastName
     * @param {function(value)} task
     * @return {void}
     */
    static send(broadcastName, task): void;

    /**
     * 특정 브로드캐스트에 대한 리스너를 추가합니다.
     * @param {string} broadcastName
     * @param {function(value)} task
     * @return {void}
     */
    static register(broadcastName, task): void;

    /**
     * 특정 브로드캐스트에 대한 특정 리스너를 제거합니다.
     * @param {string} broadcastName
     * @param {function} task
     * @return {void}
     */
    static unregister(broadcastName, task): void;

    /**
     * 브로드캐스트에 등록된 모든 리스너를 제거합니다.
     * @return {void}
     */
    static unregisterAll(): void;
}

export interface Changed {
    before: number;
    after: number;
}

export interface BatteryStatus {
    level: Changed;
    status: number;
}

export class Database {
    /**
     * 특정 이름의 파일이 존재하는지의 여부를 반환합니다.
     * @param {string} fileName
     * @return {boolean}
     */
    static exists(fileName): void;

    /**
     * 특정 파일의 내용을 Object 형식으로 반환합니다.
     * 파일 내용의 형식이 JSON일 경우에만 가능합니다.
     * @param {string} fileName
     * @return {Object}
     */
    static readObject(fileName): void;

    /**
     * 특정 파일의 내용을 반환합니다.
     * @param {string} fileName
     * @return {string}
     */
    static readString(fileName): void;

    /**
     * 인자로 주어진 객체를 JSON String으로 변환한 값을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {Object} obj
     * @return {void}
     */
    static writeObject(fileName, obj): void;

    /**
     * 인자로 주어진 문자열을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {string} str
     * @return {void}
     */
    static writeString(fileName, str): void;
}

export class Device {
    /**
     * android.os.Build()값을 반환합니다.
     * @return {android.os.Build}
     */
    static getBuild(): void;

    /**
     * 앱 구동 환경의 안드로이드 버전 코드를 반환합니다.
     * @return {number}
     */
    static getAndroidVersionCode(): void;

    /**
     * 앱 구동 환경의 안드로이드 버전 이름을 반환합니다.
     * @return {string}
     */
    static getAndroidVersionName(): void;

    /**
     * 앱 구동 기기의 브랜드명을 반환합니다.
     * @return {string}
     */
    static getPhoneBrand(): void;

    /**
     * 앱 구동 기기의 모델명을 반환합니다.
     * @return {string}
     */
    static getPhoneModel(): void;

    /**
     * 앱 구동 기기가 충전 중인지의 여부를 반환합니다.
     * @return {boolean}
     */
    static isCharging(): void;

    /**
     * 앱 구동 기기의 충전기 타입을 반환합니다.
     * @return {'ac'|'wireless'|'usb'|'unknown'}
     */
    static getPlugType(): void;

    /**
     * 앱 구동 기기의 배터리 잔량(%)을 반환합니다.
     * @return {number}
     */
    static getBatteryLevel(): void;

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
    static getBatteryHealth(): void;

    /**
     * 앱 구동 기기의 배터리 온도(temp * 10)값을 반환합니다.
     * @return {number}
     */
    static getBatteryTemperature(): void;

    /**
     * 앱 구동 기기의 배터리 전압(mV)을 반환합니다.
     * @return {number}
     */
    static getBatteryVoltage(): void;

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
    static getBatteryStatus(): void;

    /**
     * context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))값을 반환합니다.
     * @return {android.content.Intent}
     */
    static getBatteryIntent(): void;
}

export interface Events {
    MESSAGE: [message: Message];
    START_COMPILE: [];
    TICK: [];
    BATTERY_LEVEL_CHANGED: [batteryStatus: BatteryStatus];
    MEMBER_COUNT_CHANGED: [data: {
        room: string;
        count: Changed;
    }];
}

export interface Event {
    MESSAGE: string;
    NOTIFICATION_POSTED: string;
    BATTERY_LEVEL_CHANGED: string;
    START_COMPILE: string;
    NOTIFICATION_REMOVED: string;
    Activity: any;
    COMMAND: string;
    TICK: string;
    MEMBER_COUNT_CHANGED: string
}

export class FileStream {
    /**
     * 경로가 path인 파일에 저장되어 있는 내용의 뒤에 value를 붙여서 저장해요.
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
    static append(path, value): void;

    /**
     * 경로가 path인 파일에 저장된 내용을 읽어와요.
     * 읽으려는 파일이 없거나, 파일을 읽는 것을 실패하면 null을 반환해요.
     * @param {string} path
     * @return {string}
     */
    static read(path): void;

    /**
     * 경로가 path인 파일에 저장된 내용을 읽고, 그 내용이 JSON 형식이라고 가정하고 자바스크립트에 있는 객체로 바꿔서 반환해요.
     * @param {string} path
     * @return {object}
     */
    static readJson(path): void;

    /**
     * FileStream.save(path, value);와 동일
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
    static write(path, value): void;

    /**
     * FileStream.saveJson(path, json);과 동일
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
    static writeJson(path, json): void;

    /**
     * 해당 경로에 있는 파일을 삭제해요.
     * @param {string} path
     * @return {boolean}
     */
    static remove(path): void;

    /**
     * 파일 복사. 복사 성공시 true를 반환해요
     * @param {string} path1
     * @param {string} path2
     * @return {boolean}
     */
    static copyFile(path1, path2): void;

    /**
     * 폴더 생성.
     * @param {string} path
     * @return {boolean}
     */
    static createDir(path): void;

    /**
     * 내장메모리 최상위 경로 반환
     * @return {string}
     */
    static getSdcardPath(): void;

    /**
     * 파일 이동
     * @param {string} path1
     * @param {string} path2
     * @return {string}
     */
    static moveFile(path1, path2): void;

    /**
     * 경로가 path인 파일에 value를 저장해요.
     * append가 true면 이미 저장되어 있는 내용 뒤에 붙이고, false라면 기존 내용은 사라지고 value로 대체
     * @param {string} path
     * @param {string} value
     * @param {boolean} append
     * @return {void}
     */
    static save(path, value, append?: boolean): void;

    /**
     * 자바스크립트 객체인 json를 JSON 형식 문자열로 바꿔서 경로가 path인 파일에 저장해요.
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
    static saveJson(path, json): void;
}

export class GlobalLog {
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static info(log, showToast?: boolean): void;

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static i(log, showToast?: boolean): void;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static debug(log, showToast?: boolean): void;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static d(log, showToast?: boolean): void;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static error(log, showToast?: boolean): void;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static e(log, showToast?: boolean): void;

    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    static clear(): void;
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
    static request(key, callBack): void;
}

export class Log {
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static info(log, showToast?: boolean): void;

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static i(log, showToast?: boolean): void;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static debug(log, showToast?: boolean): void;

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static d(log, showToast?: boolean): void;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static error(log, showToast?: boolean): void;

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    static e(log, showToast?: boolean): void;

    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    static clear(): void;
}

export class Security {
    /**
     * value의 해시 코드를 가지고와요.
     * java.lang.String 클래스에 있는 .hashCode(); 메서드를 호출한 그 결과물 맞아요.
     * @param {string} value
     * @return {number}
     */
    static hashCode(value): void;

    /**
     * value를 AES 암호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
    static aesEncode(key, initVector, value): void;

    /**
     * value를 AES 복호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
    static aesDecode(key, initVector, value): void;

    /**
     * value를 ARIA 암호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    static ariaEncode(key, value): void;

    /**
     * value를 ARIA 복호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    static ariaDecode(key, value): void;

    /**
     * value를 Base32 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base32Encode(value): void;

    /**
     * value를 Base32 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base32Decode(value): void;

    /**
     * value를 Base64 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base64Encode(value): void;

    /**
     * value를 Base64 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
    static base64Decode(value): void;

    /**
     * value의 SHA-1 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha(value): void;

    /**
     * value의 SHA-256 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha256(value): void;

    /**
     * value의 SHA-384 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha384(value): void;

    /**
     * value의 SHA-512 해시 값 반환
     * @param {string} value
     * @return {string}
     */
    static sha512(value): void;
}