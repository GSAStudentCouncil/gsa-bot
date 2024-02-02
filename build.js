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

const [ , , api, root ] = process.argv;
if (!(api in apis)) process.exit(1);

console.log(`api ver: ${api}`);

function build(originPath, noBabel) {
    const distPath = path.join('.', path.join('dist', originPath));
    const sep = distPath.split(path.sep);
    const directories = sep.slice(0, -1);

    let curr = '';
    directories.forEach((dir, dep) => {
        curr = path.join(curr, dir);
        if (!fs.existsSync(curr)) {
            fs.mkdirSync(curr);
            console.log(`directory\t\t${curr} created`);
        }
    });

    let code = fs.readFileSync(originPath, 'utf-8');

    if (originPath.endsWith('.js')) {
        code = code
            .replace(/require\('\.\.\/modules\/([\w-]+)'\)/g, "require('$1')")
            .replace('const IS_DIST = false;', 'const IS_DIST = true;');

        if (originPath.includes('src'))
            code = apis[api].prefix + code + apis[api].suffix;
    }

    fs.writeFileSync(distPath, code);

    if (originPath.endsWith('.js') && !noBabel)
        fs.writeFileSync(distPath, execSync(`babel ${distPath}`).toString());

    console.log(`compile${!noBabel ? ' and transpile\t' : '\t\t\t'}${originPath} -> ${distPath}`);
}

function dfs(filePath, noBabel=false) {
    for (let child of fs.readdirSync(filePath)) {
        const childPath = path.join(filePath, child);

        if (fs.lstatSync(childPath).isDirectory()) {    // is directory
            if (!child.startsWith('.') && ['command-handler', 'datetime'].includes(child)) // ignore hidden directory (ex. src/.legacy)
                dfs(childPath, noBabel);
        } else {
            build(childPath, noBabel);
        }
    }
}

dfs(path.join('.', root));
