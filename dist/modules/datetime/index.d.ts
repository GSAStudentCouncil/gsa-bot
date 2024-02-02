export declare class duration {
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

export declare class date {
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

export declare class time {
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

export declare class datetime {
    constructor(datetimeObject: datetime | number | Date | datetimeSetTemplate, locale?: string);

    get date(): date;
    set date(value: date);

    get time(): time;
    set time(value: time);

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
    toDate(): Date;
    toObject(): datetimeGetTemplate;

    add(datetimeObject: duration | durationTemplate): datetime;
    sub(datetimeObject: datetime | duration | durationTemplate): datetime | duration;
    set(datetimeObject: datetime | datetimeSetTemplate | date | time): datetime;
    eq(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;
    neq(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;
    ge(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;
    gt(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;
    le(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;
    lt(datetimeObject: datetime | number | Date | datetimeSetTemplate): boolean;

    static at(hour: number, minute?: number, second?: number, millisecond?: number): datetime;
    static in(year: number): datetime;
    static on(month: number, day?: number): datetime;
    static set(year: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): datetime;
    static parse(dateString: string, locale: string = 'ko-KR'): datetime;

    static now(): datetime;
    static today(): datetime;
    static tomorrow(): datetime;
    static yesterday(): datetime;

    static sunday(): datetime;
    static monday(): datetime;
    static tuesday(): datetime;
    static wednesday(): datetime;
    static thursday(): datetime;
    static friday(): datetime;
    static saturday(): datetime;

    static january(day?: number): datetime;
    static february(day?: number): datetime;
    static march(day?: number): datetime;
    static april(day?: number): datetime;
    static may(day?: number): datetime;
    static june(day?: number): datetime;
    static july(day?: number): datetime;
    static august(day?: number): datetime;
    static september(day?: number): datetime;
    static october(day?: number): datetime;
    static november(day?: number): datetime;
    static december(day?: number): datetime;

    static isLeapYear(year: number): boolean;
    static leapYearCount(start: number, end: number): number;

    isLeapYear(): boolean;
    isWeekend(): boolean;
    isWeekday(): boolean;
    isToday(): boolean;
}