const { Datetime, Date, Time } = require('../index')
print = (x, ...args) => { console.log(x.toString(...args)); }

print(Datetime.parse(`어제 4시 35분`));