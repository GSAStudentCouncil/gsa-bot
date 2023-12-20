const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const api2_prefix = `const bot = BotManager.getCurrentBot();
`;
const api2_suffix = `
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    app.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    app.stop();
});
`;
const api_suffix = `
function onNotificationPosted(sbn) {
    DBListener.addChannel(sbn);
}

function onStartCompile() {
    DBListener.stop();
}
`;

const [ , , api ] = process.argv;

if (api === "")
    process.exit(1);

console.log(`api ver: ${api}`);

function build(filePath) {
    let botCode = (api === "api2" ? api2_prefix : "") + fs.readFileSync(filePath, 'utf-8');
    if (api === "api2")
        botCode += api2_suffix;
    else if (api === "legacy")
        botCode += api_suffix;

    const distPath = path.join('.', 'dist', filePath);
    const directories = distPath.split(path.sep).slice(0, -1);

    let curr = '';
    directories.forEach(dir => {
        curr = path.join(curr, dir);
        if (!fs.existsSync(curr)) {
            fs.mkdirSync(curr);
            console.log(`directory ${curr} created`);
        }
    });

    fs.writeFileSync(distPath, botCode
        .replace("require('../modules/DBManager')", "require('DBManager')"));

    console.log(`compile ${filePath} complete`);
}

function dfs(filePath) {
    fs.readdirSync(filePath).forEach(child => {
        const childPath = path.join(filePath, child);
        if (childPath.endsWith('.js'))
            build(childPath);
        else
            dfs(childPath);
    });
}

dfs(path.join('.', 'src'));
