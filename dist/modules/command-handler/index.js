"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function () {
    function Command(name, description, rooms, examples) {
        _classCallCheck(this, Command);

        if (this.constructor === Command) throw new TypeError("Cannot construct abstract class");

        if (name === undefined) throw new TypeError("name is required");
        if (description === undefined) throw new TypeError("description is required");

        this.name = name;
        this.description = description;
        this.rooms = rooms || [];
        this.examples = examples || [];
        this.callback = null;
    }

    _createClass(Command, [{
        key: "on",
        value: function on(callback) {
            this.callback = callback;
            return this;
        }
    }]);

    return Command;
}();

var Arg = function () {
    function Arg(name) {
        _classCallCheck(this, Arg);

        if (this.constructor === Arg) throw new TypeError("Cannot construct abstract class");

        this.name = name;
        this.many = false;
    }

    _createClass(Arg, [{
        key: "toRegExp",
        value: function toRegExp() {
            throw new Error("Not implemented");
        }
    }]);

    return Arg;
}();

// TODO: 실수형

var IntArg = function (_Arg) {
    _inherits(IntArg, _Arg);

    function IntArg(name, min, max) {
        _classCallCheck(this, IntArg);

        var _this = _possibleConstructorReturn(this, (IntArg.__proto__ || Object.getPrototypeOf(IntArg)).call(this, name));

        _this.min = min;
        _this.max = max;

        if (_this.min && _this.max && _this.min > _this.max) throw new RangeError("min must be less than or equal to max");
        return _this;
    }

    _createClass(IntArg, [{
        key: "toRegExp",
        value: function toRegExp() {
            var ret = /[+-]?\d+/;

            if (!this.many) return ret;else return new RegExp("(?:" + ret.source + "\\s?)+");
        }
    }, {
        key: "test",
        value: function test(value) {
            if (typeof value !== 'number') return false;else if (isNaN(value)) return false;else if (this.min && value < this.min) return false;else if (this.max && value > this.max) return false;

            return true;
        }
    }]);

    return IntArg;
}(Arg);

var StringArg = function (_Arg2) {
    _inherits(StringArg, _Arg2);

    function StringArg(name, length, minLength, maxLength) {
        _classCallCheck(this, StringArg);

        var _this2 = _possibleConstructorReturn(this, (StringArg.__proto__ || Object.getPrototypeOf(StringArg)).call(this, name));

        _this2.length = length;
        _this2.minLength = minLength;
        _this2.maxLength = maxLength;

        if (_this2.length && (_this2.minLength || _this2.maxLength)) throw new TypeError("length cannot be used with minLength or maxLength");
        if (_this2.minLength && _this2.maxLength && _this2.minLength > _this2.maxLength) throw new RangeError("minLength must be less than or equal to maxLength");
        if (_this2.minLength && _this2.minLength < 1) throw new RangeError("minLength must be greater than or equal to 1");
        if (_this2.maxLength && _this2.maxLength < 1) throw new RangeError("maxLength must be greater than or equal to 1");
        if (!_this2.minLength && _this2.maxLength) _this2.minLength = 1;
        return _this2;
    }

    _createClass(StringArg, [{
        key: "toRegExp",
        value: function toRegExp() {
            var ret = void 0;

            if (this.length) ret = new RegExp("\\S{" + this.length + "}");else if (this.minLength && this.maxLength) ret = new RegExp("\\S{" + this.minLength + "," + this.maxLength + "}");else if (this.minLength) ret = new RegExp("\\S{" + this.minLength + ",}");

            if (!this.many) return ret;else return new RegExp("(?:" + ret.source + "\\s?)+");
        }
    }, {
        key: "test",
        value: function test(value) {
            if (typeof value !== 'string') return false;else return this.toRegExp().test(value);
        }
    }]);

    return StringArg;
}(Arg);

var StructuredCommand = function (_Command) {
    _inherits(StructuredCommand, _Command);

    function StructuredCommand(options) {
        _classCallCheck(this, StructuredCommand);

        if (options.usage === undefined) throw new TypeError("usage is required");

        var _this3 = _possibleConstructorReturn(this, (StructuredCommand.__proto__ || Object.getPrototypeOf(StructuredCommand)).call(this, options.name, options.description, options.rooms, options.examples));

        _this3.usage = options.usage;
        return _this3;
    }

    _createClass(StructuredCommand, [{
        key: "regexed",
        value: function regexed() {
            var args = [];
            var regexed = this.usage.replace(/<.+?>/g, function (m) {
                var _m$slice$split = m.slice(1, -1).split(/\s+/),
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

                if (type.startsWith('int')) args.push(new IntArg(name));else if (type.startsWith('string')) args.push(new StringArg(name));else throw new TypeError("Invalid type: " + type);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref = _step.value;

                        var _ref2 = _slicedToArray(_ref, 2);

                        var key = _ref2[0];
                        var value = _ref2[1];

                        args[args.length - 1][key] = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (type.endsWith('s')) {
                    args[args.length - 1].many = true;
                }

                return "(" + args[args.length - 1].toRegExp().source + ")";
            });

            return [new RegExp("^" + regexed + "$"), args];
        }
    }]);

    return StructuredCommand;
}(Command);

var NaturalCommand = function (_Command2) {
    _inherits(NaturalCommand, _Command2);

    function NaturalCommand(options) {
        _classCallCheck(this, NaturalCommand);

        if (options.query === undefined) throw new TypeError("query is required");

        var _this4 = _possibleConstructorReturn(this, (NaturalCommand.__proto__ || Object.getPrototypeOf(NaturalCommand)).call(this, options.name, options.description, options.rooms, options.examples));

        _this4.query = options.query;
        return _this4;
    }

    return NaturalCommand;
}(Command);

exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;

