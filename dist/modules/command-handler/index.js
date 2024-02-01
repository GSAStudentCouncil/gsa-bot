"use strict";

var _Registry;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IS_DIST = true;
var Command = /*#__PURE__*/function () {
  function Command(name, description, execute, rooms, examples) {
    _classCallCheck(this, Command);
    if (this.constructor === Command) throw new TypeError("Cannot construct abstract class");
    if (name === undefined) throw new TypeError("name is required");
    if (description === undefined) throw new TypeError("description is required");
    if (execute === undefined) throw new TypeError("execute is required");
    this.name = name;
    this.description = description;
    this.execute = execute;
    this.rooms = rooms || [];
    this.examples = examples || [];
  }
  _createClass(Command, [{
    key: "manual",
    value: function manual() {
      throw new Error("Not implemented");
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
        var ret = value.split(/\s+/).map(Number);
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
var StringArg = /*#__PURE__*/function (_Arg2) {
  _inherits(StringArg, _Arg2);
  function StringArg(name, length, minLength, maxLength) {
    var _this3;
    _classCallCheck(this, StringArg);
    _this3 = _callSuper(this, StringArg, [name]);
    _this3.length = length;
    _this3.minLength = minLength;
    _this3.maxLength = maxLength;
    return _this3;
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
        return value.split(/\s+/);
      } else {
        if (value == null) return null;
        return value;
      }
    }
  }]);
  return StringArg;
}(Arg); // TODO: includeZero면 앞 공백 생략 허용 좀
var StructuredCommand = /*#__PURE__*/function (_Command) {
  _inherits(StructuredCommand, _Command);
  function StructuredCommand(options) {
    var _this4;
    _classCallCheck(this, StructuredCommand);
    if (options.usage === undefined) throw new TypeError("usage is required");
    _this4 = _callSuper(this, StructuredCommand, [options.name, options.description, options.execute, options.rooms, options.examples]);
    _this4.usage = options.usage;
    var args = [];
    var regexed = _this4.usage.replace(/\s*<.+?>/g, function (m) {
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
      type = type.slice(k.length).split('');
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
      if (type.includes('s')) args[args.length - 1].many = true;
      if (type.includes('0')) args[args.length - 1].includeEmpty = true;
      var ret = "".concat(whitespaces, "(").concat(args[args.length - 1].toRegExp().source, ")");
      if (args[args.length - 1].includeEmpty) return "(?:".concat(ret, ")?");else return ret;
    });
    _this4.args = args;
    _this4.regex = new RegExp("^".concat(regexed, "$"));
    return _this4;
  }
  _createClass(StructuredCommand, [{
    key: "manual",
    value: function manual() {
      return "[ ".concat(this.name, " ]\n  - ").concat(this.description, "\n\n\"").concat(this.usage.replace(/<.+?>/g, function (m) {
        return m.slice(0, m.indexOf(":")) + ">";
      }), "\"\n").concat(this.args.map(function (arg) {
        var ret = "  - <".concat(arg.name, ">: ").concat(arg.constructor.name.slice(0, -3).toLowerCase() + (arg.many ? 's' : ''));

        // print options indent one more
        Object.keys(arg).forEach(function (key) {
          if (key === 'name' || key === 'many') return;
          if (arg[key] !== undefined) ret += "\n    - ".concat(key, ": ").concat(arg[key]);
        });
        return ret;
      }).join("\n"), "\n\n\uD65C\uC131\uD654\uB41C \uBC29:\n").concat(this.rooms.map(function (r) {
        return "  - ".concat(r);
      }).join("\n"), "\n\n\uC608\uC2DC:\n").concat(this.examples.map(function (e) {
        return "  - \"".concat(e, "\"");
      }).join("\n"), "\n");
    }
  }], [{
    key: "add",
    value: function add(options) {
      new StructuredCommand(options).register();
    }
  }]);
  return StructuredCommand;
}(Command);
var NaturalCommand = /*#__PURE__*/function (_Command2) {
  _inherits(NaturalCommand, _Command2);
  function NaturalCommand(options) {
    var _this5;
    _classCallCheck(this, NaturalCommand);
    if (options.query === undefined) throw new TypeError("query is required");
    _this5 = _callSuper(this, NaturalCommand, [options.name, options.description, options.execute, options.rooms, options.examples]);
    _this5.query = options.query;
    options.dictionaryPath = options.dictionaryPath || 'dict.json';
    var dictionary;
    if (IS_DIST) dictionary = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/command-handler/".concat(options.dictionaryPath)));else dictionary = require("./".concat(options.dictionaryPath));
    _this5.map = {};
    for (var position in dictionary) {
      for (var tok in dictionary[position]) {
        var _iterator2 = _createForOfIteratorHelper(dictionary[position][tok]),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var alias = _step2.value;
            _this5.map[alias] = {
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
    return _this5;
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
      var _this6 = this;
      return "[ ".concat(this.name, " ]\n  - ").concat(this.description, "\n\n{ ").concat(Object.keys(this.query).map(function (e) {
        return "".concat(e) + (_this6.query[e].constructor.name === 'Object' ? "[".concat(Object.keys(_this6.query[e])[0], "]") : "");
      }).join(', '), " }\n").concat(Object.keys(this.query).map(function (pos) {
        var ret = '  - ';
        if (_this6.query[pos] === null) ret += "".concat(pos, " (required)");else if (_this6.query[pos].constructor.name === 'Object') ret += "".concat(pos, "[").concat(Object.keys(_this6.query[pos])[0], "] (required)");else if (typeof _this6.query[pos] === 'function') ret += "".concat(pos, ": () => string (required)");else
          // string || (() => string)
          ret += "".concat(pos, ": ").concat(_this6.query[pos], " (optional)");
        return ret;
      }).join("\n"), "\n\n\uD65C\uC131\uD654\uB41C \uBC29:\n").concat(this.rooms.map(function (r) {
        return "  - ".concat(r);
      }).join("\n"), "\n\n\uC608\uC2DC:\n").concat(this.examples.map(function (e) {
        return "  - \"".concat(e, "\"");
      }).join("\n"), "\n");
    }
  }], [{
    key: "add",
    value: function add(options) {
      new NaturalCommand(options).register();
    }
  }]);
  return NaturalCommand;
}(Command);
var Registry = /*#__PURE__*/function () {
  function Registry() {
    _classCallCheck(this, Registry);
    if (Registry.CommandRegistry) return Registry.CommandRegistry;
    this.data = [];
    Registry.CommandRegistry = this;
  }
  _createClass(Registry, [{
    key: "register",
    value: function register(command) {
      if (!(command instanceof Command)) throw new TypeError("command must be instance of Command");
      this.data.push(command);
    }
  }, {
    key: "get",
    value: function get(chatName, channelNameOrId) {
      var _iterator4 = _createForOfIteratorHelper(this.data),
        _step4;
      try {
        var _loop = function _loop() {
            var cmd = _step4.value;
            if (cmd.rooms.length !== 0 && !cmd.rooms.includes(channelNameOrId)) // 방이 포함되어 있지 않을 경우
              return 0; // continue
            var args;
            if (cmd instanceof StructuredCommand) {
              args = {};
              var matched = chatName.match(cmd.regex);
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
              args = cmd.input(chatName);
              var is_full = true;
              for (var key in args) {
                if (args[key] === null || args[key].constructor.name === 'Object') {
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
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _ret2 = _loop();
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

