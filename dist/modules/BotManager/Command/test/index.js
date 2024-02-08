"use strict";

var _require = require('../index'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var cmd = new StructuredCommand.Builder().setName('test').setDescription('Test command').setUsage('test <status:string>').setExamples('test good', 'test bad').setExecute(function (chat, channel, self, args) {
  console.log(args);
}).build();
cmd.register();
function onMessage(chat, channel) {
  var _CommandRegistry$get = CommandRegistry.get(chat, channel),
    cmd = _CommandRegistry$get.cmd,
    args = _CommandRegistry$get.args;
  if (cmd) {
    cmd.execute(chat, channel, args);
  }
}
onMessage({
  text: 'test good'
}, {
  name: 'test room',
  id: 982981398
});

