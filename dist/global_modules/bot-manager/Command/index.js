"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var _StructuredCommand, _NaturalCommand, _Registry;
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _require = require('../DateTime'),
  DateTime = _require.DateTime;
var $ = "/sdcard/msgbot/global_modules/bot-manager/Command";
var IS_DIST = true;
var COMPRESS = "\u200B".repeat(500);
var Command = /*#__PURE__*/function () {
  function Command(name, description, _execute, _executeLazy, _executeCron, cronJobs, channels, examples) {
    _classCallCheck(this, Command);
    if (this.constructor === Command) throw new TypeError("Cannot construct abstract class");
    if (name == null) throw new TypeError("name is required");
    if (description == null) throw new TypeError("description is required");
    this.name = name;
    this.description = description;
    this.channels = channels !== null && channels !== void 0 ? channels : [];
    this.cronJobs = cronJobs !== null && cronJobs !== void 0 ? cronJobs : {};
    this.examples = examples !== null && examples !== void 0 ? examples : [];
    this._execute = _execute !== null && _execute !== void 0 ? _execute : function (self, chat, channel, args) {};
    this._executeLazy = _executeLazy !== null && _executeLazy !== void 0 ? _executeLazy : function (self, chat, prevChat, channel, prevChannel, args) {};
    this._executeCron = _executeCron !== null && _executeCron !== void 0 ? _executeCron : function (self, tag) {};
    this.lazy = _executeLazy !== undefined;
  }
  _createClass(Command, [{
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
    value: function executeCron(tag) {
      return this._executeCron(this, tag);
    }
  }, {
    key: "register",
    value: function register() {
      Registry.CommandRegistry.register(this);
    }
  }, {
    key: "manual",
    value: function manual(contents) {
      var ret = ["\uD83E\uDDE9 `".concat(this.name, "` \uBA85\uB839\uC5B4 \uB3C4\uC6C0\uB9D0").concat(COMPRESS), '——————————', this.description, '', '📌 인자', '——'].concat(_toConsumableArray(contents), ['']);
      if (Object.keys(this.cronJobs).length > 0) {
        ret.push('📌 자동 실행 주기');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(Object.entries(this.cronJobs).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];
          return "\xB7 ".concat(k, ": ").concat(v);
        })));
        ret.push('');
      }
      if (this.channels.length > 0) {
        ret.push('📌 활성화된 방');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(this.channels.map(function (c) {
          return "\xB7 ".concat(c.name);
        })));
        ret.push('');
      }
      if (this.examples.length > 0) {
        ret.push('📌 예시');
        ret.push('——');
        ret.push.apply(ret, _toConsumableArray(this.examples.map(function (e) {
          return "\"".concat(e, "\"");
        })));
      }
      return ret.join('\n');
    }
  }]);
  return Command;
}();
var Arg = /*#__PURE__*/function () {
  function Arg(name) {
    _classCallCheck(this, Arg);
    if (this.constructor === Arg) throw new TypeError("Cannot construct abstract class");
    this.name = name;
    this.many = false;
    this.includeEmpty = false;
  }
  _createClass(Arg, [{
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
  return Arg;
}();
var IntArg = /*#__PURE__*/function (_Arg) {
  _inherits(IntArg, _Arg);
  function IntArg(name, min, max) {
    var _this;
    _classCallCheck(this, IntArg);
    _this = _callSuper(this, IntArg, [name]);
    _this.min = min;
    _this.max = max;
    return _this;
  }
  _createClass(IntArg, [{
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
  return IntArg;
}(Arg);
var StrArg = /*#__PURE__*/function (_Arg2) {
  _inherits(StrArg, _Arg2);
  function StrArg(name, length, minLength, maxLength) {
    var _this3;
    _classCallCheck(this, StrArg);
    _this3 = _callSuper(this, StrArg, [name]);
    _this3.length = length;
    _this3.minLength = minLength;
    _this3.maxLength = maxLength;
    return _this3;
  }
  _createClass(StrArg, [{
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
  return StrArg;
}(Arg);
var DateArg = /*#__PURE__*/function (_Arg3) {
  _inherits(DateArg, _Arg3);
  function DateArg(name, duration) {
    var _this4;
    _classCallCheck(this, DateArg);
    _this4 = _callSuper(this, DateArg, [name]);
    _this4.duration = duration;
    return _this4;
  }
  _createClass(DateArg, [{
    key: "toRegExp",
    value: function toRegExp() {
      return /[0-9+\-ㄱ-ㅎ가-힣 ]+/;
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
  return DateArg;
}(Arg);
var map = {
  'int': IntArg,
  'str': StrArg,
  'date': DateArg
};
var StructuredCommand = /*#__PURE__*/function (_Command) {
  _inherits(StructuredCommand, _Command);
  function StructuredCommand(options) {
    var _this5;
    _classCallCheck(this, StructuredCommand);
    if (options.usage == null) throw new TypeError("usage is required");
    _this5 = _callSuper(this, StructuredCommand, [options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples]);
    _this5.usage = options.usage;
    _this5._argumentStr = [];
    var args = [];
    var regexApplied = _this5.usage.replace(/\s*<.+?>/g, function (m) {
      var pos = m.indexOf('<');
      var whitespaces = m.slice(0, pos);
      var _m$slice$split = m.slice(pos + 1, -1).split(/\s+/),
        _m$slice$split2 = _toArray(_m$slice$split),
        nameAndType = _m$slice$split2[0],
        options = _m$slice$split2.slice(1);
      var _nameAndType$split = nameAndType.split(":"),
        _nameAndType$split2 = _slicedToArray(_nameAndType$split, 2),
        name = _nameAndType$split2[0],
        type = _nameAndType$split2[1];
      _this5._argumentStr.push([name, type]);
      options = options.map(function (o) {
        var splited = o.split("=");
        if (!isNaN(Number(splited[1]))) {
          splited[1] = Number(splited[1]);
        }
        return splited;
      });
      var k;
      for (var key in map) {
        if (type.startsWith(key)) {
          k = key;
          break;
        }
      }
      if (k == null) throw new TypeError("Invalid type: ".concat(type));
      args.push(new map[k](name));
      var _iterator = _createForOfIteratorHelper(options),
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
  _createClass(StructuredCommand, [{
    key: "manual",
    value: function manual() {
      var _this6 = this;
      return _get(_getPrototypeOf(StructuredCommand.prototype), "manual", this).call(this, ["\"".concat(this.usage.replace(/<.+?>/g, function (m) {
        return m.slice(0, m.indexOf(':')) + '>';
      }), "\"")].concat(_toConsumableArray(this.args.map(function (arg, i) {
        var ret = "\xB7 ".concat(_this6._argumentStr[i][0], ": ").concat(_this6._argumentStr[i][1]);
        var options = [];
        Object.keys(arg).forEach(function (key) {
          if (key === 'name' || key === 'many' || key === 'includeEmpty') return;
          if (arg[key])
            // null, undefined, 0, false 등이 아닐 경우
            options.push("".concat(key, "=").concat(arg[key]));
        });
        if (options.length > 0) ret += " (".concat(options.join(', '), ")");
        return ret;
      }))));
    }
  }], [{
    key: "add",
    value: function add(options) {
      new StructuredCommand(options).register();
    }
  }]);
  return StructuredCommand;
}(Command);
_StructuredCommand = StructuredCommand;
_defineProperty(StructuredCommand, "Builder", /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
    this.name = null;
    this.description = null;
    this.usage = null;
    this.execute = null;
    this.executeLazy = null;
    this.executeCron = null;
    this.cronJobs = {};
    this.channels = [];
    this.examples = [];
  }
  _createClass(_class, [{
    key: "setName",
    value: function setName(name) {
      this.name = name;
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
      for (var _len = arguments.length, channels = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        channels[_key2] = arguments[_key2];
      }
      this.channels = channels;
      return this;
    }
  }, {
    key: "setExamples",
    value: function setExamples() {
      for (var _len2 = arguments.length, examples = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        examples[_key3] = arguments[_key3];
      }
      this.examples = examples;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      if (this.name == null) throw new TypeError("name is required");
      if (this.description == null) throw new TypeError("description is required");
      if (this.usage == null) throw new TypeError("usage is required");
      if (this.execute == null) throw new TypeError("execute is required");
      return new _StructuredCommand({
        name: this.name,
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
  return _class;
}());
var NaturalCommand = /*#__PURE__*/function (_Command2) {
  _inherits(NaturalCommand, _Command2);
  function NaturalCommand(options) {
    var _this7;
    _classCallCheck(this, NaturalCommand);
    if (options.query == null) throw new TypeError("query is required");
    _this7 = _callSuper(this, NaturalCommand, [options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples]);
    _this7.query = options.query;
    _this7.useDateParse = options.useDateParse;
    _this7.useDuration = options.useDuration;
    options.dictionaryPath = options.dictionaryPath || 'dict.json';
    var dictionary = IS_DIST ? JSON.parse(FileStream.read("".concat($, "/").concat(options.dictionaryPath))) : require("./".concat(options.dictionaryPath));
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
    return _this7;
  }
  _createClass(NaturalCommand, [{
    key: "manual",
    value: function manual() {
      var ret = [];
      for (var key in this.query) {
        var tmp = "\xB7 ".concat(key, " ");
        if (typeof this.query[key] === 'function') tmp += "(default = function -> ".concat(this.query[key](), ")");else if (this.query[key] !== null) tmp += "(default = ".concat(this.query[key], ")");
        ret.push(tmp);
      }
      return _get(_getPrototypeOf(NaturalCommand.prototype), "manual", this).call(this, ret);
    }
  }], [{
    key: "add",
    value: function add(options) {
      new NaturalCommand(options).register();
    }
  }]);
  return NaturalCommand;
}(Command);
_NaturalCommand = NaturalCommand;
_defineProperty(NaturalCommand, "Builder", /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);
    this.name = null;
    this.description = null;
    this.query = null;
    this.dictionaryPath = null;
    this.execute = null;
    this.executeLazy = null;
    this.executeCron = null;
    this.useDateParse = false;
    this.useDuration = false;
    this.cronJobs = {};
    this.channels = [];
    this.examples = [];
  }
  _createClass(_class2, [{
    key: "setName",
    value: function setName(name) {
      this.name = name;
      return this;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.description = description;
      return this;
    }
  }, {
    key: "setQuery",
    value: function setQuery(query) {
      this.query = query;
      return this;
    }
  }, {
    key: "setDictionaryPath",
    value: function setDictionaryPath(dictionaryPath) {
      this.dictionaryPath = dictionaryPath;
      return this;
    }
  }, {
    key: "setUseDateParse",
    value: function setUseDateParse(useDateParse, useDuration) {
      this.useDateParse = useDuration;
      this.useDuration = useDuration;
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
      this.channels = channels;
      return this;
    }
  }, {
    key: "setExamples",
    value: function setExamples() {
      for (var _len4 = arguments.length, examples = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        examples[_key5] = arguments[_key5];
      }
      this.examples = examples;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      if (this.name == null) throw new TypeError("name is required");
      if (this.description == null) throw new TypeError("description is required");
      if (this.query == null) throw new TypeError("query is required");
      if (this.execute == null) throw new TypeError("execute is required");
      return new _NaturalCommand({
        name: this.name,
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
        useDuration: this.useDuration
      });
    }
  }]);
  return _class2;
}());
var Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);
    if (Registry.CommandRegistry) return Registry.CommandRegistry;
    this.data = [];
    Registry.CommandRegistry = this;
  }
  _createClass(Registry, [{
    key: "setCronManager",
    value: function setCronManager(cronManager) {
      this.cronManager = cronManager;
      this.cronManager.setWakeLock(true);
    }
  }, {
    key: "loop",
    value: function loop(callback) {
      for (var cmdName in this.data) {
        callback(this.data[cmdName]);
      }
    }
  }, {
    key: "register",
    value: function register(command) {
      var _this8 = this;
      if (!(command instanceof Command)) throw new TypeError("command must be instance of Command");
      var _iterator3 = _createForOfIteratorHelper(this.data),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var cmd = _step3.value;
          if (cmd.name === command.name) throw new Error("Command with name \"".concat(command.name, "\" already exists"));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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
        var _loop = function _loop(tag) {
          _this8.cronManager.add(command.cronJobs[tag], function () {
            return command.executeCron(tag);
          });
        };
        for (var tag in command.cronJobs) {
          _loop(tag);
        }
      }
    }
  }, {
    key: "get",
    value: function get(chat, channel) {
      var _iterator4 = _createForOfIteratorHelper(this.data),
        _step4;
      try {
        var _loop2 = function _loop2() {
            var cmd = _step4.value;
            if (cmd.channels.length !== 0 && !cmd.channels.map(function (c) {
              return c.id;
            }).includes(channel.id))
              // 방이 포함되어 있지 않을 경우
              return 0; // continue
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
              if (!is_satisfy)
                // 세부 속성을 만족하지 못했을 경우
                return 0; // continue
            } else if (cmd instanceof NaturalCommand) {
              var rawText = chat.text;
              var text = chat.text.replace(/ +/g, ' ').replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ""); // 구두점 제거

              args = Object.assign({}, cmd.query); // 기본값을 가진 객체를 깊은 복사

              if (cmd.useDateParse) {
                if (cmd.useDuration) {
                  var _DateTime$parseDurati = DateTime.parseDurationWithFilteredString(text),
                    _DateTime$parseDurati2 = _DateTime$parseDurati.parse,
                    from = _DateTime$parseDurati2.from,
                    to = _DateTime$parseDurati2.to,
                    string = _DateTime$parseDurati.string;
                  args.datetime = {
                    from: from,
                    to: to
                  };
                  if (from != null && to != null) text = string;
                } else {
                  var _DateTime$parseWithFi = DateTime.parseWithFilteredString(text),
                    parse = _DateTime$parseWithFi.parse,
                    _string = _DateTime$parseWithFi.string;
                  args.datetime = parse;
                  if (parse != null) text = _string;
                }
              }

              // 기본값만 있던 cmd.query 에서 쿼리할 대상으로 보낸 토큰들에 대응되는 단어들을 매칭
              // 매칭이 실패하면 기본값이 있는 경우 그대로 남고, 아니면 null로 남게 된다
              var _iterator5 = _createForOfIteratorHelper(text.split(' ')),
                _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var word = _step5.value;
                  if (word in cmd.map) {
                    var token = cmd.map[word];
                    if (token in args) args[token] = word;
                  }
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
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
              chat.text = text;
              chat.rawText = rawText;
            }
            return {
              v: {
                cmd: cmd,
                args: args
              }
            };
          },
          _ret2;
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _ret2 = _loop2();
          if (_ret2 === 0) continue;
          if (_ret2) return _ret2.v;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return {
        cmd: null,
        args: null
      };
    }
  }]);
  return Registry;
}();
_Registry = Registry;
_defineProperty(Registry, "CommandRegistry", new _Registry());
exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
exports.CommandRegistry = Registry.CommandRegistry;