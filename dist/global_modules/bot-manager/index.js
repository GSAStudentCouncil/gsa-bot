"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _require = require('./DBManager'),
  DBManager = _require.DBManager;
var _require2 = require('./CronJob'),
  CronJob = _require2.CronJob;
var _require3 = require('./Event'),
  Event = _require3.Event;
var _require4 = require('./Command'),
  CommandRegistry = _require4.CommandRegistry;
var IS_DIST = true;
var Bot = /*#__PURE__*/function () {
  function Bot() {
    _classCallCheck(this, Bot);
    this.bot = null;
    this.dbManager = null;
    this.cronManager = CronJob;
    this.botManager = null;
    this.commandRegistry = CommandRegistry;
    this.commandRegistry.setCronManager(this.cronManager);
    this.commandEvent = function (chat, channel, command, args) {};
    this._lazyArgsQueue = [];
  }
  _createClass(Bot, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;
      if (!Object.keys(Event).map(function (key) {
        return Event[key];
      }).includes(event)) {
        throw new Error('Invalid event');
      }
      switch (event) {
        case Event.COMMAND:
          this.commandEvent = listener;
          break;
        case Event.MESSAGE:
          // TEST: 여러 lazy 명령어가 동시에 들어올 때, 어떻게 처리되는지 테스트
          this.dbManager.on(event, function (chat, channel) {
            for (var i = 0; i < _this._lazyArgsQueue.length; i++) {
              var _this$_lazyArgsQueue$ = _slicedToArray(_this._lazyArgsQueue[i], 4),
                prevChat = _this$_lazyArgsQueue$[0],
                prevChannel = _this$_lazyArgsQueue$[1],
                _cmd = _this$_lazyArgsQueue$[2],
                _args = _this$_lazyArgsQueue$[3];
              if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
                _cmd.executeLazy(chat, prevChat, channel, prevChannel, _args);
                _this._lazyArgsQueue.splice(i, 1);
                return;
              }
            }
            var _this$commandRegistry = _this.commandRegistry.get(chat, channel),
              cmd = _this$commandRegistry.cmd,
              args = _this$commandRegistry.args;
            if (cmd) {
              _this.commandEvent(chat, channel, cmd, args);
              cmd.execute(chat, channel, args);
              if (cmd.lazy === true) {
                _this._lazyArgsQueue.push([chat, channel, cmd, args]);
              }
            }
            listener(chat, channel);
          });
          break;
        default:
          this.dbManager.on(event, listener);
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.dbManager.start();
      this.cronManager.setWakeLock(true);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.dbManager.stop();
    }
  }, {
    key: "close",
    value: function close() {
      this.dbManager.close();
    }
  }, {
    key: "addChannel",
    value: function addChannel(sbn) {
      this.dbManager.addChannel(sbn);
    }
  }, {
    key: "addCommand",
    value: function addCommand(cmd) {
      this.commandRegistry.register(cmd);
    }
  }, {
    key: "setWakeLock",
    value: function setWakeLock(_setWakeLock) {
      this.dbManager.setWakeLock(_setWakeLock);
    }
  }], [{
    key: "getCurrentBot",
    value: function getCurrentBot(botManager, dbManager, init) {
      var ret = new Bot();
      ret.dbManager = dbManager.getInstance(init);
      ret.botManager = botManager;
      ret.bot = ret.botManager.getCurrentBot();
      ret.bot.addListener('notificationPosted', function (sbn, rm) {
        ret.dbManager.addChannel(sbn);
      });

      // NOTE: 이렇게 하면 봇 소스가 여러 개일 때, 컴파일 때마다 초기화되어서
      //  한 쪽 봇 코드의 말만 듣는 현상이 생김. 그렇다고 off를 뺄 수는 없어 그냥 둠.
      ret.bot.addListener('startCompile', function () {
        ret.dbManager.stop();
        ret.cronManager.off();
        ret.cronManager.setWakeLock(false);
      });
      return ret;
    }
  }]);
  return Bot;
}();
var BotManager = /*#__PURE__*/function () {
  function BotManager(botManager) {
    _classCallCheck(this, BotManager);
    this.botManager = botManager;
    this.dbManager = DBManager;
  }
  _createClass(BotManager, [{
    key: "getCurrentBot",
    value: function getCurrentBot(init) {
      return Bot.getCurrentBot(this.botManager, this.dbManager, init);
    }
  }, {
    key: "getChannelById",
    value: function getChannelById(i) {
      return this.dbManager.getChannelById(i);
    }
  }]);
  return BotManager;
}();
exports.get = function (botManager) {
  return new BotManager(botManager);
};