'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('../index.js'),
    Command = _require.Command,
    StructuredCommand = _require.StructuredCommand,
    TokenizedCommand = _require.TokenizedCommand;

var commands = [];

var cmd = new StructuredCommand({
    name: '학생회 알림',
    description: '알림을 보냅니다.',
    usage: '<부서:string> 알림 <기수1:int> <기수2:int> <기수3:int>',
    rooms: ['공지방'],
    examples: ['학생회 알림 1 2 3', '정보부 알림 1']
}).on(function (chat, channel, args) {
    console.log(args);
});

commands.push(cmd);

(function (chat, channel) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _cmd = _step.value;

            var matched = chat.text.match(_cmd.regex);
            if (matched !== null) {
                var _ret = function () {
                    // 명령어 자체는 만족하나, 세부 속성까지도 만족하는지 확인
                    var groups = matched.slice(1);
                    var flag = true;

                    var args = {};
                    _cmd.args.forEach(function (arg, i) {
                        var ret = arg.parse(groups[i]);
                        if (ret === false) {
                            flag = false;
                            return false;
                        }

                        args[arg.name] = ret;
                    });

                    if (!flag) // 세부 속성을 만족하지 못했을 경우
                        return 'continue';

                    _cmd.callback(chat, channel, args);

                    return {
                        v: void 0
                    }; // 여러 명령어가 만족할 수 있으나, 가장 먼저 만족한 명령어만 실행
                }();

                switch (_ret) {
                    case 'continue':
                        continue;

                    default:
                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
            }
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
})({ text: '학생회 알림 1 2 3' }, null);