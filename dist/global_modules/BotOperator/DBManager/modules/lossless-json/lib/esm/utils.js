"use strict";

function isInteger(e) {
  return INTEGER_REGEX.test(e);
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.extractSignificantDigits = exports.toSafeNumberOrThrow = exports.getUnsafeNumberReason = exports.UnsafeNumberReason = exports.isSafeNumber = exports.isNumber = exports.isInteger = void 0, exports.isInteger = isInteger;
var INTEGER_REGEX = /^-?[0-9]+$/;
function isNumber(e) {
  return NUMBER_REGEX.test(e);
}
exports.isNumber = isNumber;
var NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
function isSafeNumber(e, r) {
  var t = parseFloat(e),
    n = String(t),
    a = extractSignificantDigits(e),
    o = extractSignificantDigits(n);
  if (a === o) return !0;
  if (!0 === (null == r ? void 0 : r.approx)) {
    if (!isInteger(e) && o.length >= 14 && a.startsWith(o.substring(0, 14))) return !0;
  }
  return !1;
}
function getUnsafeNumberReason(e) {
  if (!isSafeNumber(e, {
    approx: !1
  })) {
    if (isInteger(e)) return exports.UnsafeNumberReason.truncate_integer;
    var r = parseFloat(e);
    return isFinite(r) ? 0 === r ? exports.UnsafeNumberReason.underflow : exports.UnsafeNumberReason.truncate_float : exports.UnsafeNumberReason.overflow;
  }
}
function toSafeNumberOrThrow(e, r) {
  var t = parseFloat(e),
    n = getUnsafeNumberReason(e);
  if (!0 === (null == r ? void 0 : r.approx) ? n && n !== exports.UnsafeNumberReason.truncate_float : n) {
    var a = n.replace(/_\w+$/, "");
    throw new Error("Cannot safely convert to number: " + "the value '".concat(e, "' would ").concat(a, " and become ").concat(t));
  }
  return t;
}
function extractSignificantDigits(e) {
  return e.replace(EXPONENTIAL_PART_REGEX, "").replace(DOT_REGEX, "").replace(TRAILING_ZEROS_REGEX, "").replace(LEADING_MINUS_AND_ZEROS_REGEX, "");
}
exports.isSafeNumber = isSafeNumber, function (e) {
  e.underflow = "underflow", e.overflow = "overflow", e.truncate_integer = "truncate_integer", e.truncate_float = "truncate_float";
}(exports.UnsafeNumberReason || (exports.UnsafeNumberReason = {})), exports.getUnsafeNumberReason = getUnsafeNumberReason, exports.toSafeNumberOrThrow = toSafeNumberOrThrow, exports.extractSignificantDigits = extractSignificantDigits;
var EXPONENTIAL_PART_REGEX = /[eE][+-]?\d+$/,
  LEADING_MINUS_AND_ZEROS_REGEX = /^-?(0*)?/,
  DOT_REGEX = /\./,
  TRAILING_ZEROS_REGEX = /0+$/;