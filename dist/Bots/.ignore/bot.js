"use strict";

var _templateObject;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var manager = require('../modules/DBManager').DBManager;
var cronjob = require('../modules/cronJob').CronJob;
var _require = require('../../../datetime/src'),
  DateTime = _require.DateTime;
var _require2 = require('../modules/command-handler'),
  CommandRegistry = _require2.CommandRegistry,
  NaturalCommand = _require2.NaturalCommand,
  StructuredCommand = _require2.StructuredCommand;
var app = manager.getInstance({});
FileStream.writeObject = function (path, data) {
  return FileStream.write(path, JSON.stringify(data));
};
FileStream.readObject = function (path) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var read = FileStream.read(path);
  return read == null ? offset : JSON.parse(read);
};
var paths = {
  users: "/sdcard/msgbot/users.json",
  channels: "/sdcard/msgbot/channels.json"
};
var db = {
  users: FileStream.readObject(paths.users),
  channels: FileStream.readObject(paths.channels, {
    i2c: {},
    c2i: {}
  }),
  userReload: function userReload(user, channel) {
    db.users[user.id] = {
      name: user.name,
      channelId: channel.id
    };
  },
  channelReload: function channelReload(channel) {
    db.channels.i2c[channel.id] = channel.name;
    db.channels.c2i[channel.name] = channel.id;
  }
};
var students_room = {};
var channels = {};
for (var name in db.channels.c2i) {
  if (/^\d+$/.test(name))
    // 채널명이 '39', '40' 과 같은 경우
    students_room[Number(name)] = manager.getChannelById(db.channels.c2i[name]);
  channels[name] = manager.getChannelById(db.channels.c2i[name]);
}
var lazyArguments = [];
app.start();
cronjob.setWakeLock(true);
app.on('message', function (chat, channel) {
  chat.isPhoto();
});
app.on('message', function (chat, channel) {
  CommandRegistry.run(chat, channel);

  // 지연 명령어 실행 처리
  if (lazyArguments.length !== 0) {
    var _lazyArguments = lazyArguments,
      _lazyArguments2 = _slicedToArray(_lazyArguments, 4),
      prevChat = _lazyArguments2[0],
      prevChannel = _lazyArguments2[1],
      _args = _lazyArguments2[2],
      _cmd = _lazyArguments2[3];
    if (chat.user.id === prevChat.user.id && channel.id === prevChannel.id) {
      _cmd.execute(chat, channel, _args, _cmd, prevChat, prevChannel);
      lazyArguments = [];
      return;
    }
  }
  var _CommandRegistry$get = CommandRegistry.get(chat, channel),
    cmd = _CommandRegistry$get.cmd,
    args = _CommandRegistry$get.args;
  if (cmd !== null) {
    // 지연 명령어 처리
    if (cmd.name === '학생회 공지') {
      if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
        channel.send("학생회 종류가 잘못되었습니다.");
        return;
      }
      lazyArguments = [chat, channel, args, cmd];
      channel.send("".concat(chat.user.name, "\uB2D8, ").concat(args.부서, " \uACF5\uC9C0\uAE00\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694. \uCDE8\uC18C\uD558\uB824\uBA74 \"\uCDE8\uC18C\"\uB97C \uC785\uB825\uD558\uC138\uC694."));
    } else cmd.execute(chat, channel, args, cmd);
  }

  // 채널이 없으면 추가하고, 이름이나 아이디가 달라지면 업데이트. 채널의 멤버도 업데이트.
  if (!(channel.id in db.channels.i2c) || !(channel.name in db.channels.c2i) || !(db.channels.i2c[channel.id] === channel.name && db.channels.c2i[channel.name] === channel.id)) {
    db.channelReload(channel);
    FileStream.writeObject(paths.channels, db.channels);
    channel.members.forEach(function (user) {
      return db.userReload(user, channel);
    });
    FileStream.writeObject(paths.users, db.users);
  }

  // 유저가 없으면 추가하고, 이름이나 채널이 달라지면 업데이트.
  if (!(chat.user.id in db.users) || !(db.users[chat.user.id].name === chat.user.name && db.users[chat.user.id].channelId === channel.id)) {
    db.userReload(chat.user, channel);
    FileStream.writeObject(paths.users, db.users);
  }
});

////////////////////// 도움말 //////////////////////

StructuredCommand.add({
  name: '도움말',
  description: '명령어들의 도움말을 표시합니다.',
  usage: '도움말 <명령어:string[]?>',
  examples: ['도움말', '도움말 급식', '도움말 공지'],
  execute: function execute(chat, channel, args, self) {
    args.명령어 = (args.명령어 || []).join(' ');
    if (args.명령어 === '' || !(args.명령어 in CommandRegistry.data)) {
      var ret = ['📦 명령어 목록', '——————'];
      CommandRegistry.loop(function (cmd) {
        if (cmd.name !== '도움말') ret.push("\xB7 ".concat(cmd.name));
      });
      ret.push('');
      ret.push('세부 도움말을 보고 싶은 경우, "도움말 <명령어>"를 입력하세요.');
      channel.send(ret.join('\n'));
    } else {
      var found = CommandRegistry.data[args.명령어];
      channel.send(found.manual());
    }
  }
});

////////////////////// 급식 //////////////////////

function web(string, options) {
  return JSON.parse(org.jsoup.Jsoup.connect(string[0].concat(options.map(function (option) {
    return option.join("=");
  }).join("&"))).get().text());
}

/** @param {DateTime} date */
var getMeals = function getMeals(date) {
  var options = [["ATPT_OFCDC_SC_CODE", "F10"], ["SD_SCHUL_CODE", 7380031], ["MLSV_YMD", '240110'],
  // FIXME: date.toString('YYMMDD')
  ["Type", "json"]];
  var data = web(_templateObject || (_templateObject = _taggedTemplateLiteral(["https://open.neis.go.kr/hub/mealServiceDietInfo?", ""])), options);
  return [0, 1, 2].map(function (i) {
    return data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"].replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim();
  });
};
var mealCronjob = function mealCronjob(time) {
  var date = DateTime.today();
  var meal;
  if (time === "오늘") {
    var meals = getMeals(date);
    meal = "[\uC544\uCE68]\n".concat(meals[0], "\n\n[\uC810\uC2EC]\n").concat(meals[1], "\n\n[\uC800\uB141]\n").concat(meals[2]);
  } else if (time === "아침" || time === "점심" || time === "저녁") meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(time)];else return;
  for (var 기수 in students_room) {
    students_room[기수].send("\uD83C\uDF5A \uC624\uB298 ".concat(time, " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meal));
  }
};
cronjob.add("0 0 * * *", function () {
  return mealCronjob("오늘");
});
cronjob.add("40 11 * * *", function () {
  return mealCronjob("점심");
});
cronjob.add("20 16 * * *", function () {
  return mealCronjob("저녁");
});
NaturalCommand.add({
  name: '급식',
  description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
  query: {
    '날짜': '오늘',
    '시간': function 시간() {
      var dt = DateTime.now();
      if (dt.lt({
        hour: 8,
        minute: 30
      })) return "아침";else if (dt.lt({
        hour: 13,
        minute: 30
      })) return "점심";else if (dt.lt({
        hour: 19,
        minute: 30
      })) return "저녁";else return "아침";
    },
    '대상': ['급식']
  },
  examples: ['오늘 밥', '오늘 급식', '내일 식사', '내일 저녁 식사', '모레 점심 밥'],
  execute: function execute(chat, channel, args, self) {
    var date = DateTime.parse(args.날짜).set(DateTime.today().시간);
    var meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(args.시간)];
    channel.send("\uD83C\uDF5A ".concat(args.날짜, " ").concat(args.시간, " \uAE09\uC2DD\n\u2014\u2014\u2014\u2014\u2014\n").concat(meal));
  }
});

////////////////////// 공지 //////////////////////

StructuredCommand.add({
  name: '공지',
  description: "학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n명령어를 작성한 뒤, 다음 메시지 내용을 공지 메시지로 처리합니다.",
  usage: "<부서:string length=3> 알림 <기수:int[]? min=39>",
  channels: [channels['공지방']],
  examples: ['생체부 알림\n기숙사 3월 기상곡입니다 ...', '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'],
  execute: function execute(chat, channel, args, self, prevChat, prevChannel) {
    if (chat.content === '취소') {
      channel.send('공지 전송이 취소되었습니다.');
      return;
    }
    if (args.기수.length === 0) {
      var max = Math.max.apply(Math, _toConsumableArray(Object.keys(students_room)));
      args.기수 = [max - 2, max - 1, max];
    }
    var _iterator = _createForOfIteratorHelper(args.기수),
      _step;
    try {
      var _loop = function _loop() {
          var 기수 = _step.value;
          if (!(기수 in students_room)) {
            channel.send("".concat(기수, " \uC5D0 \uC804\uC1A1 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4.\n\"").concat(기수, "\" \uCC44\uB110\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
            return {
              v: void 0
            };
          }
          students_room[기수].send("\uD83D\uDD14 ".concat(args.부서, "\n\u2014\u2014\u2014\u2014\u2014\n").concat(chat.text)).then(function (_) {
            return channel.send("".concat(기수, " \uC5D0 \uC804\uC1A1\uD558\uC600\uC2B5\uB2C8\uB2E4."));
          }, function (e) {
            return channel.send("".concat(기수, " \uC5D0 \uC804\uC1A1 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4.\n").concat(e.toString()));
          });
        },
        _ret;
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
});