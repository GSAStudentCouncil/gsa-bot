"use strict";

var scriptName = "gsa_notice";

/**
 * 카카오톡봇(메신저봇R)을 이용한 학생회 알림 코드입니다. 따라서 Rhino JS를 사용합니다.
 * @license GPL (GNU General Public License)
 * © 2020. swdev_j all rights reserved.
 * 제작 2020년도.
 */

var sendroom = ["39기 학생회 임원"];
// 메시지 보내는 단톡방 - 매년 직접 설정해주던지 하나로 정하던지 바랍니다.

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var date = new Date();
  var Y = date.getFullYear();
  var th = Y - 2000 + 15;
  // 메시지 받는 단톡방 - 광곽 n기 형식 준수.
  var Room = ['광곽 ' + th + '기', '광곽 ' + (th + 1) + '기', '광곽 ' + (th + 2) + '기'];
  if (sendroom.includes(room)) {
    if (msg == "학생회알림도움말") {
      replier.reply("# [ ] 괄호는 명령어에 포함되지 않습니다!\n\n아래 명령어에 들어가는 부서명에는 정보부, 정책부, 환경부, 통계부, 체육부, 문예부, 생체부, 홍보부, 총무부만 들어갈 수 있습니다.\n오타에 주의해 주세요.\n\n\n#전체알림 : 전체기수 알림\n!전체알림[부서명] [내용]\n -> [부서명]부서에서 알려드립니다. [내용]\n!전체알림 [내용]\n -> 학생회에서 알려드립니다. [내용]\n!전체알림[회장/부회장]\n -> 회장/부회장님께서 알립니다. [내용]\n\n#일부알림 : 일부기수 알림 ([기수]방에만 전송)\n!일부알림[부서명] | [기수] | [내용]\n -> [부서명]부서에서 알려드립니다. [내용]\n!일부알림 | [기수] | [내용]\n -> 학생회에서 알려드립니다. [내용]\n!일부알림[회장/부회장] | [기수] | [내용]\n -> 회장/부회장님께서 알립니다. [내용]\n\n# !학생회알림 및 !알림 명령어는 삭제되었습니다.");
    }
    if (msg.startsWith("!알림")) {
      replier.reply("비활성화 된 명령어입니다. 학생회알림도움말을 확인해주세요.");
    }
    if (msg.startsWith("!학생회알림")) {
      replier.reply("비활성화된 명령어입니다. 학생회알림도움말을 확인해주세요.");
    }
    if (msg.startsWith("!일부알림")) {
      msg = msg.slice(5);
      r = msg.split('|');
      msg = r[0] + ' ' + r[r.length - 1];
      a = msg.slice(0, 3);
      if (a.startsWith("회장 ")) {
        a = "회장";
        b = msg.slice(3);
      } else if (a.startsWith(" ")) {
        a = "학생회";
        b = msg.slice(1);
      } else if (a.startsWith("봇 ")) {
        a = "학생회 봇";
        b = msg.slice(2);
      } else if (a.startsWith("등록 ") || a.startsWith("답변 ")) {
        a = a.slice(0, 2);
        b = msg.slice(3);
      } else if (a.startsWith("기준달성 ")) {
        a = "기준달성";
        b = msg.slice(5);
      } else {
        b = msg.slice(4);
      }
      if (a == "학생회" || a == "생체부" || a == "환경부" || a == "통계부" || a == "문예부" || a == "체육부" || a == "홍보부" || a == "정책부" || a == "정보부" || a == "총무부") {
        for (var _i = 1; _i < r.length - 1; _i++) {
          var check = Api.replyRoom("광곽 " + r[_i] + "기", "[" + a + "에서 알립니다.]" + "\n" + b);
          if (check) {
            replier.reply(r[_i] + "기 전송하였습니다.");
          } else {
            replier.reply(r[_i] + "기 전송 실패");
          }
        }
      } else if (a == "회장" || a == "부회장") {
        for (var _i2 = 1; _i2 < r.length - 1; _i2++) {
          Api.replyRoom("광곽 " + r[_i2] + "기", "[" + a + "님께서 알립니다.]" + "\n" + b);
          replier.reply(r[_i2] + "기 전송하였습니다.");
        }
      } else if (a == "학생회 봇") {
        for (var _i3 = 1; _i3 < r.length - 1; _i3++) {
          var _check = Api.replyRoom("광곽 " + r[_i3] + "기", "[" + a + "알림입니다.]" + "\n" + b);
          if (_check) {
            replier.reply(r[_i3] + "기 전송하였습니다.");
          } else {
            replier.reply(r[_i3] + "기 전송 실패");
          }
        }
      } else if (a == "등록" || a == "기준달성" || a == "답변") {
        for (var _i4 = 1; _i4 < r.length - 1; _i4++) {
          var _check2 = Api.replyRoom("광곽 " + r[_i4] + "기", "[청원 " + a + " 알림입니다.]" + "\u200B".repeat(500) + "\n" + b);
          if (_check2) {
            replier.reply(r[_i4] + "기 전송하였습니다.");
          } else {
            replier.reply(r[_i4] + "기 전송 실패");
          }
        }
      }
    } else if (msg.startsWith("!전체알림")) {
      msg = msg.slice(5);
      a = msg.slice(0, 3);
      if (a.startsWith("회장 ")) {
        a = "회장";
        b = msg.slice(3);
      } else if (a.startsWith(" ")) {
        a = "학생회";
        b = msg.slice(1);
      } else if (a.startsWith("봇 ")) {
        a = "학생회 봇";
        b = msg.slice(2);
      } else if (a.startsWith("등록 ") || a.startsWith("답변 ")) {
        a = a.slice(0, 2);
        b = msg.slice(3);
      } else if (a.startsWith("기준달성 ")) {
        a = "기준달성";
        b = msg.slice(5);
      } else {
        b = msg.slice(4);
      }
      if (a == "학생회" || a == "생체부" || a == "환경부" || a == "통계부" || a == "문예부" || a == "체육부" || a == "홍보부" || a == "정책부" || a == "정보부" || a == "총무부") {
        for (i in Room) {
          var _check3 = Api.replyRoom(Room[i], "[" + a + "에서 알립니다.]" + "\n" + b);
          if (_check3) {
            replier.reply(Room[i] + " 전송하였습니다.");
          } else {
            replier.reply(Room[i] + " 전송 실패");
          }
        }
      } else if (a == "회장" || a == "부회장") {
        for (i in Room) {
          var _check4 = Api.replyRoom(Room[i], "[" + a + "님께서 알립니다.]" + "\n" + b);
          if (_check4) {
            replier.reply(Room[i] + " 전송하였습니다.");
          } else {
            replier.reply(Room[i] + " 전송 실패");
          }
        }
      } else if (a == "학생회 봇") {
        for (i in Room) {
          var _check5 = Api.replyRoom(Room[i], "[" + a + "알림입니다.]" + "\n" + b);
          if (_check5) {
            replier.reply(Room[i] + " 전송하였습니다.");
          } else {
            replier.reply(Room[i] + " 전송 실패");
          }
        }
      } else if (a == "등록" || a == "기준달성" || a == "답변") {
        for (i in Room) {
          var _check6 = Api.replyRoom(Room[i], "[청원 " + a + " 알림입니다.]" + "\u200B".repeat(500) + "\n" + b);
          if (_check6) {
            replier.reply(Room[i] + " 전송하였습니다.");
          } else {
            replier.reply(Room[i] + " 전송 실패");
          }
        }
      }
    }
  }
}