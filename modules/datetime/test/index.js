const { datetime, date, time } = require('../index');
print = (x, ...args) => console.log(x.toString(...args));

const now = datetime.tomorrow();
print(now.isToday());