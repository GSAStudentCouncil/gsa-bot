"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var bot = BotManager.getCurrentBot();
var manager = require('DBManager').DBManager;
var app = manager.getInstance({});

var c2i = JSON.parse(FileStream.read("/sdcard/msgbot/channels.json") || "{}").c2i;
var kinds = ["학생회", "생체부", "환경부", "통계부", "문예부", "체육부", "홍보부", "정책부", "정보부", "총무부"];

app.on("message", function (chat, channel) {
    if (!["공지방"].includes(channel.name)) return;

    // TODO: 이거 다시 편하게 답장 아닌걸로

    var _chat$source$text$tri = chat.source.text.trim().replace(/ {2,}/g, ' ').split(" "),
        _chat$source$text$tri2 = _slicedToArray(_chat$source$text$tri, 5),
        kind = _chat$source$text$tri2[0],
        cmdName = _chat$source$text$tri2[1],
        n1 = _chat$source$text$tri2[2],
        n2 = _chat$source$text$tri2[3],
        n3 = _chat$source$text$tri2[4];

    var nths = [n1, n2, n3].filter(function (n) {
        return n !== undefined && /\d+/.test(n);
    }); // 입력한 기수만 거르기
    if (nths.length === 0) {
        // 아무 기수도 특정하지 않으면 전체 기수를 가리킴
        var max = Math.max.apply(null, Object.keys(c2i).filter(function (x) {
            return (/\d+/.test(x)
            );
        }).map(Number));
        nths = [max - 2, max - 1, max].map(String);
    }

    if (kinds.includes(kind) && cmdName === "알림") {
        var _loop = function _loop(i, nth) {
            if (c2i[nth] === undefined) {
                channel.send(nth + " 에 전송 실패하였습니다.\n" + "\"" + nth + "\" 채널이 존재하지 않습니다.");
                return {
                    v: void 0
                };
            }

            var idChannel = manager.getChannelById(c2i[String(nth)]);
            idChannel.send('🔔 ' + kind + '\n─────\n' + chat.text).then(function (_) {
                return channel.send(idChannel.name + " 에 전송하였습니다.");
            }, function (e) {
                return channel.send(idChannel.name + " 에 전송 실패하였습니다.\n" + e.toString());
            });
        };

        for (var i = 0, nth = nths[i]; i < nths.length; i++) {
            var _ret = _loop(i, nth);

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }
});

app.start();
bot.addListener(Event.NOTIFICATION_POSTED, function (sbn, rm) {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, function () {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});

