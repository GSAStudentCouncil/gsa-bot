class NaturalLanguageProcessor {
    constructor

    analyze(text: string): string {
        return "The text contains " + text.split(" ").length + " words.";
    }
}

const NLP = new NaturalLanguageProcessor({
    '급식': ['밥', '급식', '메뉴'],
    '일정': ['일정', '일정표', '시간표'],
    '날씨': ['날씨', '기상', '온도'],
    '날짜': [/\d+월 \d+일/]
}, {
    '급식': {
        '날짜': (급식: string, 날짜: string) => {
            
        }
    }
});

