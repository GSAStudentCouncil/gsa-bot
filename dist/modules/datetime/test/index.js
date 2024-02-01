"use strict";

var _require = require('../index'),
  datetime = _require.datetime,
  date = _require.date,
  time = _require.time;
print = function print(x) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  console.log(x.toString(param));
};
now = datetime.now();
yes = datetime.yesterday();
print(now.sub(yes));

