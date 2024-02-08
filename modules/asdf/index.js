const cronjob = require('./cronjob').CronJob;

class Crons {
    constructor(fun) {
        this.cronManager = cronjob;
        this.fun = fun;
        this.list = [];

        this.cronManager.setWakeLock(true);
    }

    add(cronjobs) {
        for (let key in cronjobs) {
            this.cronManager.add(cronjobs[key], () => this.fun(key));
        }
    }
}

exports.Crons = Crons;
