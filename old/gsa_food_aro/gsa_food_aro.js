const scriptName = "gsa_food_aro";

/**
 * 여기에는 이 코드의 간략한 설명 작성.
 * @license 라이센스 작성
 * @module Jsoup
 * copyright 작성
 * 제작 년도, 최종 수정 년도 작성
 */

const Jsoup=org.jsoup.Jsoup;
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
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
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n").replace("&amp;","&");
            let b =JSON.parse(a);
            let textsend=command[0]+"\n"+b[0]+"\n\n"+command[1]+"\n"+b[1]+"\n\n"+command[2]+"\n"+b[2];
            replier.reply(textsend);
        } 
        else if(msg.endsWith('낼급') || msg.endsWith('!ㄴㄱ')){
            let plus;
            plus=1;
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n");
            let b =JSON.parse(a);
            let textsend=command[0]+"\n"+b[0]+"\n\n"+command[1]+"\n"+b[1]+"\n\n"+command[2]+"\n"+b[2];
            replier.reply(textsend);
        } 
        else if(msg.endsWith('모급') || msg.endsWith('!ㅁㄱ')){
            let plus;
            plus=2;
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n");
            let b =JSON.parse(a);
            let textsend=command[0]+"\n"+b[0]+"\n\n"+command[1]+"\n"+b[1]+"\n\n"+command[2]+"\n"+b[2];
            replier.reply(textsend);
        } 
        else if(msg.endsWith('글급') || msg.endsWith('!ㄱㄱ')){
            let plus;
            plus=3;
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n");
            let b =JSON.parse(a);
            let textsend=command[0]+"\n"+b[0]+"\n\n"+command[1]+"\n"+b[1]+"\n\n"+command[2]+"\n"+b[2];
            replier.reply(textsend);
        } 
        else if(msg.endsWith('오급') || msg.endsWith('ㅇㄱ')){
            let plus;
            plus=0;
            let date = new Date();
            date.setDate(date.getDate()+plus);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1;
            let D = date.getDate();
            let value = M + '월 ' + D + '일 '
            let command = [value + '[아침]', value+'[점심]', value+'[저녁]'];
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n");
            let b =JSON.parse(a);
            let textsend=command[0]+"\n"+b[0]+"\n\n"+command[1]+"\n"+b[1]+"\n\n"+command[2]+"\n"+b[2];
            replier.reply(textsend);
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
            
            let a = Jsoup.connect("http://10.122.2.183:5000/foodapi_kakaor").data("date",plus).ignoreContentType(true).get().select("body").html().replace(/<br>/g,"").replace(/\d\d\./g,"").replace(/\d\./g,"").replace(/\(\d\d\)/g,"").replace(/ \(\d\)/g,"").replace(/\n/g,"\\n");
            let b =JSON.parse(a);
            
            let time_type;
            if(time == '아침') time_type = 0;
            else if(time == '점심') time_type = 1;
            else if(time == '저녁') time_type = 2;

            let textsend=command[0]+"\n"+b[time_type];
            replier.reply(textsend);

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
