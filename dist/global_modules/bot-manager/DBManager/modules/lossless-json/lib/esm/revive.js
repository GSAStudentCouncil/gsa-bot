"use strict";

function _typeof2(o) {
  "@babel/helpers - typeof";

  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof2(o);
}
function _typeof(e) {
  return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
    return _typeof2(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof2(e);
  }, _typeof(e);
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.revive = void 0;
var LosslessNumber_js_1 = require("./LosslessNumber.js");
function revive(e, r) {
  return reviveValue({
    "": e
  }, "", e, r);
}
function reviveValue(e, r, o, t) {
  return Array.isArray(o) ? t.call(e, r, reviveArray(o, t)) : o && "object" === _typeof(o) && !(0, LosslessNumber_js_1.isLosslessNumber)(o) ? t.call(e, r, reviveObject(o, t)) : t.call(e, r, o);
}
function reviveObject(e, r) {
  return Object.keys(e).forEach(function (o) {
    var t = reviveValue(e, o, e[o], r);
    void 0 !== t ? e[o] = t : delete e[o];
  }), e;
}
function reviveArray(e, r) {
  for (var o = 0; o < e.length; o++) e[o] = reviveValue(e, o + "", e[o], r);
  return e;
}
exports.revive = revive;