const { Message, BotManager, Event } = require('d.js');

const bot = BotManager.getCurrentBot();
bot.on(Event.MESSAGE, onMessage);

function onMessage(msg) {
	if (msg.content === 'ping')
		msg.reply('pong!');
}