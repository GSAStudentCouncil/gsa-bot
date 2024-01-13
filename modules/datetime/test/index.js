const Datetime = require('../index').Datetime;

let dt = Datetime.now();
console.log(dt.add(3).month().is().after(Datetime.now()));
// TODO: Datetime.add(3).month().fromNow()
