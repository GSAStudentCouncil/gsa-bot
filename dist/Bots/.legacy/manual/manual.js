"use strict";

var scriptName = "manual";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var message = ['**모든 명령어는 규정된 톡방', '(광곽 nn기/학생회/허락받은 톡방)에서만 사용 가능합니다.', '오늘/내일/모레/글피급식: 해당 급식 안내', '오늘아침/점심/저녁: 해당 급식 안내', '내일아침/점심/저녁: 해당 급식 안내', '                --학생회 전용--                   ', '학생회 알림: 학생회알림도움말 명령어를 사용하세요.'];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg == '/도움말') {
    replier.reply('도움말' + "\u200B".repeat(500) + '\n' + message.join('\n'));
  }
}