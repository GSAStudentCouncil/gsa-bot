"use strict";

function config(e) {
  throw new Error("config is deprecated, support for circularRefs is removed from the library. If you encounter circular references in your data structures, please rethink your datastructures: better prevent circular references in the first place.");
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.config = void 0, exports.config = config;