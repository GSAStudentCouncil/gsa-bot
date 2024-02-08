const { StructuredCommand, NaturalCommand, CommandRegistry } = require('../index');

let cmd = new StructuredCommand.Builder()
    .setName('test')
    .setDescription('Test command')
    .setUsage('test <status:string>')
    .setExamples('test good', 'test bad')
    .setExecute((self, chat, channel, args) => {
        console.log(args);
    })
    .build();

cmd.register();

function onMessage(chat, channel) {
    const { cmd, args } = CommandRegistry.get(chat, channel);

    if (cmd) {
        cmd.execute(chat, channel, args);
    }
}
onMessage({ text: 'test good' }, { name: 'test room', id: 982981398 });