"use strict";

var scriptName = "food";

/**
 * 카카오톡봇(메신저봇R)을 이용한 학교 홈페이지의 급식(http://gsa.gen.hs.kr)을 크롤링 해 오는 코드입니다. 따라서 Rhino JS를 사용합니다.
 * @license GPL (GNU General Public License)
 * @module Jsoup
 * © 2022. swdev_j all rights reserved.
 * 제작은 2020년도에 하고, 2022년 수정함.
 */

var Jsoup = org.jsoup.Jsoup;
importPackage(javax.net.ssl);
importPackage(java.lang);
importPackage(java.net);
importPackage(java.io);

/**
 * clawling 했을 때, HTML Special character code로 보이는 값들을 특수문자로 변환하는 함수
 * @param {String} query
 * @returns {String}
 */
function rep(query) {
  return query.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&acute;/g, "'").replace(/&#45;/g, "-").replace(/&#44;/g, ",").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#124;/g, "￦").replace(/&#nbsp;/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}

/**
 * 아이엠스쿨 크롤링 시, SSL 오류로 인해 이 함수를 통해 우회하기로 함.
 * @param {String} link URL
 * @returns HTML
 */
function getWebText(link) {
  try {
    if (android.os.Build.VERSION.SDK_INT > 9) {
      var policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
      android.os.StrictMode.setThreadPolicy(policy);
    }
    try {
      var sslContext = javax.net.ssl.SSLContext.getInstance("SSL");
      sslContext.init(null, [new JavaAdapter(javax.net.ssl.X509TrustManager, {
        getAcceptedIssuers: function getAcceptedIssuers() {
          return null;
        },
        checkClientTrusted: function checkClientTrusted() {
          return;
        },
        checkServerTrusted: function checkServerTrusted() {
          return;
        }
      })], new java.security.SecureRandom());
      HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
      HttpsURLConnection.setDefaultHostnameVerifier(new JavaAdapter(javax.net.ssl.HostnameVerifier, {
        verify: function verify(hostname, session) {
          return true;
        }
      }));
    } catch (e) {
      throw new Error(e);
    }
    var url = new java.net.URL(link),
      connect = url.openConnection();
    if (connect != null) {
      connect.setConnectTimeout(5000);
      connect.setUseCaches(false);
      var inputStreamReader = new java.io.InputStreamReader(connect.getInputStream()),
        bufferedReader = new java.io.BufferedReader(inputStreamReader),
        text = bufferedReader.readLine(),
        line = "";
      while ((line = bufferedReader.readLine()) != null) {
        text += "\n" + line;
      }
      inputStreamReader.close();
      bufferedReader.close();
      connect.disconnect();
    }
    return text.toString();
  } catch (e) {
    throw new Error(e);
  }
}
;

/**
 * iamschool clawling code
 * @param {int} Y year
 * @param {array} command ex) ['M월 D일 [아침]']
 * @returns {String} Y년 M월 D일\n\n{급식에 관한 내용}
 */
function iamschool_menu(Y, command) {
  try {
    var req = JSON.parse(getWebText('https://school.iamservice.net/api/article/organization/5698?next_token=0', 1))['articles'];
    // let req = JSON.parse(Jsoup.connect('https://school.iamservice.net/api/article/organization/5698?next_token=0').ignoreContentType(true).execute().body())['articles'];
    var res = req.filter(function (e) {
      return command.includes(e['title']);
    }).reverse();
    var _result = command.slice();
    var type = true;
    var _loop = function _loop(i) {
      var val = res.filter(function (e) {
        return e['title'] == command[i];
      });
      if (val.length) {
        _result[i] = Y + '년 ' + _result[i] + '\n' + val[0]['content'].replace(/\d\d\./g, '').replace(/\d\./g, '');
      } else {
        _result[i] = Y + '년 ' + _result[i] + '\n급식이 없습니다.';
        type = false;
      }
    };
    for (var i in command) {
      _loop(i);
    }
    return [_result.join('\n\n'), type];
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * school home page clawling code
 * @param {int} Y year
 * @param {int} M month
 * @param {int} D day
 * @returns {String} Y년 M월 D일\n\n{급식에 관한 내용}
 */
function school_menu(Y, M, D, type, time) {
  try {
    var a = Jsoup.connect("http://gsa.gen.hs.kr/xboard/board.php?mode=list&tbnum=55&sCat=0&page=1&keyset=&searchword=&sYear=" + Y + "&sMonth=" + M).get().select(".food_list_box").eq(D - 1);
    var b;
    if (type == 'all') {
      b = ["", "", ""];
      b[0] = a.select("span.content").eq(1).html().replace(/<br> /g, "\n").replace(/\d\d\./g, '').replace(/\d\./g, '').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
      b[1] = a.select("span.content").eq(0).html().replace(/<br> /g, "\n").replace(/\d\d\./g, '').replace(/\d\./g, '').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
      b[2] = a.select("span.content").eq(2).html().replace(/<br> /g, "\n").replace(/\d\d\./g, '').replace(/\d\./g, '').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
    } else {
      b = [a.select("span.content").eq(type).html().replace(/<br> /g, "\n").replace(/\d\d\./g, '').replace(/\d\./g, '').replace(/\(\)/g, '').replace(/\n\n/g, '\n').trim()];
    }
    c = a.select(".day_num");
    if (b.join("") != "") {
      if (type == 'all') return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + "\n\n" + rep(b.join("\n\n"));else return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + time + "\n\n" + rep(b.join("\n\n"));
    } else if (type == 'all') return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + "\n\n" + "급식이 없습니다";else return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + time + "\n\n" + "급식이 없습니다";
  } catch (e) {
    return "서버와의 통신 중 오류가 발생하였습니다";
  }
}
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  // 단톡방 이름은 무조건 광곽 nn기 (ex. 광곽 37기) 이어야 함. 아니면 봇 카톡의 방 이름이라도 이렇게 설정.
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
      try {
        result = iamschool_menu(Y, command);
        if (result[1]) replier.reply(result[0]);else replier.reply(school_menu(Y, M, D, 'all', ''));
      } catch (e) {
        replier.reply(school_menu(Y, M, D, 'all', ''));
      }
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
      try {
        result = iamschool_menu(_Y, _command);
        if (result[1]) replier.reply(result[0]);else replier.reply(school_menu(_Y, _M, _D, 'all', ''));
      } catch (e) {
        replier.reply(school_menu(_Y, _M, _D, 'all', ''));
      }
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
      try {
        result = iamschool_menu(_Y2, _command2);
        if (result[1]) replier.reply(result[0]);else replier.reply(school_menu(_Y2, _M2, _D2, 'all', ''));
      } catch (e) {
        replier.reply(school_menu(_Y2, _M2, _D2, 'all', ''));
      }
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
      try {
        result = iamschool_menu(_Y3, _command3);
        if (result[1]) replier.reply(result[0]);else replier.reply(school_menu(_Y3, _M3, _D3, 'all', ''));
      } catch (e) {
        replier.reply(school_menu(_Y3, _M3, _D3, 'all', ''));
      }
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
      try {
        result = iamschool_menu(_Y4, _command4);
        if (result[1]) replier.reply(result[0]);else replier.reply(school_menu(_Y4, _M4, _D4, 'all', ''));
      } catch (e) {
        replier.reply(school_menu(_Y4, _M4, _D4, 'all', ''));
      }
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
      try {
        result = iamschool_menu(_Y5, _command5);
        if (result[1]) replier.reply(result[0]);else {
          var time_type;
          if (time == '아침') time_type = 1;else if (time == '점심') time_type = 0;else if (time == '저녁') time_type = 2;
          replier.reply(school_menu(_Y5, _M5, _D5, time_type, ' [' + time + ']'));
        }
      } catch (e) {
        var _time_type;
        if (time == '아침') _time_type = 1;else if (time == '점심') _time_type = 0;else if (time == '저녁') _time_type = 2;
        replier.reply(school_menu(_Y5, _M5, _D5, _time_type, ' [' + time + ']'));
      }
    }
  }
}