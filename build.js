const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const apis = {
    legacy: {
        prefix: ``,
        suffix: `
function onNotificationPosted(sbn) {
    app.addChannel(sbn);
}

function onStartCompile() {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
}
`
    },
    api2: {
        prefix: `const bot = BotManager.getCurrentBot();
`,
        suffix: `
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
    cronjob.setWakeLock(false);
    cronjob.off();
});
`
    }
};

const [ , , api ] = process.argv;
if (!(api in apis)) process.exit(1);

console.log(`api ver: ${api}`);

function build(originPath) {
    const botCode = fs.readFileSync(originPath, 'utf-8')
        .replace(/require\('\.\.\/modules\/(\w+)'\)/g, "require('$1')");    // modules 상대 경로 제거

    const distPath = path.join('.', originPath.replace('src', 'dist'));
    const directories = distPath.split(path.sep).slice(0, -1);

    let curr = '';
    directories.forEach(dir => {
        curr = path.join(curr, dir);
        if (!fs.existsSync(curr)) {
            fs.mkdirSync(curr);
            console.log(`directory ${curr} created`);
        }
    });

    fs.writeFileSync(distPath, apis[api].prefix + botCode + apis[api].suffix);

    console.log(`compile ${originPath} -> ${distPath} complete`);
}

function dfs(filePath) {
    fs.readdirSync(filePath).forEach(child => {
        const childPath = path.join(filePath, child);

        if (childPath.endsWith('.js'))      // is file
            build(childPath);
        else if (fs.lstatSync(childPath).isDirectory()) // is directory
            if (!child.startsWith('.')) // ignore hidden directory (ex. src/.legacy)
                dfs(childPath);
    });
}

dfs(path.join('.', 'src'));
