import {Channel, Chat} from "../DBManager/classes";

type ArgType = string | number

export declare abstract class Command {
    protected constructor(name: string, description: string, rooms?: string[], examples?: string[]);

    public readonly name: string;
    public readonly description: string;
    public readonly rooms: string[];
    public readonly examples: string[];
    public readonly callback: (chat: Chat, channel: Channel, args: ArgType[]) => void;

    on(callback: (chat: Chat, channel: Channel, args: ArgType[]) => void): void;
}

export declare abstract class Arg {
    protected constructor(name: string);

    public readonly name: string;
    public readonly many: boolean;

    abstract toRegExp(): RegExp;
}

export declare class IntArg extends Arg {
    constructor(name: string, min?: number, max?: number);

    public readonly min?: number;
    public readonly max?: number;

    toRegExp(): RegExp;
    test(value: number): boolean;
}

export declare class StringArg extends Arg {
    constructor(name: string, length?: number, minLength?: number, maxLength?: number);

    public readonly length?: number;
    public readonly minLength?: number;
    public readonly maxLength?: number;

    toRegExp(): RegExp;
    test(value: string): boolean;
}

export declare interface StructuredCommandOptions {
    name: string;
    description: string;
    usage: string;
    rooms?: string[];
    examples?: string[];
}

export declare class StructuredCommand extends Command {
    constructor(options: StructuredCommandOptions);

    public readonly usage: string;

    regexed(): [ RegExp, Arg[] ];
}

export declare interface NaturalCommandOptions {
    name: string;
    description: string;
    query: { [key: string]: Arg };
    rooms?: string[];
    examples?: string[];
}

export declare class NaturalCommand extends Command {
    constructor(options: NaturalCommandOptions);
}