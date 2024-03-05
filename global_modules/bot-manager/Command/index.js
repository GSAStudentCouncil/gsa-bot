const { DateTime } = require('../DateTime');
const $ = `/sdcard/msgbot/global_modules/bot-manager/Command`;
const IS_DIST = false;
const COMPRESS = '\u200b'.repeat(500);

class Command {
	constructor(name, description, _execute, _executeLazy, _executeCron, cronJobs, channels, examples) {
		if (this.constructor === Command)
			throw new TypeError("Cannot construct abstract class");
		
		if (name == null)
			throw new TypeError("name is required");
		if (description == null)
			throw new TypeError("description is required");
		
		this.name = name;
		this.description = description;
		this.channels = channels ?? [];
		this.cronJobs = cronJobs ?? {};
		this.examples = examples ?? [];
		
		this._execute = _execute ?? ((self, chat, channel, args) => {
		});
		this._executeLazy = _executeLazy ?? ((self, chat, prevChat, channel, prevChannel, args) => {
		});
		this._executeCron = _executeCron ?? ((self, tag) => {
		});
		
		this.lazy = _executeLazy !== undefined;
	}
	
	execute(chat, channel, args) {
		return this._execute(this, chat, channel, args);
	}
	
	executeLazy(chat, prevChat, channel, prevChannel, args) {
		return this._executeLazy(this, chat, prevChat, channel, prevChannel, args);
	}
	
	executeCron(tag) {
		return this._executeCron(this, tag);
	}
	
	register() {
		Registry.CommandRegistry.register(this);
	}
	
	manual(contents) {
		let ret = [
			`🧩 \`${this.name}\` 명령어 도움말${COMPRESS}`,
			'——————————',
			this.description,
			'',
			'📌 인자',
			'——',
			...contents,
			''
		];
		
		if (Object.keys(this.cronJobs).length > 0) {
			ret.push('📌 자동 실행 주기');
			ret.push('——');
			ret.push(...Object.entries(this.cronJobs).map(([k, v]) => `· ${k}: ${v}`));
			ret.push('');
		}
		
		if (this.channels.length > 0) {
			ret.push('📌 활성화된 방');
			ret.push('——');
			ret.push(...this.channels.map(c => `· ${c.name}`));
			ret.push('');
		}
		
		if (this.examples.length > 0) {
			ret.push('📌 예시');
			ret.push('——');
			ret.push(...this.examples.map(e => `"${e}"`));
		}
		
		return ret.join('\n');
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
		return /[0-9+\-ㄱ-ㅎ가-힣 ]+/;
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

const map = {
	'int': IntArg,
	'str': StrArg,
	'date': DateArg
};

class StructuredCommand extends Command {
	constructor(options) {
		if (options.usage == null)
			throw new TypeError("usage is required");
		
		super(options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);
		
		this.usage = options.usage;
		
		this._argumentStr = [];
		
		let args = [];
		let regexApplied = this.usage.replace(/\s*<.+?>/g, m => {
			const pos = m.indexOf('<');
			
			const whitespaces = m.slice(0, pos);
			let [ nameAndType, ...options ] = m.slice(pos + 1, -1).split(/\s+/);
			let [ name, type ] = nameAndType.split(":");
			this._argumentStr.push([ name, type ]);
			
			options = options.map(o => {
				let splited = o.split("=");
				if (!isNaN(Number(splited[1]))) {
					splited[1] = Number(splited[1]);
				}
				
				return splited;
			});
			
			let k;
			for (let key in map) {
				if (type.startsWith(key)) {
					k = key;
					break;
				}
			}
			
			if (k == null)
				throw new TypeError(`Invalid type: ${type}`);
			
			args.push(new map[k](name));
			
			for (let [ key, value ] of options) {
				args[args.length - 1][key] = value;
			}
			
			type = type.slice(k.length).trim();
			
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
			this.description = null;
			this.usage = null;
			this.execute = null;
			this.executeLazy = null;
			this.executeCron = null;
			this.cronJobs = {};
			this.channels = [];
			this.examples = [];
		}
		
		setName(name) {
			this.name = name;
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
			this.channels = channels;
			return this;
		}
		
		setExamples(...examples) {
			this.examples = examples;
			return this;
		}
		
		build() {
			if (this.name == null)
				throw new TypeError("name is required");
			if (this.description == null)
				throw new TypeError("description is required");
			if (this.usage == null)
				throw new TypeError("usage is required");
			if (this.execute == null)
				throw new TypeError("execute is required");
			
			return new StructuredCommand({
				name: this.name,
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
	
	manual() {
		return super.manual([
			`"${this.usage.replace(/<.+?>/g, m => m.slice(0, m.indexOf(':')) + '>')}"`,
			...this.args.map((arg, i) => {
				let ret = `· ${this._argumentStr[i][0]}: ${this._argumentStr[i][1]}`;
				
				let options = [];
				Object.keys(arg).forEach(key => {
					if (key === 'name' || key === 'many' || key === 'includeEmpty')
						return;
					
					if (arg[key])   // null, undefined, 0, false 등이 아닐 경우
						options.push(`${key}=${arg[key]}`);
				});
				
				if (options.length > 0)
					ret += ` (${options.join(', ')})`;
				
				return ret;
			})
		]);
	}
}

class NaturalCommand extends Command {
	constructor(options) {
		if (options.query == null)
			throw new TypeError("query is required");
		
		super(options.name, options.description, options.execute, options.executeLazy, options.executeCron, options.cronJobs, options.channels, options.examples);
		
		this.query = options.query;
		this.useDateParse = options.useDateParse;
		this.useDuration = options.useDuration;
		options.dictionaryPath = options.dictionaryPath || 'dict.json';
		
		let dictionary = IS_DIST ?
			JSON.parse(FileStream.read(`${$}/${options.dictionaryPath}`)) :
			require(`./${options.dictionaryPath}`);
		
		this.map = {};
		for (let tok in dictionary) {
			for (let alias of dictionary[tok]) {
				this.map[alias] = tok;
			}
		}
	}
	
	static Builder = class {
		constructor() {
			this.name = null;
			this.description = null;
			this.query = null;
			this.dictionaryPath = null;
			this.execute = null;
			this.executeLazy = null;
			this.executeCron = null;
			this.useDateParse = false;
			this.useDuration = false;
			this.cronJobs = {};
			this.channels = [];
			this.examples = [];
		}
		
		setName(name) {
			this.name = name;
			return this;
		}
		
		setDescription(description) {
			this.description = description;
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
		
		setUseDateParse(useDateParse, useDuration) {
			this.useDateParse = useDuration;
			this.useDuration = useDuration;
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
			this.channels = channels;
			return this;
		}
		
		setExamples(...examples) {
			this.examples = examples;
			return this;
		}
		
		build() {
			if (this.name == null)
				throw new TypeError("name is required");
			if (this.description == null)
				throw new TypeError("description is required");
			if (this.query == null)
				throw new TypeError("query is required");
			if (this.execute == null)
				throw new TypeError("execute is required");
			
			return new NaturalCommand({
				name: this.name,
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
				useDuration: this.useDuration
			});
		}
	}
	
	static add(options) {
		new NaturalCommand(options).register();
	}
	
	manual() {
		let ret = [];
		for (let key in this.query) {
			let tmp = `· ${key} `;
			
			if (typeof this.query[key] === 'function')
				tmp += `(default = function -> ${this.query[key]()})`;
			else if (this.query[key] !== null)
				tmp += `(default = ${this.query[key]})`;
			
			ret.push(tmp);
		}
		
		return super.manual(ret);
	}
}

class Registry {
	static CommandRegistry = new Registry();
	
	constructor() {
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
		for (let cmdName in this.data) {
			callback(this.data[cmdName]);
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
			for (let tag in command.cronJobs) {
				this.cronManager.add(command.cronJobs[tag], () => command.executeCron(tag));
			}
		}
	}
	
	get(chat, channel) {
		for (let cmd of this.data) {
			if (cmd.channels.length !== 0 && !cmd.channels.map(c => c.id).includes(channel.id))    // 방이 포함되어 있지 않을 경우
				continue;
			
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
				let rawText = chat.text;
				let text = chat.text.replace(/ +/g, ' ').replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ""); // 구두점 제거
				
				args = Object.assign({}, cmd.query);    // 기본값을 가진 객체를 깊은 복사
				
				if (cmd.useDateParse) {
					if (cmd.useDuration) {
						let { parse: { from, to }, string } = DateTime.parseDurationWithFilteredString(text);
						args.datetime = { from, to };
						
						if (from != null && to != null)
							text = string;
					}
					else {
						let { parse, string } = DateTime.parseWithFilteredString(text);
						args.datetime = parse;
						
						if (parse != null)
							text = string;
					}
				}
				
				// 기본값만 있던 cmd.query 에서 쿼리할 대상으로 보낸 토큰들에 대응되는 단어들을 매칭
				// 매칭이 실패하면 기본값이 있는 경우 그대로 남고, 아니면 null로 남게 된다
				for (let word of text.split(' ')) {
					if (word in cmd.map) {
						let token = cmd.map[word];
						
						if (token in args)
							args[token] = word;
					}
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
				
				chat.text = text;
				chat.rawText = rawText;
			}
			
			return { cmd, args };
		}
		
		return { cmd: null, args: null };
	}
}

exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
exports.CommandRegistry = Registry.CommandRegistry;
