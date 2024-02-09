const { datetime, date, time } = require('../index')
print = (x, ...args) => { console.log(x.toString(...args)); }

const now = datetime.parse('2022년 4달 5일');
print(now);