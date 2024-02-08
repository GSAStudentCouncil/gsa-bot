"use strict";

var _StructuredCommand, _NaturalCommand, _Registry;
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IS_DIST = true;
var COMPRESS = "\u200B".repeat(500);
var Command = /*#__PURE__*/function () {
  function Command(name, description, execute, executeLazy, executeCron, cronjobs, channels, examples) {
    var _this = this;
    _classCallCheck(this, Command);
    if (this.constructor === Command) throw new TypeError("Cannot construct abstract class");
    if (name === undefined) throw new TypeError("name is required");
    if (description === undefined) throw new TypeError("description is required");
    this.name = name;
    this.description = description;
    this.channels = channels || [];
    this.cronjobs = cronjobs || {};
    this.examples = examples || [];
    this._execute = execute || function (chat, channel, command, args) {};
    this.execute = function (chat, channel, args) {
      return _this._execute(chat, channel, _this, args);
    };
    this._executeLazy = executeLazy || function (chat, prevChat, channel, prevChannel, command, args) {};
    this.executeLazy = function (chat, prevChat, channel, prevChannel, args) {
      return _this._executeLazy(chat, prevChat, channel, prevChannel, _this, args);
    };
    this.executeCron = executeCron || function (tag) {};
    this.lazy = executeLazy !== undefined;
  }
  _createClass(Command, [{
    key: "manual",
    value: function manual(content) {
      var ret = ["\uD83E\uDDE9 `".concat(this.name, "` \uBA85\uB839\uC5B4 \uB3C4\uC6C0\uB9D0").concat(COMPRESS), '——————————', this.description, '', '📌 인자', '——'].concat(_toConsumableArray(content), ['']);
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
  }, {
    key: "register",
    value: function register() {
      Registry.CommandRegistry.register(this);
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
    var _this2;
    _classCallCheck(this, IntArg);
    _this2 = _callSuper(this, IntArg, [name]);
    _this2.min = min;
    _this2.max = max;
    return _this2;
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
      var _this3 = this;
      if (value != null && !this.toRegExp().test(value)) return false;
      if (this.many) {
        if (value == null) return [];
        var ret = value.split(' ').map(Number);
        if (this.min && ret.some(function (v) {
          return v < _this3.min;
        })) return false;else if (this.max && ret.some(function (v) {
          return v > _this3.max;
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
var StringArg = /*#__PURE__*/function (_Arg2) {
  _inherits(StringArg, _Arg2);
  function StringArg(name, length, minLength, maxLength) {
    var _this4;
    _classCallCheck(this, StringArg);
    _this4 = _callSuper(this, StringArg, [name]);
    _this4.length = length;
    _this4.minLength = minLength;
    _this4.maxLength = maxLength;
    return _this4;
  }
  _createClass(StringArg, [{
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
  return StringArg;
}(Arg);
var StructuredCommand = /*#__PURE__*/function (_Command) {
  _inherits(StructuredCommand, _Command);
  function StructuredCommand(options) {
    var _this5;
    _classCallCheck(this, StructuredCommand);
    if (options.usage === undefined) throw new TypeError("usage is required");
    _this5 = _callSuper(this, StructuredCommand, [options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronjobs, options.channels, options.examples]);
    _this5.usage = options.usage;
    _this5._argumentStr = [];
    var args = [];
    var regexed = _this5.usage.replace(/\s*<.+?>/g, function (m) {
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
      var map = {
        'int': IntArg,
        'string': StringArg
      };
      var k;
      for (var key in map) {
        if (type.startsWith(key)) {
          k = key;
          break;
        }
      }
      if (k === undefined) throw new TypeError("Invalid type: ".concat(type));
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
      if (type === '[]') args[args.length - 1].many = true;else if (type === '?') args[args.length - 1].includeEmpty = true;else if (type === '[]?') {
        args[args.length - 1].many = true;
        args[args.length - 1].includeEmpty = true;
      } else if (type !== '') {
        throw new TypeError("Invalid type options: ".concat(type));
      }
      var ret = "".concat(whitespaces, "(").concat(args[args.length - 1].toRegExp().source, ")");
      if (args[args.length - 1].includeEmpty) return "(?:".concat(ret, ")?");else return ret;
    });
    _this5.args = args;
    _this5.regex = new RegExp("^".concat(regexed, "$"));
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
    this.cronjobs = {};
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
    value: function setExecute(execute) {
      this.execute = execute;
      return this;
    }
  }, {
    key: "setExecuteLazy",
    value: function setExecuteLazy(executeLazy) {
      this.executeLazy = executeLazy;
      return this;
    }
  }, {
    key: "setExecuteCron",
    value: function setExecuteCron(executeCron) {
      this.executeCron = executeCron;
      return this;
    }
  }, {
    key: "setCronjobs",
    value: function setCronjobs(cronjobs) {
      this.cronjobs = cronjobs;
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
      if (this.name === null) throw new TypeError("name is required");
      if (this.description === null) throw new TypeError("description is required");
      if (this.usage === null) throw new TypeError("usage is required");
      if (this.execute === null) throw new TypeError("execute is required");
      return new _StructuredCommand({
        name: this.name,
        description: this.description,
        usage: this.usage,
        execute: this.execute,
        executeLazy: this.executeLazy,
        executeCron: this.executeCron,
        cronjobs: this.cronjobs,
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
    if (options.query === undefined) throw new TypeError("query is required");
    _this7 = _callSuper(this, NaturalCommand, [options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronjobs, options.channels, options.examples]);
    _this7.query = options.query;
    options.dictionaryPath = options.dictionaryPath || 'dict.json';
    var dictionary;
    if (IS_DIST) dictionary = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/command-handler/".concat(options.dictionaryPath)));else dictionary = require("./".concat(options.dictionaryPath));
    _this7.map = {};
    for (var position in dictionary) {
      for (var tok in dictionary[position]) {
        var _iterator2 = _createForOfIteratorHelper(dictionary[position][tok]),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var alias = _step2.value;
            _this7.map[alias] = {
              token: tok,
              position: position
            };
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
    return _this7;
  }
  _createClass(NaturalCommand, [{
    key: "input",
    value: function input(text) {
      text = text.replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, "");
      var query = this.query;
      var _iterator3 = _createForOfIteratorHelper(text.split(' ')),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var word = _step3.value;
          if (word in this.map) {
            var position = this.map[word].position;
            var token = this.map[word].token;
            if (position in query) {
              if (query[position].constructor.name === 'Object') {
                if (token in query[position]) {
                  query[position] = token;
                }
              } else if (Array.isArray(query[position])) {
                if (query[position].includes(token)) {
                  query[position] = token;
                }
              } else {
                // string || null || (() => string)
                query[position] = token;
              }
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return query;
    }
  }, {
    key: "manual",
    value: function manual() {
      var ret = [];
      for (var position in this.query) {
        var tmp = "\xB7 ".concat(position, " ");
        if (this.query[position].constructor.name === 'Object') tmp += '\n' + Object.keys(this.query[position]).map(function (k) {
          return "    \xB7 ".concat(k);
        }).join('\n');else if (Array.isArray(this.query[position])) tmp += '\n' + this.query[position].map(function (k) {
          return "    \xB7 ".concat(k);
        }).join('\n');else if (typeof this.query[position] === 'function') tmp += "(default=".concat(this.query[position](), ")");else if (this.query[position] !== null) tmp += "(default=".concat(this.query[position], ")");
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
    this.cronjobs = {};
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
    key: "setExecute",
    value: function setExecute(execute) {
      this.execute = execute;
      return this;
    }
  }, {
    key: "setExecuteLazy",
    value: function setExecuteLazy(executeLazy) {
      this.executeLazy = executeLazy;
      return this;
    }
  }, {
    key: "setExecuteCron",
    value: function setExecuteCron(executeCron) {
      this.executeCron = executeCron;
      return this;
    }
  }, {
    key: "setCronjobs",
    value: function setCronjobs(cronjobs) {
      this.cronjobs = cronjobs;
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
      if (this.name === null) throw new TypeError("name is required");
      if (this.description === null) throw new TypeError("description is required");
      if (this.query === null) throw new TypeError("query is required");
      if (this.execute === null) throw new TypeError("execute is required");
      return new _NaturalCommand({
        name: this.name,
        description: this.description,
        query: this.query,
        dictionaryPath: this.dictionaryPath,
        execute: this.execute,
        executeLazy: this.executeLazy,
        executeCron: this.executeCron,
        cronjobs: this.cronjobs,
        channels: this.channels,
        examples: this.examples
      });
    }
  }]);
  return _class2;
}());
var Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);
    if (Registry.CommandRegistry) return Registry.CommandRegistry;
    this.data = {};
    Registry.CommandRegistry = this;
  }
  _createClass(Registry, [{
    key: "setCronManager",
    value: function setCronManager(cronManager) {
      this.cronManager = cronManager;
      this.cronManager.setWakeLock(true); // REVIEW: 이거 맞나?
    }
  }, {
    key: "loop",
    value: function loop(callback) {
      for (var cmdName in this.data) {
        callback(this.data[cmdName]);
      }
    }

    // REVIEW: cronjob 테스트
  }, {
    key: "register",
    value: function register(command) {
      var _this8 = this;
      if (!(command instanceof Command)) throw new TypeError("command must be instance of Command");
      if (command.name in this.data) throw new Error("command already exists");
      this.data[command.name] = command;
      if (this.cronManager != null && Object.keys(command.cronjobs).length > 0 && command.executeCron != null) {
        var _loop = function _loop(tag) {
          _this8.cronManager.add(command.cronjobs[tag], function () {
            return command.executeCron(tag);
          });
        };
        for (var tag in command.cronjobs) {
          _loop(tag);
        }
      }
    }
  }, {
    key: "get",
    value: function get(chat, channel) {
      var _this9 = this;
      var _loop2 = function _loop2() {
          var cmd = _this9.data[cmdName];
          if (cmd.channels.length !== 0 && !cmd.channels.map(function (c) {
            return c.id;
          }).includes(channel.id)) // 방이 포함되어 있지 않을 경우
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
            if (!is_satisfy) // 세부 속성을 만족하지 못했을 경우
              return 0; // continue
          } else if (cmd instanceof NaturalCommand) {
            args = cmd.input(chat.text);
            var is_full = true;
            for (var key in args) {
              if (args[key] === null || args[key].constructor.name === 'Object' || Array.isArray(args[key])) {
                is_full = false;
                break;
              } else if (typeof args[key] === 'function') {
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
      for (var cmdName in this.data) {
        _ret2 = _loop2();
        if (_ret2 === 0) continue;
        if (_ret2) return _ret2.v;
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

