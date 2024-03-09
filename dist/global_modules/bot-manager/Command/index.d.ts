import { Channel, Chat } from "../DBManager/classes";
import { CronJobFactor } from "../CronJob/cron-job-manager/lib/cron-job-factor";
import { DateTime } from "../DateTime";

type ChatWithFiltered = { [K in keyof Chat]: Chat[K] } & { filteredText: string };

type ArgType = [ string, number, DateTime ];
type ArgTypeUnion = ArgType[number];

type Query = { [token: string]: null | string | (() => ArgTypeUnion) };
type Args = { [key: string]: ArgTypeUnion | ArgTypeUnion[] };
type ArgsWithDateTime = {
	[key: string]: ArgTypeUnion | ArgTypeUnion[],
	datetime?: DateTime | { from: DateTime | null, to: DateTime | null }
};

type Execute<C> = (self: Command, chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteLazy<C> = (self: Command, chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteCron = (self: Command, tag: string) => void;

type ExecuteWithoutSelf<C> = (chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteLazyWithoutSelf<C> = (chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteCronWithoutSelf = (tag: string) => void;

declare abstract class Command {
	protected constructor(
		name: string, description: string,
		_execute?: Execute<any>, _executeLazy?: ExecuteLazy<any>, _executeCron?: ExecuteCron,
		cronJobs?: { [tag: string]: string }, channels?: Channel[], examples?: string[]
	);
	
	public readonly name: string;
	public readonly description: string;
	public readonly channels: Channel[];
	public readonly cronJobs: { [tag: string]: string };
	public readonly examples: string[];
	private abstract readonly _execute: Execute<any>;
	private abstract readonly _executeLazy: ExecuteLazy<any>;
	private readonly _executeCron: ExecuteCron;
	public readonly lazy: boolean;
	
	public abstract readonly execute: ExecuteWithoutSelf<any>;
	public abstract readonly executeLazy: ExecuteLazyWithoutSelf<any>;
	public readonly executeCron: ExecuteCronWithoutSelf;
	
	register(): void;
	
	manual(contents: string[]): string;
	
	abstract manual(): string;
}

declare abstract class Arg {
	protected constructor(name: string);
	
	public readonly name: string;
	public readonly many: boolean;
	
	abstract toRegExp(): RegExp;
	
	abstract parse(value: string): ArgTypeUnion | false;
}

declare class IntArg extends Arg {
	constructor(name: string, min?: number, max?: number);
	
	public readonly min?: number;
	public readonly max?: number;
	
	toRegExp(): RegExp;
	
	parse(value: string): ArgType[0] | false;
}

declare class StrArg extends Arg {
	constructor(name: string, length?: number, minLength?: number, maxLength?: number);
	
	public readonly length?: number;
	public readonly minLength?: number;
	public readonly maxLength?: number;
	
	toRegExp(): RegExp;
	
	parse(value: string): ArgType[1] | false;
}

declare class DateArg extends Arg {
	constructor(name: string, duration?: boolean);
	
	public readonly duration?: boolean;
	
	toRegExp(): RegExp;
	
	parse(value: string): ArgType[2] | false;
}

declare interface StructuredCommandOptions {
	name: string;
	description: string;
	usage: string;
	channels?: Channel[];
	cronJobs?: { [tag: string]: string };
	examples?: string[];
	execute?: Execute<Chat>;
	executeLazy?: ExecuteLazy<Chat>;
	executeCron?: ExecuteCron;
}

export declare class StructuredCommand extends Command {
	constructor(options: StructuredCommandOptions);
	
	public readonly usage: string;
	public readonly args: Arg[];
	public readonly regex: RegExp;
	
	private readonly _execute: Execute<Chat>;
	private readonly _executeLazy: ExecuteLazy<Chat>;
	
	public readonly execute: ExecuteWithoutSelf<Chat>;
	public readonly executeLazy: ExecuteLazyWithoutSelf<Chat>;
	
	static add(options: StructuredCommandOptions): void;
	
	manual(): string;
}

export declare namespace StructuredCommand {
	export class Builder {
		constructor();
		
		public name: string;
		public description: string;
		public usage: string;
		public channels: Channel[];
		public cronJobs: { [tag: string]: string };
		public examples: string[];
		public execute: Execute<Chat> | null;
		public executeLazy: ExecuteLazy<Chat> | null;
		public executeCron: ExecuteCron | null;
		
		setName(name: string): this;
		
		setDescription(description: string): this;
		
		setUsage(usage: string): this;
		
		setChannels(...channels: Channel[]): this;
		
		setExamples(...examples: string[]): this;
		
		setCronJob(cronJobs: { [tag: string]: string }, execute: ExecuteCron): this;
		
		setExecute(execute: Execute<Chat>, executeLazy?: ExecuteLazy<Chat>): this;
		
		build(): StructuredCommand;
	}
}

declare interface NaturalCommandOptions {
	name: string;
	description: string;
	query: Query;
	useDateParse: boolean;
	useDuration?: boolean;
	filterIncludeEnding?: boolean;
	channels?: Channel[];
	cronJobs?: { [tag: string]: string };
	dictionaryPath?: string;
	examples?: string[];
	execute?: Execute<ChatWithFiltered>;
	executeLazy?: ExecuteLazy<ChatWithFiltered>;
	executeCron?: ExecuteCron;
}

export declare class NaturalCommand extends Command {
	constructor(options: NaturalCommandOptions);
	
	public readonly query: Query;
	public readonly useDateParse: boolean;
	private readonly map: { [key: string]: string };
	
	private readonly _execute: Execute<ChatWithFiltered>;
	private readonly _executeLazy: ExecuteLazy<ChatWithFiltered>;
	
	public readonly execute: ExecuteWithoutSelf<ChatWithFiltered>;
	public readonly executeLazy: ExecuteLazyWithoutSelf<ChatWithFiltered>;
	
	static add(options: NaturalCommandOptions): void;
	
	manual(): string;
}

export declare namespace NaturalCommand {
	export class Builder {
		constructor();
		
		public name: string;
		public description: string;
		public query: Query;
		public channels: Channel[];
		public cronJobs: { [tag: string]: string };
		public dictionaryPath: string;
		public examples: string[];
		public execute: Execute<ChatWithFiltered> | null;
		public executeLazy: ExecuteLazy<ChatWithFiltered> | null;
		public executeCron: ExecuteCron | null;
		public useDateParse: boolean;
		public useDuration: boolean;
		public filterIncludeEnding: boolean;
		
		setName(name: string): this;
		
		setDescription(description: string): this;
		
		setQuery(query: Query): this;
		
		setChannels(...channels: Channel[]): this;
		
		setDictionaryPath(dictionaryPath: string): this;
		
		setExamples(...examples: string[]): this;
		
		setCronJob(cronJobs: { [tag: string]: string }, execute: ExecuteCron): this;
		
		setExecute(execute: Execute<ChatWithFiltered>, executeLazy?: ExecuteLazy<ChatWithFiltered>): this;
		
		setUseDateParse(useDateParse: boolean, useDuration?: boolean = false, filterIncludeEnding?: boolean = true): this;
		
		build(): NaturalCommand;
	}
}

declare class Registry {
	constructor();
	
	public data: Command[];
	static CommandRegistry: Registry;
	
	setCronManager(cronManager: CronJobFactor): void;
	
	loop(callback: (command: Command) => void): void;
	
	register(command: Command): void;
	
	get(chat: Chat, channel: Channel): {
		cmd: Command | null,
		args: { [key: string]: ArgTypeUnion | ArgTypeUnion[] } | null
	};
}

export declare const CommandRegistry: Registry;