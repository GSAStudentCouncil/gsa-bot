import {Event, Message, BotManager, org, Database, FileStream} from 'd.js';

const bot = BotManager.getCurrentBot();

const path = FileStream.getSdcardPath() + "/authors.json";
const authors = FileStream.readJson(path) || {};

/** @param {Message} msg */
function onMessage(msg) {
    if (msg.systemUserId !== 95) return;

    if (!(msg.author.hash in authors)) {
        authors[msg.author.hash] = msg.author;
        FileStream.saveJson(path, authors);
    }
}
bot.on(Event.MESSAGE, onMessage);
