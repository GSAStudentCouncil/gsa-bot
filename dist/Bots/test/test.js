"use strict";

var G = require('test-manager').get(BotManager).getCurrentBot();
G.add('a');
G.add('b');
G.add('c');
G.on('message', function (chat, channel) {
  if (chat.text === '밥') channel.send('대충 밥이 어쩌고 저쩌고');
});
G.start();