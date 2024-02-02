import { Channel, Chat } from "../DBManager/classes";

type ArgType = string | number
type Execute = (
    chat: Chat,
    channel: Channel,
    args: { [key: string]: ArgType | ArgType[] },
    self: Command,
    prevChat?: Chat,
    prevChannel?: Channel
) => void

export declare abstract class Command {
    protected constructor(name: string, description: string, execute: Execute, rooms?: string[], examples?: string[]);

    public readonly name: string;
    public readonly description: string;
    public readonly execute: Execute;
    public readonly rooms: string[];
    public readonly examples: string[];

    abstract manual(): string;
    register(): void;
}

export declare abstract class Arg {
    protected constructor(name: string);

    public readonly name: string;
    public readonly many: boolean;

    abstract toRegExp(): RegExp;
    abstract parse(value: string): ArgType | false;
}

export declare class IntArg extends Arg {
    constructor(name: string, min?: number, max?: number);

    public readonly min?: number;
    public readonly max?: number;

    toRegExp(): RegExp;
    parse(value: string): number | false;
}

export declare class StringArg extends Arg {
    constructor(name: string, length?: number, minLength?: number, maxLength?: number);

    public readonly length?: number;
    public readonly minLength?: number;
    public readonly maxLength?: number;

    toRegExp(): RegExp;
    parse(value: string): string | false;
}

export declare interface StructuredCommandOptions {
    name: string;
    description: string;
    usage: string;
    rooms?: string[];
    examples?: string[];
    execute: Execute;
}

export declare class StructuredCommand extends Command {
    constructor(options: StructuredCommandOptions);

    public readonly usage: string;
    public readonly args: Arg[];
    public readonly regex: RegExp;

    static add(options: StructuredCommandOptions): void;

    manual(): string;
}

export declare interface NaturalCommandOptions {
    name: string;
    description: string;
    query: { [position: string]: string | null | (() => string) | { [token: string]: null } };
    rooms?: string[];
    dictionaryPath?: string;
    examples?: string[];
    execute: Execute;
}

export declare class NaturalCommand extends Command {
    constructor(options: NaturalCommandOptions);
    dictionary: { [token: string]: { [aliase: string]: string[] } };

    static add(options: NaturalCommandOptions): void;

    manual(): string;
}

export declare interface CommandInfo {
    cmd: Command | null,
    args: { [key: string]: ArgType | ArgType[] } | null
}

export declare class Registry {
    constructor();
    public data: { [key: string]: Command };
    static CommandRegistry: Registry;

    loop(callback: (command: Command) => void): void;
    register(command: Command): void;
    get(chatText: string, channelNameOrId: string): CommandInfo;
}

export declare const CommandRegistry: Registry;