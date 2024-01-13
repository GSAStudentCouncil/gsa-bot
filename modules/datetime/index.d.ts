export declare interface DateObject {
    year?: number;
    month?: number;
    day?: number;
}

export declare interface TimeObject {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare class Datetime_is {
    constructor(datetime: Datetime);
    private _datetime: Datetime;

    sunday(): boolean;
    sun(): boolean;
    monday(): boolean;
    mon(): boolean;
    tuesday(): boolean;
    tue(): boolean;
    wednesday(): boolean;
    wed(): boolean;
    thursday(): boolean;
    thu(): boolean;
    friday(): boolean;
    fri(): boolean;
    saturday(): boolean;
    sat(): boolean;
    january(): boolean;
    jan(): boolean;
    february(): boolean;
    feb(): boolean;
    march(): boolean;
    mar(): boolean;
    april(): boolean;
    apr(): boolean;
    may(): boolean;
    june(): boolean;
    july(): boolean;
    august(): boolean;
    aug(): boolean;
    september(): boolean;
    sep(): boolean;
    october(): boolean;
    oct(): boolean;
    november(): boolean;
    nov(): boolean;
    december(): boolean;
    dec(): boolean;
    leapYear(): boolean;
    weekend(): boolean;
    weekday(): boolean;
    today(): boolean;
    year(year: number): boolean;
    month(month: number): boolean;
    day(day: number): boolean;
    hour(hour: number): boolean;
    minute(minute: number): boolean;
    second(second: number): boolean;
    millisecond(millisecond: number): boolean;
    dayOfWeek(dayOfWeek: number): boolean;
    after(datetime: Datetime): boolean;
    before(datetime: Datetime): boolean;
}

export declare class Datetime_add {
    constructor(datetime: Datetime, value: number);
    private _datetime: Datetime;
    private _value: number;

    year(): Datetime;
    month(): Datetime;
    day(): Datetime;
    hour(): Datetime;
    minute(): Datetime;
    second(): Datetime;
    millisecond(): Datetime;
}

export declare class Datetime_step {
    constructor(datetime: Datetime, direction: number);
    private _datetime: Datetime;
    private _direction: number;

    // TODO: add methods
}

export declare class Datetime {
    constructor(date: Date);
    private _date: Date;
    public year: number;
    public month: number;
    public day: number;
    public hour: number;
    public minute: number;
    public second: number;
    public millisecond: number;
    public dayOfWeek: number;

    dayOfWeekName(): string;
    timestamp(): number;

    at(time: TimeObject): Datetime;
    is(value?: number | Datetime): Datetime_is | boolean;
    add(value: number | Datetime): Datetime_add | Datetime;
    sub(value: number | Datetime): Datetime_add | Datetime;
    next(): Datetime_step;
    prev(): Datetime_step;
    last(): Datetime_step;

    toString(formatString?: string): string;
    toNumber(): number;
    toDate(): Date;

    static isLeapYear(year: number): boolean;
    static leapYearCount(year: number): number;
    static now(): Datetime;
    static today(): Datetime;
    static parse(dateString: string): Datetime;
}
