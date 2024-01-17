const property = function (that, key, functions) {
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
    property(this, 'millisecond', {
        get: function () {
            return millisecond % 1000;
        }
    });

    property(this, 'second', {
        get: function () {
            return Math.floor(millisecond / 1000) % (60 * 60 * 24);
        }
    });

    property(this, 'day', {
        get: function () {
            return Math.floor(millisecond / (1000 * 60 * 60 * 24));
        }
    });
}

Duration.prototype = {
    toString: function () {
        return "(" + "day=" + this.day + ", second=" + this.second + ", millisecond=" + this.millisecond + ")";
    }
}

function DateTime(date) {
    if (!(this instanceof DateTime))
        return new DateTime(date);

    property(this, 'year', {
        get: function () {
            return date.getFullYear();
        },
        set: function (value) {
            date.setFullYear(value);
        }
    });
    property(this, 'month', {
        get: function () {
            return date.getMonth() + 1;
        },
        set: function (value) {
            date.setMonth(value - 1);
        }
    });
    property(this, 'day', {
        get: function () {
            return date.getDate();
        },
        set: function (value) {
            date.setDate(value);
        }
    });
    property(this, 'hour', {
        get: function () {
            return date.getHours();
        },
        set: function (value) {
            date.setHours(value);
        }
    });
    property(this, 'minute', {
        get: function () {
            return date.getMinutes();
        },
        set: function (value) {
            date.setMinutes(value);
        }
    });
    property(this, 'second', {
        get: function () {
            return date.getSeconds();
        },
        set: function (value) {
            date.setSeconds(value);
        }
    });
    property(this, 'millisecond', {
        get: function () {
            return date.getMilliseconds();
        },
        set: function (value) {
            date.setMilliseconds(value);
        }
    });
    property(this, 'dayOfWeek', {
        get: function () {
            return date.getDay();
        }
    });
    property(this, '_date', {
        get: function () {
            return date;
        }
    });
}

DateTime.prototype = {
    dayOfWeekName: function () {
        return this.toString('WW');
    },

    timestamp: function () {
        return this.toNumber();
    },

    is: function (value) {
        if (value instanceof DateTime)
            return this.toNumber() === value.toNumber();
        else
            return new DateTime_is(this);
    },

    add: function (value) {
        value = value || 1;

        if (value instanceof DateTime)
            throw new TypeError("Cannot add DateTime to DateTime");
        else
            return new DateTime_add(this, value);
    },

    sub: function (value) {
        value = value || 1;

        if (value instanceof DateTime)
            return new Duration(this.toNumber() - value.toNumber());
        else
            return new DateTime_add(this, -value);
    },

    next: function () {
        return new DateTime_step(this, 1);
    },

    prev: function () {
        return new DateTime_step(this, -1);
    },

    last: function () {
        return this.prev();
    },

    toString: function (formatString) {
        const locale = 'ko-KR';     // TODO: auto locale detect - DB(android data)에서 가져오기?
        if (!/[a-z]{2}-[A-Z]{2}/.test(locale))
            throw new Error('Invalid locale formatString, must be like "ko-KR"');

        const cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + locale + ".json"));     // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
        // const cultureInfo = require('./globalization/' + locale + '.json');
        if (!cultureInfo)
            throw new Error('Invalid locale, not found ' + locale);

        formatString = formatString || cultureInfo['formats']['full'];
        return formatString.replace(/ss?s?|mm?|hh?|ii?|t|DD?|WW?|MM?M?M?|YY(?:YY)?/g, match => {
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

    toNumber: function () {
        return this._date.getTime();
    },

    toDate: function () {
        return this._date;
    },

    toObject: function () {
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
    isLeapYear: function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    leapYearCount: function (start, end) {
        const l = y => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);

        return l(end) - l(start) + (DateTime.isLeapYear(start) ? 1 : 0);    // [start, end]
    },

    now: function () {
        return new DateTime(new Date());
    },

    today: function () {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    },

    tomorrow: function () {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    },

    yesterday: function () {
        const now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    },

    sunday: function () {
        const diff = (0 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sun: function () {
        return DateTime.sunday();
    },

    monday: function () {
        const diff = (1 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    mon: function () {
        return DateTime.monday();
    },

    tuesday: function () {
        const diff = (2 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    tue: function () {
        return DateTime.tuesday();
    },

    wednesday: function () {
        const diff = (3 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    wed: function () {
        return DateTime.wednesday();
    },

    thursday: function () {
        const diff = (4 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    thu: function () {
        return DateTime.thursday();
    },

    friday: function () {
        const diff = (5 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    fri: function () {
        return DateTime.friday();
    },

    saturday: function () {
        const diff = (6 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sat: function () {
        return DateTime.saturday();
    },

    january: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 0, day));
    },

    jan: function (day) {
        return DateTime.january(day);
    },

    february: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 1, day));
    },

    feb: function (day) {
        return DateTime.february(day);
    },

    march: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 2, day));
    },

    mar: function (day) {
        return DateTime.march(day);
    },

    april: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 3, day));
    },

    apr: function (day) {
        return DateTime.april(day);
    },

    may: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 4, day));
    },

    june: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 5, day));
    },

    jun: function (day) {
        return DateTime.june(day);
    },

    july: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 6, day));
    },

    jul: function (day) {
        return DateTime.july(day);
    },

    august: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 7, day));
    },

    aug: function (day) {
        return DateTime.august(day);
    },

    september: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 8, day));
    },

    sep: function (day) {
        return DateTime.september(day);
    },

    october: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 9, day));
    },

    oct: function (day) {
        return DateTime.october(day);
    },

    november: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 10, day));
    },

    nov: function (day) {
        return DateTime.november(day);
    },

    december: function (day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 11, day));
    },

    dec: function (day) {
        return DateTime.december(day);
    },

    fromTimestamp: function (timestamp) {
        return new DateTime(new Date(timestamp));
    },

    fromObject: function (datetimeObject) {
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

    fromString: function (datetimeString) {
        return this.parse(datetimeString);
    },

    in: function (year) {
        return new DateTime(new Date(year, 0, 1));
    },

    on: function (month, day) {
        day = day || 1;

        return new DateTime(new Date(new Date().getFullYear(), month - 1, day));
    },

    at: function (hour, minute, second, millisecond) {
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;

        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(millisecond);

        return new DateTime(date);
    },

    set: function (year, month, day, hour, minute, second, millisecond) {
        month = month || 1;
        day = day || 1;
        hour = hour || 0;
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;

        return new DateTime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    },

    parse: function (dateString) {
        // TODO: globalization 사용
        return new DateTime(Date.parse(dateString));
    },
});

function _(value, mode) {
    if (!(this instanceof _))
        return new _(value, mode);

    property(this, '_value', {
        get: function () {
            return value;
        }
    });
    property(this, '_datetime', {
        get: function () {
            return new DateTime(new Date());
        }
    });
    property(this, '_mode', {
        get: function () {
            return mode;
        }
    });
}

_.prototype = {
    year: function () {
        return new _(this._value, 'year');
    },

    month: function () {
        return new _(this._value, 'month');
    },

    day: function () {
        return new _(this._value, 'day');
    },

    week: function () {
        return new _(this._value, 'week');
    },

    hour: function () {
        return new _(this._value, 'hour');
    },

    minute: function () {
        return new _(this._value, 'minute');
    },

    second: function () {
        return new _(this._value, 'second');
    },

    millisecond: function () {
        return new _(this._value, 'millisecond');
    },

    ago: function () {
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

    fromNow: function () {
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
        get: function () {
            return datetime;
        }
    });
}

DateTime_is.prototype = {
    sunday: function () {
        return this._datetime.dayOfWeek === 0;
    },

    sun: function () {
        return this.sunday();
    },

    monday: function () {
        return this._datetime.dayOfWeek === 1;
    },

    mon: function () {
        return this.monday();
    },

    tuesday: function () {
        return this._datetime.dayOfWeek === 2;
    },

    tue: function () {
        return this.tuesday();
    },

    wednesday: function () {
        return this._datetime.dayOfWeek === 3;
    },

    wed: function () {
        return this.wednesday();
    },

    thursday: function () {
        return this._datetime.dayOfWeek === 4;
    },

    thu: function () {
        return this.thursday();
    },

    friday: function () {
        return this._datetime.dayOfWeek === 5;
    },

    fri: function () {
        return this.friday();
    },

    saturday: function () {
        return this._datetime.dayOfWeek === 6;
    },

    sat: function () {
        return this.saturday();
    },

    january: function (day) {
        return this._datetime.month === 1 && (day ? this._datetime.day === day : true);
    },

    jan: function (day) {
        return this.january(day);
    },

    february: function (day) {
        return this._datetime.month === 2 && (day ? this._datetime.day === day : true);
    },

    feb: function (day) {
        return this.february(day);
    },

    march: function (day) {
        return this._datetime.month === 3 && (day ? this._datetime.day === day : true);
    },

    mar: function (day) {
        return this.march(day);
    },

    april: function (day) {
        return this._datetime.month === 4 && (day ? this._datetime.day === day : true);
    },

    apr: function (day) {
        return this.april(day);
    },

    may: function (day) {
        return this._datetime.month === 5 && (day ? this._datetime.day === day : true);
    },

    june: function (day) {
        return this._datetime.month === 6 && (day ? this._datetime.day === day : true);
    },

    jun: function (day) {
        return this.june(day);
    },

    july: function (day) {
        return this._datetime.month === 7 && (day ? this._datetime.day === day : true);
    },

    jul: function (day) {
        return this.july(day);
    },

    august: function (day) {
        return this._datetime.month === 8 && (day ? this._datetime.day === day : true);
    },

    aug: function (day) {
        return this.august(day);
    },

    september: function (day) {
        return this._datetime.month === 9 && (day ? this._datetime.day === day : true);
    },

    sep: function (day) {
        return this.september(day);
    },

    october: function (day) {
        return this._datetime.month === 10 && (day ? this._datetime.day === day : true);
    },

    oct: function (day) {
        return this.october(day);
    },

    november: function (day) {
        return this._datetime.month === 11 && (day ? this._datetime.day === day : true);
    },

    nov: function (day) {
        return this.november(day);
    },

    december: function (day) {
        return this._datetime.month === 12 && (day ? this._datetime.day === day : true);
    },

    dec: function (day) {
        return this.december(day);
    },

    leapYear: function () {
        return (this._datetime.year % 4 === 0 && this._datetime.year % 100 !== 0) || this._datetime.year % 400 === 0;
    },

    weekend: function () {
        return this._datetime.dayOfWeek === 0 || this._datetime.dayOfWeek === 6;
    },

    weekday: function () {
        return !this.weekend();
    },

    today: function () {
        const now = new Date();
        return this._datetime.year === now.getFullYear() && this._datetime.month === now.getMonth() + 1 && this._datetime.day === now.getDate();
    },

    year: function (year) {
        return this._datetime.year === year;
    },

    month: function (month) {
        return this._datetime.month === month;
    },

    day: function (day) {
        return this._datetime.day === day;
    },

    hour: function (hour) {
        return this._datetime.hour === hour;
    },

    minute: function (minute) {
        return this._datetime.minute === minute;
    },

    second: function (second) {
        return this._datetime.second === second;
    },

    millisecond: function (millisecond) {
        return this._datetime.millisecond === millisecond;
    },

    dayOfWeek: function (dayOfWeek) {
        return this._datetime.dayOfWeek === dayOfWeek;
    },

    after: function (datetime) {
        return this._datetime.toNumber() > datetime.toNumber();
    },

    before: function (datetime) {
        return this._datetime.toNumber() < datetime.toNumber();
    }
};

function DateTime_add(datetime, value) {
    property(this, '_datetime', {
        get: function () {
            return datetime;
        }
    });
    property(this, '_value', {
        get: function () {
            return value;
        }
    });
}

DateTime_add.prototype = {
    year: function () {
        const date = this._datetime.toDate();
        date.setFullYear(date.getFullYear() + this._value);
        return new DateTime(date);
    },

    month: function () {
        const date = this._datetime.toDate();
        date.setMonth(date.getMonth() + this._value);
        return new DateTime(date);
    },

    day: function () {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value);
        return new DateTime(date);
    },

    week: function () {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value * 7);
        return new DateTime(date);
    },

    hour: function () {
        const date = this._datetime.toDate();
        date.setHours(date.getHours() + this._value);
        return new DateTime(date);
    },

    minute: function () {
        const date = this._datetime.toDate();
        date.setMinutes(date.getMinutes() + this._value);
        return new DateTime(date);
    },

    second: function () {
        const date = this._datetime.toDate();
        date.setSeconds(date.getSeconds() + this._value);
        return new DateTime(date);
    },

    millisecond: function () {
        const date = this._datetime.toDate();
        date.setMilliseconds(date.getMilliseconds() + this._value);
        return new DateTime(date);
    }
};

function DateTime_step(datetime, direction) {
    property(this, '_datetime', {
        get: function () {
            return datetime;
        }
    });
    property(this, '_direction', {
        get: function () {
            return direction;
        }
    });
}

DateTime_step.prototype = {
    week: function () {
        const date = this._datetime.toDate();
        date.setDate(date.getDate() + this._direction * 7);
        return new DateTime(date);
    }
};

exports.DateTime = DateTime;
exports._ = _;
