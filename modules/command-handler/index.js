const IS_DIST = false;

class Command {
    constructor(name, description, execute, rooms, examples) {
        if (this.constructor === Command)
            throw new TypeError("Cannot construct abstract class");

        if (name === undefined)
            throw new TypeError("name is required");
        if (description === undefined)
            throw new TypeError("description is required");
        if (execute === undefined)
            throw new TypeError("execute is required");

        this.name = name;
        this.description = description;
        this.execute = execute;
        this.rooms = rooms || [];
        this.examples = examples || [];
    }

    manual() {
        throw new Error("Not implemented");
    }

    register() {
        Registry.CommandRegistry.register(this);
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

            let ret = value.split(/\s+/).map(Number);
            if (this.min && ret.some(v => v < this.min))
                return false;
            else if (this.max && ret.some(v => v > this.max))
                return false;
            else
                return ret;
        } else {
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

class StringArg extends Arg {
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

            return value.split(/\s+/);
        }
        else {
            if (value == null)
                return null;

            return value;
        }
    }
}

// TODO: includeZero면 앞 공백 생략 허용 좀

class StructuredCommand extends Command {
    constructor(options) {
        if (options.usage === undefined)
            throw new TypeError("usage is required");

        super(options.name, options.description, options.execute, options.rooms, options.examples);

        this.usage = options.usage;

        let args = [];
        let regexed = this.usage.replace(/\s*<.+?>/g, m => {
            const pos = m.indexOf('<');

            const whitespaces = m.slice(0, pos);
            let [ nameAndType, ...options ] = m.slice(pos + 1, -1).split(/\s+/);
            let [ name, type ] = nameAndType.split(":");

            options = options.map(o => {
                let splited = o.split("=");
                if (!isNaN(Number(splited[1]))) {
                    splited[1] = Number(splited[1]);
                }

                return splited;
            });

            const map = {
                'int': IntArg,
                'string': StringArg
            }

            let k;
            for (let key in map) {
                if (type.startsWith(key)) {
                    k = key;
                    break;
                }
            }

            if (k === undefined)
                throw new TypeError(`Invalid type: ${type}`);

            args.push(new map[k](name));
            type = type.slice(k.length).split('');

            for (let [key, value] of options) {
                args[args.length - 1][key] = value;
            }

            if (type.includes('s'))
                args[args.length - 1].many = true;
            if (type.includes('0'))
                args[args.length - 1].includeEmpty = true;

            let ret = `${whitespaces}(${args[args.length - 1].toRegExp().source})`;
            if (args[args.length - 1].includeEmpty)
                return `(?:${ret})?`;
            else
                return ret;
        });

        this.args = args;
        this.regex = new RegExp(`^${regexed}$`);
    }

    static add(options) {
        new StructuredCommand(options).register();
    }

    manual() {
        return `\
[ ${this.name} ]
  - ${this.description}

"${this.usage.replace(/<.+?>/g, m => m.slice(0, m.indexOf(":")) + ">")}"
${this.args.map(arg => {
    let ret = `  - <${arg.name}>: ${arg.constructor.name.slice(0, -3).toLowerCase() + (arg.many ? 's' : '')}`;
    
    // print options indent one more
    Object.keys(arg).forEach(key => {
        if (key === 'name' || key === 'many')
            return;
        
        if (arg[key] !== undefined)
            ret += `\n    - ${key}: ${arg[key]}`;
    });
    
    return ret;
}).join("\n")}

활성화된 방:
${this.rooms.map(r => `  - ${r}`).join("\n")}

예시:
${this.examples.map(e => `  - "${e}"`).join("\n")}
`;
    }
}

class NaturalCommand extends Command {
    constructor(options) {
        if (options.query === undefined)
            throw new TypeError("query is required");

        super(options.name, options.description, options.execute, options.rooms, options.examples);

        this.query = options.query;
        options.dictionaryPath = options.dictionaryPath || 'dict.json';

        let dictionary;
        if (IS_DIST)
            dictionary = JSON.parse(FileStream.read(`/sdcard/msgbot/global_modules/command-handler/${options.dictionaryPath}`));
        else
            dictionary = require(`./${options.dictionaryPath}`);

        this.map = {};
        for (let position in dictionary) {
            for (let tok in dictionary[position]) {
                for (let alias of dictionary[position][tok]) {
                    this.map[alias] = { token: tok, position: position };
                }
            }
        }
    }

    static add(options) {
        new NaturalCommand(options).register();
    }

    input(text) {
        text = text.replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, "");
        let query = this.query;

        for (let word of text.split(' ')) {
            if (word in this.map) {
                let position = this.map[word].position;
                let token = this.map[word].token;

                if (position in query) {
                    if (query[position].constructor.name === 'Object') {
                        if (token in query[position]) {
                            query[position] = token;
                        }
                    } else {    // string || null || (() => string)
                        query[position] = token;
                    }
                }
            }
        }

        return query;
    }

    manual() {
        return `\
[ ${this.name} ]
  - ${this.description}

{ ${Object.keys(this.query).map(e => `${e}` + ((this.query[e].constructor.name === 'Object') ? `[${Object.keys(this.query[e])[0]}]` : ``)).join(', ')} }
${Object.keys(this.query).map(pos => {
    let ret = '  - ';
    
    if (this.query[pos] === null)
        ret += `${pos} (required)`;
    else if (this.query[pos].constructor.name === 'Object')
        ret += `${pos}[${Object.keys(this.query[pos])[0]}] (required)`;
    else if (typeof this.query[pos] === 'function')
        ret += `${pos}: () => string (required)`;
    else    // string || (() => string)
        ret += `${pos}: ${this.query[pos]} (optional)`;
    
    return ret;
}).join("\n")}

활성화된 방:
${this.rooms.map(r => `  - ${r}`).join("\n")}

예시:
${this.examples.map(e => `  - "${e}"`).join("\n")}
`;
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

    register(command) {
        if (!(command instanceof Command))
            throw new TypeError("command must be instance of Command");

        this.data.push(command);
    }

    get(chatName, channelNameOrId) {
        for (let cmd of this.data) {
            if (cmd.rooms.length !== 0 && !cmd.rooms.includes(channelNameOrId))    // 방이 포함되어 있지 않을 경우
                continue;

            let args;

            if (cmd instanceof StructuredCommand) {
                args = {};

                let matched = chatName.match(cmd.regex);
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
                args = cmd.input(chatName);

                let is_full = true;
                for (let key in args) {
                    if (args[key] === null || args[key].constructor.name === 'Object') {
                        is_full = false;
                        break;
                    } else if (typeof args[key] === 'function') {
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
