import { Channel, Chat } from "../DBManager/classes";
import { CronJobFactor } from "../CronJob/cron-job-manager/lib/cron-job-factor";
import { DateTime, Duration } from "../DateTime";

type ChatWithFiltered = { [K in keyof Chat]: Chat[K] } & { filteredText: string };

type ArgType = [string, number, DateTime, Duration];
type ArgTypeUnion = ArgType[number];

type Query = { [token: string]: null | ArgTypeUnion | (() => ArgTypeUnion) };
type Args = { [key: string]: ArgTypeUnion | ArgTypeUnion[], datetime?: DateTime, duration?: Duration };
type ArgsWithDateTime = {
	[key: string]: ArgTypeUnion | ArgTypeUnion[],
	datetime?: DateTime,
	duration?: Duration
};
type CronJob = { cron: string, comment: string, startDate?: DateTime, endDate?: DateTime, before?: number, after?: number };

type Execute<C> = (self: Command, chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteLazy<C> = (self: Command, chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteCron = (self: Command, index: number, datetime: DateTime) => void;

type ExecuteWithoutSelf<C> = (chat: C, channel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteLazyWithoutSelf<C> = (chat: C, prevChat: C, channel: Channel, prevChannel: Channel, args: C extends Chat ? Args : (C extends ChatWithFiltered ? ArgsWithDateTime : never)) => void;
type ExecuteCronWithoutSelf = (index: number, datetime: DateTime) => void;

declare interface CommandOptions {
	name: string;
	icon: string;
	description: string;
	channels?: Channel[];
	cronJobs?: CronJob[];
	examples?: string[];
	execute?: Execute<Chat>;
	executeLazy?: ExecuteLazy<Chat>;
	executeCron?: ExecuteCron;
}

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
	private readonly _execute: Execute<any>;
	private readonly _executeLazy: ExecuteLazy<any>;
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

declare interface StructuredCommandOptions extends CommandOptions {
	usage: string;
}

// @ts-ignore
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
		public execute: Execute<Chat> | null;
		public executeLazy: ExecuteLazy<Chat> | null;
		public executeCron: ExecuteCron | null;

		setName(name: string, icon: string): this;

		setDescription(description: string): this;

		setUsage(usage: string): this;

		setChannels(...channels: Channel[]): this;

		setExamples(...examples: (string | string[])[]): this;

		setCronJob(cronJobs: CronJob[], execute: ExecuteCron): this;

		setExecute(execute: Execute<Chat>, executeLazy?: ExecuteLazy<Chat>): this;

		build(): StructuredCommand;
	}
}

declare interface NaturalCommandOptions extends CommandOptions {
	query: Query;
	useDateParse: boolean;
	useDuration?: boolean;
	filterIncludeEnding?: boolean;
	dictionaryPath?: string;
}

// @ts-ignore
export declare class NaturalCommand extends Command {
	constructor(options: NaturalCommandOptions);

	public readonly query: Query;
	public readonly useDateParse: boolean;
	public readonly useDuration: boolean;
	public readonly filterIncludeEnding: boolean;
	public readonly dictionaryPath: string;
	public readonly margin: number;

	private readonly map: [string, string][];	// [word, token]

	private readonly _execute: Execute<ChatWithFiltered>;
	private readonly _executeLazy: ExecuteLazy<ChatWithFiltered>;

	public readonly execute: ExecuteWithoutSelf<ChatWithFiltered>;
	public readonly executeLazy: ExecuteLazyWithoutSelf<ChatWithFiltered>;

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
		public margin: number;
		public channels: Channel[];
		public cronJobs: CronJob[];
		public dictionaryPath: string;
		public examples: string[];
		public execute: Execute<ChatWithFiltered> | null;
		public executeLazy: ExecuteLazy<ChatWithFiltered> | null;
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

		setExecute(execute: Execute<ChatWithFiltered>, executeLazy?: ExecuteLazy<ChatWithFiltered>): this;

		setUseDateParse(margin: number, useDuration?: boolean, filterIncludeEnding?: boolean): this;

		build(): NaturalCommand;
	}
}

declare class Registry {
	constructor();

	public data: Command[];
	static CommandRegistry: Registry;

	setCronManager(cronManager: CronJobFactor): void;

	loop(callback: (command: Command) => void): void;

	register(command: Command, logRoom: Channel): void;

	get(chat: Chat, channel: Channel, debugRooms: Channel[], isDebugMod: boolean): {
		cmd: Command | null,
		args: { [key: string]: ArgTypeUnion | ArgTypeUnion[] } | null
	};
}

export declare const CommandRegistry: Registry;