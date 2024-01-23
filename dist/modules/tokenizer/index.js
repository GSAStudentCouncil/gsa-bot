'use strict';

exports.Tokenizer = function () {
    function NLP(table) {
        var _this = this;

        this.map = {};

        var _loop = function _loop(position) {
            var _loop2 = function _loop2(tok) {
                table[position][tok].forEach(function (alias) {
                    _this.map[alias] = {
                        token: tok,
                        position: position
                    };
                });
            };

            for (var tok in table[position]) {
                _loop2(tok);
            }
        };

        for (var position in table) {
            _loop(position);
        }
    }

    NLP.prototype.input = function (text, query) {
        var _this2 = this;

        text = NLP.normalize(text);

        text.split(' ').forEach(function (word) {
            if (_this2.map[word] !== undefined) {
                if (query[_this2.map[word].position] !== undefined) query[_this2.map[word].position] = _this2.map[word].token;
            }
        });

        return query;
    };

    NLP.punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    NLP.normalize = function (text) {
        var result = text;

        // 구두점 제거
        result = result.replace(new RegExp('[' + NLP.punctuation + ']', "g"), "");

        // 나머지 정규화 과정
        // ...

        return result;
    };

    return function (table) {
        var instance = new NLP(table);
        return function (text, query) {
            return instance.input(text, query);
        };
    };
}();

