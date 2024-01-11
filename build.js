const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const apis = {
    legacy: {
        prefix: ``,
        suffix: `\nfunction onNotificationPosted(sbn) {\n    DBListener.addChannel(sbn);\n}\n\nfunction onStartCompile() {\n    DBListener.stop();\n}\n`
    },
    api2: {
        prefix: `const bot = BotManager.getCurrentBot();\n`,
        suffix: `\nbot.addListener(Event.NOTIFICATION_POSTED, (sbn, rm) => {\n    app.addChannel(sbn);\n});\n\nbot.addListener(Event.START_COMPILE, () => {\n    app.stop();\n});\n`
    }
};

const [ , , api ] = process.argv;
if (!(api in apis)) process.exit(1);

console.log(`api ver: ${api}`);

function build(filePath) {
    let botCode = apis[api].prefix + fs.readFileSync(filePath, 'utf-8') + apis[api].suffix;

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
        .replace(/require\('\.\.\/modules\/(\w+)'\)/g, "require('$1')"));

    console.log(`compile ${filePath} complete`);
}

function dfs(filePath) {
    fs.readdirSync(filePath).forEach(child => {
        const childPath = path.join(filePath, child);
        if (childPath.endsWith('.js'))      // is file
            build(childPath);
        else                                // is directory
            if (!childPath.startsWith('.')) // ignore hidden directory (ex. src/.legacy)
                dfs(childPath);
    });
}

dfs(path.join('.', 'src'));
