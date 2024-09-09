"use strict";

var scriptName = "edit_code";
var path = "sdcard/msgbot/bots/";
var a;
var b;
var c;
var d;
var array = [];
var on = false;
var k;
var q;
var e;
var f;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var hash = java.lang.String(imageDB.getProfileBase64()).hashCode();
  if (true) {
    if (hash == -2048786473) {
      a = java.io.File(path).list().sort();
      for (i = 1; i <= a.length; i++) {
        array[i] = i + "." + a[i - 1];
      }
      if (msg == "소스수정도움말") {
        replier.reply("소스 목록:소스목록\n소스확인 (소스이름):소스내용\n소스수정 (소스이름) (몇)줄:몇번째 줄 소스\n소스교체 /(소스이름)/(교체내용)/(몇)줄:몇번째 줄 소스를 교체내용으로 교체함");
      }
      if (msg == "소스 목록") {
        replier.reply("소스 목록입니다. \n" + "\u200B".repeat(500) + array.join("\n"));
      }
      if (msg.startsWith("소스확인 ")) {
        if (a.includes(msg.substr(5)) == true) {
          b = FileStream.read(path + msg.substr(5) + "/" + msg.substr(5) + ".js");
          c = b.split("\n");
          array = [];
          for (i = 1; i <= c.length; i++) {
            array[i] = i + "." + c[i - 1];
          }
          replier.reply(msg.substr(5) + "소스입니다.\n" + "\u200B".repeat(500) + array.join("\n"));
        } else {
          replier.reply(msg.substr(5) + "소스는 없습니다. 소스목록을 확인해주세요.");
        }
      }
      if (msg.startsWith("소스수정 ") && msg.endsWith("줄")) {
        k = msg.split(" ");
        q = k[k.length - 1];
        q = q.replace("줄", "");
        k.splice(k.length - 1, 1);
        k.splice(0, 1);
        d = k.join(" ");
        if (a.includes(d) == true) {
          b = FileStream.read(path + k + "/" + k + ".js");
          c = b.split("\n");
          if (c.length >= q) {
            replier.reply(d + "소스" + q + "번째 줄 소스입니다.\n" + c[q - 1]);
          } else {
            replier.reply(d + "소스" + q + "번째 줄 소스는 없습니다.");
          }
        } else {
          replier.reply(d + "소스는 없습니다. 소스목록을 확인해주세요.");
        }
      }
      if (msg.startsWith("소스교체 /") && msg.endsWith("줄")) {
        k = msg.split("/");
        q = k[k.length - 1];
        q = q.replace("줄", "");
        k.splice(k.length - 1, 1);
        k.splice(0, 1);
        f = k[0];
        k.splice(0, 1);
        d = k.join("/");
        if (a.includes(f) == true) {
          b = FileStream.read(path + f + "/" + f + ".js");
          c = b.split("\n");
          c[q - 1] = d;
          FileStream.write(path + f + "/" + f + ".js", c.join("\n"));
          if (c.length >= q) {
            replier.reply(f + "소스" + q + "번째 줄 소스를\n" + c[q - 1] + "\n으로 교체합니다.");
            b = FileStream.read(path + f + "/" + f + ".js");
            c = b.split("\n");
            array = [];
            for (i = 1; i <= c.length; i++) {
              array[i] = i + "." + c[i - 1];
            }
            replier.reply(f + "소스가 아래와 같이 변했습니다.\n" + "\u200B".repeat(500) + array.join("\n"));
            Api.compile(f);
          } else {
            replier.reply(f + "소스" + q + "번째 줄" + "소스는 없습니다.");
          }
        } else {
          replier.reply(f + "소스는 없습니다. 소스목록을 확인해주세요.");
        }
      }
    }
  }
}