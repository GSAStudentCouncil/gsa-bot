// TODO: date 를 간편하게 조작하는 라이브러리 - essentialib 에서 가져오기

const property = (that, key, functions) => {
    const attributes = {};
    if (functions.get)
        attributes.get = functions.get;

    if (functions.set)
        attributes.set = functions.set;
    else
        attributes.configurable = false;

    Object.defineProperty(that, key, attributes);
};

function Datetime(date) {
    property(this, 'year', {
        get() { return date.getFullYear(); },
        set(value) { date.setFullYear(value); }
    });
    property(this, 'month', {
        get() { return date.getMonth() + 1; },
        set(value) { date.setMonth(value - 1); }
    });
    property(this, 'day', {
        get() { return date.getDate(); },
        set(value) { date.setDate(value); }
    });
    property(this, 'hour', {
        get() { return date.getHours(); },
        set(value) { date.setHours(value); }
    });
    property(this, 'minute', {
        get() { return date.getMinutes(); },
        set(value) { date.setMinutes(value); }
    });
    property(this, 'second', {
        get() { return date.getSeconds(); },
        set(value) { date.setSeconds(value); }
    });
    property(this, 'millisecond', {
        get() { return date.getMilliseconds(); },
        set(value) { date.setMilliseconds(value); }
    });
    property(this, 'dayOfWeek', {
        get() { return date.getDay(); }
    });
    property(this, '_date', {
        get() { return date; }
    });
}

Datetime.prototype = {
    dayOfWeekName() {
        return this.toString('WW');
    },

    timestamp() {
        return this.toNumber();
    },

    at(time) {
        const date = this.toDate();
        if (time.hour)
            date.setHours(time.hour);
        if (time.minute)
            date.setMinutes(time.minute);
        if (time.second)
            date.setSeconds(time.second);
        if (time.millisecond)
            date.setMilliseconds(time.millisecond);

        return new Datetime(date);
    },

    is(value) {
        if (value instanceof Datetime)
            return this.toNumber() === value.toNumber();
        else
            return new Datetime_is(this);
    },

    add(value) {
        if (value instanceof Datetime)
            return new Datetime(new Date(this.toNumber() + value.toNumber()));
        else
            return new Datetime_add(this, value);
    },

    sub(value) {
        if (value instanceof Datetime)
            return new Datetime(new Date(this.toNumber() - value.toNumber()));
        else
            return new Datetime_add(this, -value);
    },

    next() {
        return new Datetime_step(this, 1);
    },

    prev() {
        return new Datetime_step(this, -1);
    },

    last() {
        return this.prev();
    },

    toString(formatString) {
        const locale = 'ko-KR';     // TODO: auto locale detect - DB(android data)에서 가져오기?
        if (!/[a-z]{2}-[A-Z]{2}/.test(locale))
            throw new Error('Invalid locale formatString, must be like "ko-KR"');

        const cultureInfo = require("./globalization/" + locale + ".json");     // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
        if (!cultureInfo)
            throw new Error('Invalid locale, not found ' + locale);

        formatString = formatString || cultureInfo['formats']['full'];
        return formatString.replace(/ss?s?|mm?|hh?|ii?|t|DD?|WW?|MM?M?M?|YY(?:YY)?/g, (match) => {
            switch (match) {
                case 's':
                    return this.second;
                case 'ss':
                    return this.second.toString().padStart(2, '0');
                case 'sss':
                    return this.millisecond;
                case 'm':
                    return this.minute;
                case 'mm':
                    return this.minute.toString().padStart(2, '0');
                case 'h':
                    return this.hour === 12 ? 12 : this.hour % 12;
                case 'hh':
                    return (this.hour === 12 ? 12 : this.hour % 12).toString().padStart(2, '0');
                case 'i':
                    return this.hour;
                case 'ii':
                    return this.hour.toString().padStart(2, '0');
                case 't':
                    return cultureInfo['t'][this.hour < 12 ? 0 : 1];
                case 'D':
                    return this.day;
                case 'DD':
                    return this.day.toString().padStart(2, '0');
                case 'W':
                    return cultureInfo['W'][this.dayOfWeek];
                case 'WW':
                    return cultureInfo['WW'][this.dayOfWeek];
                case 'M':
                    return this.month;
                case 'MM':
                    return this.month.toString().padStart(2, '0');
                case 'MMM':
                    return cultureInfo['MMM'][this.month - 1];
                case 'MMMM':
                    return cultureInfo['MMMM'][this.month - 1];
                case 'YY':
                    return this.year % 100;
                case 'YYYY':
                    return this.year;
                default:
                    throw new Error(`unknown format ${match}`);
            }
        });
    },

    toNumber() {
        return this._date.getTime();
    },

    toDate() {
        return this._date;
    }
};

Datetime = Object.assign(Datetime, {
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    leapYearCount(start, end) {
        const l = y => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);

        return l(end) - l(start) + (Datetime.isLeapYear(start) ? 1 : 0);    // [start, end]
    },

    now() {
        return new Datetime(new Date());
    },

    today() {
        const now = new Date();
        return new Datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    },

    parse(dateString) {
        // TODO: globalization 사용
        return new Datetime(Date.parse(dateString));
    }
});

function Datetime_is(datetime) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
}

Datetime_is.prototype = {
    sunday() {
        return this._datetime.dayOfWeek === 0;
    },

    sun() {
        return this.sunday();
    },

    monday() {
        return this._datetime.dayOfWeek === 1;
    },

    mon() {
        return this.monday();
    },

    tuesday() {
        return this._datetime.dayOfWeek === 2;
    },

    tue() {
        return this.tuesday();
    },

    wednesday() {
        return this._datetime.dayOfWeek === 3;
    },

    wed() {
        return this.wednesday();
    },

    thursday() {
        return this._datetime.dayOfWeek === 4;
    },

    thu() {
        return this.thursday();
    },

    friday() {
        return this._datetime.dayOfWeek === 5;
    },

    fri() {
        return this.friday();
    },

    saturday() {
        return this._datetime.dayOfWeek === 6;
    },

    sat() {
        return this.saturday();
    },

    january() {
        return this._datetime.month === 1;
    },

    jan() {
        return this.january();
    },

    february() {
        return this._datetime.month === 2;
    },

    feb() {
        return this.february();
    },

    march() {
        return this._datetime.month === 3;
    },

    mar() {
        return this.march();
    },

    april() {
        return this._datetime.month === 4;
    },

    apr() {
        return this.april();
    },

    may() {
        return this._datetime.month === 5;
    },

    june() {
        return this._datetime.month === 6;
    },

    july() {
        return this._datetime.month === 7;
    },

    august() {
        return this._datetime.month === 8;
    },

    aug() {
        return this.august();
    },

    september() {
        return this._datetime.month === 9;
    },

    sep() {
        return this.september();
    },

    october() {
        return this._datetime.month === 10;
    },

    oct() {
        return this.october();
    },

    november() {
        return this._datetime.month === 11;
    },

    nov() {
        return this.november();
    },

    december() {
        return this._datetime.month === 12;
    },

    dec() {
        return this.december();
    },

    leapYear() {
        return (this._datetime.year % 4 === 0 && this._datetime.year % 100 !== 0) || this._datetime.year % 400 === 0;
    },

    weekend() {
        return this._datetime.dayOfWeek === 0 || this._datetime.dayOfWeek === 6;
    },

    weekday() {
        return !this.weekend();
    },

    today() {
        const now = new Date();
        return this._datetime.year === now.getFullYear() && this._datetime.month === now.getMonth() + 1 && this._datetime.day === now.getDate();
    },

    year(year) {
        return this._datetime.year === year;
    },

    month(month) {
        return this._datetime.month === month;
    },

    day(day) {
        return this._datetime.day === day;
    },

    hour(hour) {
        return this._datetime.hour === hour;
    },

    minute(minute) {
        return this._datetime.minute === minute;
    },

    second(second) {
        return this._datetime.second === second;
    },

    millisecond(millisecond) {
        return this._datetime.millisecond === millisecond;
    },

    dayOfWeek(dayOfWeek) {
        return this._datetime.dayOfWeek === dayOfWeek;
    },

    after(datetime) {
        return this._datetime.toNumber() > datetime.toNumber();
    },

    before(datetime) {
        return this._datetime.toNumber() < datetime.toNumber();
    }
};

function Datetime_add(datetime, value) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
    property(this, '_value', {
        get() { return value; }
    });
}

Datetime_add.prototype = {
    year() {
        const date = this._datetime.toDate();
        date.setFullYear(date.getFullYear() + this._value);
        return new Datetime(date);
    },

    month() {
        const date = this._datetime.toDate();
        date.setMonth(date.getMonth() + this._value);
        return new Datetime(date);
    },

    day() {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value);
        return new Datetime(date);
    },

    hour() {
        const date = this._datetime.toDate();
        date.setHours(date.getHours() + this._value);
        return new Datetime(date);
    },

    minute() {
        const date = this._datetime.toDate();
        date.setMinutes(date.getMinutes() + this._value);
        return new Datetime(date);
    },

    second() {
        const date = this._datetime.toDate();
        date.setSeconds(date.getSeconds() + this._value);
        return new Datetime(date);
    },

    millisecond() {
        const date = this._datetime.toDate();
        date.setMilliseconds(date.getMilliseconds() + this._value);
        return new Datetime(date);
    }
};

function Datetime_step(datetime, direction) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
    property(this, '_direction', {
        get() { return direction; }
    });
}

Datetime_step.prototype = {

};

exports.Datetime = Datetime;