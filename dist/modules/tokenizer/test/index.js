'use strict';

// parse json file
var fs = require('fs');

var tokenizer = require('../index.js').Tokenizer;

var model = tokenizer(JSON.parse(fs.readFileSync('../../../src/food.json')));
var command = model("급식 아침", {
    date: '오늘',
    time: null,
    what: null
});

console.log(command);

