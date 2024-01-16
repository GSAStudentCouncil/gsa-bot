type QueryObject = object;
type WordTable = object;

export declare class NLP {
    constructor(table: WordTable);
    private map: object;

    input<T extends object>(text: string, query: T): { [K in keyof T]: (string | null | undefined)[] };

    static punctuation: string;
    static normalize(text: string): string;
}

export declare function Tokenizer<T extends object>(table: WordTable): (text: string, query: T) => { [K in keyof T]: (string | null | undefined)[] };
