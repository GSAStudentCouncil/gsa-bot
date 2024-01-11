const fs = require('fs');
const { execSync } = require("child_process");

const [ , , botPath, botName ] = process.argv;

if (botPath === undefined || botName === undefined) {
    console.error("syntax: npm build compile [botPath] [botName]");
    return;
}

console.log(`compile \`/sdcard/${botPath}/Bots/${botName}/${botName}\` ...`)
execSync(`adb push ./modules /sdcard/${botPath}/Bots/${botName}/`);
execSync(`adb push ./dist/DB.js /sdcard/${botPath}/Bots/${botName}/${botName}.js`);
execSync(`adb shell am broadcast -a com.xfl.msgbot.broadcast.compile -p com.xfl.msgbot --es name ${botName}`);
console.log("compile complete");
