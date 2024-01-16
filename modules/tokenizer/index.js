exports.Tokenizer = (function () {
    function NLP(table) {
        this.map = {};

        for (let position in table) {
            for (let tok in table[position]) {
                table[position][tok].forEach(alias => {
                    this.map[alias] = {
                        token: tok,
                        position: position
                    }
                });
            }
        }
    }

    NLP.prototype.input = function (text, query) {
        text = NLP.normalize(text);

        text.split(' ').forEach(word => {
            if (this.map[word] !== undefined) {
                if (query[this.map[word].position] !== undefined)
                    query[this.map[word].position] = this.map[word].token;
            }
        });

        return query;
    }

    NLP.punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    NLP.normalize = (text) => {
        let result = text;

        // 구두점 제거
        result = result.replace(new RegExp('[' + NLP.punctuation + ']', "g"), "");

        // 나머지 정규화 과정
        // ...

        return result;
    };

    return table => {
        const instance = new NLP(table);
        return (text, query) => instance.input(text, query);
    };
})();