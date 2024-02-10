export declare class Duration {
    constructor(millisecond: number);

    get amount(): number;
    set amount(value: number);

    get millisecond(): number;
    set millisecond(value: number);

    get second(): number;
    set second(value: number);

    get day(): number;
    set day(value: number);

    toString(): string;
}

export declare interface dateTemplate {
    year?: number;
    month?: number;
    day?: number;
}

type $D = globalThis.Date;

export declare class Date {
    constructor(year: number, month: number, day: number);

    get year(): number;
    set year(value: number);

    get month(): number;
    set month(value: number);

    get day(): number;
    set day(value: number);

    toString(): string;
    toObject(): dateTemplate;
}

export declare interface timeTemplate {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare class Time {
    constructor(hour: number, minute: number, second: number, millisecond: number);

    get hour(): number;
    set hour(value: number);

    get minute(): number;
    set minute(value: number);

    get second(): number;
    set second(value: number);

    get millisecond(): number;
    set millisecond(value: number);

    toString(): string;
    toObject(): timeTemplate;
}

export declare interface datetimeSetTemplate extends dateTemplate, timeTemplate {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare interface datetimeGetTemplate extends dateTemplate, timeTemplate {
    year?: number;
    month?: number;
    day?: number;
    weekday?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare interface durationTemplate {
    year?: number;
    month?: number;
    day?: number;
    week?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export declare class Datetime {
    constructor(datetimeObject?: Datetime | $D | datetimeSetTemplate | number | string, locale?: string);

    private _source: $D;
    private _locale: string;

    get date(): Date;
    set date(value: Date);

    get time(): Time;
    set time(value: Time);

    get year(): number;
    set year(value: number);

    get month(): number;
    set month(value: number);

    get day(): number;
    set day(value: number);

    get weekday(): number;
    get weekdayName(): string;

    get hour(): number;
    set hour(value: number);

    get minute(): number;
    set minute(value: number);

    get second(): number;
    set second(value: number);

    get millisecond(): number;
    set millisecond(value: number);

    get locale(): string;
    set locale(value: string);

    timestamp(): number;
    toString(formatString?: string): string;
    toNumber(): number;
    toDate(): $D;
    toObject(): datetimeGetTemplate;

    static fromTimestamp(timestamp: number): Datetime;
    static fromString(dateString: string, locale?: string): Datetime;
    static fromNumber(timestamp: number): Datetime;
    static fromDate(date: $D): Datetime;
    static fromObject(datetimeObject: datetimeSetTemplate): Datetime;

    add(datetimeObject: Datetime | Duration | durationTemplate): Datetime;
    sub(datetimeObject: Datetime | Duration | durationTemplate): Datetime | Duration;
    set(datetimeObject: Datetime | datetimeSetTemplate | Date | Time): Datetime;
    eq(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;
    neq(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;
    ge(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;
    gt(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;
    le(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;
    lt(datetimeObject: Datetime | number | $D | datetimeSetTemplate): boolean;

    static at(hour: number, minute?: number, second?: number, millisecond?: number): Datetime;
    static in(year: number): Datetime;
    static on(month: number, day?: number): Datetime;
    static set(datetimeObject: datetimeSetTemplate): Datetime;
    static parse(dateString: string, locale?: string): Datetime;

    static now(): Datetime;
    static today(): Datetime;
    static tomorrow(): Datetime;
    static yesterday(): Datetime;

    static sunday(): Datetime;
    static monday(): Datetime;
    static tuesday(): Datetime;
    static wednesday(): Datetime;
    static thursday(): Datetime;
    static friday(): Datetime;
    static saturday(): Datetime;

    static january(day?: number): Datetime;
    static february(day?: number): Datetime;
    static march(day?: number): Datetime;
    static april(day?: number): Datetime;
    static may(day?: number): Datetime;
    static june(day?: number): Datetime;
    static july(day?: number): Datetime;
    static august(day?: number): Datetime;
    static september(day?: number): Datetime;
    static october(day?: number): Datetime;
    static november(day?: number): Datetime;
    static december(day?: number): Datetime;

    static isLeapYear(year: number): boolean;
    static leapYearCount(start: number, end: number): number;

    static lengthOfMonth(year: number, month: number): number;
    static lengthOfYear(year: number): number;
    static getWeekDay(weekDayName: string, locale?: string): number;

    isLeapYear(): boolean;
    isWeekend(): boolean;
    isWeekday(): boolean;
    isToday(): boolean;

    lengthOfMonth(): number;
    lengthOfYear(): number;
}