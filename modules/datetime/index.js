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

function Duration(millisecond) {
    let _v = millisecond;
    property(this, 'millisecond', {
        get() { return _v % 1000; }
    });

    _v = Math.floor(_v / 1000);
    property(this, 'second', {
        get() { return _v % 60; }
    });

    _v = Math.floor(_v / 60);
    _v = Math.floor(_v / 60);
    _v = Math.floor(_v / 24);
    property(this, 'day', {
        get() { return _v; }
    });
}

Duration.prototype = {
    toString() {
        return "(" + "day=" + this.day + ", second=" + this.second + ", millisecond=" + this.millisecond + ")";
    }
}

function DateTime(date) {
    if (!(this instanceof DateTime))
        return new DateTime(date);

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

DateTime.prototype = {
    dayOfWeekName() {
        return this.toString('WW');
    },

    timestamp() {
        return this.toNumber();
    },

    is(value) {
        if (value instanceof DateTime)
            return this.toNumber() === value.toNumber();
        else
            return new DateTime_is(this);
    },

    add(value) {
        value ||= 1;

        if (value instanceof DateTime)
            return new DateTime(new Date(this.toNumber() + value.toNumber()));
        else
            return new DateTime_add(this, value);
    },

    sub(value) {
        value ||= 1;

        if (value instanceof DateTime)
            return new DateTime(new Date(this.toNumber() - value.toNumber()));
        else
            return new DateTime_add(this, -value);
    },

    next() {
        return new DateTime_step(this, 1);
    },

    prev() {
        return new DateTime_step(this, -1);
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
    },

    toObject() {
        return {
            year: this.year,
            month: this.month,
            day: this.day,
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            millisecond: this.millisecond
        };
    }
};

DateTime = Object.assign(DateTime, {
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    leapYearCount(start, end) {
        const l = y => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);

        return l(end) - l(start) + (DateTime.isLeapYear(start) ? 1 : 0);    // [start, end]
    },

    now() {
        return new DateTime(new Date());
    },

    today() {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    },

    tomorrow() {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    },

    yesterday() {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    },

    sunday() {
        const diff = (0 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sun() {
        return DateTime.sunday();
    },

    monday() {
        const diff = (1 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    mon() {
        return DateTime.monday();
    },

    tuesday() {
        const diff = (2 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    tue() {
        return DateTime.tuesday();
    },

    wednesday() {
        const diff = (3 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    wed() {
        return DateTime.wednesday();
    },

    thursday() {
        const diff = (4 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    thu() {
        return DateTime.thursday();
    },

    friday() {
        const diff = (5 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    fri() {
        return DateTime.friday();
    },

    saturday() {
        const diff = (6 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sat() {
        return DateTime.saturday();
    },

    january(day) {
        day ||= 1;
        return new DateTime(new Date(new Date().getFullYear(), 0, day));
    },

    jan(day) {
        return DateTime.january(day);
    },

    february(day) {
        return new DateTime(new Date(new Date().getFullYear(), 1, day));
    },

    feb(day) {
        return DateTime.february(day);
    },

    march(day) {
        return new DateTime(new Date(new Date().getFullYear(), 2, day));
    },

    mar(day) {
        return DateTime.march(day);
    },

    april(day) {
        return new DateTime(new Date(new Date().getFullYear(), 3, day));
    },

    apr(day) {
        return DateTime.april(day);
    },

    may(day) {
        return new DateTime(new Date(new Date().getFullYear(), 4, day));
    },

    june(day) {
        return new DateTime(new Date(new Date().getFullYear(), 5, day));
    },

    jun(day) {
        return DateTime.june(day);
    },

    july(day) {
        return new DateTime(new Date(new Date().getFullYear(), 6, day));
    },

    jul(day) {
        return DateTime.july(day);
    },

    august(day) {
        return new DateTime(new Date(new Date().getFullYear(), 7, day));
    },

    aug(day) {
        return DateTime.august(day);
    },

    september(day) {
        return new DateTime(new Date(new Date().getFullYear(), 8, day));
    },

    sep(day) {
        return DateTime.september(day);
    },

    october(day) {
        return new DateTime(new Date(new Date().getFullYear(), 9, day));
    },

    oct(day) {
        return DateTime.october(day);
    },

    november(day) {
        return new DateTime(new Date(new Date().getFullYear(), 10, day));
    },

    nov(day) {
        return DateTime.november(day);
    },

    december(day) {
        return new DateTime(new Date(new Date().getFullYear(), 11, day));
    },

    dec(day) {
        return DateTime.december(day);
    },

    fromTimestamp(timestamp) {
        return new DateTime(new Date(timestamp));
    },

    fromObject(datetimeObject) {
        const now = new Date();
        const year = datetimeObject.year || now.getFullYear();
        const month = datetimeObject.month || now.getMonth() + 1;
        const day = datetimeObject.day || now.getDate();
        const hour = datetimeObject.hour || now.getHours();
        const minute = datetimeObject.minute || now.getMinutes();
        const second = datetimeObject.second || now.getSeconds();
        const millisecond = datetimeObject.millisecond || now.getMilliseconds();

        return new DateTime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    },

    fromString(datetimeString) {
        return this.parse(datetimeString);
    },

    in(year) {
        return new DateTime(new Date(year, 0, 1));
    },

    on(month, day) {
        day ||= 1;

        return new DateTime(new Date(new Date().getFullYear(), month - 1, day));
    },

    at(hour, minute, second, millisecond) {
        minute ||= 0;
        second ||= 0;
        millisecond ||= 0;

        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(millisecond);

        return new DateTime(date);
    },

    set(year, month, day, hour, minute, second, millisecond) {
        month ||= 1;
        day ||= 1;
        hour ||= 0;
        minute ||= 0;
        second ||= 0;
        millisecond ||= 0;

        return new DateTime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    },

    parse(dateString) {
        // TODO: globalization 사용
        return new DateTime(Date.parse(dateString));
    },
});

function _(value, mode) {
    if (!(this instanceof _))
        return new _(value, mode);

    property(this, '_value', {
        get() { return value; }
    });
    property(this, '_datetime', {
        get() { return new DateTime(new Date()); }
    });
    property(this, '_mode', {
        get() { return mode; }
    });
}

_.prototype = {
    year() {
        return new _(this._value, 'year');
    },
    
    month() {
        return new _(this._value, 'month');
    },
    
    day() {
        return new _(this._value, 'day');
    },
    
    week() {
        return new _(this._value, 'week');
    },
    
    hour() {
        return new _(this._value, 'hour');
    },
    
    minute() {
        return new _(this._value, 'minute');
    },
    
    second() {
        return new _(this._value, 'second');
    },
    
    millisecond() {
        return new _(this._value, 'millisecond');
    },
    
    ago() {
        switch (this._mode) {
            case 'year':
                return this._datetime.sub(this._value).year();
            case 'month':
                return this._datetime.sub(this._value).month();
            case 'day':
                return this._datetime.sub(this._value).day();
            case 'week':
                return this._datetime.sub(this._value).week();
            case 'hour':
                return this._datetime.sub(this._value).hour();
            case 'minute':
                return this._datetime.sub(this._value).minute();
            case 'second':
                return this._datetime.sub(this._value).second();
            case 'millisecond':
                return this._datetime.sub(this._value).millisecond();
            default:
                throw new Error('unknown mode ' + this._mode);
        }
    },
    
    fromNow() {
        switch (this._mode) {
            case 'year':
                return this._datetime.add(this._value).year();
            case 'month':
                return this._datetime.add(this._value).month();
            case 'day':
                return this._datetime.add(this._value).day();
            case 'week':
                return this._datetime.add(this._value).week();
            case 'hour':
                return this._datetime.add(this._value).hour();
            case 'minute':
                return this._datetime.add(this._value).minute();
            case 'second':
                return this._datetime.add(this._value).second();
            case 'millisecond':
                return this._datetime.add(this._value).millisecond();
            default:
                throw new Error('unknown mode ' + this._mode);
        }
    }
}

function DateTime_is(datetime) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
}

DateTime_is.prototype = {
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

    january(day) {
        return this._datetime.month === 1 && (day ? this._datetime.day === day : true);
    },

    jan(day) {
        return this.january(day);
    },

    february(day) {
        return this._datetime.month === 2 && (day ? this._datetime.day === day : true);
    },

    feb(day) {
        return this.february(day);
    },

    march(day) {
        return this._datetime.month === 3 && (day ? this._datetime.day === day : true);
    },

    mar(day) {
        return this.march(day);
    },

    april(day) {
        return this._datetime.month === 4 && (day ? this._datetime.day === day : true);
    },

    apr(day) {
        return this.april(day);
    },

    may(day) {
        return this._datetime.month === 5 && (day ? this._datetime.day === day : true);
    },

    june(day) {
        return this._datetime.month === 6 && (day ? this._datetime.day === day : true);
    },

    jun(day) {
        return this.june(day);
    },

    july(day) {
        return this._datetime.month === 7 && (day ? this._datetime.day === day : true);
    },

    jul(day) {
        return this.july(day);
    },

    august(day) {
        return this._datetime.month === 8 && (day ? this._datetime.day === day : true);
    },

    aug(day) {
        return this.august(day);
    },

    september(day) {
        return this._datetime.month === 9 && (day ? this._datetime.day === day : true);
    },

    sep(day) {
        return this.september(day);
    },

    october(day) {
        return this._datetime.month === 10 && (day ? this._datetime.day === day : true);
    },

    oct(day) {
        return this.october(day);
    },

    november(day) {
        return this._datetime.month === 11 && (day ? this._datetime.day === day : true);
    },

    nov(day) {
        return this.november(day);
    },

    december(day) {
        return this._datetime.month === 12 && (day ? this._datetime.day === day : true);
    },

    dec(day) {
        return this.december(day);
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

function DateTime_add(datetime, value) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
    property(this, '_value', {
        get() { return value; }
    });
}

DateTime_add.prototype = {
    year() {
        const date = this._datetime.toDate();
        date.setFullYear(date.getFullYear() + this._value);
        return new DateTime(date);
    },

    month() {
        const date = this._datetime.toDate();
        date.setMonth(date.getMonth() + this._value);
        return new DateTime(date);
    },

    day() {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value);
        return new DateTime(date);
    },

    week() {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value * 7);
        return new DateTime(date);
    },

    hour() {
        const date = this._datetime.toDate();
        date.setHours(date.getHours() + this._value);
        return new DateTime(date);
    },

    minute() {
        const date = this._datetime.toDate();
        date.setMinutes(date.getMinutes() + this._value);
        return new DateTime(date);
    },

    second() {
        const date = this._datetime.toDate();
        date.setSeconds(date.getSeconds() + this._value);
        return new DateTime(date);
    },

    millisecond() {
        const date = this._datetime.toDate();
        date.setMilliseconds(date.getMilliseconds() + this._value);
        return new DateTime(date);
    }
};

function DateTime_step(datetime, direction) {
    property(this, '_datetime', {
        get() { return datetime; }
    });
    property(this, '_direction', {
        get() { return direction; }
    });
}

DateTime_step.prototype = {
    week() {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._direction * 7);
        return new date(date);
    }
};

exports.DateTime = DateTime;
exports._ = _;
