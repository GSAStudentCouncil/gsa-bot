"use strict";

function _typeof2(o) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof2(o); }
function _typeof(e) {
  return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function (e) {
    return _typeof2(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof2(e);
  }, _typeof(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var o = t[r];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, t, r) {
  return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function _toPropertyKey(e) {
  var t = _toPrimitive(e, "string");
  return "symbol" === _typeof(t) ? t : String(t);
}
function _toPrimitive(e, t) {
  if ("object" !== _typeof(e) || null === e) return e;
  var r = e[Symbol.toPrimitive];
  if (void 0 !== r) {
    var o = r.call(e, t || "default");
    if ("object" !== _typeof(o)) return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === t ? String : Number)(e);
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.toLosslessNumber = exports.isLosslessNumber = exports.LosslessNumber = void 0;
var utils_js_1 = require("./utils.js");
function isLosslessNumber(e) {
  return e && "object" === _typeof(e) && !0 === e.isLosslessNumber || !1;
}
function toLosslessNumber(e) {
  if ((0, utils_js_1.extractSignificantDigits)(e + "").length > 15) throw new Error("Invalid number: contains more than 15 digits and is most likely truncated and unsafe by itself " + "(value: ".concat(e, ")"));
  if (isNaN(e)) throw new Error("Invalid number: NaN");
  if (!isFinite(e)) throw new Error("Invalid number: " + e);
  return new exports.LosslessNumber(String(e));
}
exports.LosslessNumber = function () {
  function e(t) {
    if (_classCallCheck(this, e), _defineProperty(this, "isLosslessNumber", !0), !(0, utils_js_1.isNumber)(t)) throw new Error('Invalid number (value: "' + t + '")');
    this.value = t;
  }
  return _createClass(e, [{
    key: "valueOf",
    value: function value() {
      var e = (0, utils_js_1.getUnsafeNumberReason)(this.value);
      if (void 0 === e || e === utils_js_1.UnsafeNumberReason.truncate_float) return parseFloat(this.value);
      if ((0, utils_js_1.isInteger)(this.value)) return BigInt(this.value);
      throw new Error("Cannot safely convert to number: " + "the value '".concat(this.value, "' would ").concat(e, " and become ").concat(parseFloat(this.value)));
    }
  }, {
    key: "toString",
    value: function value() {
      return this.value;
    }
  }]), e;
}(), exports.isLosslessNumber = isLosslessNumber, exports.toLosslessNumber = toLosslessNumber;