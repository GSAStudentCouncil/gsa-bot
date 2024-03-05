"use strict";

var scriptName = "gsa_food_aro";

/**
 * 여기에는 이 코드의 간략한 설명 작성.
 * @license 라이센스 작성
 * @module Jsoup
 * copyright 작성
 * 제작 년도, 최종 수정 년도 작성
 */

var Jsoup = org.jsoup.Jsoup;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (room.search(/광곽 \d\d기/) == 0 && room.length == 6 || isGroupChat == false) {
    if (msg.endsWith('급식')) {
      var type = msg.replace(/ /g, '').slice(0, -2);
      var plus;
      if (type == '오늘') plus = 0;else if (type == '내일') plus = 1;else if (type == '모레' || type == '모래') plus = 2;else if (type == '글피') plus = type.length + 1;else return;
      var date = new Date();
      date.setDate(date.getDate() + plus);
      var Y = date.getFullYear();
      var M = date.getMonth() + 1;
      var D = date.getDate();
      var value = M + '월 ' + D + '일 ';
      var command = [value + '[아침]', value + '[점심]', value + '[저녁]'];
      var a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n").replace("&amp;", "&");
      var b = JSON.parse(a);
      var textsend = command[0] + "\n" + b[0] + "\n\n" + command[1] + "\n" + b[1] + "\n\n" + command[2] + "\n" + b[2];
      replier.reply(textsend);
    } else if (msg.endsWith('낼급') || msg.endsWith('!ㄴㄱ')) {
      var _plus;
      _plus = 1;
      var _date = new Date();
      _date.setDate(_date.getDate() + _plus);
      var _Y = _date.getFullYear();
      var _M = _date.getMonth() + 1;
      var _D = _date.getDate();
      var _value = _M + '월 ' + _D + '일 ';
      var _command = [_value + '[아침]', _value + '[점심]', _value + '[저녁]'];
      var _a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", _plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n");
      var _b = JSON.parse(_a);
      var _textsend = _command[0] + "\n" + _b[0] + "\n\n" + _command[1] + "\n" + _b[1] + "\n\n" + _command[2] + "\n" + _b[2];
      replier.reply(_textsend);
    } else if (msg.endsWith('모급') || msg.endsWith('!ㅁㄱ')) {
      var _plus2;
      _plus2 = 2;
      var _date2 = new Date();
      _date2.setDate(_date2.getDate() + _plus2);
      var _Y2 = _date2.getFullYear();
      var _M2 = _date2.getMonth() + 1;
      var _D2 = _date2.getDate();
      var _value2 = _M2 + '월 ' + _D2 + '일 ';
      var _command2 = [_value2 + '[아침]', _value2 + '[점심]', _value2 + '[저녁]'];
      var _a2 = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", _plus2).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n");
      var _b2 = JSON.parse(_a2);
      var _textsend2 = _command2[0] + "\n" + _b2[0] + "\n\n" + _command2[1] + "\n" + _b2[1] + "\n\n" + _command2[2] + "\n" + _b2[2];
      replier.reply(_textsend2);
    } else if (msg.endsWith('글급') || msg.endsWith('!ㄱㄱ')) {
      var _plus3;
      _plus3 = 3;
      var _date3 = new Date();
      _date3.setDate(_date3.getDate() + _plus3);
      var _Y3 = _date3.getFullYear();
      var _M3 = _date3.getMonth() + 1;
      var _D3 = _date3.getDate();
      var _value3 = _M3 + '월 ' + _D3 + '일 ';
      var _command3 = [_value3 + '[아침]', _value3 + '[점심]', _value3 + '[저녁]'];
      var _a3 = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", _plus3).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n");
      var _b3 = JSON.parse(_a3);
      var _textsend3 = _command3[0] + "\n" + _b3[0] + "\n\n" + _command3[1] + "\n" + _b3[1] + "\n\n" + _command3[2] + "\n" + _b3[2];
      replier.reply(_textsend3);
    } else if (msg.endsWith('오급') || msg.endsWith('ㅇㄱ')) {
      var _plus4;
      _plus4 = 0;
      var _date4 = new Date();
      _date4.setDate(_date4.getDate() + _plus4);
      var _Y4 = _date4.getFullYear();
      var _M4 = _date4.getMonth() + 1;
      var _D4 = _date4.getDate();
      var _value4 = _M4 + '월 ' + _D4 + '일 ';
      var _command4 = [_value4 + '[아침]', _value4 + '[점심]', _value4 + '[저녁]'];
      var _a4 = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", _plus4).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n");
      var _b4 = JSON.parse(_a4);
      var _textsend4 = _command4[0] + "\n" + _b4[0] + "\n\n" + _command4[1] + "\n" + _b4[1] + "\n\n" + _command4[2] + "\n" + _b4[2];
      replier.reply(_textsend4);
    } else if (['오늘아침', '오늘점심', '오늘저녁', '오늘 아침', '오늘 점심', '오늘 저녁', '내일아침', '내일점심', '내일저녁', '내일 아침', '내일 점심', '내일 저녁'].includes(msg)) {
      msg = msg.replace(/ /g, '');
      var _type = msg.slice(0, -2);
      var _plus5;
      if (_type == '오늘') _plus5 = 0;else if (_type == '내일') _plus5 = 1;
      var _date5 = new Date();
      _date5.setDate(_date5.getDate() + _plus5);
      var time = msg.slice(-2);
      var _Y5 = _date5.getFullYear();
      var _M5 = _date5.getMonth() + 1;
      var _D5 = _date5.getDate();
      var _command5 = [_M5 + '월 ' + _D5 + '일 [' + time + ']'];
      var _a5 = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date", _plus5).ignoreContentType(true).get().select("body").html().replace(/<br>/g, "").replace(/\d\d\./g, "").replace(/\d\./g, "").replace(/\(\d\d\)/g, "").replace(/ \(\d\)/g, "").replace(/\n/g, "\\n");
      var _b5 = JSON.parse(_a5);
      var time_type;
      if (time == '아침') time_type = 0;else if (time == '점심') time_type = 1;else if (time == '저녁') time_type = 2;
      var _textsend5 = _command5[0] + "\n" + _b5[time_type];
      replier.reply(_textsend5);

      // try {
      //     result = iamschool_menu(Y, command);
      //     if(result[1]) replier.reply(result[0]);
      //     else {
      //         let time_type;
      //         if(time == '아침') time_type = 1;
      //         else if(time == '점심') time_type = 0;
      //         else if(time == '저녁') time_type = 2;
      //         replier.reply(school_menu(Y, M, D, time_type, ' [' + time + ']'));
      //     }
      // } catch(e) {
      //     let time_type;
      //     if(time == '아침') time_type = 1;
      //     else if(time == '점심') time_type = 0;
      //     else if(time == '저녁') time_type = 2;
      //     replier.reply(school_menu(Y, M, D, time_type, ' [' + time + ']'));
      // }
    }
  }
}