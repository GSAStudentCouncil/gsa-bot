"use strict";

function reviveDate(e, t) {
  return "string" == typeof t && isoDateRegex.test(t) ? new Date(t) : t;
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.reviveDate = void 0, exports.reviveDate = reviveDate;
var isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;