'use strict';

var Z = o,
  Y = o;
(function (g, O) {
  var kE = {
      g: 0x83,
      O: 0x8b,
      N: 0xa4,
      l: 0x81,
      s: 0xad,
      v: 0xc3,
      E: 0x96
    },
    K = o,
    b = o,
    N = g();
  while (!![]) {
    try {
      var l = parseInt(K(0x98)) / 0x1 + parseInt(b(kE.g)) / 0x2 + parseInt(K(kE.O)) / 0x3 + -parseInt(K(0x80)) / 0x4 * (-parseInt(b(kE.N)) / 0x5) + parseInt(b(kE.l)) / 0x6 + parseInt(b(kE.s)) / 0x7 * (-parseInt(b(0x8f)) / 0x8) + parseInt(b(kE.v)) / 0x9 * (-parseInt(b(kE.E)) / 0xa);
      if (l === O) break;else N['push'](N['shift']());
    } catch (s) {
      N['push'](N['shift']());
    }
  }
})(k, 0xd7111);
var __importDefault = void 0 && (void 0)[Z(0xae) + Y(0xaf)] || function (g) {
  return g && g['__esModu' + 'le'] ? g : {
    'default': g
  };
};
Object[Y(0xd1) + 'operty'](exports, Z(0xba) + 'le', {
  'value': !0x0
}), exports['CronJob'] = void 0x0;
var CronJob,
  UUID = java[Z(0xe4)]['UUID'],
  ConcurrentHashMap = java[Z(0xe4)]['concurre' + 'nt'][Z(0xa0) + 'ntHashMa' + 'p'],
  TimeUnit = java['util'][Z(0xc9) + 'nt'][Z(0xbf)],
  Executors = java['util'][Y(0xc9) + 'nt'][Y(0xbd) + 's'],
  cron_job_factor_1 = require(Y(0xc1) + Y(0xc6) + 'actor'),
  parser_1 = __importDefault(require(Z(0xda) + Y(0xd8) + '/lib/par' + 'ser')),
  Runnable = java[Y(0x7a)][Z(0xdb)],
  Context = android[Z(0x7b)]['Context'],
  PowerManager = android['os']['PowerMan' + 'ager'],
  isValidParams_1 = require(Y(0xb8) + Y(0xb3) + Z(0xbe)),
  util_1 = require(Z(0x7f)),
  error_1 = require(Y(0x9b));
!function (g) {
  var kP = {
      g: 0xa5,
      O: 0xb0,
      N: 0xce,
      l: 0x8d,
      s: 0x8c,
      v: 0xc7,
      E: 0x9a,
      a: 0x9e,
      B: 0xb5,
      D: 0xab,
      J: 0x94,
      m: 0xca,
      M: 0xe2,
      x: 0x8a,
      n: 0xc5,
      e: 0xbd,
      W: 0x86,
      T: 0x9c,
      j: 0x89,
      X: 0xd2,
      z: 0xb5
    },
    kr = {
      g: 0x85
    },
    kF = {
      g: 0x9f,
      O: 0xa1,
      N: 0xb2
    },
    kf = {
      g: 0x9f,
      O: 0xe5,
      N: 0xc2
    },
    ky = {
      g: 0x97,
      O: 0xd3,
      N: 0xcf,
      l: 0x7e,
      s: 0xe1,
      v: 0x7c,
      E: 0xd0,
      a: 0x84,
      B: 0xa9,
      D: 0x7d
    },
    kA = {
      g: 0xac
    },
    kQ = {
      g: 0x88,
      O: 0xdd,
      N: 0xa8,
      l: 0xc4,
      s: 0xe0,
      v: 0x93,
      E: 0x90,
      a: 0xb9,
      B: 0x8e,
      D: 0xcb,
      J: 0xde,
      m: 0xb6,
      M: 0xd7,
      x: 0x7d,
      n: 0x9d,
      e: 0xb1,
      W: 0xb9,
      T: 0xd4
    },
    kw = {
      g: 0xa3,
      O: 0xa2,
      N: 0xb6,
      l: 0xdf
    },
    k0 = Z,
    k1 = Z,
    O = {
      'MXfcT': function MXfcT(M, W) {
        return M + W;
      },
      'Kaajz': function Kaajz(M, W) {
        return M !== W;
      },
      'sPkHO': function sPkHO(M, W) {
        return M === W;
      },
      'WsVEh': k0(0xd5) + k1(kP.g),
      'QIzoV': function QIzoV(M, W) {
        return M === W;
      },
      'emIwf': function emIwf(M, W) {
        return M - W;
      },
      'KgWGB': function KgWGB(M, W) {
        return M !== W;
      },
      'ToCYI': function ToCYI(M, W) {
        return M < W;
      },
      'IorJT': function IorJT(M, W) {
        return M instanceof W;
      },
      'oDBJA': k0(kP.O) + k1(kP.N) + '다',
      'wceti': function wceti(M, x) {
        return M(x);
      },
      'FFkiv': k0(kP.l),
      'kUjLJ': function kUjLJ(M, x) {
        return M(x);
      },
      'yMLgC': k0(0xc0) + '앱짱',
      'hRHGA': function hRHGA(M, W) {
        return M === W;
      },
      'HIrxW': k0(0xb4),
      'wgCEW': k1(kP.s),
      'zZrVW': function zZrVW(M, x, W, T, j) {
        return M(x, W, T, j);
      },
      'aeJQU': function aeJQU(M, W) {
        return M && W;
      },
      'rcUkU': function rcUkU(M, W) {
        return M !== W;
      },
      'iPecu': function iPecu(M) {
        return M();
      },
      'AMhqU': k1(0xd6)
    },
    N;
  if (O[k1(kP.v)](void 0x0, O[k0(0x87)](global)[k0(0xcd)])) {
    var s = Api[k1(kP.E) + 'xt']()[k1(0xcc) + k1(0xe2)](Context[k0(0x8a) + k1(0xc5)]);
    N = s[k0(kP.a) + k0(kP.B)](PowerManager[k0(kP.D) + k0(kP.J) + 'K'], O[k1(kP.m)]);
  } else s = App['getConte' + 'xt']()['getSyste' + k1(kP.M)](Context[k1(kP.x) + k1(kP.n)]), N = s[k1(0x9e) + k1(0xb5)](PowerManager[k1(0xab) + k1(0x94) + 'K'], 'Cron');
  var v = new ConcurrentHashMap(),
    E = Executors['newSingl' + k1(0xa1) + 'cheduled' + k1(kP.e)](),
    B = !0x1;
  function D(M, x, W, T) {
    var k2 = k1,
      k3 = k0,
      j;
    if (O[k2(0x82)](void 0x0, T) && (T = {}), !(0x0, isValidParams_1[k2(kQ.g) + k2(kQ.O)])(T)) throw new error_1['InvalidP' + 'arams']();
    try {
      var X = O[k3(kQ.N)][k2(kQ.l)]('|'),
        z = 0x0;
      while (!![]) {
        switch (X[z++]) {
          case '0':
            for (var V = x[k3(kQ.l)]('|'), C = null, Q = 0x0, L = V; Q < L[k2(0xbb)]; Q++) {
              var A = L[Q],
                I = parser_1[k3(kQ.s)][k2(0xbc) + k2(0xe6)](A[k2(kQ.v)](), {
                  'startDate': T['startDat' + 'e'],
                  'endDate': T['endDate']
                })[k2(kQ.E)]();
              (O['QIzoV'](null, C) || C > I) && (C = I);
            }
            continue;
          case '1':
            var y = C[k2(kQ.a)](),
              F = Date[k3(kQ.B)](),
              P = new Runnable({
                'run': function run() {
                  var k4 = k2,
                    k5 = k2,
                    U;
                  try {
                    var H = new Date(y);
                    (0x0, util_1[k4(kw.g) + 'ub'])(H, {
                      'milliseconds': O[k5(kw.O)](null !== (U = T[k5(kw.N)]) && O[k4(0xde)](void 0x0, U) ? U : 0x0, 0xa)
                    }), T['startDat' + 'e'] = H, W[k4(kw.l)](null, M)(), J(M), D(M, x, W, T);
                  } catch (G) {
                    throw new error_1['RuntimeE' + 'rror']();
                  }
                }
              }),
              R = O[k2(kQ.D)](O[k3(0xcb)](y, F), O[k3(kQ.J)](null, j = T[k2(kQ.m)]) && O[k2(kQ.M)](void 0x0, j) ? j : 0x0);
            continue;
          case '2':
            if (null === C) throw new error_1[k3(kQ.x) + 'or']();
            continue;
          case '3':
            O[k3(0xe3)](R, 0x0) && (R = 0x0);
            continue;
          case '4':
            var q = E['schedule'](P, R, TimeUnit[k2(kQ.n) + 'ONDS']),
              S = {
                'cronJob': x,
                'fun': q
              };
            continue;
          case '5':
            return v[k2(kQ.e)](M, S), new Date(C[k2(kQ.W)]());
        }
        break;
      }
    } catch (U) {
      if (O[k3(kQ.T)](U, Error)) throw U;
      throw new Error(O[k2(0xb7)]);
    }
  }
  function J(M) {
    var k6 = k1,
      x = v['get'](M);
    return null != x && (x[k6(0xa6)]['cancel'](!0x0), v['remove'](M), !0x0);
  }
  function m() {
    var k7 = k0;
    for (var M in v) O[k7(kA.g)](J, M);
    return !0x0;
  }
  g[k1(kP.W)] = function (M, x, W) {
    var kc = {
        g: 0xdc,
        O: 0xd9
      },
      k8 = k1,
      k9 = k1,
      T = {
        'irTGL': function irTGL(z, V) {
          return z < V;
        }
      };
    O[k8(0xa7)](void 0x0, W) && (W = {});
    var j = M['toLowerC' + k8(ky.g)]();
    if (O[k8(ky.O)] === j) throw new Error(O['kUjLJ'](Array, 0x6)[k9(ky.N)](0x0)['map'](function () {
      var kk = k9,
        ko = k8;
      return T[kk(kc.g)](Math[kk(kc.O)](), 0.5) ? '깡충' : '껑충';
    })[k9(ky.l)](''));
    if (O[k8(0x82)](k8(0x95), j)) throw new Error(O[k9(ky.s)]);
    if (O['hRHGA'](O[k8(ky.v)], j)) throw new Error(O[k9(0x99)][k9(ky.E)](0x5));
    try {
      var X = O[k9(0xac)](String, UUID['randomUU' + 'ID']()[k8(0xaa)]());
      return O[k8(ky.a)](D, X, M, x, W), new cron_job_factor_1[k9(ky.B) + 'actor'](X, M, W);
    } catch (z) {
      throw new error_1[k8(ky.D) + 'or']();
    }
  }, g[k1(kP.T)] = J, g[k1(0xc8) + 'l'] = m, g[k0(kP.j)] = function () {
    var kg = k0,
      kO = k0;
    m(), E[kg(kf.g) + 'wn']() || E[kO(kf.O) + kO(kf.N)]();
  }, g['on'] = function () {
    var kN = k0,
      kl = k1;
    E[kN(kF.g) + 'wn']() && (E = Executors['newSingl' + kl(kF.O) + kl(kF.N) + 'Executor']());
  }, g[k0(kP.X) + k0(kP.z)] = function (M) {
    var ks = k1,
      kv = k0;
    O['aeJQU'](M, !B) ? (B = !0x0, N[ks(0x91)]()) : !M && B && (B = !0x1, N[kv(kr.g)]());
  };
}(CronJob || (exports[Y(0x92)] = CronJob = {}));
function o(g, O) {
  var N = k();
  return o = function o(l, s) {
    l = l - 0x7a;
    var v = N[l];
    return v;
  }, o(g, O);
}
function k() {
  var ki = ['cheduled', 'ValidPar', '@saroro', 'ock', 'before', 'oDBJA', './lib/is', 'getTime', '__esModu', 'length', 'parseExp', 'Executor', 'ams', 'TimeUnit', '우웅나는서큐버스', './lib/cr', 'Now', '9wlwzDc', 'split', 'RVICE', 'on-job-f', 'rcUkU', 'removeAl', 'concurre', 'AMhqU', 'emIwf', 'getSyste', 'Api', '류가\x20발생했습니', 'fill', 'repeat', 'definePr', 'setWakeL', 'FFkiv', 'IorJT', '0|2|1|3|', 'Cron', 'KgWGB', 'e/parser', 'random', '../modul', 'Runnable', 'irTGL', 'arams', 'Kaajz', 'bind', 'default', 'yMLgC', 'mService', 'ToCYI', 'util', 'shutdown', 'ression', 'lang', 'content', 'HIrxW', 'ParseErr', 'join', '../util', '635740LuAZka', '7726716yMCJrV', 'sPkHO', '586952EvqIyp', 'zZrVW', 'release', 'add', 'iPecu', 'isValidP', 'off', 'POWER_SE', '1002660xHHkfO', '나는굇수다', '@bunny', 'now', '80DalOnT', 'next', 'acquire', 'CronJob', 'trim', 'WAKE_LOC', '@appmaid', '16621210eGSlOf', 'ase', '811277bkXuCx', 'wgCEW', 'getConte', '../error', 'remove', 'MILLISEC', 'newWakeL', 'isShutdo', 'Concurre', 'eThreadS', 'MXfcT', 'dateAddS', '25CQssix', '4|5', 'fun', 'QIzoV', 'WsVEh', 'CronJobF', 'toString', 'PARTIAL_', 'wceti', '684880eNQPIQ', '__import', 'Default', '알\x20수\x20없는\x20오', 'put'];
  k = function k() {
    return ki;
  };
  return k();
}