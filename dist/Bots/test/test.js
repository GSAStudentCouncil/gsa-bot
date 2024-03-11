"use strict";

var BotOperator = require('BotOperator').from(BotManager);
var bot = BotOperator.getCurrentBot();
var _require = require('BotOperator/Command'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand,
  CommandRegistry = _require.CommandRegistry;
var _require2 = require('BotOperator/Event'),
  Event = _require2.Event;
var _require3 = require("BotOperator/DateTime"),
  DateTime = _require3.DateTime;
var _ = {
  error: function error(msg) {
    return "\u274C ".concat(msg);
  },
  "catch": function _catch(err, channel) {
    var error = "".concat(_.error(err.name), "\n\u2014\u2014\u2014\u2014\u2014\n").concat(err.message, "\n").concat(err.stack.trimEnd());
    Log.e(error);
    if (channel != null && typeof channel.send === 'function') channel.send(error);
  }
};
var debugRoom = BotOperator.getChannelById('380077647627540');
var anyRoom = BotOperator.getChannelById('123456789');
bot.on('message', function (chat, channel) {
  try {
    if (chat.text.startsWith('eval ')) channel.send(eval(chat.text.substring(5)));else if (chat.text === 'show') {
      channel.send("debugRoom: ".concat(debugRoom, "\nanyRoom: ").concat(anyRoom));
    }
  } catch (err) {
    _["catch"](err, debugRoom);
  }
});
bot.start();