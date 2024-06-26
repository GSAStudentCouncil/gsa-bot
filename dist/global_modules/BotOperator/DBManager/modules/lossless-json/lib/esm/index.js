"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (e, r, s, t) {
    void 0 === t && (t = s);
    var n = Object.getOwnPropertyDescriptor(r, s);
    n && !("get" in n ? !r.__esModule : n.writable || n.configurable) || (n = {
      enumerable: !0,
      get: function get() {
        return r[s];
      }
    }), Object.defineProperty(e, t, n);
  } : function (e, r, s, t) {
    void 0 === t && (t = s), e[t] = r[s];
  }),
  __exportStar = void 0 && (void 0).__exportStar || function (e, r) {
    for (var s in e) "default" === s || Object.prototype.hasOwnProperty.call(r, s) || __createBinding(r, e, s);
  };
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getUnsafeNumberReason = exports.toSafeNumberOrThrow = exports.isSafeNumber = exports.isNumber = exports.isInteger = exports.UnsafeNumberReason = exports.parseNumberAndBigInt = exports.parseLosslessNumber = exports.reviveDate = exports.toLosslessNumber = exports.isLosslessNumber = exports.LosslessNumber = exports.stringify = exports.parse = exports.config = void 0;
var config_js_1 = require("./config.js");
Object.defineProperty(exports, "config", {
  enumerable: !0,
  get: function get() {
    return config_js_1.config;
  }
});
var parse_js_1 = require("./parse.js");
Object.defineProperty(exports, "parse", {
  enumerable: !0,
  get: function get() {
    return parse_js_1.parse;
  }
});
var stringify_js_1 = require("./stringify.js");
Object.defineProperty(exports, "stringify", {
  enumerable: !0,
  get: function get() {
    return stringify_js_1.stringify;
  }
});
var LosslessNumber_js_1 = require("./LosslessNumber.js");
Object.defineProperty(exports, "LosslessNumber", {
  enumerable: !0,
  get: function get() {
    return LosslessNumber_js_1.LosslessNumber;
  }
}), Object.defineProperty(exports, "isLosslessNumber", {
  enumerable: !0,
  get: function get() {
    return LosslessNumber_js_1.isLosslessNumber;
  }
}), Object.defineProperty(exports, "toLosslessNumber", {
  enumerable: !0,
  get: function get() {
    return LosslessNumber_js_1.toLosslessNumber;
  }
});
var reviveDate_js_1 = require("./reviveDate.js");
Object.defineProperty(exports, "reviveDate", {
  enumerable: !0,
  get: function get() {
    return reviveDate_js_1.reviveDate;
  }
});
var numberParsers_js_1 = require("./numberParsers.js");
Object.defineProperty(exports, "parseLosslessNumber", {
  enumerable: !0,
  get: function get() {
    return numberParsers_js_1.parseLosslessNumber;
  }
}), Object.defineProperty(exports, "parseNumberAndBigInt", {
  enumerable: !0,
  get: function get() {
    return numberParsers_js_1.parseNumberAndBigInt;
  }
});
var utils_js_1 = require("./utils.js");
Object.defineProperty(exports, "UnsafeNumberReason", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.UnsafeNumberReason;
  }
}), Object.defineProperty(exports, "isInteger", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.isInteger;
  }
}), Object.defineProperty(exports, "isNumber", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.isNumber;
  }
}), Object.defineProperty(exports, "isSafeNumber", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.isSafeNumber;
  }
}), Object.defineProperty(exports, "toSafeNumberOrThrow", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.toSafeNumberOrThrow;
  }
}), Object.defineProperty(exports, "getUnsafeNumberReason", {
  enumerable: !0,
  get: function get() {
    return utils_js_1.getUnsafeNumberReason;
  }
}), __exportStar(require("./types.js"), exports);