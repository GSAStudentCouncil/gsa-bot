const bot = BotManager.getCurrentBot();
const manager = require('DBManager').DBManager;
const cronjob = require('cronJob').CronJob;

let app = manager.getInstance({});

// cronjob.add("* * * * *", () => {
//     const channel = manager.getChannelById(393252027657624);    // 봇 테스트 방
//     channel.send("* * * * * cronjob");
// });

app.on("message", (chat, channel) => {
    let user = chat.user;

    if (chat.text === "/ㅎㅇ") {
        channel.send(user.name + "님 안녕하세요");
    }

    if (chat.text === "/id") {
        channel.send("채널 아이디는 " + channel.id + "입니다");
    }

    if (chat.isReply() && chat.text === "/원본답장") {
        let tempChat = chat.source;
        while (tempChat.isReply()) {
            tempChat = tempChat.source;
        }
        channel.send(tempChat.user.name + "님이 보낸 원본입니다 " + chat.text)
    }

    if(chat.isReply() && chat.text ==="/이전챗"){
        channel.send(  chat.source.getPrevChat().text);
    }

    else if(chat.isReply() && chat.text ==="/다음챗"){
        channel.send(  chat.source.getNextChat().text);
    }
    else if(chat.isVideo()){
        channel.send("동영상을 보냈습니다 용량 "+chat.video.s)
    }
    else if(chat.isAudio()){
        channel.send("음성파일을 보냈습니다 용량 "+chat.audio.s)
    }
    else if(chat.isMap()){
        channel.send("지도를 보냈습니다"+chat.map.lng)
    }
});

/**
 * 오픈채팅에 들어왔을 때 반응
 */
app.on("join", (chat, channel) => {
    channel.send(chat.joinUsers[0].nickName + "님 안녕하세요")
});
/**
 * 단체톡방에 초대했을 때 반응
 */
app.on("invite", (chat, channel) => {
    channel.send(chat.inviteUser.nickName + "님이" + chat.invitedUsers.map((e) => e.nickName).join(",") + "님을 초대했습니다")
});

/**
 * 톡방에서 나갈 때
 */

app.on("leave", (chat, channel) => {
    if(chat.isKicked()){
        channel.send(chat.leaveUser.nickName + "님이 강퇴당했어요");
    }
    else{
        channel.send(chat.leaveUser.nickName + "님 잘가요");
    }

});
/**
 * 톡방에서 강퇴 당할 때
 */

app.on("kick", (chat, channel) => {
    channel.send(chat.kickedBy.name + "님이 " + chat.kickedUser.nickName + "님을 강퇴했습니다")
})
/**
 * 누군가 메시지를 지웠을 때
 */
app.on("delete", (chat, channel) => {
    channel.send(chat.deletedChat.text + "메시지가 지워졌어요");
});
/**
 * 방장이나 부방장이 메시지를 가렸을 때
 */
app.on("hide", (chat, channel) => {
    channel.send(chat.user.name + "님이 " + "메시지를 가렸어요");
});

/**
 * 권한이 바뀔 때
 */
app.on("member_type_change", (chat, channel) => {
    if (chat.isDemote()) {
        channel.send(chat.demoteUser.nickName + "님이 부방장에서 내려왔어요")
    } else if (chat.isPromote()) {
        channel.send(chat.promoteUser.nickName + "님이 부방장이 되었어요")
    } else if (chat.isHandover()) {
        channel.send(chat.newHost.nickName + "님이 새 방장이 되었어요");
    }
});

/**
 * 오픈채팅방에서 프로필을 바꿀 때
 */
app.on("open_profile_change", (beforeUser, afterUser, channel)=> {
    channel.send("누군가 프로필이 바뀌었어요\n"+ beforeUser.name +"->"+afterUser.name)
})

app.start();

bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});