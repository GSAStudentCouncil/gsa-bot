const { datetime, date, time } = require('../index');

print = (x, param=undefined) => {
    console.log(x.toString(param));
};

now = datetime.now();
yes = datetime.yesterday();
print(now.sub(yes));