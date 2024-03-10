"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('./DBManager'),
  DBManager = _require.DBManager;
var _require2 = require('./CronJob'),
  CronJob = _require2.CronJob;
var _require3 = require('./registry'),
  CR = _require3.CR;
var BM = /*#__PURE__*/function () {
  function BM(botManager) {
    _classCallCheck(this, BM);
    this.botManager = botManager;
    this.dbManager = DBManager;
  }
  _createClass(BM, [{
    key: "getCurrentBot",
    value: function getCurrentBot() {
      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return B.getCurrentBot(this.botManager, this.dbManager, init);
    }
  }]);
  return BM;
}();
var B = /*#__PURE__*/function () {
  function B() {
    var _this = this;
    _classCallCheck(this, B);
    this.botManager = null;
    this.bot = null;
    this.dblistener = null;
    this.cron = CronJob;
    this.cron.setWakeLock(true);
    this.CR = CR;
    this._find = function (chat, channel) {
      if (chat.text.startsWith('찾기 ')) {
        var result = _this.CR.get(chat.text.substring(3));
        if (result === undefined) channel.send('없음');else channel.send(result);
      }
    };
  }
  _createClass(B, [{
    key: "on",
    value: function on(event, listener) {
      this.dblistener.on(event, listener);
    }
  }, {
    key: "start",
    value: function start() {
      this.dblistener.start();
    }
  }, {
    key: "add",
    value: function add(value) {
      this.CR.add(value);
    }
  }], [{
    key: "getCurrentBot",
    value: function getCurrentBot(botManager, dbManager) {
      var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var ret = new B();
      ret.botManager = botManager;
      ret.bot = botManager.getCurrentBot();
      ret.dblistener = dbManager.getInstance(init);
      ret.dblistener.on('message', ret._find);
      ret.bot.on('notificationPosted', function (sbn, rm) {
        ret.dblistener.addChannel(sbn);
      });
      ret.bot.on('startCompile', function () {
        ret.dblistener.stop();
        ret.cron.off();
        ret.cron.setWakeLock(false);
      });
      return ret;
    }
  }]);
  return B;
}();
exports.get = function (bm) {
  return new BM(bm);
};