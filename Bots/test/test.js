const BotManager = require('../../global_modules/bot-manager').get(BotManager);
const bot = BotManager.getCurrentBot();

const { Event } = require('../../global_modules/bot-manager/Event');
const { StructuredCommand, NaturalCommand } = require('../../global_modules/bot-manager/Command');

bot.addCommand(new NaturalCommand.Builder()
    .setName('test')
    .setDescription('test command')
    .setQuery({})
    .setUseDateParse(true, false, true)
    .setExecute((self, chat, channel, { datetime }) => {
        channel.send(`filteredText=${chat.filteredText}\ndatetime=${datetime.humanize()}`);
    })
    .build()
);

bot.start();