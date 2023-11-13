const scriptName = "food";

/**
 * 카카오톡봇(메신저봇R)을 이용한 학교 홈페이지의 급식(http://gsa.gen.hs.kr)을 크롤링 해 오는 코드입니다. 따라서 Rhino JS를 사용합니다.
 * @license GPL (GNU General Public License)
 * @module Jsoup
 * © 2022. swdev_j all rights reserved.
 * 제작은 2020년도에 하고, 2022년 수정함.
 */

const Jsoup = org.jsoup.Jsoup;
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
            let sslContext = javax.net.ssl.SSLContext.getInstance("SSL");
            sslContext.init(null, [new JavaAdapter(javax.net.ssl.X509TrustManager, {
                getAcceptedIssuers: () => {
                    return null;
                },
                checkClientTrusted: () => {
                    return;
                },
                checkServerTrusted: () => {
                    return;
                },
            })], new java.security.SecureRandom());

            HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier(new JavaAdapter(javax.net.ssl.HostnameVerifier, {
                verify: (hostname, session) => {
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
};

/**
 * iamschool clawling code
 * @param {int} Y year
 * @param {array} command ex) ['M월 D일 [아침]']
 * @returns {String} Y년 M월 D일\n\n{급식에 관한 내용}
 */
function iamschool_menu(Y, command) {
    try {
        let req = JSON.parse(getWebText('https://school.iamservice.net/api/article/organization/5698?next_token=0', 1))['articles'];
        // let req = JSON.parse(Jsoup.connect('https://school.iamservice.net/api/article/organization/5698?next_token=0').ignoreContentType(true).execute().body())['articles'];
        let res = req.filter(e=> command.includes(e['title'])).reverse();
        
        let result = command.slice();
        let type = true;
    
        for(let i in command) {
            let val = res.filter(e=> e['title'] == command[i]);
            if(val.length) {
                result[i] = Y + '년 ' + result[i] + '\n' + val[0]['content'].replace(/\d\d\./g,'').replace(/\d\./g,'');
            } else {
                result[i] = Y + '년 ' + result[i] + '\n급식이 없습니다.';
                type = false;
            }
        }
        return [result.join('\n\n'), type];
    } catch(e) {
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
        let a = Jsoup.connect("http://gsa.gen.hs.kr/xboard/board.php?mode=list&tbnum=55&sCat=0&page=1&keyset=&searchword=&sYear=" + Y + "&sMonth=" + M).get().select(".food_list_box").eq(D - 1);
        let b;
        if(type == 'all') {
            b = ["","",""];
            b[0] = a.select("span.content").eq(1).html().replace(/<br> /g,"\n").replace(/\d\d\./g,'').replace(/\d\./g,'').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
            b[1] = a.select("span.content").eq(0).html().replace(/<br> /g,"\n").replace(/\d\d\./g,'').replace(/\d\./g,'').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
            b[2] = a.select("span.content").eq(2).html().replace(/<br> /g,"\n").replace(/\d\d\./g,'').replace(/\d\./g,'').replace(/\(\)/g, '').replace(/\(\n\)/g, '\n').replace(/\n\n/g, '\n').trim();
        } else {
            b = [a.select("span.content").eq(type).html().replace(/<br> /g,"\n").replace(/\d\d\./g,'').replace(/\d\./g,'').replace(/\(\)/g, '').replace(/\n\n/g, '\n').trim()];
        }
        
        c = a.select(".day_num");
        if (b.join("") != "") 
            if(type == 'all')
                return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + "\n\n" + rep(b.join("\n\n"));
            else
                return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + time + "\n\n" + rep(b.join("\n\n"));
        else 
            if(type == 'all')
                return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + "\n\n" + "급식이 없습니다";
            else
                return Y + "년 " + M + "월 " + D + "일 " + c.select("span").text() + time + "\n\n" + "급식이 없습니다";
    } catch(e) {
        return "서버와의 통신 중 오류가 발생하였습니다";
    }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    // 단톡방 이름은 무조건 광곽 nn기 (ex. 광곽 37기) 이어야 함. 아니면 봇 카톡의 방 이름이라도 이렇게 설정.
    if (((room.search(/광곽 \d\d기/)==0 && room.length == 6) || isGroupChat == false)) {
        if(msg.endsWith('급식')) {
            let type = msg.replace(/ /g, '').slice(0,-2);
            let plus;
            if(type == '오늘') plus = 0;
            else if(type == '내일') plus = 1;
            else if(type == '모레' || type == '모래') plus = 2;
            else if(type == '글피') plus = type.length + 1;
            else return;
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else replier.reply(school_menu(Y, M, D, 'all', ''));
            } catch(e) {
                replier.reply(school_menu(Y, M, D, 'all', ''));
            }
        } else if(msg.endsWith('낼급') || msg.endsWith('!ㄴㄱ')){
            let plus;
            plus=1
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else replier.reply(school_menu(Y, M, D, 'all', ''));
            } catch(e) {
                replier.reply(school_menu(Y, M, D, 'all', ''));
            }
        } 
        else if(msg.endsWith('모급') || msg.endsWith('!ㅁㄱ')){
            let plus;
            plus=2
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else replier.reply(school_menu(Y, M, D, 'all', ''));
            } catch(e) {
                replier.reply(school_menu(Y, M, D, 'all', ''));
            }
        } 
        else if(msg.endsWith('글급') || msg.endsWith('!ㄱㄱ')){
            let plus;
            plus=3
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else replier.reply(school_menu(Y, M, D, 'all', ''));
            } catch(e) {
                replier.reply(school_menu(Y, M, D, 'all', ''));
            }
        } 
        else if(msg.endsWith('오급') || msg.endsWith('ㅇㄱ')){
            let plus;
            plus=0
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else replier.reply(school_menu(Y, M, D, 'all', ''));
            } catch(e) {
                replier.reply(school_menu(Y, M, D, 'all', ''));
            }
        } 
        else if(['오늘아침', '오늘점심', '오늘저녁', '오늘 아침', '오늘 점심', '오늘 저녁', '내일아침', '내일점심', '내일저녁', '내일 아침', '내일 점심', '내일 저녁'].includes(msg)) {
            msg = msg.replace(/ /g, '');
            let type = msg.slice(0,-2);
            let plus;
            if(type == '오늘') plus = 0;
            else if(type == '내일') plus = 1;
            let date = new Date();
            date.setDate(date.getDate()+plus);

            let time = msg.slice(-2);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let command = [M + '월 ' + D + '일 [' + time + ']'];
            try {
                result = iamschool_menu(Y, command);
                if(result[1]) replier.reply(result[0]);
                else {
                    let time_type;
                    if(time == '아침') time_type = 1;
                    else if(time == '점심') time_type = 0;
                    else if(time == '저녁') time_type = 2;
                    replier.reply(school_menu(Y, M, D, time_type, ' [' + time + ']'));
                }
            } catch(e) {
                let time_type;
                if(time == '아침') time_type = 1;
                else if(time == '점심') time_type = 0;
                else if(time == '저녁') time_type = 2;
                replier.reply(school_menu(Y, M, D, time_type, ' [' + time + ']'));
            }
        }
    }
}
