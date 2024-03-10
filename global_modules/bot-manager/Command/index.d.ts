import { Channel, Chat } from "../DBManager/classes";
import { CronJobFactor } from "../CronJob/cron-job-manager/lib/cron-job-factor";
import { DateTime } from "../DateTime";

type ChatWithFiltered = { [K in keyof Chat]: Chat[K] } & { filteredText: string };

type ArgType = [string, number, DateTime];
type ArgTypeUnion = ArgType[number];

type Query = { [token: string]: null | string | (() => ArgTypeUnion) };
type Args = { [key: string]: null | ArgTypeUnion | ArgTypeUnion[] };
type ArgsWithDateTime<T> = {
	[key: string]: ArgTypeUnion | ArgTypeUnion[],
	datetime?: T extends true ? DateTime : { from: DateTime | null, to: DateTime | null }
};
type CronJob = { cron: string, comment: string };

type Execute<C, A> = (self: Command, chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime<A> : never)) => void;
type ExecuteLazy<C, A> = (self: Command, chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime<A> : never)) => void;
type ExecuteCron = (self: Command, index: number, datetime: DateTime) => void;

type ExecuteWithoutSelf<C, A> = (chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime<A> : never)) => void;
type ExecuteLazyWithoutSelf<C, A> = (chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime<A> : never)) => void;
type ExecuteCronWithoutSelf = (index: number, datetime: DateTime) => void;

declare interface CommandOptions {
	name: string;
	icon: string;
	description: string;
	channels?: Channel[];
	cronJobs?: CronJobs;
	examples?: string[];
	execute?: Execute<Chat, boolean>;
	executeLazy?: ExecuteLazy<Chat, boolean>;
	executeCron?: ExecuteCron;
};

declare abstract class Command {
	protected constructor(
		name: string, icon: string, description: string,
		_execute?: Execute<any>, _executeLazy?: ExecuteLazy<any>, _executeCron?: ExecuteCron,
		cronJobs?: CronJob[], channels?: Channel[], examples?: string[]
	);

	public readonly name: string;
	public readonly icon: string;
	public readonly description: string;
	public readonly channels: Channel[];
	public readonly cronJobs: CronJob[];
	public readonly examples: string[];
	private abstract readonly _execute: Execute<any>;
	private abstract readonly _executeLazy: ExecuteLazy<any>;
	private readonly _executeCron: ExecuteCron;
	public readonly lazy: boolean;

	public abstract readonly execute: ExecuteWithoutSelf<any>;
	public abstract readonly executeLazy: ExecuteLazyWithoutSelf<any>;
	public readonly executeCron: ExecuteCronWithoutSelf;

	register(): void;

	createManual(contents: string[]): string;

	abstract manual(formats?: { [fmt: string]: string }): string;
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

declare interface StructuredCommandOptions implements CommandOptions {
	usage: string;
}

export declare class StructuredCommand extends Command {
	constructor(options: StructuredCommandOptions);

	public readonly usage: string;
	public readonly args: Arg[];
	public readonly regex: RegExp;

	private readonly _execute: Execute<Chat, false>;
	private readonly _executeLazy: ExecuteLazy<Chat, false>;

	public readonly execute: ExecuteWithoutSelf<Chat, false>;
	public readonly executeLazy: ExecuteLazyWithoutSelf<Chat, false>;

	static add(options: StructuredCommandOptions): void;

	manual(formats?: { [fmt: string]: string }): string;
}

export declare namespace StructuredCommand {
	export class Builder {
		constructor();

		public name: string;
		public icon: string;
		public description: string;
		public usage: string;
		public channels: Channel[];
		public cronJobs: CronJob[];
		public examples: string[];
		public execute: Execute<Chat, false> | null;
		public executeLazy: ExecuteLazy<Chat, false> | null;
		public executeCron: ExecuteCron | null;

		setName(name: string, icon: string): this;

		setDescription(description: string): this;

		setUsage(usage: string): this;

		setChannels(...channels: Channel[]): this;

		setExamples(...examples: (string | string[])[]): this;

		setCronJob(cronJobs: CronJob[], execute: ExecuteCron): this;

		setExecute(execute: Execute<Chat, false>, executeLazy?: ExecuteLazy<Chat, false>): this;

		build(): StructuredCommand;
	}
}

declare interface NaturalCommandOptions implements CommandOptions {
	query: Query;
	useDateParse: boolean;
	useDuration?: boolean;
	filterIncludeEnding?: boolean;
	dictionaryPath?: string;
}

export declare class NaturalCommand extends Command {
	constructor(options: NaturalCommandOptions);

	public readonly query: Query;
	public readonly useDateParse: boolean;
	public readonly useDuration: boolean;
	public readonly filterIncludeEnding: boolean;
	public readonly dictionaryPath: string;

	private readonly map: [string, string][];	// [word, token]

	private readonly _execute: Execute<ChatWithFiltered, this['useDuration']>;
	private readonly _executeLazy: ExecuteLazy<ChatWithFiltered, this['useDuration']>;

	public readonly execute: ExecuteWithoutSelf<ChatWithFiltered, this['useDuration']>;
	public readonly executeLazy: ExecuteLazyWithoutSelf<ChatWithFiltered, this['useDuration']>;

	static add(options: NaturalCommandOptions): void;

	manual(formats?: { [fmt: string]: string }): string;
}

export declare namespace NaturalCommand {
	export class Builder {
		constructor();

		public name: string;
		public icon: string;
		public description: string;
		public query: Query;
		public channels: Channel[];
		public cronJobs: CronJob[];
		public dictionaryPath: string;
		public examples: string[];
		public execute: Execute<ChatWithFiltered, this['useDuration']> | null;
		public executeLazy: ExecuteLazy<ChatWithFiltered, this['useDuration']> | null;
		public executeCron: ExecuteCron | null;
		public useDateParse: boolean;
		public useDuration: boolean;
		public filterIncludeEnding: boolean;

		setName(name: string, icon: string): this;

		setDescription(description: string): this;

		setQuery(query: Query): this;

		setChannels(...channels: Channel[]): this;

		setDictionaryPath(dictionaryPath: string): this;

		setExamples(...examples: (string | string[])[]): this;

		setCronJob(cronJobs: CronJob[], execute: ExecuteCron): this;

		setExecute(execute: Execute<ChatWithFiltered, this['useDuration']>, executeLazy?: ExecuteLazy<ChatWithFiltered, this['useDuration']>): this;

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