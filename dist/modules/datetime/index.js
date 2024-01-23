'use strict';

var IS_DIST = true;

var property = function property(that, key, functions) {
    var attributes = {};
    if (functions.get) attributes.get = functions.get;

    if (functions.set) attributes.set = functions.set;else attributes.configurable = false;

    Object.defineProperty(that, key, attributes);
};

function Duration(millisecond) {
    property(this, 'millisecond', {
        get: function get() {
            return millisecond % 1000;
        }
    });

    property(this, 'second', {
        get: function get() {
            return Math.floor(millisecond / 1000) % (60 * 60 * 24);
        }
    });

    property(this, 'day', {
        get: function get() {
            return Math.floor(millisecond / (1000 * 60 * 60 * 24));
        }
    });
}

Duration.prototype = {
    toString: function toString() {
        return "(" + "day=" + this.day + ", second=" + this.second + ", millisecond=" + this.millisecond + ")";
    }
};

function Date_(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
}

Date_.prototype.toString = function () {
    return "Date(" + "year=" + this.year + ", month=" + this.month + ", day=" + this.day + ")";
};

function Time_(hour, minute, second, millisecond) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
}

Time_.prototype.toString = function () {
    return "Time(" + "hour=" + this.hour + ", minute=" + this.minute + ", second=" + this.second + ", millisecond=" + this.millisecond + ")";
};

function DateTime(date) {
    if (!(this instanceof DateTime)) return new DateTime(date);

    property(this, 'year', {
        get: function get() {
            return date.getFullYear();
        },
        set: function set(value) {
            date.setFullYear(value);
        }
    });
    property(this, 'month', {
        get: function get() {
            return date.getMonth() + 1;
        },
        set: function set(value) {
            date.setMonth(value - 1);
        }
    });
    property(this, 'day', {
        get: function get() {
            return date.getDate();
        },
        set: function set(value) {
            date.setDate(value);
        }
    });
    property(this, 'hour', {
        get: function get() {
            return date.getHours();
        },
        set: function set(value) {
            date.setHours(value);
        }
    });
    property(this, 'minute', {
        get: function get() {
            return date.getMinutes();
        },
        set: function set(value) {
            date.setMinutes(value);
        }
    });
    property(this, 'second', {
        get: function get() {
            return date.getSeconds();
        },
        set: function set(value) {
            date.setSeconds(value);
        }
    });
    property(this, 'millisecond', {
        get: function get() {
            return date.getMilliseconds();
        },
        set: function set(value) {
            date.setMilliseconds(value);
        }
    });
    property(this, 'dayOfWeek', {
        get: function get() {
            return date.getDay();
        }
    });
    property(this, '_origin', {
        get: function get() {
            return date;
        }
    });
    property(this, 'date', {
        get: function get() {
            return new Date_(this.year, this.month, this.day);
        },
        set: function set(date) {
            if (!(date instanceof Date_)) throw new TypeError('date must be Date_');

            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
        }
    });
    property(this, 'time', {
        get: function get() {
            return new Time_(this.hour, this.minute, this.second, this.millisecond);
        },
        set: function set(time) {
            if (!(time instanceof Time_)) throw new TypeError('time must be Time_');

            this.hour = time.hour;
            this.minute = time.minute;
            this.second = time.second;
            this.millisecond = time.millisecond;
        }
    });
}

DateTime.prototype = {
    dayOfWeekName: function dayOfWeekName() {
        return this.toString('WW');
    },

    timestamp: function timestamp() {
        return this.toNumber();
    },

    is: function is(value) {
        if (value instanceof DateTime) return this.toNumber() === value.toNumber();else return new DateTime_is(this);
    },

    add: function add(value) {
        value = value || 1;

        if (value instanceof DateTime) throw new TypeError("Cannot add DateTime to DateTime");else return new DateTime_add(this, value);
    },

    sub: function sub(value) {
        value = value || 1;

        if (value instanceof DateTime) return new Duration(this.toNumber() - value.toNumber());else return new DateTime_add(this, -value);
    },

    next: function next() {
        return new DateTime_step(this, 1);
    },

    prev: function prev() {
        return new DateTime_step(this, -1);
    },

    last: function last() {
        return this.prev();
    },

    toString: function toString(formatString) {
        var _this = this;

        var locale = 'ko-KR'; // TODO: auto locale detect - DB(android data)에서 가져오기?
        if (!/[a-z]{2}-[A-Z]{2}/.test(locale)) throw new Error('Invalid locale formatString, must be like "ko-KR"');

        var cultureInfo = void 0;
        if (IS_DIST) cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + locale + ".json")); // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
        else cultureInfo = require('./globalization/' + locale + '.json');

        if (!cultureInfo) throw new Error('Invalid locale, not found ' + locale);

        formatString = formatString || cultureInfo['formats']['full'];
        return formatString.replace(/ss?s?|mm?|hh?|ii?|t|DD?|WW?|MM?M?M?|YY(?:YY)?/g, function (match) {
            switch (match) {
                case 's':
                    return _this.second;
                case 'ss':
                    return _this.second.toString().padStart(2, '0');
                case 'sss':
                    return _this.millisecond;
                case 'm':
                    return _this.minute;
                case 'mm':
                    return _this.minute.toString().padStart(2, '0');
                case 'h':
                    return _this.hour === 12 ? 12 : _this.hour % 12;
                case 'hh':
                    return (_this.hour === 12 ? 12 : _this.hour % 12).toString().padStart(2, '0');
                case 'i':
                    return _this.hour;
                case 'ii':
                    return _this.hour.toString().padStart(2, '0');
                case 't':
                    return cultureInfo['t'][_this.hour < 12 ? 0 : 1];
                case 'D':
                    return _this.day;
                case 'DD':
                    return _this.day.toString().padStart(2, '0');
                case 'W':
                    return cultureInfo['W'][_this.dayOfWeek];
                case 'WW':
                    return cultureInfo['WW'][_this.dayOfWeek];
                case 'M':
                    return _this.month;
                case 'MM':
                    return _this.month.toString().padStart(2, '0');
                case 'MMM':
                    return cultureInfo['MMM'][_this.month - 1];
                case 'MMMM':
                    return cultureInfo['MMMM'][_this.month - 1];
                case 'YY':
                    return _this.year % 100;
                case 'YYYY':
                    return _this.year;
                default:
                    throw new Error('unknown format ' + match);
            }
        });
    },

    toNumber: function toNumber() {
        return this._origin.getTime();
    },

    toDate: function toDate() {
        return this._origin;
    },

    toObject: function toObject() {
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
    isLeapYear: function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    leapYearCount: function leapYearCount(start, end) {
        var l = function l(y) {
            return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
        };

        return l(end) - l(start) + (DateTime.isLeapYear(start) ? 1 : 0); // [start, end]
    },

    now: function now() {
        return new DateTime(new Date());
    },

    today: function today() {
        var now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    },

    tomorrow: function tomorrow() {
        var now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    },

    yesterday: function yesterday() {
        var now = new Date();
        return new DateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    },

    sunday: function sunday() {
        var diff = (0 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sun: function sun() {
        return DateTime.sunday();
    },

    monday: function monday() {
        var diff = (1 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    mon: function mon() {
        return DateTime.monday();
    },

    tuesday: function tuesday() {
        var diff = (2 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    tue: function tue() {
        return DateTime.tuesday();
    },

    wednesday: function wednesday() {
        var diff = (3 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    wed: function wed() {
        return DateTime.wednesday();
    },

    thursday: function thursday() {
        var diff = (4 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    thu: function thu() {
        return DateTime.thursday();
    },

    friday: function friday() {
        var diff = (5 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    fri: function fri() {
        return DateTime.friday();
    },

    saturday: function saturday() {
        var diff = (6 - new Date().getDay() + 7) % 7;
        return DateTime.today().add(diff).day();
    },

    sat: function sat() {
        return DateTime.saturday();
    },

    january: function january(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 0, day));
    },

    jan: function jan(day) {
        return DateTime.january(day);
    },

    february: function february(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 1, day));
    },

    feb: function feb(day) {
        return DateTime.february(day);
    },

    march: function march(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 2, day));
    },

    mar: function mar(day) {
        return DateTime.march(day);
    },

    april: function april(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 3, day));
    },

    apr: function apr(day) {
        return DateTime.april(day);
    },

    may: function may(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 4, day));
    },

    june: function june(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 5, day));
    },

    jun: function jun(day) {
        return DateTime.june(day);
    },

    july: function july(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 6, day));
    },

    jul: function jul(day) {
        return DateTime.july(day);
    },

    august: function august(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 7, day));
    },

    aug: function aug(day) {
        return DateTime.august(day);
    },

    september: function september(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 8, day));
    },

    sep: function sep(day) {
        return DateTime.september(day);
    },

    october: function october(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 9, day));
    },

    oct: function oct(day) {
        return DateTime.october(day);
    },

    november: function november(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 10, day));
    },

    nov: function nov(day) {
        return DateTime.november(day);
    },

    december: function december(day) {
        day = day || 1;
        return new DateTime(new Date(new Date().getFullYear(), 11, day));
    },

    dec: function dec(day) {
        return DateTime.december(day);
    },

    fromTimestamp: function fromTimestamp(timestamp) {
        return new DateTime(new Date(timestamp));
    },

    fromObject: function fromObject(datetimeObject) {
        var now = new Date();
        var year = datetimeObject.year || now.getFullYear();
        var month = datetimeObject.month || now.getMonth() + 1;
        var day = datetimeObject.day || now.getDate();
        var hour = datetimeObject.hour || now.getHours();
        var minute = datetimeObject.minute || now.getMinutes();
        var second = datetimeObject.second || now.getSeconds();
        var millisecond = datetimeObject.millisecond || now.getMilliseconds();

        return new DateTime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    },

    fromString: function fromString(datetimeString) {
        return this.parse(datetimeString);
    },

    in: function _in(year) {
        return new DateTime(new Date(year, 0, 1));
    },

    on: function on(month, day) {
        day = day || 1;

        return new DateTime(new Date(new Date().getFullYear(), month - 1, day));
    },

    at: function at(hour, minute, second, millisecond) {
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;

        var date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(millisecond);

        return new DateTime(date);
    },

    set: function set(year, month, day, hour, minute, second, millisecond) {
        month = month || 1;
        day = day || 1;
        hour = hour || 0;
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;

        return new DateTime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    },

    parse: function parse(dateString) {
        // TODO: globalization 사용
        return new DateTime(Date.parse(dateString));
    }
});

function _(value, mode) {
    if (!(this instanceof _)) return new _(value, mode);

    property(this, '_value', {
        get: function get() {
            return value;
        }
    });
    property(this, '_datetime', {
        get: function get() {
            return new DateTime(new Date());
        }
    });
    property(this, '_mode', {
        get: function get() {
            return mode;
        }
    });
}

_.prototype = {
    year: function year() {
        return new _(this._value, 'year');
    },

    month: function month() {
        return new _(this._value, 'month');
    },

    day: function day() {
        return new _(this._value, 'day');
    },

    week: function week() {
        return new _(this._value, 'week');
    },

    hour: function hour() {
        return new _(this._value, 'hour');
    },

    minute: function minute() {
        return new _(this._value, 'minute');
    },

    second: function second() {
        return new _(this._value, 'second');
    },

    millisecond: function millisecond() {
        return new _(this._value, 'millisecond');
    },

    ago: function ago() {
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

    fromNow: function fromNow() {
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
};

function DateTime_is(datetime) {
    property(this, '_datetime', {
        get: function get() {
            return datetime;
        }
    });
}

DateTime_is.prototype = {
    sunday: function sunday() {
        return this._datetime.dayOfWeek === 0;
    },

    sun: function sun() {
        return this.sunday();
    },

    monday: function monday() {
        return this._datetime.dayOfWeek === 1;
    },

    mon: function mon() {
        return this.monday();
    },

    tuesday: function tuesday() {
        return this._datetime.dayOfWeek === 2;
    },

    tue: function tue() {
        return this.tuesday();
    },

    wednesday: function wednesday() {
        return this._datetime.dayOfWeek === 3;
    },

    wed: function wed() {
        return this.wednesday();
    },

    thursday: function thursday() {
        return this._datetime.dayOfWeek === 4;
    },

    thu: function thu() {
        return this.thursday();
    },

    friday: function friday() {
        return this._datetime.dayOfWeek === 5;
    },

    fri: function fri() {
        return this.friday();
    },

    saturday: function saturday() {
        return this._datetime.dayOfWeek === 6;
    },

    sat: function sat() {
        return this.saturday();
    },

    january: function january(day) {
        return this._datetime.month === 1 && (day ? this._datetime.day === day : true);
    },

    jan: function jan(day) {
        return this.january(day);
    },

    february: function february(day) {
        return this._datetime.month === 2 && (day ? this._datetime.day === day : true);
    },

    feb: function feb(day) {
        return this.february(day);
    },

    march: function march(day) {
        return this._datetime.month === 3 && (day ? this._datetime.day === day : true);
    },

    mar: function mar(day) {
        return this.march(day);
    },

    april: function april(day) {
        return this._datetime.month === 4 && (day ? this._datetime.day === day : true);
    },

    apr: function apr(day) {
        return this.april(day);
    },

    may: function may(day) {
        return this._datetime.month === 5 && (day ? this._datetime.day === day : true);
    },

    june: function june(day) {
        return this._datetime.month === 6 && (day ? this._datetime.day === day : true);
    },

    jun: function jun(day) {
        return this.june(day);
    },

    july: function july(day) {
        return this._datetime.month === 7 && (day ? this._datetime.day === day : true);
    },

    jul: function jul(day) {
        return this.july(day);
    },

    august: function august(day) {
        return this._datetime.month === 8 && (day ? this._datetime.day === day : true);
    },

    aug: function aug(day) {
        return this.august(day);
    },

    september: function september(day) {
        return this._datetime.month === 9 && (day ? this._datetime.day === day : true);
    },

    sep: function sep(day) {
        return this.september(day);
    },

    october: function october(day) {
        return this._datetime.month === 10 && (day ? this._datetime.day === day : true);
    },

    oct: function oct(day) {
        return this.october(day);
    },

    november: function november(day) {
        return this._datetime.month === 11 && (day ? this._datetime.day === day : true);
    },

    nov: function nov(day) {
        return this.november(day);
    },

    december: function december(day) {
        return this._datetime.month === 12 && (day ? this._datetime.day === day : true);
    },

    dec: function dec(day) {
        return this.december(day);
    },

    leapYear: function leapYear() {
        return this._datetime.year % 4 === 0 && this._datetime.year % 100 !== 0 || this._datetime.year % 400 === 0;
    },

    weekend: function weekend() {
        return this._datetime.dayOfWeek === 0 || this._datetime.dayOfWeek === 6;
    },

    weekday: function weekday() {
        return !this.weekend();
    },

    today: function today() {
        var now = new Date();
        return this._datetime.year === now.getFullYear() && this._datetime.month === now.getMonth() + 1 && this._datetime.day === now.getDate();
    },

    year: function year(_year) {
        return this._datetime.year === _year;
    },

    month: function month(_month) {
        return this._datetime.month === _month;
    },

    day: function day(_day) {
        return this._datetime.day === _day;
    },

    hour: function hour(_hour) {
        return this._datetime.hour === _hour;
    },

    minute: function minute(_minute) {
        return this._datetime.minute === _minute;
    },

    second: function second(_second) {
        return this._datetime.second === _second;
    },

    millisecond: function millisecond(_millisecond) {
        return this._datetime.millisecond === _millisecond;
    },

    dayOfWeek: function dayOfWeek(_dayOfWeek) {
        return this._datetime.dayOfWeek === _dayOfWeek;
    },

    after: function after(datetime) {
        if (datetime.constructor.name === 'Object') {
            var year = datetime.year || this._datetime.year;
            var month = datetime.month || this._datetime.month;
            var day = datetime.day || this._datetime.day;
            var hour = datetime.hour || this._datetime.hour;
            var minute = datetime.minute || this._datetime.minute;
            var second = datetime.second || this._datetime.second;
            var millisecond = datetime.millisecond || this._datetime.millisecond;
            datetime = DateTime.set(year, month, day, hour, minute, second, millisecond);
        }

        return this._datetime.toNumber() > datetime.toNumber();
    },

    before: function before(datetime) {
        if (datetime.constructor.name === 'Object') {
            var year = datetime.year || this._datetime.year;
            var month = datetime.month || this._datetime.month;
            var day = datetime.day || this._datetime.day;
            var hour = datetime.hour || this._datetime.hour;
            var minute = datetime.minute || this._datetime.minute;
            var second = datetime.second || this._datetime.second;
            var millisecond = datetime.millisecond || this._datetime.millisecond;
            datetime = DateTime.set(year, month, day, hour, minute, second, millisecond);
        }

        return this._datetime.toNumber() < datetime.toNumber();
    }
};

function DateTime_add(datetime, value) {
    property(this, '_datetime', {
        get: function get() {
            return datetime;
        }
    });
    property(this, '_value', {
        get: function get() {
            return value;
        }
    });
}

DateTime_add.prototype = {
    year: function year() {
        var date = this._datetime.toDate();
        date.setFullYear(date.getFullYear() + this._value);
        return new DateTime(date);
    },

    month: function month() {
        var date = this._datetime.toDate();
        date.setMonth(date.getMonth() + this._value);
        return new DateTime(date);
    },

    day: function day() {
        var date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value);
        return new DateTime(date);
    },

    week: function week() {
        var date = this._datetime.toDate();
        date.setDate(date.getDate() + this._value * 7);
        return new DateTime(date);
    },

    hour: function hour() {
        var date = this._datetime.toDate();
        date.setHours(date.getHours() + this._value);
        return new DateTime(date);
    },

    minute: function minute() {
        var date = this._datetime.toDate();
        date.setMinutes(date.getMinutes() + this._value);
        return new DateTime(date);
    },

    second: function second() {
        var date = this._datetime.toDate();
        date.setSeconds(date.getSeconds() + this._value);
        return new DateTime(date);
    },

    millisecond: function millisecond() {
        var date = this._datetime.toDate();
        date.setMilliseconds(date.getMilliseconds() + this._value);
        return new DateTime(date);
    }
};

function DateTime_step(datetime, direction) {
    property(this, '_datetime', {
        get: function get() {
            return datetime;
        }
    });
    property(this, '_direction', {
        get: function get() {
            return direction;
        }
    });
}

DateTime_step.prototype = {
    week: function week() {
        var date = this._datetime.toDate();
        date.setDate(date.getDate() + this._direction * 7);
        return new DateTime(date);
    }
};

exports.DateTime = DateTime;
exports._ = _;

