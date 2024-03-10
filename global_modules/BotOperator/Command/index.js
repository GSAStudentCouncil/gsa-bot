const { DateTime } = require('../DateTime');
require('../polyfill');

const $ = `/sdcard/msgbot/global_modules/BotOperator/Command`;
const IS_DIST = false;
const COMPRESS = '\u200b'.repeat(500);

function josa(str, josa) {
	const hasJong = (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;

	switch (josa) {
		case '이가':
		case '가':
			return str + (hasJong ? '이가' : '가');
		case '을':
		case '를':
			return str + (hasJong ? '을' : '를');
		case '은':
		case '는':
			return str + (hasJong ? '은' : '는');
		case '으로':
		case '로':
			return str + (hasJong ? '으로' : '로');
		case '과':
		case '와':
			return str + (hasJong ? '과' : '와');
		default:
			return str + josa;
	}
};

class Command {
	constructor(name, icon, description, _execute, _executeLazy, _executeCron, cronJobs, channels, examples) {
		if (this.constructor === Command)
			throw new TypeError("Cannot construct abstract class");
		
		if (name == null)
			throw new TypeError("name is required");
		if (icon == null)
			throw new TypeError("icon is required");
		if (description == null)
			throw new TypeError("description is required");
		
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.channels = channels ?? [];
		this.cronJobs = cronJobs ?? {};
		this.examples = examples ?? [];
		
		this._execute = _execute ?? ((self, chat, channel, args) => {
		});
		this._executeLazy = _executeLazy ?? ((self, chat, prevChat, channel, prevChannel, args) => {
		});
		this._executeCron = _executeCron ?? ((self, index, datetime) => {
		});
		
		this.lazy = _executeLazy != null;
	}
	
	execute(chat, channel, args) {
		return this._execute(this, chat, channel, args);
	}
	
	executeLazy(chat, prevChat, channel, prevChannel, args) {
		return this._executeLazy(this, chat, prevChat, channel, prevChannel, args);
	}
	
	executeCron(index, datetime) {
		return this._executeCron(this, index, datetime);
	}
	
	register() {
		Registry.CommandRegistry.register(this);
	}
	
	createManual(contents) {
		let ret = [
			`🧩 '${this.name}' 명령어 도움말${COMPRESS}`,
			'——————————',
			this.description,
			'',
			...contents,
			''
		];
		
		if (this.cronJobs.length > 0) {
			ret.push('📌 자동 실행 주기');
			ret.push('——');
			ret.push(...this.cronJobs.map(({ comment }) => `· ${comment}`));
			ret.push('');
		}
		
		if (this.channels.length > 0) {
			ret.push('📌 활성화된 방');
			ret.push('——');
			ret.push(...this.channels.map(channel => `· ${channel.customName}`));
			ret.push('');
		}
		
		if (this.examples.length > 0) {
			ret.push('📌 예시');
			ret.push('——');
			ret.push(...this.examples.map(e => `${e}`));
		}
		
		return ret.join('\n');
	}

	manual(formats) {
		throw new Error("Not implemented");
	}
}

class Arg {
	constructor(name) {
		if (this.constructor === Arg)
			throw new TypeError("Cannot construct abstract class");
		
		this.name = name;
		this.many = false;
		this.includeEmpty = false;
	}
	
	toRegExp() {
		throw new Error("Not implemented");
	}
	
	parse(value) {
		throw new Error("Not implemented");
	}
}

class IntArg extends Arg {
	constructor(name, min, max) {
		super(name);
		this.min = min;
		this.max = max;

		this._min_str = '이상';
		this._max_str = '이하';
	}
	
	toRegExp() {
		if (this.min && this.max && this.min > this.max)
			throw new RangeError("min must be less than or equal to max");
		
		let ret = new RegExp("[+-]?\\d" + (this.includeEmpty ? "*" : "+"));
		
		if (!this.many)
			return ret;
		else
			return new RegExp(`(?:${ret.source}\\s?)${this.includeEmpty ? "*" : "+"}`);
	}
	
	parse(value) {
		if (value != null && !this.toRegExp().test(value))
			return false;
		
		if (this.many) {
			if (value == null)
				return [];
			
			let ret = value.split(' ').map(Number);
			if (this.min && ret.some(v => v < this.min))
				return false;
			else if (this.max && ret.some(v => v > this.max))
				return false;
			else
				return ret;
		}
		else {
			if (value == null)
				return null;
			
			let ret = Number(value);
			if (this.min && ret < this.min)
				return false;
			else if (this.max && ret > this.max)
				return false;
			else
				return ret;
		}
	}
}

class StrArg extends Arg {
	constructor(name, length, minLength, maxLength) {
		super(name);
		this.length = length;
		this.minLength = minLength;
		this.maxLength = maxLength;

		this._length_str_ = '글자';
		this._minlength_str = '글자 이상';
		this._maxlength_str = '글자 이하';
	}
	
	toRegExp() {
		if (this.length && (this.minLength || this.maxLength))
			throw new Error("length cannot be used with minLength or maxLength");
		if (this.minLength && this.maxLength && this.minLength > this.maxLength)
			throw new RangeError("minLength must be less than or equal to maxLength");
		if (this.minLength && this.minLength < 1)
			throw new RangeError("minLength must be greater than or equal to 1");
		if (this.maxLength && this.maxLength < 1)
			throw new RangeError("maxLength must be greater than or equal to 1");
		if (!this.minLength && this.maxLength)
			this.minLength = 1;
		
		let ret;
		
		if (this.length)
			ret = new RegExp(`\\S{${this.length}}`);
		else if (this.minLength && this.maxLength)
			ret = new RegExp(`\\S{${this.minLength},${this.maxLength}}`);
		else if (this.minLength)
			ret = new RegExp(`\\S{${this.minLength},}`);
		else
			ret = new RegExp(`\\S${this.includeEmpty ? "*" : "+"}`);
		
		if (!this.many)
			return ret;
		else
			return new RegExp(`(?:${ret.source}\\s?)${this.includeEmpty ? "*" : "+"}`);
	}
	
	parse(value) {
		if (value != null && !this.toRegExp().test(value))
			return false;
		
		if (this.many) {
			if (value == null)
				return [];
			
			return value.split(' ');
		}
		else {
			if (value == null)
				return null;
			
			return value;
		}
	}
}

class DateArg extends Arg {
	constructor(name, duration) {
		super(name);
		this.duration = duration;
	}
	
	toRegExp() {
		return /[0-9+\-ㄱ-ㅎㅏ-ㅣ가-힣:./ ]+/;
	}
	
	parse(value) {
		if (value != null && !this.toRegExp().test(value))
			return false;
		
		let parsed;
		if (!this.duration) {
			parsed = DateTime.parse(value);
			
			if (parsed == null)
				return false;
		}
		else {
			parsed = DateTime.parseDuration(value);
			
			if (!(parsed.from && parsed.to))
				return false;
		}
		
		return parsed;
	}
}

const mapType = {
	'int': IntArg,
	'str': StrArg,
	'date': DateArg
};

const mapStr = {
	'int': '숫자',
	'str': '문자열',
	'date': ['날짜', '기간']
}

class StructuredCommand extends Command {
	constructor(options) {
		if (options.usage == null)
			throw new TypeError("usage is required");
		
		super(options.name, options.icon, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);
		
		this.usage = options.usage;
		
		this._arguments = [];
		
		let args = [];
		let regexApplied = this.usage.replace(/\s*<.+?>/g, m => {
			const pos = m.indexOf('<');
			
			const whitespaces = m.slice(0, pos);
			let [ nameAndType, ...properties ] = m.slice(pos + 1, -1).split(/\s+/);
			let [ name, type ] = nameAndType.split(":");
			this._arguments.push([ name, type ]);
			
			properties = properties.map(o => {
				let splited = o.split("=");

				if (!Number.isNaN(Number(splited[1]))) {
					splited[1] = Number(splited[1]);
				}
				else if (splited[1] === 'true') {
					splited[1] = true;
				}
				else if (splited[1] === 'false') {
					splited[1] = false;
				}
				
				return splited;
			});
			
			let k;
			for (let key in mapType) {
				if (type.startsWith(key)) {
					k = key;
					break;
				}
			}
			
			if (k == null)
				throw new TypeError(`Invalid type: ${type}`);
			
			args.push(new mapType[k](name));
			
			for (let [ key, value ] of properties) {
				args[args.length - 1][key] = value;
			}
			
			type = type.slice(k.length).trim();
			this._arguments[this._arguments.length - 1][1] = k;
			
			if (type === '[]') {
				if (k !== 'date')
					args[args.length - 1].many = true;
			}
			else if (type === '?') {
				args[args.length - 1].includeEmpty = true;
			}
			else if (type === '[]?') {
				if (k !== 'date') {
					args[args.length - 1].many = true;
					args[args.length - 1].includeEmpty = true;
				}
			}
			else if (type !== '') {
				throw new TypeError(`Invalid type options: ${type}`);
			}
			
			let ret = `${whitespaces}(${args[args.length - 1].toRegExp().source})`;
			if (args[args.length - 1].includeEmpty)
				return `(?:${ret})?`;
			else
				return ret;
		});
		
		this.args = args;
		this.regex = new RegExp(`^${regexApplied}$`);
	}
	
	static Builder = class {
		constructor() {
			this.name = null;
			this.icon = null;
			this.description = null;
			this.usage = null;
			this.execute = null;
			this.executeLazy = null;
			this.executeCron = null;
			this.cronJobs = [];
			this.channels = [];
			this.examples = [];
		}
		
		setName(name, icon) {
			this.name = name;
			this.icon = icon;
			return this;
		}
		
		setDescription(description) {
			this.description = description;
			return this;
		}
		
		setUsage(usage) {
			this.usage = usage;
			return this;
		}
		
		setExecute(execute, executeLazy) {
			this.execute = execute;
			if (executeLazy != null)
				this.executeLazy = executeLazy;
			
			return this;
		}
		
		setCronJob(cronJobs, execute) {
			this.cronJobs = cronJobs;
			this.executeCron = execute;
			
			return this;
		}
		
		setChannels(...channels) {
			this.channels = channels.filter(Boolean);
			return this;
		}
		
		setExamples(...examples) {
			this.examples = examples.map(e => Array.isArray(e) ? e.map((e2, i) => i == 0 ? e2 : '┗' + '━'.repeat(i - 1) + ' ' + e2).join('\n') + '\n' : e);
			return this;
		}
		
		build() {
			if (this.name == null)
				throw new TypeError("name is required");
			if (this.icon == null)
				throw new TypeError("icon is required");
			if (this.description == null)
				throw new TypeError("description is required");
			if (this.usage == null)
				throw new TypeError("usage is required");
			if (this.execute == null)
				throw new TypeError("execute is required");
			
			return new StructuredCommand({
				name: this.name,
				icon: this.icon,
				description: this.description,
				usage: this.usage,
				execute: this.execute,
				executeLazy: this.executeLazy,
				executeCron: this.executeCron,
				cronJobs: this.cronJobs,
				channels: this.channels,
				examples: this.examples
			});
		}
	}
	
	static add(options) {
		new StructuredCommand(options).register();
	}
	
	manual(formats) {
		let ret = [
			'📌 입력 양식',
			'——',
		];

		let usage = this.usage.replace(/<.+?>/g, m => {
			let name = m.slice(1, m.indexOf(':'));
			
			if (this.args.find(arg => arg.name === name).many)
				name = `${name}...`;

			return `<${name}>`;
		});
		ret.push(usage);

		let args = this.args.map((arg, i) => {
			let argStr = this._arguments[i];

			let name = argStr[0];
			let typename = argStr[1] === 'date' ? mapStr['date'][Number(arg.duration)] : mapStr[argStr[1]];
			let properties = [];
			let endProperties = [];

			Object.keys(arg).forEach(key => {
				if (arg[key] && `_${key}_str` in arg)   // null, undefined, 0, false 등이 아닐 경우
					properties.push(`${arg[key]}${arg[`_${key}_str`]}`);
				else {
					if (key === 'many' && arg[key] === true)
						endProperties.push('여러 개 입력 가능');
					else if (key === 'includeEmpty' && arg[key] === true)
						endProperties.push('생략 허용');
				}
			});
			
			return `· ${name}: ${(properties.join(' ') + ' ' + typename).trim()} ${endProperties.length > 0 ? ('(' + endProperties.join(', ') + ')') : ''}`;
		});
		ret.push(...args);

		let manual = super.createManual(ret);

		for (let fmt in formats) {
			manual = manual.replaceAll(`$${fmt}`, formats[fmt]);
		}

		return manual;
	}
}

class NaturalCommand extends Command {
	constructor(options) {
		if (options.query == null)
			throw new TypeError("query is required");
		
		super(options.name, options.icon, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);
		
		this.query = options.query;
		this.useDateParse = options.useDateParse;
		this.useDuration = options.useDuration;
		this.filterIncludeEnding = options.filterIncludeEnding;
		this.dictionaryPath = options.dictionaryPath || 'dict.json';
		
		let dictionary = IS_DIST ?
			JSON.parse(FileStream.read(`${$}/${this.dictionaryPath}`)) :
			require(`./${this.dictionaryPath}`);
		
		this.map = {};
		for (let tok in dictionary) {
			for (let alias of dictionary[tok]) {
				this.map[alias] = tok;
			}
		}

		this.map = Object.entries(this.map).sort((a, b) => b[0].length - a[0].length);
	}
	
	static Builder = class {
		constructor() {
			this.name = null;
			this.icon = null;
			this.description = null;
			this.query = null;
			this.dictionaryPath = null;
			this.execute = null;
			this.executeLazy = null;
			this.executeCron = null;
			this.useDateParse = false;
			this.useDuration = false;
			this.filterIncludeEnding = true;
			this.cronJobs = [];
			this.channels = [];
			this.examples = [];
		}
		
		setName(name, icon) {
			this.name = name;
			this.icon = icon;
			return this;
		}
		
		setDescription(description) {
			this.description = description;
			return this;
		}
		
		setDictionaryPath(dictionaryPath) {
			this.dictionaryPath = dictionaryPath;
			return this;
		}
		
		setQuery(query) {
			this.query = query;
			return this;
		}
		
		setDictionaryPath(dictionaryPath) {
			this.dictionaryPath = dictionaryPath;
			return this;
		}
		
		setUseDateParse(useDateParse, useDuration = false, filterIncludeEnding = true) {
			this.useDateParse = useDateParse;
			this.useDuration = useDuration;
			this.filterIncludeEnding = filterIncludeEnding;
			return this;
		}
		
		setExecute(execute, executeLazy) {
			this.execute = execute;
			if (executeLazy !== undefined)
				this.executeLazy = executeLazy;
			
			return this;
		}
		
		setCronJob(cronJobs, execute) {
			this.cronJobs = cronJobs;
			this.executeCron = execute;
			
			return this;
		}
		
		setChannels(...channels) {
			this.channels = channels.filter(Boolean);
			return this;
		}
		
		setExamples(...examples) {
			this.examples = examples.map(e => Array.isArray(e) ? e.map((e2, i) => i == 0 ? e2 : '┗' + '━'.repeat(i - 1) + ' ' + e2).join('\n') + '\n' : e);
			return this;
		}
		
		build() {
			if (this.name == null)
				throw new TypeError("name is required");
			if (this.icon == null)
				throw new TypeError("icon is required");
			if (this.description == null)
				throw new TypeError("description is required");
			if (this.query == null)
				throw new TypeError("query is required");
			if (this.execute == null)
				throw new TypeError("execute is required");
			
			return new NaturalCommand({
				name: this.name,
				icon: this.icon,
				description: this.description,
				query: this.query,
				dictionaryPath: this.dictionaryPath,
				execute: this.execute,
				executeLazy: this.executeLazy,
				executeCron: this.executeCron,
				cronJobs: this.cronJobs,
				channels: this.channels,
				examples: this.examples,
				useDateParse: this.useDateParse,
				useDuration: this.useDuration,
				filterIncludeEnding: this.filterIncludeEnding
			});
		}
	}
	
	static add(options) {
		new NaturalCommand(options).register();
	}
	
	manual(formats) {
		let ret = [
			'📌 필수 포함 용어',
			'——',
		];

		for (let key in this.query) {
			if (key === 'datetime')
				continue;

			let tmp = `· ${josa(key, '를')} 의미하는 용어 (ex. ${this.map.filter(e => e[1] === key).map(e => e[0]).slice(0, 4).join(', ')}, ...) `;
			let humanize = value => value instanceof DateTime ? value.humanize() : value;

			if (typeof this.query[key] === 'function')
				tmp += `(생략 시 기본값 = ${humanize(this.query[key]())})`;
			else if (this.query[key] != null && !Number.isNaN(this.query[key]))
				tmp += `(생략 시 기본값 = ${humanize(this.query[key])})`;
			
			ret.push(tmp);
		}

		if (this.useDateParse) {
			let tmp;
			if (this.useDuration)
				tmp = `· '기간'을 의미하는 용어 (ex. 다음 주까지, 내일부터 모레 저녁까지, ...)`;
			else
				tmp = `· '날짜 및 시간'을 의미하는 용어 (ex. 3월 14일, 내일 저녁, 4일 뒤 5시, ...)`;

			let humanize = value => value instanceof DateTime ? value.humanize() : value;
			
			if (typeof this.query['datetime'] === 'function')
				tmp += `(생략 시 기본값 = ${humanize(this.query['datetime']())})`;
			else if (this.query['datetime'] != null && !Number.isNaN(this.query['datetime']))
				tmp += `(생략 시 기본값 = ${humanize(this.query['datetime'])})`;

			ret.push(tmp);
		}
		
		let manual = super.createManual(ret);

		for (let fmt in formats) {
			manual = manual.replaceAll(`$${fmt}`, formats[fmt]);
		}

		return manual;
	}
}

class Registry {
	static CommandRegistry = new Registry();
	
	constructor() {
		// 싱글톤 클래스
		if (Registry.CommandRegistry)
			return Registry.CommandRegistry;
		
		this.data = [];
		Registry.CommandRegistry = this;
	}
	
	setCronManager(cronManager) {
		this.cronManager = cronManager;
		this.cronManager.setWakeLock(true);
	}
	
	loop(callback) {
		for (let cmd of this.data) {
			callback(cmd);
		}
	}
	
	register(command) {
		if (!(command instanceof Command))	
			throw new TypeError("command must be instance of Command");
		
		for (let cmd of this.data) {
			if (cmd.name === command.name)
				throw new Error(`Command with name "${command.name}" already exists`);
		}
		
		this.data.push(command);
		
		// StructuredCommand - NaturalCommand 순으로 정렬하고,
		// 각각의 명령어들은 StructuredCommand 의 경우 .args 의 개수, NaturalCommand 의 경우 .query 의 개수로 내림차순 정렬
		this.data.sort((a, b) => {
			if (a instanceof StructuredCommand && b instanceof NaturalCommand)
				return -1;
			else if (a instanceof NaturalCommand && b instanceof StructuredCommand)
				return 1;
			else {
				if (a instanceof StructuredCommand)
					return b.args.length - a.args.length;
				else if (a instanceof NaturalCommand)
					return Object.keys(b.query).length - Object.keys(a.query).length;
				else
					return 0;
			}
		});
		
		if (this.cronManager != null) {
			for (let i = 0; i < command.cronJobs.length; i++) {
				let { cron } = command.cronJobs[i];
				this.cronManager.add(cron, () => command.executeCron(i, DateTime.now()));
			}
		}
	}
	
	get(chat, channel) {
		for (let cmd of this.data) {
			if (cmd.channels.length !== 0 && !cmd.channels.map(c => c.id).includes(channel.id))    // 방이 포함되어 있지 않을 경우
				continue;
			
			let ret = {};
			let args;
			
			if (cmd instanceof StructuredCommand) {
				args = {};
				
				let matched = chat.text.match(cmd.regex);
				if (matched == null)
					continue;
				
				let groups = matched.slice(1);  // 매치된 인자들
				let is_satisfy = true;    // 세부 속성을 만족하는지 여부
				cmd.args.forEach((arg, i) => {
					let ret = arg.parse(groups[i]);
					if (ret === false) {
						is_satisfy = false;
						return false;
					}
					
					args[arg.name] = ret;
				});
				
				if (!is_satisfy)  // 세부 속성을 만족하지 못했을 경우
					continue;
			}
			else if (cmd instanceof NaturalCommand) {
				let filteredText = chat.text.replace(/\s+/g, ' ');
				
				args = Object.assign({}, cmd.query);    // 기본값을 가진 객체를 깊은 복사

				// 기본값만 있던 cmd.query 에서 쿼리할 대상으로 보낸 토큰들에 대응되는 단어들을 매칭
				// 매칭이 실패하면 기본값이 있는 경우 그대로 남고, 아니면 null로 남게 된다
				let startIdx = 0;
				const foundTokens = {};	// 이미 찾은 토큰들 { token: word }
				
				while (filteredText.length > startIdx) {
					for (let [word, token] of cmd.map) {
						if (token in args && !(token in foundTokens) && filteredText.startsWith(word, startIdx)) {
							args[token] = word;
							foundTokens[token] = word;
							startIdx += word.length - 1;

							break;
						}
					}

					startIdx++;
				}
				
				if (cmd.useDateParse) {
					if (!('datetime' in args))
						args.datetime = null;

					if (cmd.useDuration) {
						let { parse: { from, to }, string } = DateTime.parseDuration(filteredText, true, cmd.filterIncludeEnding);
						
						if (from != null && to != null) {
							args.datetime = { from, to };
							filteredText = string;
						}
					}
					else {
						let { parse, string } = DateTime.parse(filteredText, true, cmd.filterIncludeEnding);
						
						if (parse != null) {
							args.datetime = parse;
							filteredText = string;
						}
					}
				}	
				
				chat.filteredText = filteredText.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
				
				for (let token in foundTokens) {
					chat.filteredText = chat.filteredText.replace(foundTokens[token], '');
				}
				
				let is_full = true;
				
				for (let key in args) {
					if (args[key] == null) {
						is_full = false;
						break;
					}
					// 기본값이 함수인 경우, 특히 날짜 관련 함수일 경우 호출 시간이 중요하므로 이 때 호출.
					else if (typeof args[key] === 'function') {
						args[key] = args[key]();
					}
				}
				
				if (!is_full)
					continue;
			}
			
			return { cmd, args };
		}
		
		return { cmd: null, args: null };
	}
}

exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
exports.CommandRegistry = Registry.CommandRegistry;
