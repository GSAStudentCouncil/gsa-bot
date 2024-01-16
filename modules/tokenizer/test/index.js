// parse json file
const fs = require('fs');

const tokenizer = require('../index.js').Tokenizer;

const model = tokenizer(JSON.parse(fs.readFileSync('../../../src/food.json')));
const command = model("급식 아침", {
    date: '오늘',
    time: null,
    what: null
});

console.log(command);
