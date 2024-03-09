"use strict";

x = {
  a: 3,
  b: 5
};
ff = function ff(o) {
  console.log(o.c);
};
f = function f(o) {
  o.c = 4;
  ff(o);
};
f(x);