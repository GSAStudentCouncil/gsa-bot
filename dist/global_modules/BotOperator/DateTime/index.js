"use strict";

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// importClass(java.io.File);

var IS_DIST = true;
var $D = !IS_DIST ? global.Date : Date;
var getCultureInfo = function getCultureInfo(locale) {
  var ret = IS_DIST ? JSON.parse(FileStream.read("".concat(android.os.Environment.getExternalStorageDirectory().getAbsolutePath(), "/msgbot/global_modules/BotOperator/DateTime/globalization/").concat(locale, ".json"))) : require("./globalization/".concat(locale, ".json"));
  if (ret == null) throw Error("Invalid Locale ".concat(locale, ". (").concat(android.os.Environment.getExternalStorageDirectory().getAbsolutePath(), "/msgbot/global_modules/BotOperator/DateTime/globalization/").concat(locale, ".json is not exist)"));
  return ret;
};
var Duration = /*#__PURE__*/function () {
  function Duration(millisecond) {
    _classCallCheck(this, Duration);
    this._amount = millisecond;
  }
  return _createClass(Duration, [{
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
      return (this.amount >= 0 ? Math.floor(this.amount / 1000) : Math.ceil(this.amount / 1000)) % 86400;
    }
  }, {
    key: "day",
    get: function get() {
      return this.amount >= 0 ? Math.floor(this.amount / 86400000) : Math.ceil(this.amount / 86400000);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Duration(day=".concat(this.day, ", second=").concat(this.second, ", millisecond=").concat(this.millisecond, ")");
    }
  }]);
}();
var Date = /*#__PURE__*/function () {
  function Date(year, month, day) {
    _classCallCheck(this, Date);
    this._source = new $D(year, month - 1, day);
  }
  return _createClass(Date, [{
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
    key: "eq",
    value: function eq(dateObject) {
      var year = dateObject.year,
        month = dateObject.month,
        day = dateObject.day;
      return this.year === year && this.month === month && this.day === day;
    }
  }, {
    key: "subtract",
    value: function subtract(dateObject) {
      if (dateObject instanceof Date) return new Duration(this._source.getTime() - dateObject._source.getTime());else if (dateObject instanceof Duration) {
        var dt = new $D(this._source);
        dt.setMilliseconds(dt.getMilliseconds() - dateObject.amount);
        return new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
      } else {
        var _dateObject$year, _dateObject$month, _dateObject$day;
        var _dt = new $D(this._source);
        _dt.setFullYear(_dt.getFullYear() - ((_dateObject$year = dateObject.year) !== null && _dateObject$year !== void 0 ? _dateObject$year : 0));
        _dt.setMonth(_dt.getMonth() - ((_dateObject$month = dateObject.month) !== null && _dateObject$month !== void 0 ? _dateObject$month : 0));
        _dt.setDate(_dt.getDate() - ((_dateObject$day = dateObject.day) !== null && _dateObject$day !== void 0 ? _dateObject$day : 0));
        return new Date(_dt.getFullYear(), _dt.getMonth() + 1, _dt.getDate());
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Date(year=".concat(this.year, ", month=").concat(this.month, ", day=").concat(this.day, ")");
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
}();
var Time = /*#__PURE__*/function () {
  function Time(hour, minute, second, millisecond) {
    _classCallCheck(this, Time);
    this._source = new $D();
    this._source.setHours(hour);
    this._source.setMinutes(minute);
    this._source.setSeconds(second);
    this._source.setMilliseconds(millisecond);
  }
  return _createClass(Time, [{
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
    key: "eq",
    value: function eq(timeObject) {
      var hour = timeObject.hour,
        minute = timeObject.minute,
        second = timeObject.second,
        millisecond = timeObject.millisecond;
      return this.hour === hour && this.minute === minute && this.second === second && this.millisecond === millisecond;
    }
  }, {
    key: "subtract",
    value: function subtract(timeObject) {
      if (timeObject instanceof Time) return new Duration(this._source.getTime() - timeObject._source.getTime());else if (timeObject instanceof Duration) {
        var dt = new $D(this._source);
        dt.setMilliseconds(dt.getMilliseconds() - timeObject.amount);
        return new Time(dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
      } else {
        var _timeObject$hour, _timeObject$minute, _timeObject$second, _timeObject$milliseco;
        var _dt2 = new $D(this._source);
        _dt2.setHours(_dt2.getHours() - ((_timeObject$hour = timeObject.hour) !== null && _timeObject$hour !== void 0 ? _timeObject$hour : 0));
        _dt2.setMinutes(_dt2.getMinutes() - ((_timeObject$minute = timeObject.minute) !== null && _timeObject$minute !== void 0 ? _timeObject$minute : 0));
        _dt2.setSeconds(_dt2.getSeconds() - ((_timeObject$second = timeObject.second) !== null && _timeObject$second !== void 0 ? _timeObject$second : 0));
        _dt2.setMilliseconds(_dt2.getMilliseconds() - ((_timeObject$milliseco = timeObject.millisecond) !== null && _timeObject$milliseco !== void 0 ? _timeObject$milliseco : 0));
        return new Time(_dt2.getHours(), _dt2.getMinutes(), _dt2.getSeconds(), _dt2.getMilliseconds());
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Time(hour=".concat(this.hour, ", minute=").concat(this.minute, ", second=").concat(this.second, ", millisecond=").concat(this.millisecond, ")");
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
}();
var DateTime = /*#__PURE__*/function () {
  function DateTime(datetimeObject, locale) {
    _classCallCheck(this, DateTime);
    this._source = new $D();
    this._locale = locale !== null && locale !== void 0 ? locale : 'ko-KR';
    if (datetimeObject instanceof $D) {
      this._source = datetimeObject;
    } else if (datetimeObject != null) {
      var dt;
      if (datetimeObject instanceof DateTime) dt = datetimeObject;else if (typeof datetimeObject === 'number') dt = DateTime.fromNumber(datetimeObject);else if (_typeof(datetimeObject) === 'object' && !Array.isArray(datetimeObject)) dt = DateTime.fromObject(datetimeObject);else if (typeof datetimeObject === 'string') dt = DateTime.fromString(datetimeObject, this._locale);else throw new TypeError('`datetimeObject` must be $D, datetime, number, object, or string');
      this._source = dt._source;
      this._locale = dt._locale;
    }
  }
  return _createClass(DateTime, [{
    key: "date",
    get: function get() {
      return new Date(this._source.getFullYear(), this._source.getMonth() + 1, this._source.getDate());
    },
    set: function set(dateObject) {
      var _dateObject$year2, _ref, _dateObject$day2;
      if (!(dateObject instanceof Date)) throw new TypeError('`date` must be date');
      this._source.setFullYear((_dateObject$year2 = dateObject.year) !== null && _dateObject$year2 !== void 0 ? _dateObject$year2 : this._source.getFullYear());
      this._source.setMonth((_ref = dateObject.month - 1) !== null && _ref !== void 0 ? _ref : this._source.getMonth());
      this._source.setDate((_dateObject$day2 = dateObject.day) !== null && _dateObject$day2 !== void 0 ? _dateObject$day2 : this._source.getDate());
    }
  }, {
    key: "time",
    get: function get() {
      return new Time(this._source.getHours(), this._source.getMinutes(), this._source.getSeconds(), this._source.getMilliseconds());
    },
    set: function set(timeObject) {
      var _timeObject$hour2, _timeObject$minute2, _timeObject$second2, _timeObject$milliseco2;
      if (!(timeObject instanceof Time)) throw new TypeError('`time` must be time');
      this._source.setHours((_timeObject$hour2 = timeObject.hour) !== null && _timeObject$hour2 !== void 0 ? _timeObject$hour2 : this._source.getHours());
      this._source.setMinutes((_timeObject$minute2 = timeObject.minute) !== null && _timeObject$minute2 !== void 0 ? _timeObject$minute2 : this._source.getMinutes());
      this._source.setSeconds((_timeObject$second2 = timeObject.second) !== null && _timeObject$second2 !== void 0 ? _timeObject$second2 : this._source.getSeconds());
      this._source.setMilliseconds((_timeObject$milliseco2 = timeObject.millisecond) !== null && _timeObject$milliseco2 !== void 0 ? _timeObject$milliseco2 : this._source.getMilliseconds());
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
      return getCultureInfo(this.locale)['WW'][this.weekday];
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
      var _formatString,
        _this = this;
      var cultureInfo = getCultureInfo(this.locale);
      formatString = (_formatString = formatString) !== null && _formatString !== void 0 ? _formatString : cultureInfo['formats']['full'];
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
    key: "humanize",
    value: function humanize() {
      var ignoreTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var now = DateTime.now();
      var str = {
        date: '',
        time: ''
      };
      var dayDiff = this.date.subtract(now.date).day;
      var secDiff = Math.ceil(this.subtract(now).amount / 1000);
      var specials = {};
      specials[-2] = '그제';
      specials[-1] = '어제';
      specials[0] = '오늘';
      specials[1] = '내일';
      specials[2] = '모레';
      var isSpecial = false;
      for (var i = -2; i <= 2; i++) {
        var dt = now.add({
          day: i
        });
        if (this.date.eq(dt.date)) {
          str.date = specials[i];
          isSpecial = true;
          break;
        }
      }
      if (!isSpecial) {
        var nowWeekday = now.weekday - 1; // 월화수목금토일
        var lastWeekMonDiff = -7 - nowWeekday; // 저번 주 월요일까지의 날짜 차이
        var nextWeekSunDiff = 13 - nowWeekday; // 다음 주 일요일까지의 날짜 차이

        if (lastWeekMonDiff <= dayDiff && dayDiff <= nextWeekSunDiff) {
          // 저번 주 ~ 다음 주
          if (dayDiff - lastWeekMonDiff < 7) str.date = "\uC9C0\uB09C \uC8FC ".concat(this.weekdayName);else if (nextWeekSunDiff - dayDiff < 7) str.date = "\uB2E4\uC74C \uC8FC ".concat(this.weekdayName);else if (dayDiff < 0) str.date = "\uC774\uBC88 \uC8FC ".concat(this.weekdayName); // 이번 주의 지나간 요일은 '이번 주' 포함
          else str.date = this.weekdayName; // 이번 주의 아직 지나지 않은 요일은 '이번 주' 생략
        }
        // else if (this.year === now.year && this.month === now.month) {    // 저번 주 ~ 다음 주의 범위를 벗어나면서 달은 같은 경우
        // 	const week = dayDiff < 0 ? Math.ceil(dayDiff / 7) : Math.floor(dayDiff / 7);
        // 	const day = dayDiff - week * 7;
        //
        // 	const ret = [];
        //
        // 	if (week !== 0)
        // 		ret.push(`${Math.abs(week)}주`);
        // 	if (day !== 0)
        // 		ret.push(`${Math.abs(day)}일`);
        //
        // 	str.date = ret.join(' ') + (dayDiff < 0 ? ' 전' : ' 후');
        // }
        else if (this.year === now.year) str.date = "".concat(this.month, "\uC6D4 ").concat(this.day, "\uC77C");else str.date = "".concat(this.year, "\uB144 ").concat(this.month, "\uC6D4 ").concat(this.day, "\uC77C");
      }
      var isRelative = false;
      if (!ignoreTime) {
        if (this.hour === 0 && this.minute === 0 && this.second === 0) str.time = ""; // '오늘 자정'은 마치 내일 0시를 말하는 것 같아서 그냥 '오늘'로 표시
        else if (this.hour === 12 && this.minute === 0 && this.second === 0) str.time = "정오";else {
          var sign = secDiff < 0 ? '전' : '후';
          var amountSec = Math.abs(secDiff);
          var hour = Math.floor(amountSec / 3600);
          var minute = Math.floor(amountSec % 3600 / 60);
          var second = amountSec % 60;
          if (amountSec < 6 * 60 * 60) {
            // 6시간 이내
            isRelative = true;
            if (hour !== 0) str.time += "".concat(hour, "\uC2DC\uAC04 ");
            if (minute !== 0) str.time += "".concat(minute, "\uBD84 ");
            if (second !== 0) str.time += "".concat(second, "\uCD08 ");
            // 밀리초는 수행 시간에도 영향을 받고, 너무 세부적이므로 무시. 나중에 config 로 설정할 수 있게?

            if (str.time !== '') str.time = str.time.trim() + " ".concat(sign);
          } else str.time = this.toString("t h시 m분 s초").replace('0초', '').replace('0분', '').replace(/\s+/g, ' ').trimEnd();
        }
      }
      if (!ignoreTime && this.eq(now, true)) return '지금';else if (!ignoreTime && isRelative)
        // 상대적인 시간이면 최대 6시간 차이니까 날짜를 생략
        return str.time;else if (!ignoreTime && str.date === '오늘' && str.time !== '')
        // 오늘인데 시간이 있으면 날짜를 생략
        return str.time;else return "".concat(str.date, " ").concat(str.time).trim();
    }
  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.timestamp();
    }
  }, {
    key: "toDate",
    value: function toDate() {
      return new $D(this._source); // Date 객체의 깊은 복사
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
      if (datetimeObject instanceof Duration) {
        var dt = this.toDate();
        dt.setMilliseconds(dt.getMilliseconds() + datetimeObject.amount);
        return new DateTime(dt, this.locale);
      } else {
        var _datetimeObject$year, _datetimeObject$month, _datetimeObject$day, _datetimeObject$week, _datetimeObject$hour, _datetimeObject$minut, _datetimeObject$secon, _datetimeObject$milli;
        var _dt3 = this.toDate();
        _dt3.setFullYear(_dt3.getFullYear() + ((_datetimeObject$year = datetimeObject.year) !== null && _datetimeObject$year !== void 0 ? _datetimeObject$year : 0));
        _dt3.setMonth(_dt3.getMonth() + ((_datetimeObject$month = datetimeObject.month) !== null && _datetimeObject$month !== void 0 ? _datetimeObject$month : 0));
        _dt3.setDate(_dt3.getDate() + ((_datetimeObject$day = datetimeObject.day) !== null && _datetimeObject$day !== void 0 ? _datetimeObject$day : 0));
        _dt3.setDate(_dt3.getDate() + 7 * ((_datetimeObject$week = datetimeObject.week) !== null && _datetimeObject$week !== void 0 ? _datetimeObject$week : 0));
        _dt3.setHours(_dt3.getHours() + ((_datetimeObject$hour = datetimeObject.hour) !== null && _datetimeObject$hour !== void 0 ? _datetimeObject$hour : 0));
        _dt3.setMinutes(_dt3.getMinutes() + ((_datetimeObject$minut = datetimeObject.minute) !== null && _datetimeObject$minut !== void 0 ? _datetimeObject$minut : 0));
        _dt3.setSeconds(_dt3.getSeconds() + ((_datetimeObject$secon = datetimeObject.second) !== null && _datetimeObject$secon !== void 0 ? _datetimeObject$secon : 0));
        _dt3.setMilliseconds(_dt3.getMilliseconds() + ((_datetimeObject$milli = datetimeObject.millisecond) !== null && _datetimeObject$milli !== void 0 ? _datetimeObject$milli : 0));
        return new DateTime(_dt3, this.locale);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(datetimeObject) {
      if (datetimeObject instanceof DateTime) return new Duration(this.timestamp() - datetimeObject.timestamp());else if (datetimeObject instanceof Duration) {
        var dt = this.toDate();
        dt.setMilliseconds(dt.getMilliseconds() - datetimeObject.amount);
        return new DateTime(dt, this.locale);
      } else {
        var _datetimeObject$year2, _datetimeObject$month2, _datetimeObject$day2, _datetimeObject$week2, _datetimeObject$hour2, _datetimeObject$minut2, _datetimeObject$secon2, _datetimeObject$milli2;
        var _dt4 = this.toDate();
        _dt4.setFullYear(_dt4.getFullYear() - ((_datetimeObject$year2 = datetimeObject.year) !== null && _datetimeObject$year2 !== void 0 ? _datetimeObject$year2 : 0));
        _dt4.setMonth(_dt4.getMonth() - ((_datetimeObject$month2 = datetimeObject.month) !== null && _datetimeObject$month2 !== void 0 ? _datetimeObject$month2 : 0));
        _dt4.setDate(_dt4.getDate() - ((_datetimeObject$day2 = datetimeObject.day) !== null && _datetimeObject$day2 !== void 0 ? _datetimeObject$day2 : 0));
        _dt4.setDate(_dt4.getDate() - 7 * ((_datetimeObject$week2 = datetimeObject.week) !== null && _datetimeObject$week2 !== void 0 ? _datetimeObject$week2 : 0));
        _dt4.setHours(_dt4.getHours() - ((_datetimeObject$hour2 = datetimeObject.hour) !== null && _datetimeObject$hour2 !== void 0 ? _datetimeObject$hour2 : 0));
        _dt4.setMinutes(_dt4.getMinutes() - ((_datetimeObject$minut2 = datetimeObject.minute) !== null && _datetimeObject$minut2 !== void 0 ? _datetimeObject$minut2 : 0));
        _dt4.setSeconds(_dt4.getSeconds() - ((_datetimeObject$secon2 = datetimeObject.second) !== null && _datetimeObject$secon2 !== void 0 ? _datetimeObject$secon2 : 0));
        _dt4.setMilliseconds(_dt4.getMilliseconds() - ((_datetimeObject$milli2 = datetimeObject.millisecond) !== null && _datetimeObject$milli2 !== void 0 ? _datetimeObject$milli2 : 0));
        return new DateTime(_dt4, this.locale);
      }
    }
  }, {
    key: "set",
    value: function set(datetimeObject) {
      if (datetimeObject instanceof DateTime) {
        this._source = datetimeObject.toDate();
      } else if (datetimeObject instanceof Date) {
        this.year = datetimeObject.year;
        this.month = datetimeObject.month;
        this.day = datetimeObject.day;
      } else if (datetimeObject instanceof Time) {
        this.hour = datetimeObject.hour;
        this.minute = datetimeObject.minute;
        this.second = datetimeObject.second;
        this.millisecond = datetimeObject.millisecond;
      } else {
        if (datetimeObject.year != null) this.year = datetimeObject.year;
        if (datetimeObject.month != null) this.month = datetimeObject.month;
        if (datetimeObject.day != null) this.day = datetimeObject.day;
        if (datetimeObject.hour != null) this.hour = datetimeObject.hour;
        if (datetimeObject.minute != null) this.minute = datetimeObject.minute;
        if (datetimeObject.second != null) this.second = datetimeObject.second;
        if (datetimeObject.millisecond != null) this.millisecond = datetimeObject.millisecond;
      }
      return this;
    }
  }, {
    key: "eq",
    value: function eq(datetimeObject) {
      var ignoreMillisecond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (datetimeObject.constructor === Object) datetimeObject = DateTime.fromObject(datetimeObject, this);
      if (ignoreMillisecond) {
        var other = new DateTime(datetimeObject, this.locale);
        return this.timestamp() - this.millisecond === other.timestamp() - other.millisecond;
      } else {
        var _other = new DateTime(datetimeObject, this.locale);
        return this.timestamp() === _other.timestamp();
      }
    }
  }, {
    key: "neq",
    value: function neq(datetimeObject) {
      var ignoreMillisecond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return !this.eq(datetimeObject, ignoreMillisecond);
    }
  }, {
    key: "ge",
    value: function ge(datetimeObject) {
      if (datetimeObject.constructor === Object) datetimeObject = DateTime.fromObject(datetimeObject, this);
      var other = new DateTime(datetimeObject, this.locale);
      return this.timestamp() >= other.timestamp();
    }
  }, {
    key: "gt",
    value: function gt(datetimeObject) {
      if (datetimeObject.constructor === Object) datetimeObject = DateTime.fromObject(datetimeObject, this);
      var other = new DateTime(datetimeObject, this.locale);
      return this.timestamp() > other.timestamp();
    }
  }, {
    key: "le",
    value: function le(datetimeObject) {
      if (datetimeObject.constructor === Object) datetimeObject = DateTime.fromObject(datetimeObject, this);
      var other = new DateTime(datetimeObject, this.locale);
      return this.timestamp() <= other.timestamp();
    }
  }, {
    key: "lt",
    value: function lt(datetimeObject) {
      if (datetimeObject.constructor === Object) datetimeObject = DateTime.fromObject(datetimeObject, this);
      var other = new DateTime(datetimeObject, this.locale);
      return this.timestamp() < other.timestamp();
    }
  }, {
    key: "_parse",
    value: function _parse(dateString) {
      var getString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return DateTime._parse(dateString, getString, filterIncludeEnding, trim, this, this.locale);
    }
  }, {
    key: "parse",
    value: function parse(dateString) {
      var getString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var ret = this._parse(dateString, getString, filterIncludeEnding, trim);
      if (getString) return {
        parse: ret.parse == null ? null : DateTime.fromObject(ret.parse, this),
        string: ret.string
      };else return ret == null ? null : DateTime.fromObject(ret, this);
    }
  }, {
    key: "isLeapYear",
    value: function isLeapYear() {
      return DateTime.isLeapYear(this.year);
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
      var now = new $D();
      return this.year === now.getFullYear() && this.month === now.getMonth() + 1 && this.day === now.getDate();
    }
  }, {
    key: "lengthOfMonth",
    value: function lengthOfMonth() {
      return [0, 31, this.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.month];
    }
  }, {
    key: "lengthOfYear",
    value: function lengthOfYear() {
      return this.isLeapYear() ? 366 : 365;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }], [{
    key: "fromTimestamp",
    value: function fromTimestamp(timestamp) {
      return DateTime.fromNumber(timestamp);
    }
  }, {
    key: "fromString",
    value: function fromString(dateString) {
      var useDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var getString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var filterIncludeEnding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var trim = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var std = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : DateTime.now();
      var locale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'ko-KR';
      return DateTime.dehumanize(dateString, useDuration, getString, filterIncludeEnding, trim, std, locale);
    }
  }, {
    key: "dehumanize",
    value: function dehumanize(dateString) {
      var useDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var getString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var filterIncludeEnding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var trim = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var std = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : DateTime.now();
      var locale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'ko-KR';
      if (useDuration) return DateTime.parseDuration(dateString, getString, filterIncludeEnding, std, locale);else return DateTime.parse(dateString, getString, filterIncludeEnding, trim, std, locale);
    }
  }, {
    key: "fromNumber",
    value: function fromNumber(timestamp) {
      return DateTime.fromDate(new $D(timestamp));
    }
  }, {
    key: "fromDate",
    value: function fromDate(date) {
      var dt = new DateTime();
      dt._source = date;
      return dt;
    }
  }, {
    key: "fromObject",
    value: function fromObject(datetimeObject) {
      var _standard$year, _standard$month, _standard$day, _standard$hour, _standard$minute, _standard$second, _standard$millisecond;
      var standard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var now = new DateTime();
      var ret = {};
      ret.year = datetimeObject.year;
      ret.month = datetimeObject.month;
      ret.day = datetimeObject.day;
      ret.hour = datetimeObject.hour;
      ret.minute = datetimeObject.minute;
      ret.second = datetimeObject.second;
      ret.millisecond = datetimeObject.millisecond;
      var defaults = {
        year: standard ? (_standard$year = standard.year) !== null && _standard$year !== void 0 ? _standard$year : now.year : now.year,
        month: standard ? (_standard$month = standard.month) !== null && _standard$month !== void 0 ? _standard$month : now.month : 1,
        day: standard ? (_standard$day = standard.day) !== null && _standard$day !== void 0 ? _standard$day : now.day : 1,
        hour: standard ? (_standard$hour = standard.hour) !== null && _standard$hour !== void 0 ? _standard$hour : now.hour : 0,
        minute: standard ? (_standard$minute = standard.minute) !== null && _standard$minute !== void 0 ? _standard$minute : now.minute : 0,
        second: standard ? (_standard$second = standard.second) !== null && _standard$second !== void 0 ? _standard$second : now.second : 0,
        millisecond: standard ? (_standard$millisecond = standard.millisecond) !== null && _standard$millisecond !== void 0 ? _standard$millisecond : now.millisecond : 0
      };
      var units = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

      /**
       * "오전 6시" 는 year, month, day는 현재 or 기준(standard)으로, hour는 6, minute, second, millisecond는 0으로 정해지는 것이 합당하다.
       * 아래의 코드는 if (year == null) else if (month == null) ... else if (millisecond == null) 에 대해 각각 for 문으로
       * 전의 unit을 기준(standard)의 값으로, 후의 unit을 시작으로 지정하는 코드다.
       */
      var find = false;
      for (var _i = 0, _units = units; _i < _units.length; _i++) {
        var unit = _units[_i];
        if (ret[unit] != null) {
          var x = units.indexOf(unit);
          for (var i = 0; i < x; i++) {
            var _units$i, _ret$_units$i;
            (_ret$_units$i = ret[_units$i = units[i]]) !== null && _ret$_units$i !== void 0 ? _ret$_units$i : ret[_units$i] = (standard !== null && standard !== void 0 ? standard : now)[units[i]];
          }
          for (var _i2 = x; _i2 < units.length; _i2++) {
            var _units$_i, _ret$_units$_i;
            (_ret$_units$_i = ret[_units$_i = units[_i2]]) !== null && _ret$_units$_i !== void 0 ? _ret$_units$_i : ret[_units$_i] = defaults[units[_i2]];
          }
          find = true;
          break;
        }
      }
      if (ret.year % 1 !== 0) {
        ret.month += ret.year % 1 * 12;
        ret.year = ret.year >= 0 ? Math.floor(ret.year) : Math.ceil(ret.year);
      }
      if (ret.month % 1 !== 0) {
        ret.day += ret.month % 1 * DateTime.lengthOfMonth(ret.year, Math.floor(ret.month));
        ret.month = ret.month >= 0 ? Math.floor(ret.month) : Math.ceil(ret.month);
      }
      if (ret.day % 1 !== 0) {
        ret.hour += ret.day % 1 * 24;
        ret.day = ret.day >= 0 ? Math.floor(ret.day) : Math.ceil(ret.day);
      }
      if (ret.hour % 1 !== 0) {
        ret.minute += ret.hour % 1 * 60;
        ret.hour = ret.hour >= 0 ? Math.floor(ret.hour) : Math.ceil(ret.hour);
      }
      if (ret.minute % 1 !== 0) {
        ret.second += ret.minute % 1 * 60;
        ret.minute = ret.minute >= 0 ? Math.floor(ret.minute) : Math.ceil(ret.minute);
      }
      if (ret.second % 1 !== 0) {
        ret.millisecond += ret.second % 1 * 1000;
        ret.second = ret.second >= 0 ? Math.floor(ret.second) : Math.ceil(ret.second);
      }
      if (ret.millisecond % 1 !== 0) throw new Error('millisecond must be integer');
      return DateTime.set(ret);
    }
  }, {
    key: "at",
    value: function at(hour, minute, second, millisecond) {
      var date = new $D();
      date.setHours(hour);
      date.setMinutes(minute !== null && minute !== void 0 ? minute : 0);
      date.setSeconds(second !== null && second !== void 0 ? second : 0);
      date.setMilliseconds(millisecond !== null && millisecond !== void 0 ? millisecond : 0);
      return new DateTime(date);
    }
  }, {
    key: "in",
    value: function _in(year) {
      return new DateTime(new $D(year, 0, 1));
    }
  }, {
    key: "on",
    value: function on(month, day) {
      var _day;
      day = (_day = day) !== null && _day !== void 0 ? _day : 1;
      return new DateTime(new $D(new $D().getFullYear(), month - 1, day));
    }
  }, {
    key: "set",
    value: function set(datetimeObject) {
      var _datetimeObject$year3, _datetimeObject$month3, _datetimeObject$day3, _datetimeObject$hour3, _datetimeObject$minut3, _datetimeObject$secon3, _datetimeObject$milli3;
      var year = (_datetimeObject$year3 = datetimeObject.year) !== null && _datetimeObject$year3 !== void 0 ? _datetimeObject$year3 : new $D().getFullYear();
      var month = (_datetimeObject$month3 = datetimeObject.month) !== null && _datetimeObject$month3 !== void 0 ? _datetimeObject$month3 : 1;
      var day = (_datetimeObject$day3 = datetimeObject.day) !== null && _datetimeObject$day3 !== void 0 ? _datetimeObject$day3 : 1;
      var hour = (_datetimeObject$hour3 = datetimeObject.hour) !== null && _datetimeObject$hour3 !== void 0 ? _datetimeObject$hour3 : 0;
      var minute = (_datetimeObject$minut3 = datetimeObject.minute) !== null && _datetimeObject$minut3 !== void 0 ? _datetimeObject$minut3 : 0;
      var second = (_datetimeObject$secon3 = datetimeObject.second) !== null && _datetimeObject$secon3 !== void 0 ? _datetimeObject$secon3 : 0;
      var millisecond = (_datetimeObject$milli3 = datetimeObject.millisecond) !== null && _datetimeObject$milli3 !== void 0 ? _datetimeObject$milli3 : 0;
      return new DateTime(new $D(year, month - 1, day, hour, minute, second, millisecond));
    }
  }, {
    key: "_parse",
    value: function _parse(dateString) {
      var getString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var std = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DateTime.now();
      var locale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'ko-KR';
      var cultureInfo = getCultureInfo(locale);
      var replaces = _objectEntries(cultureInfo['replaces']);
      replaces.sort(function (a, b) {
        return b[0].length - a[0].length;
      }); // '내일모레'와 '모레'가 모두 매칭되는 경우, '내일모레'가 먼저 매칭되도록 함.

      dateString = dateString.trim().replace(/\s+/g, ' ');
      dateString = dateString.replace(/(그+)(글피|끄저께)/g, function (_, countStr, directionStr) {
        var offset = directionStr === '글피' ? 3 : 2;
        var direction = directionStr === '글피' ? '다음' : '저번';
        var count = countStr.length;
        return "".concat(direction[0].repeat(count + offset)).concat(direction[1], " \uB0A0");
      });
      dateString = dateString.replace(/(저+)번/g, function (_, countStr) {
        return "".concat('지'.repeat(countStr.length), "\uB09C");
      });
      replaces.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        dateString = dateString.replace(new RegExp(key, 'g'), value);
      });
      var filteredString = dateString;
      var filtering = function filtering(value) {
        return filteredString = filteredString.replace(new RegExp(value + (filterIncludeEnding ? '\\S*' : '')), '');
      };
      var iso_parse = function iso_parse() {
        var RE_ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/;
        var isoMatch = dateString.match(RE_ISO);
        if (isoMatch) {
          filtering(isoMatch[0]);
          var _isoMatch$slice = isoMatch.slice(1),
            _isoMatch$slice2 = _slicedToArray(_isoMatch$slice, 7),
            year = _isoMatch$slice2[0],
            month = _isoMatch$slice2[1],
            day = _isoMatch$slice2[2],
            hour = _isoMatch$slice2[3],
            minute = _isoMatch$slice2[4],
            second = _isoMatch$slice2[5],
            millisecond = _isoMatch$slice2[6];
          return {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            millisecond: millisecond
          };
        }
      };
      var common_parse = function common_parse() {
        var _year, _month, _day2, _hour, _minute, _second, _millisecond;
        var year, month, day, hour, minute, second, millisecond;
        var idx = -1; // ymd, md 등 정규식에 가장 뒤에서 걸린 것(인덱스의 최댓값)을 찾기 위한 변수

        var mix = {
          ymd: /(\d{4})[-.\/] *(\d{1,2})[-.\/] *(\d{1,2})\.?/,
          md: /(\d{1,2})[-.\/] *(\d{1,2})\.?/,
          hms: /(\d{1,2}) *: *(\d{1,2}) *: *(\d{1,2})/,
          hm: /(\d{1,2}) *: *(\d{1,2})/,
          ms: /(\d{1,2}) *: *(\d{1,2})/
        };
        var matchedMix = {};
        for (var key in mix) {
          var match = dateString.match(mix[key]);
          if (match) {
            matchedMix[key] = match;
            idx = Math.max(idx, match.index);
          }
        }
        if (matchedMix.ymd) {
          filtering(matchedMix.ymd[0]);
          year = matchedMix.ymd[1];
          month = matchedMix.ymd[2];
          day = matchedMix.ymd[3];
        } else if (matchedMix.md) {
          filtering(matchedMix.md[0]);
          year = DateTime.now().year;
          month = matchedMix.md[1];
          day = matchedMix.md[2];
        }
        if (matchedMix.hms) {
          filtering(matchedMix.hms[0]);
          hour = matchedMix.hms[1];
          minute = matchedMix.hms[2];
          second = matchedMix.hms[3];
        } else if (matchedMix.hm) {
          filtering(matchedMix.hm[0]);
          hour = matchedMix.hm[1];
          minute = matchedMix.hm[2];
        } else if (matchedMix.ms) {
          filtering(matchedMix.ms[0]);
          minute = matchedMix.ms[1];
          second = matchedMix.ms[2];
        }
        var re = {
          year: /\d{4}년/,
          month: /\d{1,2}월/,
          day: /\d{1,2}일/,
          hour: /\d{1,2}시/,
          minute: /\d{1,2}분/,
          second: /\d{1,2}초/,
          millisecond: /\d{1,3}밀리초/
        };
        var matched = {};
        for (var _key in re) {
          var _match = dateString.match(re[_key]);
          if (_match) {
            filtering(_match[0]);
            matched[_key] = _match[0];
            idx = Math.max(idx, _match.index);
          }
        }
        (_year = year) !== null && _year !== void 0 ? _year : year = matched.year;
        (_month = month) !== null && _month !== void 0 ? _month : month = matched.month;
        (_day2 = day) !== null && _day2 !== void 0 ? _day2 : day = matched.day;
        (_hour = hour) !== null && _hour !== void 0 ? _hour : hour = matched.hour;
        (_minute = minute) !== null && _minute !== void 0 ? _minute : minute = matched.minute;
        (_second = second) !== null && _second !== void 0 ? _second : second = matched.second;
        (_millisecond = millisecond) !== null && _millisecond !== void 0 ? _millisecond : millisecond = matched.millisecond;
        if (year != null) year = parseInt(year);
        if (month != null) month = parseInt(month);
        if (day != null) day = parseInt(day);
        if (hour != null) hour = parseInt(hour);
        if (minute != null) minute = parseInt(minute);
        if (second != null) second = parseInt(second);
        if (millisecond != null) millisecond = parseInt(millisecond);

        // 보통 '3시'는 '오후 3시'로 해석되어야 함.
        // 자동으로 오후로 해석되는 시간의 범위: 1시 ~ 7시 59분
        var meridian = 1 <= hour && hour < 8 ? 'pm' : 'am';
        var i;
        if (dateString.indexOf('오전') !== -1) {
          filtering('오전');
          meridian = 'am';
        } else if (0 <= (i = dateString.indexOf('아침')) && i < idx) {
          // 야침 9시 -> 오전 9시
          filtering('아침');
          meridian = 'am';
        } else if (dateString.indexOf('am') !== -1) {
          filtering('am');
          meridian = 'am';
        } else if (dateString.indexOf('오후') !== -1) {
          filtering('오후');
          meridian = 'pm';
        } else if (0 <= (i = dateString.indexOf('저녁')) && i < idx) {
          filtering('저녁');
          meridian = 'pm';
        } else if (dateString.indexOf('pm') !== -1) {
          filtering('pm');
          meridian = 'pm';
        }
        if (hour != null && hour < 12 && meridian === 'pm') hour += 12;
        if (dateString.indexOf('아침') !== -1 && idx === -1) {
          // '아침 9시' 라고 했으면 위에서 '오전'으로 이미 필터링 됨. 즉, 이건 '아침'만 있는 경우임.
          filtering('아침');
          day = std.gt({
            hour: 7,
            minute: 30
          }) ? std.day + 1 : std.day;
          hour = 7;
          minute = 30;
        } else if (dateString.indexOf('정오') !== -1 && idx === -1) {
          filtering('정오');
          day = std.gt({
            hour: 12
          }) ? std.day + 1 : std.day;
          hour = 12;
        } else if (dateString.indexOf('점심') !== -1 && idx === -1) {
          filtering('점심');
          day = std.gt({
            hour: 12,
            minute: 30
          }) ? std.day + 1 : std.day;
          hour = 12;
          minute = 30;
        } else if (dateString.indexOf('저녁') !== -1 && idx === -1) {
          filtering('저녁');
          day = std.gt({
            hour: 18
          }) ? std.day + 1 : std.day;
          hour = 18;
        } else if (dateString.indexOf('자정') !== -1 && idx === -1) {
          filtering('자정');
          day = std.day + 1;
          hour = 0;
        }
        var ret = {};
        if (year != null) ret.year = year;
        if (month != null) ret.month = month;
        if (day != null) ret.day = day;
        if (hour != null) ret.hour = hour;
        if (minute != null) ret.minute = minute;
        if (second != null) ret.second = second;
        if (millisecond != null) ret.millisecond = millisecond;
        return ret;
      };
      var relative_parse = function relative_parse() {
        var unitMap = {
          '년': 'year',
          '해': 'year',
          '달': 'month',
          '일': 'day',
          '날': 'day',
          '시간': 'hour',
          '분': 'minute',
          '초': 'second'
        };
        var units = ['year', 'month', 'day', 'hour', 'minute', 'second'];
        var RE_RELATIVE = /([+-]?\d+(?:.\d*)?) *(년|달|주|일|시간|분|초)/g;
        var RE_RELATIVE_END = /[^오]+([전후뒤])/;
        var RE_RELATIVE2 = /(다+음|지+난|이번) *(해|달|주|날|시간|분|초)/g;
        var RE_WEEKDAY = /([일월화수목금토])요일/; // 원래 뒤에 (?= +|$|까지) 있었는데 빼 봄.

        var ret = {};
        var arr, arr2;
        var set = function set(dir, diff) {
          var factor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          return dir === '전' ? -parseInt(diff) * factor : parseInt(diff) * factor;
        };

        // 'n<단위> 후'는 단위가 변경되고 나머지는 현재 시간을 따름. 3시간 후 -> 3시간 후 현재시간
        arr2 = RE_RELATIVE_END.exec(dateString);
        if (arr2 != null) {
          filtering(arr2[0]);
          while ((arr = RE_RELATIVE.exec(dateString)) != null) {
            var _ret$key;
            filtering(arr[0]);
            var _arr$slice = arr.slice(1),
              _arr$slice2 = _slicedToArray(_arr$slice, 2),
              diff = _arr$slice2[0],
              unit = _arr$slice2[1];
            var _arr2$slice = arr2.slice(1),
              _arr2$slice2 = _slicedToArray(_arr2$slice, 1),
              direction = _arr2$slice2[0];
            var key = unitMap[unit];
            if (unit === '주') {
              var _ret$day;
              ret['day'] = ((_ret$day = ret['day']) !== null && _ret$day !== void 0 ? _ret$day : 0) + set(direction, diff, 7);
              // '다음 주' -> '다음 주 월요일'로 자동매칭은 부드러우나, '3주 후'는 '3주 후 현재시간'으로 자동매칭이 더 합당함.
            } else ret[key] = ((_ret$key = ret[key]) !== null && _ret$key !== void 0 ? _ret$key : 0) + set(direction, diff);

            // '3시간 후' -> '3시간 후 현재시간'으로 자동매칭. '3일 후' -> '3일 후 현재시간' 으로 자동매칭...
            ret.defaultToNow = true;
          }
        }

        // '다음 <단위>'는 단위만 변경되면 나머지는 초기화임. 다음 시간 -> 다음 시간 0분 0초
        while ((arr = RE_RELATIVE2.exec(dateString)) != null) {
          var _ret$unitMap$_unit;
          filtering(arr[0]);
          var _arr$slice3 = arr.slice(1),
            _arr$slice4 = _slicedToArray(_arr$slice3, 2),
            _diff = _arr$slice4[0],
            _unit = _arr$slice4[1];

          // 다다다다음 -> 다음 * 4
          var diff_num = (_diff.length - 1) * (_diff[0] === '다' ? 1 : _diff[0] === '지' ? -1 : 0);
          if (_unit === '주') {
            var _ret$day2;
            ret['day'] = ((_ret$day2 = ret['day']) !== null && _ret$day2 !== void 0 ? _ret$day2 : 0) + diff_num * 7;
            ret['day'] += 0 - (std.weekday - 1); // '다음 주' -> '다음 주 월요일'로 자동매칭
          } else ret[unitMap[_unit]] = ((_ret$unitMap$_unit = ret[unitMap[_unit]]) !== null && _ret$unitMap$_unit !== void 0 ? _ret$unitMap$_unit : 0) + diff_num;
        }

        // 일월화수목금토가 일주일이라고 하면 현재가 수요일일 때, 다음주 일요일은 5일 후. 그러나 평상시는 이 날을 그냥 이번주 일요일이라고 함.
        // 즉 현실에 맞게 일주일을 조금 다르게 대응시킴.
        if ((arr = RE_WEEKDAY.exec(dateString)) != null) {
          if (arr.index === 0 || /[^0-9요]+/.test(dateString.slice(0, arr.index))) {
            var _ret$day3, _ret$day4;
            // /(?<=[^0-9요]+|^)([일월화수목금토])요일(?= +|$)/ 에서 후방탐색연산자 사용이 안되어서 이렇게 대신함

            filtering(arr[0]);
            var _arr$slice5 = arr.slice(1),
              _arr$slice6 = _slicedToArray(_arr$slice5, 1),
              week = _arr$slice6[0];
            var today = std.weekday - 1; // 일월화수목금토가 아니고 월화수목금토일
            var start = (((_ret$day3 = ret['day']) !== null && _ret$day3 !== void 0 ? _ret$day3 : 0) + today) % 7;
            var dest = DateTime.getWeekdayFromName(week, true);
            ret['day'] = ((_ret$day4 = ret['day']) !== null && _ret$day4 !== void 0 ? _ret$day4 : 0) + (dest - start);
          }
        }
        return ret;
      };
      var ret;
      var iso_parsed = iso_parse();
      if (iso_parsed != null) {
        filteredString = filteredString.replace(/\s+/g, ' ');
        ret = {
          parse: iso_parsed,
          string: trim ? filteredString.trim() : filteredString
        };
      } else {
        var relative_parsed = relative_parse();
        var common_parsed = common_parse();
        if (Object.keys(common_parsed).length === 0 && Object.keys(relative_parsed).length === 0) ret = {
          string: trim ? filteredString.trim() : filteredString
        };else {
          var units = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

          // '3월 4일' 이라고 하면 '현재년도 3월 4일 0시 0분 0초'로 해석되어야 함. 즉, 마지막으로 데이터가 존재하는 unit 까지만 현재 날짜로 지정.
          var lastIndex = -1;
          for (var i = units.length - 1; i >= 0; i--) {
            if (relative_parsed[units[i]] != null) {
              lastIndex = i;
              break;
            }
          }

          // 상대 날짜는 현재 날짜와 더해줌
          for (var _i3 = 0; _i3 < units.length; _i3++) {
            var _relative_parsed$unit;
            if (!relative_parsed.defaultToNow && _i3 > lastIndex) break;
            relative_parsed[units[_i3]] = ((_relative_parsed$unit = relative_parsed[units[_i3]]) !== null && _relative_parsed$unit !== void 0 ? _relative_parsed$unit : 0) + std[units[_i3]];
          }

          // 상대 날짜와 일반 날짜를 합쳐서 전체 parse 결과를 도출
          var parsed = {};
          for (var _i4 = 0, _units2 = units; _i4 < _units2.length; _i4++) {
            var _common_parsed$unit;
            var unit = _units2[_i4];
            if (common_parsed[unit] != null && relative_parsed[unit] != null) parsed[unit] = relative_parsed[unit]; // 둘 다 있으면 relative_parsed 를 우선시
            else if (common_parsed[unit] != null || relative_parsed[unit] != null) parsed[unit] = (_common_parsed$unit = common_parsed[unit]) !== null && _common_parsed$unit !== void 0 ? _common_parsed$unit : relative_parsed[unit];
          }
          filteredString = filteredString.replace(/\s+/g, ' ');
          ret = {
            parse: parsed,
            string: trim ? filteredString.trim() : filteredString
          };
        }
      }
      if (getString) return ret;else return ret.parse;
    }
  }, {
    key: "parse",
    value: function parse(dateString) {
      var getString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var trim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var std = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DateTime.now();
      var locale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'ko-KR';
      var ret = DateTime._parse(dateString, getString, filterIncludeEnding, trim, std, locale);
      if (getString) return {
        parse: ret.parse == null ? null : DateTime.fromObject(ret.parse),
        string: ret.string
      };else return ret == null ? null : DateTime.fromObject(ret);
    }
  }, {
    key: "parseDuration",
    value: function parseDuration(dateString) {
      var getString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var std = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DateTime.now();
      var locale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'ko-KR';
      var split = dateString.split('부터');
      var ret;
      if (split.length === 1) {
        var parse = DateTime.parse(dateString, true, filterIncludeEnding, true, std, locale);
        ret = {
          parse: {
            from: split[0].includes('까지') ? std : parse.parse,
            to: parse.parse
          },
          string: parse.string
        };
      } else {
        var left = split[0];
        var right = split.slice(1).join('부터');
        var _DateTime$parse = DateTime.parse(left, true, filterIncludeEnding, false, std, locale),
          leftParse = _DateTime$parse.parse,
          leftFString = _DateTime$parse.string;
        var _DateTime$parse2 = DateTime.parse(right, true, filterIncludeEnding, false, std, locale),
          rightParse = _DateTime$parse2.parse,
          rightFString = _DateTime$parse2.string;
        var leftDT = leftParse == null ? null : DateTime.fromObject(leftParse);
        var rightDT = rightParse == null ? null : DateTime.fromObject(rightParse);
        if (leftDT != null && rightDT != null) {
          // 내일 3시부터 4시까지 -> 그냥 번역하면 '내일 3시' ~ '오늘 4시' 가 되지만 사실은 '4시'는 '내일 4시'를 뜻함
          if (!leftDT.lt(rightDT)) {
            var rightDT_ = DateTime.fromObject(Object.assign(leftParse, rightParse));
            if (leftDT.lt(rightDT_)) rightDT = rightDT_;
            // 내일 9시부터 10시 -> '10시'는 오전으로 자동 해석되므로 만약 오후로 바꿨을 때 leftDT < rightDT 를 만족해 합당하다면 시도.
            else if (rightDT_.hour < 12 && leftDT.lt(rightDT_.add({
              hour: 12
            }))) rightDT = rightDT_.add({
              hour: 12
            });else rightDT = leftDT;
          }
        }
        ret = {
          parse: {
            from: leftDT,
            to: rightDT
          },
          string: (leftFString + rightFString).replace(/\s+/g, ' ').trim()
        };
      }
      if (getString) return ret;else return ret.parse;
    }

    // static parse(dateString, locale = 'ko-KR') {
    // 	return DateTime.fromObject(...DateTime._parse(dateString, locale));
    // }
    //
    // static _parse(dateString, locale = 'ko-KR') {
    // 	// sanitize dateString
    // 	// '  2020년  3월  2일  ' -> '2020년 3월 2일'
    // 	dateString = dateString.trim().replace(/\s+/g, ' ');
    //
    // 	const cultureInfo = getCultureInfo(locale);
    //
    // 	const isNumberRegex = /^[+-]?\d+(?:\.\d*)?$/;
    // 	const isRelativeObject = obj => obj.constructor === Object && 'diff' in obj && typeof obj.diff === 'number' && Object.keys(obj).length === 1;
    // 	const isHomonymObject = obj => obj.constructor === Object && 'homonym' in obj && Array.isArray(obj.homonym) && Object.keys(obj).length === 1;
    //
    // 	const keywords = {
    // 		units: new Set([ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ]),
    // 		meridian: new Set([ 'am', 'pm' ]),
    // 		weekdays: new Set([ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]),
    // 		times: new Set([ 'morning', 'noon', 'afternoon', 'evening', 'night', 'midnight' ]),
    // 		counts: new Set([ 'th', 'half', 'end' ]),
    // 		relative: new Set([ 'ago', 'after' ]),
    // 		standard: new Set([ 'from', 'of' ]),
    // 	};
    //
    // 	const homonyms = new Set(Object.keys(cultureInfo.translate).map(k => isHomonymObject(cultureInfo.translate[k]) ? k : null).filter(e => e != null));
    //
    // 	// 1. parse ISO 8601 format
    // 	const parse1 = () => {
    // 		const RE_ISO = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})(?:\.(?<millisecond>\d{3}))?Z$/;
    // 		const isoMatch = dateString.match(RE_ISO);
    //
    // 		if (isoMatch) {
    // 			return {
    // 				year: isoMatch.groups.year,
    // 				month: isoMatch.groups.month,
    // 				day: isoMatch.groups.day,
    // 				hour: isoMatch.groups.hour,
    // 				minute: isoMatch.groups.minute,
    // 				second: isoMatch.groups.second,
    // 				millisecond: isoMatch.groups.millisecond
    // 			};
    // 		}
    // 	};
    //
    // 	// 2. parse common date format
    // 	const parse2 = () => {
    // 		let meridiem = 'pm';
    //
    // 		for (let key in cultureInfo.translate) {
    // 			if (keywords.meridiems.has(cultureInfo.translate[key])) // am, pm이 value인 key들
    // 				meridiem = cultureInfo.translate[key];
    // 		}
    //
    // 		const RE_DATE = /(?:(?<year>\d{4})[-.\/])? *(?<month>\d{1,2})[-.\/] *(?<day>\d{1,2})\.?/;
    // 		const RE_TIME = /(?<hour>\d{1,2}):(?<minute>\d{1,2})(?::(?<second>\d{1,2})(?:\.(?<millisecond>\d{1,3}))?)?/;
    //
    // 		const dateMatch = dateString.match(RE_DATE);
    // 		const timeMatch = dateString.match(RE_TIME);
    //
    // 		if (dateMatch || timeMatch) {
    // 			let year = dateMatch?.groups?.year;
    // 			let month = dateMatch?.groups?.month;
    // 			let day = dateMatch?.groups?.day;
    // 			let hour = timeMatch?.groups?.hour;
    // 			let minute = timeMatch?.groups?.minute;
    // 			let second = timeMatch?.groups?.second;
    // 			let millisecond = timeMatch?.groups?.millisecond;
    //
    // 			if (hour != null && hour < 12 && meridiem === 'pm')
    // 				hour += 12;
    //
    // 			return { year, month, day, hour, minute, second, millisecond };
    // 		}
    // 	};
    //
    // 	// 3. analyze in tokens
    // 	const parse3 = () => {
    // 		let standard = {};
    //
    // 		// sort by length (desc), then by dictionary order (asc)
    // 		// desc로 정렬하기 때문에, '매주' 와 '주' 에서 '매주'에 먼저 매칭될 수 있게 함.
    // 		const keys = Object.keys(cultureInfo.translate);
    // 		keys.sort((a, b) => a.length !== b.length ? b.length - a.length : a.localeCompare(b));
    //
    // 		// tokenize dateString
    // 		// '2020년 3월 2일 12시 34분 56초' -> [2020, 'year', 3, 'month', 2, 'day', 12, 'hour', 34, 'minute', 56, 'second']
    // 		const getTokens = dstr => {
    // 			let startIdx = 0;
    // 			let chucks = [];
    // 			let found = false;
    // 			let foundBefore = false;
    //
    // 			while (startIdx < dstr.length) {
    // 				foundBefore = found;
    // 				found = false;
    //
    // 				for (let key of keys) {
    // 					if (dstr.startsWith(key, startIdx)) {
    // 						let value = cultureInfo.translate[key];
    //
    // 						if (chucks.length >= 1 && typeof chucks[chucks.length - 1] === 'number' && typeof value === 'number') {
    // 							// 십이 -> [10, 2] -> 10+2
    // 							// 이십 -> [2, 10] -> 2*10
    // 							if (chucks[chucks.length - 1] > value)
    // 								chucks[chucks.length - 1] += value;
    // 							else
    // 								chucks[chucks.length - 1] *= value;
    // 						}
    // 						else if (chucks.length >= 1 && isRelativeObject(chucks[chucks.length - 1]) && isRelativeObject(value)) {
    // 							// 다음 내일 -> [{diff: 1}, {diff: 2}] -> {diff: 1+2}
    // 							// 내일 다음 -> [{diff: 2}, {diff: 1}] -> {diff: 2+1}
    //
    // 							chucks[chucks.length - 1].diff += value.diff;
    // 						}
    // 						else if (Array.isArray(value))
    // 							chucks.push(...value);
    // 						else
    // 							chucks.push(value);
    //
    // 						startIdx += key.length;
    // 						found = true;
    //
    // 						break;
    // 					}
    // 				}
    //
    // 				if (!found) {
    // 					if (chucks.length === 0)
    // 						chucks.push('');
    //
    // 					if (foundBefore)
    // 						chucks.push(dstr[startIdx++]);
    // 					else
    // 						chucks[chucks.length - 1] += dstr[startIdx++];
    // 				}
    // 			}
    //
    // 			return chucks.map(e => isNumberRegex.test(e) ? parseFloat(e) : e);
    // 		};
    //
    // 		let splited = dateString.split(' ').map(getTokens).flat();
    // 		let tokens = [];
    //
    // 		/**
    // 		 * 공백이 없는 문자열에서의 토큰들끼리는 잘 merge 되었으나, 공백이 없는 문자열들끼리의 토큰들끼리의 merge를 처리해야함.
    // 		 * ex. 다음 다음다음 날 -> [다음, 다음다음, 날] -> [{diff: 1}, {diff: 2}, 'day'] -> [{diff: 1+2}, 'day']
    // 		 * 위의 예시에서 1+2를 하는 작업을 아래 코드에서 수행함.
    // 		 */
    // 		while (splited.length > 0) {
    // 			let value = splited.shift();
    //
    // 			if (tokens.length >= 1 && typeof tokens[tokens.length - 1] === 'number' && typeof value === 'number') {
    // 				if (tokens[tokens.length - 1] > value)
    // 					tokens[tokens.length - 1] += value;
    // 				else
    // 					tokens[tokens.length - 1] *= value;
    // 			}
    // 			else if (tokens.length >= 1 && isRelativeObject(tokens[tokens.length - 1]) && isRelativeObject(value)) {
    // 				tokens[tokens.length - 1].diff += value.diff;
    // 			}
    // 			else if (Array.isArray(value))
    // 				tokens.push(...value);
    // 			else
    // 				tokens.push(value);
    // 		}
    //
    // 		// 세 시간 반 -> 3.5시간
    // 		for (let i = 2; i < tokens.length; i++) {
    // 			if (keywords.units.has(tokens[i - 1]) &&
    // 				keywords.counts.has(tokens[i]) &&
    // 				tokens[i] === 'half' &&
    // 				typeof tokens[i - 2] === 'number'
    // 			) {
    // 				tokens[i - 2] += 0.5;
    // 				tokens.splice(i, 1);
    // 				i--;
    // 			}
    // 		}
    //
    // 		// [3.5, '시간', '뒤'] -> [{ diff: 3.5 }, '시간']
    // 		let i = 0;
    // 		while (i < tokens.length) {
    // 			if (keywords.relative.has(tokens[i])) {
    // 				if (!standard)
    // 					standard = DateTime.now();
    //
    // 				const multiplier = tokens[i] === 'ago' ? -1 : 1;
    //
    // 				for (let j = i - 1; j >= 0; j--) {
    // 					if (keywords.standard.has(tokens[j]))
    // 						break;
    //
    // 					let diff;
    //
    // 					if (typeof tokens[j] === 'number')
    // 						diff = tokens[j] * multiplier;
    // 					else if (isRelativeObject(tokens[j]))
    // 						diff = tokens[j].diff * multiplier;
    //
    // 					if (diff != null)
    // 						tokens[j] = { diff };
    // 				}
    //
    // 				tokens.splice(i, 1);
    // 				i = -1;
    // 			}
    // 			i++;
    // 		}
    //
    // 		// [2022, 'year', 3, 'month', 2, 'day', 12, 'hour', 34, 'minute', 56, 'second']
    // 		const absoluteParse = () => {
    // 			const dateObject = {};
    // 			let meridiem = 'pm';
    //
    // 			for (let i = 0; i < tokens.length; i++) {
    // 				let token = tokens[i];
    //
    // 				if (keywords.units.has(token)) {    // year, month, week, day, hour, minute, second, millisecond 감지
    // 					if (cultureInfo['isTurnReversed'] === false) {   // 한국어처럼 '2022년' 과 같이 뒤에 단위가 붙는 경우
    // 						if (typeof tokens[i - 1] === 'number') {
    // 							dateObject[token] = tokens[i - 1];
    // 						}
    // 						// else
    // 						// 	throw new Error(`invalid format: { dateObject[${token}]: ${tokens[i - 1]} }`);
    // 					}
    // 					else {    // 영어처럼 'year 2022' 와 같이 앞에 단위가 붙는 경우
    // 						if (typeof tokens[i + 1] === 'number')
    // 							dateObject[token] = tokens[i + 1];
    // 						// else
    // 						// 	throw new Error(`invalid format: { dateObject[${token}]: ${tokens[i + 1]} }`);
    // 					}
    // 				}
    // 				else if (keywords.meridiems.has(token)) {
    // 					meridiem = token;
    // 				}
    // 				else if ('hour' in dateObject) {
    // 					if (keywords.meridiems.has(token))    // am, pm
    // 						meridiem = token;
    //
    // 					if (dateObject['hour'] < 12 && meridiem === 'pm')
    // 						dateObject['hour'] += 12;
    // 				}
    // 			}
    //
    // 			return dateObject;
    // 		};
    //
    // 		// [3, 'year', 'ago']
    // 		const relativeParse = () => {
    // 			const dateObject = {};
    // 			let standard_now = DateTime.now();
    //
    // 			for (let i = 0; i < tokens.length; i++) {
    // 				let token = tokens[i];
    //
    // 				if (keywords.standard.has(token)) {     // 3월 3일로부터
    // 					standard = DateTime._parse(tokens.slice(0, i).join(' '), locale)[0];
    // 					standard_now = DateTime.fromObject(standard);
    // 				}
    // 				else if (keywords.counts.has(token)) {    // [half] week, [end] month, 11 [th] month, 11 [th] sunday, ...
    // 					tokens[i + 1] ??= 'millisecond';    // 2023년의 마지막 -> 2023년 12월 31일 23시 59분 59초 999밀리초
    //
    // 					if (keywords.units.has(tokens[i + 1]) || keywords.weekdays.has(tokens[i + 1])) {
    // 						let tokenFront = tokens[i - 1]; // 11, 3, 1, ...
    // 						// token;  // th, half, end
    // 						let tokenBack = tokens[i + 1];  // month, week, day, sunday, ...
    //
    // 						let amount;
    // 						if (token === 'half')
    // 							amount = length => Math.floor(length / 2);
    // 						else if (token === 'th') {
    // 							if (typeof tokenFront !== 'number')
    // 								throw new Error(`invalid format: "${tokenFront} th"`);
    // 							amount = length => Math.min(tokenFront, length);
    // 						}
    // 						else if (token === 'end')
    // 							amount = length => length;
    //
    // 						switch (tokenBack) {
    // 							case 'year': {
    // 								if (token === 'half')
    // 									dateObject['day'] = amount(DateTime.lengthOfYear(dateObject['year'] ?? standard_now.year));
    // 								else
    // 									throw new Error('invalid format: "th/end 해"');
    //
    // 								dateObject['hour'] = 0;
    // 								dateObject['minute'] = 0;
    // 								dateObject['second'] = 0;
    // 								dateObject['millisecond'] = 0;
    // 								break;
    // 							}
    // 							case 'month': {
    // 								if (token === 'half') {
    // 									dateObject['day'] = amount(DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month));
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								else {
    // 									dateObject['month'] = amount(12);
    // 									dateObject['day'] = 1;
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'week': {
    // 								if (token === 'half') {
    // 									dateObject['day'] = standard_now.day + (amount(7) - standard_now.weekday + 7) % 7;
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								else {
    // 									dateObject['day'] = standard_now.day + (0 - dateObject['weekday'] + 7) % 7;
    // 									let lengthOfMonth = DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month);
    //
    // 									// 만약 23일이 일요일이라면 16, 9, 2일이 셋째주, 둘째주, 셋째주가 됨
    // 									// 23 % 7 == 2 이므로 2일이 첫주의 시작이 되어야 함
    // 									// 이 달의 길이가 31일이라면 (31 - 2) // 7 == 4 이므로 4주차가 됨 (2, 9, 16, 23, 30)
    // 									let first = dateObject['day'] % 7;
    // 									let weeks = [ first ];
    // 									for (let i = first + 7; i <= lengthOfMonth; i += 7)
    // 										weeks.push(i);
    //
    // 									dateObject['day'] = weeks[amount(weeks.length)];
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'day': {
    // 								if (token === 'half') {
    // 									dateObject['hour'] = amount(24);
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 									// else if (token === 'end') {
    // 									//
    // 								// }
    // 								else {  // th
    // 									dateObject['day'] = amount(DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month));
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'hour': {
    // 								if (token === 'half') {
    // 									dateObject['minute'] = amount(60);
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								else {
    // 									dateObject['hour'] = amount(24);
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'minute': {
    // 								if (token === 'half') {
    // 									dateObject['second'] = amount(60);
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								else {
    // 									dateObject['minute'] = amount(60);
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'second': {
    // 								if (token === 'half') {
    // 									dateObject['millisecond'] = amount(1000);
    // 								}
    // 								else {
    // 									dateObject['second'] = amount(60);
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 								break;
    // 							}
    // 							case 'millisecond': {
    // 								if (token === 'half')
    // 									throw new Error('invalid format: "half 밀리초"');
    // 								else
    // 									dateObject['millisecond'] = amount(1000);
    // 								break;
    // 							}
    // 							default: {  // weekday
    // 								if (token === 'half')
    // 									throw new Error('invalid format: "half 요일"');
    // 								else {
    // 									dateObject['day'] = standard_now.day + (DateTime.getWeekDayFromName(tokenBack, locale = 'en-US') - standard_now.weekday + 7) % 7;
    // 									let lengthOfMonth = DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month);
    //
    // 									let first = dateObject['day'] % 7;
    // 									let weeks = [ first ];
    // 									for (let i = first + 7; i <= lengthOfMonth; i += 7)
    // 										weeks.push(i);
    //
    // 									dateObject['day'] = weeks[amount(weeks.length)];
    // 									dateObject['hour'] = 0;
    // 									dateObject['minute'] = 0;
    // 									dateObject['second'] = 0;
    // 									dateObject['millisecond'] = 0;
    // 								}
    // 							}
    // 						}
    // 					}
    // 				}
    // 				else if (keywords.times.has(token)) {
    // 					dateObject['minute'] = 0;
    // 					dateObject['second'] = 0;
    // 					dateObject['millisecond'] = 0;
    //
    // 					if (token === 'morning')
    // 						dateObject['hour'] = 9;
    // 					else if (token === 'noon')
    // 						dateObject['hour'] = 12;
    // 					else if (token === 'afternoon')
    // 						dateObject['hour'] = 15;
    // 					else if (token === 'evening')
    // 						dateObject['hour'] = 18;
    // 					else if (token === 'night')
    // 						dateObject['hour'] = 21;
    // 					else if (token === 'midnight') {
    // 						dateObject['hour'] = 0;
    // 						dateObject['day'] = dateObject['day'] ?? standard_now.day + 1;
    // 					}
    // 				}
    // 				else if (isRelativeObject(token)) {
    // 					if (keywords.units.has(tokens[i + 1])) {
    // 						dateObject[tokens[i + 1]] = standard_now[tokens[i + 1]] + token.diff;
    // 					}
    // 				}
    // 			}
    //
    // 			return dateObject;
    // 		};
    //
    // 		const absolute = absoluteParse();
    // 		const relative = relativeParse();
    // 		const result = Object.assign(absolute, relative);
    //
    // 		if (Object.keys(result).length > 0)
    // 			return [ result, standard ];
    // 	};
    //
    // 	let parsed = parse1() ?? parse2();
    //
    // 	if (parsed != null)
    // 		return [ parsed, undefined ];
    // 	else {
    // 		let parsed = parse3();
    //
    // 		if (parsed != null)
    // 			return parsed;
    // 		else
    // 			throw new Error('Invalid date string: ' + dateString);
    // 	}
    // }
  }, {
    key: "now",
    value: function now() {
      return new DateTime(new $D());
    }
  }, {
    key: "today",
    value: function today() {
      var now = new $D();
      return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate()));
    }
  }, {
    key: "tomorrow",
    value: function tomorrow() {
      var now = new $D();
      return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }
  }, {
    key: "yesterday",
    value: function yesterday() {
      var now = new $D();
      return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    }
  }, {
    key: "sunday",
    value: function sunday() {
      var diff = (0 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "monday",
    value: function monday() {
      var diff = (1 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "tuesday",
    value: function tuesday() {
      var diff = (2 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "wednesday",
    value: function wednesday() {
      var diff = (3 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "thursday",
    value: function thursday() {
      var diff = (4 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "friday",
    value: function friday() {
      var diff = (5 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "saturday",
    value: function saturday() {
      var diff = (6 - new $D().getDay() + 7) % 7;
      return DateTime.today().add({
        day: diff
      });
    }
  }, {
    key: "january",
    value: function january(day) {
      var _day3;
      day = (_day3 = day) !== null && _day3 !== void 0 ? _day3 : 1;
      return new DateTime({
        month: 1,
        day: day
      });
    }
  }, {
    key: "february",
    value: function february(day) {
      var _day4;
      day = (_day4 = day) !== null && _day4 !== void 0 ? _day4 : 1;
      return new DateTime({
        month: 2,
        day: day
      });
    }
  }, {
    key: "march",
    value: function march(day) {
      var _day5;
      day = (_day5 = day) !== null && _day5 !== void 0 ? _day5 : 1;
      return new DateTime({
        month: 3,
        day: day
      });
    }
  }, {
    key: "april",
    value: function april(day) {
      var _day6;
      day = (_day6 = day) !== null && _day6 !== void 0 ? _day6 : 1;
      return new DateTime({
        month: 4,
        day: day
      });
    }
  }, {
    key: "may",
    value: function may(day) {
      var _day7;
      day = (_day7 = day) !== null && _day7 !== void 0 ? _day7 : 1;
      return new DateTime({
        month: 5,
        day: day
      });
    }
  }, {
    key: "june",
    value: function june(day) {
      var _day8;
      day = (_day8 = day) !== null && _day8 !== void 0 ? _day8 : 1;
      return new DateTime({
        month: 6,
        day: day
      });
    }
  }, {
    key: "july",
    value: function july(day) {
      var _day9;
      day = (_day9 = day) !== null && _day9 !== void 0 ? _day9 : 1;
      return new DateTime({
        month: 7,
        day: day
      });
    }
  }, {
    key: "august",
    value: function august(day) {
      var _day10;
      day = (_day10 = day) !== null && _day10 !== void 0 ? _day10 : 1;
      return new DateTime({
        month: 8,
        day: day
      });
    }
  }, {
    key: "september",
    value: function september(day) {
      var _day11;
      day = (_day11 = day) !== null && _day11 !== void 0 ? _day11 : 1;
      return new DateTime({
        month: 9,
        day: day
      });
    }
  }, {
    key: "october",
    value: function october(day) {
      var _day12;
      day = (_day12 = day) !== null && _day12 !== void 0 ? _day12 : 1;
      return new DateTime({
        month: 10,
        day: day
      });
    }
  }, {
    key: "november",
    value: function november(day) {
      var _day13;
      day = (_day13 = day) !== null && _day13 !== void 0 ? _day13 : 1;
      return new DateTime({
        month: 11,
        day: day
      });
    }
  }, {
    key: "december",
    value: function december(day) {
      day = day || 1;
      return new DateTime({
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
      return l(end - 1) - l(start) + (DateTime.isLeapYear(start) ? 1 : 0); // [start, end)
    }
  }, {
    key: "lengthOfMonth",
    value: function lengthOfMonth(year, month) {
      return [0, 31, DateTime.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
  }, {
    key: "lengthOfYear",
    value: function lengthOfYear(year) {
      return DateTime.isLeapYear(year) ? 366 : 365;
    }
  }, {
    key: "getWeekdayFromName",
    value: function getWeekdayFromName(weekDayName) {
      var startOnMon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ko-KR';
      var cultureInfo = getCultureInfo(locale);
      var W = cultureInfo['W'];
      var WW = cultureInfo['WW'];
      if (startOnMon) {
        W = W.slice(1).concat(W[0]);
        WW = WW.slice(1).concat(WW[0]);
      }
      var ret = W.map(function (e) {
        return e.toLowerCase();
      }).indexOf(weekDayName.toLowerCase());
      if (ret === -1) ret = WW.map(function (e) {
        return e.toLowerCase();
      }).indexOf(weekDayName.toLowerCase());
      if (ret === -1) throw new Error('Invalid weekDayName, not found ' + weekDayName);
      return ret;
    }
  }]);
}();
exports.DateTime = DateTime;
exports.Date = Date;
exports.Time = Time;
exports.$D = $D; // 원래 JS의 Date 객체