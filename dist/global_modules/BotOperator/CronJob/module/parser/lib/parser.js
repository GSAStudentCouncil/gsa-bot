'use strict';

var e = o,
  W = o;
(function (g, O) {
  var A = {
      g: 0x1e4,
      O: 0x1c2,
      N: 0x1c6,
      l: 0x1ca,
      s: 0x1bc,
      v: 0x1c5,
      E: 0x1e1,
      a: 0x1bd,
      B: 0x1d8
    },
    x = o,
    n = o,
    N = g();
  while (!![]) {
    try {
      var l = parseInt(x(A.g)) / 0x1 * (parseInt(n(0x1c9)) / 0x2) + -parseInt(x(A.O)) / 0x3 + parseInt(n(0x1df)) / 0x4 + parseInt(n(A.N)) / 0x5 * (-parseInt(n(0x1d9)) / 0x6) + -parseInt(n(A.l)) / 0x7 * (-parseInt(n(A.s)) / 0x8) + -parseInt(n(A.v)) / 0x9 * (-parseInt(x(A.E)) / 0xa) + parseInt(n(A.a)) / 0xb * (-parseInt(n(A.B)) / 0xc);
      if (l === O) break;else N['push'](N['shift']());
    } catch (s) {
      N['push'](N['shift']());
    }
  }
})(k, 0xa9fa6);
function o(g, O) {
  var N = k();
  return o = function o(l, s) {
    l = l - 0x1bc;
    var v = N[l];
    return v;
  }, o(g, O);
}
var CronExpression = require(e(0x1d5) + W(0x1d3));
function k() {
  var d = ['sion', 'parseExp', './expres', 'JXhKD', 'ing', '50772ksPdPC', '1248774NsKLNM', 'entry:\x20', '_parseEn', 'parseStr', 'trim', 'exports', '4754108JhcMlC', 'length', '60CJPHrV', 'dNROu', 'split', '63469NVweSW', 'parse', '1228736xDMsIq', '2838woBlUn', 'variable', 'UlilH', 'CcuyA', 'slice', '1884315ZPJnhe', 'fieldsTo', 'push', '24588XltGFh', '5NRoFCJ', 'toString', 'errors', '6cvJmmR', '56gEdDCx', 'AVfwF', 'ression', 'interval', 'Expressi', 'Invalid\x20', 'JfnyW', 'match', 'parseFil'];
  k = function k() {
    return d;
  };
  return k();
}
function CronParser() {}
CronParser[e(0x1db) + 'try'] = function (g) {
  var F = {
      g: 0x1e3,
      O: 0x1d6,
      N: 0x1d0,
      l: 0x1e0,
      s: 0x1e5,
      v: 0x1c1,
      E: 0x1c1,
      a: 0x1e0,
      B: 0x1c0,
      D: 0x1cf,
      J: 0x1da
    },
    T = e,
    j = e,
    O = {
      'JXhKD': function JXhKD(l, s) {
        return l === s;
      },
      'JfnyW': function JfnyW(l, s) {
        return l > s;
      },
      'CcuyA': function CcuyA(l, s) {
        return l + s;
      }
    },
    N = g[T(F.g)]('\x20');
  if (O[j(F.O)](0x6, N[T(0x1e0)])) return {
    'interval': CronExpression['parse'](g)
  };
  if (O[j(F.N)](N[j(F.l)], 0x6)) return {
    'interval': CronExpression[T(F.s)](N[T(F.v)](0x0, 0x6)['join']('\x20')),
    'command': N[j(F.E)](0x6, N[j(F.a)])
  };
  throw new Error(O[j(F.B)](T(F.D) + j(F.J), g));
}, CronParser[e(0x1d4) + e(0x1cc)] = function (g, O) {
  var X = W;
  return CronExpression[X(0x1e5)](g, O);
}, CronParser[e(0x1c3) + e(0x1ce) + 'on'] = function (g, O) {
  var P = {
      g: 0x1c3
    },
    z = e;
  return CronExpression[z(P.g) + 'Expressi' + 'on'](g, O);
}, CronParser[W(0x1dc) + e(0x1d7)] = function (g) {
  var h = {
      g: 0x1e3,
      O: 0x1e0,
      N: 0x1dd,
      l: 0x1e2,
      s: 0x1d1,
      v: 0x1c4,
      E: 0x1cd,
      a: 0x1c8
    },
    V = e,
    C = W,
    O = {
      'dNROu': function dNROu(m, M) {
        return m > M;
      }
    };
  for (var N = g[V(h.g)]('\x0a'), l = {
      'variables': {},
      'expressions': [],
      'errors': {}
    }, v = 0x0, E = N[V(h.O)]; v < E; v++) {
    var B = null,
      D = N[v][C(h.N)]();
    if (O[C(h.l)](D[C(h.O)], 0x0)) {
      if (D[C(h.s)](/^#/)) continue;
      if (B = D[V(h.s)](/^(.*)=(.*)$/)) l[V(0x1be) + 's'][B[0x1]] = B[0x2];else {
        var J = null;
        try {
          J = CronParser['_parseEn' + 'try']('0\x20' + D), l['expressi' + 'ons'][C(h.v)](J[C(h.E)]);
        } catch (m) {
          l[C(h.a)][D] = m;
        }
      }
    }
  }
  return l;
}, CronParser[e(0x1d2) + 'e'] = function (g, O) {
  var p = {
      g: 0x1cb
    },
    S = {
      g: 0x1dc,
      O: 0x1c7,
      N: 0x1bf
    },
    w = e,
    N = {
      'UlilH': function UlilH(l, s) {
        return l(s);
      },
      'AVfwF': function AVfwF(l, s) {
        return l(s);
      }
    };
  N[w(p.g)](require, 'fs')['readFile'](g, function (l, s) {
    var Q = w,
      L = w;
    if (!l) return O(null, CronParser[Q(S.g) + 'ing'](s[Q(S.O)]()));
    N[L(S.N)](O, l);
  });
}, module[e(0x1de)] = CronParser;