// importClass(java.io.File);

const IS_DIST = false;

const $D = !IS_DIST ? global.Date : Date;

const getCultureInfo = locale => {
	let ret = IS_DIST
		? JSON.parse(FileStream.read(`${android.os.Environment.getExternalStorageDirectory().getAbsolutePath()}/msgbot/global_modules/BotOperator/DateTime/globalization/${locale}.json`))
		: require(`./globalization/${locale}.json`);

	if (ret == null)
		throw Error(`Invalid Locale ${locale}. (${android.os.Environment.getExternalStorageDirectory().getAbsolutePath()}/msgbot/global_modules/BotOperator/DateTime/globalization/${locale}.json is not exist)`);

	return ret;
};

class TimeDelta {
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
		return (this.amount >= 0 ? Math.floor(this.amount / 1000) : Math.ceil(this.amount / 1000)) % 86400;
	}
	
	get day() {
		return (this.amount >= 0 ? Math.floor(this.amount / 86400000) : Math.ceil(this.amount / 86400000));
	}
	
	toString() {
		return `TimeDelta(day=${this.day}, second=${this.second}, millisecond=${this.millisecond})`;
	}
}

class Date {
	constructor(year, month, day) {
		this._source = new $D(year, month - 1, day);
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
	
	eq(dateObject) {
		const { year, month, day } = dateObject;
		return this.year === year && this.month === month && this.day === day;
	}
	
	subtract(dateObject) {
		if (dateObject instanceof Date)
			return new TimeDelta(this._source.getTime() - dateObject._source.getTime());
		else if (dateObject instanceof TimeDelta) {
			let dt = new $D(this._source);
			dt.setMilliseconds(dt.getMilliseconds() - dateObject.amount);
			return new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
		}
		else {
			let dt = new $D(this._source);
			dt.setFullYear(dt.getFullYear() - (dateObject.year ?? 0));
			dt.setMonth(dt.getMonth() - (dateObject.month ?? 0));
			dt.setDate(dt.getDate() - (dateObject.day ?? 0));
			return new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
		}
	}
	
	toString() {
		return `Date(year=${this.year}, month=${this.month}, day=${this.day})`;
	}
	
	toObject() {
		return {
			year: this.year,
			month: this.month,
			day: this.day
		};
	}
}

class Time {
	constructor(hour, minute, second, millisecond) {
		this._source = new $D();
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
	
	eq(timeObject) {
		const { hour, minute, second, millisecond } = timeObject;
		return this.hour === hour && this.minute === minute && this.second === second && this.millisecond === millisecond;
	}
	
	subtract(timeObject) {
		if (timeObject instanceof Time)
			return new TimeDelta(this._source.getTime() - timeObject._source.getTime());
		else if (timeObject instanceof TimeDelta) {
			let dt = new $D(this._source);
			dt.setMilliseconds(dt.getMilliseconds() - timeObject.amount);
			return new Time(dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
		}
		else {
			let dt = new $D(this._source);
			dt.setHours(dt.getHours() - (timeObject.hour ?? 0));
			dt.setMinutes(dt.getMinutes() - (timeObject.minute ?? 0));
			dt.setSeconds(dt.getSeconds() - (timeObject.second ?? 0));
			dt.setMilliseconds(dt.getMilliseconds() - (timeObject.millisecond ?? 0));
			return new Time(dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
		}
	}
	
	toString() {
		return `Time(hour=${this.hour}, minute=${this.minute}, second=${this.second}, millisecond=${this.millisecond})`;
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

class DateTime {
	constructor(datetimeObject, locale) {
		this._source = new $D();
		this._locale = locale ?? 'ko-KR';
		
		if (datetimeObject instanceof $D) {
			this._source = datetimeObject;
		}
		else if (datetimeObject != null) {
			let dt;
			
			if (datetimeObject instanceof DateTime)
				dt = datetimeObject;
			else if (typeof datetimeObject === 'number')
				dt = DateTime.fromNumber(datetimeObject);
			else if (typeof datetimeObject === 'object' && !Array.isArray(datetimeObject))
				dt = DateTime.fromObject(datetimeObject);
			else if (typeof datetimeObject === 'string')
				dt = DateTime.fromString(datetimeObject, this._locale);
			else
				throw new TypeError('`datetimeObject` must be $D, datetime, number, object, or string');
			
			this._source = dt._source;
			this._locale = dt._locale;
		}
	}
	
	get date() {
		return new Date(this._source.getFullYear(), this._source.getMonth() + 1, this._source.getDate());
	}
	
	set date(dateObject) {
		if (!(dateObject instanceof Date))
			throw new TypeError('`date` must be date');
		
		this._source.setFullYear(dateObject.year ?? this._source.getFullYear());
		this._source.setMonth((dateObject.month - 1) ?? this._source.getMonth());
		this._source.setDate(dateObject.day ?? this._source.getDate());
	}
	
	get time() {
		return new Time(this._source.getHours(), this._source.getMinutes(), this._source.getSeconds(), this._source.getMilliseconds());
	}
	
	set time(timeObject) {
		if (!(timeObject instanceof Time))
			throw new TypeError('`time` must be time');
		
		this._source.setHours(timeObject.hour ?? this._source.getHours());
		this._source.setMinutes(timeObject.minute ?? this._source.getMinutes());
		this._source.setSeconds(timeObject.second ?? this._source.getSeconds());
		this._source.setMilliseconds(timeObject.millisecond ?? this._source.getMilliseconds());
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
		return getCultureInfo(this.locale)['WW'][this.weekday];
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
		const cultureInfo = getCultureInfo(this.locale);
		
		formatString = formatString ?? cultureInfo['formats']['full'];
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
	
	humanize(ignoreTime = false) {
		const now = DateTime.now();
		const str = {
			date: '',
			time: ''
		}
		
		let dayDiff = this.date.subtract(now.date).day;
		let secDiff = Math.ceil(this.subtract(now).amount / 1000);
		
		let specials = {};
		specials[-2] = '그제';
		specials[-1] = '어제';
		specials[0] = '오늘';
		specials[1] = '내일';
		specials[2] = '모레';
		
		let isSpecial = false;
		for (let i = -2; i <= 2; i++) {
			const dt = now.add({ day: i });
			if (this.date.eq(dt.date)) {
				str.date = specials[i];
				isSpecial = true;
				break;
			}
		}
		if (!isSpecial) {
			const nowWeekday = now.weekday - 1; // 월화수목금토일
			const lastWeekMonDiff = -7 - nowWeekday;  // 저번 주 월요일까지의 날짜 차이
			const nextWeekSunDiff = 13 - nowWeekday;  // 다음 주 일요일까지의 날짜 차이
			
			if (lastWeekMonDiff <= dayDiff && dayDiff <= nextWeekSunDiff) {   // 저번 주 ~ 다음 주
				if (dayDiff - lastWeekMonDiff < 7)
					str.date = `지난 주 ${this.weekdayName}`;
				else if (nextWeekSunDiff - dayDiff < 7)
					str.date = `다음 주 ${this.weekdayName}`;
				else if (dayDiff < 0)
					str.date = `이번 주 ${this.weekdayName}`;  // 이번 주의 지나간 요일은 '이번 주' 포함
				else
					str.date = this.weekdayName;    // 이번 주의 아직 지나지 않은 요일은 '이번 주' 생략
			}
				// else if (this.year === now.year && this.month === now.month) {    // 저번 주 ~ 다음 주의 범위를 벗어나면서 달은 같은 경우
				// 	const week = dayDiff < 0 ? Math.ceil(dayDiff / 7) : Math.floor(dayDiff / 7);
				// 	const day = dayDiff - week * 7;
				//
				// 	const ret = [];
				//
				// 	if (week !== 0)
				// 		ret.push(`${Math.abs(week)}주`);
				// 	if (day !== 0)
				// 		ret.push(`${Math.abs(day)}일`);
				//
				// 	str.date = ret.join(' ') + (dayDiff < 0 ? ' 전' : ' 후');
			// }
			else if (this.year === now.year)
				str.date = `${this.month}월 ${this.day}일`;
			else
				str.date = `${this.year}년 ${this.month}월 ${this.day}일`;
		}
		
		let isRelative = false;
		if (!ignoreTime) {
			if (this.hour === 0 && this.minute === 0 && this.second === 0)
				str.time = "";  // '오늘 자정'은 마치 내일 0시를 말하는 것 같아서 그냥 '오늘'로 표시
			else if (this.hour === 12 && this.minute === 0 && this.second === 0)
				str.time = "정오";
			else {
				const sign = secDiff < 0 ? '전' : '후';
				const amountSec = Math.abs(secDiff);
				const hour = Math.floor(amountSec / 3600);
				const minute = Math.floor((amountSec % 3600) / 60);
				const second = amountSec % 60;
				
				if (amountSec < 6 * 60 * 60) {	// 6시간 이내
					isRelative = true;
					
					if (hour !== 0)
						str.time += `${hour}시간 `;
					if (minute !== 0)
						str.time += `${minute}분 `;
					if (second !== 0)
						str.time += `${second}초 `;
					// 밀리초는 수행 시간에도 영향을 받고, 너무 세부적이므로 무시. 나중에 config 로 설정할 수 있게?
					
					if (str.time !== '')
						str.time = str.time.trim() + ` ${sign}`;
				}
				else
					str.time = this.toString("t h시 m분 s초").replace('0초', '').replace('0분', '').replace(/\s+/g, ' ').trimEnd();
			}
		}
		
		if (!ignoreTime && this.eq(now, true))
			return '지금';
		else if (!ignoreTime && isRelative)    // 상대적인 시간이면 최대 6시간 차이니까 날짜를 생략
			return str.time;
		else if (!ignoreTime && str.date === '오늘' && str.time !== '')  // 오늘인데 시간이 있으면 날짜를 생략
			return str.time;
		else
			return `${str.date} ${str.time}`.trim();
	}
	
	toNumber() {
		return this.timestamp();
	}
	
	toDate() {
		return new $D(this._source);    // Date 객체의 깊은 복사
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
	
	static fromTimestamp(timestamp) {
		return DateTime.fromNumber(timestamp);
	}
	
	static fromString(dateString, useDuration = false, getString = false, filterIncludeEnding = true, trim = true, std = DateTime.now(), locale = 'ko-KR') {
		return DateTime.dehumanize(dateString, useDuration, getString, filterIncludeEnding, trim, std, locale);
	}
	
	static dehumanize(dateString, useDuration = false, getString = false, filterIncludeEnding = true, trim = true, std = DateTime.now(), locale = 'ko-KR') {
		if (useDuration)
			return DateTime.parseDuration(dateString, getString, filterIncludeEnding, std, locale);
		else
			return DateTime.parse(dateString, getString, filterIncludeEnding, trim, std, locale);
	}
	
	static fromNumber(timestamp) {
		return DateTime.fromDate(new $D(timestamp));
	}
	
	static fromDate(date) {
		let dt = new DateTime();
		dt._source = date;
		
		return dt;
	}
	
	static fromObject(datetimeObject, standard = undefined) {
		const now = new DateTime();
		
		const ret = {};
		ret.year = datetimeObject.year;
		ret.month = datetimeObject.month;
		ret.day = datetimeObject.day;
		ret.hour = datetimeObject.hour;
		ret.minute = datetimeObject.minute;
		ret.second = datetimeObject.second;
		ret.millisecond = datetimeObject.millisecond;
		
		const defaults = {
			year: (standard ? (standard.year ?? now.year) : now.year),
			month: (standard ? (standard.month ?? now.month) : 1),
			day: (standard ? (standard.day ?? now.day) : 1),
			hour: (standard ? (standard.hour ?? now.hour) : 0),
			minute: (standard ? (standard.minute ?? now.minute) : 0),
			second: (standard ? (standard.second ?? now.second) : 0),
			millisecond: (standard ? (standard.millisecond ?? now.millisecond) : 0)
		}
		
		const units = [ 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond' ];
		
		/**
		 * "오전 6시" 는 year, month, day는 현재 or 기준(standard)으로, hour는 6, minute, second, millisecond는 0으로 정해지는 것이 합당하다.
		 * 아래의 코드는 if (year == null) else if (month == null) ... else if (millisecond == null) 에 대해 각각 for 문으로
		 * 전의 unit을 기준(standard)의 값으로, 후의 unit을 시작으로 지정하는 코드다.
		 */
		let find = false;
		for (let unit of units) {
			if (ret[unit] != null) {
				let x = units.indexOf(unit);

				for (let i = 0; i < x; i++)
					ret[units[i]] ??= (standard ?? now)[units[i]];
				for (let i = x; i < units.length; i++)
					ret[units[i]] ??= defaults[units[i]];
				
				find = true;
				break;
			}
		}
		
		if (ret.year % 1 !== 0) {
			ret.month += ret.year % 1 * 12;
			ret.year = ret.year >= 0 ? Math.floor(ret.year) : Math.ceil(ret.year);
		}
		
		if (ret.month % 1 !== 0) {
			ret.day += ret.month % 1 * DateTime.lengthOfMonth(ret.year, Math.floor(ret.month));
			ret.month = ret.month >= 0 ? Math.floor(ret.month) : Math.ceil(ret.month);
		}
		
		if (ret.day % 1 !== 0) {
			ret.hour += ret.day % 1 * 24;
			ret.day = ret.day >= 0 ? Math.floor(ret.day) : Math.ceil(ret.day);
		}
		
		if (ret.hour % 1 !== 0) {
			ret.minute += ret.hour % 1 * 60;
			ret.hour = ret.hour >= 0 ? Math.floor(ret.hour) : Math.ceil(ret.hour);
		}
		
		if (ret.minute % 1 !== 0) {
			ret.second += ret.minute % 1 * 60;
			ret.minute = ret.minute >= 0 ? Math.floor(ret.minute) : Math.ceil(ret.minute);
		}
		
		if (ret.second % 1 !== 0) {
			ret.millisecond += ret.second % 1 * 1000;
			ret.second = ret.second >= 0 ? Math.floor(ret.second) : Math.ceil(ret.second);
		}
		
		if (ret.millisecond % 1 !== 0)
			throw new Error('millisecond must be integer');
		
		return DateTime.set(ret);
	}
	
	add(datetimeObject) {
		if (datetimeObject instanceof TimeDelta) {
			let dt = this.toDate();
			dt.setMilliseconds(dt.getMilliseconds() + datetimeObject.amount);
			return new DateTime(dt, this.locale);
		}
		else {
			let dt = this.toDate();
			dt.setFullYear(dt.getFullYear() + (datetimeObject.year ?? 0));
			dt.setMonth(dt.getMonth() + (datetimeObject.month ?? 0));
			dt.setDate(dt.getDate() + (datetimeObject.day ?? 0));
			dt.setDate(dt.getDate() + 7 * (datetimeObject.week ?? 0));
			dt.setHours(dt.getHours() + (datetimeObject.hour ?? 0));
			dt.setMinutes(dt.getMinutes() + (datetimeObject.minute ?? 0));
			dt.setSeconds(dt.getSeconds() + (datetimeObject.second ?? 0));
			dt.setMilliseconds(dt.getMilliseconds() + (datetimeObject.millisecond ?? 0));
			return new DateTime(dt, this.locale);
		}
	}
	
	subtract(datetimeObject) {
		if (datetimeObject instanceof DateTime)
			return new TimeDelta(this.timestamp() - datetimeObject.timestamp());
		else if (datetimeObject instanceof TimeDelta) {
			let dt = this.toDate();
			dt.setMilliseconds(dt.getMilliseconds() - datetimeObject.amount);
			return new DateTime(dt, this.locale);
		}
		else {
			let dt = this.toDate();
			dt.setFullYear(dt.getFullYear() - (datetimeObject.year ?? 0));
			dt.setMonth(dt.getMonth() - (datetimeObject.month ?? 0));
			dt.setDate(dt.getDate() - (datetimeObject.day ?? 0));
			dt.setDate(dt.getDate() - 7 * (datetimeObject.week ?? 0));
			dt.setHours(dt.getHours() - (datetimeObject.hour ?? 0));
			dt.setMinutes(dt.getMinutes() - (datetimeObject.minute ?? 0));
			dt.setSeconds(dt.getSeconds() - (datetimeObject.second ?? 0));
			dt.setMilliseconds(dt.getMilliseconds() - (datetimeObject.millisecond ?? 0));
			return new DateTime(dt, this.locale);
		}
	}
	
	set(datetimeObject) {
		if (datetimeObject instanceof DateTime) {
			this._source = datetimeObject.toDate();
		}
		else if (datetimeObject instanceof Date) {
			this.year = datetimeObject.year;
			this.month = datetimeObject.month;
			this.day = datetimeObject.day;
		}
		else if (datetimeObject instanceof Time) {
			this.hour = datetimeObject.hour;
			this.minute = datetimeObject.minute;
			this.second = datetimeObject.second;
			this.millisecond = datetimeObject.millisecond;
		}
		else {
			if (datetimeObject.year != null)
				this.year = datetimeObject.year;
			if (datetimeObject.month != null)
				this.month = datetimeObject.month;
			if (datetimeObject.day != null)
				this.day = datetimeObject.day;
			if (datetimeObject.hour != null)
				this.hour = datetimeObject.hour;
			if (datetimeObject.minute != null)
				this.minute = datetimeObject.minute;
			if (datetimeObject.second != null)
				this.second = datetimeObject.second;
			if (datetimeObject.millisecond != null)
				this.millisecond = datetimeObject.millisecond;
		}
		
		return this;
	}
	
	eq(datetimeObject, ignoreMillisecond = false) {
		if (datetimeObject.constructor === Object)
			datetimeObject = DateTime.fromObject(datetimeObject, this);

		if (ignoreMillisecond) {
			const other = new DateTime(datetimeObject, this.locale);
			return this.timestamp() - this.millisecond === other.timestamp() - other.millisecond;
		}
		else {
			const other = new DateTime(datetimeObject, this.locale);
			return this.timestamp() === other.timestamp();
		}
	}
	
	neq(datetimeObject, ignoreMillisecond = false) {
		return !this.eq(datetimeObject, ignoreMillisecond);
	}
	
	ge(datetimeObject) {
		if (datetimeObject.constructor === Object)
			datetimeObject = DateTime.fromObject(datetimeObject, this);

		const other = new DateTime(datetimeObject, this.locale);
		return this.timestamp() >= other.timestamp();
	}
	
	gt(datetimeObject) {
		if (datetimeObject.constructor === Object)
			datetimeObject = DateTime.fromObject(datetimeObject, this);

		const other = new DateTime(datetimeObject, this.locale);
		return this.timestamp() > other.timestamp();
	}
	
	le(datetimeObject) {
		if (datetimeObject.constructor === Object)
			datetimeObject = DateTime.fromObject(datetimeObject, this);

		const other = new DateTime(datetimeObject, this.locale);
		return this.timestamp() <= other.timestamp();
	}
	
	lt(datetimeObject) {
		if (datetimeObject.constructor === Object)
			datetimeObject = DateTime.fromObject(datetimeObject, this);

		const other = new DateTime(datetimeObject, this.locale);
		return this.timestamp() < other.timestamp();
	}
	
	static at(hour, minute, second, millisecond) {
		const date = new $D();
		date.setHours(hour);
		date.setMinutes(minute ?? 0);
		date.setSeconds(second ?? 0);
		date.setMilliseconds(millisecond ?? 0);
		
		return new DateTime(date);
	}
	
	static in(year) {
		return new DateTime(new $D(year, 0, 1));
	}
	
	static on(month, day) {
		day = day ?? 1;
		
		return new DateTime(new $D(new $D().getFullYear(), month - 1, day));
	}
	
	static set(datetimeObject) {
		let year = datetimeObject.year ?? new $D().getFullYear();
		let month = datetimeObject.month ?? 1;
		let day = datetimeObject.day ?? 1;
		let hour = datetimeObject.hour ?? 0;
		let minute = datetimeObject.minute ?? 0;
		let second = datetimeObject.second ?? 0;
		let millisecond = datetimeObject.millisecond ?? 0;
		
		return new DateTime(new $D(year, month - 1, day, hour, minute, second, millisecond));
	}

	static _parse(dateString, getString = false, filterIncludeEnding = true, trim = true, std = DateTime.now(), locale = 'ko-KR') {
		const cultureInfo = getCultureInfo(locale);
		
		const replaces = Object.entries(cultureInfo['replaces']);
		replaces.sort((a, b) => b[0].length - a[0].length); // '내일모레'와 '모레'가 모두 매칭되는 경우, '내일모레'가 먼저 매칭되도록 함.
		
		dateString = dateString.trim().replace(/\s+/g, ' ');
		dateString = dateString.replace(/(그+)(글피|끄저께)/g, (_, countStr, directionStr) => {
			const offset = directionStr === '글피' ? 3 : 2;
			const direction = directionStr === '글피' ? '다음' : '저번';
			const count = countStr.length;
			
			return `${direction[0].repeat(count + offset)}${direction[1]} 날`;
		});
		dateString = dateString.replace(/(저+)번/g, (_, countStr) => `${'지'.repeat(countStr.length)}난`);
		replaces.forEach(([ key, value ]) => {
			dateString = dateString.replace(new RegExp(key, 'g'), value);
		});
		
		let filteredString = dateString;
		const filtering = value => filteredString = filteredString.replace(new RegExp(value + (filterIncludeEnding ? '\\S*' : '')), '');
		
		const iso_parse = () => {
			const RE_ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/;
			const isoMatch = dateString.match(RE_ISO);
			
			if (isoMatch) {
				filtering(isoMatch[0]);

				let [ year, month, day, hour, minute, second, millisecond ] = isoMatch.slice(1);
				
				return { year, month, day, hour, minute, second, millisecond };
			}
		};
		
		const common_parse = () => {
			let year, month, day, hour, minute, second, millisecond;
			let idx = -1;   // ymd, md 등 정규식에 가장 뒤에서 걸린 것(인덱스의 최댓값)을 찾기 위한 변수
			
			const mix = {
				ymd: /(\d{4})[-.\/] *(\d{1,2})[-.\/] *(\d{1,2})\.?/,
				md: /(\d{1,2})[-.\/] *(\d{1,2})\.?/,
				hms: /(\d{1,2}) *: *(\d{1,2}) *: *(\d{1,2})/,
				hm: /(\d{1,2}) *: *(\d{1,2})/,
				ms: /(\d{1,2}) *: *(\d{1,2})/,
			};
			
			const matchedMix = {};
			for (let key in mix) {
				const match = dateString.match(mix[key]);
				if (match) {
					matchedMix[key] = match;
					idx = Math.max(idx, match.index);
				}
			}
			
			if (matchedMix.ymd) {
				filtering(matchedMix.ymd[0]);
				
				year = matchedMix.ymd[1];
				month = matchedMix.ymd[2];
				day = matchedMix.ymd[3];
			}
			else if (matchedMix.md) {
				filtering(matchedMix.md[0]);
				
				year = DateTime.now().year;
				month = matchedMix.md[1];
				day = matchedMix.md[2];
			}
			
			if (matchedMix.hms) {				
				filtering(matchedMix.hms[0]);
				
				hour = matchedMix.hms[1];
				minute = matchedMix.hms[2];
				second = matchedMix.hms[3];
			}
			else if (matchedMix.hm) {
				filtering(matchedMix.hm[0]);
				
				hour = matchedMix.hm[1];
				minute = matchedMix.hm[2];
			}
			else if (matchedMix.ms) {
				filtering(matchedMix.ms[0]);
				
				minute = matchedMix.ms[1];
				second = matchedMix.ms[2];
			}
			
			const re = {
				year: /\d{4}년/,
				month: /\d{1,2}월/,
				day: /\d{1,2}일/,
				hour: /\d{1,2}시/,
				minute: /\d{1,2}분/,
				second: /\d{1,2}초/,
				millisecond: /\d{1,3}밀리초/
			};
			
			const matched = {};
			for (let key in re) {
				const match = dateString.match(re[key]);
				if (match) {
					filtering(match[0]);
					matched[key] = match[0];
					idx = Math.max(idx, match.index);
				}
			}
			
			year ??= matched.year;
			month ??= matched.month;
			day ??= matched.day;
			hour ??= matched.hour;
			minute ??= matched.minute;
			second ??= matched.second;
			millisecond ??= matched.millisecond;
			
			if (year != null)
				year = parseInt(year);
			if (month != null)
				month = parseInt(month);
			if (day != null)
				day = parseInt(day);
			if (hour != null)
				hour = parseInt(hour);
			if (minute != null)
				minute = parseInt(minute);
			if (second != null)
				second = parseInt(second);
			if (millisecond != null)
				millisecond = parseInt(millisecond);
			
			// 보통 '3시'는 '오후 3시'로 해석되어야 함.
			// 자동으로 오후로 해석되는 시간의 범위: 1시 ~ 7시 59분
			let meridian = (1 <= hour && hour < 8) ? 'pm' : 'am';
			
			let i;
			if (dateString.indexOf('오전') !== -1) {
				filtering('오전');
				meridian = 'am';
			}
			else if (0 <= (i = dateString.indexOf('아침')) && i < idx) {  // 야침 9시 -> 오전 9시
				filtering('아침');
				meridian = 'am';
			}
			else if (dateString.indexOf('am') !== -1) {
				filtering('am');
				meridian = 'am';
			}
			else if (dateString.indexOf('오후') !== -1) {
				filtering('오후');
				meridian = 'pm';
			}
			else if (0 <= (i = dateString.indexOf('저녁')) && i < idx) {
				filtering('저녁');
				meridian = 'pm';
			}
			else if (dateString.indexOf('pm') !== -1) {
				filtering('pm');
				meridian = 'pm';
			}
			
			if (hour != null && hour < 12 && meridian === 'pm')
				hour += 12;
			
			if (dateString.indexOf('아침') !== -1 && idx === -1) {  // '아침 9시' 라고 했으면 위에서 '오전'으로 이미 필터링 됨. 즉, 이건 '아침'만 있는 경우임.
				filtering('아침');
				day = std.gt({ hour: 7, minute: 30 }) ? std.day + 1 : std.day;
				hour = 7;
				minute = 30;
			}
			else if (dateString.indexOf('정오') !== -1 && idx === -1) {
				filtering('정오');
				day = std.gt({ hour: 12 }) ? std.day + 1 : std.day;
				hour = 12;
			}
			else if (dateString.indexOf('점심') !== -1 && idx === -1) {
				filtering('점심');
				day = std.gt({ hour: 12, minute: 30 }) ? std.day + 1 : std.day;
				hour = 12;
				minute = 30;
			}
			else if (dateString.indexOf('저녁') !== -1 && idx === -1) {
				filtering('저녁');
				day = std.gt({ hour: 18 }) ? std.day + 1 : std.day;
				hour = 18;
			}
			else if (dateString.indexOf('자정') !== -1 && idx === -1) {
				filtering('자정');
				day = std.day + 1;
				hour = 0;
			}
			
			let ret = {};
			
			if (year != null)
				ret.year = year;
			if (month != null)
				ret.month = month;
			if (day != null)
				ret.day = day;
			if (hour != null)
				ret.hour = hour;
			if (minute != null)
				ret.minute = minute;
			if (second != null)
				ret.second = second;
			if (millisecond != null)
				ret.millisecond = millisecond;
			
			return ret;
		};
		
		const relative_parse = () => {
			const unitMap = {
				'년': 'year',
				'해': 'year',
				'달': 'month',
				'일': 'day',
				'날': 'day',
				'시간': 'hour',
				'분': 'minute',
				'초': 'second'
			};
			const units = [ 'year', 'month', 'day', 'hour', 'minute', 'second' ];
			
			const RE_RELATIVE = /([+-]?\d+(?:.\d*)?) *(년|달|주|일|시간|분|초)/g;
			const RE_RELATIVE_END = /[^오]+([전후뒤])/;
			const RE_RELATIVE2 = /(다+음|지+난|이번) *(해|달|주|날|시간|분|초)/g;
			const RE_WEEKDAY = /([일월화수목금토])요일/;	// 원래 뒤에 (?= +|$|까지) 있었는데 빼 봄.
			
			let ret = {};
			
			let arr, arr2;
			const set = (dir, diff, factor = 1) => dir === '전' ? -parseInt(diff) * factor : parseInt(diff) * factor;
			
			// 'n<단위> 후'는 단위가 변경되고 나머지는 현재 시간을 따름. 3시간 후 -> 3시간 후 현재시간
			arr2 = RE_RELATIVE_END.exec(dateString);
			if (arr2 != null) {
				filtering(arr2[0]);
				while ((arr = RE_RELATIVE.exec(dateString)) != null) {
					filtering(arr[0]);

					let [ diff, unit ] = arr.slice(1);
					let [ direction ] = arr2.slice(1);

					let key = unitMap[unit];
					
					if (unit === '주') {
						ret['day'] = (ret['day'] ?? 0) + set(direction, diff, 7);
						// '다음 주' -> '다음 주 월요일'로 자동매칭은 부드러우나, '3주 후'는 '3주 후 현재시간'으로 자동매칭이 더 합당함.
					}
					else
						ret[key] = (ret[key] ?? 0) + set(direction, diff);
					
					// '3시간 후' -> '3시간 후 현재시간'으로 자동매칭. '3일 후' -> '3일 후 현재시간' 으로 자동매칭...
					ret.defaultToNow = true;
				}
			}
			
			// '다음 <단위>'는 단위만 변경되면 나머지는 초기화임. 다음 시간 -> 다음 시간 0분 0초
			while ((arr = RE_RELATIVE2.exec(dateString)) != null) {
				filtering(arr[0]);

				let [ diff, unit ] = arr.slice(1);
				
				// 다다다다음 -> 다음 * 4
				const diff_num = (diff.length - 1) * (diff[0] === '다' ? 1 : (diff[0] === '지' ? -1 : 0));
				
				if (unit === '주') {
					ret['day'] = (ret['day'] ?? 0) + diff_num * 7;
					ret['day'] += 0 - (std.weekday - 1);    // '다음 주' -> '다음 주 월요일'로 자동매칭
				}
				else
					ret[unitMap[unit]] = (ret[unitMap[unit]] ?? 0) + diff_num;
			}
			
			// 일월화수목금토가 일주일이라고 하면 현재가 수요일일 때, 다음주 일요일은 5일 후. 그러나 평상시는 이 날을 그냥 이번주 일요일이라고 함.
			// 즉 현실에 맞게 일주일을 조금 다르게 대응시킴.
			if ((arr = RE_WEEKDAY.exec(dateString)) != null) {
				if (arr.index === 0 || /[^0-9요]+/.test(dateString.slice(0, arr.index))) {
					// /(?<=[^0-9요]+|^)([일월화수목금토])요일(?= +|$)/ 에서 후방탐색연산자 사용이 안되어서 이렇게 대신함
					
					filtering(arr[0]);

					let [ week ] = arr.slice(1);
					
					const today = std.weekday - 1;   // 일월화수목금토가 아니고 월화수목금토일
					const start = ((ret['day'] ?? 0) + today) % 7;
					const dest = DateTime.getWeekdayFromName(week, true);
					
					ret['day'] = (ret['day'] ?? 0) + (dest - start);
				}
			}
			
			return ret;
		};

		let ret;
		const iso_parsed = iso_parse();

		if (iso_parsed != null) {
			filteredString = filteredString.replace(/\s+/g, ' ');
			ret = { parse: iso_parsed, string: trim ? filteredString.trim() : filteredString };
		}
		else {
			const relative_parsed = relative_parse();
			const common_parsed = common_parse();
			if (Object.keys(common_parsed).length === 0 && Object.keys(relative_parsed).length === 0) 
				ret = { string: trim ? filteredString.trim() : filteredString };
			else {
				const units = [ 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond' ];
				
				// '3월 4일' 이라고 하면 '현재년도 3월 4일 0시 0분 0초'로 해석되어야 함. 즉, 마지막으로 데이터가 존재하는 unit 까지만 현재 날짜로 지정.
				let lastIndex = -1;
				for (let i = units.length - 1; i >= 0; i--) {
					if (relative_parsed[units[i]] != null) {
						lastIndex = i;
						break;
					}
				}
				
				// 상대 날짜는 현재 날짜와 더해줌
				for (let i = 0; i < units.length; i++) {
					if (!relative_parsed.defaultToNow && i > lastIndex)
						break;
					
					relative_parsed[units[i]] = (relative_parsed[units[i]] ?? 0) + std[units[i]];
				}
				
				// 상대 날짜와 일반 날짜를 합쳐서 전체 parse 결과를 도출
				let parsed = {};
				for (let unit of units) {
					if (common_parsed[unit] != null && relative_parsed[unit] != null)
						parsed[unit] = relative_parsed[unit];   // 둘 다 있으면 relative_parsed 를 우선시
					else if (common_parsed[unit] != null || relative_parsed[unit] != null)
						parsed[unit] = common_parsed[unit] ?? relative_parsed[unit];
				}
				
				filteredString = filteredString.replace(/\s+/g, ' ');
				ret = { parse: parsed, string: trim ? filteredString.trim() : filteredString };
			}
		}

		if (getString)
			return ret;
		else
			return ret.parse;
	}

	_parse(dateString, getString = false, filterIncludeEnding = true, trim = true) {
		return DateTime._parse(dateString, getString, filterIncludeEnding, trim, this, this.locale);
	}

	static parse(dateString, getString = false, filterIncludeEnding = true, trim = true, std = DateTime.now(), locale = 'ko-KR') {
		let ret = DateTime._parse(dateString, getString, filterIncludeEnding, trim, std, locale);

		if (getString)
			return { parse: ret.parse == null ? null : DateTime.fromObject(ret.parse), string: ret.string };
		else
			return ret == null ? null : DateTime.fromObject(ret);
	}

	parse(dateString, getString = false, filterIncludeEnding = true, trim = true) {
		let ret = this._parse(dateString, getString, filterIncludeEnding, trim);

		if (getString)
			return { parse: ret.parse == null ? null : DateTime.fromObject(ret.parse, this), string: ret.string };
		else
			return ret == null ? null : DateTime.fromObject(ret, this);
	}
	
	static parseDuration(dateString, getString = false, filterIncludeEnding = true, std = DateTime.now(), locale = 'ko-KR') {
		let split = dateString.split('부터');
		
		let ret;

		if (split.length === 1) {
			let parse = DateTime.parse(dateString, true, filterIncludeEnding, true, std, locale);

			ret = {
				parse: {
					from: split[0].includes('까지') ? std : parse.parse,
					to: parse.parse
				},
				string: parse.string
			};
		}
		else {
			let left = split[0];
			let right = split.slice(1).join('부터');
			
			let { parse: leftParse, string: leftFString } = DateTime.parse(left, true, filterIncludeEnding, false, std, locale);
			let { parse: rightParse, string: rightFString } = DateTime.parse(right, true, filterIncludeEnding, false, std, locale);
			
			let leftDT = leftParse == null ? null : DateTime.fromObject(leftParse);
			let rightDT = rightParse == null ? null : DateTime.fromObject(rightParse);
			
			if (leftDT != null && rightDT != null) {
				// 내일 3시부터 4시까지 -> 그냥 번역하면 '내일 3시' ~ '오늘 4시' 가 되지만 사실은 '4시'는 '내일 4시'를 뜻함
				if (!leftDT.lt(rightDT)) {
					let rightDT_ = DateTime.fromObject(Object.assign(leftParse, rightParse));

					if (leftDT.lt(rightDT_))
						rightDT = rightDT_;
					// 내일 9시부터 10시 -> '10시'는 오전으로 자동 해석되므로 만약 오후로 바꿨을 때 leftDT < rightDT 를 만족해 합당하다면 시도.
					else if (rightDT_.hour < 12 && leftDT.lt(rightDT_.add({ hour: 12 })))
						rightDT = rightDT_.add({ hour: 12 });
					else
						rightDT = leftDT;
				}
			}
			
			ret = {
				parse: { from: leftDT, to: rightDT },
				string: (leftFString + rightFString).replace(/\s+/g, ' ').trim()
			};
		}

		if (getString)
			return ret;
		else
			return ret.parse;
	}
	
	// static parse(dateString, locale = 'ko-KR') {
	// 	return DateTime.fromObject(...DateTime._parse(dateString, locale));
	// }
	//
	// static _parse(dateString, locale = 'ko-KR') {
	// 	// sanitize dateString
	// 	// '  2020년  3월  2일  ' -> '2020년 3월 2일'
	// 	dateString = dateString.trim().replace(/\s+/g, ' ');
	//
	// 	const cultureInfo = getCultureInfo(locale);
	//
	// 	const isNumberRegex = /^[+-]?\d+(?:\.\d*)?$/;
	// 	const isRelativeObject = obj => obj.constructor === Object && 'diff' in obj && typeof obj.diff === 'number' && Object.keys(obj).length === 1;
	// 	const isHomonymObject = obj => obj.constructor === Object && 'homonym' in obj && Array.isArray(obj.homonym) && Object.keys(obj).length === 1;
	//
	// 	const keywords = {
	// 		units: new Set([ 'year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond' ]),
	// 		meridian: new Set([ 'am', 'pm' ]),
	// 		weekdays: new Set([ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]),
	// 		times: new Set([ 'morning', 'noon', 'afternoon', 'evening', 'night', 'midnight' ]),
	// 		counts: new Set([ 'th', 'half', 'end' ]),
	// 		relative: new Set([ 'ago', 'after' ]),
	// 		standard: new Set([ 'from', 'of' ]),
	// 	};
	//
	// 	const homonyms = new Set(Object.keys(cultureInfo.translate).map(k => isHomonymObject(cultureInfo.translate[k]) ? k : null).filter(e => e != null));
	//
	// 	// 1. parse ISO 8601 format
	// 	const parse1 = () => {
	// 		const RE_ISO = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})(?:\.(?<millisecond>\d{3}))?Z$/;
	// 		const isoMatch = dateString.match(RE_ISO);
	//
	// 		if (isoMatch) {
	// 			return {
	// 				year: isoMatch.groups.year,
	// 				month: isoMatch.groups.month,
	// 				day: isoMatch.groups.day,
	// 				hour: isoMatch.groups.hour,
	// 				minute: isoMatch.groups.minute,
	// 				second: isoMatch.groups.second,
	// 				millisecond: isoMatch.groups.millisecond
	// 			};
	// 		}
	// 	};
	//
	// 	// 2. parse common date format
	// 	const parse2 = () => {
	// 		let meridiem = 'pm';
	//
	// 		for (let key in cultureInfo.translate) {
	// 			if (keywords.meridiems.has(cultureInfo.translate[key])) // am, pm이 value인 key들
	// 				meridiem = cultureInfo.translate[key];
	// 		}
	//
	// 		const RE_DATE = /(?:(?<year>\d{4})[-.\/])? *(?<month>\d{1,2})[-.\/] *(?<day>\d{1,2})\.?/;
	// 		const RE_TIME = /(?<hour>\d{1,2}):(?<minute>\d{1,2})(?::(?<second>\d{1,2})(?:\.(?<millisecond>\d{1,3}))?)?/;
	//
	// 		const dateMatch = dateString.match(RE_DATE);
	// 		const timeMatch = dateString.match(RE_TIME);
	//
	// 		if (dateMatch || timeMatch) {
	// 			let year = dateMatch?.groups?.year;
	// 			let month = dateMatch?.groups?.month;
	// 			let day = dateMatch?.groups?.day;
	// 			let hour = timeMatch?.groups?.hour;
	// 			let minute = timeMatch?.groups?.minute;
	// 			let second = timeMatch?.groups?.second;
	// 			let millisecond = timeMatch?.groups?.millisecond;
	//
	// 			if (hour != null && hour < 12 && meridiem === 'pm')
	// 				hour += 12;
	//
	// 			return { year, month, day, hour, minute, second, millisecond };
	// 		}
	// 	};
	//
	// 	// 3. analyze in tokens
	// 	const parse3 = () => {
	// 		let standard = {};
	//
	// 		// sort by length (desc), then by dictionary order (asc)
	// 		// desc로 정렬하기 때문에, '매주' 와 '주' 에서 '매주'에 먼저 매칭될 수 있게 함.
	// 		const keys = Object.keys(cultureInfo.translate);
	// 		keys.sort((a, b) => a.length !== b.length ? b.length - a.length : a.localeCompare(b));
	//
	// 		// tokenize dateString
	// 		// '2020년 3월 2일 12시 34분 56초' -> [2020, 'year', 3, 'month', 2, 'day', 12, 'hour', 34, 'minute', 56, 'second']
	// 		const getTokens = dstr => {
	// 			let startIdx = 0;
	// 			let chucks = [];
	// 			let found = false;
	// 			let foundBefore = false;
	//
	// 			while (startIdx < dstr.length) {
	// 				foundBefore = found;
	// 				found = false;
	//
	// 				for (let key of keys) {
	// 					if (dstr.startsWith(key, startIdx)) {
	// 						let value = cultureInfo.translate[key];
	//
	// 						if (chucks.length >= 1 && typeof chucks[chucks.length - 1] === 'number' && typeof value === 'number') {
	// 							// 십이 -> [10, 2] -> 10+2
	// 							// 이십 -> [2, 10] -> 2*10
	// 							if (chucks[chucks.length - 1] > value)
	// 								chucks[chucks.length - 1] += value;
	// 							else
	// 								chucks[chucks.length - 1] *= value;
	// 						}
	// 						else if (chucks.length >= 1 && isRelativeObject(chucks[chucks.length - 1]) && isRelativeObject(value)) {
	// 							// 다음 내일 -> [{diff: 1}, {diff: 2}] -> {diff: 1+2}
	// 							// 내일 다음 -> [{diff: 2}, {diff: 1}] -> {diff: 2+1}
	//
	// 							chucks[chucks.length - 1].diff += value.diff;
	// 						}
	// 						else if (Array.isArray(value))
	// 							chucks.push(...value);
	// 						else
	// 							chucks.push(value);
	//
	// 						startIdx += key.length;
	// 						found = true;
	//
	// 						break;
	// 					}
	// 				}
	//
	// 				if (!found) {
	// 					if (chucks.length === 0)
	// 						chucks.push('');
	//
	// 					if (foundBefore)
	// 						chucks.push(dstr[startIdx++]);
	// 					else
	// 						chucks[chucks.length - 1] += dstr[startIdx++];
	// 				}
	// 			}
	//
	// 			return chucks.map(e => isNumberRegex.test(e) ? parseFloat(e) : e);
	// 		};
	//
	// 		let splited = dateString.split(' ').map(getTokens).flat();
	// 		let tokens = [];
	//
	// 		/**
	// 		 * 공백이 없는 문자열에서의 토큰들끼리는 잘 merge 되었으나, 공백이 없는 문자열들끼리의 토큰들끼리의 merge를 처리해야함.
	// 		 * ex. 다음 다음다음 날 -> [다음, 다음다음, 날] -> [{diff: 1}, {diff: 2}, 'day'] -> [{diff: 1+2}, 'day']
	// 		 * 위의 예시에서 1+2를 하는 작업을 아래 코드에서 수행함.
	// 		 */
	// 		while (splited.length > 0) {
	// 			let value = splited.shift();
	//
	// 			if (tokens.length >= 1 && typeof tokens[tokens.length - 1] === 'number' && typeof value === 'number') {
	// 				if (tokens[tokens.length - 1] > value)
	// 					tokens[tokens.length - 1] += value;
	// 				else
	// 					tokens[tokens.length - 1] *= value;
	// 			}
	// 			else if (tokens.length >= 1 && isRelativeObject(tokens[tokens.length - 1]) && isRelativeObject(value)) {
	// 				tokens[tokens.length - 1].diff += value.diff;
	// 			}
	// 			else if (Array.isArray(value))
	// 				tokens.push(...value);
	// 			else
	// 				tokens.push(value);
	// 		}
	//
	// 		// 세 시간 반 -> 3.5시간
	// 		for (let i = 2; i < tokens.length; i++) {
	// 			if (keywords.units.has(tokens[i - 1]) &&
	// 				keywords.counts.has(tokens[i]) &&
	// 				tokens[i] === 'half' &&
	// 				typeof tokens[i - 2] === 'number'
	// 			) {
	// 				tokens[i - 2] += 0.5;
	// 				tokens.splice(i, 1);
	// 				i--;
	// 			}
	// 		}
	//
	// 		// [3.5, '시간', '뒤'] -> [{ diff: 3.5 }, '시간']
	// 		let i = 0;
	// 		while (i < tokens.length) {
	// 			if (keywords.relative.has(tokens[i])) {
	// 				if (!standard)
	// 					standard = DateTime.now();
	//
	// 				const multiplier = tokens[i] === 'ago' ? -1 : 1;
	//
	// 				for (let j = i - 1; j >= 0; j--) {
	// 					if (keywords.standard.has(tokens[j]))
	// 						break;
	//
	// 					let diff;
	//
	// 					if (typeof tokens[j] === 'number')
	// 						diff = tokens[j] * multiplier;
	// 					else if (isRelativeObject(tokens[j]))
	// 						diff = tokens[j].diff * multiplier;
	//
	// 					if (diff != null)
	// 						tokens[j] = { diff };
	// 				}
	//
	// 				tokens.splice(i, 1);
	// 				i = -1;
	// 			}
	// 			i++;
	// 		}
	//
	// 		// [2022, 'year', 3, 'month', 2, 'day', 12, 'hour', 34, 'minute', 56, 'second']
	// 		const absoluteParse = () => {
	// 			const dateObject = {};
	// 			let meridiem = 'pm';
	//
	// 			for (let i = 0; i < tokens.length; i++) {
	// 				let token = tokens[i];
	//
	// 				if (keywords.units.has(token)) {    // year, month, week, day, hour, minute, second, millisecond 감지
	// 					if (cultureInfo['isTurnReversed'] === false) {   // 한국어처럼 '2022년' 과 같이 뒤에 단위가 붙는 경우
	// 						if (typeof tokens[i - 1] === 'number') {
	// 							dateObject[token] = tokens[i - 1];
	// 						}
	// 						// else
	// 						// 	throw new Error(`invalid format: { dateObject[${token}]: ${tokens[i - 1]} }`);
	// 					}
	// 					else {    // 영어처럼 'year 2022' 와 같이 앞에 단위가 붙는 경우
	// 						if (typeof tokens[i + 1] === 'number')
	// 							dateObject[token] = tokens[i + 1];
	// 						// else
	// 						// 	throw new Error(`invalid format: { dateObject[${token}]: ${tokens[i + 1]} }`);
	// 					}
	// 				}
	// 				else if (keywords.meridiems.has(token)) {
	// 					meridiem = token;
	// 				}
	// 				else if ('hour' in dateObject) {
	// 					if (keywords.meridiems.has(token))    // am, pm
	// 						meridiem = token;
	//
	// 					if (dateObject['hour'] < 12 && meridiem === 'pm')
	// 						dateObject['hour'] += 12;
	// 				}
	// 			}
	//
	// 			return dateObject;
	// 		};
	//
	// 		// [3, 'year', 'ago']
	// 		const relativeParse = () => {
	// 			const dateObject = {};
	// 			let standard_now = DateTime.now();
	//
	// 			for (let i = 0; i < tokens.length; i++) {
	// 				let token = tokens[i];
	//
	// 				if (keywords.standard.has(token)) {     // 3월 3일로부터
	// 					standard = DateTime._parse(tokens.slice(0, i).join(' '), locale)[0];
	// 					standard_now = DateTime.fromObject(standard);
	// 				}
	// 				else if (keywords.counts.has(token)) {    // [half] week, [end] month, 11 [th] month, 11 [th] sunday, ...
	// 					tokens[i + 1] ??= 'millisecond';    // 2023년의 마지막 -> 2023년 12월 31일 23시 59분 59초 999밀리초
	//
	// 					if (keywords.units.has(tokens[i + 1]) || keywords.weekdays.has(tokens[i + 1])) {
	// 						let tokenFront = tokens[i - 1]; // 11, 3, 1, ...
	// 						// token;  // th, half, end
	// 						let tokenBack = tokens[i + 1];  // month, week, day, sunday, ...
	//
	// 						let amount;
	// 						if (token === 'half')
	// 							amount = length => Math.floor(length / 2);
	// 						else if (token === 'th') {
	// 							if (typeof tokenFront !== 'number')
	// 								throw new Error(`invalid format: "${tokenFront} th"`);
	// 							amount = length => Math.min(tokenFront, length);
	// 						}
	// 						else if (token === 'end')
	// 							amount = length => length;
	//
	// 						switch (tokenBack) {
	// 							case 'year': {
	// 								if (token === 'half')
	// 									dateObject['day'] = amount(DateTime.lengthOfYear(dateObject['year'] ?? standard_now.year));
	// 								else
	// 									throw new Error('invalid format: "th/end 해"');
	//
	// 								dateObject['hour'] = 0;
	// 								dateObject['minute'] = 0;
	// 								dateObject['second'] = 0;
	// 								dateObject['millisecond'] = 0;
	// 								break;
	// 							}
	// 							case 'month': {
	// 								if (token === 'half') {
	// 									dateObject['day'] = amount(DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month));
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								else {
	// 									dateObject['month'] = amount(12);
	// 									dateObject['day'] = 1;
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'week': {
	// 								if (token === 'half') {
	// 									dateObject['day'] = standard_now.day + (amount(7) - standard_now.weekday + 7) % 7;
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								else {
	// 									dateObject['day'] = standard_now.day + (0 - dateObject['weekday'] + 7) % 7;
	// 									let lengthOfMonth = DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month);
	//
	// 									// 만약 23일이 일요일이라면 16, 9, 2일이 셋째주, 둘째주, 셋째주가 됨
	// 									// 23 % 7 == 2 이므로 2일이 첫주의 시작이 되어야 함
	// 									// 이 달의 길이가 31일이라면 (31 - 2) // 7 == 4 이므로 4주차가 됨 (2, 9, 16, 23, 30)
	// 									let first = dateObject['day'] % 7;
	// 									let weeks = [ first ];
	// 									for (let i = first + 7; i <= lengthOfMonth; i += 7)
	// 										weeks.push(i);
	//
	// 									dateObject['day'] = weeks[amount(weeks.length)];
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'day': {
	// 								if (token === 'half') {
	// 									dateObject['hour'] = amount(24);
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 									// else if (token === 'end') {
	// 									//
	// 								// }
	// 								else {  // th
	// 									dateObject['day'] = amount(DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month));
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'hour': {
	// 								if (token === 'half') {
	// 									dateObject['minute'] = amount(60);
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								else {
	// 									dateObject['hour'] = amount(24);
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'minute': {
	// 								if (token === 'half') {
	// 									dateObject['second'] = amount(60);
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								else {
	// 									dateObject['minute'] = amount(60);
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'second': {
	// 								if (token === 'half') {
	// 									dateObject['millisecond'] = amount(1000);
	// 								}
	// 								else {
	// 									dateObject['second'] = amount(60);
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 								break;
	// 							}
	// 							case 'millisecond': {
	// 								if (token === 'half')
	// 									throw new Error('invalid format: "half 밀리초"');
	// 								else
	// 									dateObject['millisecond'] = amount(1000);
	// 								break;
	// 							}
	// 							default: {  // weekday
	// 								if (token === 'half')
	// 									throw new Error('invalid format: "half 요일"');
	// 								else {
	// 									dateObject['day'] = standard_now.day + (DateTime.getWeekDayFromName(tokenBack, locale = 'en-US') - standard_now.weekday + 7) % 7;
	// 									let lengthOfMonth = DateTime.lengthOfMonth(dateObject['year'] ?? standard_now.year, dateObject['month'] ?? standard_now.month);
	//
	// 									let first = dateObject['day'] % 7;
	// 									let weeks = [ first ];
	// 									for (let i = first + 7; i <= lengthOfMonth; i += 7)
	// 										weeks.push(i);
	//
	// 									dateObject['day'] = weeks[amount(weeks.length)];
	// 									dateObject['hour'] = 0;
	// 									dateObject['minute'] = 0;
	// 									dateObject['second'] = 0;
	// 									dateObject['millisecond'] = 0;
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 				else if (keywords.times.has(token)) {
	// 					dateObject['minute'] = 0;
	// 					dateObject['second'] = 0;
	// 					dateObject['millisecond'] = 0;
	//
	// 					if (token === 'morning')
	// 						dateObject['hour'] = 9;
	// 					else if (token === 'noon')
	// 						dateObject['hour'] = 12;
	// 					else if (token === 'afternoon')
	// 						dateObject['hour'] = 15;
	// 					else if (token === 'evening')
	// 						dateObject['hour'] = 18;
	// 					else if (token === 'night')
	// 						dateObject['hour'] = 21;
	// 					else if (token === 'midnight') {
	// 						dateObject['hour'] = 0;
	// 						dateObject['day'] = dateObject['day'] ?? standard_now.day + 1;
	// 					}
	// 				}
	// 				else if (isRelativeObject(token)) {
	// 					if (keywords.units.has(tokens[i + 1])) {
	// 						dateObject[tokens[i + 1]] = standard_now[tokens[i + 1]] + token.diff;
	// 					}
	// 				}
	// 			}
	//
	// 			return dateObject;
	// 		};
	//
	// 		const absolute = absoluteParse();
	// 		const relative = relativeParse();
	// 		const result = Object.assign(absolute, relative);
	//
	// 		if (Object.keys(result).length > 0)
	// 			return [ result, standard ];
	// 	};
	//
	// 	let parsed = parse1() ?? parse2();
	//
	// 	if (parsed != null)
	// 		return [ parsed, undefined ];
	// 	else {
	// 		let parsed = parse3();
	//
	// 		if (parsed != null)
	// 			return parsed;
	// 		else
	// 			throw new Error('Invalid date string: ' + dateString);
	// 	}
	// }
	
	static now() {
		return new DateTime(new $D());
	}
	
	static today() {
		const now = new $D();
		return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate()));
	}
	
	static tomorrow() {
		const now = new $D();
		return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate() + 1));
	}
	
	static yesterday() {
		const now = new $D();
		return new DateTime(new $D(now.getFullYear(), now.getMonth(), now.getDate() - 1));
	}
	
	static sunday() {
		const diff = (0 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static monday() {
		const diff = (1 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static tuesday() {
		const diff = (2 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static wednesday() {
		const diff = (3 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static thursday() {
		const diff = (4 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static friday() {
		const diff = (5 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static saturday() {
		const diff = (6 - new $D().getDay() + 7) % 7;
		return DateTime.today().add({ day: diff });
	}
	
	static january(day) {
		day = day ?? 1;
		return new DateTime({ month: 1, day: day });
	}
	
	static february(day) {
		day = day ?? 1;
		return new DateTime({ month: 2, day: day });
	}
	
	static march(day) {
		day = day ?? 1;
		return new DateTime({ month: 3, day: day });
	}
	
	static april(day) {
		day = day ?? 1;
		return new DateTime({ month: 4, day: day });
	}
	
	static may(day) {
		day = day ?? 1;
		return new DateTime({ month: 5, day: day });
	}
	
	static june(day) {
		day = day ?? 1;
		return new DateTime({ month: 6, day: day });
	}
	
	static july(day) {
		day = day ?? 1;
		return new DateTime({ month: 7, day: day });
	}
	
	static august(day) {
		day = day ?? 1;
		return new DateTime({ month: 8, day: day });
	}
	
	static september(day) {
		day = day ?? 1;
		return new DateTime({ month: 9, day: day });
	}
	
	static october(day) {
		day = day ?? 1;
		return new DateTime({ month: 10, day: day });
	}
	
	static november(day) {
		day = day ?? 1;
		return new DateTime({ month: 11, day: day });
	}
	
	static december(day) {
		day = day || 1;
		return new DateTime({ month: 12, day: day });
	}
	
	static isLeapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	
	static leapYearCount(start, end) {
		const l = y => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
		
		return l(end - 1) - l(start) + (DateTime.isLeapYear(start) ? 1 : 0);    // [start, end)
	}
	
	static lengthOfMonth(year, month) {
		return [ 0, 31, (DateTime.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
	}
	
	static lengthOfYear(year) {
		return DateTime.isLeapYear(year) ? 366 : 365;
	}
	
	static getWeekdayFromName(weekDayName, startOnMon = false, locale = 'ko-KR') {
		const cultureInfo = getCultureInfo(locale);
		
		let W = cultureInfo['W'];
		let WW = cultureInfo['WW'];
		
		if (startOnMon) {
			W = W.slice(1).concat(W[0]);
			WW = WW.slice(1).concat(WW[0]);
		}
		
		let ret = W.map(e => e.toLowerCase()).indexOf(weekDayName.toLowerCase());
		if (ret === -1)
			ret = WW.map(e => e.toLowerCase()).indexOf(weekDayName.toLowerCase());
		if (ret === -1)
			throw new Error('Invalid weekDayName, not found ' + weekDayName);
		
		return ret;
	}
	
	isLeapYear() {
		return DateTime.isLeapYear(this.year);
	}
	
	isWeekend() {
		return this.weekday === 0 || this.weekday === 6;
	}
	
	isWeekday() {
		return !this.isWeekend();
	}
	
	isToday() {
		const now = new $D();
		return this.year === now.getFullYear() && this.month === now.getMonth() + 1 && this.day === now.getDate();
	}
	
	lengthOfMonth() {
		return [ 0, 31, (this.isLeapYear() ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][this.month];
	}
	
	lengthOfYear() {
		return this.isLeapYear() ? 366 : 365;
	}

	toJSON() {
		return this.toString();
	}
}

exports.DateTime = DateTime;
exports.Date = Date;
exports.Time = Time;
exports.$D = $D;    // 원래 JS의 Date 객체
