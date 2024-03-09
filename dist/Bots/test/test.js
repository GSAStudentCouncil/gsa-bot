"use strict";

var BotManager = require('bot-manager').get(BotManager);
var bot = BotManager.getCurrentBot();
var _require = require('bot-manager/Event'),
  Event = _require.Event;
var _require2 = require('bot-manager/Command'),
  StructuredCommand = _require2.StructuredCommand,
  NaturalCommand = _require2.NaturalCommand;
bot.addCommand(new NaturalCommand.Builder().setName('test').setDescription('test command').setQuery({}).setUseDateParse(true, false, true).setExecute(function (self, chat, channel, _ref) {
  var datetime = _ref.datetime;
  channel.send("filteredText=".concat(chat.filteredText, "\ndatetime=").concat(datetime.humanize()));
}).build());
bot.start();