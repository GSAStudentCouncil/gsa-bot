"use strict";

var manager = require('DBManager').DBManager;
var _require = require('kakao-react'),
  ReactClient = _require.ReactClient,
  ReactionType = _require.ReactionType;
var Settings = android.provider.Settings;
var client = ReactClient.create({
  accessToken: '3abf56a9e5ef90b38a61001720643dbf',
  deviceUUID: Settings.Security.getString(App.getContext().getContentResolver(), Settings.Secure.ANDROID_ID)
});
var app = manager.getInstance({});
app.on("message", function (chat, channel) {
  client.react(channel.id, chat.id, ReactionType.LIKE);
});
app.start();