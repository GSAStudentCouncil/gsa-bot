"use strict";

var _templateObject;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var bot = BotManager.getCurrentBot();
var manager = require('DBManager').DBManager;
var cronjob = require('cronJob').CronJob;
var _require = require('datetime'),
  datetime = _require.datetime;
var _require2 = require('command-handler'),
  CommandRegistry = _require2.CommandRegistry,
  NaturalCommand = _require2.NaturalCommand,
  StructuredCommand = _require2.StructuredCommand;
FileStream.writeObject = function (path, data) {
  return FileStream.write(path, JSON.stringify(data));
};
FileStream.readObject = function (path) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var read = FileStream.read(path);
  return read == null ? offset : JSON.parse(read);
};
var app = manager.getInstance({});
var paths = {
  users: "/sdcard/msgbot/users.json",
  channels: "/sdcard/msgbot/channels.json"
};
var DB = {
  users: FileStream.readObject(paths.users),
  channels: FileStream.readObject(paths.channels, {
    i2c: {},
    c2i: {}
  }),
  userReload: function userReload(user, channel) {
    DB.users[user.id] = {
      name: user.name,
      channelId: channel.id
    };
  },
  channelReload: function channelReload(channel) {
    DB.channels.i2c[channel.id] = channel.name;
    DB.channels.c2i[channel.name] = channel.id;
  }
};
var lazyArguments = [];
app.start();
cronjob.setWakeLock(true);
app.on('message', function (chat, channel) {
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
  if (chat.text.startsWith('도움말')) {
    var subcommand = chat.text.substring(3).trim();
    var found = null;
    var _iterator = _createForOfIteratorHelper(CommandRegistry.data),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _cmd2 = _step.value;
        if (subcommand === _cmd2.name) {
          found = _cmd2;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (found == null) channel.send("[\uC138\uBD80 \uB3C4\uC6C0\uB9D0]\n".concat(CommandRegistry.data.map(function (d) {
      return "\uB3C4\uC6C0\uB9D0 ".concat(d.name);
    }).join('\n')));else channel.send(found.manual());
    return;
  }
  var _CommandRegistry$get = CommandRegistry.get(chat.text, channel.id),
    cmd = _CommandRegistry$get.cmd,
    args = _CommandRegistry$get.args;
  if (cmd !== null) {
    if (cmd.name === '학생회 공지') {
      lazyArguments = [chat, channel, args, cmd];
      channel.send("".concat(chat.user.name, "\uB2D8, ").concat(args.부서, " \uACF5\uC9C0\uAE00\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694."));
    } else cmd.execute(chat, channel, args, cmd);
  }
  if (!(channel.id in DB.channels.i2c) || !(channel.name in DB.channels.c2i) || !(DB.channels.i2c[channel.id] === channel.name && DB.channels.c2i[channel.name] === channel.id)) {
    DB.channelReload(channel);
    FileStream.writeObject(paths.channels, DB.channels);
    channel.members.forEach(function (user) {
      return DB.userReload(user, channel);
    });
    FileStream.writeObject(paths.users, DB.users);
  }
  if (!(chat.user.id in DB.users) || !(DB.users[chat.user.id].name === chat.user.name && DB.users[chat.user.id].channelId === channel.id)) {
    DB.userReload(chat.user, channel);
    FileStream.writeObject(paths.users, DB.users);
  }
});

////////////////////// 급식 알리미 //////////////////////

function web(string, options) {
  return JSON.parse(org.jsoup.Jsoup.connect(string[0].concat(options.map(function (option) {
    return option.join("=");
  }).join("&"))).get().text());
}

/** @param {datetime} date */
var getMeals = function getMeals(date) {
  var options = [["ATPT_OFCDC_SC_CODE", "F10"], ["SD_SCHUL_CODE", 7380031], ["MLSV_YMD", '240110'], ["Type", "json"]];
  var data = web(_templateObject || (_templateObject = _taggedTemplateLiteral(["https://open.neis.go.kr/hub/mealServiceDietInfo?", ""])), options);
  return [0, 1, 2].map(function (i) {
    return data["mealServiceDietInfo"][1]["row"][i]["DDISH_NM"].replace(/\(\d+(?:.\d+)*\)/g, "").replace(/ +/g, "\n").trim();
  });
};
var mealCronjob = function mealCronjob(time) {
  var date = datetime.today();
  var meal;
  if (time === "오늘") {
    var meals = getMeals(date);
    meal = "[\uC544\uCE68]\n".concat(meals[0], "\n\n[\uC810\uC2EC]\n").concat(meals[1], "\n\n[\uC800\uB141]\n").concat(meals[2]);
  } else if (time === "아침" || time === "점심" || time === "저녁") meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(time)];else return;
  for (var id in DB.channels.i2c) {
    var channel = manager.getChannelById(id);
    channel.send("\uD83C\uDF5A ".concat(time, " \uAE09\uC2DD\n\u2500\u2500\u2500\u2500\u2500\n").concat(meal));
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
  name: '급식 알리미',
  description: "급식을 안내합니다. 날짜와 시간대, '식사'를 지칭하는 단어를 포함한 메시지를 보내면 호출됩니다.\n날짜는 생략할 시 '오늘'로 처리됩니다.",
  query: {
    'date': '오늘',
    'time': function time() {
      var dt = datetime.now();
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
    'what': {
      '급식': null
    }
  },
  examples: ['오늘 밥', '오늘 급식', '내일 식사', '내일 저녁 식사', '모레 점심 밥'],
  execute: function execute(chat, channel, args, self) {
    var date = datetime.parse(args.date).set(datetime.today().time);
    var meal = getMeals(date)[["아침", "점심", "저녁"].indexOf(args.time)];
    channel.send("\uD83C\uDF5A ".concat(args.date, " ").concat(args.time, " \uAE09\uC2DD\n\u2500\u2500\u2500\u2500\u2500\n").concat(meal));
  }
});

////////////////////// 학생회 공지 //////////////////////

StructuredCommand.add({
  name: '학생회 공지',
  description: "학생회 공지를 전송합니다. 기수를 지정하지 않으면 최신 기수 톡방에 전송됩니다.\n명령어를 작성한 뒤, 다음 메시지 내용을 공지 메시지로 처리합니다.",
  usage: "<부서:string length=3> 알림 <기수:ints0 min=39>",
  rooms: [DB.channels.c2i['공지방']],
  examples: ['생체부 알림\n기숙사 3월 기상곡입니다 ...', '정책부 알림 39\n정책부에서 야간자율학습 휴대폰 사용 자유 관련 문의를 ...'],
  execute: function execute(chat, channel, args, self, prevChat, prevChannel) {
    if (!["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"].includes(args.부서)) {
      channel.send("학생회 종류가 잘못되었습니다.");
      return;
    }
    if (args.기수.length === 0) {
      var max = Math.max.apply(Math, _toConsumableArray(Object.keys(DB.channels.c2i).filter(function (x) {
        return /\d+/.test(x);
      }).map(Number)));
      args.기수 = [max - 2, max - 1, max];
    }
    var _iterator2 = _createForOfIteratorHelper(args.기수),
      _step2;
    try {
      var _loop = function _loop() {
          var n = _step2.value;
          n = String(n);
          if (!(n in DB.channels.c2i)) {
            channel.send("".concat(n, " \uC5D0 \uC804\uC1A1 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4.\n\"").concat(n, "\" \uCC44\uB110\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."));
            return {
              v: void 0
            };
          }
          var idChannel = manager.getChannelById(DB.channels.c2i[n]);
          idChannel.send("\uD83D\uDD14 ".concat(args.부서, "\n\u2500\u2500\u2500\u2500\u2500\n").concat(chat.text)).then(function (_) {
            return channel.send("".concat(idChannel.name, " \uC5D0 \uC804\uC1A1\uD558\uC600\uC2B5\uB2C8\uB2E4."));
          }, function (e) {
            return channel.send("".concat(idChannel.name, " \uC5D0 \uC804\uC1A1 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4.\n").concat(e.toString()));
          });
        },
        _ret;
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
});
bot.addListener(Event.NOTIFICATION_POSTED, function (sbn, rm) {
  app.addChannel(sbn);
});
bot.addListener(Event.START_COMPILE, function () {
  app.stop();
  cronjob.setWakeLock(false);
  cronjob.off();
});

