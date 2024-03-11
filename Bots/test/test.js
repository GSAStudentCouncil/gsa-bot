const BotOperator = require('../../global_modules/BotOperator').from(BotManager);
const bot = BotOperator.getCurrentBot();	

const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../../global_modules/BotOperator/Command');
const { Event } = require('../../global_modules/BotOperator/Event');
const { DateTime } = require("../../global_modules/BotOperator/DateTime");

const _ = {
    error: msg => `❌ ${msg}`,
    catch: (err, channel) => {
        const error = `${_.error(err.name)}\n—————\n${err.message}\n${err.stack.trimEnd()}`;

        Log.e(error);
        if (channel != null && typeof channel.send === 'function')
            channel.send(error);
    }
};

const debugRoom = BotOperator.getChannelById('380077647627540');
const anyRoom = BotOperator.getChannelById('123456789');

bot.on('message', (chat, channel) => {
    try {
        if (chat.text.startsWith('eval '))
            channel.send(eval(chat.text.substring(5)));
        else if (chat.text === 'show') {
            channel.send(`debugRoom: ${debugRoom}\nanyRoom: ${anyRoom}`);
        }
    } catch(err) {
        _.catch(err, debugRoom);
    }
});

bot.start();