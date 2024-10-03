const scriptName = "passwdasker";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith('/비번초기화 ') && isGroupChat == false) {
    /*          num=msg.slice(7);
              var url = "http://10.82.118.171:3600/api/"+num;
              var con = java.net.URL(url).openConnection();
              con.setRequestMethod("POST");
              con.setDoOutput(true);
              var wr = new java.io.DataOutputStream(con.getOutputStream());
              wr.writeBytes(num);
              wr.flush();
              wr.close();
              var responseCode = con.getResponseCode();
              var responseMessage = con.getResponseMessage();
              if (responseCode == con.HTTP_OK) {
                  var br = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
                  var inputLine;
                  var response = new java.lang.StringBuffer();
                  
                  while ((inputLine = br.readLine()) != null) {
                      response.append(inputLine);
                  }
                  br.close();
              }*/

    replier.reply('서버 점검 중입니다. 잠시만 기다려주세요');
  }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}