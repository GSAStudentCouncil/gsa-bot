x = require('kakaolink');
KakaoApiService = x.KakaoApiService;
KakaoLinkClient = x.KakaoLinkClient;

bot = BotManager.getCurrentBot();
Kakao = new KakaoLinkClient();

KakaoApiService.createService().login({
    email: 'dalmeumm@gmail.com',
    password: 'ekfadma;',
    keepLogin: true,
}).then(e => {
    Kakao.login(e, {
        apiKey: '3abf56a9e5ef90b38a61001720643dbf',
        url: 'https://github.com'
    });
}).catch(e => {
    throw e;
});

bot.addListener(Event.MESSAGE, msg => {
    if (msg.content === '카링') {
        Kakao.sendLink('봇 테스트 방', {
            template_id: 102872,
            template_args: {
                transfer: true,
                header: '투표',
                title1: '항목1',
                title2: '항목2',
                title3: '항목3',
                title4: '항목4',
                title5: '항목5',
                desc1: '설명1', 
                desc2: '설명2',
                desc3: '설명3',
                desc4: '설명4',
                desc5: '설명5'
            }
        }, 'custom').then(e => {
            msg.reply("카링 보내기 성공");
        }).catch(e => {
            msg.reply("카링 보내기 실패\n" + e);
        });
    }
});