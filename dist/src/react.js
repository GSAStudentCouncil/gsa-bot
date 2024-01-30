'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var bot = BotManager.getCurrentBot();
var manager = require('DBManager').DBManager;

var _require = require('kakao-react'),
    ReactClient = _require.ReactClient,
    ReactionType = _require.ReactionType;

var client = ReactClient.create({
    accessToken: '3abf56a9e5ef90b38a61001720643dbf',
    deviceUUID: '55be5c17869d5085' // adb shell settings get secure android_id
});

var app = manager.getInstance({});

app.on("message", function (chat, channel) {
    var _chat$text$trim$split = chat.text.trim().split(' '),
        _chat$text$trim$split2 = _slicedToArray(_chat$text$trim$split, 2),
        command = _chat$text$trim$split2[0],
        type = _chat$text$trim$split2[1];

    if (command === "반응") {
        if (type === undefined || isNaN(Number(type)) || type < 0 || type > 6) {
            channel.send("반응 [타입]\nCANCEL: 0\nHEART: 1\nLIKE: 2\nCHECK: 3\nLAUGH: 4\nSURPRISE: 5\nSAD: 6");
            return;
        }

        client.react(channel.id, chat.id, type);
    }
});

app.start();

bot.addListener(Event.NOTIFICATION_POSTED, function (sbn, rm) {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, function () {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});

