"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      return /\d+/.test(x);
    }).map(Number));
    nths = [max - 2, max - 1, max].map(String);
  }
  if (kinds.includes(kind) && cmdName === "알림") {
    var _loop = function _loop() {
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
      },
      _ret;
    for (var i = 0, nth = nths[i]; i < nths.length; i++) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  }
});
app.start();