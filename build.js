const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const api2_prefix = `const bot = BotManager.getCurrentBot();
`;
const api2_suffix = `
bot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {
    DBListener.addChannel(sbn);
});

bot.addListener(Event.START_COMPILE, () => {
    DBListener.stop();
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

const [ , , api, filePath ] = process.argv;

if (api === "")
    process.exit(1);

console.log(`api ver: ${api}`);
console.log(`filename: ${filePath}`);

let botCode = (api === "api2" ? api2_prefix : "") + fs.readFileSync(filePath, 'utf-8');
if (api === "api2") {
    botCode += api2_suffix;
} else if (api === "legacy") {
    botCode += api_suffix;
}

const distPath = `./dist/${filePath}`;
const directories = distPath.split('/').slice(1, -1);

let curr = '';
directories.forEach(dir => {
    curr = path.join(curr, dir);
    if (!fs.existsSync(curr)) {
        fs.mkdirSync(curr);
        console.log(`directory ${curr} created`);
    }
});

fs.writeFileSync(distPath, botCode
    .replace(/require\(['"]\.\/modules\/(.*)['"]\)/g, 'require(\'$1\')'));  // require 문 교체
console.log('compile complete');