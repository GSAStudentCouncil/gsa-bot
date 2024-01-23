'use strict';

var _require = require('../index'),
    DateTime = _require.DateTime,
    _ = _require._;

var x = DateTime.now();
console.log(x.is().before({ hour: 18 }));
// y = DateTime.now().add(3).hour();
// console.log(y.toString());
// console.log(y.sub(x).toString());

// TODO: $(3).month().fromNow()

