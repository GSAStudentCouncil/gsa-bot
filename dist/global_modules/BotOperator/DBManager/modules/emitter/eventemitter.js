"use strict";

module.exports = function () {
  var e = Object.prototype.hasOwnProperty,
    t = "~";
  function n() {}
  function r(e, t, n) {
    this.fn = e, this.context = t, this.once = n || !1;
  }
  function o(e, n, o, s, i) {
    if ("function" != typeof o) throw new TypeError("The listener must be a function");
    var c = new r(o, s || e, i),
      f = t ? t + n : n;
    return e._events[f] ? e._events[f].fn ? e._events[f] = [e._events[f], c] : e._events[f].push(c) : (e._events[f] = c, e._eventsCount++), e;
  }
  function s(e, t) {
    0 == --e._eventsCount ? e._events = new n() : delete e._events[t];
  }
  function i() {
    this._events = new n(), this._eventsCount = 0;
  }
  return Object.create && (n.prototype = Object.create(null), new n().__proto__ || (t = !1)), i.prototype.eventNames = function () {
    var n,
      r,
      o = [];
    if (0 === this._eventsCount) return o;
    for (r in n = this._events) e.call(n, r) && o.push(t ? r.slice(1) : r);
    return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(n)) : o;
  }, i.prototype.listeners = function (e) {
    var n = t ? t + e : e,
      r = this._events[n];
    if (!r) return [];
    if (r.fn) return [r.fn];
    for (var o = 0, s = r.length, i = new Array(s); o < s; o++) i[o] = r[o].fn;
    return i;
  }, i.prototype.listenerCount = function (e) {
    var n = t ? t + e : e,
      r = this._events[n];
    return r ? r.fn ? 1 : r.length : 0;
  }, i.prototype.emit = function (e, n, r, o, s, i) {
    var c = t ? t + e : e;
    if (!this._events[c]) return !1;
    var f,
      u,
      a = this._events[c],
      l = arguments.length;
    if (a.fn) {
      switch (a.once && this.removeListener(e, a.fn, void 0, !0), l) {
        case 1:
          return a.fn.call(a.context), !0;
        case 2:
          return a.fn.call(a.context, n), !0;
        case 3:
          return a.fn.call(a.context, n, r), !0;
        case 4:
          return a.fn.call(a.context, n, r, o), !0;
        case 5:
          return a.fn.call(a.context, n, r, o, s), !0;
        case 6:
          return a.fn.call(a.context, n, r, o, s, i), !0;
      }
      for (u = 1, f = new Array(l - 1); u < l; u++) f[u - 1] = arguments[u];
      a.fn.apply(a.context, f);
    } else {
      var v,
        h = a.length;
      for (u = 0; u < h; u++) switch (a[u].once && this.removeListener(e, a[u].fn, void 0, !0), l) {
        case 1:
          a[u].fn.call(a[u].context);
          break;
        case 2:
          a[u].fn.call(a[u].context, n);
          break;
        case 3:
          a[u].fn.call(a[u].context, n, r);
          break;
        case 4:
          a[u].fn.call(a[u].context, n, r, o);
          break;
        default:
          if (!f) for (v = 1, f = new Array(l - 1); v < l; v++) f[v - 1] = arguments[v];
          a[u].fn.apply(a[u].context, f);
      }
    }
    return !0;
  }, i.prototype.on = function (e, t, n) {
    return o(this, e, t, n, !1);
  }, i.prototype.once = function (e, t, n) {
    return o(this, e, t, n, !0);
  }, i.prototype.removeListener = function (e, n, r, o) {
    var i = t ? t + e : e;
    if (!this._events[i]) return this;
    if (!n) return s(this, i), this;
    var c = this._events[i];
    if (c.fn) c.fn !== n || o && !c.once || r && c.context !== r || s(this, i);else {
      for (var f = 0, u = [], a = c.length; f < a; f++) (c[f].fn !== n || o && !c[f].once || r && c[f].context !== r) && u.push(c[f]);
      u.length ? this._events[i] = 1 === u.length ? u[0] : u : s(this, i);
    }
    return this;
  }, i.prototype.removeAllListeners = function (e) {
    var r;
    return e ? (r = t ? t + e : e, this._events[r] && s(this, r)) : (this._events = new n(), this._eventsCount = 0), this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = t, i.EventEmitter = i, i;
}();