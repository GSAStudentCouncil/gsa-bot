const chalk = require('chalk');
const { CommandRegistry } = require('../global_modules/BotOperator/Command/index');

/**
 * @param {Chat} chat
 * @param {Channel} channel
 * @returns {string}
 */
const 말풍선 = (chat, channel) => {
	let title;
	if (chat.user instanceof BotUser)
		title = chalk.bold.green(chat.user.name) + chalk.dim(`[${channel.name}]`);
	else
		title = chalk.bold.blue(chat.user.name) + chalk.dim(`[${channel.name}]`);
	
	let content = chat.text.replaceAll('\u200b'.repeat(500), '[... 더보기]');
	
	const getStringWidth = (str) => {
		return str.split('').reduce((width, char) => {
			return width + (char.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/) ? 2 : 1);
		}, 0);
	};
	
	// 여러 줄의 문자열 처리
	const lines = content.split('\n');
	const lineWidths = lines.map(line => getStringWidth(line));
	const contentWidth = Math.max(...lineWidths);

	return title + '\n' + ('┏' + '━'.repeat(contentWidth) + '┓') + '\n ' + content.split('\n').join('\n ') + '\n' + ('┗' + '━'.repeat(contentWidth) + '┛') + '\n';
}

class Bot {
	constructor() {
		this.isDebugMod = false;
		this.lazyQueue = [];
		this.debugRooms = [];
		this.logRoom = null;
		this.registry = CommandRegistry;
	}
	
	setDebugRoom(...rooms) {
		this.debugRooms = rooms;
	}
	
	setLogRoom(room) {
		this.logRoom = room;
	}

	addCommand(cmd) {
		this.registry.register(cmd, this.logRoom);
	}
	
	onMessage(chat, channel) {
		console.log(말풍선(chat, channel));
		
		for (let i = 0; i < this.lazyQueue.length; i++) {
			const [prevChat, prevChannel, cmd, args] = this.lazyQueue[i];
			
			if (prevChat.user.id === chat.user.id && prevChannel.id === channel.id) {
				cmd.executeLazy(chat, prevChat, channel, prevChannel, args);
				this.lazyQueue.splice(i, 1);
				return;
			}
		}
		
		let { cmd, args } = this.registry.get(chat, channel, this.debugRooms, this.isDebugMod);
		if (cmd === null) return;
		
		cmd.execute(chat, channel, args);
		
		if (cmd.lazy)
			this.lazyQueue.push([chat, channel, cmd, args]);
	}
}

class User {
	/**
	 * @param {String} name
	 */
	constructor(name) {
		this.name = name;
	}
}

class BotUser extends User {
	constructor() {
		super('Bot');
	}
}

class Chat {
	/**
	 * @param {String} text
	 * @param {User} user
	 */
	constructor(text, user) {
		this.text = text;
		this.user = user;
	}
}

class Channel {
	/**
	 * @param {String} name
	 * @param {String} id
	 */
	constructor(name, id=null) {
		this.name = name;
		this.id = id ?? String(Math.floor(Math.random() * 1e10));
		this.log = [];
		
		channels[this.id] = this;
	}
	
	send(text) {
		return new Promise((resolve, reject) => {
			try {
				let chat = new Chat(text, new BotUser());
				this.log.push(chat);
				
				console.log(말풍선(chat, this));
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}
	
	warn(text) {
		return this.send(`⚠ ${text}`);
	}
	
	error(text) {
		return this.send(`❌ ${text}`);
	}
	
	success(text) {
		return this.send(`✅ ${text}`);
	}
	
	info(text) {
		return this.send(`ℹ️ ${text}`);
	}
}

/**
 * @type {Record<String, Channel>}
 */
const channels = {};

exports.Bot = Bot;
exports.User = User;
exports.BotUser = BotUser;
exports.Chat = Chat;
exports.Channel = Channel;
