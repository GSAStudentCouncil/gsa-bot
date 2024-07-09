"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.org = exports.Security = exports.Message = exports.Log = exports.Http = exports.GlobalLog = exports.FileStream = exports.Event = exports.Device = exports.Database = exports.Broadcast = exports.BotManager = exports.Bot = exports.AppData = exports.App = void 0;
var _syncRequest = _interopRequireDefault(require("sync-request"));
var _cheerio = _interopRequireDefault(require("cheerio"));
var _htmlToText = require("html-to-text");
var _GlobalLog, _Log;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 모든 정보는 여기서 참고했습니다.
 * - https://darktornado.github.io/KakaoTalkBot/docs/api2/api2/
 * - https://nolbo.github.io/pidoc/kbot/
 */
var Image = /*#__PURE__*/function () {
  function Image(base64, bitmap) {
    _classCallCheck(this, Image);
    this.base64 = base64;
    this.bitmap = bitmap;
  }
  return _createClass(Image, [{
    key: "getBase64",
    value: function getBase64() {
      return this.base64;
    }
  }, {
    key: "getBitmap",
    value: function getBitmap() {
      return this.bitmap;
    }
  }]);
}();
var Room = /*#__PURE__*/_createClass(
/**
 * @param {string} name
 * @param {number} chatId
 * @param {boolean} isGroupChat
 * @param {boolean} isOpenChat
 * @param {Image} icon
 */
function Room(name, chatId, isGroupChat, isOpenChat, icon) {
  _classCallCheck(this, Room);
  this.name = name;
  this.chatId = chatId;
  this.isGroupChat = isGroupChat;
  this.isOpenChat = isOpenChat;
  this.icon = icon;
});
var Author = /*#__PURE__*/_createClass(
/**
 * @param {string} name
 * @param {string} hash
 * @param {Image} avatar
 */
function Author(name, hash, avatar) {
  _classCallCheck(this, Author);
  this.name = name;
  this.hash = hash;
  this.avatar = avatar;
});
var Message = exports.Message = /*#__PURE__*/function () {
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
  function Message(content, room, author, image, hasMention, chatLogId, packageName, args, command, systemUserId) {
    _classCallCheck(this, Message);
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
  return _createClass(Message, [{
    key: "reply",
    value: function reply(text) {
      console.log(text.toString());
    }

    /**
     * 채팅이 수신된 채팅방에 별도의 채팅을 보내지 않고 읽음으로 처리
     * @return {void}
     */
  }, {
    key: "markAsRead",
    value: function markAsRead() {}
  }]);
}();
var App = exports.App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);
  }

  /**
   * 앱의 Context(컨텍스트)를 반환합니다.
   * @return {android.content.Context}
   */
  return _createClass(App, null, [{
    key: "getContext",
    value: function getContext() {}

    /**
     * UI쓰레드 상에서 특정 함수를 실행합니다.
     * @param {function} task
     * @param {function(error, result)} onComplete
     * @return {void}
     */
  }, {
    key: "runOnUiThread",
    value: function runOnUiThread(task, onComplete) {}
  }]);
}();
var AppData = exports.AppData = /*#__PURE__*/function () {
  function AppData() {
    _classCallCheck(this, AppData);
  }

  /**
   * 해당 key로 저장되어 있는 boolean 값을 불러와요.
   * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
   * defaultValue가 없다면 false를 반환해요.
   * @param {string} key
   * @param {boolean} defaultValue
   * @return {boolean}
   */
  return _createClass(AppData, null, [{
    key: "getBoolean",
    value: function getBoolean(key, defaultValue) {}

    /**
     * 해당 key로 저장되어 있는 int 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 0를 반환해요.
     * @param {string} key
     * @param {number} defaultValue
     * @return {number}
     */
  }, {
    key: "getInt",
    value: function getInt(key, defaultValue) {}

    /**
     * 해당 key로 저장되어 있는 String 값을 불러와요.
     * 해당 key로 저장되어 있는 값이 없다면 defaultValue를 반환해요.
     * defaultValue가 없다면 null를 반환해요.
     * @param {string} key
     * @param {string} defaultValue
     * @return {string}
     */
  }, {
    key: "getString",
    value: function getString(key, defaultValue) {}

    /**
     * 해당 key로 boolean 값을 저장해요.
     * @param {string} key
     * @param {boolean} value
     * @return {void}
     */
  }, {
    key: "putBoolean",
    value: function putBoolean(key, value) {}

    /**
     * 해당 key로 int 값을 저장해요.
     * @param {string} key
     * @param {number} value
     * @return {void}
     */
  }, {
    key: "putInt",
    value: function putInt(key, value) {}

    /**
     * 해당 key로 String 값을 저장해요.
     * @param {string} key
     * @param {string} value
     * @return {void}
     */
  }, {
    key: "putString",
    value: function putString(key, value) {}

    /**
     * 해당 key로 저장되어 있는 값을 삭제해요.
     * @param {string} key
     * @return {void}
     */
  }, {
    key: "remove",
    value: function remove(key) {}

    /**
     * AppData로 저장했던 모든 값들을 삭제해요.
     * @return {void}
     */
  }, {
    key: "clear",
    value: function clear() {}
  }]);
}();
var Bot = exports.Bot = /*#__PURE__*/function () {
  function Bot() {
    _classCallCheck(this, Bot);
    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    _defineProperty(this, "addListener", this.on);
    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    _defineProperty(this, "removeListener", this.off);
  }

  /**
   * 카카오톡봇 명령어의 접두어를 설정합니다.
   * @param {string} prefix
   * @return {void}
   */
  return _createClass(Bot, [{
    key: "setCommandPrefix",
    value: function setCommandPrefix(prefix) {}

    /**
     * 특정 방에 메시지를 보냅니다.
     * 메시지를 보낼 방에 대한 세션의 존재 여부를 반환합니다.
     * @param {string} room
     * @param {string} msg
     * @param {string|null} packageName
     * @return {boolean}
     */
  }, {
    key: "send",
    value: function send(room, msg) {
      var packageName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    }

    /**
     * 특정 방에 메시지를 수신할 수 있는지의 여부를 반환합니다.
     * @param {string} room
     * @param {string|null} packageName
     * @return {boolean}
     */
  }, {
    key: "canReply",
    value: function canReply(room) {
      var packageName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    }

    /**
     * 카카오톡봇의 이름을 반환합니다.
     * @return {string}
     */
  }, {
    key: "getName",
    value: function getName() {}

    /**
     * 특정 스크립트의 작동 여부를 제어합니다.
     * @param {boolean} power
     * @return {void}
     */
  }, {
    key: "setPower",
    value: function setPower(power) {}

    /**
     * 스크립트의 활성화 여부를 반환합니다.
     * @return {boolean}
     */
  }, {
    key: "getPower",
    value: function getPower() {}

    /**
     * 스크립트를 컴파일합니다.
     * @return {void}
     */
  }, {
    key: "compile",
    value: function compile() {}

    /**
     * 스크립트를 컴파일 전 상태로 전환합니다.
     * @return {void}
     */
  }, {
    key: "unload",
    value: function unload() {}

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 마지막에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
  }, {
    key: "on",
    value: function on(eventName, listener) {
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
  }, {
    key: "off",
    value:
    /**
     * 특정 이벤트에 대한 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
    function off(eventName, listener) {}
  }, {
    key: "removeAllListeners",
    value:
    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 제거합니다.
     * @param {string} eventName
     * @return {void}
     */
    function removeAllListeners(eventName) {}

    /**
     * 특정 이벤트에 대한 이벤트 리스너를 추가합니다. (리스너 리스트의 첫 번째에 추가)
     * @param {string} eventName
     * @param {function} listener
     * @return {void}
     */
  }, {
    key: "prependListener",
    value: function prependListener(eventName, listener) {}

    /**
     * 특정 이벤트에 대한 모든 이벤트 리스너를 배열로 반환합니다.
     * @param {string} eventName
     * @return {function[]}
     */
  }, {
    key: "listeners",
    value: function listeners(eventName) {}

    /**
     * 채팅방의 메시지를 읽음 처리합니다.
     * 방에 대한 알림 읽기 세션을 찾을 수 있는지의 여부를 반환합니다.
     * @param {string} room
     * @param {string} packageName
     * @return {boolean}
     */
  }, {
    key: "markAsRead",
    value: function markAsRead() {
      var room = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'last_room';
      var packageName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'last_name';
    }
  }]);
}();
var BotManager = exports.BotManager = /*#__PURE__*/function () {
  function BotManager() {
    _classCallCheck(this, BotManager);
  }

  /**
   * 스크립트에 할당된 Bot 객체를 반환합니다.
   * @return {Bot}
   */
  return _createClass(BotManager, null, [{
    key: "getCurrentBot",
    value: function getCurrentBot() {
      return new Bot();
    }

    /**
     * 특정 Bot 객체를 반환합니다.
     * @param {string} botName
     * @return {Bot}
     */
  }, {
    key: "getBot",
    value: function getBot(botName) {}

    /**
     * 메신저 앱에서 받은 메시지의 방 이름을 배열로 반환합니다.
     * @param {string} packageName
     * @return {string[]}
     */
  }, {
    key: "getRooms",
    value: function getRooms() {
      var packageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'last_room';
    }

    /**
     * 모든 Bot 인스턴스를 배열로 반환합니다.
     * @return {Bot[]}
     */
  }, {
    key: "getBotList",
    value: function getBotList() {}

    /**
     * 특정 Bot의 활성화 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
  }, {
    key: "getPower",
    value: function getPower(botName) {}

    /**
     * 특정 Bot의 작동 여부를 제어합니다.
     * @param {string} botName
     * @param {boolean} power
     * @return {void}
     */
  }, {
    key: "setPower",
    value: function setPower(botName, power) {}

    /**
     * 특정 Bot을 컴파일합니다.
     * @param {string} botName
     * @param {boolean} throwOnError
     * @return {boolean}
     */
  }, {
    key: "compile",
    value: function compile(botName) {
      var throwOnError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 모든 Bot을 컴파일합니다.
     * @return {void}
     */
  }, {
    key: "compileAll",
    value: function compileAll() {}

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
  }, {
    key: "prepare",
    value: function prepare(scriptName) {
      var throwOnError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 특정 Bot의 컴파일 완료 여부를 반환합니다.
     * @param {string} botName
     * @return {boolean}
     */
  }, {
    key: "isCompiled",
    value: function isCompiled(botName) {}

    /**
     * Bot을 컴파일 전 상태로 전환합니다.
     * @return {void}
     */
  }, {
    key: "unload",
    value: function unload() {}
  }]);
}();
var Broadcast = exports.Broadcast = /*#__PURE__*/function () {
  function Broadcast() {
    _classCallCheck(this, Broadcast);
  }

  /**
   * 모든 스크립트를 대상으로 특정 값을 브로드캐스트합니다.
   * @param {string} broadcastName
   * @param {function(value)} task
   * @return {void}
   */
  return _createClass(Broadcast, null, [{
    key: "send",
    value: function send(broadcastName, task) {}

    /**
     * 특정 브로드캐스트에 대한 리스너를 추가합니다.
     * @param {string} broadcastName
     * @param {function(value)} task
     * @return {void}
     */
  }, {
    key: "register",
    value: function register(broadcastName, task) {}

    /**
     * 특정 브로드캐스트에 대한 특정 리스너를 제거합니다.
     * @param {string} broadcastName
     * @param {function} task
     * @return {void}
     */
  }, {
    key: "unregister",
    value: function unregister(broadcastName, task) {}

    /**
     * 브로드캐스트에 등록된 모든 리스너를 제거합니다.
     * @return {void}
     */
  }, {
    key: "unregisterAll",
    value: function unregisterAll() {}
  }]);
}();
var Database = exports.Database = /*#__PURE__*/function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  /**
   * 특정 이름의 파일이 존재하는지의 여부를 반환합니다.
   * @param {string} fileName
   * @return {boolean}
   */
  return _createClass(Database, null, [{
    key: "exists",
    value: function exists(fileName) {}

    /**
     * 특정 파일의 내용을 Object 형식으로 반환합니다.
     * 파일 내용의 형식이 JSON일 경우에만 가능합니다.
     * @param {string} fileName
     * @return {Object}
     */
  }, {
    key: "readObject",
    value: function readObject(fileName) {}

    /**
     * 특정 파일의 내용을 반환합니다.
     * @param {string} fileName
     * @return {string}
     */
  }, {
    key: "readString",
    value: function readString(fileName) {}

    /**
     * 인자로 주어진 객체를 JSON String으로 변환한 값을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {Object} obj
     * @return {void}
     */
  }, {
    key: "writeObject",
    value: function writeObject(fileName, obj) {}

    /**
     * 인자로 주어진 문자열을 특정 파일에 덮어씁니다.
     * 파일이 존재하지 않을 경우 파일을 생성합니다.
     * @param {string} fileName
     * @param {string} str
     * @return {void}
     */
  }, {
    key: "writeString",
    value: function writeString(fileName, str) {}
  }]);
}();
var Device = exports.Device = /*#__PURE__*/function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  /**
   * android.os.Build()값을 반환합니다.
   * @return {android.os.Build}
   */
  return _createClass(Device, null, [{
    key: "getBuild",
    value: function getBuild() {}

    /**
     * 앱 구동 환경의 안드로이드 버전 코드를 반환합니다.
     * @return {number}
     */
  }, {
    key: "getAndroidVersionCode",
    value: function getAndroidVersionCode() {}

    /**
     * 앱 구동 환경의 안드로이드 버전 이름을 반환합니다.
     * @return {string}
     */
  }, {
    key: "getAndroidVersionName",
    value: function getAndroidVersionName() {}

    /**
     * 앱 구동 기기의 브랜드명을 반환합니다.
     * @return {string}
     */
  }, {
    key: "getPhoneBrand",
    value: function getPhoneBrand() {}

    /**
     * 앱 구동 기기의 모델명을 반환합니다.
     * @return {string}
     */
  }, {
    key: "getPhoneModel",
    value: function getPhoneModel() {}

    /**
     * 앱 구동 기기가 충전 중인지의 여부를 반환합니다.
     * @return {boolean}
     */
  }, {
    key: "isCharging",
    value: function isCharging() {}

    /**
     * 앱 구동 기기의 충전기 타입을 반환합니다.
     * @return {'ac'|'wireless'|'usb'|'unknown'}
     */
  }, {
    key: "getPlugType",
    value: function getPlugType() {}

    /**
     * 앱 구동 기기의 배터리 잔량(%)을 반환합니다.
     * @return {number}
     */
  }, {
    key: "getBatteryLevel",
    value: function getBatteryLevel() {}

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
  }, {
    key: "getBatteryHealth",
    value: function getBatteryHealth() {}

    /**
     * 앱 구동 기기의 배터리 온도(temp * 10)값을 반환합니다.
     * @return {number}
     */
  }, {
    key: "getBatteryTemperature",
    value: function getBatteryTemperature() {}

    /**
     * 앱 구동 기기의 배터리 전압(mV)을 반환합니다.
     * @return {number}
     */
  }, {
    key: "getBatteryVoltage",
    value: function getBatteryVoltage() {}

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
  }, {
    key: "getBatteryStatus",
    value: function getBatteryStatus() {}

    /**
     * context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))값을 반환합니다.
     * @return {android.content.Intent}
     */
  }, {
    key: "getBatteryIntent",
    value: function getBatteryIntent() {}
  }]);
}();
var Event = exports.Event = {
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
  Activity: /*#__PURE__*/_createClass(function Activity() {
    _classCallCheck(this, Activity);
  })
};
var FileStream = exports.FileStream = /*#__PURE__*/function () {
  function FileStream() {
    _classCallCheck(this, FileStream);
  }
  return _createClass(FileStream, null, [{
    key: "append",
    value:
    /**
     * 경로가 path인 파일에 저장되어 있는 내용의 뒤에 value를 붙여서 저장해요.
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
    function append(path, value) {}

    /**
     * 경로가 path인 파일에 저장된 내용을 읽어와요.
     * 읽으려는 파일이 없거나, 파일을 읽는 것을 실패하면 null을 반환해요.
     * @param {string} path
     * @return {string}
     */
  }, {
    key: "read",
    value: function read(path) {}

    /**
     * 경로가 path인 파일에 저장된 내용을 읽고, 그 내용이 JSON 형식이라고 가정하고 자바스크립트에 있는 객체로 바꿔서 반환해요.
     * @param {string} path
     * @return {object}
     */
  }, {
    key: "readJson",
    value: function readJson(path) {}

    /**
     * FileStream.save(path, value);와 동일
     * @param {string} path
     * @param {string} value
     * @return {void}
     */
  }, {
    key: "write",
    value: function write(path, value) {}

    /**
     * FileStream.saveJson(path, json);과 동일
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
  }, {
    key: "writeJson",
    value: function writeJson(path, json) {}

    /**
     * 해당 경로에 있는 파일을 삭제해요.
     * @param {string} path
     * @return {boolean}
     */
  }, {
    key: "remove",
    value: function remove(path) {}

    /**
     * 파일 복사. 복사 성공시 true를 반환해요
     * @param {string} path1
     * @param {string} path2
     * @return {boolean}
     */
  }, {
    key: "copyFile",
    value: function copyFile(path1, path2) {}

    /**
     * 폴더 생성.
     * @param {string} path
     * @return {boolean}
     */
  }, {
    key: "createDir",
    value: function createDir(path) {}

    /**
     * 내장메모리 최상위 경로 반환
     * @return {string}
     */
  }, {
    key: "getSdcardPath",
    value: function getSdcardPath() {}

    /**
     * 파일 이동
     * @param {string} path1
     * @param {string} path2
     * @return {string}
     */
  }, {
    key: "moveFile",
    value: function moveFile(path1, path2) {}

    /**
     * 경로가 path인 파일에 value를 저장해요.
     * append가 true면 이미 저장되어 있는 내용 뒤에 붙이고, false라면 기존 내용은 사라지고 value로 대체
     * @param {string} path
     * @param {string} value
     * @param {boolean} append
     * @return {void}
     */
  }, {
    key: "save",
    value: function save(path, value) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    }

    /**
     * 자바스크립트 객체인 json를 JSON 형식 문자열로 바꿔서 경로가 path인 파일에 저장해요.
     * @param {string} path
     * @param {object} json
     * @return {void}
     */
  }, {
    key: "saveJson",
    value: function saveJson(path, json) {}
  }]);
}();
var GlobalLog = exports.GlobalLog = /*#__PURE__*/function () {
  function GlobalLog() {
    _classCallCheck(this, GlobalLog);
  }
  return _createClass(GlobalLog, null, [{
    key: "info",
    value:
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function info(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "debug",
    value:
    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function debug(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "error",
    value:
    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function error(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "clear",
    value:
    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    function clear() {}
  }]);
}();
_GlobalLog = GlobalLog;
_defineProperty(GlobalLog, "i", _GlobalLog.info);
_defineProperty(GlobalLog, "d", _GlobalLog.debug);
_defineProperty(GlobalLog, "e", _GlobalLog.error);
var Http = exports.Http = /*#__PURE__*/function () {
  function Http() {
    _classCallCheck(this, Http);
  }
  return _createClass(Http, null, [{
    key: "request",
    value:
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
    function request(key, callBack) {}
  }]);
}();
var Log = exports.Log = /*#__PURE__*/function () {
  function Log() {
    _classCallCheck(this, Log);
  }
  return _createClass(Log, null, [{
    key: "info",
    value:
    /**
     * 글로벌 로그를 기록해요. GlobalLog.i();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function info(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "debug",
    value:
    /**
     * 녹색 글씨로 글로벌 로그를 기록해요. GlobalLog.d();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function debug(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 녹색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "error",
    value:
    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요. GlobalLog.e();로도 사용할 수 있어요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
    function error(log) {
      var showToast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }

    /**
     * 빨간색 글씨로 글로벌 로그를 기록해요.
     * showToast가 true라면 로그가 토스트 메시지로도 출력될거에요.
     * @param {string} log
     * @param {boolean} showToast
     * @return {void}
     */
  }, {
    key: "clear",
    value:
    /**
     * 기록되어 있는 글로벌 로그를 삭제해요.
     * @return {void}
     */
    function clear() {}
  }]);
}();
_Log = Log;
_defineProperty(Log, "i", _Log.info);
_defineProperty(Log, "d", _Log.debug);
_defineProperty(Log, "e", _Log.error);
var Security = exports.Security = /*#__PURE__*/function () {
  function Security() {
    _classCallCheck(this, Security);
  }
  return _createClass(Security, null, [{
    key: "hashCode",
    value:
    /**
     * value의 해시 코드를 가지고와요.
     * java.lang.String 클래스에 있는 .hashCode(); 메서드를 호출한 그 결과물 맞아요.
     * @param {string} value
     * @return {number}
     */
    function hashCode(value) {}

    /**
     * value를 AES 암호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "aesEncode",
    value: function aesEncode(key, initVector, value) {}

    /**
     * value를 AES 복호화한 값을 반환해요.
     * @param {string} key
     * @param {string} initVector
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "aesDecode",
    value: function aesDecode(key, initVector, value) {}

    /**
     * value를 ARIA 암호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "ariaEncode",
    value: function ariaEncode(key, value) {}

    /**
     * value를 ARIA 복호화한 값을 반환해요.
     * 이론상 전자정부 표준프레임워크와 호환될텐데, 확인해본건 아니에요.
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "ariaDecode",
    value: function ariaDecode(key, value) {}

    /**
     * value를 Base32 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "base32Encode",
    value: function base32Encode(value) {}

    /**
     * value를 Base32 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "base32Decode",
    value: function base32Decode(value) {}

    /**
     * value를 Base64 암호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "base64Encode",
    value: function base64Encode(value) {}

    /**
     * value를 Base64 복호화한 값을 반환해요.
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "base64Decode",
    value: function base64Decode(value) {}

    /**
     * value의 SHA-1 해시 값 반환
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "sha",
    value: function sha(value) {}

    /**
     * value의 SHA-256 해시 값 반환
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "sha256",
    value: function sha256(value) {}

    /**
     * value의 SHA-384 해시 값 반환
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "sha384",
    value: function sha384(value) {}

    /**
     * value의 SHA-512 해시 값 반환
     * @param {string} value
     * @return {string}
     */
  }, {
    key: "sha512",
    value: function sha512(value) {}
  }]);
}();
var org = exports.org = {
  jsoup: {
    Jsoup: /*#__PURE__*/function () {
      function Jsoup(url) {
        _classCallCheck(this, Jsoup);
        this.url = url;
      }

      /**
       * @param {string} url
       */
      return _createClass(Jsoup, [{
        key: "get",
        value: function get() {
          return this;
        }
      }, {
        key: "html",
        value: function html() {
          var res = (0, _syncRequest["default"])('GET', this.url);
          var $ = _cheerio["default"].load(res.getBody('utf8'));
          return $.find('br').replaceWith('\n').end().html();

          // FIXME: 구현체와 앱의 출력이 다름
          //  - 구현체는 html 파일에서 개행을 삭제해서 반환하는데, jsoup은 코드 그 자체(개행마저 살려)를 반환함.
        }
      }, {
        key: "text",
        value: function text() {
          var res = (0, _syncRequest["default"])('GET', this.url);
          var $ = _cheerio["default"].load(res.getBody('utf8'));
          return $.find('br').replaceWith().text();

          // FIXME: 구현체와 앱의 출력이 미세하게 다름
          //  - 구현체는 개행이 공백으로 변하지 않지만, jsoup은 개행이 공백으로 변함.
        }
      }], [{
        key: "connect",
        value: function connect(url) {
          return new org.jsoup.Jsoup(url);
        }
      }]);
    }()
  }
};
var room = new Room('debug room', 23454321234, true, false, new Image());
var author = new Author('류현승', '1edfdf1a29a58e9e5565a59dab358829112af75d55a15383143149ab088a5592', new Image());
var image = new Image();
var msg = new Message('/hello world', room, author, image, false, 123456, 'com.kakao.talk', ['world'], 'hello', 95);