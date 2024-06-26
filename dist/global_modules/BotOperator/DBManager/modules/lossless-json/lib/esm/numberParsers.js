"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.parseNumberAndBigInt = exports.parseLosslessNumber = void 0;
var LosslessNumber_js_1 = require("./LosslessNumber.js"),
  utils_js_1 = require("./utils.js");
function parseLosslessNumber(s) {
  return new LosslessNumber_js_1.LosslessNumber(s);
}
function parseNumberAndBigInt(s) {
  return (0, utils_js_1.isInteger)(s) ? BigInt(s) : parseFloat(s);
}
exports.parseLosslessNumber = parseLosslessNumber, exports.parseNumberAndBigInt = parseNumberAndBigInt;