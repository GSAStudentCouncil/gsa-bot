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

export declare interface DateTimeObject {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare class DateTime_is {
    constructor(datetime: DateTime);
    private _datetime: DateTime;

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
    january(day?: number): boolean;
    jan(day?: number): boolean;
    february(day?: number): boolean;
    feb(day?: number): boolean;
    march(day?: number): boolean;
    mar(day?: number): boolean;
    april(day?: number): boolean;
    apr(day?: number): boolean;
    may(day?: number): boolean;
    june(day?: number): boolean;
    jun(day?: number): boolean;
    july(day?: number): boolean;
    jul(day?: number): boolean;
    august(day?: number): boolean;
    aug(day?: number): boolean;
    september(day?: number): boolean;
    sep(day?: number): boolean;
    october(day?: number): boolean;
    oct(day?: number): boolean;
    november(day?: number): boolean;
    nov(day?: number): boolean;
    december(day?: number): boolean;
    dec(day?: number): boolean;
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
    after(datetime: DateTime): boolean;
    before(datetime: DateTime): boolean;
}

export declare class DateTime_add {
    constructor(datetime: DateTime, value: number);
    private _datetime: DateTime;
    private _value: number;

    year(): DateTime;
    month(): DateTime;
    day(): DateTime;
    hour(): DateTime;
    minute(): DateTime;
    second(): DateTime;
    millisecond(): DateTime;
}

export declare class DateTime_step {
    constructor(datetime: DateTime, direction: number);
    private _datetime: DateTime;
    private _direction: number;

    // TODO: add methods
}

export declare class DateTime {
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

    at(time: TimeObject): DateTime;
    is(value?: number | DateTime): DateTime_is | boolean;
    add(value?: number | DateTime): DateTime_add | DateTime;
    sub(value?: number | DateTime): DateTime_add | DateTime;
    next(): DateTime_step;
    prev(): DateTime_step;
    last(): DateTime_step;

    toString(formatString?: string): string;
    toNumber(): number;
    toDate(): Date;

    static isLeapYear(year: number): boolean;
    static leapYearCount(year: number): number;
    static now(): DateTime;
    static today(): DateTime;
    static tomorrow(): DateTime;
    static yesterday(): DateTime;
    static sunday(): DateTime;
    static sun(): DateTime;
    static monday(): DateTime;
    static mon(): DateTime;
    static tuesday(): DateTime;
    static tue(): DateTime;
    static wednesday(): DateTime;
    static wed(): DateTime;
    static thursday(): DateTime;
    static thu(): DateTime;
    static friday(): DateTime;
    static fri(): DateTime;
    static saturday(): DateTime;
    static sat(): DateTime;
    static january(day?: number): DateTime;
    static jan(day?: number): DateTime;
    static february(day?: number): DateTime;
    static feb(day?: number): DateTime;
    static march(day?: number): DateTime;
    static mar(day?: number): DateTime;
    static april(day?: number): DateTime;
    static apr(day?: number): DateTime;
    static may(day?: number): DateTime;
    static june(day?: number): DateTime;
    static jun(day?: number): DateTime;
    static july(day?: number): DateTime;
    static jul(day?: number): DateTime;
    static august(day?: number): DateTime;
    static aug(day?: number): DateTime;
    static september(day?: number): DateTime;
    static sep(day?: number): DateTime;
    static october(day?: number): DateTime;
    static oct(day?: number): DateTime;
    static november(day?: number): DateTime;
    static nov(day?: number): DateTime;
    static december(day?: number): DateTime;
    static dec(day?: number): DateTime;
    static fromTimestamp(timestamp: number): DateTime;
    static fromObject(datetimeObject: DateTimeObject): DateTime;
    static fromString(datetimeString: string): DateTime;
    static parse(dateString: string): DateTime;
}
