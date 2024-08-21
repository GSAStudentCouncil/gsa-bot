"use strict";

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 광주과학고등학교 카카오톡 봇 ver. 2024
 *
 * @checklist
 * 1. 오픈 프로필이 적어도 1개 존재해야함 ✅
 * 2. `debugRoom`, `staffRoom`의 id가 정확히 설정되어있어야함 (Bots/extract 사용해서 구할 수 있음) ✅
 * 3. 모든 기수 방의 이름이 정확히 기수로만 되어있어야함 (39, 40, ...)
 *    - 봇 초대 -> 봇 계정에서 채팅방 이름 바꾸기 -> `.` 메시지 보내서 채널 등록 순서로 진행
 * 4. 봇 코드를 컴파일한 뒤 명령어를 사용하기 전에 `.`과 같은 더미 메시지를 보내서 봇이 채널을 등록할 수 있게 해야함
 */

var BotOperator = require('BotOperator').from(BotManager);
var bot = BotOperator.getCurrentBot();
var Jsoup = org.jsoup.Jsoup;
var _require = require('BotOperator/Command'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var _require2 = require('BotOperator/Event'),
  Event = _require2.Event;
var _require3 = require('BotOperator/DateTime'),
  DateTime = _require3.DateTime;

// 파일 경로
var paths = {
  users: '/sdcard/msgbot/users.json',
  channels: '/sdcard/msgbot/channels.json',
  dmChannels: '/sdcard/msgbot/dmChannels.json'
};

// 파일 스트림 관리
var FS = _objectSpread(_objectSpread({}, FileStream), {}, {
  writeObject: function writeObject(path, data) {
    return FileStream.write(path, JSON.stringify(data));
  },
  readObject: function readObject(path) {
    var _FileStream$read;
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return JSON.parse((_FileStream$read = FileStream.read(path)) !== null && _FileStream$read !== void 0 ? _FileStream$read : JSON.stringify(defaultValue));
  }
});

// 유저, 채널 데이터베이스 관리
var DB = {
  users: FS.readObject(paths.users),
  channels: FS.readObject(paths.channels, {
    i2c: {},
    c2i: {}
  }),
  // i2c: id to customName, c2i: customName to id
  dmChannels: FS.readObject(paths.dmChannels),
  reloadUser: function reloadUser(user, channel) {
    // user.id, channel.id 도 string 타입
    DB.users[user.id] = {
      name: user.name,
      // 카톡 이름
      nth: Number(channel.customName) // 기수
    };
  },
  reloadChannel: function reloadChannel(channel) {
    DB.channels.i2c[channel.id] = channel.customName;
    DB.channels.c2i[channel.customName] = channel.id;
  }
};

// 유틸리티 함수
String.prototype.이가 = function () {
  var hasJong = _.hasJong(this);
  return this + (hasJong ? '이가' : '가');
};
String.prototype.을를 = function () {
  var hasJong = _.hasJong(this);
  return this + (hasJong ? '을' : '를');
};
String.prototype.은는 = function () {
  var hasJong = _.hasJong(this);
  return this + (hasJong ? '은' : '는');
};
String.prototype.으로 = function () {
  var hasJong = _.hasJong(this);
  return this + (hasJong ? '으로' : '로');
};
String.prototype.와과 = function () {
  var hasJong = _.hasJong(this);
  return this + (hasJong ? '과' : '와');
};
var _ = {
  hasJong: function hasJong(str) {
    return (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;
  },
  warn: function warn(msg) {
    return "\u26A0 ".concat(msg);
  },
  error: function error(msg) {
    return "\u274C ".concat(msg);
  },
  success: function success(msg) {
    return "\u2705 ".concat(msg);
  },
  info: function info(msg) {
    return "\u2139\uFE0F ".concat(msg);
  },
  isNumber: function isNumber(name) {
    return /^\d+$/.test(name);
  },
  isNaN: function isNaN(n) {
    return Number.isNaN(n);
  },
  "catch": function _catch(err, channel) {
    var error = "".concat(err.name, "\n\u2014\u2014\n").concat(err.message, "\n").concat(err.stack.trimEnd());
    Log.e(error);
    if (channel != null && typeof channel.send === 'function') {
      channel.send(error);
    }
  },
  compress: "\u200B".repeat(500)
};

// 채널 객체에 메시지 전송을 위한 유틸리티 함수
/** @param {Channel} channel */
var $ = function $(channel) {
  var send = function send() {
    for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
      msg[_key] = arguments[_key];
    }
    var content = msg.join(' ');
    if (channel != null && typeof channel.send === 'function') {
      channel.send(content)["catch"](function (e) {
        _["catch"](e, debugRoom);
        if (debugRoom != null && typeof debugRoom.send === 'function') {
          debugRoom.send('보내려던 내용' + _.compress + '\n\n' + content);
        }
      });
    }
  };
  var warn = function warn(msg) {
    return send(_.warn(msg));
  };
  var error = function error(msg) {
    return send(_.error(msg));
  };
  var success = function success(msg) {
    return send(_.success(msg));
  };
  var info = function info(msg) {
    return send(_.info(msg));
  };
  return {
    send: send,
    warn: warn,
    error: error,
    success: success,
    info: info
  };
};

// db.channels: object[string, string] -> rooms: object[string, Channel] 변환
var staffRoom = BotOperator.getChannelById('412937930061983'); // 학생회 임원방
var debugRoom = BotOperator.getChannelById('382089527597301'); // 디버그방

/** 기수 톡방 @type { { [key: string]: Channel } } */
var studentRooms = {};

/** 모든 방 @type { { [key: string]: Channel } } */
var rooms = {};
for (var _i = 0, _Object$entries = _objectEntries(DB.channels.c2i); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
    name = _Object$entries$_i[0],
    id = _Object$entries$_i[1];
  var ch = BotOperator.getChannelById(id);
  if (ch == null) continue;
  if (_.isNumber(name)) {
    if (ch.isGroupChannel() && ch.members.length > 80)
      // 기수 톡방이 맞는지 검사 (조건: 최소 80명 이상)
      studentRooms[name] = ch;
  }
  rooms[name] = ch;
}
try {
  // 급식 명령어

  /**
   * @param {DateTime} dt
   * @param {String} bullet
   * @return {String[]}
   */
  var getMeals = function getMeals(dt, bullet) {
    var options = [['ATPT_OFCDC_SC_CODE', 'F10'], ['SD_SCHUL_CODE', 7380031], ['MLSV_YMD', dt.toString('YYMMDD')], ['Type', 'xml']];
    try {
      var doc = Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?".concat(options.map(function (opt) {
        return opt.join('=');
      }).join('&'))).get();

      // 에러 코드 처리
      var resultElements = doc.select('RESULT > CODE');
      if (!resultElements.isEmpty() && !resultElements.text().equals('INFO-000')) {
        return [null, null, null];
      }

      // 에러 코드 처리 2
      var headElements = doc.select('head > RESULT > CODE');
      if (!headElements.isEmpty() && !headElements.text().equals('INFO-000')) {
        return [null, null, null];
      }
      var elements = doc.select('row');
      var breakfast = null;
      var lunch = null;
      var dinner = null;
      for (var i = 0; i < elements.length; i++) {
        var element = elements.get(i);
        var mealType = element.select('MMEAL_SC_CODE').text();
        var dishName = element.select('DDISH_NM').text().split(/ (?:\(\d+\.?(?:.\d+)*\))?(?:<br\/>|$)/g).filter(Boolean).map(function (e) {
          return bullet + e;
        }).join('\n');
        if (mealType === '1') {
          breakfast = dishName;
        } else if (mealType === '2') {
          lunch = dishName;
        } else if (mealType === '3') {
          dinner = dishName;
        }
      }
      return [breakfast, lunch, dinner];
    } catch (e) {
      _.error(e);
      return [null, null, null];
    }
  };
  bot.addCommand(new NaturalCommand.Builder().setName('급식', '🍚').setDescription("\uC785\uB825\uD55C \uC2DC\uAC04\uC5D0 \uB9DE\uCDB0 \uAE09\uC2DD\uC744 \uC804\uC1A1\uD569\uB2C8\uB2E4. \uC2DC\uAC04\uC744 \uC0DD\uB7B5\uD558\uBA74 \uBA54\uC2DC\uC9C0\uB97C \uC804\uC1A1\uD55C \uC2DC\uAC01\uC73C\uB85C \uC124\uC815\uB429\uB2C8\uB2E4.\n\uC608\uB97C \uB4E4\uC5B4, \uC544\uCE68\uACFC \uC810\uC2EC \uC2DC\uAC04 \uC0AC\uC774\uC5D0 \uBA85\uB839\uC5B4\uB97C \uD638\uCD9C\uD558\uBA74 \uC810\uC2EC \uAE09\uC2DD\uC744 \uC54C\uB824\uC8FC\uACE0, \uC810\uC2EC\uACFC \uC800\uB141 \uC2DC\uAC04 \uC0AC\uC774\uC5D0\uB294 \uC800\uB141 \uAE09\uC2DD\uC744 \uC54C\uB824\uC90D\uB2C8\uB2E4.\n\uB610\uD55C, \uB9E4\uC77C \uC790\uC815 \uADF8 \uB0A0\uC758 \uBAA8\uB4E0 \uAE09\uC2DD\uC744 \uC54C\uB824\uC8FC\uACE0, 3\uAD50\uC2DC\uC5D0\uC11C 4\uAD50\uC2DC\uB85C \uAC00\uB294 \uC26C\uB294 \uC2DC\uAC04\uC5D0\uB294 \uC810\uC2EC, 7\uAD50\uC2DC \uC774\uD6C4 \uCCAD\uC18C \uC2DC\uAC04\uC5D0 \uC800\uB141 \uAE09\uC2DD\uC744 \uC815\uAE30\uC801\uC73C\uB85C \uC804\uC1A1\uD569\uB2C8\uB2E4.").setExamples('그제 급식', '오늘 밥', '모레 급식', '석식', '내일 점심밥', '금요일 아침', '급식 3/29', '급식 다다음주 목요일').setQuery({
    급식: null,
    datetime: NaN
  }).setUseDateParse(true, false, false).setExecute(function (self, chat, channel, _ref) {
    var 급식 = _ref.급식,
      datetime = _ref.datetime;
    // 명령어 오호출 방지를 위해 날짜를 파싱하지 않은 경우에는 급식 토큰이 있는 경우에만 반응 (공백 미포함 0글자 여유로 줌)
    if (chat.filteredText.replace(/\s+/g, '').length > 0) {
      return;
    }
    if (_.isNaN(datetime)) {
      datetime = DateTime.now();
    }

    // 급식의 의미를 담은 토큰이 시간의 의미도 동시에 갖는 경우 처리
    if (급식 === '조식' || 급식 === '아침') {
      datetime = datetime.parse('아침');
    } else if (급식 === '중식' || 급식 === '점심') {
      datetime = datetime.parse('점심');
    } else if (급식 === '석식' || 급식 === '저녁') {
      datetime = datetime.parse('저녁');
    }
    var meals;

    // "오늘 밥" 같은 명령어는 급식 전체 출력
    if (datetime.eq({
      hour: 0,
      minute: 0
    })) {
      meals = getMeals(datetime, ' · ').map(function (e) {
        return e ? e : '급식 정보가 없습니다.';
      });
      var _msg = "".concat(self.icon, " ").concat(datetime.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\n\uD83C\uDF73 \uC870\uC2DD\n").concat(meals[0], "\n\n\uD83C\uDF54 \uC911\uC2DD\n").concat(meals[1], "\n\n\uD83C\uDF71 \uC11D\uC2DD\n").concat(meals[2]);
      $(channel).send(_msg);
      return;
    }
    meals = getMeals(datetime, '· ').map(function (e) {
      return e ? e : '급식 정보가 없습니다.';
    });
    var msg;

    // 급식 시간에 따라 메시지 전송
    if (datetime.isWeekend() ? datetime.lt({
      hour: 8,
      minute: 50
    }) : datetime.lt({
      hour: 8,
      minute: 10
    })) {
      msg = "\uD83C\uDF73 ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\n").concat(meals[0]);
    } else if (datetime.lt({
      hour: 13,
      minute: 10
    })) {
      msg = "\uD83C\uDF54 ".concat(datetime.humanize(true), " \uC911\uC2DD\n\u2014\u2014\n").concat(meals[1]);
    } else if (datetime.lt({
      hour: 19,
      minute: 10
    })) {
      msg = "\uD83C\uDF71 ".concat(datetime.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\n").concat(meals[2]);
    } else {
      // 저녁 시간이 끝난 후에 급식 명령어를 치는 건 내일 조식을 보겠다는 것으로 해석함
      datetime = datetime.add({
        day: 1
      });
      meals = getMeals(datetime, '· ').map(function (e) {
        return e ? e : '급식 정보가 없습니다.';
      });
      msg = "\uD83C\uDF73 ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\n").concat(meals[0]);
    }
    $(channel).send(msg);
  }).setCronJob([{
    cron: '0 0 * * *',
    comment: '매일 자정에 그 날의 모든 메뉴 전송'
  }, {
    cron: '40 11 * * *',
    comment: '3교시 쉬는 시간 (11:40)에 점심 메뉴 전송'
  }, {
    cron: '20 16 * * *',
    comment: '7교시 이후 청소 시간 (16:20)에 저녁 메뉴 전송'
  }], function (self, index, dt) {
    var meals = getMeals(dt, ' · ');
    var msg;

    // 첫 번째 크론(자정)이면서 급식 정보가 있는 경우 전체 급식 출력
    if (index === 0 && meals.filter(Boolean).length > 0) {
      meals = meals.map(function (e) {
        return e ? e : '급식 정보가 없습니다.';
      });
      msg = "".concat(self.icon, " ").concat(dt.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\n\uD83C\uDF73 \uC870\uC2DD\n").concat(meals[0], "\n\n\uD83C\uDF54 \uC911\uC2DD\n").concat(meals[1], "\n\n\uD83C\uDF71 \uC11D\uC2DD\n").concat(meals[2]);
    } else {
      // 첫 번째 크론이 아니면 해당 시간의 급식만 출력
      meals = getMeals(dt, '· ');
      if (index === 1 && meals[1] != null) {
        msg = "\uD83C\uDF54 ".concat(dt.humanize(true), " \uC911\uC2DD\n\u2014\u2014\n").concat(meals[1]);
      } else if (index === 2 && meals[2] != null) {
        msg = "\uD83C\uDF71 ".concat(dt.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\n").concat(meals[2]);
      }
    }
    for (var 기수 in studentRooms) {
      if (msg == null) continue;
      $(studentRooms[기수]).send(msg);
    }
  }).build());

  // 공지 명령어
  bot.addCommand(new StructuredCommand.Builder().setName('공지', '📢').setDescription("\uD559\uC0DD\uD68C \uACF5\uC9C0\uB97C \uC804\uC1A1\uD569\uB2C8\uB2E4. \uAE30\uC218\uB97C \uC9C0\uC815\uD558\uC9C0 \uC54A\uC73C\uBA74 \uC7AC\uD559 \uC911\uC778 \uAE30\uC218 \uD1A1\uBC29\uC5D0 \uC804\uC1A1\uB429\uB2C8\uB2E4.\n\uBA3C\uC800 \uC785\uB825 \uC591\uC2DD\uC5D0 \uB9DE\uCDB0 \uBA85\uB839\uC5B4\uB97C \uC791\uC131\uD574 \uC804\uC1A1\uD55C \uB4A4, \uACF5\uC9C0\uC0AC\uD56D\uC744 \uC791\uC131\uD574 \uD55C \uBC88 \uB354 \uC804\uC1A1\uD558\uC138\uC694.\n\uACF5\uC9C0\uC0AC\uD56D \uB0B4\uC6A9 \uB300\uC2E0 \uBA54\uC2DC\uC9C0\uB85C '\uCDE8\uC18C'\uB77C\uACE0 \uBCF4\uB0BC \uACBD\uC6B0 \uACF5\uC9C0 \uBA85\uB839\uC5B4\uAC00 \uC911\uB2E8\uB429\uB2C8\uB2E4.\n<\uBD80\uC11C>\uC5D0\uB294 \uB2E4\uC74C\uACFC \uAC19\uC740 \uBB38\uC790\uC5F4\uC774 \uB4E4\uC5B4\uAC11\uB2C8\uB2E4. ".concat(['회장', '부회장', '학생회', '생체부', '환경부', '통계부', '문예부', '체육부', '홍보부', '정책부', '정보부', '총무부'].join(', '))).setUsage("<\uBD80\uC11C:str> \uC54C\uB9BC <\uAE30\uC218:int[]? min=".concat(DateTime.now().year - 2000 + 15, " max=").concat(DateTime.now().year - 2000 + 17, ">")).setChannels(staffRoom).setExamples(['$user: 생체부 알림', '봇: ' + _.info('$user님, 39, 40, 41기에 생체부로서 공지할 내용을 작성해주세요.'), '$user: 기숙사 3월 기상곡입니다 ...'], ['$user: 정책부 알림 39', '봇: ' + _.info('$user님, 39기에 정책부로서 공지할 내용을 작성해주세요.'), '$user: 정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'], ['$user: 홍보부 알림 40 41', '봇: ' + _.info('$user님, 40, 41기에 홍보부로서 공지할 내용을 작성해주세요.'), '$user: 취소', '봇: ' + _.success('취소되었습니다.')]).setExecute(function (self, chat, channel, _ref2) {
    var 부서 = _ref2.부서,
      기수List = _ref2.기수List;
    var 부서명List = ['회장', '부회장', '학생회', '생체부', '환경부', '통계부', '문예부', '체육부', '홍보부', '정책부', '정보부', '총무부'];

    // 부서가 적절한지 확인
    if (!부서명List.includes(부서)) {
      $(channel).warn("".concat(부서.은는, " \uC801\uC808\uD55C \uBD80\uC11C\uAC00 \uC544\uB2D9\uB2C8\uB2E4.\n\n\uAC00\uB2A5\uD55C \uBD80\uC11C: ").concat(부서명List.join(', ')));
      return;
    }

    // 기수가 없으면 재학 중인 기수로 설정
    if (기수List.length === 0) {
      var thirdNth = DateTime.now().year - 2000 + 15;
      기수List = [thirdNth, thirdNth + 1, thirdNth + 2];
    }
    $(channel).info("".concat(chat.user.name, "\uB2D8, ").concat(부서.으로, "\uC11C ").concat(기수List.join(', '), "\uAE30\uC5D0 \uACF5\uC9C0\uD560 \uB0B4\uC6A9\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694."));
  }, function (self, chat, prevChat, channel, prevChannel, _ref3) {
    var 부서 = _ref3.부서,
      기수List = _ref3.기수;
    // 취소 시 중단
    if (chat.text === '취소') {
      $(channel).success('취소되었습니다.');
      return;
    }

    // 공지 전송
    var _iterator = _createForOfIteratorHelper(기수List),
      _step;
    try {
      var _loop = function _loop() {
        var 기수 = _step.value;
        if (!studentRooms[기수]) {
          $(channel).warn("".concat(기수, "\uAE30 \uD1A1\uBC29\uC740 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
          return 1; // continue
        }
        $(studentRooms[기수]).send("".concat(self.icon, " ").concat(부서, " \uC54C\uB9BC\n\u2014\u2014\n").concat(chat.text)).then(function () {
          return $(channel).success("".concat(기수, "\uAE30\uC5D0 ").concat(부서, " \uACF5\uC9C0\uAC00 \uC804\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
        })["catch"](function (e) {
          return $(channel).warn("".concat(기수, "\uAE30\uC5D0 ").concat(부서, " \uACF5\uC9C0 \uC804\uC1A1\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.\n").concat(e));
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        if (_loop()) continue;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }).build());

  // 도움말 명령어
  bot.addCommand(new StructuredCommand.Builder().setName('도움말', '❓').setDescription('명령어에 대한 상세한 도움말을 표시합니다. 명령어 이름(또는 아이콘)을 생략할 경우, 대신 등록되어 있는 명령어 목록을 전부 출력합니다.').setUsage('도움말 <명령어:str?>').setExamples('도움말', '도움말 공지', '도움말 급식', '도움말 행사', '도움말 📅', '도움말 🍚').setExecute(function (self, chat, channel, _ref4) {
    var 명령어 = _ref4.명령어;
    // 명령어 이름이 주어진 경우
    if (명령어 != null) {
      var found = CommandRegistry.data.find(function (cmd) {
        return cmd.name === 명령어 || cmd.icon === 명령어;
      });

      // 찾은 명령어가 존재하는 경우
      if (found != null) {
        $(channel).send(found.manual({
          user: chat.user.name
        }));
        return;
      } else {
        $(channel).warn("\uBA85\uB839\uC5B4 \uC774\uB984\uC774 '".concat(명령어, "'\uC778 \uBA85\uB839\uC5B4\uB294 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
      }
    }
    var ret = [];
    ret.push('📦 명령어 목록');
    ret.push('———');
    CommandRegistry.loop(function (cmd) {
      if (cmd.channels.length === 0 || cmd.channels.map(function (c) {
        return c.id;
      }).includes(channel.id)) {
        ret.push("\xB7 ".concat(cmd.name, " (").concat(cmd.icon, ")"));
      }
    });
    ret.push('\n"도움말 <명령어>"로\n세부 도움말을 확인하세요.');
    $(channel).send(ret.join('\n'));
  }).build());

  // 학사일정 명령어

  /**
   * @param {DateTime} from
   * @param {DateTime} to
   * @returns {string}
   */
  var getEvents = function getEvents(from, to) {
    var events = Database.readObject('school_events.json');
    var satisfied = {};
    for (var date in events) {
      var dt = DateTime.parse(date);
      var dtString = dt.toString('M월 D일:');
      if (from.le(dt) && dt.le(to)) {
        if (!(dtString in satisfied)) {
          satisfied[dtString] = [];
        }
        var _iterator2 = _createForOfIteratorHelper(events[date].split(/,\s*/)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var event = _step2.value;
            satisfied[dtString].push("    \xB7 ".concat(event));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
    var msg = '';
    for (var _dtString in satisfied) msg += "".concat(_dtString, "\n").concat(satisfied[_dtString].join('\n'), "\n");
    return msg.slice(0, -1);
  };

  // TODO: 학교 학사일정 수정 기능(관리자방만 허용) 추가하기 - subcommand 개념 도입 필요
  bot.addCommand(new NaturalCommand.Builder().setName('행사', '📅').setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.').setExamples('행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사').setUseDateParse(true, true).setQuery({
    학교행사: null
  }).setExecute(function (self, chat, channel, _ref5) {
    var 학교행사 = _ref5.학교행사,
      _ref5$duration = _ref5.duration,
      from = _ref5$duration.from,
      to = _ref5$duration.to;
    // TODO: 명령어 오호출 방지 setMargin(1) 구현
    if (chat.filteredText.replace(/\s+/g, '').length > 0) return;
    var eventStr = getEvents(from, to);
    if (eventStr.length > 0) {
      $(channel).send("".concat(self.icon, " \uD559\uC0AC\uC77C\uC815 (").concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\n").concat(eventStr));
    } else {
      $(channel).send("".concat(self.icon, " \uD559\uC0AC\uC77C\uC815 (").concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\n\uD574\uB2F9 \uAE30\uAC04\uC5D0 \uD559\uC0AC\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    }
  }).setCronJob([{
    cron: '0 0 * * 1',
    comment: '월요일 자정에는 그 주의 모든 일정을 전송'
  }, {
    cron: '0 0 * * 0,2-6',
    comment: '월요일을 제외한 모든 요일의 자정에는 그 날의 일정을 전송'
  }], function (self, index, dt) {
    var eventStr;
    if (index === 0) {
      eventStr = getEvents(dt, DateTime.sunday());
    } else if (index === 1) {
      eventStr = getEvents(dt, dt);
    }
    for (var 기수 in studentRooms) {
      if (eventStr.length > 0) {
        $(studentRooms[기수]).send("".concat(self.icon, " ").concat(['이번 주', '오늘'][index], " \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\n").concat(eventStr));
      }
    }
  }).build());

  // 봇 가동 시작
  bot.start();

  // db 갱신
  bot.on(Event.MESSAGE, function (chat, channel) {
    if (!_.isNumber(channel.customName)) {
      return;
    }

    // 개인 톡방 추가
    if (channel.isDirectChannel() && !(chat.user.id in DB.dmChannels)) {
      DB.dmChannels[chat.user.id] = channel.id;
      FS.writeObject(paths.dmChannels, DB.dmChannels);
    }

    // 기수 톡방 및 톡방 내 학생들 추가
    if (!(channel.id in DB.channels.i2c)) {
      DB.reloadChannel(channel);
      FS.writeObject(paths.channels, DB.channels);
      channel.members.forEach(function (user) {
        return DB.reloadUser(user, channel);
      });
      FS.writeObject(paths.users, DB.users);
      studentRooms[channel.customName] = channel;
      rooms[channel.customName] = channel;
    }

    // 이름 변경 적용
    if (chat.user.id in DB.users && (DB.users[chat.user.id].name !== chat.user.name || DB.users[chat.user.id].nth !== parseInt(channel.customName))) {
      DB.users[chat.user.id].name = chat.user.name;
      DB.users[chat.user.id].nth = Number(channel.customName);
      FS.writeObject(paths.users, DB.users);
    }
  });
} catch (err) {
  _["catch"](err, debugRoom);
}