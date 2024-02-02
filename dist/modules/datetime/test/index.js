const { datetime, date, time } = require('../index');
print = (x, ...args) => console.log(x.toString(...args));

const now = datetime.now();
print(now);
print(now.time);
print(now.date);
