const BotOperator = require('../../global_modules/BotOperator').from(BotManager);
const bot = BotOperator.getCurrentBot();

const { Event } = require('../../global_modules/BotOperator/Event');

bot.on(Event.MESSAGE, (chat, channel) => {
    if (chat.text === '/id') {
        channel.send(`channel.id: ${channel.id}`);
        channel.send(`chat.user.id:\n${channel.members.map(member => ` - ${member.name}: ${member.id}`).join('\n')}`);
    }
});

bot.start();