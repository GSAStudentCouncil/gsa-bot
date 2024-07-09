"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    var _this = this;
    _classCallCheck(this, Bot);
    this.bot = null;
    this.dblistener = null;
    this.cronManager = CronJob;
    this.botManager = null;
    this.commandRegistry = CommandRegistry;
    this.commandRegistry.setCronManager(this.cronManager);
    this.commandEvent = function (chat, channel, command, args) {};
    this._findCommand = function (chat, channel) {
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
      if (cmd != null) {
        _this.commandEvent(chat, channel, cmd, args);
        cmd.execute(chat, channel, args);
        if (cmd.lazy) {
          _this._lazyArgsQueue.push([chat, channel, cmd, args]);
        }
      }
    };
    this._lazyArgsQueue = [];
  }
  return _createClass(Bot, [{
    key: "on",
    value: function on(event, listener) {
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
          // 이벤트 리스너는 여러 개가 등록 가능하므로, 컴파일하면 명령어 찾아내는 리스너 하나는 자동 등록되고, 나머지 커스텀 리스너는 이렇게 따로 추가되는거로.
          this.dblistener.on(event, listener);
          break;
        default:
          this.dblistener.on(event, listener);
      }
      return this;
    }
  }, {
    key: "addListener",
    value: function addListener(event, listener) {
      return this.on(event, listener);
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!Object.keys(Event).map(function (key) {
        return Event[key];
      }).includes(event)) {
        throw new Error('Invalid event');
      }

      // TODO: Event.COMMAND는 여러 리스너 공통임. 따로 안 됨 매뉴얼에 적기

      switch (event) {
        case Event.COMMAND:
          this.commandEvent = function (chat, channel, command, args) {};
          break;
        default:
          this.dblistener.off(event, listener);
      }
      return this;
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      return this.off(event, listener);
    }
  }, {
    key: "eventNames",
    value: function eventNames() {
      return this.botManager.eventNames();
    }
  }, {
    key: "rawListeners",
    value: function rawListeners(event) {
      return this.botManager.rawListeners(event);
    }
  }, {
    key: "listeners",
    value: function listeners(event) {
      return this.botManager.listeners(event);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(event) {
      return this.botManager.listenerCount(event);
    }
  }, {
    key: "getMaxListeners",
    value: function getMaxListeners() {
      return this.botManager.getMaxListeners();
    }
  }, {
    key: "setMaxListeners",
    value: function setMaxListeners(maxListeners) {
      return this.botManager.setMaxListeners(maxListeners);
    }
  }, {
    key: "start",
    value: function start() {
      this.dblistener.start();
      this.cronManager.setWakeLock(true);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.dblistener.stop();
      this.cronManager.off();
      this.cronManager.setWakeLock(false);
    }
  }, {
    key: "close",
    value: function close() {
      this.dblistener.close();
    }
  }, {
    key: "addChannel",
    value: function addChannel(sbn) {
      this.dblistener.addChannel(sbn);
    }
  }, {
    key: "addCommand",
    value: function addCommand(cmd) {
      this.commandRegistry.register(cmd);
    }
  }, {
    key: "setWakeLock",
    value: function setWakeLock(_setWakeLock) {
      this.cronManager.setWakeLock(_setWakeLock);
    }
  }], [{
    key: "getCurrentBot",
    value: function getCurrentBot(botManager, dbManager, init) {
      var ret = new Bot();
      ret.dblistener = dbManager.getInstance(init);
      ret.botManager = botManager;
      ret.bot = ret.botManager.getCurrentBot();
      ret.dblistener.on(Event.MESSAGE, ret._findCommand);
      ret.bot.addListener('notificationPosted', function (sbn, rm) {
        ret.dblistener.addChannel(sbn);
      });

      // NOTE: 이렇게 하면 봇 소스가 여러 개일 때, 컴파일 때마다 초기화되어서
      //  한 쪽 봇 코드의 말만 듣는 현상이 생김. 그렇다고 off를 뺄 수는 없어 그냥 둠.
      ret.bot.addListener('startCompile', function () {
        ret.dblistener.stop();
        ret.cronManager.off();
        ret.cronManager.setWakeLock(false);
      });
      return ret;
    }
  }]);
}();
var BotOperator = /*#__PURE__*/function () {
  function BotOperator(botManager) {
    _classCallCheck(this, BotOperator);
    this.botManager = botManager;
    this.dbManager = DBManager;
  }
  return _createClass(BotOperator, [{
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
}();
exports.from = function (botManager) {
  return new BotOperator(botManager);
};