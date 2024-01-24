class Command {
    constructor(name, description, rooms, examples) {
        if (this.constructor === Command)
            throw new TypeError("Cannot construct abstract class");

        if (name === undefined)
            throw new TypeError("name is required");
        if (description === undefined)
            throw new TypeError("description is required");

        this.name = name;
        this.description = description;
        this.rooms = rooms || [];
        this.examples = examples || [];
        this.callback = null;
    }

    on(callback) {
        this.callback = callback;
        return this;
    }

    manual() {
        throw new Error("Not implemented");
    }
}

class Arg {
    constructor(name) {
        if (this.constructor === Arg)
            throw new TypeError("Cannot construct abstract class");

        this.name = name;
        this.many = false;
    }

    toRegExp() {
        throw new Error("Not implemented");
    }

    parse(value) {
        throw new Error("Not implemented");
    }
}

// TODO: FloatArg

class IntArg extends Arg {
    constructor(name, min, max) {
        super(name);
        this.min = min;
        this.max = max;
    }

    toRegExp() {
        if (this.min && this.max && this.min > this.max)
            throw new RangeError("min must be less than or equal to max");

        let ret = /[+-]?\d+/;

        if (!this.many)
            return ret;
        else
            return new RegExp(`(?:${ret.source}\\s?)+`);
    }

    parse(value) {
        if (!this.toRegExp().test(value))
            return false;

        if (this.many) {
            let ret = value.split(/\s+/).map(Number);
            if (this.min && ret.some(v => v < this.min))
                return false;
            else if (this.max && ret.some(v => v > this.max))
                return false;
            else
                return ret;
        } else {
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
            ret = /\S+/;

        if (!this.many)
            return ret;
        else
            return new RegExp(`(?:${ret.source}\\s?)+`);
    }

    parse(value) {
        if (!this.toRegExp().test(value))
            return false;

        if (this.many)
            return value.split(/\s+/);
        else
            return value;
    }
}

class StructuredCommand extends Command {
    constructor(options) {
        if (options.usage === undefined)
            throw new TypeError("usage is required");

        super(options.name, options.description, options.rooms, options.examples);
        this.usage = options.usage;

        let args = [];
        let regexed = this.usage.replace(/<.+?>/g, m => {
            let [ nameAndType, ...options ] = m.slice(1, -1).split(/\s+/);
            let [ name, type ] = nameAndType.split(":");

            options = options.map(o => {
                let splited = o.split("=");
                if (!isNaN(Number(splited[1]))) {
                    splited[1] = Number(splited[1]);
                }

                return splited;
            });

            if (type.startsWith('int'))
                args.push(new IntArg(name));
            else if (type.startsWith('string'))
                args.push(new StringArg(name));
            else
                throw new TypeError(`Invalid type: ${type}`);

            for (let [key, value] of options) {
                args[args.length - 1][key] = value;
            }

            if (type.endsWith('s')) {
                args[args.length - 1].many = true;
            }

            return `(${args[args.length - 1].toRegExp().source})`;
        });

        this.args = args;
        this.regex = new RegExp(`^${regexed}$`);
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

        super(options.name, options.description, options.rooms, options.examples);
        this.query = options.query;
    }

    // TODO: implement
}

exports.StructuredCommand = StructuredCommand;
exports.NaturalCommand = NaturalCommand;
