// 품사 태깅을 위한 Enum 정의 (Tag)
enum Tag {
    NOUN = 'Noun',
    VERB = 'Verb',
    ADJECTIVE = 'Adjective',
    ADVERB = 'Adverb',
    JOSA = 'Josa',
    PUNCTUATION = 'Punctuation',
    UNKNOWN = 'Unknown'
}

// 형태소를 나타내는 클래스
class Morpheme {
    public word: string;
    public tag: Tag;

    constructor(word: string, tag: Tag) {
        this.word = word;
        this.tag = tag;
    }

    // 형태소 정보를 문자열로 반환
    public toString(): string {
        return `${this.word} (${this.tag})`;
    }
}

// 복합어 패턴을 정의하는 인터페이스
interface ComplexWordPattern {
    ending: string;          // 복합어의 끝 부분 (ex. '하다', '되다')
    firstTag: Tag;  // 복합어에서 앞부분의 품사 (ex. Noun)
    secondTag: Tag; // 복합어에서 뒷부분의 품사 (ex. Verb)
}

// 형태소 분석기 클래스
class MorphAnalyzer {
    private postpositions: Set<string>;
    private verbEndings: Set<string>;
    private adjectiveEndings: Set<string>;
    private adverbs: Set<string>;
    private punctuation: Set<string>;
    private complexPatterns: ComplexWordPattern[];
    private cache: Map<string, Morpheme[]>; // 캐시를 위한 Map 객체

    constructor() {
        // 조사 목록을 Set으로 변경하여 빠른 검색 가능
        this.postpositions = new Set([
            '을', '를', '이', '가', '에', '에서', '의', '도', '은', '는', '와', '과', '께서',
            '한테', '에게', '으로', '까지', '부터', '보다', '으로서', '로서', '에다가', '에게서'
        ]);
        
        // 복합어 처리를 위한 동사 및 형용사 패턴도 Set으로 관리
        this.verbEndings = new Set(['고 있다', '고 하다', '겠다', '했다', '한다', '할 것이다', '해라', '되다']);
        this.adjectiveEndings = new Set(['은', '한', '한데', '할', '해', '지다']);
        this.adverbs = new Set(['매우', '아주', '정말']);
        
        // 구두점 목록을 string.punctuation과 동일하게 정의하여 Set으로 사용
        this.punctuation = new Set<string>(['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', 
                                            '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', 
                                            '{', '|', '}', '~']);
        
        // 복합어 패턴 배열 정의
        this.complexPatterns = [
            { ending: '하다', firstTag: Tag.NOUN, secondTag: Tag.VERB },
            { ending: '되다', firstTag: Tag.NOUN, secondTag: Tag.VERB },
            { ending: '지다', firstTag: Tag.ADJECTIVE, secondTag: Tag.VERB },
            { ending: '하고', firstTag: Tag.NOUN, secondTag: Tag.VERB }
        ];

        // 캐시 생성
        this.cache = new Map();
    }

    // 단어에서 조사를 분리 (Set을 사용하여 빠르게 검색)
    private splitWordAndPostposition(word: string): [string, string | null] {
        for (const post of this.postpositions) {
            if (word.endsWith(post)) {
                return [word.slice(0, -post.length), post];
            }
        }
        return [word, null];
    }

    // 동사, 형용사, 부사 패턴 확인 (Set을 사용하여 최적화)
    private checkContextualPatterns(word: string): Tag | null {
        if (this.adverbs.has(word)) {
            return Tag.ADVERB;
        }

        for (const pattern of this.verbEndings) {
            if (word.endsWith(pattern)) {
                return Tag.VERB;
            }
        }

        for (const pattern of this.adjectiveEndings) {
            if (word.endsWith(pattern)) {
                return Tag.ADJECTIVE;
            }
        }

        return null;
    }

    // 복합어 처리 (Set을 사용한 끝 부분 패턴 탐색)
    private splitComplexWord(word: string): Morpheme[] | null {
        for (const pattern of this.complexPatterns) {
            if (word.endsWith(pattern.ending) && word.length > pattern.ending.length) {
                return [
                    new Morpheme(word.slice(0, -pattern.ending.length), pattern.firstTag),
                    new Morpheme(pattern.ending, pattern.secondTag)
                ];
            }
        }
        return null;
    }

    // 단어의 품사 구분
    private identifyPos(word: string): Morpheme[] {
        // 캐시에 결과가 있는지 확인
        if (this.cache.has(word)) {
            // console.debug(`Cache hit for '${word}'`);
            return this.cache.get(word)!;
        }

        // 복합어 처리
        const complexSplit = this.splitComplexWord(word);
        if (complexSplit) {
            this.cache.set(word, complexSplit); // 캐시 저장
            return complexSplit;
        }

        // 조사 분리
        let [wordClean, postposition] = this.splitWordAndPostposition(word);
        if (wordClean === '') {
            wordClean = postposition!;
            postposition = null;
        }

        // 패턴 확인
        const tag = this.checkContextualPatterns(wordClean);
        let morphemes: Morpheme[];

        if (tag) {
            morphemes = [new Morpheme(wordClean, tag)];
        } else {
            if (wordClean.endsWith('다')) {
                morphemes = [new Morpheme(wordClean, Tag.VERB)];
            } else if (wordClean.endsWith('한') || wordClean.endsWith('은')) {
                morphemes = [new Morpheme(wordClean, Tag.ADJECTIVE)];
            } else {
                morphemes = [new Morpheme(wordClean, Tag.NOUN)];
            }
        }

        // 조사 있으면 추가
        if (postposition) {
            morphemes.push(new Morpheme(postposition, Tag.JOSA));
        }

        this.cache.set(word, morphemes); // 캐시 저장
        return morphemes;
    }

    // 구두점 처리 및 단어 형태소 분석
    private tokenToMorpheme(token: string): Morpheme[] {
        const result: Morpheme[] = [];
        let currentWord = "";

        for (const char of token) {
            if (this.punctuation.has(char)) {
                if (currentWord) {
                    result.push(...this.identifyPos(currentWord));
                    currentWord = "";
                }
                result.push(new Morpheme(char, Tag.PUNCTUATION));
            } else {
                currentWord += char;
            }
        }

        if (currentWord) {
            result.push(...this.identifyPos(currentWord));
        }

        return result;
    }

    public morph(text: string): Morpheme[] {
        const tokens = text.split(" ");
        let morphemes: Morpheme[] = tokens.flatMap(token => this.tokenToMorpheme(token));
        return morphemes;
    }
}

// 형태소 분석기 객체 생성
const analyzer = new MorphAnalyzer();
const query = "밥 주세요";

console.time(`Morpheme Analysis for '${query}'`);
console.log(analyzer.morph(query));
console.timeEnd(`Morpheme Analysis for '${query}'`);
