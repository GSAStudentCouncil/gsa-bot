"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _StructuredCommand, _NaturalCommand, _Registry;
function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../DateTime'),
  DateTime = _require.DateTime;
require('../polyfill');
var $ = "/sdcard/msgbot/global_modules/BotOperator/Command";
var IS_DIST = true;
var COMPRESS = "\u200B".repeat(500);
function josa(str, josa) {
  var hasJong = (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;
  switch (josa) {
    case '이가':
    case '가':
      return str + (hasJong ? '이가' : '가');
    case '을':
    case '를':
      return str + (hasJong ? '을' : '를');
    case '은':
    case '는':
      return str + (hasJong ? '은' : '는');
    case '으로':
    case '로':
      return str + (hasJong ? '으로' : '로');
    case '과':
    case '와':
      return str + (hasJong ? '과' : '와');
    default:
      return str + josa;
  }
}
;
var Command = /*#__PURE__*/function () {
  function Command(name, icon, description, _execute, _executeLazy, _executeCron, cronJobs, channels, examples) {
    _classCallCheck(this, Command);
    if (this.constructor === Command) throw new TypeError("Cannot construct abstract class");
    if (name == null) throw new TypeError("name is required");
    if (icon == null) throw new TypeError("icon is required");
    if (description == null) throw new TypeError("description is required");
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.channels = channels !== null && channels !== void 0 ? channels : [];
    this.cronJobs = cronJobs !== null && cronJobs !== void 0 ? cronJobs : {};
    this.examples = examples !== null && examples !== void 0 ? examples : [];
    this._execute = _execute !== null && _execute !== void 0 ? _execute : function (self, chat, channel, args) {};
    this._executeLazy = _executeLazy !== null && _executeLazy !== void 0 ? _executeLazy : function (self, chat, prevChat, channel, prevChannel, args) {};
    this._executeCron = _executeCron !== null && _executeCron !== void 0 ? _executeCron : function (self, index, datetime) {};
    this.lazy = _executeLazy != null;
  }
  return _createClass(Command, [{
    key: "execute",
    value: function execute(chat, channel, args) {
      return this._execute(this, chat, channel, args);
    }
  }, {
    key: "executeLazy",
    value: function executeLazy(chat, prevChat, channel, prevChannel, args) {
      return this._executeLazy(this, chat, prevChat, channel, prevChannel, args);
    }
  }, {
    key: "executeCron",
    value: function executeCron(index, datetime) {
      return this._executeCron(this, index, datetime);
    }
  }, {
    key: "register",
    value: function register() {
      Registry.CommandRegistry.register(this);
    }
  }, {
    key: "createManual",
    value: function createManual(contents) {
      var ret = ["\uD83E\uDDE9 '".concat(this.name, "' \uBA85\uB839\uC5B4 \uB3C4\uC6C0\uB9D0").concat(COMPRESS), '——————————', this.description, ''].concat(_toConsumableArray(contents), ['']);
      if (this.cronJobs.length > 0) {
        ret.push('📌 자동 실행 주기');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(this.cronJobs.map(function (_ref) {
          var comment = _ref.comment;
          return "\xB7 ".concat(comment);
        })));
        ret.push('');
      }
      if (this.channels.length > 0) {
        ret.push('📌 활성화된 방');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(this.channels.map(function (channel) {
          return "\xB7 ".concat(channel.customName);
        })));
        ret.push('');
      }
      if (this.examples.length > 0) {
        ret.push('📌 예시');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(this.examples.map(function (e) {
          return "".concat(e);
        })));
      }
      return ret.join('\n');
    }
  }, {
    key: "manual",
    value: function manual(formats) {
      throw new Error("Not implemented");
    }
  }]);
}();
var Arg = /*#__PURE__*/function () {
  function Arg(name) {
    _classCallCheck(this, Arg);
    if (this.constructor === Arg) throw new TypeError("Cannot construct abstract class");
    this.name = name;
    this.many = false;
    this.includeEmpty = false;
  }
  return _createClass(Arg, [{
    key: "toRegExp",
    value: function toRegExp() {
      throw new Error("Not implemented");
    }
  }, {
    key: "parse",
    value: function parse(value) {
      throw new Error("Not implemented");
    }
  }]);
}();
var IntArg = /*#__PURE__*/function (_Arg) {
  function IntArg(name, min, max) {
    var _this;
    _classCallCheck(this, IntArg);
    _this = _callSuper(this, IntArg, [name]);
    _this.min = min;
    _this.max = max;
    _this._min_str = '이상';
    _this._max_str = '이하';
    return _this;
  }
  _inherits(IntArg, _Arg);
  return _createClass(IntArg, [{
    key: "toRegExp",
    value: function toRegExp() {
      if (this.min && this.max && this.min > this.max) throw new RangeError("min must be less than or equal to max");
      var ret = new RegExp("[+-]?\\d" + (this.includeEmpty ? "*" : "+"));
      if (!this.many) return ret;else return new RegExp("(?:".concat(ret.source, "\\s?)").concat(this.includeEmpty ? "*" : "+"));
    }
  }, {
    key: "parse",
    value: function parse(value) {
      var _this2 = this;
      if (value != null && !this.toRegExp().test(value)) return false;
      if (this.many) {
        if (value == null) return [];
        var ret = value.split(' ').map(Number);
        if (this.min && ret.some(function (v) {
          return v < _this2.min;
        })) return false;else if (this.max && ret.some(function (v) {
          return v > _this2.max;
        })) return false;else return ret;
      } else {
        if (value == null) return null;
        var _ret = Number(value);
        if (this.min && _ret < this.min) return false;else if (this.max && _ret > this.max) return false;else return _ret;
      }
    }
  }]);
}(Arg);
var StrArg = /*#__PURE__*/function (_Arg2) {
  function StrArg(name, length, minLength, maxLength) {
    var _this3;
    _classCallCheck(this, StrArg);
    _this3 = _callSuper(this, StrArg, [name]);
    _this3.length = length;
    _this3.minLength = minLength;
    _this3.maxLength = maxLength;
    _this3._length_str_ = '글자';
    _this3._minlength_str = '글자 이상';
    _this3._maxlength_str = '글자 이하';
    return _this3;
  }
  _inherits(StrArg, _Arg2);
  return _createClass(StrArg, [{
    key: "toRegExp",
    value: function toRegExp() {
      if (this.length && (this.minLength || this.maxLength)) throw new Error("length cannot be used with minLength or maxLength");
      if (this.minLength && this.maxLength && this.minLength > this.maxLength) throw new RangeError("minLength must be less than or equal to maxLength");
      if (this.minLength && this.minLength < 1) throw new RangeError("minLength must be greater than or equal to 1");
      if (this.maxLength && this.maxLength < 1) throw new RangeError("maxLength must be greater than or equal to 1");
      if (!this.minLength && this.maxLength) this.minLength = 1;
      var ret;
      if (this.length) ret = new RegExp("\\S{".concat(this.length, "}"));else if (this.minLength && this.maxLength) ret = new RegExp("\\S{".concat(this.minLength, ",").concat(this.maxLength, "}"));else if (this.minLength) ret = new RegExp("\\S{".concat(this.minLength, ",}"));else ret = new RegExp("\\S".concat(this.includeEmpty ? "*" : "+"));
      if (!this.many) return ret;else return new RegExp("(?:".concat(ret.source, "\\s?)").concat(this.includeEmpty ? "*" : "+"));
    }
  }, {
    key: "parse",
    value: function parse(value) {
      if (value != null && !this.toRegExp().test(value)) return false;
      if (this.many) {
        if (value == null) return [];
        return value.split(' ');
      } else {
        if (value == null) return null;
        return value;
      }
    }
  }]);
}(Arg);
var DateArg = /*#__PURE__*/function (_Arg3) {
  function DateArg(name, duration) {
    var _this4;
    _classCallCheck(this, DateArg);
    _this4 = _callSuper(this, DateArg, [name]);
    _this4.duration = duration;
    return _this4;
  }
  _inherits(DateArg, _Arg3);
  return _createClass(DateArg, [{
    key: "toRegExp",
    value: function toRegExp() {
      return /[0-9+\-ㄱ-ㅎㅏ-ㅣ가-힣:./ ]+/;
    }
  }, {
    key: "parse",
    value: function parse(value) {
      if (value != null && !this.toRegExp().test(value)) return false;
      var parsed;
      if (!this.duration) {
        parsed = DateTime.parse(value);
        if (parsed == null) return false;
      } else {
        parsed = DateTime.parseDuration(value);
        if (!(parsed.from && parsed.to)) return false;
      }
      return parsed;
    }
  }]);
}(Arg);
var mapType = {
  'int': IntArg,
  'str': StrArg,
  'date': DateArg
};
var mapStr = {
  'int': '숫자',
  'str': '문자열',
  'date': ['날짜', '기간']
};
var StructuredCommand = /*#__PURE__*/function (_Command) {
  function StructuredCommand(options) {
    var _this5;
    _classCallCheck(this, StructuredCommand);
    if (options.usage == null) throw new TypeError("usage is required");
    _this5 = _callSuper(this, StructuredCommand, [options.name, options.icon, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples]);
    _this5.usage = options.usage;
    _this5._arguments = [];
    var args = [];
    var regexApplied = _this5.usage.replace(/\s*<.+?>/g, function (m) {
      var pos = m.indexOf('<');
      var whitespaces = m.slice(0, pos);
      var _m$slice$split = m.slice(pos + 1, -1).split(/\s+/),
        _m$slice$split2 = _toArray(_m$slice$split),
        nameAndType = _m$slice$split2[0],
        properties = _m$slice$split2.slice(1);
      var _nameAndType$split = nameAndType.split(":"),
        _nameAndType$split2 = _slicedToArray(_nameAndType$split, 2),
        name = _nameAndType$split2[0],
        type = _nameAndType$split2[1];
      _this5._arguments.push([name, type]);
      properties = properties.map(function (o) {
        var splited = o.split("=");
        if (!Number.isNaN(Number(splited[1]))) {
          splited[1] = Number(splited[1]);
        } else if (splited[1] === 'true') {
          splited[1] = true;
        } else if (splited[1] === 'false') {
          splited[1] = false;
        }
        return splited;
      });
      var k;
      for (var key in mapType) {
        if (type.startsWith(key)) {
          k = key;
          break;
        }
      }
      if (k == null) throw new TypeError("Invalid type: ".concat(type));
      args.push(new mapType[k](name));
      var _iterator = _createForOfIteratorHelper(properties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            _key = _step$value[0],
            value = _step$value[1];
          args[args.length - 1][_key] = value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      type = type.slice(k.length).trim();
      _this5._arguments[_this5._arguments.length - 1][1] = k;
      if (type === '[]') {
        if (k !== 'date') args[args.length - 1].many = true;
      } else if (type === '?') {
        args[args.length - 1].includeEmpty = true;
      } else if (type === '[]?') {
        if (k !== 'date') {
          args[args.length - 1].many = true;
          args[args.length - 1].includeEmpty = true;
        }
      } else if (type !== '') {
        throw new TypeError("Invalid type options: ".concat(type));
      }
      var ret = "".concat(whitespaces, "(").concat(args[args.length - 1].toRegExp().source, ")");
      if (args[args.length - 1].includeEmpty) return "(?:".concat(ret, ")?");else return ret;
    });
    _this5.args = args;
    _this5.regex = new RegExp("^".concat(regexApplied, "$"));
    return _this5;
  }
  _inherits(StructuredCommand, _Command);
  return _createClass(StructuredCommand, [{
    key: "manual",
    value: function manual(formats) {
      var _this6 = this;
      var ret = ['📌 입력 양식', '——'];
      var usage = this.usage.replace(/<.+?>/g, function (m) {
        var name = m.slice(1, m.indexOf(':'));
        if (_this6.args.find(function (arg) {
          return arg.name === name;
        }).many) name = "".concat(name, "...");
        return "<".concat(name, ">");
      });
      ret.push(usage);
      var args = this.args.map(function (arg, i) {
        var argStr = _this6._arguments[i];
        var name = argStr[0];
        var typename = argStr[1] === 'date' ? mapStr['date'][Number(arg.duration)] : mapStr[argStr[1]];
        var properties = [];
        var endProperties = [];
        Object.keys(arg).forEach(function (key) {
          if (arg[key] && "_".concat(key, "_str") in arg)
            // null, undefined, 0, false 등이 아닐 경우
            properties.push("".concat(arg[key]).concat(arg["_".concat(key, "_str")]));else {
            if (key === 'many' && arg[key] === true) endProperties.push('여러 개 입력 가능');else if (key === 'includeEmpty' && arg[key] === true) endProperties.push('생략 허용');
          }
        });
        return "\xB7 ".concat(name, ": ").concat((properties.join(' ') + ' ' + typename).trim(), " ").concat(endProperties.length > 0 ? '(' + endProperties.join(', ') + ')' : '');
      });
      ret.push.apply(ret, _toConsumableArray(args));
      var manual = _get(_getPrototypeOf(StructuredCommand.prototype), "createManual", this).call(this, ret);
      for (var fmt in formats) {
        manual = manual.replaceAll("$".concat(fmt), formats[fmt]);
      }
      return manual;
    }
  }], [{
    key: "add",
    value: function add(options) {
      new StructuredCommand(options).register();
    }
  }]);
}(Command);
_StructuredCommand = StructuredCommand;
_defineProperty(StructuredCommand, "Builder", /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
    this.name = null;
    this.icon = null;
    this.description = null;
    this.usage = null;
    this.execute = null;
    this.executeLazy = null;
    this.executeCron = null;
    this.cronJobs = [];
    this.channels = [];
    this.examples = [];
  }
  return _createClass(_class, [{
    key: "setName",
    value: function setName(name, icon) {
      this.name = name;
      this.icon = icon;
      return this;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.description = description;
      return this;
    }
  }, {
    key: "setUsage",
    value: function setUsage(usage) {
      this.usage = usage;
      return this;
    }
  }, {
    key: "setExecute",
    value: function setExecute(execute, executeLazy) {
      this.execute = execute;
      if (executeLazy != null) this.executeLazy = executeLazy;
      return this;
    }
  }, {
    key: "setCronJob",
    value: function setCronJob(cronJobs, execute) {
      this.cronJobs = cronJobs;
      this.executeCron = execute;
      return this;
    }
  }, {
    key: "setChannels",
    value: function setChannels() {
      for (var _len = arguments.length, channels = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        channels[_key2] = arguments[_key2];
      }
      this.channels = channels.filter(Boolean);
      return this;
    }
  }, {
    key: "setExamples",
    value: function setExamples() {
      for (var _len2 = arguments.length, examples = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        examples[_key3] = arguments[_key3];
      }
      this.examples = examples.map(function (e) {
        return Array.isArray(e) ? e.map(function (e2, i) {
          return i == 0 ? e2 : '┗' + '━'.repeat(i - 1) + ' ' + e2;
        }).join('\n') + '\n' : e;
      });
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      if (this.name == null) throw new TypeError("name is required");
      if (this.icon == null) throw new TypeError("icon is required");
      if (this.description == null) throw new TypeError("description is required");
      if (this.usage == null) throw new TypeError("usage is required");
      if (this.execute == null) throw new TypeError("execute is required");
      return new _StructuredCommand({
        name: this.name,
        icon: this.icon,
        description: this.description,
        usage: this.usage,
        execute: this.execute,
        executeLazy: this.executeLazy,
        executeCron: this.executeCron,
        cronJobs: this.cronJobs,
        channels: this.channels,
        examples: this.examples
      });
    }
  }]);
}());
var NaturalCommand = /*#__PURE__*/function (_Command2) {
  function NaturalCommand(options) {
    var _this7;
    _classCallCheck(this, NaturalCommand);
    if (options.query == null) throw new TypeError("query is required");
    _this7 = _callSuper(this, NaturalCommand, [options.name, options.icon, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples]);
    _this7.query = options.query;
    _this7.useDateParse = options.useDateParse;
    _this7.useDuration = options.useDuration;
    _this7.filterIncludeEnding = options.filterIncludeEnding;
    _this7.dictionaryPath = options.dictionaryPath || 'dict.json';
    var dictionary = IS_DIST ? JSON.parse(FileStream.read("".concat($, "/").concat(_this7.dictionaryPath))) : require("./".concat(_this7.dictionaryPath));
    _this7.map = {};
    for (var tok in dictionary) {
      var _iterator2 = _createForOfIteratorHelper(dictionary[tok]),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var alias = _step2.value;
          _this7.map[alias] = tok;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    _this7.map = _objectEntries(_this7.map).sort(function (a, b) {
      return b[0].length - a[0].length;
    });
    return _this7;
  }
  _inherits(NaturalCommand, _Command2);
  return _createClass(NaturalCommand, [{
    key: "manual",
    value: function manual(formats) {
      var _this8 = this;
      var ret = ['📌 필수 포함 용어', '——'];
      var _loop = function _loop(key) {
        if (key === 'datetime') return 1; // continue
        var tmp = "\xB7 ".concat(josa(key, '를'), " \uC758\uBBF8\uD558\uB294 \uC6A9\uC5B4 (ex. ").concat(_this8.map.filter(function (e) {
          return e[1] === key;
        }).map(function (e) {
          return e[0];
        }).slice(0, 4).join(', '), ", ...) ");
        var humanize = function humanize(value) {
          return value instanceof DateTime ? value.humanize() : value;
        };
        if (typeof _this8.query[key] === 'function') tmp += "(\uC0DD\uB7B5 \uC2DC \uAE30\uBCF8\uAC12 = ".concat(humanize(_this8.query[key]()), ")");else if (_this8.query[key] != null && !Number.isNaN(_this8.query[key])) tmp += "(\uC0DD\uB7B5 \uC2DC \uAE30\uBCF8\uAC12 = ".concat(humanize(_this8.query[key]), ")");
        ret.push(tmp);
      };
      for (var key in this.query) {
        if (_loop(key)) continue;
      }
      if (this.useDateParse) {
        var tmp;
        if (this.useDuration) tmp = "\xB7 '\uAE30\uAC04'\uC744 \uC758\uBBF8\uD558\uB294 \uC6A9\uC5B4 (ex. \uB2E4\uC74C \uC8FC\uAE4C\uC9C0, \uB0B4\uC77C\uBD80\uD130 \uBAA8\uB808 \uC800\uB141\uAE4C\uC9C0, ...)";else tmp = "\xB7 '\uB0A0\uC9DC \uBC0F \uC2DC\uAC04'\uC744 \uC758\uBBF8\uD558\uB294 \uC6A9\uC5B4 (ex. 3\uC6D4 14\uC77C, \uB0B4\uC77C \uC800\uB141, 4\uC77C \uB4A4 5\uC2DC, ...)";
        var humanize = function humanize(value) {
          return value instanceof DateTime ? value.humanize() : value;
        };
        if (typeof this.query['datetime'] === 'function') tmp += "(\uC0DD\uB7B5 \uC2DC \uAE30\uBCF8\uAC12 = ".concat(humanize(this.query['datetime']()), ")");else if (this.query['datetime'] != null && !Number.isNaN(this.query['datetime'])) tmp += "(\uC0DD\uB7B5 \uC2DC \uAE30\uBCF8\uAC12 = ".concat(humanize(this.query['datetime']), ")");
        ret.push(tmp);
      }
      var manual = _get(_getPrototypeOf(NaturalCommand.prototype), "createManual", this).call(this, ret);
      for (var fmt in formats) {
        manual = manual.replaceAll("$".concat(fmt), formats[fmt]);
      }
      return manual;
    }
  }], [{
    key: "add",
    value: function add(options) {
      new NaturalCommand(options).register();
    }
  }]);
}(Command);
_NaturalCommand = NaturalCommand;
_defineProperty(NaturalCommand, "Builder", /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);
    this.name = null;
    this.icon = null;
    this.description = null;
    this.query = null;
    this.dictionaryPath = null;
    this.execute = null;
    this.executeLazy = null;
    this.executeCron = null;
    this.useDateParse = false;
    this.useDuration = false;
    this.filterIncludeEnding = true;
    this.cronJobs = [];
    this.channels = [];
    this.examples = [];
  }
  return _createClass(_class2, [{
    key: "setName",
    value: function setName(name, icon) {
      this.name = name;
      this.icon = icon;
      return this;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.description = description;
      return this;
    }
  }, {
    key: "setDictionaryPath",
    value: function setDictionaryPath(dictionaryPath) {
      this.dictionaryPath = dictionaryPath;
      return this;
    }
  }, {
    key: "setQuery",
    value: function setQuery(query) {
      this.query = query;
      return this;
    }
  }, {
    key: "setUseDateParse",
    value: function setUseDateParse(useDateParse) {
      var useDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filterIncludeEnding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.useDateParse = useDateParse;
      this.useDuration = useDuration;
      this.filterIncludeEnding = filterIncludeEnding;
      return this;
    }
  }, {
    key: "setExecute",
    value: function setExecute(execute, executeLazy) {
      this.execute = execute;
      if (executeLazy !== undefined) this.executeLazy = executeLazy;
      return this;
    }
  }, {
    key: "setCronJob",
    value: function setCronJob(cronJobs, execute) {
      this.cronJobs = cronJobs;
      this.executeCron = execute;
      return this;
    }
  }, {
    key: "setChannels",
    value: function setChannels() {
      for (var _len3 = arguments.length, channels = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        channels[_key4] = arguments[_key4];
      }
      this.channels = channels.filter(Boolean);
      return this;
    }
  }, {
    key: "setExamples",
    value: function setExamples() {
      for (var _len4 = arguments.length, examples = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        examples[_key5] = arguments[_key5];
      }
      this.examples = examples.map(function (e) {
        return Array.isArray(e) ? e.map(function (e2, i) {
          return i == 0 ? e2 : '┗' + '━'.repeat(i - 1) + ' ' + e2;
        }).join('\n') + '\n' : e;
      });
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      if (this.name == null) throw new TypeError("name is required");
      if (this.icon == null) throw new TypeError("icon is required");
      if (this.description == null) throw new TypeError("description is required");
      if (this.query == null) throw new TypeError("query is required");
      if (this.execute == null) throw new TypeError("execute is required");
      return new _NaturalCommand({
        name: this.name,
        icon: this.icon,
        description: this.description,
        query: this.query,
        dictionaryPath: this.dictionaryPath,
        execute: this.execute,
        executeLazy: this.executeLazy,
        executeCron: this.executeCron,
        cronJobs: this.cronJobs,
        channels: this.channels,
        examples: this.examples,
        useDateParse: this.useDateParse,
        useDuration: this.useDuration,
        filterIncludeEnding: this.filterIncludeEnding
      });
    }
  }]);
}());
var Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);
    // 싱글톤 클래스
    if (Registry.CommandRegistry) return Registry.CommandRegistry;
    this.data = [];
    Registry.CommandRegistry = this;
  }
  return _createClass(Registry, [{
    key: "setCronManager",
    value: function setCronManager(cronManager) {
      this.cronManager = cronManager;
      this.cronManager.setWakeLock(true);
    }
  }, {
    key: "loop",
    value: function loop(callback) {
      var _iterator3 = _createForOfIteratorHelper(this.data),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var cmd = _step3.value;
          callback(cmd);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "register",
    value: function register(command) {
      var _this9 = this;
      if (!(command instanceof Command)) throw new TypeError("command must be instance of Command");
      var _iterator4 = _createForOfIteratorHelper(this.data),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var cmd = _step4.value;
          if (cmd.name === command.name) throw new Error("Command with name \"".concat(command.name, "\" already exists"));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      this.data.push(command);

      // StructuredCommand - NaturalCommand 순으로 정렬하고,
      // 각각의 명령어들은 StructuredCommand 의 경우 .args 의 개수, NaturalCommand 의 경우 .query 의 개수로 내림차순 정렬
      this.data.sort(function (a, b) {
        if (a instanceof StructuredCommand && b instanceof NaturalCommand) return -1;else if (a instanceof NaturalCommand && b instanceof StructuredCommand) return 1;else {
          if (a instanceof StructuredCommand) return b.args.length - a.args.length;else if (a instanceof NaturalCommand) return Object.keys(b.query).length - Object.keys(a.query).length;else return 0;
        }
      });
      if (this.cronManager != null) {
        var _loop2 = function _loop2(i) {
          var cron = command.cronJobs[i].cron;
          _this9.cronManager.add(cron, function () {
            return command.executeCron(i, DateTime.now());
          });
        };
        for (var i = 0; i < command.cronJobs.length; i++) {
          _loop2(i);
        }
      }
    }
  }, {
    key: "get",
    value: function get(chat, channel) {
      var _iterator5 = _createForOfIteratorHelper(this.data),
        _step5;
      try {
        var _loop3 = function _loop3() {
            var cmd = _step5.value;
            if (cmd.channels.length !== 0 && !cmd.channels.map(function (c) {
              return c.id;
            }).includes(channel.id)) // 방이 포함되어 있지 않을 경우
              return 0; // continue
            var ret = {};
            var args;
            if (cmd instanceof StructuredCommand) {
              args = {};
              var matched = chat.text.match(cmd.regex);
              if (matched == null) return 0; // continue
              var groups = matched.slice(1); // 매치된 인자들
              var is_satisfy = true; // 세부 속성을 만족하는지 여부
              cmd.args.forEach(function (arg, i) {
                var ret = arg.parse(groups[i]);
                if (ret === false) {
                  is_satisfy = false;
                  return false;
                }
                args[arg.name] = ret;
              });
              if (!is_satisfy) // 세부 속성을 만족하지 못했을 경우
                return 0; // continue
            } else if (cmd instanceof NaturalCommand) {
              var filteredText = chat.text.replace(/\s+/g, ' ');
              args = Object.assign({}, cmd.query); // 기본값을 가진 객체를 깊은 복사

              // 기본값만 있던 cmd.query 에서 쿼리할 대상으로 보낸 토큰들에 대응되는 단어들을 매칭
              // 매칭이 실패하면 기본값이 있는 경우 그대로 남고, 아니면 null로 남게 된다
              var startIdx = 0;
              var foundTokens = {}; // 이미 찾은 토큰들 { token: word }

              while (filteredText.length > startIdx) {
                if (/\s|\d|[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(filteredText[startIdx])) {
                  startIdx++;
                  continue;
                }
                var _iterator6 = _createForOfIteratorHelper(cmd.map),
                  _step6;
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var _step6$value = _slicedToArray(_step6.value, 2),
                      word = _step6$value[0],
                      token = _step6$value[1];
                    if (token in args && !(token in foundTokens) && filteredText.startsWith(word, startIdx)) {
                      args[token] = word;
                      foundTokens[token] = word;
                      startIdx += word.length - 1;
                      break;
                    }
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }
                startIdx++;
              }
              if (cmd.useDateParse) {
                if (!('datetime' in args)) args.datetime = null;
                if (cmd.useDuration) {
                  var _DateTime$parseDurati = DateTime.parseDuration(filteredText, true, cmd.filterIncludeEnding),
                    _DateTime$parseDurati2 = _DateTime$parseDurati.parse,
                    from = _DateTime$parseDurati2.from,
                    to = _DateTime$parseDurati2.to,
                    string = _DateTime$parseDurati.string;
                  if (from != null && to != null) {
                    args.datetime = {
                      from: from,
                      to: to
                    };
                    filteredText = string;
                  }
                } else {
                  var _DateTime$parse = DateTime.parse(filteredText, true, cmd.filterIncludeEnding),
                    parse = _DateTime$parse.parse,
                    _string = _DateTime$parse.string;
                  if (parse != null) {
                    args.datetime = parse;
                    filteredText = _string;
                  }
                }
              }
              chat.filteredText = filteredText.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
              for (var _token in foundTokens) {
                chat.filteredText = chat.filteredText.replace(foundTokens[_token], '');
              }
              var is_full = true;
              for (var key in args) {
                if (args[key] == null) {
                  is_full = false;
                  break;
                }
                // 기본값이 함수인 경우, 특히 날짜 관련 함수일 경우 호출 시간이 중요하므로 이 때 호출.
                else if (typeof args[key] === 'function') {
                  args[key] = args[key]();
                }
              }
              if (!is_full) return 0; // continue
            }
            return {
              v: {
                cmd: cmd,
                args: args
              }
            };
          },
          _ret2;
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          _ret2 = _loop3();
          if (_ret2 === 0) continue;
          if (_ret2) return _ret2.v;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return {
        cmd: null,
        args: null
      };
    }
  }]);
}();
_Registry = Registry;
_defineProperty(Registry, "CommandRegistry", new _Registry());
exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
exports.CommandRegistry = Registry.CommandRegistry;