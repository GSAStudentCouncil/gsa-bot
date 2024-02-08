var Crons = require('../../asdf').Crons;

var cronjobs = {
    '오늘': "* * * * *",
    '점심': "* * * * *",
    '저녁': "* * * * *"
}

var crons = new Crons(tag => {
    Log.i(tag + " cronjob executed!\n" + new Date());
});

crons.add(cronjobs);