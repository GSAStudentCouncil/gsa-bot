function Tokenizer(tokens) {
    this.tokens = tokens;
    this.table = {};

    for (let tok in this.tokens) {
        tokens[tok].forEach(e => this.table[e] = tok);
    }
}

Tokenizer.punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

Tokenizer.normalize = (text) => {
    let result = text;

    // 구두점 제거
    result = result.replace(new RegExp('[' + Tokenizer.punctuation + ']', "g"), "");

    // 나머지 정규화 과정
    // ...

    return result;
};

Tokenizer.prototype.input = function (message) {
    const datas = Tokenizer.normalize(message).split(' ');

    const meanings = new Set();
    datas.forEach(data => {
        for (let key in this.table) {
            if (data.startsWith(key)) {     // 일단 시작되는 것으로 판정하나, 나중에 정규표현식으로 어두/미 를 감지하도록 개량할 예정
                meanings.add(this.table[key]);
                break;
            }
        }
    });

    return {
        in: function () {
            const args = Array.from(arguments);

            for (let i = 0; i < args.length; i++) {
                if (!meanings.has(args[i])) {
                    return false;
                }
            }

            return true;
        }
    };
};

const Tokens = (tokens) => {
    const tokenizer = new Tokenizer(tokens);

    return function (msg) {
        return tokenizer.input(msg);
    }
};

const $ = Tokens({
    "급식": ["급식", "밥", "끼니", "음식", "학식", "병영식", "메뉴", "짬", "짬밥", "식단", "식사", "먹", "뭐나", "머나"],
    "아침": ["아침", "조식", "아침밥", "아침급식", "브렉퍼스트", "아침식사"],
    "점심": ["점심", "정오", "중식", "점심밥", "점심급식", "런치", "점심식사"],
    "저녁": ["저녁", "석식", "저녁밥", "저녁급식", "디너", "저녁식사"],
    "오늘": ["오늘", "금일", "금날", "당일", "투데이", "0일", "+0일"],
    "내일": ["내일", "뒷날", "다음날", "내날", "하제", "명일", "익일", "투모로우", "+1일"],
    "모레": ["모레", "내일모레", "낼모레", "명후일", "재명일", "+2일"],
    "글피": ["글피", "삼명일", "저모레", "+3일"],
    "그글피": ["그글피", "그글픠", "저글피", "저낙날", "저글페", "+4일"],
    "어제": ["어제", "전날", "어저께", "작일", "-1일"],
    "그제": ["그제", "전전날", "그저께", "거거일", "재작", "재작일", "-2일"],
    "그끄저께": ["그끄저께", "그끄제", "삼작일", "재재작일", "저먼제", "-3일"],
});

const command = $("아침 밥");

// 의미에 따른 액션
if (command.in("급식")) {
    console.log("아침 급식 ~~");
}