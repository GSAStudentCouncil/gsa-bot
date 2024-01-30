const IS_DIST = false;

class duration {
    constructor(millisecond) {
        this._amount = millisecond;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get millisecond() {
        return this.amount % 1000;
    }

    get second() {
        return Math.floor(this.amount / 1000) % 86400;
    }

    get day() {
        return Math.floor(this.amount / 86400000);
    }

    toString() {
        return `duration(day=${this.day}, second=${this.second}, millisecond=${this.millisecond})`;
    }
}

class date {
    constructor(year, month, day) {
        this._source = new Date(year, month - 1, day);
    }

    get year() {
        return this._source.getFullYear();
    }

    get month() {
        return this._source.getMonth() + 1;
    }

    get day() {
        return this._source.getDate();
    }

    toString() {
        return `date(year=${this.year}, month=${this.month}, day=${this.day})`;
    }

    toObject() {
        return {
            year: this.year,
            month: this.month,
            day: this.day
        };
    }
}

class time {
    constructor(hour, minute, second, millisecond) {
        this._source = new Date();
        this._source.setHours(hour);
        this._source.setMinutes(minute);
        this._source.setSeconds(second);
        this._source.setMilliseconds(millisecond);
    }

    get hour() {
        return this._source.getHours();
    }

    get minute() {
        return this._source.getMinutes();
    }

    get second() {
        return this._source.getSeconds();
    }

    get millisecond() {
        return this._source.getMilliseconds();
    }

    toString() {
        return `time(hour=${this.hour}, minute=${this.minute}, second=${this.second}, millisecond=${this.millisecond})`;
    }

    toObject() {
        return {
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            millisecond: this.millisecond
        };
    }
}

class datetime {
    constructor(datetimeObject, locale) {
        this._source;
        this._locale = locale || 'ko-KR';

        if (datetimeObject instanceof datetime) {
            this._source = datetimeObject._source;
            this._locale = datetimeObject._locale;
        }
        else if (datetimeObject instanceof Date) {
            this._source = datetimeObject;
        }
        else if (typeof datetimeObject === 'number') {
            this._source = new Date(datetimeObject);
        }
        else if (datetimeObject.constructor.name === 'Object') {
            const now = new Date();
            const year = datetimeObject.year || now.getFullYear();
            const month = datetimeObject.month || now.getMonth() + 1;
            const day = datetimeObject.day || now.getDate();
            const hour = datetimeObject.hour || now.getHours();
            const minute = datetimeObject.minute || now.getMinutes();
            const second = datetimeObject.second || now.getSeconds();
            const millisecond = datetimeObject.millisecond || now.getMilliseconds();

            this._source = new Date(year, month - 1, day, hour, minute, second, millisecond);
        }
    }

    get date() {
        return new date(this._source.getFullYear(), this._source.getMonth() + 1, this._source.getDate());
    }

    set date(dateObject) {
        if (!(dateObject instanceof date))
            throw new TypeError('`date` must be date');

        this._source.setFullYear(dateObject.year || this._source.getFullYear());
        this._source.setMonth((dateObject.month - 1) || this._source.getMonth());
        this._source.setDate(dateObject.day || this._source.getDate());
    }

    get time() {
        return new time(this._source.getHours(), this._source.getMinutes(), this._source.getSeconds(), this._source.getMilliseconds());
    }

    set time(timeObject) {
        if (!(timeObject instanceof time))
            throw new TypeError('`time` must be time');

        this._source.setHours(timeObject.hour || this._source.getHours());
        this._source.setMinutes(timeObject.minute || this._source.getMinutes());
        this._source.setSeconds(timeObject.second || this._source.getSeconds());
        this._source.setMilliseconds(timeObject.millisecond || this._source.getMilliseconds());
    }

    get year() {
        return this._source.getFullYear();
    }

    set year(value) {
        this._source.setFullYear(value);
    }

    get month() {
        return this._source.getMonth() + 1;
    }

    set month(value) {
        this._source.setMonth(value - 1);
    }

    get day() {
        return this._source.getDate();
    }

    set day(value) {
        this._source.setDate(value);
    }

    get weekday() {
        return this._source.getDay();
    }

    get weekdayName() {
        return this.toString('WW');
    }

    get hour() {
        return this._source.getHours();
    }

    set hour(value) {
        this._source.setHours(value);
    }

    get minute() {
        return this._source.getMinutes();
    }

    set minute(value) {
        this._source.setMinutes(value);
    }

    get second() {
        return this._source.getSeconds();
    }

    set second(value) {
        this._source.setSeconds(value);
    }

    get millisecond() {
        return this._source.getMilliseconds();
    }

    set millisecond(value) {
        this._source.setMilliseconds(value);
    }

    get locale() {
        return this._locale;
    }

    set locale(value) {
        this._locale = value;
    }

    timestamp() {
        return this._source.getTime();
    }

    toString(formatString) {
        let cultureInfo;
        if (IS_DIST)
            cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + this.locale + ".json"));     // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
        else
            cultureInfo = require('./globalization/' + this.locale + '.json');

        if (!cultureInfo)
            throw new Error('Invalid locale, not found ' + this.locale);

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
                    return cultureInfo['W'][this.weekday];
                case 'WW':
                    return cultureInfo['WW'][this.weekday];
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
    }

    toNumber() {
        return this.timestamp();
    }

    toDate() {
        return this._source;
    }

    toObject() {
        return {
            year: this.year,
            month: this.month,
            day: this.day,
            weekday: this.weekday,
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            millisecond: this.millisecond
        };
    }

    add(datetimeObject) {
        if (datetimeObject instanceof datetime)
            return new datetime(new Date(this.timestamp() + datetimeObject.timestamp()), this.locale);
        else if (datetimeObject instanceof duration) {
            let dt = this.toDate();
            dt.setMilliseconds(dt.getMilliseconds() + datetimeObject.amount);
            return new datetime(dt, this.locale);
        }
        else {
            let dt = this.toDate();
            dt.setFullYear(dt.getFullYear() + (datetimeObject.year || 0));
            dt.setMonth(dt.getMonth() + (datetimeObject.month || 0));
            dt.setDate(dt.getDate() + (datetimeObject.day || 0));
            dt.setDate(dt.getDate() + 7 * (datetimeObject.week || 0));
            dt.setHours(dt.getHours() + (datetimeObject.hour || 0));
            dt.setMinutes(dt.getMinutes() + (datetimeObject.minute || 0));
            dt.setSeconds(dt.getSeconds() + (datetimeObject.second || 0));
            dt.setMilliseconds(dt.getMilliseconds() + (datetimeObject.millisecond || 0));
            return new datetime(dt, this.locale);
        }
    }

    sub(datetimeObject) {
        if (datetimeObject instanceof datetime)
            return new duration(this.timestamp() - datetimeObject.timestamp());
        else if (datetimeObject instanceof duration) {
            let dt = this.toDate();
            dt.setMilliseconds(dt.getMilliseconds() - datetimeObject.amount);
            return new datetime(dt, this.locale);
        }
        else {
            let dt = this.toDate();
            dt.setFullYear(dt.getFullYear() - (datetimeObject.year || 0));
            dt.setMonth(dt.getMonth() - (datetimeObject.month || 0));
            dt.setDate(dt.getDate() - (datetimeObject.day || 0));
            dt.setDate(dt.getDate() - 7 * (datetimeObject.week || 0));
            dt.setHours(dt.getHours() - (datetimeObject.hour || 0));
            dt.setMinutes(dt.getMinutes() - (datetimeObject.minute || 0));
            dt.setSeconds(dt.getSeconds() - (datetimeObject.second || 0));
            dt.setMilliseconds(dt.getMilliseconds() - (datetimeObject.millisecond || 0));
            return new datetime(dt, this.locale);
        }
    }

    set(datetimeObject) {
        if (datetimeObject instanceof datetime) {
            this._source = datetimeObject.toDate();
        }
        else if (datetimeObject instanceof date) {
            this._source.setFullYear(datetimeObject.year || this._source.getFullYear());
            this._source.setMonth((datetimeObject.month - 1) || this._source.getMonth());
            this._source.setDate(datetimeObject.day || this._source.getDate());
        }
        else if (datetimeObject instanceof time) {
            this._source.setHours(datetimeObject.hour || this._source.getHours());
            this._source.setMinutes(datetimeObject.minute || this._source.getMinutes());
            this._source.setSeconds(datetimeObject.second || this._source.getSeconds());
            this._source.setMilliseconds(datetimeObject.millisecond || this._source.getMilliseconds());
        }
        else {
            this._source.setFullYear(datetimeObject.year || this._source.getFullYear());
            this._source.setMonth((datetimeObject.month - 1) || this._source.getMonth());
            this._source.setDate(datetimeObject.day || this._source.getDate());
            this._source.setHours(datetimeObject.hour || this._source.getHours());
            this._source.setMinutes(datetimeObject.minute || this._source.getMinutes());
            this._source.setSeconds(datetimeObject.second || this._source.getSeconds());
            this._source.setMilliseconds(datetimeObject.millisecond || this._source.getMilliseconds());
        }
    }

    eq(datetimeObject) {
        const other = new datetime(datetimeObject, this.locale);
        return this.timestamp() === other.timestamp();
    }

    neq(datetimeObject) {
        return !this.eq(datetimeObject);
    }

    ge(datetimeObject) {
        const other = new datetime(datetimeObject, this.locale);
        return this.timestamp() >= other.timestamp();
    }

    gt(datetimeObject) {
        const other = new datetime(datetimeObject, this.locale);
        return this.timestamp() > other.timestamp();
    }

    le(datetimeObject) {
        const other = new datetime(datetimeObject, this.locale);
        return this.timestamp() <= other.timestamp();
    }

    lt(datetimeObject) {
        const other = new datetime(datetimeObject, this.locale);
        return this.timestamp() < other.timestamp();
    }

    static at(hour, minute, second, millisecond) {
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute || 0);
        date.setSeconds(second || 0);
        date.setMilliseconds(millisecond || 0);

        return new datetime(date);
    }

    static in(year) {
        return new datetime(new Date(year, 0, 1));
    }

    static on(month, day) {
        day = day || 1;

        return new datetime(new Date(new Date().getFullYear(), month - 1, day));
    }

    static set(year, month, day, hour, minute, second, millisecond) {
        month = month || 1;
        day = day || 1;
        hour = hour || 0;
        minute = minute || 0;
        second = second || 0;
        millisecond = millisecond || 0;

        return new datetime(new Date(year, month - 1, day, hour, minute, second, millisecond));
    }

    static parse(dateString) {
        let cultureInfo;
        if (IS_DIST)
            cultureInfo = JSON.parse(FileStream.read("/sdcard/msgbot/global_modules/datetime/globalization/" + this.locale + ".json"));     // TODO: 모듈에서 .json 파일 가져올 때 Filestream 사용 되나?
        else
            cultureInfo = require('./globalization/' + this.locale + '.json');

        if (!cultureInfo)
            throw new Error('Invalid locale, not found ' + this.locale);

        dateString = dateString.split(' ').map(e => {
            if (e.trim() in cultureInfo.translate)
                return cultureInfo.translate[e.trim()];
            else
                return e.trim();
        }).join(' ').trim();

        if (dateString === 'today')
            return datetime.today();
        else if (dateString === 'tomorrow')
            return datetime.tomorrow();
        else if (dateString === 'yesterday')
            return datetime.yesterday();

        let [ m, n, s ] = dateString.match(/^([+-]\d+) (\w+)$/);
        n = parseInt(n);

        switch (s) {
            case 'year':
                return datetime.today().add({ year: n });
            case 'month':
                return datetime.today().add({ month: n });
            case 'week':
                return datetime.today().add({ week: n });
            case 'day':
                return datetime.today().add({ day: n });
            case 'hour':
                return datetime.today().add({ hour: n });
            case 'minute':
                return datetime.today().add({ minute: n });
            case 'second':
                return datetime.today().add({ second: n });
        }

        return new datetime(Date.parse(dateString));
    }

    static now() {
        return new datetime(new Date());
    }

    static today() {
        const now = new Date();
        return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    }

    static tomorrow() {
        const now = new Date();
        return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
    }

    static yesterday() {
        const now = new Date();
        return new datetime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    }

    static sunday() {
        const diff = (0 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static monday() {
        const diff = (1 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static tuesday() {
        const diff = (2 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static wednesday() {
        const diff = (3 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static thursday() {
        const diff = (4 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static friday() {
        const diff = (5 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static saturday() {
        const diff = (6 - new Date().getDay() + 7) % 7;
        return datetime.today().add({ day: diff });
    }

    static january(day) {
        day = day || 1;
        return new datetime({ month: 1, day: day });
    }

    static february(day) {
        day = day || 1;
        return new datetime({ month: 2, day: day });
    }

    static march(day) {
        day = day || 1;
        return new datetime({ month: 3, day: day });
    }

    static april(day) {
        day = day || 1;
        return new datetime({ month: 4, day: day });
    }

    static may(day) {
        day = day || 1;
        return new datetime({ month: 5, day: day });
    }

    static june(day) {
        day = day || 1;
        return new datetime({ month: 6, day: day });
    }

    static july(day) {
        day = day || 1;
        return new datetime({ month: 7, day: day });
    }

    static august(day) {
        day = day || 1;
        return new datetime({ month: 8, day: day });
    }

    static september(day) {
        day = day || 1;
        return new datetime({ month: 9, day: day });
    }

    static october(day) {
        day = day || 1;
        return new datetime({ month: 10, day: day });
    }

    static november(day) {
        day = day || 1;
        return new datetime({ month: 11, day: day });
    }

    static december(day) {
        day = day || 1;
        return new datetime({ month: 12, day: day });
    }

    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    static leapYearCount(start, end) {
        const l = y => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);

        return l(end) - l(start) + (datetime.isLeapYear(start) ? 1 : 0);    // [start, end]
    }

    isLeapYear() {
        return datetime.isLeapYear(this.year);
    }

    isWeekend() {
        return this.weekday === 0 || this.weekday === 6;
    }

    isWeekday() {
        return !this.isWeekend();
    }

    isToday() {
        const now = new Date();
        return this.year === now.getFullYear() && this.month === now.getMonth() + 1 && this.day === now.getDate();
    }
}

exports.datetime = datetime;
exports.date = date;
exports.time = time;
