"use strict";

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var BotManager = require('bot-manager').get(BotManager);
var bot = BotManager.getCurrentBot();
var Jsoup = org.jsoup.Jsoup;
var _require = require('bot-manager/Command'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var _require2 = require('bot-manager/Event'),
  Event = _require2.Event;
var _require3 = require("bot-manager/DateTime"),
  DateTime = _require3.DateTime;

// 기본 유틸 함수들
FileStream.writeObject = function (path, data) {
  return FileStream.write(path, JSON.stringify(data));
};
FileStream.readObject = function (path) {
  var _FileStream$read;
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return JSON.parse((_FileStream$read = FileStream.read(path)) !== null && _FileStream$read !== void 0 ? _FileStream$read : JSON.stringify(defaultValue));
};

// 저장 경로
var paths = {
  users: "/sdcard/msgbot/users.json",
  channels: "/sdcard/msgbot/channels.json"
};

// 유저, 채널 데이터베이스 관리 객체
var db = {
  users: FileStream.readObject(paths.users),
  channels: FileStream.readObject(paths.channels, {
    i2c: {},
    c2i: {}
  }),
  userReload: function userReload(user, channel) {
    // user.id, channel.id 도 string 타입
    db.users[user.id] = {
      name: user.name,
      // 카톡 이름
      nth: Number(channel.name) // 기수
    };
  },
  channelReload: function channelReload(channel) {
    db.channels.i2c[channel.id] = channel.name;
    db.channels.c2i[channel.name] = channel.id;
  }
};

// db.channels: object[string, string] -> rooms: object[string, Channel] 변환
var studentRooms = {}; // 기수방만 분리
var rooms = {};
var isStudentRoom = function isStudentRoom(name) {
  return /^\d+$/.test(name);
};
for (var _i = 0, _Object$entries = _objectEntries(db.channels.c2i); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
    name = _Object$entries$_i[0],
    id = _Object$entries$_i[1];
  if (isStudentRoom(name)) studentRooms[name] = BotManager.getChannelById(id);
  rooms[name] = BotManager.getChannelById(id);
}

// 봇 가동 시작
bot.start();

// db 갱신
bot.on(Event.MESSAGE, function (chat, channel) {
  // 기수 톡방 및 톡방 내 학생들 추가
  if (!(channel.id in db.channels.i2c) && isStudentRoom(channel.name)) {
    db.channelReload(channel);
    FileStream.writeObject(paths.channels, db.channels);
    channel.members.forEach(function (user) {
      return db.userReload(user, channel);
    });
    FileStream.writeObject(paths.users, db.users);
    studentRooms[channel.name] = channel;
    rooms[channel.name] = channel;
  }

  // 이름 변경 적용
  if (chat.user.id in db.users && db.users[chat.user.id].name !== chat.user.name) {
    db.users[chat.user.id].name = chat.user.name;
    FileStream.writeObject(paths.users, db.users);
  }
});

// 급식 명령어

/**
 * @param {DateTime} dt
 */
var getMeals = function getMeals(dt) {
  var options = [["ATPT_OFCDC_SC_CODE", "F10"], ["SD_SCHUL_CODE", 7380031], ["MLSV_YMD", dt.toString('YYMMDD')], ["Type", "json"]];
  var data = JSON.parse(org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?".concat(options.map(function (opt) {
    return opt.join('=');
  }).join('&'))).get().text());

  // TEST: 석식, 중식까지만 있는 날

  if (data.mealServiceDietInfo[0].head[1].RESULT.CODE !== "INFO-000") return Array(3).fill('급식 정보가 없습니다.');

  // 순서대로 아침, 점심, 저녁
  return [0, 1, 2].map(function (i) {
    // .replace(/\(\d+(?:.\d+)*\)/g, "")
    if (data.mealServiceDietInfo[1].row[i] != null) {
      var ddish = data.mealServiceDietInfo[1].row[i].DDISH_NM.replace(/\s*\(\d+(?:.\d+)*\)\s+/g, '\n').replace(/\(\d+(?:.\d+)*\)/g, '').replace(/([ㄱ-힣)]) /g, '$1\n').split('\n').slice(0, -1);
      return ddish.map(function (e) {
        return '· ' + e;
      }).join('\n');
    } else return '급식 정보가 없습니다.';
  });
};
bot.addCommand(new NaturalCommand.Builder().setName('급식').setDescription('입력한 시간에 맞춰 다음 급식을 전송합니다. 시간을 생략하면 메시지를 전송한 당시로 설정됩니다.\n' + '또한, 매일 자정 그 날의 모든 급식을 알려주고, 오전 11시 40분에는 점심, 오후 4시 20분에 저녁 급식을 정기적으로 전송합니다.').setExamples('오늘 밥', '모레 급식', '급식 저녁', '내일 점심 밥', '...등 자유로운 형태').setQuery({
  meal: null,
  datetime: function datetime() {
    return DateTime.now();
  }
}).setUseDateParse(true, false, false).setExecute(function (self, chat, channel, _ref) {
  var meal = _ref.meal,
    datetime = _ref.datetime;
  // TODO: manual에 date parse 유무 넣기 
  if (meal === '조식') datetime.set({
    hour: 7,
    minute: 30
  });else if (meal === '중식') datetime.set({
    hour: 12,
    minute: 30
  });else if (meal === '석식') datetime.set({
    hour: 18,
    minute: 30
  });
  var meals = getMeals(datetime);
  if (datetime.eq({
    hour: 0,
    minute: 0
  })) channel.send("\uD83C\uDF5A ".concat(datetime.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n[\uC870\uC2DD]\n").concat(meals[0], "\n\n[\uC911\uC2DD]\n").concat(meals[1], "\n\n[\uC11D\uC2DD]\n").concat(meals[2]));else if (datetime.lt({
    hour: 8,
    minute: 10
  })) channel.send("\uD83C\uDF5A ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[0]));else if (datetime.lt({
    hour: 13,
    minute: 10
  })) channel.send("\uD83C\uDF5A ".concat(datetime.humanize(true), " \uC911\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[1]));else if (datetime.lt({
    hour: 19,
    minute: 10
  })) channel.send("\uD83C\uDF5A ".concat(datetime.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[2]));else {
    datetime = datetime.add({
      day: 1
    });
    meals = getMeals(datetime);
    channel.send("\uD83C\uDF5A ".concat(datetime.humanize(true), " \uC870\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[0]));
  }
}).setCronJob({
  '오늘': '0 0 * * *',
  '점심': '40 11 * * *',
  '저녁': '20 16 * * *'
}, function (self, tag) {
  var dt = DateTime.now();
  var meals = getMeals(dt);
  var msg;
  if (tag === '오늘') msg = "\uD83C\uDF5A ".concat(dt.humanize(true), " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n[\uC870\uC2DD]\n").concat(meals[0], "\n\n[\uC911\uC2DD]\n").concat(meals[1], "\n\n[\uC11D\uC2DD]\n").concat(meals[2]);else if (tag === '점심') msg = "\uD83C\uDF5A ".concat(dt.humanize(true), " \uC911\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[1]);else if (tag === '저녁') msg = "\uD83C\uDF5A ".concat(dt.humanize(true), " \uC11D\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meals[2]);
  for (var 기수 in studentRooms) studentRooms[기수].send(msg);
}).build());

// 공지 명령어
bot.addCommand(new StructuredCommand.Builder().setName('공지').setDescription("학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n" + "명령어를 작성한 뒤, 메시지를 한 번 더 보내세요. 그 메시지 내용을 공지 메시지로 처리합니다.\n" + "두 번째 메시지로 '취소'라고 보낼 경우 공지 명령어가 중단됩니다.").setUsage("<부서:str length=3> 알림 <기수:int[]? min=39>").setChannels(rooms['공지방']).setExamples('생체부 알림\n기숙사 3월 기상곡입니다 ...', '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...').setExecute(function (self, chat, channel, args) {
  if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
    channel.send("".concat(args.부서, "\uB294 \uC801\uC808\uD55C \uBD80\uC11C\uAC00 \uC544\uB2D9\uB2C8\uB2E4.\n\uAC00\uB2A5\uD55C \uBD80\uC11C: \uD559\uC0DD\uD68C, \uC0DD\uCCB4\uBD80, \uD658\uACBD\uBD80, \uD1B5\uACC4\uBD80, \uBB38\uC608\uBD80, \uCCB4\uC721\uBD80, \uD64D\uBCF4\uBD80, \uC815\uCC45\uBD80, \uC815\uBCF4\uBD80, \uCD1D\uBB34\uBD80"));
    return;
  }
  if (args.기수.length === 0) {
    var thirdNth = DateTime.now().year - 2000 + 15;
    args.기수 = [thirdNth, thirdNth - 1, thirdNth - 2];
  }
  channel.send("".concat(chat.user.name, "\uB2D8, ").concat(args.기수.join(', '), "\uAE30\uC5D0 ").concat(args.부서, "\uB85C\uC11C \uACF5\uC9C0\uD560 \uB0B4\uC6A9\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694."));
}, function (self, chat, prevChat, channel, prevChannel, _ref2) {
  var 부서 = _ref2.부서,
    기수 = _ref2.기수;
  if (chat.text === '취소') {
    channel.send('취소되었습니다.');
    return;
  }
  var _iterator = _createForOfIteratorHelper(기수),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var n = _step.value;
      if (!studentRooms[n]) channel.send("".concat(n, "\uAE30 \uD1A1\uBC29\uC740 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
      studentRooms[n].send("\uD83D\uDD14 ".concat(부서, " \uC54C\uB9BC\n\u2014\u2014\u2014\u2014\u2014\n").concat(chat.text));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}).build());

// 도움말 명령어
bot.addCommand(new StructuredCommand.Builder().setName('도움말').setDescription("명령어에 대한 상세한 도움말을 표시합니다. `name`을 생략할 경우, 명령어 목록을 전부 출력하고, `name`을 명시한 경우 그 명령어의 도움말을 출력합니다.").setUsage('도움말 <name:str?>').setExamples('도움말', '도움말 공지', '도움말 급식').setExecute(function (self, chat, channel, _ref3) {
  var name = _ref3.name;
  if (name != null) {
    var found = CommandRegistry.data.find(function (cmd) {
      return cmd.name === name;
    });
    if (found != null) {
      channel.send(found.manual());
      return;
    } else channel.send("\uBA85\uB839\uC5B4 \uC774\uB984\uC774 '".concat(name, "'\uC778 \uBA85\uB839\uC5B4\uB294 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
  }
  var ret = ['📦 명령어 목록', '——————'];
  CommandRegistry.loop(function (cmd) {
    if (cmd.name !== '도움말') ret.push("\xB7 ".concat(cmd.name));
  });
  ret.push('');
  ret.push('세부 도움말을 보고 싶은 경우, "도움말 <명령어>"를 입력하세요.');
  channel.send(ret.join('\n'));
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
bot.addCommand(new NaturalCommand.Builder().setName('행사').setDescription('학사일정을 알려줍니다.').setExamples('행사', '행사 3월 1일', '행사 3월 1일부터 3월 5일까지').setUseDateParse(true, true).setQuery({
  school_event: null
}).setExecute(function (self, chat, channel, _ref4) {
  var school_event = _ref4.school_event,
    _ref4$datetime = _ref4.datetime,
    from = _ref4$datetime.from,
    to = _ref4$datetime.to;
  var events = getEvents(from, to);
  if (events.length > 0) channel.send("\uD83D\uDCC5 \uD559\uC0AC\uC77C\uC815 (".concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\u2014\u2014\u2014\n").concat(events.join('\n')));else channel.send("\uD83D\uDCC5 \uD559\uC0AC\uC77C\uC815 (".concat(from.humanize(true), " ~ ").concat(to.humanize(true), ")\n\u2014\u2014\u2014\u2014\u2014\n\uD574\uB2F9 \uAE30\uAC04\uC5D0 \uD559\uC0AC\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
}).setCronJob({
  '매주': '0 0 * * 1',
  '매일': '0 0 * * 0,2-6'
}, function (self, tag) {
  var events;
  if (tag === '매주') events = getEvents(DateTime.today(), DateTime.sunday());else if (tag === '매일') events = getEvents(DateTime.today(), DateTime.today());
  if (events.length > 0) channel.send("\uD83D\uDCC5 \uC774\uBC88 \uC8FC \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\u2014\u2014\u2014\n".concat(events.join('\n')));else channel.send("\uD83D\uDCC5 \uC774\uBC88 \uC8FC \uD559\uC0AC\uC77C\uC815\n\u2014\u2014\u2014\u2014\u2014\n\uD574\uB2F9 \uAE30\uAC04\uC5D0 \uD559\uC0AC\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
}).build());