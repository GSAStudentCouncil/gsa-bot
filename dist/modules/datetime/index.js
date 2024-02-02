"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IS_DIST = true;
var duration = /*#__PURE__*/function () {
  function duration(millisecond) {
    _classCallCheck(this, duration);
    this._amount = millisecond;
  }
  _createClass(duration, [{
    key: "amount",
    get: function get() {
      return this._amount;
    },
    set: function set(value) {
      this._amount = value;
    }
  }, {
    key: "millisecond",
    get: function get() {
      return this.amount % 1000;
    }
  }, {
    key: "second",
    get: function get() {
      return Math.floor(this.amount / 1000) % 86400;
    }
  }, {
    key: "day",
    get: function get() {
      return Math.floor(this.amount / 86400000);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "duration(day=".concat(this.day, ", second=").concat(this.second, ", millisecond=").concat(this.millisecond, ")");
    }
  }]);
  return duration;
}();
var date = /*#__PURE__*/function () {
  function date(year, month, day) {
    _classCallCheck(this, date);
    this._source = new Date(year, month - 1, day);
  }
  _createClass(date, [{
    key: "year",
    get: function get() {
      return this._source.getFullYear();
    }
  }, {
    key: "month",
    get: function get() {
      return this._source.getMonth() + 1;
    }
  }, {
    key: "day",
    get: function get() {
      return this._source.getDate();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "date(year=".concat(this.year, ", month=").concat(this.month, ", day=").concat(this.day, ")");
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        year: this.year,
        month: this.month,
        day: this.day
      };
    }
  }]);
  return date;
}();
var time = /*#__PURE__*/function () {
  function time(hour, minute, second, millisecond) {
    _classCallCheck(this, time);
    this._source = new Date();
    this._source.setHours(hour);
    this._source.setMinutes(minute);
    this._source.setSeconds(second);
    this._source.setMilliseconds(millisecond);
  }
  _createClass(time, [{
    key: "hour",
    get: function get() {
      return this._source.getHours();
    }
  }, {
    key: "minute",
    get: function get() {
      return this._source.getMinutes();
    }
  }, {
    key: "second",
    get: function get() {
      return this._source.getSeconds();
    }
  }, {
    key: "millisecond",
    get: function get() {
      return this._source.getMilliseconds();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "time(hour=".concat(this.hour, ", minute=").concat(this.minute, ", second=").concat(this.second, ", millisecond=").concat(this.millisecond, ")");
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        millisecond: this.millisecond
      };
    }
  }]);
  return time;
}();
var datetime = /*#__PURE__*/function () {
  function datetime(datetimeObject, locale) {
    _classCallCheck(this, datetime);
    this._source;
    this._locale = locale || 'ko-KR';
    if (datetimeObject instanceof datetime) {
      this._source = datetimeObject._source;
      this._locale = datetimeObject._locale;
    } else if (datetimeObject instanceof Date) {
      this._source = datetimeObject;
    } else if (typeof datetimeObject === 'number') {
      this._source = new Date(datetimeObject);
    } else if (datetimeObject.constructor.name === 'Object') {
      var now = new Date();
      var year = datetimeObject.year || now.getFullYear();
      var month = datetimeObject.month || now.getMonth() + 1;
      var day = datetimeObject.day || now.getDate();
      var hour = datetimeObject.hour || now.getHours();
      var minute = datetimeObject.minute || now.getMinutes();
      var second = datetimeObject.second || now.getSeconds();
      var millisecond = datetimeObject.millisecond || now.getMilliseconds();
      this._source = new Date(year, month - 1, day, hour, minute, second, millisecond);
    }
  }
  _createClass(datetime, [{
    key: "date",
    get: function get() {
      return new date(this._source.getFullYear(), this._source.getMonth() + 1, this._source.getDate());
    },
    set: function set(dateObject) {
      if (!(dateObject instanceof date)) throw new TypeError('`date` must be date');
      this._source.setFullYear(dateObject.year || this._source.getFullYear());
      this._source.setMonth(dateObject.month - 1 || this._source.getMonth());
      this._source.setDate(dateObject.day || this._source.getDate());
    }
  }, {
    key: "time",
    get: function get() {
      return new time(this._source.getHours(), this._source.getMinutes(), this._source.getSeconds(), this._source.getMilliseconds());
    },
    set: function set(timeObject) {
      if (!(timeObject instanceof time)) throw new TypeError('`time` must be time');
      this._source.setHours(timeObject.hour || this._source.getHours());
      this._source.setMinutes(timeObject.minute || this._source.getMinutes());
      this._source.setSeconds(timeObject.second || this._source.getSeconds());
      this._source.setMilliseconds(timeObject.millisecond || this._source.getMilliseconds());
    }
  }, {
    key: "year",
    get: function get() {
      return this._source.getFullYear();
    },
    set: function set(value) {
      this._source.setFullYear(value);
    }
  }, {
    key: "month",
    get: function get() {
      return this._source.getMonth() + 1;
    },
    set: function set(value) {
      this._source.setMonth(value - 1);
    }
  }, {
    key: "day",
    get: function get() {
      return this._source.getDate();
    },
    set: function set(value) {
      this._source.setDate(value);
    }
  }, {
    key: "weekday",
    get: function get() {
      return this._source.getDay();
    }
  }, {
    key: "weekdayName",
    get: function get() {
      return this.toString('WW');
    }
  }, {
    key: "hour",
    get: function get() {
      return this._source.getHours();
    },
    set: function set(value) {
      this._source.setHours(value);
    }
  }, {
    key: "minute",
    get: function get() {
      return this._source.getMinutes();
    },
    set: function set(value) {
      this._source.setMinutes(value);
    }
  }, {
    key: "second",
    get: function get() {
      return this._source.getSeconds();
    },
    set: function set(value) {
      this._source.setSeconds(value);
    }
  }, {
    key: "millisecond",
    get: function get() {
      return this._source.getMilliseconds();
    },
    set: function set(value) {
      this._source.setMilliseconds(value);
    }
  }, {
    key: "locale",
    get: function get() {
      return this._locale;
    },
    set: function set(value) {
      this._locale = value;
    }
  }, {
    key: "timestamp",
    value: function timestamp() {
      return this._source.getTime();
    }
  }, {
    key: "toString",
    value: function toString(formatString) {
      var _this = this;
      var cultureInfo;
      if (IS_DIST) cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + this.locale + ".json")); // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
      else cultureInfo = require('./globalization/' + this.locale + '.json');
      if (!cultureInfo) throw new Error('Invalid locale, not found ' + this.locale);
      formatString = formatString || cultureInfo['formats']['full'];
      return formatString.replace(/ss?s?|mm?|hh?|ii?|t|DD?|WW?|MM?M?M?|YY(?:YY)?/g, function (match) {
        switch (match) {
          case 's':
            return _this.second;
          case 'ss':
            return _this.second.toString().padStart(2, '0');
          case 'sss':
            return _this.millisecond;
          case 'm':
            return _this.minute;
          case 'mm':
            return _this.minute.toString().padStart(2, '0');
          case 'h':
            return _this.hour === 12 ? 12 : _this.hour % 12;
          case 'hh':
            return (_this.hour === 12 ? 12 : _this.hour % 12).toString().padStart(2, '0');
          case 'i':
            return _this.hour;
          case 'ii':
            return _this.hour.toString().padStart(2, '0');
          case 't':
            return cultureInfo['t'][_this.hour < 12 ? 0 : 1];
          case 'D':
            return _this.day;
          case 'DD':
            return _this.day.toString().padStart(2, '0');
          case 'W':
            return cultureInfo['W'][_this.weekday];
          case 'WW':
            return cultureInfo['WW'][_this.weekday];
          case 'M':
            return _this.month;
          case 'MM':
            return _this.month.toString().padStart(2, '0');
          case 'MMM':
            return cultureInfo['MMM'][_this.month - 1];
          case 'MMMM':
            return cultureInfo['MMMM'][_this.month - 1];
          case 'YY':
            return _this.year % 100;
          case 'YYYY':
            return _this.year;
          default:
            throw new Error("unknown format ".concat(match));
        }
      });
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.timestamp();
    }
  }, {
    key: "toDate",
    value: function toDate() {
      return this._source;
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        year: this.year,
        month: this.month,
        day: this.day,
        weekday: this.weekday,
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        millisecond: this.millisecond
      };
    }
  }, {
    key: "add",
    value: function add(datetimeObject) {
      if (datetimeObject instanceof datetime) return new datetime(new Date(this.timestamp() + datetimeObject.timestamp()), this.locale);else if (datetimeObject instanceof duration) {
        var dt = this.toDate();
        dt.setMilliseconds(dt.getMilliseconds() + datetimeObject.amount);
        return new datetime(dt, this.locale);
      } else {
        var _dt = this.toDate();
        _dt.setFullYear(_dt.getFullYear() + (datetimeObject.year || 0));
        _dt.setMonth(_dt.getMonth() + (datetimeObject.month || 0));
        _dt.setDate(_dt.getDate() + (datetimeObject.day || 0));
        _dt.setDate(_dt.getDate() + 7 * (datetimeObject.week || 0));
        _dt.setHours(_dt.getHours() + (datetimeObject.hour || 0));
        _dt.setMinutes(_dt.getMinutes() + (datetimeObject.minute || 0));
        _dt.setSeconds(_dt.getSeconds() + (datetimeObject.second || 0));
        _dt.setMilliseconds(_dt.getMilliseconds() + (datetimeObject.millisecond || 0));
        return new datetime(_dt, this.locale);
      }
    }
  }, {
    key: "sub",
    value: function sub(datetimeObject) {
      if (datetimeObject instanceof datetime) return new duration(this.timestamp() - datetimeObject.timestamp());else if (datetimeObject instanceof duration) {
        var dt = this.toDate();
        dt.setMilliseconds(dt.getMilliseconds() - datetimeObject.amount);
        return new datetime(dt, this.locale);
      } else {
        var _dt2 = this.toDate();
        _dt2.setFullYear(_dt2.getFullYear() - (datetimeObject.year || 0));
        _dt2.setMonth(_dt2.getMonth() - (datetimeObject.month || 0));
        _dt2.setDate(_dt2.getDate() - (datetimeObject.day || 0));
        _dt2.setDate(_dt2.getDate() - 7 * (datetimeObject.week || 0));
        _dt2.setHours(_dt2.getHours() - (datetimeObject.hour || 0));
        _dt2.setMinutes(_dt2.getMinutes() - (datetimeObject.minute || 0));
        _dt2.setSeconds(_dt2.getSeconds() - (datetimeObject.second || 0));
        _dt2.setMilliseconds(_dt2.getMilliseconds() - (datetimeObject.millisecond || 0));
        return new datetime(_dt2, this.locale);
      }
    }
  }, {
    key: "set",
    value: function set(datetimeObject) {
      if (datetimeObject instanceof datetime) {
        this._source = datetimeObject.toDate();
      } else if (datetimeObject instanceof date) {
        this._source.setFullYear(datetimeObject.year || this._source.getFullYear());
        this._source.setMonth(datetimeObject.month - 1 || this._source.getMonth());
        this._source.setDate(datetimeObject.day || this._source.getDate());
      } else if (datetimeObject instanceof time) {
        this._source.setHours(datetimeObject.hour || this._source.getHours());
        this._source.setMinutes(datetimeObject.minute || this._source.getMinutes());
        this._source.setSeconds(datetimeObject.second || this._source.getSeconds());
        this._source.setMilliseconds(datetimeObject.millisecond || this._source.getMilliseconds());
      } else {
        this._source.setFullYear(datetimeObject.year || this._source.getFullYear());
        this._source.setMonth(datetimeObject.month - 1 || this._source.getMonth());
        this._source.setDate(datetimeObject.day || this._source.getDate());
        this._source.setHours(datetimeObject.hour || this._source.getHours());
        this._source.setMinutes(datetimeObject.minute || this._source.getMinutes());
        this._source.setSeconds(datetimeObject.second || this._source.getSeconds());
        this._source.setMilliseconds(datetimeObject.millisecond || this._source.getMilliseconds());
      }
    }
  }, {
    key: "eq",
    value: function eq(datetimeObject) {
      var other = new datetime(datetimeObject, this.locale);
      return this.timestamp() === other.timestamp();
    }
  }, {
    key: "neq",
    value: function neq(datetimeObject) {
      return !this.eq(datetimeObject);
    }
  }, {
    key: "ge",
    value: function ge(datetimeObject) {
      var other = new datetime(datetimeObject, this.locale);
      return this.timestamp() >= other.timestamp();
    }
  }, {
    key: "gt",
    value: function gt(datetimeObject) {
      var other = new datetime(datetimeObject, this.locale);
      return this.timestamp() > other.timestamp();
    }
  }, {
    key: "le",
    value: function le(datetimeObject) {
      var other = new datetime(datetimeObject, this.locale);
      return this.timestamp() <= other.timestamp();
    }
  }, {
    key: "lt",
    value: function lt(datetimeObject) {
      var other = new datetime(datetimeObject, this.locale);
      return this.timestamp() < other.timestamp();
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      return datetime.isLeapYear(this.year);
    }
  }, {
    key: "isWeekend",
    value: function isWeekend() {
      return this.weekday === 0 || this.weekday === 6;
    }
  }, {
    key: "isWeekday",
    value: function isWeekday() {
      return !this.isWeekend();
    }
  }, {
    key: "isToday",
    value: function isToday() {
      var now = new Date();
      return this.year === now.getFullYear() && this.month === now.getMonth() + 1 && this.day === now.getDate();
    }
  }], [{
    key: "at",
    value: function at(hour, minute, second, millisecond) {
      var date = new Date();
      date.setHours(hour);
      date.setMinutes(minute || 0);
      date.setSeconds(second || 0);
      date.setMilliseconds(millisecond || 0);
      return new datetime(date);
    }
  }, {
    key: "in",
    value: function _in(year) {
      return new datetime(new Date(year, 0, 1));
    }
  }, {
    key: "on",
    value: function on(month, day) {
      day = day || 1;
      return new datetime(new Date(new Date().getFullYear(), month - 1, day));
    }
  }, {
    key: "set",
    value: function set(year, month, day, hour, minute, second, millisecond) {
      month = month || 1;
      day = day || 1;
      hour = hour || 0;
      minute = minute || 0;
      second = second || 0;
      millisecond = millisecond || 0;
      return new datetime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    }
  }, {
    key: "parse",
    value: function parse(dateString) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ko-KR';
      var cultureInfo;
      if (IS_DIST) cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + locale + ".json")); // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
      else cultureInfo = require('./globalization/' + locale + '.json');
      if (!cultureInfo) throw new Error('Invalid locale, not found ' + locale);
      dateString = dateString.split(' ').map(function (e) {
        if (e.trim() in cultureInfo.translate) return cultureInfo.translate[e.trim()];else return e.trim();
      }).join(' ').trim();
      if (dateString === 'today') return datetime.today();else if (dateString === 'tomorrow') return datetime.tomorrow();else if (dateString === 'yesterday') return datetime.yesterday();
      var _dateString$match = dateString.match(/^([+-]\d+) (\w+)$/),
        _dateString$match2 = _slicedToArray(_dateString$match, 3),
        m = _dateString$match2[0],
        n = _dateString$match2[1],
        s = _dateString$match2[2]; // 3 days, 1 month, 2 years
      n = parseInt(n);
      switch (s) {
        case 'year':
          return datetime.today().add({
            year: n
          });
        case 'month':
          return datetime.today().add({
            month: n
          });
        case 'week':
          return datetime.today().add({
            week: n
          });
        case 'day':
          return datetime.today().add({
            day: n
          });
        case 'hour':
          return datetime.today().add({
            hour: n
          });
        case 'minute':
          return datetime.today().add({
            minute: n
          });
        case 'second':
          return datetime.today().add({
            second: n
          });
      }
      return new datetime(Date.parse(dateString));
    }
  }, {
    key: "now",
    value: function now() {
      return new datetime(new Date());
    }
  }, {
    key: "today",
    value: function today() {
      var now = new Date();
      return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    }
  }, {
    key: "tomorrow",
    value: function tomorrow() {
      var now = new Date();
      return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }
  }, {
    key: "yesterday",
    value: function yesterday() {
      var now = new Date();
      return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    }
  }, {
    key: "sunday",
    value: function sunday() {
      var diff = (0 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "monday",
    value: function monday() {
      var diff = (1 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "tuesday",
    value: function tuesday() {
      var diff = (2 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "wednesday",
    value: function wednesday() {
      var diff = (3 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "thursday",
    value: function thursday() {
      var diff = (4 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "friday",
    value: function friday() {
      var diff = (5 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "saturday",
    value: function saturday() {
      var diff = (6 - new Date().getDay() + 7) % 7;
      return datetime.today().add({
        day: diff
      });
    }
  }, {
    key: "january",
    value: function january(day) {
      day = day || 1;
      return new datetime({
        month: 1,
        day: day
      });
    }
  }, {
    key: "february",
    value: function february(day) {
      day = day || 1;
      return new datetime({
        month: 2,
        day: day
      });
    }
  }, {
    key: "march",
    value: function march(day) {
      day = day || 1;
      return new datetime({
        month: 3,
        day: day
      });
    }
  }, {
    key: "april",
    value: function april(day) {
      day = day || 1;
      return new datetime({
        month: 4,
        day: day
      });
    }
  }, {
    key: "may",
    value: function may(day) {
      day = day || 1;
      return new datetime({
        month: 5,
        day: day
      });
    }
  }, {
    key: "june",
    value: function june(day) {
      day = day || 1;
      return new datetime({
        month: 6,
        day: day
      });
    }
  }, {
    key: "july",
    value: function july(day) {
      day = day || 1;
      return new datetime({
        month: 7,
        day: day
      });
    }
  }, {
    key: "august",
    value: function august(day) {
      day = day || 1;
      return new datetime({
        month: 8,
        day: day
      });
    }
  }, {
    key: "september",
    value: function september(day) {
      day = day || 1;
      return new datetime({
        month: 9,
        day: day
      });
    }
  }, {
    key: "october",
    value: function october(day) {
      day = day || 1;
      return new datetime({
        month: 10,
        day: day
      });
    }
  }, {
    key: "november",
    value: function november(day) {
      day = day || 1;
      return new datetime({
        month: 11,
        day: day
      });
    }
  }, {
    key: "december",
    value: function december(day) {
      day = day || 1;
      return new datetime({
        month: 12,
        day: day
      });
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
  }, {
    key: "leapYearCount",
    value: function leapYearCount(start, end) {
      var l = function l(y) {
        return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
      };
      return l(end) - l(start) + (datetime.isLeapYear(start) ? 1 : 0); // [start, end]
    }
  }]);
  return datetime;
}();
exports.datetime = datetime;
exports.date = date;
exports.time = time;

