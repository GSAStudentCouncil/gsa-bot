"use strict";

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 광주과학고등학교 카카오톡 봇 ver. 2024
 * 
 * @checklist
 * 1. 오픈 프로필이 적어도 1개 존재해야함 ✅
 * 2. `debugRoom`, `staffRoom`의 id가 정확히 설정되어있어야함 (따로 미리 구해야함) ✅
 * 3. 모든 기수 방의 이름이 정확히 기수로만 되어있어야함 (39, 40, ...)
 * 		- 봇 초대 -> 봇 계정에서 채팅방 이름 바꾸기 -> `.` 메시지 보내서 채널 등록 순서로 진행
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
var _require3 = require("BotOperator/DateTime"),
  DateTime = _require3.DateTime;

// 파일 경로
var paths = {
  users: "/sdcard/msgbot/users.json",
  channels: "/sdcard/msgbot/channels.json"
};

// 파일 입출력
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
var _ = {
  josa: function josa(str, _josa) {
    var hasJong = (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;
    switch (_josa) {
      case '이가':
      case '가':
        return str + (hasJong ? '이가' : '가');
      case '을':
      case '를':
        return str + (hasJong ? '을' : '를');
      case '은':
      case '는':
        return str + (hasJong ? '은' : '는');
      case '으로':
      case '로':
        return str + (hasJong ? '으로' : '로');
      case '과':
      case '와':
        return str + (hasJong ? '과' : '와');
      default:
        return str + _josa;
    }
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
    var error = "".concat(_.error(err.name), "\n\u2014\u2014\u2014\u2014\u2014\n").concat(err.message, "\n").concat(err.stack.trimEnd());
    Log.e(error);
    if (channel != null && typeof channel.send === 'function') channel.send(error);
  },
  compress: "\u200B".repeat(500)
};

// 채널 객체에 메시지 전송을 위한 유틸리티 함수
/**
 * @param {Channel} channel 
 * @param {Command} command
 */
var $ = function $(channel) {
  var send = function send() {
    for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
      msg[_key] = arguments[_key];
    }
    var content = msg.join(' ');
    if (channel != null && typeof channel.send === 'function') {
      channel.send(content)["catch"](function (e) {
        _["catch"](e, debugRoom);
        if (debugRoom != null && typeof debugRoom.send === 'function') debugRoom.send('보내려던 내용' + _.compress + '\n\n' + content);
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
var staffRoom = BotOperator.getChannelById('381748032476273');
var debugRoom = BotOperator.getChannelById('382089527597301');
var studentRooms = {}; // 기수방만 분리
var rooms = {};
for (var _i = 0, _Object$entries = _objectEntries(DB.channels.c2i); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
    name = _Object$entries$_i[0],
    id = _Object$entries$_i[1];
  if (_.isNumber(name)) studentRooms[name] = BotOperator.getChannelById(id);
  rooms[name] = BotOperator.getChannelById(id);
}
try {
  // 급식 명령어

  /**
   * @param {DateTime} dt
   */
  var getMeals = function getMeals(dt) {
    var options = [["ATPT_OFCDC_SC_CODE", "F10"], ["SD_SCHUL_CODE", 7380031], ["MLSV_YMD", dt.toString('YYMMDD')], ["Type", "json"]];
    var data = JSON.parse(org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?".concat(options.map(function (opt) {
      return opt.join('=');
    }).join('&'))).get().text());

    // 순서대로 아침, 점심, 저녁
    var ret = Array(3).fill('급식 정보가 없습니다.');
    if ('RESULT' in data && data.RESULT.CODE !== "INFO-000") return ret;else if (data.mealServiceDietInfo[0].head[1].RESULT.CODE !== "INFO-000") return ret;
    for (var i = 0; i < data.mealServiceDietInfo[1].row.length; i++) {
      var ddish = data.mealServiceDietInfo[1].row[i].DDISH_NM.replace(/\s*\(\d+(?:.\d+)*\)\s+/g, '\n').replace(/\(\d+\.?(?:.\d+)*\)/g, '').replace(/([가-힣ㄱ-ㅎㅏ-ㅣ)]) /g, '$1\n').split('\n').slice(0, -1);
      ret[Number(data.mealServiceDietInfo[1].row[i].MMEAL_SC_CODE) - 1] = ddish.map(function (e) {
        return '· ' + e;
      }).join('\n');
    }
    return ret;
  };
  bot.addCommand(new NaturalCommand.Builder().setName('급식', '🍚').setDescription('입력한 시간에 맞춰 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 시각으로 설정됩니다.\n' + '예를 들어, 아침과 점심 시간 사이에 명령어를 호출하면 점심 급식을 알려주고, 점심과 저녁 시간 사이에는 저녁 급식을 알려줍니다.\n' + '또한, 매일 자정 그 날의 모든 급식을 알려주고, 3교시에서 4교시로 가는 쉬는 시간에는 점심, 7교시 이후 청소 시간에 저녁 급식을 정기적으로 전송합니다.').setExamples('그제 급식', '오늘 밥', '모레 급식', '석식', '내일 점심밥', '금요일 아침', '급식 3/29', '급식 다다음주 목요일').setQuery({
    급식: null,
    datetime: NaN
  }).setUseDateParse(true, false, false).setExecute(function (self, chat, channel, _ref) {
    var 급식 = _ref.급식,
      datetime = _ref.datetime;
    // 명령어 오호출 방지를 위해 날짜를 파싱하지 않은 경우에는 급식 토큰이 있는 경우에만 반응 (공백 미포함 3글자 여유로 줌)
    if (chat.filteredText.replace(/\s+/g, '').length > 3) return;
    if (_.isNaN(datetime)) datetime = DateTime.now();
    if (급식 === '조식' || 급식 === '아침') datetime = datetime.parse('아침');else if (급식 === '중식' || 급식 === '점심') datetime = datetime.parse('점심');else if (급식 === '석식' || 급식 === '저녁') datetime = datetime.parse('저녁');

    // TODO: manual에 date parse 유무 넣기

    var meals = getMeals(datetime);
    if (datetime.eq({
      hour: 0,
      minute: 0
    })) $(channel).send("".concat(self.icon, " ").concat(datetime.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n[\uC870\uC2DD]\n").concat(meals[0], "\n\n[\uC911\uC2DD]\n").concat(meals[1], "\n\n[\uC11D\uC2DD]\n").concat(meals[2]));else if (datetime.isWeekend() ? datetime.lt({
      hour: 8,
      minute: 50
    }) : datetime.lt({
      hour: 8,
      minute: 10
    })) $(channel).send("".concat(self.icon, " ").concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[0]));else if (datetime.lt({
      hour: 13,
      minute: 10
    })) $(channel).send("".concat(self.icon, " ").concat(datetime.humanize(true), " \uC911\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[1]));else if (datetime.lt({
      hour: 19,
      minute: 10
    })) $(channel).send("".concat(self.icon, " ").concat(datetime.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[2]));else {
      datetime = datetime.add({
        day: 1
      });
      meals = getMeals(datetime);
      $(channel).send("".concat(self.icon, " ").concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[0]));
    }
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
    var meals = getMeals(dt);
    var msg;
    if (index === 0) msg = "".concat(self.icon, " ").concat(dt.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n[\uC870\uC2DD]\n").concat(meals[0], "\n\n[\uC911\uC2DD]\n").concat(meals[1], "\n\n[\uC11D\uC2DD]\n").concat(meals[2]);else if (index === 1) msg = "".concat(self.icon, " ").concat(dt.humanize(true), " \uC911\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[1]);else if (index === 2) msg = "".concat(self.icon, " ").concat(dt.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[2]);
    for (var 기수 in studentRooms) $(studentRooms[기수]).send(msg);
  }).build());

  // 공지 명령어
  bot.addCommand(new StructuredCommand.Builder().setName('공지', '🔔').setDescription("학생회 공지를 전송합니다. 기수를 지정하지 않으면 재학 중인 기수 톡방에 전송됩니다.\n" + "먼저 입력 양식에 맞춰 명령어를 작성해 전송한 뒤, 공지사항을 작성해 한 번 더 전송하세요.\n" + "공지사항 내용 대신 메시지로 '취소'라고 보낼 경우 공지 명령어가 중단됩니다.").setUsage("<\uBD80\uC11C:str> \uC54C\uB9BC <\uAE30\uC218:int[]? min=".concat(DateTime.now().year - 2000 + 15, " max=").concat(DateTime.now().year - 2000 + 17, ">")).setChannels(staffRoom).setExamples(['$user: 생체부 알림', '봇: ' + _.info('$user님, 39, 40, 41기에 생체부로서 공지할 내용을 작성해주세요.'), '$user: 기숙사 3월 기상곡입니다 ...'], ['$user: 정책부 알림 39', '봇: ' + _.info('$user님, 39기에 정책부로서 공지할 내용을 작성해주세요.'), '$user: 정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'], ['$user: 홍보부 알림 40 41', '봇: ' + _.info('$user님, 40, 41기에 홍보부로서 공지할 내용을 작성해주세요.'), '$user: 취소', '봇: ' + _.success('취소되었습니다.')]).setExecute(function (self, chat, channel, args) {
    var 부서List = ["회장", "부회장", "학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

    // 부서가 적절한지 확인
    if (!부서List.includes(args.부서)) {
      $(channel).warn("".concat(_.josa(args.부서, '는'), " \uC801\uC808\uD55C \uBD80\uC11C\uAC00 \uC544\uB2D9\uB2C8\uB2E4.\n\n\uAC00\uB2A5\uD55C \uBD80\uC11C: ").concat(부서List.join(', ')));
      return;
    }

    // 기수가 없으면 재학 중인 기수로 설정
    if (args.기수.length === 0) {
      var thirdNth = DateTime.now().year - 2000 + 15;
      args.기수 = [thirdNth, thirdNth + 1, thirdNth + 2];
    }
    $(channel).info("".concat(chat.user.name, "\uB2D8, ").concat(_.josa(args.부서, '로'), "\uC11C ").concat(args.기수.join(', '), "\uAE30\uC5D0 \uACF5\uC9C0\uD560 \uB0B4\uC6A9\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694."));
  }, function (self, chat, prevChat, channel, prevChannel, _ref2) {
    var 부서 = _ref2.부서,
      기수 = _ref2.기수;
    // 취소 시 중단
    if (chat.text === '취소') {
      $(channel).success('취소되었습니다.');
      return;
    }

    // 공지 전송
    var _iterator = _createForOfIteratorHelper(기수),
      _step;
    try {
      var _loop = function _loop() {
        var n = _step.value;
        if (!studentRooms[n]) {
          $(channel).warn("".concat(n, "\uAE30 \uD1A1\uBC29\uC740 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
          return 1; // continue
        }
        studentRooms[n].send("".concat(self.icon, " ").concat(부서, " \uC54C\uB9BC\n\u2014\u2014\u2014\u2014\u2014\n").concat(chat.text)).then(function () {
          return $(channel).success("".concat(n, "\uAE30\uC5D0 ").concat(부서, " \uACF5\uC9C0\uAC00 \uC804\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
        })["catch"](function (e) {
          return $(channel).warn("".concat(n, "\uAE30\uC5D0 ").concat(부서, " \uACF5\uC9C0 \uC804\uC1A1\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.\n").concat(e));
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
  bot.addCommand(new StructuredCommand.Builder().setName('도움말', '❓').setDescription("명령어에 대한 상세한 도움말을 표시합니다. 명령어 이름을 생략할 경우, 대신 등록되어 있는 명령어 목록을 전부 출력합니다.").setUsage('도움말 <명령어:str?>').setExamples('도움말', '도움말 공지', '도움말 급식', '도움말 행사').setExecute(function (self, chat, channel, _ref3) {
    var 명령어 = _ref3.명령어;
    // 명령어 이름이 주어진 경우
    if (명령어 != null) {
      var found = CommandRegistry.data.find(function (cmd) {
        return cmd.name === 명령어;
      });

      // 명령어가 존재하는 경우
      if (found != null) {
        $(channel).send(found.manual({
          user: chat.user.name
        }));
        return;
      } else $(channel).warn("\uBA85\uB839\uC5B4 \uC774\uB984\uC774 '".concat(명령어, "'\uC778 \uBA85\uB839\uC5B4\uB294 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
    }
    var ret = [];
    ret.push('📦 명령어 목록');
    ret.push('——————');
    CommandRegistry.loop(function (cmd) {
      return ret.push("\xB7 ".concat(cmd.name, " (").concat(cmd.icon, ")"));
    });
    ret.push('\n"도움말 <명령어>"로\n세부 도움말을 확인하세요.');
    $(channel).send(ret.join('\n'));
  }).build());

  // 학사일정 명령어

  /**
   * @param {DateTime} from
   * @param {DateTime} to
   */
  var getEvents = function getEvents(from, to) {
    var events = Database.readObject('school_events.json');
    var satisfied = [];
    for (var date in events) {
      var dt = DateTime.parse(date);
      if (from.le(dt) && dt.le(to)) {
        satisfied.push("\xB7 ".concat(dt.toString('M월 D일'), ": ").concat(events[date]));
      }
    }
    return satisfied;
  };

  // TODO: 학교 학사일정 수정 기능(관리자방만 허용) 추가하기 - subcommand 개념 도입 필요
  bot.addCommand(new NaturalCommand.Builder().setName('행사', '📅').setDescription('2024년 학사일정을 입력한 날짜 및 기간에 맞춰 알려줍니다.').setExamples('행사 3월 1일', '3월 1일부터 3월 5일까지 학사일정', '다음 주까지 학교 행사').setUseDateParse(true, true).setQuery({
    학교행사: null
  }).setExecute(function (self, chat, channel, _ref4) {
    var 학교행사 = _ref4.학교행사,
      _ref4$datetime = _ref4.datetime,
      from = _ref4$datetime.from,
      to = _ref4$datetime.to;
    if (chat.filteredText.replace(/\s+/g, '').length > 3)
      // TODO: 명령어 오호출 방지 setMargin() 구현
      return;
    var events = getEvents(from, to);
    if (events.length > 0) $(channel).send("".concat(self.icon, " \uD559\uC0AC\uC77C\uC815 (").concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\u2014\u2014\u2014\n").concat(events.join('\n')));else $(channel).send("".concat(self.icon, " \uD559\uC0AC\uC77C\uC815 (").concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\u2014\u2014\u2014\n\uD574\uB2F9 \uAE30\uAC04\uC5D0 \uD559\uC0AC\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
  }).setCronJob([{
    cron: '0 0 * * 1',
    comment: '월요일 자정에는 그 주의 모든 일정을 전송'
  }, {
    cron: '0 0 * * 0,2-6',
    comment: '월요일을 제외한 모든 요일의 자정에는 그 날의 일정을 전송'
  }], function (self, index, dt) {
    var events;
    if (index === 0) events = getEvents(dt, DateTime.sunday());else if (index === 1) events = getEvents(dt, dt);
    for (var 기수 in studentRooms) {
      if (events.length > 0) $(studentRooms[기수]).send("".concat(self.icon, " ").concat(['이번 주', '오늘'][index], " \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\u2014\u2014\u2014\n").concat(events.join('\n')));else $(studentRooms[기수]).send("".concat(self.icon, " ").concat(['이번 주', '오늘'][index], " \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\u2014\u2014\u2014\n\uD574\uB2F9 \uAE30\uAC04\uC5D0 \uD559\uC0AC\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    }
  }).build());

  // 봇 가동 시작
  bot.start();

  // db 갱신
  bot.on(Event.MESSAGE, function (chat, channel) {
    if (!_.isNumber(channel.customName)) return;

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
    if (chat.user.id in DB.users && (DB.users[chat.user.id].name !== chat.user.name || DB.users[chat.user.id].nth !== Number(channel.customName))) {
      DB.users[chat.user.id].name = chat.user.name;
      DB.users[chat.user.id].nth = Number(channel.customName);
      FS.writeObject(paths.users, DB.users);
    }
  });
} catch (err) {
  _["catch"](err, debugRoom);
}