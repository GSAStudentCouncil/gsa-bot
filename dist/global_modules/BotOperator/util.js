"use strict";

Array.prototype.flat || (Array.prototype.flat = function (t, r) {
  return r = this.concat.apply([], this), t > 1 && r.some(Array.isArray) ? r.flat(t - 1) : r;
}, Array.prototype.flatMap = function (t, r) {
  return this.map(t, r).flat();
});
String.prototype.replaceAll || (String.prototype.replaceAll = function (t, r) {
  return this.split(t).join(r);
});
var getJosa = function getJosa(str, josaPair) {
  var lastChar = str.charCodeAt(str.length - 1);
  var hasFinalConsonant = (lastChar - 44032) % 28 !== 0;
  var isFinalRieul = (lastChar - 44032) % 28 === 8;
  var josaMap = {
    '이가': hasFinalConsonant ? '이' : '가',
    '은는': hasFinalConsonant ? '은' : '는',
    '을를': hasFinalConsonant ? '을' : '를',
    '으로': hasFinalConsonant && !isFinalRieul ? '으로' : '로',
    '와과': hasFinalConsonant ? '과' : '와'
  };
  return str + josaMap[josaPair];
};
Object.defineProperties(String.prototype, {
  '이가': {
    get: function get() {
      return getJosa(this, '이가');
    }
  },
  '은는': {
    get: function get() {
      return getJosa(this, '은는');
    }
  },
  '을를': {
    get: function get() {
      return getJosa(this, '을를');
    }
  },
  '으로': {
    get: function get() {
      return getJosa(this, '으로');
    }
  },
  '와과': {
    get: function get() {
      return getJosa(this, '와과');
    }
  }
});
exports.isNumber = function (name) {
  return /^\d+$/.test(name);
};
exports.isNaN = function (n) {
  return Number.isNaN(n);
};
exports.compress = "\u200B".repeat(500);
exports.getJosa = getJosa;
exports.isValidChannel = function (channel) {
  return channel != null && channel.send != null;
};