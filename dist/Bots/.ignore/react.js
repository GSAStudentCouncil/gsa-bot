"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var manager = require('DBManager').DBManager;
var _require = require('kakao-react'),
  ReactClient = _require.ReactClient,
  ReactionType = _require.ReactionType;
var client = ReactClient.create({
  accessToken: '3abf56a9e5ef90b38a61001720643dbf',
  deviceUUID: '55be5c17869d5085' // adb shell settings get secure android_id
});
var app = manager.getInstance({});
app.on("message", function (chat, channel) {
  var _chat$text$trim$split = chat.text.trim().split(' '),
    _chat$text$trim$split2 = _slicedToArray(_chat$text$trim$split, 2),
    command = _chat$text$trim$split2[0],
    type = _chat$text$trim$split2[1];
  if (command === "반응") {
    if (type === undefined || isNaN(Number(type)) || type < 0 || type > 6) {
      channel.send("반응 [타입]\nCANCEL: 0\nHEART: 1\nLIKE: 2\nCHECK: 3\nLAUGH: 4\nSURPRISE: 5\nSAD: 6");
      return;
    }
    client.react(channel.id, chat.id, type);
  }
});
app.start();