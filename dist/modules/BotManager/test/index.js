"use strict";

var BotManager = require('../../BotManager').get(BotManager);
var bot = BotManager.getCurrentBot({});
var _require = require('BotManager/Command'),
  StructuredCommand = _require.StructuredCommand,
  NaturalCommand = _require.NaturalCommand;
var Event = require('BotManager/Event').Event;
var 공지방 = BotManager.getChannelById('394288262769869');
bot.addCommand(new StructuredCommand.Builder().setName('학생회 알림').setDescription('알림을 보냅니다.').setUsage('<부서:string length=3> 알림 <기수:int[]?>').setExamples('학생회 알림 1 2 3', '정보부 알림 1').setExecute(function (chat, channel, self, args) {
  공지방.send('execute: ' + JSON.stringify(args, null, 4));
}).setExecuteLazy(function (chat, prevChat, channel, prevChannel, self, args) {
  공지방.send('executeLazy: ' + JSON.stringify(args, null, 4));
}).setCronjobs({
  '오늘': "20 19 * * *",
  '점심': "21 19 * * *",
  '저녁': "22 19 * * *"
}).setExecuteCron(function (tag) {
  공지방.send('executeCron: ' + tag);
}).build());
bot.on(Event.COMMAND, function (chat, channel, command, args) {
  공지방.send('Event.COMMAND: ' + command.name);
});
bot.on(Event.MESSAGE, function (chat, channel) {
  공지방.send('Event.MESSAGE: ' + chat.text);
});
bot.start();

