const mf = Object.create
const Go = Object.defineProperty
const hf = Object.getOwnPropertyDescriptor
const gf = Object.getOwnPropertyNames
const yf = Object.getPrototypeOf
const bf = Object.prototype.hasOwnProperty
const a = (e, t) => Go(e, 'name', { value: t, configurable: !0 })
const mo = /* @__PURE__ */ (e =>
  typeof require < 'u'
    ? require
    : typeof Proxy < 'u'
      ? new Proxy(e, {
          get: (t, o) => (typeof require < 'u' ? require : t)[o],
        })
      : e)(function (e) {
  if (typeof require < 'u') return require.apply(this, arguments)
  throw new Error('Dynamic require of "' + e + '" is not supported')
})
const we = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports)
const vf = (e, t) => {
  for (const o in t) Go(e, o, { get: t[o], enumerable: !0 })
}
const xf = (e, t, o, i) => {
  if ((t && typeof t === 'object') || typeof t === 'function')
    for (const r of gf(t))
      !bf.call(e, r) &&
        r !== o &&
        Go(e, r, {
          get: () => t[r],
          enumerable: !(i = hf(t, r)) || i.enumerable,
        })
  return e
}
const Ve = (e, t, o) => (
  (o = e != null ? mf(yf(e)) : {}),
  xf(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    t || !e || !e.__esModule
      ? Go(o, 'default', { value: e, enumerable: !0 })
      : o,
    e
  )
)

// ../node_modules/prop-types/lib/ReactPropTypesSecret.js
const Qa = we((T_, Ya) => {
  'use strict'
  const py = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'
  Ya.exports = py
})

// ../node_modules/prop-types/factoryWithThrowingShims.js
const el = we((C_, Ja) => {
  'use strict'
  const dy = Qa()
  function Xa() {}
  a(Xa, 'emptyFunction')
  function Za() {}
  a(Za, 'emptyFunctionWithReset')
  Za.resetWarningCache = Xa
  Ja.exports = function () {
    function e(i, r, n, l, u, c) {
      if (c !== dy) {
        const d = new Error(
          'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. \
Read more at http://fb.me/use-check-prop-types'
        )
        throw ((d.name = 'Invariant Violation'), d)
      }
    }
    ;(a(e, 'shim'), (e.isRequired = e))
    function t() {
      return e
    }
    a(t, 'getShim')
    const o = {
      array: e,
      bigint: e,
      bool: e,
      func: e,
      number: e,
      object: e,
      string: e,
      symbol: e,
      any: e,
      arrayOf: t,
      element: e,
      elementType: e,
      instanceOf: t,
      node: e,
      objectOf: t,
      oneOf: t,
      oneOfType: t,
      shape: t,
      exact: t,
      checkPropTypes: Za,
      resetWarningCache: Xa,
    }
    return ((o.PropTypes = o), o)
  }
})

// ../node_modules/prop-types/index.js
const si = we((P_, tl) => {
  tl.exports = el()()
  let k_, O_
})

// ../node_modules/react-fast-compare/index.js
const rl = we((A_, ol) => {
  const fy = typeof Element < 'u'
  const my = typeof Map === 'function'
  const hy = typeof Set === 'function'
  const gy = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView
  function fr(e, t) {
    if (e === t) return !0
    if (e && t && typeof e === 'object' && typeof t === 'object') {
      if (e.constructor !== t.constructor) return !1
      let o, i, r
      if (Array.isArray(e)) {
        if (((o = e.length), o != t.length)) return !1
        for (i = o; i-- !== 0; ) if (!fr(e[i], t[i])) return !1
        return !0
      }
      let n
      if (my && e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) return !1
        for (n = e.entries(); !(i = n.next()).done; )
          if (!t.has(i.value[0])) return !1
        for (n = e.entries(); !(i = n.next()).done; )
          if (!fr(i.value[1], t.get(i.value[0]))) return !1
        return !0
      }
      if (hy && e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) return !1
        for (n = e.entries(); !(i = n.next()).done; )
          if (!t.has(i.value[0])) return !1
        return !0
      }
      if (gy && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
        if (((o = e.length), o != t.length)) return !1
        for (i = o; i-- !== 0; ) if (e[i] !== t[i]) return !1
        return !0
      }
      if (e.constructor === RegExp)
        return e.source === t.source && e.flags === t.flags
      if (
        e.valueOf !== Object.prototype.valueOf &&
        typeof e.valueOf === 'function' &&
        typeof t.valueOf === 'function'
      )
        return e.valueOf() === t.valueOf()
      if (
        e.toString !== Object.prototype.toString &&
        typeof e.toString === 'function' &&
        typeof t.toString === 'function'
      )
        return e.toString() === t.toString()
      if (((r = Object.keys(e)), (o = r.length), o !== Object.keys(t).length))
        return !1
      for (i = o; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, r[i])) return !1
      if (fy && e instanceof Element) return !1
      for (i = o; i-- !== 0; )
        if (
          !(
            (r[i] === '_owner' || r[i] === '__v' || r[i] === '__o') &&
            e.$$typeof
          ) &&
          !fr(e[r[i]], t[r[i]])
        )
          return !1
      return !0
    }
    return e !== e && t !== t
  }
  a(fr, 'equal')
  ol.exports = /* @__PURE__ */ a(function (t, o) {
    try {
      return fr(t, o)
    } catch (i) {
      if ((i.message || '').match(/stack|recursion/i))
        return (
          console.warn('react-fast-compare cannot handle circular refs'),
          !1
        )
      throw i
    }
  }, 'isEqual')
})

// ../node_modules/invariant/browser.js
const il = we((M_, nl) => {
  'use strict'
  const yy = /* @__PURE__ */ a(function (e, t, o, i, r, n, l, u) {
    if (!e) {
      let c
      if (t === void 0)
        c = new Error(
          'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
        )
      else {
        const d = [o, i, r, n, l, u]
        let p = 0
        ;((c = new Error(
          t.replace(/%s/g, function () {
            return d[p++]
          })
        )),
          (c.name = 'Invariant Violation'))
      }
      throw ((c.framesToPop = 1), c)
    }
  }, 'invariant')
  nl.exports = yy
})

// ../node_modules/shallowequal/index.js
const al = we((N_, sl) => {
  sl.exports = /* @__PURE__ */ a(function (t, o, i, r) {
    let n = i ? i.call(r, t, o) : void 0
    if (n !== void 0) return !!n
    if (t === o) return !0
    if (typeof t !== 'object' || !t || typeof o !== 'object' || !o) return !1
    const l = Object.keys(t)
    const u = Object.keys(o)
    if (l.length !== u.length) return !1
    for (
      let c = Object.prototype.hasOwnProperty.bind(o), d = 0;
      d < l.length;
      d++
    ) {
      const p = l[d]
      if (!c(p)) return !1
      const f = t[p]
      const h = o[p]
      if (
        ((n = i ? i.call(r, f, h, p) : void 0),
        n === !1 || (n === void 0 && f !== h))
      )
        return !1
    }
    return !0
  }, 'shallowEqual')
})

// ../node_modules/memoizerific/memoizerific.js
const Di = we((Jl, Ai) => {
  ;(function (e) {
    if (typeof Jl === 'object' && typeof Ai < 'u') Ai.exports = e()
    else if (typeof define === 'function' && define.amd) define([], e)
    else {
      let t
      ;(typeof window < 'u'
        ? (t = window)
        : typeof global < 'u'
          ? (t = global)
          : typeof self < 'u'
            ? (t = self)
            : (t = this),
        (t.memoizerific = e()))
    }
  })(function () {
    let e, t, o
    return /* @__PURE__ */ a(function i(r, n, l) {
      function u(p, f) {
        if (!n[p]) {
          if (!r[p]) {
            const h = typeof mo === 'function' && mo
            if (!f && h) return h(p, !0)
            if (c) return c(p, !0)
            const y = new Error("Cannot find module '" + p + "'")
            throw ((y.code = 'MODULE_NOT_FOUND'), y)
          }
          const m = (n[p] = { exports: {} })
          r[p][0].call(
            m.exports,
            function (b) {
              const x = r[p][1][b]
              return u(x || b)
            },
            m,
            m.exports,
            i,
            r,
            n,
            l
          )
        }
        return n[p].exports
      }
      a(u, 's')
      for (var c = typeof mo === 'function' && mo, d = 0; d < l.length; d++)
        u(l[d])
      return u
    }, 'e')(
      {
        1: [
          function (i, r, n) {
            r.exports = function (l) {
              if (typeof Map !== 'function' || l) {
                const u = i('./similar')
                return new u()
              } else return /* @__PURE__ */ new Map()
            }
          },
          { './similar': 2 },
        ],
        2: [
          function (i, r, n) {
            function l() {
              return (
                (this.list = []),
                (this.lastItem = void 0),
                (this.size = 0),
                this
              )
            }
            ;(a(l, 'Similar'),
              (l.prototype.get = function (u) {
                let c
                if (this.lastItem && this.isEqual(this.lastItem.key, u))
                  return this.lastItem.val
                if (((c = this.indexOf(u)), c >= 0))
                  return ((this.lastItem = this.list[c]), this.list[c].val)
              }),
              (l.prototype.set = function (u, c) {
                let d
                return this.lastItem && this.isEqual(this.lastItem.key, u)
                  ? ((this.lastItem.val = c), this)
                  : ((d = this.indexOf(u)),
                    d >= 0
                      ? ((this.lastItem = this.list[d]),
                        (this.list[d].val = c),
                        this)
                      : ((this.lastItem = { key: u, val: c }),
                        this.list.push(this.lastItem),
                        this.size++,
                        this))
              }),
              (l.prototype.delete = function (u) {
                let c
                if (
                  (this.lastItem &&
                    this.isEqual(this.lastItem.key, u) &&
                    (this.lastItem = void 0),
                  (c = this.indexOf(u)),
                  c >= 0)
                )
                  return (this.size--, this.list.splice(c, 1)[0])
              }),
              (l.prototype.has = function (u) {
                let c
                return this.lastItem && this.isEqual(this.lastItem.key, u)
                  ? !0
                  : ((c = this.indexOf(u)),
                    c >= 0 ? ((this.lastItem = this.list[c]), !0) : !1)
              }),
              (l.prototype.forEach = function (u, c) {
                let d
                for (d = 0; d < this.size; d++)
                  u.call(c || this, this.list[d].val, this.list[d].key, this)
              }),
              (l.prototype.indexOf = function (u) {
                let c
                for (c = 0; c < this.size; c++)
                  if (this.isEqual(this.list[c].key, u)) return c
                return -1
              }),
              (l.prototype.isEqual = function (u, c) {
                return u === c || (u !== u && c !== c)
              }),
              (r.exports = l))
          },
          {},
        ],
        3: [
          function (i, r, n) {
            const l = i('map-or-similar')
            r.exports = function (p) {
              const f = new l(!1)
              const h = []
              return function (y) {
                var m = /* @__PURE__ */ a(function () {
                  let b = f
                  let x
                  let E
                  const g = arguments.length - 1
                  const v = Array(g + 1)
                  let S = !0
                  let w
                  if ((m.numArgs || m.numArgs === 0) && m.numArgs !== g + 1)
                    throw new Error(
                      'Memoizerific functions should always be called with the same number of arguments'
                    )
                  for (w = 0; w < g; w++) {
                    if (
                      ((v[w] = {
                        cacheItem: b,
                        arg: arguments[w],
                      }),
                      b.has(arguments[w]))
                    ) {
                      b = b.get(arguments[w])
                      continue
                    }
                    ;((S = !1),
                      (x = new l(!1)),
                      b.set(arguments[w], x),
                      (b = x))
                  }
                  return (
                    S &&
                      (b.has(arguments[g])
                        ? (E = b.get(arguments[g]))
                        : (S = !1)),
                    S ||
                      ((E = y.apply(null, arguments)), b.set(arguments[g], E)),
                    p > 0 &&
                      ((v[g] = {
                        cacheItem: b,
                        arg: arguments[g],
                      }),
                      S ? u(h, v) : h.push(v),
                      h.length > p && c(h.shift())),
                    (m.wasMemoized = S),
                    (m.numArgs = g + 1),
                    E
                  )
                }, 'memoizerific')
                return (
                  (m.limit = p),
                  (m.wasMemoized = !1),
                  (m.cache = f),
                  (m.lru = h),
                  m
                )
              }
            }
            function u(p, f) {
              const h = p.length
              const y = f.length
              let m
              let b
              let x
              for (b = 0; b < h; b++) {
                for (m = !0, x = 0; x < y; x++)
                  if (!d(p[b][x].arg, f[x].arg)) {
                    m = !1
                    break
                  }
                if (m) break
              }
              p.push(p.splice(b, 1)[0])
            }
            a(u, 'moveToMostRecentLru')
            function c(p) {
              const f = p.length
              let h = p[f - 1]
              let y
              let m
              for (
                h.cacheItem.delete(h.arg), m = f - 2;
                m >= 0 &&
                ((h = p[m]), (y = h.cacheItem.get(h.arg)), !y || !y.size);
                m--
              )
                h.cacheItem.delete(h.arg)
            }
            a(c, 'removeCachedResult')
            function d(p, f) {
              return p === f || (p !== p && f !== f)
            }
            a(d, 'isEqual')
          },
          { 'map-or-similar': 1 },
        ],
      },
      {},
      [3]
    )(3)
  })
})

// ../node_modules/picoquery/lib/string-util.js
const Li = we(Mi => {
  'use strict'
  Object.defineProperty(Mi, '__esModule', { value: !0 })
  Mi.encodeString = ov
  const it = Array.from(
    { length: 256 },
    (e, t) => '%' + ((t < 16 ? '0' : '') + t.toString(16)).toUpperCase()
  )
  const tv = new Int8Array([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 0,
  ])
  function ov(e) {
    const t = e.length
    if (t === 0) return ''
    let o = ''
    let i = 0
    let r = 0
    e: for (; r < t; r++) {
      let n = e.charCodeAt(r)
      for (; n < 128; ) {
        if (
          (tv[n] !== 1 &&
            (i < r && (o += e.slice(i, r)), (i = r + 1), (o += it[n])),
          ++r === t)
        )
          break e
        n = e.charCodeAt(r)
      }
      if ((i < r && (o += e.slice(i, r)), n < 2048)) {
        ;((i = r + 1), (o += it[192 | (n >> 6)] + it[128 | (n & 63)]))
        continue
      }
      if (n < 55296 || n >= 57344) {
        ;((i = r + 1),
          (o +=
            it[224 | (n >> 12)] +
            it[128 | ((n >> 6) & 63)] +
            it[128 | (n & 63)]))
        continue
      }
      if ((++r, r >= t)) throw new Error('URI malformed')
      const l = e.charCodeAt(r) & 1023
      ;((i = r + 1),
        (n = 65536 + (((n & 1023) << 10) | l)),
        (o +=
          it[240 | (n >> 18)] +
          it[128 | ((n >> 12) & 63)] +
          it[128 | ((n >> 6) & 63)] +
          it[128 | (n & 63)]))
    }
    return i === 0 ? e : i < t ? o + e.slice(i) : o
  }
  a(ov, 'encodeString')
})

// ../node_modules/picoquery/lib/shared.js
const _r = we(st => {
  'use strict'
  Object.defineProperty(st, '__esModule', { value: !0 })
  st.defaultOptions =
    st.defaultShouldSerializeObject =
    st.defaultValueSerializer =
      void 0
  const Ni = Li()
  const rv = /* @__PURE__ */ a(e => {
    switch (typeof e) {
      case 'string':
        return (0, Ni.encodeString)(e)
      case 'bigint':
      case 'boolean':
        return '' + e
      case 'number':
        if (Number.isFinite(e))
          return e < 1e21 ? '' + e : (0, Ni.encodeString)('' + e)
        break
    }
    return e instanceof Date ? (0, Ni.encodeString)(e.toISOString()) : ''
  }, 'defaultValueSerializer')
  st.defaultValueSerializer = rv
  const nv = /* @__PURE__ */ a(
    e => e instanceof Date,
    'defaultShouldSerializeObject'
  )
  st.defaultShouldSerializeObject = nv
  const tu = /* @__PURE__ */ a(e => e, 'identityFunc')
  st.defaultOptions = {
    nesting: !0,
    nestingSyntax: 'dot',
    arrayRepeat: !1,
    arrayRepeatSyntax: 'repeat',
    delimiter: 38,
    valueDeserializer: tu,
    valueSerializer: st.defaultValueSerializer,
    keyDeserializer: tu,
    shouldSerializeObject: st.defaultShouldSerializeObject,
  }
})

// ../node_modules/picoquery/lib/object-util.js
const Fi = we(kr => {
  'use strict'
  Object.defineProperty(kr, '__esModule', { value: !0 })
  kr.getDeepObject = av
  kr.stringifyObject = ou
  const Rt = _r()
  const iv = Li()
  function sv(e) {
    return e === '__proto__' || e === 'constructor' || e === 'prototype'
  }
  a(sv, 'isPrototypeKey')
  function av(e, t, o, i, r) {
    if (sv(t)) return e
    const n = e[t]
    return typeof n === 'object' && n !== null
      ? n
      : !i &&
          (r ||
            typeof o === 'number' ||
            (typeof o === 'string' && o * 0 === 0 && !o.includes('.')))
        ? (e[t] = [])
        : (e[t] = {})
  }
  a(av, 'getDeepObject')
  const lv = 20
  const uv = '[]'
  const cv = '['
  const pv = ']'
  const dv = '.'
  function ou(e, t, o = 0, i, r) {
    const {
      nestingSyntax: n = Rt.defaultOptions.nestingSyntax,
      arrayRepeat: l = Rt.defaultOptions.arrayRepeat,
      arrayRepeatSyntax: u = Rt.defaultOptions.arrayRepeatSyntax,
      nesting: c = Rt.defaultOptions.nesting,
      delimiter: d = Rt.defaultOptions.delimiter,
      valueSerializer: p = Rt.defaultOptions.valueSerializer,
      shouldSerializeObject: f = Rt.defaultOptions.shouldSerializeObject,
    } = t
    const h = typeof d === 'number' ? String.fromCharCode(d) : d
    const y = r === !0 && l
    const m = n === 'dot' || (n === 'js' && !r)
    if (o > lv) return ''
    let b = ''
    let x = !0
    let E = !1
    for (const g in e) {
      const v = e[g]
      let S
      ;(i
        ? ((S = i),
          y
            ? u === 'bracket' && (S += uv)
            : m
              ? ((S += dv), (S += g))
              : ((S += cv), (S += g), (S += pv)))
        : (S = g),
        x || (b += h),
        typeof v === 'object' && v !== null && !f(v)
          ? ((E = v.pop !== void 0),
            (c || (l && E)) && (b += ou(v, t, o + 1, S, E)))
          : ((b += (0, iv.encodeString)(S)), (b += '='), (b += p(v, g))),
        x && (x = !1))
    }
    return b
  }
  a(ou, 'stringifyObject')
})

// ../node_modules/fast-decode-uri-component/index.js
const su = we((_A, iu) => {
  'use strict'
  const ru = 12
  const fv = 0
  const Ri = [
    // The first part of the table maps bytes to character to a transition.
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4,
    // The second part of the table maps a state to a new state when adding a
    // transition.
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84,
    96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // The third part maps the current transition to a mask that needs to apply
    // to the byte.
    127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
  ]
  function mv(e) {
    let t = e.indexOf('%')
    if (t === -1) return e
    for (
      var o = e.length, i = '', r = 0, n = 0, l = t, u = ru;
      t > -1 && t < o;

    ) {
      const c = nu(e[t + 1], 4)
      const d = nu(e[t + 2], 0)
      const p = c | d
      const f = Ri[p]
      if (((u = Ri[256 + u + f]), (n = (n << 6) | (p & Ri[364 + f])), u === ru))
        ((i += e.slice(r, l)),
          (i +=
            n <= 65535
              ? String.fromCharCode(n)
              : String.fromCharCode(55232 + (n >> 10), 56320 + (n & 1023))),
          (n = 0),
          (r = t + 3),
          (t = l = e.indexOf('%', r)))
      else {
        if (u === fv) return null
        if (((t += 3), t < o && e.charCodeAt(t) === 37)) continue
        return null
      }
    }
    return i + e.slice(r)
  }
  a(mv, 'decodeURIComponent')
  const hv = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15,
  }
  function nu(e, t) {
    const o = hv[e]
    return o === void 0 ? 255 : o << t
  }
  a(nu, 'hexCodeToInt')
  iu.exports = mv
})

// ../node_modules/picoquery/lib/parse.js
const cu = we(mt => {
  'use strict'
  const gv =
    (mt && mt.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e }
    }
  Object.defineProperty(mt, '__esModule', { value: !0 })
  mt.numberValueDeserializer = mt.numberKeyDeserializer = void 0
  mt.parse = vv
  const Or = Fi()
  const Bt = _r()
  const au = gv(su())
  const yv = /* @__PURE__ */ a(e => {
    const t = Number(e)
    return Number.isNaN(t) ? e : t
  }, 'numberKeyDeserializer')
  mt.numberKeyDeserializer = yv
  const bv = /* @__PURE__ */ a(e => {
    const t = Number(e)
    return Number.isNaN(t) ? e : t
  }, 'numberValueDeserializer')
  mt.numberValueDeserializer = bv
  const lu = /\+/g
  const uu = /* @__PURE__ */ a(function () {}, 'Empty')
  uu.prototype = /* @__PURE__ */ Object.create(null)
  function Pr(e, t, o, i, r) {
    let n = e.substring(t, o)
    return (
      i && (n = n.replace(lu, ' ')),
      r && (n = (0, au.default)(n) || n),
      n
    )
  }
  a(Pr, 'computeKeySlice')
  function vv(e, t) {
    const {
      valueDeserializer: o = Bt.defaultOptions.valueDeserializer,
      keyDeserializer: i = Bt.defaultOptions.keyDeserializer,
      arrayRepeatSyntax: r = Bt.defaultOptions.arrayRepeatSyntax,
      nesting: n = Bt.defaultOptions.nesting,
      arrayRepeat: l = Bt.defaultOptions.arrayRepeat,
      nestingSyntax: u = Bt.defaultOptions.nestingSyntax,
      delimiter: c = Bt.defaultOptions.delimiter,
    } = t ?? {}
    const d = typeof c === 'string' ? c.charCodeAt(0) : c
    const p = u === 'js'
    const f = new uu()
    if (typeof e !== 'string') return f
    const h = e.length
    let y = ''
    let m = -1
    let b = -1
    let x = -1
    let E = f
    let g
    let v = ''
    let S = ''
    let w = !1
    let k = !1
    let _ = !1
    let C = !1
    let T = !1
    let O = !1
    let P = !1
    let D = 0
    let M = -1
    let F = -1
    let Z = -1
    for (let V = 0; V < h + 1; V++) {
      if (((D = V !== h ? e.charCodeAt(V) : d), D === d)) {
        if (
          ((P = b > m),
          P || (b = V),
          x !== b - 1 &&
            ((S = Pr(e, x + 1, M > -1 ? M : b, _, w)),
            (v = i(S)),
            g !== void 0 &&
              (E = (0, Or.getDeepObject)(E, g, v, p && T, p && O))),
          P || v !== '')
        ) {
          P &&
            ((y = e.slice(b + 1, V)),
            C && (y = y.replace(lu, ' ')),
            k && (y = (0, au.default)(y) || y))
          const Q = o(y, v)
          if (l) {
            const z = E[v]
            z === void 0
              ? M > -1
                ? (E[v] = [Q])
                : (E[v] = Q)
              : z.pop
                ? z.push(Q)
                : (E[v] = [z, Q])
          } else E[v] = Q
        }
        ;((y = ''),
          (m = V),
          (b = V),
          (w = !1),
          (k = !1),
          (_ = !1),
          (C = !1),
          (T = !1),
          (O = !1),
          (M = -1),
          (x = V),
          (E = f),
          (g = void 0),
          (v = ''))
      } else
        D === 93
          ? (l && r === 'bracket' && Z === 91 && (M = F),
            n &&
              (u === 'index' || p) &&
              b <= m &&
              (x !== F &&
                ((S = Pr(e, x + 1, V, _, w)),
                (v = i(S)),
                g !== void 0 && (E = (0, Or.getDeepObject)(E, g, v, void 0, p)),
                (g = v),
                (_ = !1),
                (w = !1)),
              (x = V),
              (O = !0),
              (T = !1)))
          : D === 46
            ? n &&
              (u === 'dot' || p) &&
              b <= m &&
              (x !== F &&
                ((S = Pr(e, x + 1, V, _, w)),
                (v = i(S)),
                g !== void 0 && (E = (0, Or.getDeepObject)(E, g, v, p)),
                (g = v),
                (_ = !1),
                (w = !1)),
              (T = !0),
              (O = !1),
              (x = V))
            : D === 91
              ? n &&
                (u === 'index' || p) &&
                b <= m &&
                (x !== F &&
                  ((S = Pr(e, x + 1, V, _, w)),
                  (v = i(S)),
                  p && g !== void 0 && (E = (0, Or.getDeepObject)(E, g, v, p)),
                  (g = v),
                  (_ = !1),
                  (w = !1),
                  (T = !1),
                  (O = !0)),
                (x = V))
              : D === 61
                ? b <= m
                  ? (b = V)
                  : (k = !0)
                : D === 43
                  ? b > m
                    ? (C = !0)
                    : (_ = !0)
                  : D === 37 && (b > m ? (k = !0) : (w = !0))
      ;((F = V), (Z = D))
    }
    return f
  }
  a(vv, 'parse')
})

// ../node_modules/picoquery/lib/stringify.js
const pu = we(Bi => {
  'use strict'
  Object.defineProperty(Bi, '__esModule', { value: !0 })
  Bi.stringify = Iv
  const xv = Fi()
  function Iv(e, t) {
    if (e === null || typeof e !== 'object') return ''
    const o = t ?? {}
    return (0, xv.stringifyObject)(e, o)
  }
  a(Iv, 'stringify')
})

// ../node_modules/picoquery/lib/main.js
const du = we(Xe => {
  'use strict'
  const Sv =
    (Xe && Xe.__createBinding) ||
    (Object.create
      ? function (e, t, o, i) {
          i === void 0 && (i = o)
          let r = Object.getOwnPropertyDescriptor(t, o)
          ;((!r ||
            ('get' in r ? !t.__esModule : r.writable || r.configurable)) &&
            (r = {
              enumerable: !0,
              get: /* @__PURE__ */ a(function () {
                return t[o]
              }, 'get'),
            }),
            Object.defineProperty(e, i, r))
        }
      : function (e, t, o, i) {
          ;(i === void 0 && (i = o), (e[i] = t[o]))
        })
  const wv =
    (Xe && Xe.__exportStar) ||
    function (e, t) {
      for (const o in e)
        o !== 'default' &&
          !Object.prototype.hasOwnProperty.call(t, o) &&
          Sv(t, e, o)
    }
  Object.defineProperty(Xe, '__esModule', { value: !0 })
  Xe.stringify = Xe.parse = void 0
  const Ev = cu()
  Object.defineProperty(Xe, 'parse', {
    enumerable: !0,
    get: /* @__PURE__ */ a(function () {
      return Ev.parse
    }, 'get'),
  })
  const Tv = pu()
  Object.defineProperty(Xe, 'stringify', {
    enumerable: !0,
    get: /* @__PURE__ */ a(function () {
      return Tv.stringify
    }, 'get'),
  })
  wv(_r(), Xe)
})

// ../node_modules/toggle-selection/index.js
const bu = we((XA, yu) => {
  yu.exports = function () {
    const e = document.getSelection()
    if (!e.rangeCount) return function () {}
    for (var t = document.activeElement, o = [], i = 0; i < e.rangeCount; i++)
      o.push(e.getRangeAt(i))
    switch (t.tagName.toUpperCase()) {
      // .toUpperCase handles XHTML
      case 'INPUT':
      case 'TEXTAREA':
        t.blur()
        break
      default:
        t = null
        break
    }
    return (
      e.removeAllRanges(),
      function () {
        ;(e.type === 'Caret' && e.removeAllRanges(),
          e.rangeCount ||
            o.forEach(function (r) {
              e.addRange(r)
            }),
          t && t.focus())
      }
    )
  }
})

// ../node_modules/copy-to-clipboard/index.js
const Iu = we((ZA, xu) => {
  'use strict'
  const Av = bu()
  const vu = {
    'text/plain': 'Text',
    'text/html': 'Url',
    default: 'Text',
  }
  const Dv = 'Copy to clipboard: #{key}, Enter'
  function Mv(e) {
    const t = (/mac os x/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl') + '+C'
    return e.replace(/#{\s*key\s*}/g, t)
  }
  a(Mv, 'format')
  function Lv(e, t) {
    let o
    let i
    let r
    let n
    let l
    let u
    let c = !1
    ;(t || (t = {}), (o = t.debug || !1))
    try {
      ;((r = Av()),
        (n = document.createRange()),
        (l = document.getSelection()),
        (u = document.createElement('span')),
        (u.textContent = e),
        (u.ariaHidden = 'true'),
        (u.style.all = 'unset'),
        (u.style.position = 'fixed'),
        (u.style.top = 0),
        (u.style.clip = 'rect(0, 0, 0, 0)'),
        (u.style.whiteSpace =
          'p\
re'),
        (u.style.webkitUserSelect = 'text'),
        (u.style.MozUserSelect = 'text'),
        (u.style.msUserSelect = 'text'),
        (u.style.userSelect = 'text'),
        u.addEventListener('copy', function (p) {
          if ((p.stopPropagation(), t.format))
            if ((p.preventDefault(), typeof p.clipboardData > 'u')) {
              ;(o && console.warn('unable to use e.clipboardData'),
                o && console.warn('trying IE specific stuff'),
                window.clipboardData.clearData())
              const f = vu[t.format] || vu.default
              window.clipboardData.setData(f, e)
            } else
              (p.clipboardData.clearData(),
                p.clipboardData.setData(t.format, e))
          t.onCopy && (p.preventDefault(), t.onCopy(p.clipboardData))
        }),
        document.body.appendChild(u),
        n.selectNodeContents(u),
        l.addRange(n))
      const d = document.execCommand('copy')
      if (!d) throw new Error('copy command was unsuccessful')
      c = !0
    } catch (p) {
      ;(o && console.error('unable to copy using execCommand: ', p),
        o && console.warn('trying IE specific stuff'))
      try {
        ;(window.clipboardData.setData(t.format || 'text', e),
          t.onCopy && t.onCopy(window.clipboardData),
          (c = !0))
      } catch (f) {
        ;(o && console.error('unable to copy using clipboardData: ', f),
          o && console.error('falling back to prompt'),
          (i = Mv('message' in t ? t.message : Dv)),
          window.prompt(i, e))
      }
    } finally {
      ;(l &&
        (typeof l.removeRange === 'function'
          ? l.removeRange(n)
          : l.removeAllRanges()),
        u && document.body.removeChild(u),
        r())
    }
    return c
  }
  a(Lv, 'copy')
  xu.exports = Lv
})

// ../node_modules/downshift/node_modules/react-is/cjs/react-is.production.min.js
const Ep = we(pe => {
  'use strict'
  const Zi = Symbol.for('react.element')
  const Ji = Symbol.for('react.portal')
  const Kr = Symbol.for('react.fragment')
  const $r = Symbol.for(
    'react.strict_mo\
de'
  )
  const Ur = Symbol.for('react.profiler')
  const Gr = Symbol.for('react.provider')
  const qr = Symbol.for('react.context')
  const Dx = Symbol.for(
    'react.server_\
context'
  )
  const Yr = Symbol.for('react.forward_ref')
  const Qr = Symbol.for('react.suspense')
  const Xr = Symbol.for('react.suspense_list')
  const Zr = Symbol.for('react.memo')
  const Jr = Symbol.for('react.lazy')
  const Mx = Symbol.for('react.offscreen')
  let wp
  wp = Symbol.for('react.module.reference')
  function Ue(e) {
    if (typeof e === 'object' && e !== null) {
      const t = e.$$typeof
      switch (t) {
        case Zi:
          switch (((e = e.type), e)) {
            case Kr:
            case Ur:
            case $r:
            case Qr:
            case Xr:
              return e
            default:
              switch (((e = e && e.$$typeof), e)) {
                case Dx:
                case qr:
                case Yr:
                case Jr:
                case Zr:
                case Gr:
                  return e
                default:
                  return t
              }
          }
        case Ji:
          return t
      }
    }
  }
  a(Ue, 'v')
  pe.ContextConsumer = qr
  pe.ContextProvider = Gr
  pe.Element = Zi
  pe.ForwardRef = Yr
  pe.Fragment = Kr
  pe.Lazy = Jr
  pe.Memo = Zr
  pe.Portal = Ji
  pe.Profiler = Ur
  pe.StrictMode = $r
  pe.Suspense = Qr
  pe.SuspenseList = Xr
  pe.isAsyncMode = function () {
    return !1
  }
  pe.isConcurrentMode = function () {
    return !1
  }
  pe.isContextConsumer = function (e) {
    return Ue(e) === qr
  }
  pe.isContextProvider = function (e) {
    return Ue(e) === Gr
  }
  pe.isElement = function (e) {
    return typeof e === 'object' && e !== null && e.$$typeof === Zi
  }
  pe.isForwardRef = function (e) {
    return Ue(e) === Yr
  }
  pe.isFragment = function (e) {
    return Ue(e) === Kr
  }
  pe.isLazy = function (e) {
    return Ue(e) === Jr
  }
  pe.isMemo = function (e) {
    return Ue(e) === Zr
  }
  pe.isPortal = function (e) {
    return Ue(e) === Ji
  }
  pe.isProfiler = function (e) {
    return Ue(e) === Ur
  }
  pe.isStrictMode = function (e) {
    return Ue(e) === $r
  }
  pe.isSuspense = function (e) {
    return Ue(e) === Qr
  }
  pe.isSuspenseList = function (e) {
    return Ue(e) === Xr
  }
  pe.isValidElementType = function (e) {
    return (
      typeof e === 'string' ||
      typeof e === 'function' ||
      e === Kr ||
      e === Ur ||
      e === $r ||
      e === Qr ||
      e === Xr ||
      e === Mx ||
      (typeof e === 'object' &&
        e !== null &&
        (e.$$typeof === Jr ||
          e.$$typeof === Zr ||
          e.$$typeof === Gr ||
          e.$$typeof === qr ||
          e.$$typeof === Yr ||
          e.$$typeof === wp ||
          e.getModuleId !== void 0))
    )
  }
  pe.typeOf = Ue
})

// ../node_modules/downshift/node_modules/react-is/index.js
const Cp = we((AR, Tp) => {
  'use strict'
  Tp.exports = Ep()
})

// ../node_modules/fuse.js/dist/fuse.js
const Ld = we((jo, js) => {
  ;(function (e, t) {
    typeof jo === 'object' && typeof js === 'object'
      ? (js.exports = t())
      : typeof define === 'function' && define.amd
        ? define('Fuse', [], t)
        : typeof jo === 'object'
          ? (jo.Fuse = t())
          : (e.Fuse = t())
  })(jo, function () {
    return (function (e) {
      const t = {}
      function o(i) {
        if (t[i]) return t[i].exports
        const r = (t[i] = { i, l: !1, exports: {} })
        return (e[i].call(r.exports, r, r.exports, o), (r.l = !0), r.exports)
      }
      return (
        a(o, 'r'),
        (o.m = e),
        (o.c = t),
        (o.d = function (i, r, n) {
          o.o(i, r) || Object.defineProperty(i, r, { enumerable: !0, get: n })
        }),
        (o.r = function (i) {
          ;(typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(i, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(i, '__esModule', { value: !0 }))
        }),
        (o.t = function (i, r) {
          if (
            (1 & r && (i = o(i)),
            8 & r || (4 & r && typeof i === 'object' && i && i.__esModule))
          )
            return i
          const n = /* @__PURE__ */ Object.create(null)
          if (
            (o.r(n),
            Object.defineProperty(n, 'default', { enumerable: !0, value: i }),
            2 & r && typeof i !== 'string')
          )
            for (const l in i)
              o.d(
                n,
                l,
                function (u) {
                  return i[u]
                }.bind(null, l)
              )
          return n
        }),
        (o.n = function (i) {
          const r =
            i && i.__esModule
              ? function () {
                  return i.default
                }
              : function () {
                  return i
                }
          return (o.d(r, 'a', r), r)
        }),
        (o.o = function (i, r) {
          return Object.prototype.hasOwnProperty.call(i, r)
        }),
        (o.p = ''),
        o((o.s = 0))
      )
    })([
      function (e, t, o) {
        function i(p) {
          return (i =
            typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
              ? function (f) {
                  return typeof f
                }
              : function (f) {
                  return f &&
                    typeof Symbol === 'function' &&
                    f.constructor === Symbol &&
                    f !== Symbol.prototype
                    ? 'symbol'
                    : typeof f
                })(p)
        }
        a(i, 'n')
        function r(p, f) {
          for (let h = 0; h < f.length; h++) {
            const y = f[h]
            ;((y.enumerable = y.enumerable || !1),
              (y.configurable = !0),
              'value' in y && (y.writable = !0),
              Object.defineProperty(p, y.key, y))
          }
        }
        a(r, 'o')
        const n = o(1)
        const l = o(7)
        const u = l.get
        const c = (l.deepValue, l.isArray)
        const d = (function () {
          function p(m, b) {
            const x = b.location
            const E = x === void 0 ? 0 : x
            const g = b.distance
            const v = g === void 0 ? 100 : g
            const S = b.threshold
            const w = S === void 0 ? 0.6 : S
            const k = b.maxPatternLength
            const _ = k === void 0 ? 32 : k
            const C = b.caseSensitive
            const T = C !== void 0 && C
            const O = b.tokenSeparator
            const P = O === void 0 ? / +/g : O
            const D = b.findAllMatches
            const M = D !== void 0 && D
            const F = b.minMatchCharLength
            const Z = F === void 0 ? 1 : F
            const V = b.id
            const Q = V === void 0 ? null : V
            const z = b.keys
            const q = z === void 0 ? [] : z
            const W = b.shouldSort
            const re = W === void 0 || W
            const R = b.getFn
            const B = R === void 0 ? u : R
            const L = b.sortFn
            const $ =
              L === void 0
                ? function (fe, Se) {
                    return fe.score - Se.score
                  }
                : L
            const J = b.tokenize
            const ie = J !== void 0 && J
            const te = b.matchAllTokens
            const de = te !== void 0 && te
            const ae = b.includeMatches
            const ce = ae !== void 0 && ae
            const ue = b.includeScore
            const Ie = ue !== void 0 && ue
            const ye = b.verbose
            const Oe = ye !== void 0 && ye
            ;((function (fe, Se) {
              if (!(fe instanceof Se))
                throw new TypeError('Cannot call a class as a function')
            })(this, p),
              (this.options = {
                location: E,
                distance: v,
                threshold: w,
                maxPatternLength: _,
                isCaseSensitive: T,
                tokenSeparator: P,
                findAllMatches: M,
                minMatchCharLength: Z,
                id: Q,
                keys: q,
                includeMatches: ce,
                includeScore: Ie,
                shouldSort: re,
                getFn: B,
                sortFn: $,
                verbose: Oe,
                tokenize: ie,
                matchAllTokens: de,
              }),
              this.setCollection(m),
              this._processKeys(q))
          }
          a(p, 'e')
          let f, h, y
          return (
            (f = p),
            (h = [
              {
                key: 'setCollection',
                value: /* @__PURE__ */ a(function (m) {
                  return ((this.list = m), m)
                }, 'value'),
              },
              {
                key: '_processKeys',
                value: /* @__PURE__ */ a(function (m) {
                  if (
                    ((this._keyWeights = {}),
                    (this._keyNames = []),
                    m.length && typeof m[0] === 'string')
                  )
                    for (let b = 0, x = m.length; b < x; b += 1) {
                      const E = m[b]
                      ;((this._keyWeights[E] = 1), this._keyNames.push(E))
                    }
                  else {
                    for (
                      var g = null, v = null, S = 0, w = 0, k = m.length;
                      w < k;
                      w += 1
                    ) {
                      const _ = m[w]
                      if (!_.hasOwnProperty('name'))
                        throw new Error('Missing "name" property in key object')
                      const C = _.name
                      if ((this._keyNames.push(C), !_.hasOwnProperty('weight')))
                        throw new Error(
                          'Missing "weight" property in key object'
                        )
                      const T = _.weight
                      if (T < 0 || T > 1)
                        throw new Error(
                          '"weight" property in key must bein the range of [0, 1)'
                        )
                      ;((v = v == null ? T : Math.max(v, T)),
                        (g = g == null ? T : Math.min(g, T)),
                        (this._keyWeights[C] = T),
                        (S += T))
                    }
                    if (S > 1)
                      throw new Error('Total of weights cannot exceed 1')
                  }
                }, 'value'),
              },
              {
                key: 'search',
                value: /* @__PURE__ */ a(function (m) {
                  const b =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : { limit: !1 }
                  this._log(
                    `---------
Search pattern: "`.concat(m, '"')
                  )
                  const x = this._prepareSearchers(m)
                  const E = x.tokenSearchers
                  const g = x.fullSearcher
                  let v = this._search(E, g)
                  return (
                    this._computeScore(v),
                    this.options.shouldSort && this._sort(v),
                    b.limit &&
                      typeof b.limit === 'number' &&
                      (v = v.slice(0, b.limit)),
                    this._format(v)
                  )
                }, 'value'),
              },
              {
                key: '_prepareSearchers',
                value: /* @__PURE__ */ a(function () {
                  const m =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : ''
                  const b = []
                  if (this.options.tokenize)
                    for (
                      let x = m.split(this.options.tokenSeparator),
                        E = 0,
                        g = x.length;
                      E < g;
                      E += 1
                    )
                      b.push(new n(x[E], this.options))
                  return {
                    tokenSearchers: b,
                    fullSearcher: new n(m, this.options),
                  }
                }, 'value'),
              },
              {
                key: '_search',
                value: /* @__PURE__ */ a(function () {
                  const m =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : []
                  const b = arguments.length > 1 ? arguments[1] : void 0
                  const x = this.list
                  const E = {}
                  const g = []
                  if (typeof x[0] === 'string') {
                    for (let v = 0, S = x.length; v < S; v += 1)
                      this._analyze(
                        { key: '', value: x[v], record: v, index: v },
                        {
                          resultMap: E,
                          results: g,
                          tokenSearchers: m,
                          fullSearcher: b,
                        }
                      )
                    return g
                  }
                  for (let w = 0, k = x.length; w < k; w += 1)
                    for (
                      let _ = x[w], C = 0, T = this._keyNames.length;
                      C < T;
                      C += 1
                    ) {
                      const O = this._keyNames[C]
                      this._analyze(
                        {
                          key: O,
                          value: this.options.getFn(_, O),
                          record: _,
                          index: w,
                        },
                        {
                          resultMap: E,
                          results: g,
                          tokenSearchers: m,
                          fullSearcher: b,
                        }
                      )
                    }
                  return g
                }, 'value'),
              },
              {
                key: '_analyze',
                value: /* @__PURE__ */ a(function (m, b) {
                  const x = this
                  const E = m.key
                  const g = m.arrayIndex
                  const v = g === void 0 ? -1 : g
                  const S = m.value
                  const w = m.record
                  const k = m.index
                  const _ = b.tokenSearchers
                  const C = _ === void 0 ? [] : _
                  const T = b.fullSearcher
                  const O = b.resultMap
                  const P = O === void 0 ? {} : O
                  const D = b.results
                  const M = D === void 0 ? [] : D
                  /* @__PURE__ */ a(function F(Z, V, Q, z) {
                    if (V != null) {
                      if (typeof V === 'string') {
                        let q = !1
                        let W = -1
                        let re = 0
                        x._log(
                          `
Key: `.concat(E === '' ? '--' : E)
                        )
                        const R = T.search(V)
                        if (
                          (x._log(
                            'Full text: "'
                              .concat(V, '", score: ')
                              .concat(R.score)
                          ),
                          x.options.tokenize)
                        ) {
                          for (
                            var B = V.split(x.options.tokenSeparator),
                              L = B.length,
                              $ = [],
                              J = 0,
                              ie = C.length;
                            J < ie;
                            J += 1
                          ) {
                            const te = C[J]
                            x._log(
                              `
Pattern: "`.concat(te.pattern, '"')
                            )
                            for (var de = !1, ae = 0; ae < L; ae += 1) {
                              const ce = B[ae]
                              const ue = te.search(ce)
                              const Ie = {}
                              ;(ue.isMatch
                                ? ((Ie[ce] = ue.score),
                                  (q = !0),
                                  (de = !0),
                                  $.push(ue.score))
                                : ((Ie[ce] = 1),
                                  x.options.matchAllTokens || $.push(1)),
                                x._log(
                                  'Token: "'
                                    .concat(ce, '", score: ')
                                    .concat(Ie[ce])
                                ))
                            }
                            de && (re += 1)
                          }
                          W = $[0]
                          for (var ye = $.length, Oe = 1; Oe < ye; Oe += 1)
                            W += $[Oe]
                          ;((W /= ye), x._log('Token score average:', W))
                        }
                        let fe = R.score
                        ;(W > -1 && (fe = (fe + W) / 2),
                          x._log('Score average:', fe))
                        const Se =
                          !x.options.tokenize ||
                          !x.options.matchAllTokens ||
                          re >= C.length
                        if (
                          (x._log(
                            `
Check Matches: `.concat(Se)
                          ),
                          (q || R.isMatch) && Se)
                        ) {
                          const _e = {
                            key: E,
                            arrayIndex: Z,
                            value: V,
                            score: fe,
                          }
                          x.options.includeMatches &&
                            (_e.matchedIndices = R.matchedIndices)
                          const Ae = P[z]
                          Ae
                            ? Ae.output.push(_e)
                            : ((P[z] = { item: Q, output: [_e] }), M.push(P[z]))
                        }
                      } else if (c(V))
                        for (let et = 0, N = V.length; et < N; et += 1)
                          F(et, V[et], Q, z)
                    }
                  }, 'e')(v, S, w, k)
                }, 'value'),
              },
              {
                key: '_computeScore',
                value: /* @__PURE__ */ a(function (m) {
                  this._log(`

Computing score:
`)
                  for (
                    let b = this._keyWeights,
                      x = !!Object.keys(b).length,
                      E = 0,
                      g = m.length;
                    E < g;
                    E += 1
                  ) {
                    for (
                      var v = m[E], S = v.output, w = S.length, k = 1, _ = 0;
                      _ < w;
                      _ += 1
                    ) {
                      const C = S[_]
                      const T = C.key
                      const O = x ? b[T] : 1
                      const P =
                        C.score === 0 && b && b[T] > 0
                          ? Number.EPSILON
                          : C.score
                      k *= Math.pow(P, O)
                    }
                    ;((v.score = k), this._log(v))
                  }
                }, 'value'),
              },
              {
                key: '_sort',
                value: /* @__PURE__ */ a(function (m) {
                  ;(this._log(`

Sorting....`),
                    m.sort(this.options.sortFn))
                }, 'value'),
              },
              {
                key: '_format',
                value: /* @__PURE__ */ a(function (m) {
                  const b = []
                  if (this.options.verbose) {
                    let x = []
                    ;(this._log(
                      `

Output:

`,
                      JSON.stringify(
                        m,
                        function (C, T) {
                          if (i(T) === 'object' && T !== null) {
                            if (x.includes(T)) return
                            x.push(T)
                          }
                          return T
                        },
                        2
                      )
                    ),
                      (x = null))
                  }
                  const E = []
                  ;(this.options.includeMatches &&
                    E.push(function (C, T) {
                      const O = C.output
                      T.matches = []
                      for (let P = 0, D = O.length; P < D; P += 1) {
                        const M = O[P]
                        if (M.matchedIndices.length !== 0) {
                          const F = {
                            indices: M.matchedIndices,
                            value: M.value,
                          }
                          ;(M.key && (F.key = M.key),
                            M.hasOwnProperty('arrayIndex') &&
                              M.arrayIndex > -1 &&
                              (F.arrayIndex = M.arrayIndex),
                            T.matches.push(F))
                        }
                      }
                    }),
                    this.options.includeScore &&
                      E.push(function (C, T) {
                        T.score = C.score
                      }))
                  for (let g = 0, v = m.length; g < v; g += 1) {
                    const S = m[g]
                    if (
                      (this.options.id &&
                        (S.item = this.options.getFn(
                          S.item,
                          this.options.id
                        )[0]),
                      E.length)
                    ) {
                      for (
                        var w = { item: S.item }, k = 0, _ = E.length;
                        k < _;
                        k += 1
                      )
                        E[k](S, w)
                      b.push(w)
                    } else b.push(S.item)
                  }
                  return b
                }, 'value'),
              },
              {
                key: '_log',
                value: /* @__PURE__ */ a(function () {
                  let m
                  this.options.verbose && (m = console).log.apply(m, arguments)
                }, 'value'),
              },
            ]) && r(f.prototype, h),
            y && r(f, y),
            p
          )
        })()
        e.exports = d
      },
      function (e, t, o) {
        function i(c, d) {
          for (let p = 0; p < d.length; p++) {
            const f = d[p]
            ;((f.enumerable = f.enumerable || !1),
              (f.configurable = !0),
              'value' in f && (f.writable = !0),
              Object.defineProperty(c, f.key, f))
          }
        }
        a(i, 'n')
        const r = o(2)
        const n = o(3)
        const l = o(6)
        const u = (function () {
          function c(h, y) {
            const m = y.location
            const b = m === void 0 ? 0 : m
            const x = y.distance
            const E = x === void 0 ? 100 : x
            const g = y.threshold
            const v = g === void 0 ? 0.6 : g
            const S = y.maxPatternLength
            const w = S === void 0 ? 32 : S
            const k = y.isCaseSensitive
            const _ = k !== void 0 && k
            const C = y.tokenSeparator
            const T = C === void 0 ? / +/g : C
            const O = y.findAllMatches
            const P = O !== void 0 && O
            const D = y.minMatchCharLength
            const M = D === void 0 ? 1 : D
            const F = y.includeMatches
            const Z = F !== void 0 && F
            ;((function (V, Q) {
              if (!(V instanceof Q))
                throw new TypeError('Cannot call a class as a function')
            })(this, c),
              (this.options = {
                location: b,
                distance: E,
                threshold: v,
                maxPatternLength: w,
                isCaseSensitive: _,
                tokenSeparator: T,
                findAllMatches: P,
                includeMatches: Z,
                minMatchCharLength: M,
              }),
              (this.pattern = _ ? h : h.toLowerCase()),
              this.pattern.length <= w &&
                (this.patternAlphabet = l(this.pattern)))
          }
          a(c, 'e')
          let d, p, f
          return (
            (d = c),
            (p = [
              {
                key: 'search',
                value: /* @__PURE__ */ a(function (h) {
                  const y = this.options
                  const m = y.isCaseSensitive
                  const b = y.includeMatches
                  if ((m || (h = h.toLowerCase()), this.pattern === h)) {
                    const x = { isMatch: !0, score: 0 }
                    return (b && (x.matchedIndices = [[0, h.length - 1]]), x)
                  }
                  const E = this.options
                  const g = E.maxPatternLength
                  const v = E.tokenSeparator
                  if (this.pattern.length > g) return r(h, this.pattern, v)
                  const S = this.options
                  const w = S.location
                  const k = S.distance
                  const _ = S.threshold
                  const C = S.findAllMatches
                  const T = S.minMatchCharLength
                  return n(h, this.pattern, this.patternAlphabet, {
                    location: w,
                    distance: k,
                    threshold: _,
                    findAllMatches: C,
                    minMatchCharLength: T,
                    includeMatches: b,
                  })
                }, 'value'),
              },
            ]) && i(d.prototype, p),
            f && i(d, f),
            c
          )
        })()
        e.exports = u
      },
      function (e, t) {
        const o = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g
        e.exports = function (i, r) {
          const n =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : / +/g
          const l = new RegExp(r.replace(o, '\\$&').replace(n, '|'))
          const u = i.match(l)
          const c = !!u
          const d = []
          if (c)
            for (let p = 0, f = u.length; p < f; p += 1) {
              const h = u[p]
              d.push([i.indexOf(h), h.length - 1])
            }
          return { score: c ? 0.5 : 1, isMatch: c, matchedIndices: d }
        }
      },
      function (e, t, o) {
        const i = o(4)
        const r = o(5)
        e.exports = function (n, l, u, c) {
          for (
            var d = c.location,
              p = d === void 0 ? 0 : d,
              f = c.distance,
              h = f === void 0 ? 100 : f,
              y = c.threshold,
              m = y === void 0 ? 0.6 : y,
              b = c.findAllMatches,
              x = b !== void 0 && b,
              E = c.minMatchCharLength,
              g = E === void 0 ? 1 : E,
              v = c.includeMatches,
              S = v !== void 0 && v,
              w = p,
              k = n.length,
              _ = m,
              C = n.indexOf(l, w),
              T = l.length,
              O = [],
              P = 0;
            P < k;
            P += 1
          )
            O[P] = 0
          if (C !== -1) {
            const D = i(l, {
              errors: 0,
              currentLocation: C,
              expectedLocation: w,
              distance: h,
            })
            if (((_ = Math.min(D, _)), (C = n.lastIndexOf(l, w + T)) !== -1)) {
              const M = i(l, {
                errors: 0,
                currentLocation: C,
                expectedLocation: w,
                distance: h,
              })
              _ = Math.min(M, _)
            }
          }
          C = -1
          for (
            var F = [],
              Z = 1,
              V = T + k,
              Q = 1 << (T <= 31 ? T - 1 : 30),
              z = 0;
            z < T;
            z += 1
          ) {
            for (var q = 0, W = V; q < W; )
              (i(l, {
                errors: z,
                currentLocation: w + W,
                expectedLocation: w,
                distance: h,
              }) <= _
                ? (q = W)
                : (V = W),
                (W = Math.floor((V - q) / 2 + q)))
            V = W
            let re = Math.max(1, w - W + 1)
            const R = x ? k : Math.min(w + W, k) + T
            const B = Array(R + 2)
            B[R + 1] = (1 << z) - 1
            for (let L = R; L >= re; L -= 1) {
              const $ = L - 1
              const J = u[n.charAt($)]
              if (
                (J && (O[$] = 1),
                (B[L] = ((B[L + 1] << 1) | 1) & J),
                z !== 0 && (B[L] |= ((F[L + 1] | F[L]) << 1) | 1 | F[L + 1]),
                B[L] & Q &&
                  (Z = i(l, {
                    errors: z,
                    currentLocation: $,
                    expectedLocation: w,
                    distance: h,
                  })) <= _)
              ) {
                if (((_ = Z), (C = $) <= w)) break
                re = Math.max(1, 2 * w - C)
              }
            }
            if (
              i(l, {
                errors: z + 1,
                currentLocation: w,
                expectedLocation: w,
                distance: h,
              }) > _
            )
              break
            F = B
          }
          const ie = { isMatch: C >= 0, score: Z === 0 ? 1e-3 : Z }
          return (S && (ie.matchedIndices = r(O, g)), ie)
        }
      },
      function (e, t) {
        e.exports = function (o, i) {
          const r = i.errors
          const n = r === void 0 ? 0 : r
          const l = i.currentLocation
          const u = l === void 0 ? 0 : l
          const c = i.expectedLocation
          const d = c === void 0 ? 0 : c
          const p = i.distance
          const f = p === void 0 ? 100 : p
          const h = n / o.length
          const y = Math.abs(d - u)
          return f ? h + y / f : y ? 1 : h
        }
      },
      function (e, t) {
        e.exports = function () {
          for (
            var o =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : [],
              i =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : 1,
              r = [],
              n = -1,
              l = -1,
              u = 0,
              c = o.length;
            u < c;
            u += 1
          ) {
            const d = o[u]
            d && n === -1
              ? (n = u)
              : d ||
                n === -1 ||
                ((l = u - 1) - n + 1 >= i && r.push([n, l]), (n = -1))
          }
          return (o[u - 1] && u - n >= i && r.push([n, u - 1]), r)
        }
      },
      function (e, t) {
        e.exports = function (o) {
          for (var i = {}, r = o.length, n = 0; n < r; n += 1)
            i[o.charAt(n)] = 0
          for (let l = 0; l < r; l += 1) i[o.charAt(l)] |= 1 << (r - l - 1)
          return i
        }
      },
      function (e, t) {
        const o = /* @__PURE__ */ a(function (l) {
          return Array.isArray
            ? Array.isArray(l)
            : Object.prototype.toString.call(l) === '[object Array]'
        }, 'r')
        const i = /* @__PURE__ */ a(function (l) {
          return l == null
            ? ''
            : (function (u) {
                if (typeof u === 'string') return u
                const c = u + ''
                return c == '0' && 1 / u == -1 / 0 ? '-0' : c
              })(l)
        }, 'n')
        const r = /* @__PURE__ */ a(function (l) {
          return typeof l === 'string'
        }, 'o')
        const n = /* @__PURE__ */ a(function (l) {
          return typeof l === 'number'
        }, 'i')
        e.exports = {
          get: /* @__PURE__ */ a(function (l, u) {
            const c = []
            return /* @__PURE__ */ (
              a(function d(p, f) {
                if (f) {
                  const h = f.indexOf('.')
                  let y = f
                  let m = null
                  h !== -1 && ((y = f.slice(0, h)), (m = f.slice(h + 1)))
                  const b = p[y]
                  if (b != null)
                    if (m || (!r(b) && !n(b)))
                      if (o(b))
                        for (let x = 0, E = b.length; x < E; x += 1) d(b[x], m)
                      else m && d(b, m)
                    else c.push(i(b))
                } else c.push(p)
              }, 'e')(l, u),
              c
            )
          }, 'get'),
          isArray: o,
          isString: r,
          isNum: n,
          toString: i,
        }
      },
    ])
  })
})

// ../node_modules/store2/dist/store2.js
const Ud = we((bn, vn) => {
  ;(function (e, t) {
    var o = {
      version: '2.14.4',
      areas: {},
      apis: {},
      nsdelim: '.',
      // utilities
      inherit: /* @__PURE__ */ a(function (r, n) {
        for (const l in r)
          n.hasOwnProperty(l) ||
            Object.defineProperty(n, l, Object.getOwnPropertyDescriptor(r, l))
        return n
      }, 'inherit'),
      stringify: /* @__PURE__ */ a(function (r, n) {
        return r === void 0 || typeof r === 'function'
          ? r + ''
          : JSON.stringify(r, n || o.replace)
      }, 'stringify'),
      parse: /* @__PURE__ */ a(function (r, n) {
        try {
          return JSON.parse(r, n || o.revive)
        } catch {
          return r
        }
      }, 'parse'),
      // extension hooks
      fn: /* @__PURE__ */ a(function (r, n) {
        o.storeAPI[r] = n
        for (const l in o.apis) o.apis[l][r] = n
      }, 'fn'),
      get: /* @__PURE__ */ a(function (r, n) {
        return r.getItem(n)
      }, 'get'),
      set: /* @__PURE__ */ a(function (r, n, l) {
        r.setItem(n, l)
      }, 'set'),
      remove: /* @__PURE__ */ a(function (r, n) {
        r.removeItem(n)
      }, 'remove'),
      key: /* @__PURE__ */ a(function (r, n) {
        return r.key(n)
      }, 'key'),
      length: /* @__PURE__ */ a(function (r) {
        return r.length
      }, 'length'),
      clear: /* @__PURE__ */ a(function (r) {
        r.clear()
      }, 'clear'),
      // core functions
      Store: /* @__PURE__ */ a(function (r, n, l) {
        var u = o.inherit(o.storeAPI, function (d, p, f) {
          return arguments.length === 0
            ? u.getAll()
            : typeof p === 'function'
              ? u.transact(d, p, f)
              : p !== void 0
                ? u.set(d, p, f)
                : typeof d === 'string' || typeof d === 'number'
                  ? u.get(d)
                  : typeof d === 'function'
                    ? u.each(d)
                    : d
                      ? u.setAll(d, p)
                      : u.clear()
        })
        u._id = r
        try {
          const c = '__store2_test'
          ;(n.setItem(c, 'ok'), (u._area = n), n.removeItem(c))
        } catch {
          u._area = o.storage('fake')
        }
        return (
          (u._ns = l || ''),
          o.areas[r] || (o.areas[r] = u._area),
          o.apis[u._ns + u._id] || (o.apis[u._ns + u._id] = u),
          u
        )
      }, 'Store'),
      storeAPI: {
        // admin functions
        area: /* @__PURE__ */ a(function (r, n) {
          let l = this[r]
          return (
            (!l || !l.area) &&
              ((l = o.Store(r, n, this._ns)), this[r] || (this[r] = l)),
            l
          )
        }, 'area'),
        namespace: /* @__PURE__ */ a(function (r, n, l) {
          if (((l = l || this._delim || o.nsdelim), !r))
            return this._ns
              ? this._ns.substring(0, this._ns.length - l.length)
              : ''
          const u = r
          let c = this[u]
          if (
            (!c || !c.namespace) &&
            ((c = o.Store(this._id, this._area, this._ns + u + l)),
            (c._delim = l),
            this[u] || (this[u] = c),
            !n)
          )
            for (const d in o.areas) c.area(d, o.areas[d])
          return c
        }, 'namespace'),
        isFake: /* @__PURE__ */ a(function (r) {
          return (
            r
              ? ((this._real = this._area), (this._area = o.storage('fake')))
              : r === !1 && (this._area = this._real || this._area),
            this._area.name === 'fake'
          )
        }, 'isFake'),
        toString: /* @__PURE__ */ a(function () {
          return (
            'store' +
            (this._ns ? '.' + this.namespace() : '') +
            '[' +
            this._id +
            ']'
          )
        }, 'toString'),
        // storage functions
        has: /* @__PURE__ */ a(function (r) {
          return this._area.has
            ? this._area.has(this._in(r))
            : this._in(r) in this._area
        }, 'has'),
        size: /* @__PURE__ */ a(function () {
          return this.keys().length
        }, 'size'),
        each: /* @__PURE__ */ a(function (r, n) {
          for (let l = 0, u = o.length(this._area); l < u; l++) {
            const c = this._out(o.key(this._area, l))
            if (c !== void 0 && r.call(this, c, this.get(c), n) === !1) break
            u > o.length(this._area) && (u--, l--)
          }
          return n || this
        }, 'each'),
        keys: /* @__PURE__ */ a(function (r) {
          return this.each(function (n, l, u) {
            u.push(n)
          }, r || [])
        }, 'keys'),
        get: /* @__PURE__ */ a(function (r, n) {
          const l = o.get(this._area, this._in(r))
          let u
          return (
            typeof n === 'function' && ((u = n), (n = null)),
            l !== null ? o.parse(l, u) : (n ?? l)
          )
        }, 'get'),
        getAll: /* @__PURE__ */ a(function (r) {
          return this.each(function (n, l, u) {
            u[n] = l
          }, r || {})
        }, 'getAll'),
        transact: /* @__PURE__ */ a(function (r, n, l) {
          const u = this.get(r, l)
          const c = n(u)
          return (this.set(r, c === void 0 ? u : c), this)
        }, 'transact'),
        set: /* @__PURE__ */ a(function (r, n, l) {
          const u = this.get(r)
          let c
          return u != null && l === !1
            ? n
            : (typeof l === 'function' && ((c = l), (l = void 0)),
              o.set(this._area, this._in(r), o.stringify(n, c), l) || u)
        }, 'set'),
        setAll: /* @__PURE__ */ a(function (r, n) {
          let l, u
          for (const c in r) ((u = r[c]), this.set(c, u, n) !== u && (l = !0))
          return l
        }, 'setAll'),
        add: /* @__PURE__ */ a(function (r, n, l) {
          const u = this.get(r)
          if (u instanceof Array) n = u.concat(n)
          else if (u !== null) {
            const c = typeof u
            if (c === typeof n && c === 'object') {
              for (const d in n) u[d] = n[d]
              n = u
            } else n = u + n
          }
          return (o.set(this._area, this._in(r), o.stringify(n, l)), n)
        }, 'add'),
        remove: /* @__PURE__ */ a(function (r, n) {
          const l = this.get(r, n)
          return (o.remove(this._area, this._in(r)), l)
        }, 'remove'),
        clear: /* @__PURE__ */ a(function () {
          return (
            this._ns
              ? this.each(function (r) {
                  o.remove(this._area, this._in(r))
                }, 1)
              : o.clear(this._area),
            this
          )
        }, 'clear'),
        clearAll: /* @__PURE__ */ a(function () {
          const r = this._area
          for (const n in o.areas)
            o.areas.hasOwnProperty(n) &&
              ((this._area = o.areas[n]), this.clear())
          return ((this._area = r), this)
        }, 'clearAll'),
        // internal use functions
        _in: /* @__PURE__ */ a(function (r) {
          return (
            typeof r !== 'string' && (r = o.stringify(r)),
            this._ns ? this._ns + r : r
          )
        }, '_in'),
        _out: /* @__PURE__ */ a(function (r) {
          return this._ns
            ? r && r.indexOf(this._ns) === 0
              ? r.substring(this._ns.length)
              : void 0
            : // so each() knows to skip it
              r
        }, '_out'),
      },
      // end _.storeAPI
      storage: /* @__PURE__ */ a(function (r) {
        return o.inherit(o.storageAPI, { items: {}, name: r })
      }, 'storage'),
      storageAPI: {
        length: 0,
        has: /* @__PURE__ */ a(function (r) {
          return this.items.hasOwnProperty(r)
        }, 'has'),
        key: /* @__PURE__ */ a(function (r) {
          let n = 0
          for (const l in this.items) if (this.has(l) && r === n++) return l
        }, 'key'),
        setItem: /* @__PURE__ */ a(function (r, n) {
          ;(this.has(r) || this.length++, (this.items[r] = n))
        }, 'setItem'),
        removeItem: /* @__PURE__ */ a(function (r) {
          this.has(r) && (delete this.items[r], this.length--)
        }, 'removeItem'),
        getItem: /* @__PURE__ */ a(function (r) {
          return this.has(r) ? this.items[r] : null
        }, 'getItem'),
        clear: /* @__PURE__ */ a(function () {
          for (const r in this.items) this.removeItem(r)
        }, 'clear'),
      },
      // end _.storageAPI
    }
    const i =
      // safely set this up (throws error in IE10/32bit mode for local files)
      o.Store(
        'local',
        (function () {
          try {
            return localStorage
          } catch {}
        })()
      )
    ;((i.local = i),
      (i._ = o),
      i.area(
        'session',
        (function () {
          try {
            return sessionStorage
          } catch {}
        })()
      ),
      i.area('page', o.storage('page')),
      typeof t === 'function' && t.amd !== void 0
        ? t('store2', [], function () {
            return i
          })
        : typeof vn < 'u' && vn.exports
          ? (vn.exports = i)
          : (e.store && (o.conflict = e.store), (e.store = i)))
  })(bn, bn && bn.define)
})

// global-externals:react
const s = __REACT__
const {
  Children: gw,
  Component: Le,
  Fragment: Ee,
  Profiler: yw,
  PureComponent: bw,
  StrictMode: vw,
  Suspense: xw,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Iw,
  act: Sw,
  cloneElement: ta,
  createContext: Qt,
  createElement: ww,
  createFactory: Ew,
  createRef: Tw,
  forwardRef: oa,
  isValidElement: Cw,
  lazy: _w,
  memo: _t,
  startTransition: kw,
  unstable_act: Ow,
  useCallback: A,
  useContext: qo,
  useDebugValue: Pw,
  useDeferredValue: ra,
  useEffect: H,
  useId: na,
  useImperativeHandle: Aw,
  useInsertionEffect: Dw,
  useLayoutEffect: Xt,
  useMemo: G,
  useReducer: Zt,
  useRef: U,
  useState: K,
  useSyncExternalStore: Mw,
  useTransition: ia,
  version: Lw,
} = __REACT__

// global-externals:storybook/internal/channels
const Nw = __STORYBOOK_CHANNELS__
const {
  Channel: Fw,
  HEARTBEAT_INTERVAL: Rw,
  HEARTBEAT_MAX_LATENCY: Bw,
  PostMessageTransport: Hw,
  WebsocketTransport: zw,
  createBrowserChannel: sa,
} = __STORYBOOK_CHANNELS__

// global-externals:storybook/internal/core-events
const Vw = __STORYBOOK_CORE_EVENTS__
const {
  ARGTYPES_INFO_REQUEST: aa,
  ARGTYPES_INFO_RESPONSE: la,
  CHANNEL_CREATED: ua,
  CHANNEL_WS_DISCONNECT: ca,
  CONFIG_ERROR: jw,
  CREATE_NEW_STORYFILE_REQUEST: pa,
  CREATE_NEW_STORYFILE_RESPONSE: da,
  CURRENT_STORY_WAS_SET: Kw,
  DOCS_PREPARED: $w,
  DOCS_RENDERED: Uw,
  FILE_COMPONENT_SEARCH_REQUEST: fa,
  FILE_COMPONENT_SEARCH_RESPONSE: Yo,
  FORCE_REMOUNT: Sn,
  FORCE_RE_RENDER: Gw,
  GLOBALS_UPDATED: qw,
  NAVIGATE_URL: Yw,
  PLAY_FUNCTION_THREW_EXCEPTION: Qw,
  PRELOAD_ENTRIES: kt,
  PREVIEW_BUILDER_PROGRESS: ma,
  PREVIEW_KEYDOWN: Xw,
  REGISTER_SUBSCRIPTION: Zw,
  REQUEST_WHATS_NEW_DATA: Jw,
  RESET_STORY_ARGS: eE,
  RESULT_WHATS_NEW_DATA: tE,
  SAVE_STORY_REQUEST: ha,
  SAVE_STORY_RESPONSE: ga,
  SELECT_STORY: oE,
  SET_CONFIG: rE,
  SET_CURRENT_STORY: ya,
  SET_FILTER: nE,
  SET_GLOBALS: iE,
  SET_INDEX: sE,
  SET_STORIES: aE,
  SET_WHATS_NEW_CACHE: lE,
  SHARED_STATE_CHANGED: uE,
  SHARED_STATE_SET: cE,
  STORIES_COLLAPSE_ALL: ho,
  STORIES_EXPAND_ALL: wn,
  STORY_ARGS_UPDATED: pE,
  STORY_CHANGED: dE,
  STORY_ERRORED: fE,
  STORY_FINISHED: mE,
  STORY_HOT_UPDATED: hE,
  STORY_INDEX_INVALIDATED: gE,
  STORY_MISSING: yE,
  STORY_PREPARED: bE,
  STORY_RENDERED: vE,
  STORY_RENDER_PHASE_CHANGED: xE,
  STORY_SPECIFIED: IE,
  STORY_THREW_EXCEPTION: SE,
  STORY_UNCHANGED: wE,
  TELEMETRY_ERROR: EE,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: TE,
  UNHANDLED_ERRORS_WHILE_PLAYING: CE,
  UPDATE_GLOBALS: _E,
  UPDATE_QUERY_PARAMS: kE,
  UPDATE_STORY_ARGS: OE,
} = __STORYBOOK_CORE_EVENTS__

// ../node_modules/@storybook/global/dist/index.mjs
const se = (() => {
  let e
  return (
    typeof window < 'u'
      ? (e = window)
      : typeof globalThis < 'u'
        ? (e = globalThis)
        : typeof global < 'u'
          ? (e = global)
          : typeof self < 'u'
            ? (e = self)
            : (e = {}),
    e
  )
})()

// global-externals:@storybook/icons
const oi = {}
vf(oi, {
  AccessibilityAltIcon: () => wf,
  AccessibilityIcon: () => Ef,
  AccessibilityIgnoredIcon: () => Tf,
  AddIcon: () => Cf,
  AdminIcon: () => _f,
  AlertAltIcon: () => kf,
  AlertIcon: () => go,
  AlignLeftIcon: () => Of,
  AlignRightIcon: () => Pf,
  AppleIcon: () => Af,
  ArrowBottomLeftIcon: () => Df,
  ArrowBottomRightIcon: () => Mf,
  ArrowDownIcon: () => Lf,
  ArrowLeftIcon: () => En,
  ArrowRightIcon: () => Nf,
  ArrowSolidDownIcon: () => Ff,
  ArrowSolidLeftIcon: () => Rf,
  ArrowSolidRightIcon: () => Bf,
  ArrowSolidUpIcon: () => Hf,
  ArrowTopLeftIcon: () => zf,
  ArrowTopRightIcon: () => Wf,
  ArrowUpIcon: () => Vf,
  AzureDevOpsIcon: () => jf,
  BackIcon: () => Kf,
  BasketIcon: () => $f,
  BatchAcceptIcon: () => Uf,
  BatchDenyIcon: () => Gf,
  BeakerIcon: () => qf,
  BellIcon: () => Yf,
  BitbucketIcon: () => Qf,
  BoldIcon: () => Xf,
  BookIcon: () => Zf,
  BookmarkHollowIcon: () => Jf,
  BookmarkIcon: () => em,
  BottomBarIcon: () => yo,
  BottomBarToggleIcon: () => Tn,
  BoxIcon: () => tm,
  BranchIcon: () => om,
  BrowserIcon: () => rm,
  ButtonIcon: () => nm,
  CPUIcon: () => im,
  CalendarIcon: () => sm,
  CameraIcon: () => am,
  CameraStabilizeIcon: () => lm,
  CategoryIcon: () => um,
  CertificateIcon: () => cm,
  ChangedIcon: () => pm,
  ChatIcon: () => dm,
  CheckIcon: () => Be,
  ChevronDownIcon: () => Ot,
  ChevronLeftIcon: () => fm,
  ChevronRightIcon: () => Cn,
  ChevronSmallDownIcon: () => mm,
  ChevronSmallLeftIcon: () => hm,
  ChevronSmallRightIcon: () => gm,
  ChevronSmallUpIcon: () => _n,
  ChevronUpIcon: () => ym,
  ChromaticIcon: () => bm,
  ChromeIcon: () => vm,
  CircleHollowIcon: () => xm,
  CircleIcon: () => kn,
  ClearIcon: () => Im,
  CloseAltIcon: () => bo,
  CloseIcon: () => je,
  CloudHollowIcon: () => Sm,
  CloudIcon: () => wm,
  CogIcon: () => Qo,
  CollapseIcon: () => On,
  CommandIcon: () => Pn,
  CommentAddIcon: () => Em,
  CommentIcon: () => Tm,
  CommentsIcon: () => Cm,
  CommitIcon: () => _m,
  CompassIcon: () => km,
  ComponentDrivenIcon: () => Om,
  ComponentIcon: () => Xo,
  ContrastIcon: () => Pm,
  ContrastIgnoredIcon: () => Am,
  ControlsIcon: () => Dm,
  CopyIcon: () => Mm,
  CreditIcon: () => Lm,
  CrossIcon: () => Nm,
  DashboardIcon: () => Fm,
  DatabaseIcon: () => Rm,
  DeleteIcon: () => Bm,
  DiamondIcon: () => Hm,
  DirectionIcon: () => zm,
  DiscordIcon: () => Wm,
  DocChartIcon: () => Vm,
  DocListIcon: () => jm,
  DocumentIcon: () => Pt,
  DownloadIcon: () => Km,
  DragIcon: () => $m,
  EditIcon: () => Um,
  EllipsisIcon: () => An,
  EmailIcon: () => Gm,
  ExpandAltIcon: () => Dn,
  ExpandIcon: () => Mn,
  EyeCloseIcon: () => Ln,
  EyeIcon: () => Nn,
  FaceHappyIcon: () => qm,
  FaceNeutralIcon: () => Ym,
  FaceSadIcon: () => Qm,
  FacebookIcon: () => Xm,
  FailedIcon: () => Fn,
  FastForwardIcon: () => Zm,
  FigmaIcon: () => Jm,
  FilterIcon: () => Rn,
  FlagIcon: () => eh,
  FolderIcon: () => th,
  FormIcon: () => oh,
  GDriveIcon: () => rh,
  GithubIcon: () => vo,
  GitlabIcon: () => nh,
  GlobeIcon: () => Zo,
  GoogleIcon: () => ih,
  GraphBarIcon: () => sh,
  GraphLineIcon: () => ah,
  GraphqlIcon: () => lh,
  GridAltIcon: () => uh,
  GridIcon: () => ch,
  GrowIcon: () => ph,
  HeartHollowIcon: () => dh,
  HeartIcon: () => Bn,
  HomeIcon: () => fh,
  HourglassIcon: () => mh,
  InfoIcon: () => Hn,
  ItalicIcon: () => hh,
  JumpToIcon: () => gh,
  KeyIcon: () => yh,
  LightningIcon: () => zn,
  LightningOffIcon: () => bh,
  LinkBrokenIcon: () => vh,
  LinkIcon: () => Wn,
  LinkedinIcon: () => xh,
  LinuxIcon: () => Ih,
  ListOrderedIcon: () => Sh,
  ListUnorderedIcon: () => wh,
  LocationIcon: () => Eh,
  LockIcon: () => xo,
  MarkdownIcon: () => Th,
  MarkupIcon: () => Vn,
  MediumIcon: () => Ch,
  MemoryIcon: () => _h,
  MenuIcon: () => Io,
  MergeIcon: () => kh,
  MirrorIcon: () => Oh,
  MobileIcon: () => Ph,
  MoonIcon: () => Ah,
  NutIcon: () => Dh,
  OutboxIcon: () => Mh,
  OutlineIcon: () => Lh,
  PaintBrushIcon: () => Nh,
  PaperClipIcon: () => Fh,
  ParagraphIcon: () => Rh,
  PassedIcon: () => Bh,
  PhoneIcon: () => Hh,
  PhotoDragIcon: () => zh,
  PhotoIcon: () => Wh,
  PhotoStabilizeIcon: () => Vh,
  PinAltIcon: () => jh,
  PinIcon: () => Kh,
  PlayAllHollowIcon: () => jn,
  PlayBackIcon: () => $h,
  PlayHollowIcon: () => Uh,
  PlayIcon: () => Gh,
  PlayNextIcon: () => qh,
  PlusIcon: () => Kn,
  PointerDefaultIcon: () => Yh,
  PointerHandIcon: () => Qh,
  PowerIcon: () => Xh,
  PrintIcon: () => Zh,
  ProceedIcon: () => Jh,
  ProfileIcon: () => eg,
  PullRequestIcon: () => tg,
  QuestionIcon: () => og,
  RSSIcon: () => rg,
  RedirectIcon: () => ng,
  ReduxIcon: () => ig,
  RefreshIcon: () => sg,
  ReplyIcon: () => ag,
  RepoIcon: () => lg,
  RequestChangeIcon: () => ug,
  RewindIcon: () => cg,
  RulerIcon: () => pg,
  SaveIcon: () => dg,
  SearchIcon: () => So,
  ShareAltIcon: () => tt,
  ShareIcon: () => fg,
  ShieldIcon: () => mg,
  SideBySideIcon: () => hg,
  SidebarAltIcon: () => wo,
  SidebarAltToggleIcon: () => gg,
  SidebarIcon: () => yg,
  SidebarToggleIcon: () => bg,
  SpeakerIcon: () => vg,
  StackedIcon: () => xg,
  StarHollowIcon: () => Ig,
  StarIcon: () => Sg,
  StatusFailIcon: () => $n,
  StatusIcon: () => wg,
  StatusPassIcon: () => Un,
  StatusWarnIcon: () => Gn,
  StickerIcon: () => Eg,
  StopAltHollowIcon: () => Tg,
  StopAltIcon: () => Cg,
  StopIcon: () => _g,
  StorybookIcon: () => qn,
  StructureIcon: () => kg,
  SubtractIcon: () => Og,
  SunIcon: () => Pg,
  SupportIcon: () => Ag,
  SweepIcon: () => Yn,
  SwitchAltIcon: () => Dg,
  SyncIcon: () => ct,
  TabletIcon: () => Mg,
  ThumbsUpIcon: () => Lg,
  TimeIcon: () => Qn,
  TimerIcon: () => Ng,
  TransferIcon: () => Fg,
  TrashIcon: () => Xn,
  TwitterIcon: () => Rg,
  TypeIcon: () => Bg,
  UbuntuIcon: () => Hg,
  UndoIcon: () => zg,
  UnfoldIcon: () => Wg,
  UnlockIcon: () => Vg,
  UnpinIcon: () => jg,
  UploadIcon: () => Kg,
  UserAddIcon: () => $g,
  UserAltIcon: () => Ug,
  UserIcon: () => Gg,
  UsersIcon: () => qg,
  VSCodeIcon: () => Yg,
  VerifiedIcon: () => Qg,
  VideoIcon: () => Xg,
  WandIcon: () => Zn,
  WatchIcon: () => Zg,
  WindowsIcon: () => Jg,
  WrenchIcon: () => ey,
  XIcon: () => ty,
  YoutubeIcon: () => oy,
  ZoomIcon: () => Jn,
  ZoomOutIcon: () => ei,
  ZoomResetIcon: () => ti,
  default: () => Sf,
  iconList: () => ry,
})
var Sf = __STORYBOOK_ICONS__
var {
  AccessibilityAltIcon: wf,
  AccessibilityIcon: Ef,
  AccessibilityIgnoredIcon: Tf,
  AddIcon: Cf,
  AdminIcon: _f,
  AlertAltIcon: kf,
  AlertIcon: go,
  AlignLeftIcon: Of,
  AlignRightIcon: Pf,
  AppleIcon: Af,
  ArrowBottomLeftIcon: Df,
  ArrowBottomRightIcon: Mf,
  ArrowDownIcon: Lf,
  ArrowLeftIcon: En,
  ArrowRightIcon: Nf,
  ArrowSolidDownIcon: Ff,
  ArrowSolidLeftIcon: Rf,
  ArrowSolidRightIcon: Bf,
  ArrowSolidUpIcon: Hf,
  ArrowTopLeftIcon: zf,
  ArrowTopRightIcon: Wf,
  ArrowUpIcon: Vf,
  AzureDevOpsIcon: jf,
  BackIcon: Kf,
  BasketIcon: $f,
  BatchAcceptIcon: Uf,
  BatchDenyIcon: Gf,
  BeakerIcon: qf,
  BellIcon: Yf,
  BitbucketIcon: Qf,
  BoldIcon: Xf,
  BookIcon: Zf,
  BookmarkHollowIcon: Jf,
  BookmarkIcon: em,
  BottomBarIcon: yo,
  BottomBarToggleIcon: Tn,
  BoxIcon: tm,
  BranchIcon: om,
  BrowserIcon: rm,
  ButtonIcon: nm,
  CPUIcon: im,
  CalendarIcon: sm,
  CameraIcon: am,
  CameraStabilizeIcon: lm,
  CategoryIcon: um,
  CertificateIcon: cm,
  ChangedIcon: pm,
  ChatIcon: dm,
  CheckIcon: Be,
  ChevronDownIcon: Ot,
  ChevronLeftIcon: fm,
  ChevronRightIcon: Cn,
  ChevronSmallDownIcon: mm,
  ChevronSmallLeftIcon: hm,
  ChevronSmallRightIcon: gm,
  ChevronSmallUpIcon: _n,
  ChevronUpIcon: ym,
  ChromaticIcon: bm,
  ChromeIcon: vm,
  CircleHollowIcon: xm,
  CircleIcon: kn,
  ClearIcon: Im,
  CloseAltIcon: bo,
  CloseIcon: je,
  CloudHollowIcon: Sm,
  CloudIcon: wm,
  CogIcon: Qo,
  CollapseIcon: On,
  CommandIcon: Pn,
  CommentAddIcon: Em,
  CommentIcon: Tm,
  CommentsIcon: Cm,
  CommitIcon: _m,
  CompassIcon: km,
  ComponentDrivenIcon: Om,
  ComponentIcon: Xo,
  ContrastIcon: Pm,
  ContrastIgnoredIcon: Am,
  ControlsIcon: Dm,
  CopyIcon: Mm,
  CreditIcon: Lm,
  CrossIcon: Nm,
  DashboardIcon: Fm,
  DatabaseIcon: Rm,
  DeleteIcon: Bm,
  DiamondIcon: Hm,
  DirectionIcon: zm,
  DiscordIcon: Wm,
  DocChartIcon: Vm,
  DocListIcon: jm,
  DocumentIcon: Pt,
  DownloadIcon: Km,
  DragIcon: $m,
  EditIcon: Um,
  EllipsisIcon: An,
  EmailIcon: Gm,
  ExpandAltIcon: Dn,
  ExpandIcon: Mn,
  EyeCloseIcon: Ln,
  EyeIcon: Nn,
  FaceHappyIcon: qm,
  FaceNeutralIcon: Ym,
  FaceSadIcon: Qm,
  FacebookIcon: Xm,
  FailedIcon: Fn,
  FastForwardIcon: Zm,
  FigmaIcon: Jm,
  FilterIcon: Rn,
  FlagIcon: eh,
  FolderIcon: th,
  FormIcon: oh,
  GDriveIcon: rh,
  GithubIcon: vo,
  GitlabIcon: nh,
  GlobeIcon: Zo,
  GoogleIcon: ih,
  GraphBarIcon: sh,
  GraphLineIcon: ah,
  GraphqlIcon: lh,
  GridAltIcon: uh,
  GridIcon: ch,
  GrowIcon: ph,
  HeartHollowIcon: dh,
  HeartIcon: Bn,
  HomeIcon: fh,
  HourglassIcon: mh,
  InfoIcon: Hn,
  ItalicIcon: hh,
  JumpToIcon: gh,
  KeyIcon: yh,
  LightningIcon: zn,
  LightningOffIcon: bh,
  LinkBrokenIcon: vh,
  LinkIcon: Wn,
  LinkedinIcon: xh,
  LinuxIcon: Ih,
  ListOrderedIcon: Sh,
  ListUnorderedIcon: wh,
  LocationIcon: Eh,
  LockIcon: xo,
  MarkdownIcon: Th,
  MarkupIcon: Vn,
  MediumIcon: Ch,
  MemoryIcon: _h,
  MenuIcon: Io,
  MergeIcon: kh,
  MirrorIcon: Oh,
  MobileIcon: Ph,
  MoonIcon: Ah,
  NutIcon: Dh,
  OutboxIcon: Mh,
  OutlineIcon: Lh,
  PaintBrushIcon: Nh,
  PaperClipIcon: Fh,
  ParagraphIcon: Rh,
  PassedIcon: Bh,
  PhoneIcon: Hh,
  PhotoDragIcon: zh,
  PhotoIcon: Wh,
  PhotoStabilizeIcon: Vh,
  PinAltIcon: jh,
  PinIcon: Kh,
  PlayAllHollowIcon: jn,
  PlayBackIcon: $h,
  PlayHollowIcon: Uh,
  PlayIcon: Gh,
  PlayNextIcon: qh,
  PlusIcon: Kn,
  PointerDefaultIcon: Yh,
  PointerHandIcon: Qh,
  PowerIcon: Xh,
  PrintIcon: Zh,
  ProceedIcon: Jh,
  ProfileIcon: eg,
  PullRequestIcon: tg,
  QuestionIcon: og,
  RSSIcon: rg,
  RedirectIcon: ng,
  ReduxIcon: ig,
  RefreshIcon: sg,
  ReplyIcon: ag,
  RepoIcon: lg,
  RequestChangeIcon: ug,
  RewindIcon: cg,
  RulerIcon: pg,
  SaveIcon: dg,
  SearchIcon: So,
  ShareAltIcon: tt,
  ShareIcon: fg,
  ShieldIcon: mg,
  SideBySideIcon: hg,
  SidebarAltIcon: wo,
  SidebarAltToggleIcon: gg,
  SidebarIcon: yg,
  SidebarToggleIcon: bg,
  SpeakerIcon: vg,
  StackedIcon: xg,
  StarHollowIcon: Ig,
  StarIcon: Sg,
  StatusFailIcon: $n,
  StatusIcon: wg,
  StatusPassIcon: Un,
  StatusWarnIcon: Gn,
  StickerIcon: Eg,
  StopAltHollowIcon: Tg,
  StopAltIcon: Cg,
  StopIcon: _g,
  StorybookIcon: qn,
  StructureIcon: kg,
  SubtractIcon: Og,
  SunIcon: Pg,
  SupportIcon: Ag,
  SweepIcon: Yn,
  SwitchAltIcon: Dg,
  SyncIcon: ct,
  TabletIcon: Mg,
  ThumbsUpIcon: Lg,
  TimeIcon: Qn,
  TimerIcon: Ng,
  TransferIcon: Fg,
  TrashIcon: Xn,
  TwitterIcon: Rg,
  TypeIcon: Bg,
  UbuntuIcon: Hg,
  UndoIcon: zg,
  UnfoldIcon: Wg,
  UnlockIcon: Vg,
  UnpinIcon: jg,
  UploadIcon: Kg,
  UserAddIcon: $g,
  UserAltIcon: Ug,
  UserIcon: Gg,
  UsersIcon: qg,
  VSCodeIcon: Yg,
  VerifiedIcon: Qg,
  VideoIcon: Xg,
  WandIcon: Zn,
  WatchIcon: Zg,
  WindowsIcon: Jg,
  WrenchIcon: ey,
  XIcon: ty,
  YoutubeIcon: oy,
  ZoomIcon: Jn,
  ZoomOutIcon: ei,
  ZoomResetIcon: ti,
  iconList: ry,
} = __STORYBOOK_ICONS__

// global-externals:storybook/manager-api
const DE = __STORYBOOK_API__
const {
  ActiveTabs: ME,
  Consumer: me,
  ManagerContext: LE,
  Provider: ba,
  RequestResponseError: NE,
  addons: He,
  combineParameters: FE,
  controlOrMetaKey: RE,
  controlOrMetaSymbol: BE,
  eventMatchesShortcut: HE,
  eventToShortcut: va,
  experimental_MockUniversalStore: zE,
  experimental_UniversalStore: WE,
  experimental_getStatusStore: ny,
  experimental_getTestProviderStore: iy,
  experimental_requestResponse: Jo,
  experimental_useStatusStore: Eo,
  experimental_useTestProviderStore: ri,
  experimental_useUniversalStore: VE,
  internal_fullStatusStore: At,
  internal_fullTestProviderStore: Jt,
  internal_universalStatusStore: jE,
  internal_universalTestProviderStore: KE,
  isMacLike: $E,
  isShortcutTaken: UE,
  keyToSymbol: GE,
  merge: er,
  mockChannel: qE,
  optionOrAltSymbol: YE,
  shortcutMatchesShortcut: xa,
  shortcutToHumanString: Ye,
  types: be,
  useAddonState: QE,
  useArgTypes: XE,
  useArgs: ZE,
  useChannel: Ia,
  useGlobalTypes: Sa,
  useGlobals: tr,
  useParameter: JE,
  useSharedState: eT,
  useStoryPrepared: tT,
  useStorybookApi: oe,
  useStorybookState: Ne,
} = __STORYBOOK_API__

// global-externals:storybook/theming
const rT = __STORYBOOK_THEMING__
const {
  CacheProvider: nT,
  ClassNames: iT,
  Global: eo,
  ThemeProvider: ni,
  background: sT,
  color: wa,
  convert: aT,
  create: lT,
  createCache: uT,
  createGlobal: Ea,
  createReset: cT,
  css: pT,
  darken: dT,
  ensure: Ta,
  ignoreSsrWarning: fT,
  isPropValid: mT,
  jsx: hT,
  keyframes: Dt,
  lighten: gT,
  styled: I,
  themes: yT,
  typography: bT,
  useTheme: De,
  withTheme: Ca,
} = __STORYBOOK_THEMING__

// global-externals:storybook/internal/components
const xT = __STORYBOOK_COMPONENTS__
const {
  A: IT,
  ActionBar: ST,
  AddonPanel: wT,
  Badge: or,
  Bar: ET,
  Blockquote: TT,
  Button: he,
  ClipboardCode: CT,
  Code: _T,
  DL: kT,
  Div: OT,
  DocumentWrapper: PT,
  EmptyTabContent: _a,
  ErrorFormatter: ka,
  FlexBar: AT,
  Form: rr,
  H1: DT,
  H2: MT,
  H3: LT,
  H4: NT,
  H5: FT,
  H6: RT,
  HR: BT,
  IconButton: ee,
  Img: HT,
  LI: zT,
  Link: Pe,
  ListItem: sy,
  Loader: nr,
  Modal: Mt,
  OL: WT,
  P: VT,
  Placeholder: jT,
  Pre: KT,
  ProgressSpinner: $T,
  ResetWrapper: UT,
  ScrollArea: ir,
  Separator: yt,
  Spaced: pt,
  Span: GT,
  StorybookIcon: qT,
  StorybookLogo: sr,
  SyntaxHighlighter: YT,
  TT: QT,
  TabBar: ar,
  TabButton: lr,
  TabWrapper: XT,
  Table: ZT,
  Tabs: Oa,
  TabsState: JT,
  TooltipLinkList: ot,
  TooltipMessage: eC,
  TooltipNote: rt,
  UL: tC,
  WithTooltip: ve,
  WithTooltipPure: oC,
  Zoom: Pa,
  codeCommon: rC,
  components: nC,
  createCopyToClipboardFunction: iC,
  getStoryHref: to,
  interleaveSeparators: sC,
  nameSpaceClassNames: aC,
  resetComponents: lC,
  withReset: uC,
} = __STORYBOOK_COMPONENTS__

// src/toolbar/utils/normalize-toolbar-arg-type.ts
const ay = {
  type: 'item',
  value: '',
}
const Aa = /* @__PURE__ */ a(
  (e, t) => ({
    ...t,
    name: t.name || e,
    description: t.description || e,
    toolbar: {
      ...t.toolbar,
      items: t.toolbar.items.map(o => {
        const i = typeof o === 'string' ? { value: o, title: o } : o
        return (
          i.type === 'reset' &&
            t.toolbar.icon &&
            ((i.icon = t.toolbar.icon), (i.hideIcon = !0)),
          { ...ay, ...i }
        )
      }),
    },
  }),
  'normalizeArgType'
)

// src/toolbar/utils/create-cycle-value-array.ts
const ly = ['reset']
const Da = /* @__PURE__ */ a(
  e => e.filter(o => !ly.includes(o.type)).map(o => o.value),
  'createCycleValueArray'
)

// src/toolbar/constants.ts
const bt = 'toolbar'

// src/toolbar/utils/register-shortcuts.ts
const Ma = /* @__PURE__ */ a(async (e, t, o) => {
  ;(o &&
    o.next &&
    (await e.setAddonShortcut(bt, {
      label: o.next.label,
      defaultShortcut: o.next.keys,
      actionName: `${t}:next`,
      action: o.next.action,
    })),
    o &&
      o.previous &&
      (await e.setAddonShortcut(bt, {
        label: o.previous.label,
        defaultShortcut: o.previous.keys,
        actionName: `${t}:previous`,
        action: o.previous.action,
      })),
    o &&
      o.reset &&
      (await e.setAddonShortcut(bt, {
        label: o.reset.label,
        defaultShortcut: o.reset.keys,
        actionName: `${t}:reset`,
        action: o.reset.action,
      })))
}, 'registerShortcuts')

// src/toolbar/hoc/withKeyboardCycle.tsx
const La = /* @__PURE__ */ a(
  e =>
    /* @__PURE__ */ a(o => {
      const {
        id: i,
        toolbar: { items: r, shortcuts: n },
      } = o
      const l = oe()
      const [u, c] = tr()
      const d = U([])
      const p = u[i]
      const f = A(() => {
        c({ [i]: '' })
      }, [c])
      const h = A(() => {
        const m = d.current
        const b = m.indexOf(p)
        const E = b === m.length - 1 ? 0 : b + 1
        const g = d.current[E]
        c({ [i]: g })
      }, [d, p, c])
      const y = A(() => {
        const m = d.current
        const b = m.indexOf(p)
        const x = b > -1 ? b : 0
        const g = x === 0 ? m.length - 1 : x - 1
        const v = d.current[g]
        c({ [i]: v })
      }, [d, p, c])
      return (
        H(() => {
          n &&
            Ma(l, i, {
              next: { ...n.next, action: h },
              previous: { ...n.previous, action: y },
              reset: { ...n.reset, action: f },
            })
        }, [l, i, n, h, y, f]),
        H(() => {
          d.current = Da(r)
        }, []),
        /* @__PURE__ */ s.createElement(e, { cycleValues: d.current, ...o })
      )
    }, 'WithKeyboardCycle'),
  'withKeyboardCycle'
)

// src/toolbar/utils/get-selected.ts
const Na = /* @__PURE__ */ a(
  ({ currentValue: e, items: t }) =>
    e != null && t.find(i => i.value === e && i.type !== 'reset'),
  'getSelectedI\
tem'
)
const Fa = /* @__PURE__ */ a(({ currentValue: e, items: t }) => {
  const o = Na({ currentValue: e, items: t })
  if (o) return o.icon
}, 'getSelectedIcon')
const Ra = /* @__PURE__ */ a(({ currentValue: e, items: t }) => {
  const o = Na({ currentValue: e, items: t })
  if (o) return o.title
}, 'getSelectedTitle')

// global-externals:storybook/internal/client-logger
const _C = __STORYBOOK_CLIENT_LOGGER__
const {
  deprecate: Ba,
  logger: ur,
  once: Ha,
  pretty: kC,
} = __STORYBOOK_CLIENT_LOGGER__

// src/components/components/icon/icon.tsx
const uy = oi
const cy = I.svg`
  display: inline-block;
  shape-rendering: inherit;
  vertical-align: middle;
  fill: currentColor;
  path {
    fill: currentColor;
  }
`
const cr = /* @__PURE__ */ a(
  ({ icon: e, useSymbol: t, __suppressDeprecationWarning: o = !1, ...i }) => {
    o ||
      Ba(
        `Use of the deprecated Icons ${`(${e})` || ''} component detected. Please use the @storybook/icons component directly. For more informat\
ions, see the migration notes at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#icons-is-deprecated`
      )
    const r = ii[e] || null
    if (!r)
      return (
        ur.warn(
          `Use of an unknown prop ${`(${e})` || ''} in the Icons component. The Icons component is deprecated. Please use the @storybook/icons c\
omponent directly. For more informations, see the migration notes at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#icons-i\
s-deprecated`
        ),
        null
      )
    const n = uy[r]
    return /* @__PURE__ */ s.createElement(n, { ...i })
  },
  'Icons'
)
const MC = _t(
  /* @__PURE__ */ a(function ({ icons: t = Object.keys(ii) }) {
    return /* @__PURE__ */ s.createElement(
      cy,
      {
        viewBox: '0 0 14 14',
        style: { position: 'absolute', width: 0, height: 0 },
        'data-chromatic': 'ignore',
      },
      t.map(o =>
        /* @__PURE__ */ s.createElement(
          'symbol',
          { id: `icon--${o}`, key: o },
          ii[o]
        )
      )
    )
  }, 'Symbols')
)
var ii = {
  user: 'UserIcon',
  useralt: 'UserAltIcon',
  useradd: 'UserAddIcon',
  users: 'UsersIcon',
  profile: 'ProfileIcon',
  facehappy: 'FaceHappyIcon',
  faceneutral: 'FaceNeutralIcon',
  facesad: 'FaceSadIcon',
  accessibility: 'AccessibilityIcon',
  accessibilityalt: 'AccessibilityAltIcon',
  arrowup: 'ChevronUpIcon',
  arrowdown: 'ChevronDownIcon',
  arrowleft: 'ChevronLeftIcon',
  arrowright: 'ChevronRightIcon',
  arrowupalt: 'ArrowUpIcon',
  arrowdownalt: 'ArrowDownIcon',
  arrowleftalt: 'ArrowLeftIcon',
  arrowrightalt: 'ArrowRightIcon',
  expandalt: 'ExpandAltIcon',
  collapse: 'CollapseIcon',
  expand: 'ExpandIcon',
  unfold: 'UnfoldIcon',
  transfer: 'TransferIcon',
  redirect: 'RedirectIcon',
  undo: 'UndoIcon',
  reply: 'ReplyIcon',
  sync: 'SyncIcon',
  upload: 'UploadIcon',
  download: 'DownloadIcon',
  back: 'BackIcon',
  proceed: 'ProceedIcon',
  refresh: 'RefreshIcon',
  globe: 'GlobeIcon',
  compass: 'CompassIcon',
  location: 'LocationIcon',
  pin: 'PinIcon',
  time: 'TimeIcon',
  dashboard: 'DashboardIcon',
  timer: 'TimerIcon',
  home: 'HomeIcon',
  admin: 'AdminIcon',
  info: 'InfoIcon',
  question: 'QuestionIcon',
  support: 'SupportIcon',
  alert: 'AlertIcon',
  email: 'EmailIcon',
  phone: 'PhoneIcon',
  link: 'LinkIcon',
  unlink: 'LinkBrokenIcon',
  bell: 'BellIcon',
  rss: 'RSSIcon',
  sharealt: 'ShareAltIcon',
  share: 'ShareIcon',
  circle: 'CircleIcon',
  circlehollow: 'CircleHollowIcon',
  bookmarkhollow: 'BookmarkHollowIcon',
  bookmark: 'BookmarkIcon',
  hearthollow: 'HeartHollowIcon',
  heart: 'HeartIcon',
  starhollow: 'StarHollowIcon',
  star: 'StarIcon',
  certificate: 'CertificateIcon',
  verified: 'VerifiedIcon',
  thumbsup: 'ThumbsUpIcon',
  shield: 'ShieldIcon',
  basket: 'BasketIcon',
  beaker: 'BeakerIcon',
  hourglass: 'HourglassIcon',
  flag: 'FlagIcon',
  cloudhollow: 'CloudHollowIcon',
  edit: 'EditIcon',
  cog: 'CogIcon',
  nut: 'NutIcon',
  wrench: 'WrenchIcon',
  ellipsis: 'EllipsisIcon',
  check: 'CheckIcon',
  form: 'FormIcon',
  batchdeny: 'BatchDenyIcon',
  batchaccept: 'BatchAcceptIcon',
  controls: 'ControlsIcon',
  plus: 'PlusIcon',
  closeAlt: 'CloseAltIcon',
  cross: 'CrossIcon',
  trash: 'TrashIcon',
  pinalt: 'PinAltIcon',
  unpin: 'UnpinIcon',
  add: 'AddIcon',
  subtract: 'SubtractIcon',
  close: 'CloseIcon',
  delete: 'DeleteIcon',
  passed: 'PassedIcon',
  changed: 'ChangedIcon',
  failed: 'FailedIcon',
  clear: 'ClearIcon',
  comment: 'CommentIcon',
  commentadd: 'CommentAddIcon',
  requestchange: 'RequestChangeIcon',
  comments: 'CommentsIcon',
  lock: 'LockIcon',
  unlock: 'UnlockIcon',
  key: 'KeyIcon',
  outbox: 'OutboxIcon',
  credit: 'CreditIcon',
  button: 'ButtonIcon',
  type: 'TypeIcon',
  pointerdefault: 'PointerDefaultIcon',
  pointerhand: 'PointerHandIcon',
  browser: 'BrowserIcon',
  tablet: 'TabletIcon',
  mobile: 'MobileIcon',
  watch: 'WatchIcon',
  sidebar: 'SidebarIcon',
  sidebaralt: 'SidebarAltIcon',
  sidebaralttoggle: 'SidebarAltToggleIcon',
  sidebartoggle: 'SidebarToggleIcon',
  bottombar: 'BottomBarIcon',
  bottombartoggle: 'BottomBarToggleIcon',
  cpu: 'CPUIcon',
  database: 'DatabaseIcon',
  memory: 'MemoryIcon',
  structure: 'StructureIcon',
  box: 'BoxIcon',
  power: 'PowerIcon',
  photo: 'PhotoIcon',
  component: 'ComponentIcon',
  grid: 'GridIcon',
  outline: 'OutlineIcon',
  photodrag: 'PhotoDragIcon',
  search: 'SearchIcon',
  zoom: 'ZoomIcon',
  zoomout: 'ZoomOutIcon',
  zoomreset: 'ZoomResetIcon',
  eye: 'EyeIcon',
  eyeclose: 'EyeCloseIcon',
  lightning: 'LightningIcon',
  lightningoff: 'LightningOffIcon',
  contrast: 'ContrastIcon',
  switchalt: 'SwitchAltIcon',
  mirror: 'MirrorIcon',
  grow: 'GrowIcon',
  paintbrush: 'PaintBrushIcon',
  ruler: 'RulerIcon',
  stop: 'StopIcon',
  camera: 'CameraIcon',
  video: 'VideoIcon',
  speaker: 'SpeakerIcon',
  play: 'PlayIcon',
  playback: 'PlayBackIcon',
  playnext: 'PlayNextIcon',
  rewind: 'RewindIcon',
  fastforward: 'FastForwardIcon',
  stopalt: 'StopAltIcon',
  sidebyside: 'SideBySideIcon',
  stacked: 'StackedIcon',
  sun: 'SunIcon',
  moon: 'MoonIcon',
  book: 'BookIcon',
  document: 'DocumentIcon',
  copy: 'CopyIcon',
  category: 'CategoryIcon',
  folder: 'FolderIcon',
  print: 'PrintIcon',
  graphline: 'GraphLineIcon',
  calendar: 'CalendarIcon',
  graphbar: 'GraphBarIcon',
  menu: 'MenuIcon',
  menualt: 'MenuIcon',
  filter: 'FilterIcon',
  docchart: 'DocChartIcon',
  doclist: 'DocListIcon',
  markup: 'MarkupIcon',
  bold: 'BoldIcon',
  paperclip: 'PaperClipIcon',
  listordered: 'ListOrderedIcon',
  listunordered: 'ListUnorderedIcon',
  paragraph: 'ParagraphIcon',
  markdown: 'MarkdownIcon',
  repository: 'RepoIcon',
  commit: 'CommitIcon',
  branch: 'BranchIcon',
  pullrequest: 'PullRequestIcon',
  merge: 'MergeIcon',
  apple: 'AppleIcon',
  linux: 'LinuxIcon',
  ubuntu: 'UbuntuIcon',
  windows: 'WindowsIcon',
  storybook: 'StorybookIcon',
  azuredevops: 'AzureDevOpsIcon',
  bitbucket: 'BitbucketIcon',
  chrome: 'ChromeIcon',
  chromatic: 'ChromaticIcon',
  componentdriven: 'ComponentDrivenIcon',
  discord: 'DiscordIcon',
  facebook: 'FacebookIcon',
  figma: 'FigmaIcon',
  gdrive: 'GDriveIcon',
  github: 'GithubIcon',
  gitlab: 'GitlabIcon',
  google: 'GoogleIcon',
  graphql: 'GraphqlIcon',
  medium: 'MediumIcon',
  redux: 'ReduxIcon',
  twitter: 'TwitterIcon',
  youtube: 'YoutubeIcon',
  vscode: 'VSCodeIcon',
}

// src/toolbar/components/ToolbarMenuButton.tsx
const za = /* @__PURE__ */ a(
  ({ active: e, disabled: t, title: o, icon: i, description: r, onClick: n }) =>
    /* @__PURE__ */ s.createElement(
      ee,
      {
        active: e,
        title: r,
        disabled: t,
        onClick: t ? () => {} : n,
      },
      i &&
        /* @__PURE__ */ s.createElement(cr, {
          icon: i,
          __suppressDeprecationWarning: !0,
        }),
      o ? `\xA0${o}` : null
    ),
  'ToolbarMenuButton'
)

// src/toolbar/components/ToolbarMenuListItem.tsx
const Wa = /* @__PURE__ */ a(
  ({
    right: e,
    title: t,
    value: o,
    icon: i,
    hideIcon: r,
    onClick: n,
    disabled: l,
    currentValue: u,
  }) => {
    const c =
      i &&
      /* @__PURE__ */ s.createElement(cr, {
        style: { opacity: 1 },
        icon: i,
        __suppressDeprecationWarning: !0,
      })
    const d = {
      id: o ?? '_reset',
      active: u === o,
      right: e,
      title: t,
      disabled: l,
      onClick: n,
    }
    return (i && !r && (d.icon = c), d)
  },
  'ToolbarMenuListItem'
)

// src/toolbar/components/ToolbarMenuList.tsx
const Va = La(
  ({
    id: e,
    name: t,
    description: o,
    toolbar: {
      icon: i,
      items: r,
      title: n,
      preventDynamicIcon: l,
      dynamicTitle: u,
    },
  }) => {
    const [c, d, p] = tr()
    const [f, h] = K(!1)
    const y = c[e]
    const m = !!y
    const b = e in p
    let x = i
    let E = n
    ;(l || (x = Fa({ currentValue: y, items: r }) || x),
      u && (E = Ra({ currentValue: y, items: r }) || E),
      !E &&
        !x &&
        console.warn(`Toolbar \
'${t}' has no title or icon`))
    const g = A(
      v => {
        d({ [e]: v })
      },
      [e, d]
    )
    return /* @__PURE__ */ s.createElement(
      ve,
      {
        placement: 'top',
        tooltip: ({ onHide: v }) => {
          const S = r
            .filter(({ type: w }) => {
              let k = !0
              return (w === 'reset' && !y && (k = !1), k)
            })
            .map(w =>
              Wa({
                ...w,
                currentValue: y,
                disabled: b,
                onClick: /* @__PURE__ */ a(() => {
                  ;(g(w.value), v())
                }, 'onClick'),
              })
            )
          return /* @__PURE__ */ s.createElement(ot, { links: S })
        },
        closeOnOutsideClick: !0,
        onVisibleChange: h,
      },
      /* @__PURE__ */ s.createElement(za, {
        active: f || m,
        disabled: b,
        description: o || '',
        icon: x,
        title: E || '',
      })
    )
  }
)

// src/toolbar/components/ToolbarManager.tsx
const ja = /* @__PURE__ */ a(() => {
  const e = Sa()
  const t = Object.keys(e).filter(o => !!e[o].toolbar)
  return t.length
    ? /* @__PURE__ */ s.createElement(
        s.Fragment,
        null,
        /* @__PURE__ */ s.createElement(yt, null),
        t.map(o => {
          const i = Aa(o, e[o])
          return /* @__PURE__ */ s.createElement(Va, { key: o, id: o, ...i })
        })
      )
    : null
}, 'ToolbarManager')

// global-externals:react-dom/client
const a_ = __REACT_DOM_CLIENT__
const { createRoot: Ka, hydrateRoot: l_ } = __REACT_DOM_CLIENT__

// global-externals:storybook/internal/manager-errors
const c_ = __STORYBOOK_CORE_EVENTS_MANAGER_ERRORS__
const {
  Category: p_,
  ProviderDoesNotExtendBaseProviderError: $a,
  StatusTypeIdMismatchError: d_,
  UncaughtManagerError: f_,
} = __STORYBOOK_CORE_EVENTS_MANAGER_ERRORS__

// global-externals:storybook/internal/router
const h_ = __STORYBOOK_ROUTER__
const {
  BaseLocationProvider: g_,
  DEEPLY_EQUAL: y_,
  Link: pr,
  Location: dr,
  LocationProvider: Ua,
  Match: Ga,
  Route: To,
  buildArgsParam: b_,
  deepDiff: v_,
  getMatch: x_,
  parsePath: I_,
  queryFromLocation: S_,
  stringifyQuery: w_,
  useNavigate: qa,
} = __STORYBOOK_ROUTER__

// ../node_modules/react-helmet-async/lib/index.module.js
const ne = Ve(si())
const ml = Ve(rl())
const pi = Ve(il())
const hl = Ve(al())
function xe() {
  return (
    (xe =
      Object.assign ||
      function (e) {
        for (let t = 1; t < arguments.length; t++) {
          const o = arguments[t]
          for (const i in o)
            Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
        }
        return e
      }),
    xe.apply(this, arguments)
  )
}
a(xe, 'a')
function hi(e, t) {
  ;((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    di(e, t))
}
a(hi, 's')
function di(e, t) {
  return (
    (di =
      Object.setPrototypeOf ||
      function (o, i) {
        return ((o.__proto__ = i), o)
      }),
    di(e, t)
  )
}
a(di, 'c')
function ll(e, t) {
  if (e == null) return {}
  let o
  let i
  const r = {}
  const n = Object.keys(e)
  for (i = 0; i < n.length; i++) t.includes((o = n[i])) || (r[o] = e[o])
  return r
}
a(ll, 'u')
const X = {
  BASE: 'base',
  BODY: 'body',
  HEAD: 'head',
  HTML: 'html',
  LINK: 'link',
  META: 'meta',
  NOSCRIPT: 'noscript',
  SCRIPT: 'script',
  STYLE:
    '\
style',
  TITLE: 'title',
  FRAGMENT: 'Symbol(react.fragment)',
}
const by = { rel: ['amphtml', 'canonical', 'alternate'] }
const vy = {
  type: [
    'applicatio\
n/ld+json',
  ],
}
const xy = {
  charset: '',
  name: ['robots', 'description'],
  property: [
    'og:type',
    'og:title',
    'og:url',
    'og:image',
    'og:image:alt',
    '\
og:description',
    'twitter:url',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt',
    'twitter:card',
    'twitter:site',
  ],
}
const ul = Object.keys(X).map(function (e) {
  return X[e]
})
const gr = {
  accesskey: 'accessKey',
  charset: 'charSet',
  class: 'className',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  '\
http-equiv': 'httpEquiv',
  itemprop: 'itemProp',
  tabindex: 'tabIndex',
}
const Iy = Object.keys(gr).reduce(function (e, t) {
  return ((e[gr[t]] = t), e)
}, {})
const ro = /* @__PURE__ */ a(function (e, t) {
  for (let o = e.length - 1; o >= 0; o -= 1) {
    const i = e[o]
    if (Object.prototype.hasOwnProperty.call(i, t)) return i[t]
  }
  return null
}, 'T')
const Sy = /* @__PURE__ */ a(function (e) {
  let t = ro(e, X.TITLE)
  const o = ro(e, 'titleTemplate')
  if ((Array.isArray(t) && (t = t.join('')), o && t))
    return o.replace(/%s/g, function () {
      return t
    })
  const i = ro(e, 'defaultTitle')
  return t || i || void 0
}, 'g')
const wy = /* @__PURE__ */ a(function (e) {
  return ro(e, 'onChangeClientState') || function () {}
}, 'b')
const ai = /* @__PURE__ */ a(function (e, t) {
  return t
    .filter(function (o) {
      return o[e] !== void 0
    })
    .map(function (o) {
      return o[e]
    })
    .reduce(function (o, i) {
      return xe({}, o, i)
    }, {})
}, 'v')
const Ey = /* @__PURE__ */ a(function (e, t) {
  return t
    .filter(function (o) {
      return o[X.BASE] !== void 0
    })
    .map(function (o) {
      return o[X.BASE]
    })
    .reverse()
    .reduce(function (o, i) {
      if (!o.length)
        for (let r = Object.keys(i), n = 0; n < r.length; n += 1) {
          const l = r[n].toLowerCase()
          if (e.includes(l) && i[l]) return o.concat(i)
        }
      return o
    }, [])
}, 'A')
const Co = /* @__PURE__ */ a(function (e, t, o) {
  const i = {}
  return o
    .filter(function (r) {
      return (
        !!Array.isArray(r[e]) ||
        (r[e] !== void 0 &&
          console &&
          typeof console.warn === 'function' &&
          console.warn(
            'Helmet: ' +
              e +
              ' shou\
ld be of type "Array". Instead found type "' +
              typeof r[e] +
              '"'
          ),
        !1)
      )
    })
    .map(function (r) {
      return r[e]
    })
    .reverse()
    .reduce(function (r, n) {
      const l = {}
      n.filter(function (f) {
        for (var h, y = Object.keys(f), m = 0; m < y.length; m += 1) {
          const b = y[m]
          const x = b.toLowerCase()
          ;(!t.includes(x) ||
            (h === 'rel' && f[h].toLowerCase() === 'canonical') ||
            (x === 'rel' && f[x].toLowerCase() === 'stylesheet') ||
            (h = x),
            !t.includes(b) ||
              (b !== 'innerHTML' && b !== 'cssText' && b !== 'itemprop') ||
              (h = b))
        }
        if (!h || !f[h]) return !1
        const E = f[h].toLowerCase()
        return (
          i[h] || (i[h] = {}),
          l[h] || (l[h] = {}),
          !i[h][E] && ((l[h][E] = !0), !0)
        )
      })
        .reverse()
        .forEach(function (f) {
          return r.push(f)
        })
      for (let u = Object.keys(l), c = 0; c < u.length; c += 1) {
        const d = u[c]
        const p = xe({}, i[d], l[d])
        i[d] = p
      }
      return r
    }, [])
    .reverse()
}, 'C')
const Ty = /* @__PURE__ */ a(function (e, t) {
  if (Array.isArray(e) && e.length) {
    for (let o = 0; o < e.length; o += 1) if (e[o][t]) return !0
  }
  return !1
}, 'O')
const gl = /* @__PURE__ */ a(function (e) {
  return Array.isArray(e) ? e.join('') : e
}, 'S')
const li = /* @__PURE__ */ a(function (e, t) {
  return Array.isArray(e)
    ? e.reduce(
        function (o, i) {
          return (
            (function (r, n) {
              for (let l = Object.keys(r), u = 0; u < l.length; u += 1)
                if (n[l[u]] && n[l[u]].includes(r[l[u]])) return !0
              return !1
            })(i, t)
              ? o.priority.push(i)
              : o.default.push(i),
            o
          )
        },
        { priority: [], default: [] }
      )
    : { default: e }
}, 'E')
const cl = /* @__PURE__ */ a(function (e, t) {
  let o
  return xe({}, e, (((o = {})[t] = void 0), o))
}, 'I')
const Cy = [X.NOSCRIPT, X.SCRIPT, X.STYLE]
const ui = /* @__PURE__ */ a(function (e, t) {
  return (
    t === void 0 && (t = !0),
    t === !1
      ? String(e)
      : String(e)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
  )
}, 'w')
const pl = /* @__PURE__ */ a(function (e) {
  return Object.keys(e).reduce(function (t, o) {
    const i = e[o] !== void 0 ? o + '="' + e[o] + '"' : '' + o
    return t ? t + ' ' + i : i
  }, '')
}, 'x')
const dl = /* @__PURE__ */ a(function (e, t) {
  return (
    t === void 0 && (t = {}),
    Object.keys(e).reduce(function (o, i) {
      return ((o[gr[i] || i] = e[i]), o)
    }, t)
  )
}, 'L')
const hr = /* @__PURE__ */ a(function (e, t) {
  return t.map(function (o, i) {
    let r
    const n = (((r = { key: i })['data-rh'] = !0), r)
    return (
      Object.keys(o).forEach(function (l) {
        const u = gr[l] || l
        u === 'innerHTML' || u === 'cssText'
          ? (n.dangerouslySetInnerHTML = { __html: o.innerHTML || o.cssText })
          : (n[u] = o[l])
      }),
      s.createElement(e, n)
    )
  })
}, 'j')
const Ke = /* @__PURE__ */ a(function (e, t, o) {
  switch (e) {
    case X.TITLE:
      return {
        toComponent: /* @__PURE__ */ a(function () {
          return (
            (r = t.titleAttributes),
            ((n = { key: (i = t.title) })['data-rh'] = !0),
            (l = dl(r, n)),
            [s.createElement(X.TITLE, l, i)]
          )
          let i, r, n, l
        }, 'toComponent'),
        toString: /* @__PURE__ */ a(function () {
          return (function (i, r, n, l) {
            const u = pl(n)
            const c = gl(r)
            return u
              ? '<' +
                  i +
                  ' data-rh="true" ' +
                  u +
                  '>' +
                  ui(c, l) +
                  '</' +
                  i +
                  '>'
              : '<' + i + ' data-rh="true">' + ui(c, l) + '</' + i + '>'
          })(e, t.title, t.titleAttributes, o)
        }, 'toString'),
      }
    case 'bodyAttributes':
    case 'htmlAttributes':
      return {
        toComponent: /* @__PURE__ */ a(function () {
          return dl(t)
        }, 'toComponent'),
        toString: /* @__PURE__ */ a(function () {
          return pl(t)
        }, 'toString'),
      }
    default:
      return {
        toComponent: /* @__PURE__ */ a(function () {
          return hr(e, t)
        }, 'toComponent'),
        toString: /* @__PURE__ */ a(function () {
          return (function (i, r, n) {
            return r.reduce(function (l, u) {
              const c = Object.keys(u)
                .filter(function (f) {
                  return !(f === 'innerHTML' || f === 'cssText')
                })
                .reduce(function (f, h) {
                  const y = u[h] === void 0 ? h : h + '="' + ui(u[h], n) + '"'
                  return f ? f + ' ' + y : y
                }, '')
              const d = u.innerHTML || u.cssText || ''
              const p = !Cy.includes(i)
              return (
                l +
                '<' +
                i +
                ' data-rh="true" ' +
                c +
                (p ? '/>' : '>' + d + '</' + i + '>')
              )
            }, '')
          })(e, t, o)
        }, 'toString'),
      }
  }
}, 'M')
const fi = /* @__PURE__ */ a(function (e) {
  const t = e.baseTag
  const o = e.bodyAttributes
  const i = e.encode
  const r = e.htmlAttributes
  const n = e.noscriptTags
  const l = e.styleTags
  const u = e.title
  const c = u === void 0 ? '' : u
  const d = e.titleAttributes
  let p = e.linkTags
  let f = e.metaTags
  let h = e.scriptTags
  let y = {
    toComponent: /* @__PURE__ */ a(function () {}, 'toComponent'),
    toString: /* @__PURE__ */ a(function () {
      return ''
    }, 'toString'),
  }
  if (e.prioritizeSeoTags) {
    const m = (function (b) {
      const x = b.linkTags
      const E = b.scriptTags
      const g = b.encode
      const v = li(b.metaTags, xy)
      const S = li(x, by)
      const w = li(E, vy)
      return {
        priorityMethods: {
          toComponent: /* @__PURE__ */ a(function () {
            return [].concat(
              hr(X.META, v.priority),
              hr(X.LINK, S.priority),
              hr(X.SCRIPT, w.priority)
            )
          }, 'toComponent'),
          toString: /* @__PURE__ */ a(function () {
            return (
              Ke(X.META, v.priority, g) +
              ' ' +
              Ke(X.LINK, S.priority, g) +
              ' ' +
              Ke(X.SCRIPT, w.priority, g)
            )
          }, 'toString'),
        },
        metaTags: v.default,
        linkTags: S.default,
        scriptTags: w.default,
      }
    })(e)
    ;((y = m.priorityMethods),
      (p = m.linkTags),
      (f = m.metaTags),
      (h = m.scriptTags))
  }
  return {
    priority: y,
    base: Ke(X.BASE, t, i),
    bodyAttributes: Ke('bodyAttributes', o, i),
    htmlAttributes: Ke('htmlAttributes', r, i),
    link: Ke(X.LINK, p, i),
    meta: Ke(X.META, f, i),
    noscript: Ke(X.NOSCRIPT, n, i),
    script: Ke(X.SCRIPT, h, i),
    style: Ke(X.STYLE, l, i),
    title: Ke(X.TITLE, { title: c, titleAttributes: d }, i),
  }
}, 'k')
const mr = []
const mi = /* @__PURE__ */ a(function (e, t) {
  const o = this
  ;(t === void 0 && (t = typeof document < 'u'),
    (this.instances = []),
    (this.value = {
      setHelmet: /* @__PURE__ */ a(function (i) {
        o.context.helmet = i
      }, 'setHelmet'),
      helmetInstances: {
        get: /* @__PURE__ */ a(function () {
          return o.canUseDOM ? mr : o.instances
        }, 'get'),
        add: /* @__PURE__ */ a(function (i) {
          ;(o.canUseDOM ? mr : o.instances).push(i)
        }, 'add'),
        remove: /* @__PURE__ */ a(function (i) {
          const r = (o.canUseDOM ? mr : o.instances).indexOf(i)
          ;(o.canUseDOM ? mr : o.instances).splice(r, 1)
        }, 'remove'),
      },
    }),
    (this.context = e),
    (this.canUseDOM = t),
    t ||
      (e.helmet = fi({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: !0,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: '',
        titleAttributes: {},
      })))
}, 'N')
const yl = s.createContext({})
const _y = ne.default.shape({
  setHelmet: ne.default.func,
  helmetInstances: ne.default.shape({
    get: ne.default.func,
    add: ne.default.func,
    remove: ne.default.func,
  }),
})
const ky = typeof document < 'u'
const vt = /* @__PURE__ */ (function (e) {
  function t(o) {
    let i
    return (
      ((i = e.call(this, o) || this).helmetData = new mi(
        i.props.context,
        t.canUseDOM
      )),
      i
    )
  }
  return (
    a(t, 'r'),
    hi(t, e),
    (t.prototype.render = function () {
      return s.createElement(
        yl.Provider,
        { value: this.helmetData.value },
        this.props.children
      )
    }),
    t
  )
})(Le)
;((vt.canUseDOM = ky),
  (vt.propTypes = {
    context: ne.default.shape({ helmet: ne.default.shape() }),
    children: ne.default.node.isRequired,
  }),
  (vt.defaultProps = { context: {} }),
  (vt.displayName = 'HelmetProvider'))
const oo = /* @__PURE__ */ a(function (e, t) {
  let o
  const i = document.head || document.querySelector(X.HEAD)
  const r = i.querySelectorAll(e + '[data-rh]')
  const n = [].slice.call(r)
  const l = []
  return (
    t &&
      t.length &&
      t.forEach(function (u) {
        const c = document.createElement(e)
        for (const d in u)
          Object.prototype.hasOwnProperty.call(u, d) &&
            (d === 'innerHTML'
              ? (c.innerHTML = u.innerHTML)
              : d === 'cssText'
                ? c.styleSheet
                  ? (c.styleSheet.cssText = u.cssText)
                  : c.appendChild(document.createTextNode(u.cssText))
                : c.setAttribute(d, u[d] === void 0 ? '' : u[d]))
        ;(c.setAttribute('data-rh', 'true'),
          n.some(function (p, f) {
            return ((o = f), c.isEqualNode(p))
          })
            ? n.splice(o, 1)
            : l.push(c))
      }),
    n.forEach(function (u) {
      return u.parentNode.removeChild(u)
    }),
    l.forEach(function (u) {
      return i.appendChild(u)
    }),
    { oldTags: n, newTags: l }
  )
}, 'Y')
const ci = /* @__PURE__ */ a(function (e, t) {
  const o = document.getElementsByTagName(e)[0]
  if (o) {
    for (
      var i = o.getAttribute('data-rh'),
        r = i ? i.split(',') : [],
        n = [].concat(r),
        l = Object.keys(t),
        u = 0;
      u < l.length;
      u += 1
    ) {
      const c = l[u]
      const d = t[c] || ''
      ;(o.getAttribute(c) !== d && o.setAttribute(c, d),
        !r.includes(c) && r.push(c))
      const p = n.indexOf(c)
      p !== -1 && n.splice(p, 1)
    }
    for (let f = n.length - 1; f >= 0; f -= 1) o.removeAttribute(n[f])
    r.length === n.length
      ? o.removeAttribute('data-rh')
      : o.getAttribute('data-rh') !== l.join(',') &&
        o.setAttribute('data-rh', l.join(','))
  }
}, 'B')
const fl = /* @__PURE__ */ a(function (e, t) {
  const o = e.baseTag
  const i = e.htmlAttributes
  const r = e.linkTags
  const n = e.metaTags
  const l = e.noscriptTags
  const u = e.onChangeClientState
  const c = e.scriptTags
  const d = e.styleTags
  const p = e.title
  const f = e.titleAttributes
  ;(ci(X.BODY, e.bodyAttributes),
    ci(X.HTML, i),
    (function (b, x) {
      ;(b !== void 0 && document.title !== b && (document.title = gl(b)),
        ci(X.TITLE, x))
    })(p, f))
  const h = {
    baseTag: oo(X.BASE, o),
    linkTags: oo(X.LINK, r),
    metaTags: oo(X.META, n),
    noscriptTags: oo(X.NOSCRIPT, l),
    scriptTags: oo(X.SCRIPT, c),
    styleTags: oo(X.STYLE, d),
  }
  const y = {}
  const m = {}
  ;(Object.keys(h).forEach(function (b) {
    const x = h[b]
    const E = x.newTags
    const g = x.oldTags
    ;(E.length && (y[b] = E), g.length && (m[b] = h[b].oldTags))
  }),
    t && t(),
    u(e, y, m))
}, 'K')
let _o = null
const yr = /* @__PURE__ */ (function (e) {
  function t() {
    for (var i, r = arguments.length, n = new Array(r), l = 0; l < r; l++)
      n[l] = arguments[l]
    return (((i = e.call.apply(e, [this].concat(n)) || this).rendered = !1), i)
  }
  ;(a(t, 'e'), hi(t, e))
  const o = t.prototype
  return (
    (o.shouldComponentUpdate = function (i) {
      return !(0, hl.default)(i, this.props)
    }),
    (o.componentDidUpdate = function () {
      this.emitChange()
    }),
    (o.componentWillUnmount = function () {
      ;(this.props.context.helmetInstances.remove(this), this.emitChange())
    }),
    (o.emitChange = function () {
      let i
      let r
      const n = this.props.context
      const l = n.setHelmet
      let u = null
      const c =
        ((i = n.helmetInstances.get().map(function (d) {
          const p = xe({}, d.props)
          return (delete p.context, p)
        })),
        {
          baseTag: Ey(['href'], i),
          bodyAttributes: ai('bodyAttributes', i),
          defer: ro(i, 'defer'),
          encode: ro(i, 'encodeSpecialCharacters'),
          htmlAttributes: ai('htmlAttributes', i),
          linkTags: Co(X.LINK, ['rel', 'href'], i),
          metaTags: Co(
            X.META,
            ['name', 'charset', 'http-equiv', 'property', 'itemprop'],
            i
          ),
          noscriptTags: Co(X.NOSCRIPT, ['innerHTML'], i),
          onChangeClientState: wy(i),
          scriptTags: Co(X.SCRIPT, ['src', 'innerHTML'], i),
          styleTags: Co(X.STYLE, ['cssText'], i),
          title: Sy(i),
          titleAttributes: ai('titleAttributes', i),
          prioritizeSeoTags: Ty(i, 'prioritizeSeoTags'),
        })
      ;(vt.canUseDOM
        ? ((r = c),
          _o && cancelAnimationFrame(_o),
          r.defer
            ? (_o = requestAnimationFrame(function () {
                fl(r, function () {
                  _o = null
                })
              }))
            : (fl(r), (_o = null)))
        : fi && (u = fi(c)),
        l(u))
    }),
    (o.init = function () {
      this.rendered ||
        ((this.rendered = !0),
        this.props.context.helmetInstances.add(this),
        this.emitChange())
    }),
    (o.render = function () {
      return (this.init(), null)
    }),
    t
  )
})(Le)
;((yr.propTypes = { context: _y.isRequired }),
  (yr.displayName = 'HelmetDispatcher'))
const Oy = ['children']
const Py = ['children']
const ko = /* @__PURE__ */ (function (e) {
  function t() {
    return e.apply(this, arguments) || this
  }
  ;(a(t, 'r'), hi(t, e))
  const o = t.prototype
  return (
    (o.shouldComponentUpdate = function (i) {
      return !(0, ml.default)(cl(this.props, 'helmetData'), cl(i, 'helmetData'))
    }),
    (o.mapNestedChildrenToProps = function (i, r) {
      if (!r) return null
      switch (i.type) {
        case X.SCRIPT:
        case X.NOSCRIPT:
          return { innerHTML: r }
        case X.STYLE:
          return { cssText: r }
        default:
          throw new Error(
            '<' +
              i.type +
              ' /> elements are self-closing and can not contain children. Refer to our API for more information.'
          )
      }
    }),
    (o.flattenArrayTypeChildren = function (i) {
      let r
      const n = i.child
      const l = i.arrayTypeChildren
      return xe(
        {},
        l,
        (((r = {})[n.type] = [].concat(l[n.type] || [], [
          xe(
            {},
            i.newChildProps,
            this.mapNestedChildrenToProps(n, i.nestedChildren)
          ),
        ])),
        r)
      )
    }),
    (o.mapObjectTypeChildren = function (i) {
      let r
      let n
      const l = i.child
      const u = i.newProps
      const c = i.newChildProps
      const d = i.nestedChildren
      switch (l.type) {
        case X.TITLE:
          return xe(
            {},
            u,
            (((r = {})[l.type] = d), (r.titleAttributes = xe({}, c)), r)
          )
        case X.BODY:
          return xe({}, u, { bodyAttributes: xe({}, c) })
        case X.HTML:
          return xe({}, u, { htmlAttributes: xe({}, c) })
        default:
          return xe({}, u, (((n = {})[l.type] = xe({}, c)), n))
      }
    }),
    (o.mapArrayTypeChildrenToProps = function (i, r) {
      let n = xe({}, r)
      return (
        Object.keys(i).forEach(function (l) {
          let u
          n = xe({}, n, (((u = {})[l] = i[l]), u))
        }),
        n
      )
    }),
    (o.warnOnInvalidChildren = function (i, r) {
      return (
        (0, pi.default)(
          ul.includes(i.type),
          typeof i.type === 'function'
            ? 'You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to o\
ur API for more information.'
            : 'Only elements types ' +
                ul.join(', ') +
                ' are allowed. Helmet does not support rendering <' +
                i.type +
                '> e\
lements. Refer to our API for more information.'
        ),
        (0, pi.default)(
          !r ||
            typeof r === 'string' ||
            (Array.isArray(r) &&
              !r.some(function (n) {
                return typeof n !== 'string'
              })),
          'Helmet expects a string as a child of <' +
            i.type +
            '>. Did you forget to wrap your children in braces? ( <' +
            i.type +
            '>{``}</' +
            i.type +
            '> ) Refer to our API for more information.'
        ),
        !0
      )
    }),
    (o.mapChildrenToProps = function (i, r) {
      const n = this
      let l = {}
      return (
        s.Children.forEach(i, function (u) {
          if (u && u.props) {
            const c = u.props
            const d = c.children
            const p = ll(c, Oy)
            const f = Object.keys(p).reduce(function (y, m) {
              return ((y[Iy[m] || m] = p[m]), y)
            }, {})
            let h = u.type
            switch (
              (typeof h === 'symbol'
                ? (h = h.toString())
                : n.warnOnInvalidChildren(u, d),
              h)
            ) {
              case X.FRAGMENT:
                r = n.mapChildrenToProps(d, r)
                break
              case X.LINK:
              case X.META:
              case X.NOSCRIPT:
              case X.SCRIPT:
              case X.STYLE:
                l = n.flattenArrayTypeChildren({
                  child: u,
                  arrayTypeChildren: l,
                  newChildProps: f,
                  nestedChildren: d,
                })
                break
              default:
                r = n.mapObjectTypeChildren({
                  child: u,
                  newProps: r,
                  newChildProps: f,
                  nestedChildren: d,
                })
            }
          }
        }),
        this.mapArrayTypeChildrenToProps(l, r)
      )
    }),
    (o.render = function () {
      const i = this.props
      const r = i.children
      const n = ll(i, Py)
      let l = xe({}, n)
      let u = n.helmetData
      return (
        r && (l = this.mapChildrenToProps(r, l)),
        !u || u instanceof mi || (u = new mi(u.context, u.instances)),
        u
          ? /* @__PURE__ */ s.createElement(
              yr,
              xe({}, l, { context: u.value, helmetData: void 0 })
            )
          : /* @__PURE__ */ s.createElement(yl.Consumer, null, function (c) {
              return s.createElement(yr, xe({}, l, { context: c }))
            })
      )
    }),
    t
  )
})(Le)
;((ko.propTypes = {
  base: ne.default.object,
  bodyAttributes: ne.default.object,
  children: ne.default.oneOfType([
    ne.default.arrayOf(ne.default.node),
    ne.default.node,
  ]),
  defaultTitle: ne.default.string,
  defer: ne.default.bool,
  encodeSpecialCharacters: ne.default.bool,
  htmlAttributes: ne.default.object,
  link: ne.default.arrayOf(ne.default.object),
  meta: ne.default.arrayOf(ne.default.object),
  noscript: ne.default.arrayOf(ne.default.object),
  onChangeClientState: ne.default.func,
  script: ne.default.arrayOf(ne.default.object),
  style: ne.default.arrayOf(ne.default.object),
  title: ne.default.string,
  titleAttributes: ne.default.object,
  titleTemplate: ne.default.string,
  prioritizeSeoTags: ne.default.bool,
  helmetData: ne.default.object,
}),
  (ko.defaultProps = {
    defer: !0,
    encodeSpecialCharacters: !0,
    prioritizeSeoTags: !1,
  }),
  (ko.displayName = 'Helmet'))

// src/manager/constants.ts
const Qe = '@media (min-width: 600px)'

// src/manager/hooks/useMedia.tsx
function bl(e) {
  const t = /* @__PURE__ */ a(
    n => (typeof window < 'u' ? window.matchMedia(n).matches : !1),
    'getMatches'
  )
  const [o, i] = K(t(e))
  function r() {
    i(t(e))
  }
  return (
    a(r, 'handleChange'),
    H(() => {
      const n = window.matchMedia(e)
      return (
        r(),
        n.addEventListener('change', r),
        () => {
          n.removeEventListener('change', r)
        }
      )
    }, [e]),
    o
  )
}
a(bl, 'useMediaQuery')

// src/manager/components/layout/LayoutProvider.tsx
const vl = Qt({
  isMobileMenuOpen: !1,
  setMobileMenuOpen: /* @__PURE__ */ a(() => {}, 'setMobileMenuOpen'),
  isMobileAboutOpen: !1,
  setMobileAboutOpen: /* @__PURE__ */ a(() => {}, 'setMobileAboutOpen'),
  isMobilePanelOpen: !1,
  setMobilePanelOpen: /* @__PURE__ */ a(() => {}, 'setMobilePanelOpen'),
  isDesktop: !1,
  isMobile: !1,
})
const xl = /* @__PURE__ */ a(({ children: e }) => {
  const [t, o] = K(!1)
  const [i, r] = K(!1)
  const [n, l] = K(!1)
  const u = bl(`(min-width: ${600}px)`)
  const c = !u
  const d = G(
    () => ({
      isMobileMenuOpen: t,
      setMobileMenuOpen: o,
      isMobileAboutOpen: i,
      setMobileAboutOpen: r,
      isMobilePanelOpen: n,
      setMobilePanelOpen: l,
      isDesktop: u,
      isMobile: c,
    }),
    [t, o, i, r, n, l, u, c]
  )
  return /* @__PURE__ */ s.createElement(vl.Provider, { value: d }, e)
}, 'LayoutProvider')
const ge = /* @__PURE__ */ a(() => qo(vl), 'useLayout')

// ../node_modules/@babel/runtime/helpers/esm/extends.js
function j() {
  return (
    (j = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (let t = 1; t < arguments.length; t++) {
            const o = arguments[t]
            for (const i in o) ({}).hasOwnProperty.call(o, i) && (e[i] = o[i])
          }
          return e
        }),
    j.apply(null, arguments)
  )
}
a(j, '_extends')

// ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function Il(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  return e
}
a(Il, '_assertThisInitialized')

// ../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function xt(e, t) {
  return (
    (xt = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (o, i) {
          return ((o.__proto__ = i), o)
        }),
    xt(e, t)
  )
}
a(xt, '_setPrototypeOf')

// ../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function no(e, t) {
  ;((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    xt(e, t))
}
a(no, '_inheritsLoose')

// ../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function br(e) {
  return (
    (br = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    br(e)
  )
}
a(br, '_getPrototypeOf')

// ../node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function Sl(e) {
  try {
    return Function.toString.call(e).includes('[native code]')
  } catch {
    return typeof e === 'function'
  }
}
a(Sl, '_isNativeFunction')

// ../node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function gi() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    )
  } catch {}
  return (gi = /* @__PURE__ */ a(function () {
    return !!e
  }, '_isNativeReflectConstruct'))()
}
a(gi, '_isNativeReflectConstruct')

// ../node_modules/@babel/runtime/helpers/esm/construct.js
function wl(e, t, o) {
  if (gi()) return Reflect.construct.apply(null, arguments)
  const i = [null]
  i.push.apply(i, t)
  const r = new (e.bind.apply(e, i))()
  return (o && xt(r, o.prototype), r)
}
a(wl, '_construct')

// ../node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function vr(e) {
  const t = typeof Map === 'function' ? /* @__PURE__ */ new Map() : void 0
  return (
    (vr = /* @__PURE__ */ a(function (i) {
      if (i === null || !Sl(i)) return i
      if (typeof i !== 'function')
        throw new TypeError(
          'Super expression must either be null or a function'
        )
      if (t !== void 0) {
        if (t.has(i)) return t.get(i)
        t.set(i, r)
      }
      function r() {
        return wl(i, arguments, br(this).constructor)
      }
      return (
        a(r, 'Wrapper'),
        (r.prototype = Object.create(i.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        xt(r, i)
      )
    }, '_wrapNativeSuper')),
    vr(e)
  )
}
a(vr, '_wrapNativeSuper')

// ../node_modules/polished/dist/polished.esm.js
const Fe = /* @__PURE__ */ (function (e) {
  no(t, e)
  function t(o) {
    let i
    if (1)
      i =
        e.call(
          this,
          'An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#' +
            o +
            ' for more information.'
        ) || this
    else for (var r, n, l; l < r; l++);
    return Il(i)
  }
  return (a(t, 'PolishedError'), t)
})(/* @__PURE__ */ vr(Error))
function El(e, t) {
  return e.substr(-t.length) === t
}
a(El, 'endsWith')
const Ay = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/
function Tl(e) {
  if (typeof e !== 'string') return e
  const t = e.match(Ay)
  return t ? parseFloat(e) : e
}
a(Tl, 'stripUnit')
const Dy = /* @__PURE__ */ a(function (t) {
  return function (o, i) {
    i === void 0 && (i = '16px')
    let r = o
    let n = i
    if (typeof o === 'string') {
      if (!El(o, 'px')) throw new Fe(69, t, o)
      r = Tl(o)
    }
    if (typeof i === 'string') {
      if (!El(i, 'px')) throw new Fe(70, t, i)
      n = Tl(i)
    }
    if (typeof r === 'string') throw new Fe(71, o, t)
    if (typeof n === 'string') throw new Fe(72, i, t)
    return '' + r / n + t
  }
}, 'pxtoFactory')
const _l = Dy
const k1 = _l('em')
const O1 = _l('rem')
function yi(e) {
  return Math.round(e * 255)
}
a(yi, 'colorToInt')
function My(e, t, o) {
  return yi(e) + ',' + yi(t) + ',' + yi(o)
}
a(My, 'convertToInt')
function Oo(e, t, o, i) {
  if ((i === void 0 && (i = My), t === 0)) return i(o, o, o)
  const r = (((e % 360) + 360) % 360) / 60
  const n = (1 - Math.abs(2 * o - 1)) * t
  const l = n * (1 - Math.abs((r % 2) - 1))
  let u = 0
  let c = 0
  let d = 0
  r >= 0 && r < 1
    ? ((u = n), (c = l))
    : r >= 1 && r < 2
      ? ((u = l), (c = n))
      : r >= 2 && r < 3
        ? ((c = n), (d = l))
        : r >= 3 && r < 4
          ? ((c = l), (d = n))
          : r >= 4 && r < 5
            ? ((u = l), (d = n))
            : r >= 5 && r < 6 && ((u = n), (d = l))
  const p = o - n / 2
  const f = u + p
  const h = c + p
  const y = d + p
  return i(f, h, y)
}
a(Oo, 'hslToRgb')
const Cl = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
}
function Ly(e) {
  if (typeof e !== 'string') return e
  const t = e.toLowerCase()
  return Cl[t] ? '#' + Cl[t] : e
}
a(Ly, 'nameToHex')
const Ny = /^#[a-fA-F0-9]{6}$/
const Fy = /^#[a-fA-F0-9]{8}$/
const Ry = /^#[a-fA-F0-9]{3}$/
const By = /^#[a-fA-F0-9]{4}$/
const bi = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i
const Hy =
  /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i
const zy =
  /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i
const Wy =
  /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i
function io(e) {
  if (typeof e !== 'string') throw new Fe(3)
  const t = Ly(e)
  if (t.match(Ny))
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
    }
  if (t.match(Fy)) {
    const o = parseFloat((parseInt('' + t[7] + t[8], 16) / 255).toFixed(2))
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
      alpha: o,
    }
  }
  if (t.match(Ry))
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
    }
  if (t.match(By)) {
    const i = parseFloat((parseInt('' + t[4] + t[4], 16) / 255).toFixed(2))
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
      alpha: i,
    }
  }
  const r = bi.exec(t)
  if (r)
    return {
      red: parseInt('' + r[1], 10),
      green: parseInt('' + r[2], 10),
      blue: parseInt('' + r[3], 10),
    }
  const n = Hy.exec(t.substring(0, 50))
  if (n)
    return {
      red: parseInt('' + n[1], 10),
      green: parseInt('' + n[2], 10),
      blue: parseInt('' + n[3], 10),
      alpha:
        parseFloat('' + n[4]) > 1
          ? parseFloat('' + n[4]) / 100
          : parseFloat('' + n[4]),
    }
  const l = zy.exec(t)
  if (l) {
    const u = parseInt('' + l[1], 10)
    const c = parseInt('' + l[2], 10) / 100
    const d = parseInt('' + l[3], 10) / 100
    const p = 'rgb(' + Oo(u, c, d) + ')'
    const f = bi.exec(p)
    if (!f) throw new Fe(4, t, p)
    return {
      red: parseInt('' + f[1], 10),
      green: parseInt('' + f[2], 10),
      blue: parseInt('' + f[3], 10),
    }
  }
  const h = Wy.exec(t.substring(0, 50))
  if (h) {
    const y = parseInt('' + h[1], 10)
    const m = parseInt('' + h[2], 10) / 100
    const b = parseInt('' + h[3], 10) / 100
    const x = 'rgb(' + Oo(y, m, b) + ')'
    const E = bi.exec(x)
    if (!E) throw new Fe(4, t, x)
    return {
      red: parseInt('' + E[1], 10),
      green: parseInt('' + E[2], 10),
      blue: parseInt('' + E[3], 10),
      alpha:
        parseFloat('' + h[4]) > 1
          ? parseFloat('' + h[4]) / 100
          : parseFloat('' + h[4]),
    }
  }
  throw new Fe(5)
}
a(io, 'parseToRgb')
function Vy(e) {
  const t = e.red / 255
  const o = e.green / 255
  const i = e.blue / 255
  const r = Math.max(t, o, i)
  const n = Math.min(t, o, i)
  const l = (r + n) / 2
  if (r === n)
    return e.alpha !== void 0
      ? {
          hue: 0,
          saturation: 0,
          lightness: l,
          alpha: e.alpha,
        }
      : {
          hue: 0,
          saturation: 0,
          lightness: l,
        }
  let u
  const c = r - n
  const d = l > 0.5 ? c / (2 - r - n) : c / (r + n)
  switch (r) {
    case t:
      u = (o - i) / c + (o < i ? 6 : 0)
      break
    case o:
      u = (i - t) / c + 2
      break
    default:
      u = (t - o) / c + 4
      break
  }
  return (
    (u *= 60),
    e.alpha !== void 0
      ? {
          hue: u,
          saturation: d,
          lightness: l,
          alpha: e.alpha,
        }
      : {
          hue: u,
          saturation: d,
          lightness: l,
        }
  )
}
a(Vy, 'rgbToHsl')
function It(e) {
  return Vy(io(e))
}
a(It, 'parseToHsl')
const jy = /* @__PURE__ */ a(function (t) {
  return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6]
    ? '#' + t[1] + t[3] + t[5]
    : t
}, 'reduceHexValue')
const xi = jy
function Lt(e) {
  const t = e.toString(16)
  return t.length === 1 ? '0' + t : t
}
a(Lt, 'numberToHex')
function vi(e) {
  return Lt(Math.round(e * 255))
}
a(vi, 'colorToHex')
function Ky(e, t, o) {
  return xi('#' + vi(e) + vi(t) + vi(o))
}
a(Ky, 'convertToHex')
function xr(e, t, o) {
  return Oo(e, t, o, Ky)
}
a(xr, 'hslToHex')
function $y(e, t, o) {
  if (typeof e === 'number' && typeof t === 'number' && typeof o === 'number')
    return xr(e, t, o)
  if (typeof e === 'object' && t === void 0 && o === void 0)
    return xr(e.hue, e.saturation, e.lightness)
  throw new Fe(1)
}
a($y, 'hsl')
function Uy(e, t, o, i) {
  if (
    typeof e === 'number' &&
    typeof t === 'number' &&
    typeof o === 'number' &&
    typeof i === 'number'
  )
    return i >= 1 ? xr(e, t, o) : 'rgba(' + Oo(e, t, o) + ',' + i + ')'
  if (typeof e === 'object' && t === void 0 && o === void 0 && i === void 0)
    return e.alpha >= 1
      ? xr(e.hue, e.saturation, e.lightness)
      : 'rgba(' + Oo(e.hue, e.saturation, e.lightness) + ',' + e.alpha + ')'
  throw new Fe(2)
}
a(Uy, 'hsla')
function Ii(e, t, o) {
  if (typeof e === 'number' && typeof t === 'number' && typeof o === 'number')
    return xi('#' + Lt(e) + Lt(t) + Lt(o))
  if (typeof e === 'object' && t === void 0 && o === void 0)
    return xi('#' + Lt(e.red) + Lt(e.green) + Lt(e.blue))
  throw new Fe(6)
}
a(Ii, 'rgb')
function so(e, t, o, i) {
  if (typeof e === 'string' && typeof t === 'number') {
    const r = io(e)
    return 'rgba(' + r.red + ',' + r.green + ',' + r.blue + ',' + t + ')'
  } else {
    if (
      typeof e === 'number' &&
      typeof t === 'number' &&
      typeof o === 'number' &&
      typeof i === 'number'
    )
      return i >= 1
        ? Ii(e, t, o)
        : 'rgba(' + e + ',' + t + ',' + o + ',' + i + ')'
    if (typeof e === 'object' && t === void 0 && o === void 0 && i === void 0)
      return e.alpha >= 1
        ? Ii(e.red, e.green, e.blue)
        : 'rgba(' + e.red + ',' + e.green + ',' + e.blue + ',' + e.alpha + ')'
  }
  throw new Fe(7)
}
a(so, 'rgba')
const Gy = /* @__PURE__ */ a(function (t) {
  return (
    typeof t.red === 'number' &&
    typeof t.green === 'number' &&
    typeof t.blue === 'number' &&
    (typeof t.alpha !== 'number' || typeof t.alpha > 'u')
  )
}, 'isRgb')
const qy = /* @__PURE__ */ a(function (t) {
  return (
    typeof t.red === 'number' &&
    typeof t.green === 'number' &&
    typeof t.blue === 'number' &&
    typeof t.alpha === 'number'
  )
}, 'isRgba')
const Yy = /* @__PURE__ */ a(function (t) {
  return (
    typeof t.hue === 'number' &&
    typeof t.saturation === 'number' &&
    typeof t.lightness === 'number' &&
    (typeof t.alpha !== 'number' || typeof t.alpha > 'u')
  )
}, 'isHsl')
const Qy = /* @__PURE__ */ a(function (t) {
  return (
    typeof t.hue === 'number' &&
    typeof t.saturation === 'number' &&
    typeof t.lightness === 'number' &&
    typeof t.alpha === 'number'
  )
}, 'isHsla')
function St(e) {
  if (typeof e !== 'object') throw new Fe(8)
  if (qy(e)) return so(e)
  if (Gy(e)) return Ii(e)
  if (Qy(e)) return Uy(e)
  if (Yy(e)) return $y(e)
  throw new Fe(8)
}
a(St, 'toColorString')
function kl(e, t, o) {
  return /* @__PURE__ */ a(function () {
    const r = o.concat(Array.prototype.slice.call(arguments))
    return r.length >= t ? e.apply(this, r) : kl(e, t, r)
  }, 'fn')
}
a(kl, 'curried')
function ze(e) {
  return kl(e, e.length, [])
}
a(ze, 'curry')
function Xy(e, t) {
  if (t === 'transparent') return t
  const o = It(t)
  return St(
    j({}, o, {
      hue: o.hue + parseFloat(e),
    })
  )
}
a(Xy, 'adjustHue')
const P1 = ze(Xy)
function ao(e, t, o) {
  return Math.max(e, Math.min(t, o))
}
a(ao, 'guard')
function Zy(e, t) {
  if (t === 'transparent') return t
  const o = It(t)
  return St(
    j({}, o, {
      lightness: ao(0, 1, o.lightness - parseFloat(e)),
    })
  )
}
a(Zy, 'darken')
const Jy = ze(Zy)
const Ir = Jy
function eb(e, t) {
  if (t === 'transparent') return t
  const o = It(t)
  return St(
    j({}, o, {
      saturation: ao(0, 1, o.saturation - parseFloat(e)),
    })
  )
}
a(eb, 'desaturate')
const A1 = ze(eb)
function tb(e, t) {
  if (t === 'transparent') return t
  const o = It(t)
  return St(
    j({}, o, {
      lightness: ao(0, 1, o.lightness + parseFloat(e)),
    })
  )
}
a(tb, 'lighten')
const ob = ze(tb)
const Po = ob
function rb(e, t, o) {
  if (t === 'transparent') return o
  if (o === 'transparent') return t
  if (e === 0) return o
  const i = io(t)
  const r = j({}, i, {
    alpha: typeof i.alpha === 'number' ? i.alpha : 1,
  })
  const n = io(o)
  const l = j({}, n, {
    alpha: typeof n.alpha === 'number' ? n.alpha : 1,
  })
  const u = r.alpha - l.alpha
  const c = parseFloat(e) * 2 - 1
  const d = c * u === -1 ? c : c + u
  const p = 1 + c * u
  const f = (d / p + 1) / 2
  const h = 1 - f
  const y = {
    red: Math.floor(r.red * f + l.red * h),
    green: Math.floor(r.green * f + l.green * h),
    blue: Math.floor(r.blue * f + l.blue * h),
    alpha: r.alpha * parseFloat(e) + l.alpha * (1 - parseFloat(e)),
  }
  return so(y)
}
a(rb, 'mix')
const nb = ze(rb)
const Ol = nb
function ib(e, t) {
  if (t === 'transparent') return t
  const o = io(t)
  const i = typeof o.alpha === 'number' ? o.alpha : 1
  const r = j({}, o, {
    alpha: ao(0, 1, (i * 100 + parseFloat(e) * 100) / 100),
  })
  return so(r)
}
a(ib, 'opacify')
const D1 = ze(ib)
function sb(e, t) {
  if (t === 'transparent') return t
  const o = It(t)
  return St(
    j({}, o, {
      saturation: ao(0, 1, o.saturation + parseFloat(e)),
    })
  )
}
a(sb, 'saturate')
const M1 = ze(sb)
function ab(e, t) {
  return t === 'transparent'
    ? t
    : St(
        j({}, It(t), {
          hue: parseFloat(e),
        })
      )
}
a(ab, 'setHue')
const L1 = ze(ab)
function lb(e, t) {
  return t === 'transparent'
    ? t
    : St(
        j({}, It(t), {
          lightness: parseFloat(e),
        })
      )
}
a(lb, 'setLightness')
const N1 = ze(lb)
function ub(e, t) {
  return t === 'transparent'
    ? t
    : St(
        j({}, It(t), {
          saturation: parseFloat(e),
        })
      )
}
a(ub, 'setSaturation')
const F1 = ze(ub)
function cb(e, t) {
  return t === 'transparent' ? t : Ol(parseFloat(e), 'rgb(0, 0, 0)', t)
}
a(cb, 'shade')
const R1 = ze(cb)
function pb(e, t) {
  return t === 'transparent' ? t : Ol(parseFloat(e), 'rgb(255, 255, 255)', t)
}
a(pb, 'tint')
const B1 = ze(pb)
function db(e, t) {
  if (t === 'transparent') return t
  const o = io(t)
  const i = typeof o.alpha === 'number' ? o.alpha : 1
  const r = j({}, o, {
    alpha: ao(0, 1, +(i * 100 - parseFloat(e) * 100).toFixed(2) / 100),
  })
  return so(r)
}
a(db, 'transparentize')
const fb = ze(db)
const Te = fb

// src/manager/components/notifications/NotificationItem.tsx
const mb = Dt({
  '0%': {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})
const hb = Dt({
  '0%': {
    width: '0%',
  },
  '100%': {
    width: '100%',
  },
})
const Pl = I.div(
  ({ theme: e }) => ({
    position: 'relative',
    display: 'flex',
    border: `1px solid ${e.appBorderColor}`,
    padding: '12px 6px 12px 12px',
    borderRadius: e.appBorderRadius + 1,
    alignItems: 'center',
    animation: `${mb} 500ms`,
    background:
      e.base === 'light'
        ? 'hsla(203, 50%, 20%, .97)'
        : 'hsla(203, 30%, 95%, .97)',
    boxShadow:
      '0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1)',
    color: e.color.inverseText,
    textDecoration: 'none',
    overflow: 'hidden',
    [Qe]: {
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.05), 0px -5px 20px 10px ${e.background.app}`,
    },
  }),
  ({ duration: e, theme: t }) =>
    e && {
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        background: t.color.secondary,
        animation: `${hb} ${e}ms linear forwards reverse`,
      },
    }
)
const Al = I(Pl)({
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textAlign: 'left',
  transition: 'all 150ms ease-out',
  transform: 'translate3d(0, 0, 0)',
  '&:hover': {
    transform: 'translate3d(0, -3px, 0)',
    boxShadow:
      '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
  },
  '&:active': {
    transform: 'translate3d(0, 0, 0)',
    boxShadow:
      '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
  },
  '&:focus': {
    boxShadow:
      'rgba(2,156,253,1) 0 0 0 1px inset, 0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0\
.1)',
  },
})
const gb = Al.withComponent('div')
const yb = Al.withComponent(pr)
const bb = I.div({
  display: 'flex',
  marginRight: 10,
  alignItems: 'center',
  svg: {
    width: 16,
    height: 16,
  },
})
const vb = I.div(({ theme: e }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  color: e.base === 'dark' ? e.color.mediumdark : e.color.mediumlight,
}))
const xb = I.div(({ theme: e, hasIcon: t }) => ({
  height: '100%',
  alignItems: 'center',
  whiteSpace: 'balance',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: e.typography.size.s1,
  lineHeight: '16px',
  fontWeight: e.typography.weight.bold,
}))
const Ib = I.div(({ theme: e }) => ({
  color: Te(0.25, e.color.inverseText),
  fontSize: e.typography.size.s1 - 1,
  lineHeight: '14px',
  marginTop: 2,
  whiteSpace: 'balance',
}))
const Si = /* @__PURE__ */ a(
  ({ icon: e, content: { headline: t, subHeadline: o } }) =>
    /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      !e || /* @__PURE__ */ s.createElement(bb, null, e),
      /* @__PURE__ */ s.createElement(
        vb,
        null,
        /* @__PURE__ */ s.createElement(xb, { title: t, hasIcon: !!e }, t),
        o && /* @__PURE__ */ s.createElement(Ib, null, o)
      )
    ),
  'ItemCont\
ent'
)
const Sb = I(ee)(({ theme: e }) => ({
  width: 28,
  alignSelf: 'center',
  marginTop: 0,
  color: e.base === 'light' ? 'rgba(255,255,255,0.7)' : ' #999999',
}))
const wi = /* @__PURE__ */ a(
  ({ onDismiss: e }) =>
    /* @__PURE__ */ s.createElement(
      Sb,
      {
        title: 'Dismiss notification',
        onClick: t => {
          ;(t.preventDefault(), t.stopPropagation(), e())
        },
      },
      /* @__PURE__ */ s.createElement(bo, { size: 12 })
    ),
  'DismissNotificationItem'
)
const q1 = I.div({
  height: 48,
})
const wb = /* @__PURE__ */ a(
  ({
    notification: {
      content: e,
      duration: t,
      link: o,
      onClear: i,
      onClick: r,
      id: n,
      icon: l,
    },
    onDismissNotification: u,
    zIndex: c,
  }) => {
    const d = A(() => {
      ;(u(n), i && i({ dismissed: !1, timeout: !0 }))
    }, [n, u, i])
    const p = U(null)
    H(() => {
      if (t)
        return ((p.current = setTimeout(d, t)), () => clearTimeout(p.current))
    }, [t, d])
    const f = A(() => {
      ;(clearTimeout(p.current), u(n), i && i({ dismissed: !0, timeout: !1 }))
    }, [n, u, i])
    return o
      ? /* @__PURE__ */ s.createElement(
          yb,
          { to: o, duration: t, style: { zIndex: c } },
          /* @__PURE__ */ s.createElement(Si, { icon: l, content: e }),
          /* @__PURE__ */ s.createElement(wi, { onDismiss: f })
        )
      : r
        ? /* @__PURE__ */ s.createElement(
            gb,
            {
              duration: t,
              onClick: () => r({ onDismiss: f }),
              style: { zIndex: c },
            },
            /* @__PURE__ */ s.createElement(Si, { icon: l, content: e }),
            /* @__PURE__ */ s.createElement(wi, { onDismiss: f })
          )
        : /* @__PURE__ */ s.createElement(
            Pl,
            { duration: t, style: { zIndex: c } },
            /* @__PURE__ */ s.createElement(Si, { icon: l, content: e }),
            /* @__PURE__ */ s.createElement(wi, { onDismiss: f })
          )
  },
  'NotificationItem'
)
const Dl = wb

// src/manager/components/notifications/NotificationList.tsx
const Sr = /* @__PURE__ */ a(({ notifications: e, clearNotification: t }) => {
  const { isMobile: o } = ge()
  return /* @__PURE__ */ s.createElement(
    Eb,
    { isMobile: o },
    e &&
      e.map((i, r) =>
        /* @__PURE__ */ s.createElement(Dl, {
          key: i.id,
          onDismissNotification: n => t(n),
          notification: i,
          zIndex: e.length - r,
        })
      )
  )
}, 'NotificationList')
var Eb = I.div(
  {
    zIndex: 200,
    '> * + *': {
      marginTop: 12,
    },
    '&:empty': {
      display: 'none',
    },
  },
  ({ isMobile: e }) =>
    e && {
      position: 'fixed',
      bottom: 40,
      margin: 20,
    }
)

// src/manager/container/Notifications.tsx
const Tb = /* @__PURE__ */ a(
  ({ state: e, api: t }) => ({
    notifications: e.notifications,
    clearNotification: t.clearNotification,
  }),
  'mapper'
)
const Ml = /* @__PURE__ */ a(
  e =>
    /* @__PURE__ */ s.createElement(me, { filter: Tb }, t =>
      /* @__PURE__ */ s.createElement(Sr, {
        ...e,
        ...t,
      })
    ),
  'Notifications'
)

// ../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function ke(e, t) {
  if (e == null) return {}
  const o = {}
  for (const i in e)
    if ({}.hasOwnProperty.call(e, i)) {
      if (t.includes(i)) continue
      o[i] = e[i]
    }
  return o
}
a(ke, '_objectWithoutPropertiesLoose')

// global-externals:react-dom
const Ao = __REACT_DOM__
const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ck,
  createPortal: pk,
  createRoot: dk,
  findDOMNode: fk,
  flushSync: Do,
  hydrate: mk,
  hydrateRoot: hk,
  render: gk,
  unmountComponentAtNode: yk,
  unstable_batchedUpdates: bk,
  unstable_renderSubtreeIntoContainer: vk,
  version: xk,
} = __REACT_DOM__

// ../node_modules/react-transition-group/esm/config.js
const Ei = {
  disabled: !1,
}

// ../node_modules/react-transition-group/esm/TransitionGroupContext.js
const Ti = s.createContext(null)

// ../node_modules/react-transition-group/esm/utils/reflow.js
const Ll = /* @__PURE__ */ a(function (t) {
  return t.scrollTop
}, 'forceReflow')

// ../node_modules/react-transition-group/esm/Transition.js
const Mo = 'unmounted'
const Nt = 'exited'
const Ft = 'entering'
const uo = 'entered'
const Ci = 'exiting'
const dt = /* @__PURE__ */ (function (e) {
  no(t, e)
  function t(i, r) {
    let n
    n = e.call(this, i, r) || this
    const l = r
    const u = l && !l.isMounting ? i.enter : i.appear
    let c
    return (
      (n.appearStatus = null),
      i.in
        ? u
          ? ((c = Nt), (n.appearStatus = Ft))
          : (c = uo)
        : i.unmountOnExit || i.mountOnEnter
          ? (c = Mo)
          : (c = Nt),
      (n.state = {
        status: c,
      }),
      (n.nextCallback = null),
      n
    )
  }
  ;(a(t, 'Transition'),
    (t.getDerivedStateFromProps = /* @__PURE__ */ a(function (r, n) {
      const l = r.in
      return l && n.status === Mo
        ? {
            status: Nt,
          }
        : null
    }, 'getDerivedStateFromProps')))
  const o = t.prototype
  return (
    (o.componentDidMount = /* @__PURE__ */ a(function () {
      this.updateStatus(!0, this.appearStatus)
    }, 'componentDidMount')),
    (o.componentDidUpdate = /* @__PURE__ */ a(function (r) {
      let n = null
      if (r !== this.props) {
        const l = this.state.status
        this.props.in
          ? l !== Ft && l !== uo && (n = Ft)
          : (l === Ft || l === uo) && (n = Ci)
      }
      this.updateStatus(!1, n)
    }, 'componentDidUpdate')),
    (o.componentWillUnmount = /* @__PURE__ */ a(function () {
      this.cancelNextCallback()
    }, 'componentWillUnmount')),
    (o.getTimeouts = /* @__PURE__ */ a(function () {
      const r = this.props.timeout
      let n
      let l
      let u
      return (
        (n = l = u = r),
        r != null &&
          typeof r !== 'number' &&
          ((n = r.exit),
          (l = r.enter),
          (u = r.appear !== void 0 ? r.appear : l)),
        {
          exit: n,
          enter: l,
          appear: u,
        }
      )
    }, 'getTimeouts')),
    (o.updateStatus = /* @__PURE__ */ a(function (r, n) {
      if ((r === void 0 && (r = !1), n !== null))
        if ((this.cancelNextCallback(), n === Ft)) {
          if (this.props.unmountOnExit || this.props.mountOnEnter) {
            const l = this.props.nodeRef
              ? this.props.nodeRef.current
              : Ao.findDOMNode(this)
            l && Ll(l)
          }
          this.performEnter(r)
        } else this.performExit()
      else
        this.props.unmountOnExit &&
          this.state.status === Nt &&
          this.setState({
            status: Mo,
          })
    }, 'updateStatus')),
    (o.performEnter = /* @__PURE__ */ a(function (r) {
      const n = this
      const l = this.props.enter
      const u = this.context ? this.context.isMounting : r
      const c = this.props.nodeRef ? [u] : [Ao.findDOMNode(this), u]
      const d = c[0]
      const p = c[1]
      const f = this.getTimeouts()
      const h = u ? f.appear : f.enter
      if ((!r && !l) || Ei.disabled) {
        this.safeSetState(
          {
            status: uo,
          },
          function () {
            n.props.onEntered(d)
          }
        )
        return
      }
      ;(this.props.onEnter(d, p),
        this.safeSetState(
          {
            status: Ft,
          },
          function () {
            ;(n.props.onEntering(d, p),
              n.onTransitionEnd(h, function () {
                n.safeSetState(
                  {
                    status: uo,
                  },
                  function () {
                    n.props.onEntered(d, p)
                  }
                )
              }))
          }
        ))
    }, 'performEnter')),
    (o.performExit = /* @__PURE__ */ a(function () {
      const r = this
      const n = this.props.exit
      const l = this.getTimeouts()
      const u = this.props.nodeRef ? void 0 : Ao.findDOMNode(this)
      if (!n || Ei.disabled) {
        this.safeSetState(
          {
            status: Nt,
          },
          function () {
            r.props.onExited(u)
          }
        )
        return
      }
      ;(this.props.onExit(u),
        this.safeSetState(
          {
            status: Ci,
          },
          function () {
            ;(r.props.onExiting(u),
              r.onTransitionEnd(l.exit, function () {
                r.safeSetState(
                  {
                    status: Nt,
                  },
                  function () {
                    r.props.onExited(u)
                  }
                )
              }))
          }
        ))
    }, 'performExit')),
    (o.cancelNextCallback = /* @__PURE__ */ a(function () {
      this.nextCallback !== null &&
        (this.nextCallback.cancel(), (this.nextCallback = null))
    }, 'cancelNextCallback')),
    (o.safeSetState = /* @__PURE__ */ a(function (r, n) {
      ;((n = this.setNextCallback(n)), this.setState(r, n))
    }, 'safeSetState')),
    (o.setNextCallback = /* @__PURE__ */ a(function (r) {
      const n = this
      let l = !0
      return (
        (this.nextCallback = function (u) {
          l && ((l = !1), (n.nextCallback = null), r(u))
        }),
        (this.nextCallback.cancel = function () {
          l = !1
        }),
        this.nextCallback
      )
    }, 'setNextCallback')),
    (o.onTransitionEnd = /* @__PURE__ */ a(function (r, n) {
      this.setNextCallback(n)
      const l = this.props.nodeRef
        ? this.props.nodeRef.current
        : Ao.findDOMNode(this)
      const u = r == null && !this.props.addEndListener
      if (!l || u) {
        setTimeout(this.nextCallback, 0)
        return
      }
      if (this.props.addEndListener) {
        const c = this.props.nodeRef
          ? [this.nextCallback]
          : [l, this.nextCallback]
        const d = c[0]
        const p = c[1]
        this.props.addEndListener(d, p)
      }
      r != null && setTimeout(this.nextCallback, r)
    }, 'onTransitionEnd')),
    (o.render = /* @__PURE__ */ a(function () {
      const r = this.state.status
      if (r === Mo) return null
      const n = this.props
      const l = n.children
      const u = n.in
      const c = n.mountOnEnter
      const d = n.unmountOnExit
      const p = n.appear
      const f = n.enter
      const h = n.exit
      const y = n.timeout
      const m = n.addEndListener
      const b = n.onEnter
      const x = n.onEntering
      const E = n.onEntered
      const g = n.onExit
      const v = n.onExiting
      const S = n.onExited
      const w = n.nodeRef
      const k = ke(n, [
        'children',
        'in',
        'mountOnEnter',
        'unmountOnExit',
        'appear',
        'enter',
        'exit',
        'timeout',
        'addEndListener',
        'onEnter',
        'onEntering',
        '\
onEntered',
        'onExit',
        'onExiting',
        'onExited',
        'nodeRef',
      ])
      return (
        // allows for nested Transitions
        /* @__PURE__ */ s.createElement(
          Ti.Provider,
          {
            value: null,
          },
          typeof l === 'function'
            ? l(r, k)
            : s.cloneElement(s.Children.only(l), k)
        )
      )
    }, 'render')),
    t
  )
})(s.Component)
dt.contextType = Ti
dt.propTypes = {}
function lo() {}
a(lo, 'noop')
dt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: lo,
  onEntering: lo,
  onEntered: lo,
  onExit: lo,
  onExiting: lo,
  onExited: lo,
}
dt.UNMOUNTED = Mo
dt.EXITED = Nt
dt.ENTERING = Ft
dt.ENTERED = uo
dt.EXITING = Ci
const ft = dt

// src/manager/hooks/useModalDialog.ts
function wr({ isOpen: e, onClose: t }) {
  const o = U(null)
  return (
    H(() => {
      const i = o.current
      i && e && (i.hasAttribute('open') || i.showModal())
    }, [e]),
    H(() => {
      const i = o.current
      if (i) {
        const r = /* @__PURE__ */ a(l => {
          e && (l.preventDefault(), t())
        }, 'handleDialogCloseEvent')
        const n = /* @__PURE__ */ a(l => {
          l.key === 'Escape' && e && (l.preventDefault(), t())
        }, 'handleEscapeKey')
        return (
          i.addEventListener('close', r),
          i.addEventListener('keydown', n),
          () => {
            ;(i.removeEventListener('close', r),
              i.removeEventListener('keydown', n))
          }
        )
      }
    }, [e, t]),
    o
  )
}
a(wr, 'useModalDialog')

// src/manager/components/mobile/navigation/MobileAddonsDrawer.tsx
const Cb = I.dialog(({ theme: e, state: t }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  top: 'auto',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '100vw',
  background: e.background.content,
  height: '42vh',
  zIndex: 11,
  overflow: 'hidden',
  border: 'none',
  padding: 0,
  margin: 0,
  transform: `translateY(${t === 'entering' || t === 'entered' ? '0' : '100%'})`,
  transition: `all ${300}ms ease-in-out`,
  '&[open]': {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 'auto',
    width: '100%',
    maxWidth: '100vw',
    margin: 0,
  },
}))
const _b = I.div(({ state: e }) => ({
  width: '100%',
  height: '100%',
  transition: `all ${300}ms ease-in-out`,
  opacity: e === 'entered' || e === 'entering' ? 1 : 0,
}))
const Nl = /* @__PURE__ */ a(
  ({ children: e, id: t, isOpen: o, onClose: i }) => {
    const r = wr({ isOpen: o, onClose: i })
    const n = A(() => {
      r.current && r.current.hasAttribute('open') && r.current.close()
    }, [])
    return /* @__PURE__ */ s.createElement(
      ft,
      {
        nodeRef: r,
        in: o,
        timeout: 300,
        mountOnEnter: !0,
        unmountOnExit: !0,
        onExited: () => {
          n()
        },
      },
      l =>
        /* @__PURE__ */ s.createElement(
          Cb,
          { ref: r, state: l, id: t, 'aria-label': 'Addon panel' },
          /* @__PURE__ */ s.createElement(_b, { state: l }, e)
        )
    )
  },
  'MobileAddonsDrawer'
)

// src/manager/components/upgrade/UpgradeBlock.tsx
const Er = /* @__PURE__ */ a(({ onNavigateToWhatsNew: e }) => {
  const t = oe()
  const [o, i] = K('npm')
  return /* @__PURE__ */ s.createElement(
    kb,
    null,
    /* @__PURE__ */ s.createElement(
      'strong',
      null,
      'You are on Storybook ',
      t.getCurrentVersion().version
    ),
    /* @__PURE__ */ s.createElement(
      'p',
      null,
      'Run the following script to check for updates and upgrade to the latest version.'
    ),
    /* @__PURE__ */ s.createElement(
      Ob,
      null,
      /* @__PURE__ */ s.createElement(
        _i,
        { active: o === 'npm', onClick: () => i('npm') },
        'npm'
      ),
      /* @__PURE__ */ s.createElement(
        _i,
        { active: o === 'yarn', onClick: () => i('yarn') },
        'yarn'
      ),
      /* @__PURE__ */ s.createElement(
        _i,
        { active: o === 'pnpm', onClick: () => i('pnpm') },
        'pnpm'
      )
    ),
    /* @__PURE__ */ s.createElement(
      Pb,
      null,
      o === 'npm'
        ? 'npx storybook@latest upgrade'
        : `${o} dlx storybook@latest u\
pgrade`
    ),
    e &&
      /* @__PURE__ */ s.createElement(
        Pe,
        { onClick: e },
        "See what's new in Storybook"
      )
  )
}, 'UpgradeBlock')
var kb = I.div(({ theme: e }) => ({
  border: '1px solid',
  borderRadius: 5,
  padding: 20,
  marginTop: 0,
  borderColor: e.appBorderColor,
  fontSize: e.typography.size.s2,
  width: '100%',
  [Qe]: {
    maxWidth: 400,
  },
}))
var Ob = I.div({
  display: 'flex',
  gap: 2,
})
var Pb = I.pre(({ theme: e }) => ({
  background: e.base === 'light' ? 'rgba(0, 0, 0, 0.05)' : e.appBorderColor,
  fontSize: e.typography.size.s2 - 1,
  margin: '4px 0 16px',
}))
var _i = I.button(({ theme: e, active: t }) => ({
  all: 'unset',
  alignItems: 'center',
  gap: 10,
  color: e.color.defaultText,
  fontSize: e.typography.size.s2 - 1,
  borderBottom: '2px solid transparent',
  borderBottomColor: t ? e.color.secondary : 'none',
  padding: '0 10px 5px',
  marginBottom: '5px',
  cursor: 'pointer',
}))

// src/manager/components/mobile/about/MobileAbout.tsx
const Bl = /* @__PURE__ */ a(() => {
  const { isMobileAboutOpen: e, setMobileAboutOpen: t } = ge()
  const o = U(null)
  return /* @__PURE__ */ s.createElement(
    ft,
    {
      nodeRef: o,
      in: e,
      timeout: 300,
      appear: !0,
      mountOnEnter: !0,
      unmountOnExit: !0,
    },
    i =>
      /* @__PURE__ */ s.createElement(
        Ab,
        { ref: o, state: i, transitionDuration: 300 },
        /* @__PURE__ */ s.createElement(
          Lb,
          { onClick: () => t(!1), title: 'Close about section' },
          /* @__PURE__ */ s.createElement(En, null),
          'Back'
        ),
        /* @__PURE__ */ s.createElement(
          Db,
          null,
          /* @__PURE__ */ s.createElement(
            Fl,
            {
              href: 'https://github.com/storybookjs/storybook',
              target: '_blank',
            },
            /* @__PURE__ */ s.createElement(
              Rl,
              null,
              /* @__PURE__ */ s.createElement(vo, null),
              /* @__PURE__ */ s.createElement('span', null, 'Github')
            ),
            /* @__PURE__ */ s.createElement(tt, { width: 12 })
          ),
          /* @__PURE__ */ s.createElement(
            Fl,
            {
              href: 'https://storybook.js.org/docs/react/get-started/install/',
              target: '_blank',
            },
            /* @__PURE__ */ s.createElement(
              Rl,
              null,
              /* @__PURE__ */ s.createElement(qn, null),
              /* @__PURE__ */ s.createElement(
                'span',
                null,
                'Do\
cumentation'
              )
            ),
            /* @__PURE__ */ s.createElement(tt, { width: 12 })
          )
        ),
        /* @__PURE__ */ s.createElement(Er, null),
        /* @__PURE__ */ s.createElement(
          Mb,
          null,
          'Open source software maintained by',
          ' ',
          /* @__PURE__ */ s.createElement(
            Pe,
            { href: 'https://chromatic.com', target: '_blank' },
            'Chromatic'
          ),
          ' ',
          'and the',
          ' ',
          /* @__PURE__ */ s.createElement(
            Pe,
            {
              href: 'https://github.com/storybookjs/storybook/graphs/contributors',
            },
            'Storybook Community'
          )
        )
      )
  )
}, 'MobileAbout')
var Ab = I.div(({ theme: e, state: t, transitionDuration: o }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 11,
  transition: `all ${o}ms ease-in-out`,
  overflow: 'scroll',
  padding: '25px 10px 10px',
  color: e.color.defaultText,
  background: e.background.content,
  opacity: `${(() => {
    switch (t) {
      case 'entering':
      case 'entered':
        return 1
      case 'exiting':
      case 'exited':
        return 0
      default:
        return 0
    }
  })()}`,
  transform: `${(() => {
    switch (t) {
      case 'entering':
      case 'entered':
        return 'translateX(0)'
      case 'exiting':
      case 'exited':
        return 'translateX(20px)'
      default:
        return 'translateX(0)'
    }
  })()}`,
}))
var Db = I.div({
  marginTop: 20,
  marginBottom: 20,
})
var Fl = I.a(({ theme: e }) => ({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: e.typography.size.s2 - 1,
  height: 52,
  borderBottom: `1px solid ${e.appBorderColor}`,
  cursor: 'pointer',
  padding: '0 10px',
  '&:last-child': {
    borderBottom: 'none',
  },
}))
var Rl = I.div(({ theme: e }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: e.typography.size.s2 - 1,
  height: 40,
  gap: 5,
}))
var Mb = I.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2 - 1,
  marginTop: 30,
}))
var Lb = I.button(({ theme: e }) => ({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: 'currentColor',
  fontSize: e.typography.size.s2 - 1,
  padding: '0 10px',
}))

// src/manager/components/mobile/navigation/MobileMenuDrawer.tsx
const Hl = /* @__PURE__ */ a(({ children: e, id: t }) => {
  const o = U(null)
  const i = U(null)
  const {
    isMobileMenuOpen: r,
    setMobileMenuOpen: n,
    isMobileAboutOpen: l,
    setMobileAboutOpen: u,
  } = ge()
  const c = A(() => {
    n(!1)
  }, [n])
  const d = wr({
    isOpen: r,
    onClose: c,
  })
  const p = A(() => {
    d.current && d.current.hasAttribute('open') && d.current.close()
  }, [])
  return /* @__PURE__ */ s.createElement(
    s.Fragment,
    null,
    /* @__PURE__ */ s.createElement(
      ft,
      {
        nodeRef: d,
        in: r,
        timeout: 300,
        mountOnEnter: !0,
        unmountOnExit: !0,
        onExited: () => {
          ;(u(!1), p())
        },
      },
      f =>
        /* @__PURE__ */ s.createElement(
          Nb,
          { ref: d, state: f, id: t, 'aria-label': 'Navigation menu' },
          /* @__PURE__ */ s.createElement(
            ft,
            {
              nodeRef: o,
              in: !l,
              timeout: 300,
            },
            h => /* @__PURE__ */ s.createElement(Fb, { ref: o, state: h }, e)
          ),
          /* @__PURE__ */ s.createElement(Bl, null)
        )
    ),
    /* @__PURE__ */ s.createElement(
      ft,
      {
        nodeRef: i,
        in: r,
        timeout: 300,
        mountOnEnter: !0,
        unmountOnExit: !0,
      },
      f =>
        /* @__PURE__ */ s.createElement(Rb, {
          ref: i,
          state: f,
          onClick: c,
          'aria-label': 'Close navigation menu',
        })
    )
  )
}, 'MobileMenuDrawer')
var Nb = I.dialog(({ theme: e, state: t }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  top: 'auto',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '100vw',
  background: e.background.content,
  height: '80%',
  zIndex: 11,
  borderRadius: '10px 10px 0 0',
  transition: `all ${300}ms ease-in-out`,
  overflow: 'hidden',
  transform: `${
    t === 'entering' || t === 'entered'
      ? 'translateY(0)'
      : t === 'exiting' || t === 'exited'
        ? 'translateY(100%)'
        : 'translateY\
(0)'
  }`,
  border: 'none',
  padding: 0,
  margin: 0,
  '&[open]': {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 'auto',
    width: '100%',
    maxWidth: '100vw',
    margin: 0,
  },
}))
var Fb = I.div(({ theme: e, state: t }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 1,
  transition: `all ${300}ms ease-in-out`,
  overflow: 'hidden',
  opacity: `${t === 'entered' || t === 'entering' ? 1 : t === 'exiting' || t === 'exited' ? 0 : 1}`,
  transform: `${(() => {
    switch (t) {
      case 'entering':
      case 'entered':
        return 'translateX(0)'
      case 'exiting':
      case 'exited':
        return 'translateX(-20px)'
      default:
        return 'translateX(0)'
    }
  })()}`,
}))
var Rb = I.div(({ state: e }) => ({
  position: 'fixed',
  boxSizing: 'border-box',
  background: 'rgba(0, 0, 0, 0.5)',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 10,
  transition: `all ${300}ms ease-in-out`,
  cursor: 'pointer',
  opacity: `${(() => {
    switch (e) {
      case 'entering':
      case 'entered':
        return 1
      case 'exiting':
      case 'exited':
        return 0
      default:
        return 0
    }
  })()}`,
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.6)',
  },
}))

// src/manager/components/mobile/navigation/MobileNavigation.tsx
function Bb(e, t) {
  const o = { ...(e || {}) }
  return (
    Object.values(t).forEach(i => {
      i.index && Object.assign(o, i.index)
    }),
    o
  )
}
a(Bb, 'combineIndexes')
const Hb = /* @__PURE__ */ a(() => {
  const { index: e, refs: t } = Ne()
  const o = oe()
  const i = o.getCurrentStoryData()
  if (!i) return ''
  const r = Bb(e, t || {})
  let n = i.renderLabel?.(i, o) || i.name
  let l = r[i.id]
  for (; l && 'parent' in l && l.parent && r[l.parent] && n.length < 24; )
    ((l = r[l.parent]), (n = `${l.renderLabel?.(l, o) || l.name}/${n}`))
  return n
}, 'useFullStoryName')
const zl = /* @__PURE__ */ a(({ menu: e, panel: t, showPanel: o, ...i }) => {
  const {
    isMobileMenuOpen: r,
    isMobilePanelOpen: n,
    setMobileMenuOpen: l,
    setMobilePanelOpen: u,
  } = ge()
  const c = Hb()
  const d = /* @__PURE__ */ a(() => {
    u(!1)
  }, 'handleAddonPanelClose')
  return /* @__PURE__ */ s.createElement(
    zb,
    { ...i },
    /* @__PURE__ */ s.createElement(Hl, { id: 'storybook-mobile-menu' }, e),
    /* @__PURE__ */ s.createElement(
      Nl,
      {
        id: 'storybook-mobile-addon-panel',
        isOpen: n,
        onClose: d,
      },
      t
    ),
    !n &&
      /* @__PURE__ */ s.createElement(
        Wb,
        {
          className: 'sb-bar',
          role: 'toolbar',
          'aria-label': 'Mobile navigation controls',
        },
        /* @__PURE__ */ s.createElement(
          Vb,
          {
            onClick: () => l(!r),
            'aria-label': 'Open navigation menu',
            'aria-expanded': r,
            'aria-controls': 'storybook-mobile-menu',
          },
          /* @__PURE__ */ s.createElement(Io, null),
          /* @__PURE__ */ s.createElement(jb, null, c)
        ),
        o &&
          /* @__PURE__ */ s.createElement(
            ee,
            {
              onClick: () => u(!0),
              'aria-label': 'Open addon panel',
              'aria-expanded': n,
              'aria-controls': 'storybook-mobile-addon-panel',
            },
            /* @__PURE__ */ s.createElement(Tn, null)
          )
      )
  )
}, 'MobileNavigation')
var zb = I.div(({ theme: e }) => ({
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 10,
  background: e.barBg,
  borderTop: `1px solid ${e.appBorderColor}`,
}))
var Wb = I.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 40,
  padding: '0 6px',
})
var Vb = I.button(({ theme: e }) => ({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: e.barTextColor,
  fontSize: `${e.typography.size.s2 - 1}px`,
  padding: '0 7px',
  fontWeight: e.typography.weight.bold,
  WebkitLineClamp: 1,
  '> svg': {
    width: 14,
    height: 14,
    flexShrink: 0,
  },
  '&:focus-visible': {
    outline: `2px solid ${e.color.secondary}`,
    outlineOffset: 2,
  },
}))
var jb = I.p({
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

// src/manager/components/layout/useDragging.ts
const Wl = 30
const Tr = 240
const Cr = 270
const Vl = 0.9
function jl(e, t, o) {
  return Math.min(Math.max(e, t), o)
}
a(jl, 'clamp')
function Kl(e, t, o) {
  return t + (o - t) * e
}
a(Kl, 'interpolate')
function $l({ setState: e, isPanelShown: t, isDesktop: o }) {
  const i = U(null)
  const r = U(null)
  return (
    H(() => {
      const n = i.current
      const l = r.current
      const u = document.querySelector('#storybook-preview-wrapper')
      let c = null
      const d = /* @__PURE__ */ a(h => {
        ;(h.preventDefault(),
          e(y => ({
            ...y,
            isDragging: !0,
          })),
          h.currentTarget === n ? (c = n) : h.currentTarget === l && (c = l),
          window.addEventListener('mousemove', f),
          window.addEventListener('mouseup', p),
          u && (u.style.pointerEvents = 'none'))
      }, 'onDragStart')
      const p = /* @__PURE__ */ a(h => {
        ;(e(y =>
          c === l && y.navSize < Tr && y.navSize > 0
            ? {
                ...y,
                isDragging: !1,
                navSize: Tr,
              }
            : c === n &&
                y.panelPosition === 'right' &&
                y.rightPanelWidth < Cr &&
                y.rightPanelWidth > 0
              ? {
                  ...y,
                  isDragging: !1,
                  rightPanelWidth: Cr,
                }
              : {
                  ...y,
                  isDragging: !1,
                }
        ),
          window.removeEventListener('mousemove', f),
          window.removeEventListener('mouseup', p),
          u?.removeAttribute('style'),
          (c = null))
      }, 'onDragEnd')
      const f = /* @__PURE__ */ a(h => {
        if (h.buttons === 0) {
          p(h)
          return
        }
        e(y => {
          if (c === l) {
            const m = h.clientX
            return m === y.navSize
              ? y
              : m <= Wl
                ? {
                    ...y,
                    navSize: 0,
                  }
                : m <= Tr
                  ? {
                      ...y,
                      navSize: Kl(Vl, m, Tr),
                    }
                  : {
                      ...y,
                      // @ts-expect-error (non strict)
                      navSize: jl(m, 0, h.view.innerWidth),
                    }
          }
          if (c === n) {
            const m =
              y.panelPosition === 'bottom'
                ? 'bottomPanelHeight'
                : 'rightPanelWidth'
            const b =
              y.panelPosition === 'bottom'
                ? // @ts-expect-error (non strict)
                  h.view.innerHeight - h.clientY
                : // @ts-expect-error (non strict)
                  h.view.innerWidth - h.clientX
            if (b === y[m]) return y
            if (b <= Wl)
              return {
                ...y,
                [m]: 0,
              }
            if (y.panelPosition === 'right' && b <= Cr)
              return {
                ...y,
                [m]: Kl(Vl, b, Cr),
              }
            const x =
              // @ts-expect-error (non strict)
              y.panelPosition === 'bottom'
                ? h.view.innerHeight
                : h.view.innerWidth
            return {
              ...y,
              [m]: jl(b, 0, x),
            }
          }
          return y
        })
      }, 'onDrag')
      return (
        n?.addEventListener('mousedown', d),
        l?.addEventListener('mousedown', d),
        () => {
          ;(n?.removeEventListener('mousedown', d),
            l?.removeEventListener('mousedown', d),
            u?.removeAttribute('style'))
        }
      )
    }, [
      // we need to rerun this effect when the panel is shown/hidden or when changing between mobile/desktop to re-attach the event listeners
      t,
      o,
      e,
    ]),
    { panelResizerRef: i, sidebarResizerRef: r }
  )
}
a($l, 'useDragging')

// src/manager/components/layout/Layout.tsx
const Kb = 100
const Ul = /* @__PURE__ */ a(
  (e, t) =>
    e.navSize === t.navSize &&
    e.bottomPanelHeight === t.bottomPanelHeight &&
    e.rightPanelWidth === t.rightPanelWidth &&
    e.panelPosition === t.panelPosition,
  'layoutStateIsEqual'
)
const $b = /* @__PURE__ */ a(
  ({
    api: e,
    managerLayoutState: t,
    setManagerLayoutState: o,
    isDesktop: i,
    hasTab: r,
  }) => {
    const n = s.useRef(t)
    const [l, u] = K({
      ...t,
      isDragging: !1,
    })
    ;(H(() => {
      l.isDragging || // don't interrupt user's drag
        Ul(t, n.current) ||
        ((n.current = t), u(x => ({ ...x, ...t })))
    }, [l.isDragging, t, u]),
      Xt(() => {
        if (
          l.isDragging || // wait with syncing managerLayoutState until user is done dragging
          Ul(t, l)
        )
          return
        const x = {
          navSize: l.navSize,
          bottomPanelHeight: l.bottomPanelHeight,
          rightPanelWidth: l.rightPanelWidth,
        }
        ;((n.current = {
          ...n.current,
          ...x,
        }),
          o(x))
      }, [l, o]))
    const c = t.viewMode !== 'story' && t.viewMode !== 'docs'
    const d = t.viewMode === 'story' && !r
    const { panelResizerRef: p, sidebarResizerRef: f } = $l({
      setState: u,
      isPanelShown: d,
      isDesktop: i,
    })
    const {
      navSize: h,
      rightPanelWidth: y,
      bottomPanelHeight: m,
    } = l.isDragging ? l : t
    return {
      navSize: e.getNavSizeWithCustomisations?.(h) ?? h,
      rightPanelWidth: y,
      bottomPanelHeight: m,
      panelPosition: t.panelPosition,
      panelResizerRef: p,
      sidebarResizerRef: f,
      showPages: c,
      showPanel: d,
      isDragging: l.isDragging,
    }
  },
  'useLayoutSyncingState'
)
const Gl = /* @__PURE__ */ a(
  ({ children: e }) =>
    /* @__PURE__ */ s.createElement(
      Ga,
      { path: /(^\/story|docs|onboarding\/|^\/$)/, startsWith: !1 },
      ({ match: t }) => /* @__PURE__ */ s.createElement(Yb, { shown: !!t }, e)
    ),
  'MainContentMatcher'
)
const Ub = I(zl)({
  order: 1,
})
const Yl = /* @__PURE__ */ a(
  ({ managerLayoutState: e, setManagerLayoutState: t, hasTab: o, ...i }) => {
    const { isDesktop: r, isMobile: n } = ge()
    const l = oe()
    const {
      navSize: u,
      rightPanelWidth: c,
      bottomPanelHeight: d,
      panelPosition: p,
      panelResizerRef: f,
      sidebarResizerRef: h,
      showPages: y,
      showPanel: m,
      isDragging: b,
    } = $b({
      api: l,
      managerLayoutState: e,
      setManagerLayoutState: t,
      isDesktop: r,
      hasTab: o,
    })
    return /* @__PURE__ */ s.createElement(
      Gb,
      {
        navSize: u,
        rightPanelWidth: c,
        bottomPanelHeight: d,
        panelPosition: e.panelPosition,
        isDragging: b,
        viewMode: e.viewMode,
        showPanel: m,
      },
      y && /* @__PURE__ */ s.createElement(Qb, null, i.slotPages),
      r &&
        /* @__PURE__ */ s.createElement(
          s.Fragment,
          null,
          /* @__PURE__ */ s.createElement(
            qb,
            null,
            /* @__PURE__ */ s.createElement(ql, { ref: h }),
            i.slotSidebar
          ),
          /* @__PURE__ */ s.createElement(Gl, null, i.slotMain),
          m &&
            /* @__PURE__ */ s.createElement(
              Xb,
              { position: p },
              /* @__PURE__ */ s.createElement(ql, {
                orientation: p === 'bottom' ? 'horizontal' : 'vertical',
                position: p === 'bottom' ? 'left' : 'right',
                ref: f,
              }),
              i.slotPanel
            )
        ),
      n &&
        /* @__PURE__ */ s.createElement(
          s.Fragment,
          null,
          /* @__PURE__ */ s.createElement(Ub, {
            menu: i.slotSidebar,
            panel: i.slotPanel,
            showPanel: m,
          }),
          /* @__PURE__ */ s.createElement(Gl, null, i.slotMain),
          /* @__PURE__ */ s.createElement(Ml, null)
        )
    )
  },
  'Layout'
)
var Gb = I.div(
  ({
    navSize: e,
    rightPanelWidth: t,
    bottomPanelHeight: o,
    viewMode: i,
    panelPosition: r,
    showPanel: n,
  }) => ({
    width: '100%',
    height: ['100vh', '100dvh'],
    // This array is a special Emotion syntax to set a fallback if 100dvh is not supported
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    colorScheme: 'light dark',
    [Qe]: {
      display: 'grid',
      gap: 0,
      gridTemplateColumns: `minmax(0, ${e}px) minmax(${Kb}px, 1fr) minmax(0, ${t}px)`,
      gridTemplateRows: `1fr minmax(0, ${o}px)`,
      gridTemplateAreas:
        i === 'docs' || !n
          ? `"sidebar content content"
                  "sidebar content content"`
          : r === 'right'
            ? `"sidebar content panel"
                  "sidebar content panel"`
            : `"sidebar content content"
                "sidebar panel   panel"`,
    },
  })
)
var qb = I.div(({ theme: e }) => ({
  backgroundColor: e.background.app,
  gridArea: 'sidebar',
  position: 'relative',
  borderRight: `1px solid ${e.color.border}`,
}))
var Yb = I.div(({ theme: e, shown: t }) => ({
  flex: 1,
  position: 'relative',
  backgroundColor: e.background.content,
  display: t ? 'grid' : 'none',
  // This is needed to make the content container fill the available space
  overflow: 'auto',
  [Qe]: {
    flex: 'auto',
    gridArea: 'content',
  },
}))
var Qb = I.div(({ theme: e }) => ({
  gridRowStart: 'sidebar-start',
  gridRowEnd: '-1',
  gridColumnStart: 'sidebar-end',
  gridColumnEnd: '-1',
  backgroundColor: e.background.content,
  zIndex: 1,
}))
var Xb = I.div(({ theme: e, position: t }) => ({
  gridArea: 'panel',
  position: 'relative',
  backgroundColor: e.background.content,
  borderTop: t === 'bottom' ? `1px solid ${e.color.border}` : void 0,
  borderLeft: t === 'right' ? `1px solid ${e.color.border}` : void 0,
}))
var ql = I.div(
  ({ theme: e }) => ({
    position: 'absolute',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    zIndex: 100,
    '&:after': {
      content: '""',
      display: 'block',
      backgroundColor: e.color.secondary,
    },
    '&:hover': {
      opacity: 1,
    },
  }),
  ({ orientation: e = 'vertical', position: t = 'left' }) =>
    e === 'vertical'
      ? {
          width: t === 'left' ? 10 : 13,
          height: '100%',
          top: 0,
          right: t === 'left' ? '-7px' : void 0,
          left: t === 'right' ? '-7px' : void 0,
          '&:after': {
            width: 1,
            height: '100%',
            marginLeft: t === 'left' ? 3 : 6,
          },
          '&:hover': {
            cursor: 'col-resize',
          },
        }
      : {
          width: '100%',
          height: '13px',
          top: '-7px',
          left: 0,
          '&:after': {
            width: '100%',
            height: 1,
            marginTop: 6,
          },
          '&:hover': {
            cursor: 'row-resize',
          },
        }
)

// global-externals:storybook/internal/types
const VO = __STORYBOOK_TYPES__
const { Addon_TypesEnum: Ce } = __STORYBOOK_TYPES__

// src/core-events/index.ts
var Ql = /* @__PURE__ */ (N => (
  (N.CHANNEL_WS_DISCONNECT = 'channelWSDisconnect'),
  (N.CHANNEL_CREATED = 'channelCreated'),
  (N.CONFIG_ERROR =
    'c\
onfigError'),
  (N.STORY_INDEX_INVALIDATED = 'storyIndexInvalidated'),
  (N.STORY_SPECIFIED = 'storySpecified'),
  (N.SET_CONFIG = 'setConfig'),
  (N.SET_STORIES = 'setStories'),
  (N.SET_INDEX = 'setIndex'),
  (N.SET_CURRENT_STORY = 'setCurrentStory'),
  (N.CURRENT_STORY_WAS_SET = 'currentStoryWasSet'),
  (N.FORCE_RE_RENDER = 'forceReRender'),
  (N.FORCE_REMOUNT = 'forceRemount'),
  (N.PRELOAD_ENTRIES = 'preloadStories'),
  (N.STORY_PREPARED = 'storyPrepared'),
  (N.DOCS_PREPARED = 'docsPrepared'),
  (N.STORY_CHANGED = 'storyChanged'),
  (N.STORY_UNCHANGED = 'storyUnchanged'),
  (N.STORY_RENDERED = 'storyRendered'),
  (N.STORY_FINISHED = 'storyFinished'),
  (N.STORY_MISSING = 'storyMissing'),
  (N.STORY_ERRORED = 'storyErrored'),
  (N.STORY_THREW_EXCEPTION = 'storyThrewException'),
  (N.STORY_RENDER_PHASE_CHANGED = 'storyRenderPhaseChanged'),
  (N.STORY_HOT_UPDATED = 'storyHotUpdated'),
  (N.PLAY_FUNCTION_THREW_EXCEPTION = 'playFunctionThrewException'),
  (N.UNHANDLED_ERRORS_WHILE_PLAYING = 'unhandledErrorsWhilePlaying'),
  (N.UPDATE_STORY_ARGS = 'updateStoryArgs'),
  (N.STORY_ARGS_UPDATED = 'storyArgsUpdated'),
  (N.RESET_STORY_ARGS =
    'res\
etStoryArgs'),
  (N.SET_FILTER = 'setFilter'),
  (N.SET_GLOBALS = 'setGlobals'),
  (N.UPDATE_GLOBALS = 'updateGlobals'),
  (N.GLOBALS_UPDATED =
    'globalsUpda\
ted'),
  (N.REGISTER_SUBSCRIPTION = 'registerSubscription'),
  (N.PREVIEW_KEYDOWN = 'previewKeydown'),
  (N.PREVIEW_BUILDER_PROGRESS =
    'preview_builder_\
progress'),
  (N.SELECT_STORY = 'selectStory'),
  (N.STORIES_COLLAPSE_ALL = 'storiesCollapseAll'),
  (N.STORIES_EXPAND_ALL = 'storiesExpandAll'),
  (N.DOCS_RENDERED = 'docsRendered'),
  (N.SHARED_STATE_CHANGED = 'sharedStateChanged'),
  (N.SHARED_STATE_SET = 'sharedStateSet'),
  (N.NAVIGATE_URL = 'navigateUrl'),
  (N.UPDATE_QUERY_PARAMS = 'updateQueryParams'),
  (N.REQUEST_WHATS_NEW_DATA = 'requestWhatsNewData'),
  (N.RESULT_WHATS_NEW_DATA = 'resultWhatsNewData'),
  (N.SET_WHATS_NEW_CACHE = 'setWhatsNewCache'),
  (N.TOGGLE_WHATS_NEW_NOTIFICATIONS = 'toggleWhatsNewNotifications'),
  (N.TELEMETRY_ERROR = 'telemetryError'),
  (N.FILE_COMPONENT_SEARCH_REQUEST = 'fileComponentSearchRequest'),
  (N.FILE_COMPONENT_SEARCH_RESPONSE = 'fileComponentSearchResponse'),
  (N.SAVE_STORY_REQUEST = 'saveStoryRequest'),
  (N.SAVE_STORY_RESPONSE = 'saveStoryResponse'),
  (N.ARGTYPES_INFO_REQUEST = 'argtypesInfoRequest'),
  (N.ARGTYPES_INFO_RESPONSE = 'argtypesInfoResponse'),
  (N.CREATE_NEW_STORYFILE_REQUEST = 'createNewStoryfileRequest'),
  (N.CREATE_NEW_STORYFILE_RESPONSE = 'createNewStoryfileResponse'),
  N
))(Ql || {})
const {
  CHANNEL_WS_DISCONNECT: KO,
  CHANNEL_CREATED: $O,
  CONFIG_ERROR: UO,
  CREATE_NEW_STORYFILE_REQUEST: GO,
  CREATE_NEW_STORYFILE_RESPONSE: qO,
  CURRENT_STORY_WAS_SET: YO,
  DOCS_PREPARED: QO,
  DOCS_RENDERED: XO,
  FILE_COMPONENT_SEARCH_REQUEST: ZO,
  FILE_COMPONENT_SEARCH_RESPONSE: JO,
  FORCE_RE_RENDER: eP,
  FORCE_REMOUNT: tP,
  GLOBALS_UPDATED: oP,
  NAVIGATE_URL: rP,
  PLAY_FUNCTION_THREW_EXCEPTION: nP,
  UNHANDLED_ERRORS_WHILE_PLAYING: iP,
  PRELOAD_ENTRIES: sP,
  PREVIEW_BUILDER_PROGRESS: aP,
  PREVIEW_KEYDOWN: lP,
  REGISTER_SUBSCRIPTION: uP,
  RESET_STORY_ARGS: cP,
  SELECT_STORY: pP,
  SET_CONFIG: dP,
  SET_CURRENT_STORY: fP,
  SET_FILTER: mP,
  SET_GLOBALS: hP,
  SET_INDEX: gP,
  SET_STORIES: yP,
  SHARED_STATE_CHANGED: bP,
  SHARED_STATE_SET: vP,
  STORIES_COLLAPSE_ALL: xP,
  STORIES_EXPAND_ALL: IP,
  STORY_ARGS_UPDATED: SP,
  STORY_CHANGED: wP,
  STORY_ERRORED: EP,
  STORY_INDEX_INVALIDATED: TP,
  STORY_MISSING: CP,
  STORY_PREPARED: Xl,
  STORY_RENDER_PHASE_CHANGED: _P,
  STORY_RENDERED: kP,
  STORY_FINISHED: OP,
  STORY_SPECIFIED: PP,
  STORY_THREW_EXCEPTION: AP,
  STORY_UNCHANGED: DP,
  STORY_HOT_UPDATED: MP,
  UPDATE_GLOBALS: LP,
  UPDATE_QUERY_PARAMS: NP,
  UPDATE_STORY_ARGS: FP,
  REQUEST_WHATS_NEW_DATA: RP,
  RESULT_WHATS_NEW_DATA: BP,
  SET_WHATS_NEW_CACHE: HP,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: zP,
  TELEMETRY_ERROR: WP,
  SAVE_STORY_REQUEST: VP,
  SAVE_STORY_RESPONSE: jP,
  ARGTYPES_INFO_REQUEST: KP,
  ARGTYPES_INFO_RESPONSE: $P,
} = Ql

// src/manager/components/panel/Panel.tsx
const Pi = class Pi extends Le {
  constructor(t) {
    ;(super(t), (this.state = { hasError: !1 }))
  }

  componentDidCatch(t, o) {
    ;(this.setState({ hasError: !0 }), console.error(t, o))
  }

  // @ts-expect-error (we know this is broken)
  render() {
    const { hasError: t } = this.state
    const { children: o } = this.props
    return t
      ? /* @__PURE__ */ s.createElement('h1', null, 'Something went wrong.')
      : o
  }
}
a(Pi, 'SafeTab')
const ki = Pi
const Oi = s.memo(
  ({
    panels: e,
    shortcuts: t,
    actions: o,
    selectedPanel: i = null,
    panelPosition: r = 'right',
    absolute: n = !0,
  }) => {
    const { isDesktop: l, setMobilePanelOpen: u } = ge()
    return /* @__PURE__ */ s.createElement(
      Oa,
      {
        absolute: n,
        ...(i && e[i] ? { selected: i } : {}),
        menuName: 'Addons',
        actions: o,
        showToolsWhenEmpty: !0,
        emptyState: /* @__PURE__ */ s.createElement(_a, {
          title: 'Storybook add-ons',
          description: /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            'Integrate your tools with Storybook to connect workflows and unl\
ock advanced features.'
          ),
          footer: /* @__PURE__ */ s.createElement(
            Pe,
            {
              href: 'https://storybook.js.org/integrations',
              target: '_blank',
              withArrow: !0,
            },
            /* @__PURE__ */ s.createElement(Pt, null),
            ' Explore integrations catalog'
          ),
        }),
        tools: /* @__PURE__ */ s.createElement(
          Zb,
          null,
          l
            ? /* @__PURE__ */ s.createElement(
                s.Fragment,
                null,
                /* @__PURE__ */ s.createElement(
                  ee,
                  {
                    key: 'position',
                    onClick: o.togglePosition,
                    title: `Change addon orientation [${Ye(t.panelPosition)}]`,
                  },
                  r === 'bottom'
                    ? /* @__PURE__ */ s.createElement(wo, null)
                    : /* @__PURE__ */ s.createElement(yo, null)
                ),
                /* @__PURE__ */ s.createElement(
                  ee,
                  {
                    key: 'visibility',
                    onClick: o.toggleVisibility,
                    title: `Hide addons [${Ye(t.togglePanel)}]`,
                  },
                  /* @__PURE__ */ s.createElement(je, null)
                )
              )
            : /* @__PURE__ */ s.createElement(
                ee,
                { onClick: () => u(!1), 'aria-label': 'Close addon panel' },
                /* @__PURE__ */ s.createElement(je, null)
              )
        ),
        id: 'storybook-panel-root',
      },
      Object.entries(e).map(([c, d]) =>
        // @ts-expect-error (we know this is broken)
        /* @__PURE__ */ s.createElement(
          ki,
          {
            key: c,
            id: c,
            title:
              typeof d.title === 'function'
                ? /* @__PURE__ */ s.createElement(d.title, null)
                : d.title,
          },
          d.render
        )
      )
    )
  }
)
Oi.displayName = 'AddonPanel'
var Zb = I.div({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

// src/manager/container/Panel.tsx
const Jb = /* @__PURE__ */ a(e => {
  const t = oe()
  const o = Ne()
  const [i, r] = K(t.getCurrentStoryData())
  Ia(
    {
      [Xl]: () => {
        r(t.getCurrentStoryData())
      },
    },
    []
  )
  const { parameters: n, type: l } = i ?? {}
  const u = G(
    () => ({
      onSelect: /* @__PURE__ */ a(d => t.setSelectedPanel(d), 'onSelect'),
      toggleVisibility: /* @__PURE__ */ a(
        () => t.togglePanel(),
        'toggleVisibility'
      ),
      togglePosition: /* @__PURE__ */ a(
        () => t.togglePanelPosition(),
        'togglePosition'
      ),
    }),
    [t]
  )
  const c = G(() => {
    const d = t.getElements(Ce.PANEL)
    if (!d || l !== 'story') return d
    const p = {}
    return (
      Object.entries(d).forEach(([f, h]) => {
        const { paramKey: y } = h
        ;(y && n && n[y] && n[y].disable) ||
          h.disabled === !0 ||
          (typeof h.disabled === 'function' && h.disabled(n)) ||
          (p[f] = h)
      }),
      p
    )
  }, [t, l, n])
  return /* @__PURE__ */ s.createElement(Oi, {
    panels: c,
    selectedPanel: t.getSelectedPanel(),
    panelPosition: o.layout.panelPosition,
    actions: u,
    shortcuts: t.getShortcutKeys(),
    ...e,
  })
}, 'Panel')
const Zl = Jb

// src/manager/container/Preview.tsx
const No = Ve(Di(), 1)

// src/manager/components/preview/Iframe.tsx
const ev = I.iframe(({ theme: e }) => ({
  backgroundColor: e.background.preview,
  display: 'block',
  boxSizing: 'content-box',
  height: '100%',
  width: '100%',
  border: '0 none',
  transition: 'background-position 0s, visibility 0s',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
  margin: 'auto',
  boxShadow: '0 0 100px 100vw rgba(0,0,0,0.5)',
}))
function eu(e) {
  const {
    active: t,
    id: o,
    title: i,
    src: r,
    allowFullScreen: n,
    scale: l,
    ...u
  } = e
  const c = s.useRef(null)
  return /* @__PURE__ */ s.createElement(
    Pa.IFrame,
    { scale: l, active: t, iFrameRef: c },
    /* @__PURE__ */ s.createElement(ev, {
      'data-is-storybook': t ? 'true' : 'false',
      onLoad: d => d.currentTarget.setAttribute('data-is-loaded', 'true'),
      id: o,
      title: i,
      src: r,
      allow: 'clipboard-write;',
      allowFullScreen: n,
      ref: c,
      ...u,
    })
  )
}
a(eu, 'IFrame')

// src/manager/components/preview/utils/stringifyQueryParams.tsx
const fu = Ve(du(), 1)
const mu = /* @__PURE__ */ a(e => {
  const t = (0, fu.stringify)(e)
  return t === '' ? '' : `&${t}`
}, 'stringifyQueryParams')

// src/manager/components/preview/FramesRenderer.tsx
const Cv = /* @__PURE__ */ a(
  (e, t) => (e && t[e] ? `storybook-ref-${e}` : 'storybook-preview-iframe'),
  'getActive'
)
const _v = I(he)(({ theme: e }) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    position: 'absolute',
    display: 'block',
    top: 10,
    right: 15,
    padding: '10px 15px',
    fontSize: e.typography.size.s1,
    transform: 'translateY(-100px)',
    '&:focus': {
      transform: 'translateY(0)',
      zIndex: 1,
    },
  },
}))
const kv = /* @__PURE__ */ a(
  ({ api: e, state: t }) => ({
    isFullscreen: e.getIsFullscreen(),
    isNavShown: e.getIsNavShown(),
    selectedStoryId: t.storyId,
  }),
  'whenSidebarIsVisible'
)
const Ov = {
  '#root [data-is-storybook="false"]': {
    display: 'none',
  },
  '#root [data-is-storybook="true"]': {
    display: 'block',
  },
}
const hu = /* @__PURE__ */ a(
  ({
    refs: e,
    scale: t,
    viewMode: o = 'story',
    refId: i,
    queryParams: r = {},
    baseUrl: n,
    storyId: l = '*',
  }) => {
    const u = e[i]?.version
    const c = mu({
      ...r,
      ...(u && { version: u }),
    })
    const d = Cv(i, e)
    const { current: p } = U({})
    const f = Object.values(e).filter(
      h => h.type === 'auto-inject' || h.id === i,
      {}
    )
    return (
      p['storybook-preview-iframe'] ||
        (p['storybook-preview-iframe'] = to(n, l, {
          ...r,
          ...(u && { version: u }),
          viewMode: o,
        })),
      f.forEach(h => {
        const y = `storybook-ref-${h.id}`
        const m = p[y]?.split('/iframe.html')[0]
        if (!m || h.url !== m) {
          const b = `${h.url}/iframe.html?id=${l}&viewMode=${o}&refId=${h.id}${c}`
          p[y] = b
        }
      }),
      /* @__PURE__ */ s.createElement(
        Ee,
        null,
        /* @__PURE__ */ s.createElement(eo, { styles: Ov }),
        /* @__PURE__ */ s.createElement(
          me,
          { filter: kv },
          ({ isFullscreen: h, isNavShown: y, selectedStoryId: m }) =>
            h || !y || !m
              ? null
              : /* @__PURE__ */ s.createElement(
                  _v,
                  { asChild: !0 },
                  /* @__PURE__ */ s.createElement(
                    'a',
                    { href: `#${m}`, tabIndex: 0, title: 'Skip to sidebar' },
                    'Skip to sidebar'
                  )
                )
        ),
        Object.entries(p).map(([h, y]) =>
          /* @__PURE__ */ s.createElement(
            Ee,
            { key: h },
            /* @__PURE__ */ s.createElement(eu, {
              active: h === d,
              key: h,
              id: h,
              title: h,
              src: y,
              allowFullScreen: !0,
              scale: t,
            })
          )
        )
      )
    )
  },
  'FramesRenderer'
)

// src/manager/components/preview/tools/addons.tsx
const Pv = /* @__PURE__ */ a(
  ({ api: e, state: t }) => ({
    isVisible: e.getIsPanelShown(),
    singleStory: t.singleStory,
    panelPosition: t.layout.panelPosition,
    toggle: /* @__PURE__ */ a(() => e.togglePanel(), 'toggle'),
  }),
  'menuMapper'
)
const gu = {
  title: 'addons',
  id: 'addons',
  type: be.TOOL,
  match: /* @__PURE__ */ a(
    ({ viewMode: e, tabId: t }) => e === 'story' && !t,
    'match'
  ),
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        me,
        { filter: Pv },
        ({ isVisible: e, toggle: t, singleStory: o, panelPosition: i }) =>
          !o &&
          !e &&
          /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            /* @__PURE__ */ s.createElement(
              ee,
              {
                'aria-label': 'Show addons',
                key: 'addons',
                onClick: t,
                title: 'Show addons',
              },
              i === 'bottom'
                ? /* @__PURE__ */ s.createElement(yo, null)
                : /* @__PURE__ */ s.createElement(wo, null)
            )
          )
      ),
    'render'
  ),
}

// src/manager/components/preview/tools/copy.tsx
const Su = Ve(Iu(), 1)
const { PREVIEW_URL: Nv, document: Fv } = se
const Rv = /* @__PURE__ */ a(({ state: e }) => {
  const { storyId: t, refId: o, refs: i } = e
  const { location: r } = Fv
  const n = i[o]
  let l = `${r.origin}${r.pathname}`
  return (
    l.endsWith('/') || (l += '/'),
    {
      refId: o,
      baseUrl: n ? `${n.url}/iframe.html` : Nv || `${l}iframe.html`,
      storyId: t,
      queryParams: e.customQueryParams,
    }
  )
}, 'copyMapper')
const wu = {
  title: 'copy',
  id: 'copy',
  type: be.TOOL,
  match: /* @__PURE__ */ a(
    ({ viewMode: e, tabId: t }) => e === 'story' && !t,
    'match'
  ),
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        me,
        { filter: Rv },
        ({ baseUrl: e, storyId: t, queryParams: o }) =>
          t
            ? /* @__PURE__ */ s.createElement(
                ee,
                {
                  key: 'copy',
                  onClick: () => (0, Su.default)(to(e, t, o)),
                  title: 'Copy canvas link',
                },
                /* @__PURE__ */ s.createElement(Wn, null)
              )
            : null
      ),
    'render'
  ),
}

// src/manager/components/preview/tools/eject.tsx
const { PREVIEW_URL: Bv } = se
const Hv = /* @__PURE__ */ a(({ state: e }) => {
  const { storyId: t, refId: o, refs: i } = e
  const r = i[o]
  return {
    refId: o,
    baseUrl: r ? `${r.url}/iframe.html` : Bv || 'iframe.html',
    storyId: t,
    queryParams: e.customQueryParams,
  }
}, 'ejectMapper')
const Eu = {
  title: 'eject',
  id: 'eject',
  type: be.TOOL,
  match: /* @__PURE__ */ a(
    ({ viewMode: e, tabId: t }) => e === 'story' && !t,
    'match'
  ),
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        me,
        { filter: Hv },
        ({ baseUrl: e, storyId: t, queryParams: o }) =>
          t
            ? /* @__PURE__ */ s.createElement(
                ee,
                { key: 'opener', asChild: !0 },
                /* @__PURE__ */ s.createElement(
                  'a',
                  {
                    href: to(e, t, o),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    title: 'Open canvas in new tab',
                  },
                  /* @__PURE__ */ s.createElement(tt, null)
                )
              )
            : null
      ),
    'render'
  ),
}

// src/manager/components/preview/tools/remount.tsx
const zv = I(ee)(({ theme: e, animating: t, disabled: o }) => ({
  opacity: o ? 0.5 : 1,
  svg: {
    animation: t ? `${e.animation.rotate360} 1000ms ease-out` : void 0,
  },
}))
const Wv = /* @__PURE__ */ a(({ api: e, state: t }) => {
  const { storyId: o } = t
  return {
    storyId: o,
    remount: /* @__PURE__ */ a(
      () => e.emit(Sn, { storyId: t.storyId }),
      'remount'
    ),
    api: e,
  }
}, 'menuMapper')
const Tu = {
  title: 'remount',
  id: 'remount',
  type: be.TOOL,
  match: /* @__PURE__ */ a(
    ({ viewMode: e, tabId: t }) => e === 'story' && !t,
    'match'
  ),
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        me,
        { filter: Wv },
        ({ remount: e, storyId: t, api: o }) => {
          const [i, r] = K(!1)
          const n = /* @__PURE__ */ a(() => {
            t && e()
          }, 'remountComponent')
          return (
            o.on(Sn, () => {
              r(!0)
            }),
            /* @__PURE__ */ s.createElement(
              zv,
              {
                key: 'remount',
                title: 'Remount component',
                onClick: n,
                onAnimationEnd: () => r(!1),
                animating: i,
                disabled: !t,
              },
              /* @__PURE__ */ s.createElement(ct, null)
            )
          )
        }
      ),
    'render'
  ),
}

// src/manager/components/preview/tools/zoom.tsx
const Lo = 1
const Cu = Qt({ value: Lo, set: /* @__PURE__ */ a(e => {}, 'set') })
const zi = class zi extends Le {
  constructor() {
    super(...arguments)
    this.state = {
      value: Lo,
    }
    this.set = /* @__PURE__ */ a(o => this.setState({ value: o }), 'set')
  }

  render() {
    const { children: o, shouldScale: i } = this.props
    const { set: r } = this
    const { value: n } = this.state
    return /* @__PURE__ */ s.createElement(
      Cu.Provider,
      { value: { value: i ? n : Lo, set: r } },
      o
    )
  }
}
a(zi, 'ZoomProvider')
const Ar = zi
const { Consumer: Hi } = Cu
const Vv = _t(
  /* @__PURE__ */ a(function ({ zoomIn: t, zoomOut: o, reset: i }) {
    return /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      /* @__PURE__ */ s.createElement(
        ee,
        { key: 'zoomin', onClick: t, title: 'Zoom in' },
        /* @__PURE__ */ s.createElement(Jn, null)
      ),
      /* @__PURE__ */ s.createElement(
        ee,
        { key: 'zoomout', onClick: o, title: 'Zoom out' },
        /* @__PURE__ */ s.createElement(ei, null)
      ),
      /* @__PURE__ */ s.createElement(
        ee,
        { key: 'zoomreset', onClick: i, title: 'Reset zoom' },
        /* @__PURE__ */ s.createElement(ti, null)
      )
    )
  }, 'Zoom')
)
const jv = _t(
  /* @__PURE__ */ a(function ({ set: t, value: o }) {
    const i = A(
      l => {
        ;(l.preventDefault(), t(0.8 * o))
      },
      [t, o]
    )
    const r = A(
      l => {
        ;(l.preventDefault(), t(1.25 * o))
      },
      [t, o]
    )
    const n = A(
      l => {
        ;(l.preventDefault(), t(Lo))
      },
      [t, Lo]
    )
    return /* @__PURE__ */ s.createElement(Vv, {
      key: 'zoom',
      zoomIn: i,
      zoomOut: r,
      reset: n,
    })
  }, 'ZoomWrapper')
)
function Kv() {
  return /* @__PURE__ */ s.createElement(
    s.Fragment,
    null,
    /* @__PURE__ */ s.createElement(Hi, null, ({ set: e, value: t }) =>
      /* @__PURE__ */ s.createElement(jv, { set: e, value: t })
    ),
    /* @__PURE__ */ s.createElement(yt, null)
  )
}
a(Kv, 'ZoomToolRenderer')
const _u = {
  title: 'zoom',
  id: 'zoom',
  type: be.TOOL,
  match: /* @__PURE__ */ a(
    ({ viewMode: e, tabId: t }) => e === 'story' && !t,
    'match'
  ),
  render: Kv,
}

// src/manager/components/preview/Toolbar.tsx
const $v = /* @__PURE__ */ a(
  ({ api: e, state: t }) => ({
    toggle: e.toggleFullscreen,
    isFullscreen: e.getIsFullscreen(),
    shortcut: Ye(e.getShortcutKeys().fullScreen),
    hasPanel: Object.keys(e.getElements(Ce.PANEL)).length > 0,
    singleStory: t.singleStory,
  }),
  'fullScreenMapper'
)
const Ou = {
  title: 'fullscreen',
  id: 'fullscreen',
  type: be.TOOL,
  // @ts-expect-error (non strict)
  match: /* @__PURE__ */ a(
    e => ['story', 'docs'].includes(e.viewMode),
    'match'
  ),
  render: /* @__PURE__ */ a(() => {
    const { isMobile: e } = ge()
    return e
      ? null
      : /* @__PURE__ */ s.createElement(
          me,
          { filter: $v },
          ({
            toggle: t,
            isFullscreen: o,
            shortcut: i,
            hasPanel: r,
            singleStory: n,
          }) =>
            (!n || (n && r)) &&
            /* @__PURE__ */ s.createElement(
              ee,
              {
                key: 'full',
                onClick: t,
                title: `${o ? 'Exit full screen' : 'Go full screen'} [${i}]`,
                'aria-label': o ? 'Exit full screen' : 'Go full screen',
              },
              o
                ? /* @__PURE__ */ s.createElement(je, null)
                : /* @__PURE__ */ s.createElement(Mn, null)
            )
        )
  }, 'render'),
}
const Pu = s.memo(
  /* @__PURE__ */ a(function ({
    isShown: t,
    tools: o,
    toolsExtra: i,
    tabs: r,
    tabId: n,
    api: l,
  }) {
    const u = na()
    return r || o || i
      ? /* @__PURE__ */ s.createElement(
          Gv,
          {
            className: 'sb-bar',
            key: 'toolbar',
            shown: t,
            'data-test-id': 'sb-preview-toolbar',
            'aria-labelledby': u,
          },
          /* @__PURE__ */ s.createElement(
            'span',
            { className: 'sb-sr-only', id: u },
            'Toolbar'
          ),
          /* @__PURE__ */ s.createElement(
            qv,
            null,
            /* @__PURE__ */ s.createElement(
              Au,
              null,
              r.length > 1
                ? /* @__PURE__ */ s.createElement(
                    Ee,
                    null,
                    /* @__PURE__ */ s.createElement(
                      ar,
                      { key: 'tabs' },
                      r.map((c, d) =>
                        /* @__PURE__ */ s.createElement(
                          lr,
                          {
                            disabled: !!c.disabled,
                            active: c.id === n || (c.id === 'canvas' && !n),
                            onClick: () => {
                              l.applyQueryParams({
                                tab: c.id === 'canvas' ? void 0 : c.id,
                              })
                            },
                            key: c.id || `tab-${d}`,
                          },
                          c.title
                        )
                      )
                    ),
                    /* @__PURE__ */ s.createElement(yt, null)
                  )
                : null,
              /* @__PURE__ */ s.createElement(ku, { key: 'left', list: o })
            ),
            /* @__PURE__ */ s.createElement(
              Yv,
              null,
              /* @__PURE__ */ s.createElement(ku, { key: 'right', list: i })
            )
          )
        )
      : null
  }, 'ToolbarComp')
)
var ku = s.memo(
  /* @__PURE__ */ a(function ({ list: t }) {
    return /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      t.filter(Boolean).map(({ render: o, id: i, ...r }, n) =>
        // @ts-expect-error (Converted from ts-ignore)
        /* @__PURE__ */ s.createElement(o, { key: i || r.key || `f-${n}` })
      )
    )
  }, 'Tools')
)
function Uv(e, t) {
  const o = t?.type === 'story' && t?.prepared ? t?.parameters : {}
  const i = 'toolbar' in o ? o.toolbar : void 0
  const { toolbar: r } = He.getConfig()
  const n = er(r || {}, i || {})
  return n ? !!n[e?.id]?.hidden : !1
}
a(Uv, 'toolbarItemHasBeenExcluded')
function Wi(e, t, o, i, r, n) {
  const l = /* @__PURE__ */ a(
    u =>
      u &&
      (!u.match ||
        u.match({
          storyId: t?.id,
          refId: t?.refId,
          viewMode: o,
          location: i,
          path: r,
          tabId: n,
        })) &&
      !Uv(u, t),
    'filter'
  )
  return e.filter(l)
}
a(Wi, 'filterToolsSide')
var Gv = I.section(({ theme: e, shown: t }) => ({
  position: 'relative',
  color: e.barTextColor,
  width: '100%',
  flexShrink: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
  marginTop: t ? 0 : -40,
  boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
  background: e.barBg,
  scrollbarColor: `${e.barTextColor} ${e.barBg}`,
  scrollbarWidth: 'thin',
  zIndex: 4,
}))
var qv = I.div({
  width: 'calc(100% - 20px)',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  flexShrink: 0,
  height: 40,
  marginLeft: 10,
  marginRight: 10,
})
var Au = I.div({
  display: 'flex',
  whiteSpace: 'nowrap',
  flexBasis: 'auto',
  gap: 6,
  alignItems: 'center',
})
var Yv = I(Au)({
  marginLeft: 30,
})

// src/manager/components/preview/utils/components.ts
const Du = I.main({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
})
const Mu = I.div({
  overflow: 'auto',
  width: '100%',
  zIndex: 3,
  background: 'transparent',
  flex: 1,
})
const Lu = I.div(
  {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    overflow: 'auto',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  ({ show: e }) => ({ display: e ? 'grid' : 'none' })
)
const HD = I(pr)({
  color: 'inherit',
  textDecoration: 'inherit',
  display: 'inline-block',
})
const zD = I.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none',
  },
})
const Dr = I.div(({ theme: e }) => ({
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  overflow: 'auto',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '100%',
  position: 'relative',
  width: '100%',
  height: '100%',
}))
const Nu = I.div(({ theme: e }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: e.background.preview,
  zIndex: 1,
}))

// src/manager/components/preview/Wrappers.tsx
const Fu = /* @__PURE__ */ a(
  ({ wrappers: e, id: t, storyId: o, children: i }) =>
    /* @__PURE__ */ s.createElement(
      Ee,
      null,
      e.reduceRight(
        (r, n, l) =>
          /* @__PURE__ */ s.createElement(n.render, {
            index: l,
            children: r,
            id: t,
            storyId: o,
          }),
        i
      )
    ),
  'ApplyWrappers'
)
const Ru = [
  {
    id: 'iframe-wrapper',
    type: Ce.PREVIEW,
    render: /* @__PURE__ */ a(
      e =>
        /* @__PURE__ */ s.createElement(
          Dr,
          { id: 'storybook-preview-wrapper' },
          e.children
        ),
      'render'
    ),
  },
]

// src/manager/components/preview/Preview.tsx
const Xv = /* @__PURE__ */ a(
  ({ state: e, api: t }) => ({
    storyId: e.storyId,
    refId: e.refId,
    viewMode: e.viewMode,
    customCanvas: t.renderPreview,
    queryParams: e.customQueryParams,
    getElements: t.getElements,
    entry: t.getData(e.storyId, e.refId),
    previewInitialized: e.previewInitialized,
    refs: e.refs,
  }),
  'canvasMapper'
)
const Bu = /* @__PURE__ */ a(
  () => ({
    id: 'canvas',
    type: be.TAB,
    title: 'Canvas',
    route: /* @__PURE__ */ a(
      ({ storyId: e, refId: t }) => (t ? `/story/${t}_${e}` : `/story/${e}`),
      'route'
    ),
    match: /* @__PURE__ */ a(
      ({ viewMode: e }) => !!(e && e.match(/^(story|docs)$/)),
      'match'
    ),
    render: /* @__PURE__ */ a(() => null, 'render'),
  }),
  'createCanvasTab'
)
const Hu = s.memo(
  /* @__PURE__ */ a(function (t) {
    const {
      api: o,
      id: i,
      options: r,
      viewMode: n,
      storyId: l,
      entry: u = void 0,
      description: c,
      baseUrl: d,
      withLoader: p = !0,
      tools: f,
      toolsExtra: h,
      tabs: y,
      wrappers: m,
      tabId: b,
    } = t
    const x = y.find(w => w.id === b)?.render
    const E = n === 'story'
    const { showToolbar: g } = r
    const v = o.getShowToolbarWithCustomisations(g)
    const S = U(l)
    return (
      H(() => {
        if (u && n) {
          if (l === S.current) return
          if (((S.current = l), n.match(/docs|story/))) {
            const { refId: w, id: k } = u
            o.emit(ya, {
              storyId: k,
              viewMode: n,
              options: { target: w },
            })
          }
        }
      }, [u, n, l, o]),
      /* @__PURE__ */ s.createElement(
        Ee,
        null,
        i === 'main' &&
          /* @__PURE__ */ s.createElement(
            ko,
            { key: 'description' },
            /* @__PURE__ */ s.createElement('title', null, c)
          ),
        /* @__PURE__ */ s.createElement(
          Ar,
          { shouldScale: E },
          /* @__PURE__ */ s.createElement(
            Du,
            null,
            /* @__PURE__ */ s.createElement(Pu, {
              key: 'tools',
              isShown: v,
              tabId: b,
              tabs: y,
              tools: f,
              toolsExtra: h,
              api: o,
            }),
            /* @__PURE__ */ s.createElement(
              Mu,
              { key: 'frame' },
              x && /* @__PURE__ */ s.createElement(Dr, null, x({ active: !0 })),
              /* @__PURE__ */ s.createElement(
                Lu,
                { show: !b },
                /* @__PURE__ */ s.createElement(Zv, {
                  withLoader: p,
                  baseUrl: d,
                  wrappers: m,
                })
              )
            )
          )
        )
      )
    )
  }, 'Preview')
)
var Zv = /* @__PURE__ */ a(
  ({ baseUrl: e, withLoader: t, wrappers: o }) =>
    /* @__PURE__ */ s.createElement(
      me,
      { filter: Xv },
      ({
        entry: i,
        refs: r,
        customCanvas: n,
        storyId: l,
        refId: u,
        viewMode: c,
        queryParams: d,
        previewInitialized: p,
      }) => {
        const f = 'canvas'
        const [h, y] = K(void 0)
        H(() => {
          if (se.CONFIG_TYPE === 'DEVELOPMENT')
            try {
              He.getChannel().on(ma, v => {
                y(v)
              })
            } catch {}
        }, [])
        const m = !!r[u] && !r[u].previewInitialized
        const b = !(h?.value === 1 || h === void 0)
        const x = !u && (!p || b)
        const E = (i && m) || x
        return /* @__PURE__ */ s.createElement(Hi, null, ({ value: g }) =>
          /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            t &&
              E &&
              /* @__PURE__ */ s.createElement(
                Nu,
                null,
                /* @__PURE__ */ s.createElement(nr, {
                  id: 'preview-loader',
                  role: 'progressbar',
                  progress: h,
                })
              ),
            /* @__PURE__ */ s.createElement(
              Fu,
              { id: f, storyId: l, viewMode: c, wrappers: o },
              n
                ? n(l, c, f, e, g, d)
                : /* @__PURE__ */ s.createElement(hu, {
                    baseUrl: e,
                    refs: r,
                    scale: g,
                    entry: i,
                    viewMode: c,
                    refId: u,
                    queryParams: d,
                    storyId: l,
                  })
            )
          )
        )
      }
    ),
  'Canvas'
)
function zu(e, t) {
  const { previewTabs: o } = He.getConfig()
  const i = t ? t.previewTabs : void 0
  if (o || i) {
    const r = er(o || {}, i || {})
    const n = Object.keys(r).map((l, u) => ({
      index: u,
      ...(typeof r[l] === 'string' ? { title: r[l] } : r[l]),
      id: l,
    }))
    return e
      .filter(l => {
        const u = n.find(c => c.id === l.id)
        return u === void 0 || u.id === 'canvas' || !u.hidden
      })
      .map((l, u) => ({ ...l, index: u }))
      .sort((l, u) => {
        const c = n.find(h => h.id === l.id)
        const d = c ? c.index : n.length + l.index
        const p = n.find(h => h.id === u.id)
        const f = p ? p.index : n.length + u.index
        return d - f
      })
      .map(l => {
        const u = n.find(c => c.id === l.id)
        return u
          ? {
              ...l,
              title: u.title || l.title,
              disabled: u.disabled,
              hidden: u.hidden,
            }
          : l
      })
  }
  return e
}
a(zu, 'filterTabs')

// src/manager/components/preview/tools/menu.tsx
const Jv = /* @__PURE__ */ a(
  ({ api: e, state: t }) => ({
    isVisible: e.getIsNavShown(),
    singleStory: t.singleStory,
    toggle: /* @__PURE__ */ a(() => e.toggleNav(), 'toggle'),
  }),
  'menuMapper'
)
const Wu = {
  title: 'menu',
  id: 'menu',
  type: be.TOOL,
  // @ts-expect-error (non strict)
  match: /* @__PURE__ */ a(
    ({ viewMode: e }) => ['story', 'docs'].includes(e),
    'match'
  ),
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        me,
        { filter: Jv },
        ({ isVisible: e, toggle: t, singleStory: o }) =>
          !o &&
          !e &&
          /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            /* @__PURE__ */ s.createElement(
              ee,
              {
                'aria-label': 'Show sidebar',
                key: 'menu',
                onClick: t,
                title: 'Show sidebar',
              },
              /* @__PURE__ */ s.createElement(Io, null)
            ),
            /* @__PURE__ */ s.createElement(yt, null)
          )
      ),
    'render'
  ),
}

// src/manager/container/Preview.tsx
const e0 = [Bu()]
const t0 = [Wu, Tu, _u]
const o0 = [gu, Ou, Eu, wu]
const r0 = []
const n0 = (0, No.default)(1)((e, t, o, i) =>
  i ? zu([...e0, ...Object.values(t)], o) : r0
)
const i0 = (0, No.default)(1)((e, t, o) =>
  Wi([...t0, ...Object.values(t)], ...o)
)
const s0 = (0, No.default)(1)((e, t, o) =>
  Wi([...o0, ...Object.values(t)], ...o)
)
const a0 = (0, No.default)(1)((e, t) => [...Ru, ...Object.values(t)])
const { PREVIEW_URL: l0 } = se
const u0 = /* @__PURE__ */ a(
  e => e.split('/').join(' / ').replace(/\s\s/, ' '),
  'splitTitleAddExtraSpace'
)
const c0 = /* @__PURE__ */ a(e => {
  if (e?.type === 'story' || e?.type === 'docs') {
    const { title: t, name: o } = e
    return t && o ? u0(`${t} - ${o} \u22C5 Storybook`) : 'Storybook'
  }
  return e?.name ? `${e.name} \u22C5 Storybook` : 'Storybook'
}, 'getDescription')
const p0 = /* @__PURE__ */ a(
  ({
    api: e,
    state: t,
    // @ts-expect-error (non strict)
  }) => {
    const {
      layout: o,
      location: i,
      customQueryParams: r,
      storyId: n,
      refs: l,
      viewMode: u,
      path: c,
      refId: d,
    } = t
    const p = e.getData(n, d)
    const f = Object.values(e.getElements(Ce.TAB))
    const h = Object.values(e.getElements(Ce.PREVIEW))
    const y = Object.values(e.getElements(Ce.TOOL))
    const m = Object.values(e.getElements(Ce.TOOLEXTRA))
    const b = e.getQueryParam('tab')
    const x = i0(y.length, e.getElements(Ce.TOOL), [
      p,
      u,
      i,
      c,
      // @ts-expect-error (non strict)
      b,
    ])
    const E = s0(
      m.length,
      e.getElements(Ce.TOOLEXTRA),
      // @ts-expect-error (non strict)
      [p, u, i, c, b]
    )
    return {
      api: e,
      entry: p,
      options: o,
      description: c0(p),
      viewMode: u,
      refs: l,
      storyId: n,
      baseUrl: l0 || 'iframe.html',
      queryParams: r,
      tools: x,
      toolsExtra: E,
      tabs: n0(
        f.length,
        e.getElements(Ce.TAB),
        p ? p.parameters : void 0,
        o.showTabs
      ),
      wrappers: a0(h.length, e.getElements(Ce.PREVIEW)),
      tabId: b,
    }
  },
  'mapper'
)
const d0 = s.memo(
  /* @__PURE__ */ a(function (t) {
    return /* @__PURE__ */ s.createElement(me, { filter: p0 }, o =>
      /* @__PURE__ */ s.createElement(Hu, { ...t, ...o })
    )
  }, 'PreviewConnected')
)
const Vu = d0

// src/manager/hooks/useDebounce.ts
function ju(e, t) {
  const [o, i] = K(e)
  return (
    H(() => {
      const r = setTimeout(() => {
        i(e)
      }, t)
      return () => {
        clearTimeout(r)
      }
    }, [e, t]),
    o
  )
}
a(ju, 'useDebounce')

// src/manager/hooks/useMeasure.tsx
function Ku() {
  const [e, t] = s.useState({
    width: null,
    height: null,
  })
  const o = s.useRef(null)
  return [
    s.useCallback(r => {
      if (
        (o.current && (o.current.disconnect(), (o.current = null)),
        r?.nodeType === Node.ELEMENT_NODE)
      ) {
        const n = new ResizeObserver(([l]) => {
          if (l && l.borderBoxSize) {
            const { inlineSize: u, blockSize: c } = l.borderBoxSize[0]
            t({ width: u, height: c })
          }
        })
        ;(n.observe(r), (o.current = n))
      }
    }, []),
    e,
  ]
}
a(Ku, 'useMeasure')

// ../node_modules/@tanstack/virtual-core/dist/esm/utils.js
function Ht(e, t, o) {
  let i = o.initialDeps ?? []
  let r
  function n() {
    let l, u, c, d
    let p
    o.key && (l = o.debug) != null && l.call(o) && (p = Date.now())
    const f = e()
    if (!(f.length !== i.length || f.some((m, b) => i[b] !== m))) return r
    i = f
    let y
    if (
      (o.key && (u = o.debug) != null && u.call(o) && (y = Date.now()),
      (r = t(...f)),
      o.key && (c = o.debug) != null && c.call(o))
    ) {
      const m = Math.round((Date.now() - p) * 100) / 100
      const b = Math.round((Date.now() - y) * 100) / 100
      const x = b / 16
      const E = /* @__PURE__ */ a((g, v) => {
        for (g = String(g); g.length < v; ) g = ' ' + g
        return g
      }, 'pad')
      console.info(
        `%c\u23F1 ${E(b, 5)} /${E(m, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
              0,
              Math.min(120 - 120 * x, 120)
            )}deg 100% 31%);`,
        o?.key
      )
    }
    return ((d = o?.onChange) == null || d.call(o, r), r)
  }
  return (
    a(n, 'memoizedFunction'),
    (n.updateDeps = l => {
      i = l
    }),
    n
  )
}
a(Ht, 'memo')
function Mr(e, t) {
  if (e === void 0) throw new Error(`Unexpected undefined${t ? `: ${t}` : ''}`)
  return e
}
a(Mr, 'notUndefined')
const $u = /* @__PURE__ */ a((e, t) => Math.abs(e - t) < 1, 'approxEqual')
const Uu = /* @__PURE__ */ a((e, t, o) => {
  let i
  return function (...r) {
    ;(e.clearTimeout(i), (i = e.setTimeout(() => t.apply(this, r), o)))
  }
}, 'debounce')

// ../node_modules/@tanstack/virtual-core/dist/esm/index.js
const f0 = /* @__PURE__ */ a(e => e, 'defaultKeyExtractor')
const m0 = /* @__PURE__ */ a(e => {
  const t = Math.max(e.startIndex - e.overscan, 0)
  const o = Math.min(e.endIndex + e.overscan, e.count - 1)
  const i = []
  for (let r = t; r <= o; r++) i.push(r)
  return i
}, 'defaultRangeExtractor')
const Yu = /* @__PURE__ */ a((e, t) => {
  const o = e.scrollElement
  if (!o) return
  const i = e.targetWindow
  if (!i) return
  const r = /* @__PURE__ */ a(l => {
    const { width: u, height: c } = l
    t({ width: Math.round(u), height: Math.round(c) })
  }, 'handler')
  if ((r(o.getBoundingClientRect()), !i.ResizeObserver)) return () => {}
  const n = new i.ResizeObserver(l => {
    const u = /* @__PURE__ */ a(() => {
      const c = l[0]
      if (c?.borderBoxSize) {
        const d = c.borderBoxSize[0]
        if (d) {
          r({ width: d.inlineSize, height: d.blockSize })
          return
        }
      }
      r(o.getBoundingClientRect())
    }, 'run')
    e.options.useAnimationFrameWithResizeObserver
      ? requestAnimationFrame(u)
      : u()
  })
  return (
    n.observe(o, { box: 'border-box' }),
    () => {
      n.unobserve(o)
    }
  )
}, 'observeElementRect')
const Gu = {
  passive: !0,
}
const qu = typeof window > 'u' ? !0 : 'onscrollend' in window
const Qu = /* @__PURE__ */ a((e, t) => {
  const o = e.scrollElement
  if (!o) return
  const i = e.targetWindow
  if (!i) return
  let r = 0
  const n =
    e.options.useScrollendEvent && qu
      ? () => {}
      : Uu(
          i,
          () => {
            t(r, !1)
          },
          e.options.isScrollingResetDelay
        )
  const l = /* @__PURE__ */ a(
    p => () => {
      const { horizontal: f, isRtl: h } = e.options
      ;((r = f ? o.scrollLeft * ((h && -1) || 1) : o.scrollTop), n(), t(r, p))
    },
    'createHandler'
  )
  const u = l(!0)
  const c = l(!1)
  ;(c(), o.addEventListener('scroll', u, Gu))
  const d = e.options.useScrollendEvent && qu
  return (
    d && o.addEventListener('scrollend', c, Gu),
    () => {
      ;(o.removeEventListener('scroll', u),
        d && o.removeEventListener('scrollend', c))
    }
  )
}, 'observeElementOffset')
const h0 = /* @__PURE__ */ a((e, t, o) => {
  if (t?.borderBoxSize) {
    const i = t.borderBoxSize[0]
    if (i)
      return Math.round(i[o.options.horizontal ? 'inlineSize' : 'blockSize'])
  }
  return Math.round(
    e.getBoundingClientRect()[o.options.horizontal ? 'width' : 'height']
  )
}, 'measureElement')
const Xu = /* @__PURE__ */ a((e, { adjustments: t = 0, behavior: o }, i) => {
  let r, n
  const l = e + t
  ;(n = (r = i.scrollElement) == null ? void 0 : r.scrollTo) == null ||
    n.call(r, {
      [i.options.horizontal ? 'left' : 'top']: l,
      behavior: o,
    })
}, 'elementScroll')
const Vi = class Vi {
  constructor(t) {
    ;((this.unsubs = []),
      (this.scrollElement = null),
      (this.targetWindow = null),
      (this.isScrolling = !1),
      (this.scrollToIndexTimeoutId = null),
      (this.measurementsCache = []),
      (this.itemSizeCache = /* @__PURE__ */ new Map()),
      (this.pendingMeasuredCacheIndexes = []),
      (this.scrollRect = null),
      (this.scrollOffset = null),
      (this.scrollDirection = null),
      (this.scrollAdjustments = 0),
      (this.elementsCache = /* @__PURE__ */ new Map()),
      (this.observer = /* @__PURE__ */ (() => {
        let o = null
        const i = /* @__PURE__ */ a(
          () =>
            o ||
            (!this.targetWindow || !this.targetWindow.ResizeObserver
              ? null
              : (o = new this.targetWindow.ResizeObserver(r => {
                  r.forEach(n => {
                    const l = /* @__PURE__ */ a(() => {
                      this._measureElement(n.target, n)
                    }, 'run')
                    this.options.useAnimationFrameWithResizeObserver
                      ? requestAnimationFrame(l)
                      : l()
                  })
                }))),
          'get'
        )
        return {
          disconnect: /* @__PURE__ */ a(() => {
            let r
            ;((r = i()) == null || r.disconnect(), (o = null))
          }, 'disconnect'),
          observe: /* @__PURE__ */ a(r => {
            let n
            return (n = i()) == null
              ? void 0
              : n.observe(r, { box: 'border-box' })
          }, 'observe'),
          unobserve: /* @__PURE__ */ a(r => {
            let n
            return (n = i()) == null ? void 0 : n.unobserve(r)
          }, 'unobserve'),
        }
      })()),
      (this.range = null),
      (this.setOptions = o => {
        ;(Object.entries(o).forEach(([i, r]) => {
          typeof r > 'u' && delete o[i]
        }),
          (this.options = {
            debug: !1,
            initialOffset: 0,
            overscan: 1,
            paddingStart: 0,
            paddingEnd: 0,
            scrollPaddingStart: 0,
            scrollPaddingEnd: 0,
            horizontal: !1,
            getItemKey: f0,
            rangeExtractor: m0,
            onChange: /* @__PURE__ */ a(() => {}, 'onChange'),
            measureElement: h0,
            initialRect: { width: 0, height: 0 },
            scrollMargin: 0,
            gap: 0,
            indexAttribute: 'data-index',
            initialMeasurementsCache: [],
            lanes: 1,
            isScrollingResetDelay: 150,
            enabled: !0,
            isRtl: !1,
            useScrollendEvent: !1,
            useAnimationFrameWithResizeObserver: !1,
            ...o,
          }))
      }),
      (this.notify = o => {
        let i, r
        ;(r = (i = this.options).onChange) == null || r.call(i, this, o)
      }),
      (this.maybeNotify = Ht(
        () => (
          this.calculateRange(),
          [
            this.isScrolling,
            this.range ? this.range.startIndex : null,
            this.range ? this.range.endIndex : null,
          ]
        ),
        o => {
          this.notify(o)
        },
        {
          key: !1,
          debug: /* @__PURE__ */ a(() => this.options.debug, 'debug'),
          initialDeps: [
            this.isScrolling,
            this.range ? this.range.startIndex : null,
            this.range ? this.range.endIndex : null,
          ],
        }
      )),
      (this.cleanup = () => {
        ;(this.unsubs.filter(Boolean).forEach(o => o()),
          (this.unsubs = []),
          this.observer.disconnect(),
          (this.scrollElement = null),
          (this.targetWindow = null))
      }),
      (this._didMount = () => () => {
        this.cleanup()
      }),
      (this._willUpdate = () => {
        let o
        const i = this.options.enabled ? this.options.getScrollElement() : null
        if (this.scrollElement !== i) {
          if ((this.cleanup(), !i)) {
            this.maybeNotify()
            return
          }
          ;((this.scrollElement = i),
            this.scrollElement && 'ownerDocument' in this.scrollElement
              ? (this.targetWindow =
                  this.scrollElement.ownerDocument.defaultView)
              : (this.targetWindow =
                  ((o = this.scrollElement) == null ? void 0 : o.window) ??
                  null),
            this.elementsCache.forEach(r => {
              this.observer.observe(r)
            }),
            this._scrollToOffset(this.getScrollOffset(), {
              adjustments: void 0,
              behavior: void 0,
            }),
            this.unsubs.push(
              this.options.observeElementRect(this, r => {
                ;((this.scrollRect = r), this.maybeNotify())
              })
            ),
            this.unsubs.push(
              this.options.observeElementOffset(this, (r, n) => {
                ;((this.scrollAdjustments = 0),
                  (this.scrollDirection = n
                    ? this.getScrollOffset() < r
                      ? 'forward'
                      : 'backward'
                    : null),
                  (this.scrollOffset = r),
                  (this.isScrolling = n),
                  this.maybeNotify())
              })
            ))
        }
      }),
      (this.getSize = () =>
        this.options.enabled
          ? ((this.scrollRect = this.scrollRect ?? this.options.initialRect),
            this.scrollRect[this.options.horizontal ? 'width' : 'height'])
          : ((this.scrollRect = null), 0)),
      (this.getScrollOffset = () =>
        this.options.enabled
          ? ((this.scrollOffset =
              this.scrollOffset ??
              (typeof this.options.initialOffset === 'function'
                ? this.options.initialOffset()
                : this.options.initialOffset)),
            this.scrollOffset)
          : ((this.scrollOffset = null), 0)),
      (this.getFurthestMeasurement = (o, i) => {
        const r = /* @__PURE__ */ new Map()
        const n = /* @__PURE__ */ new Map()
        for (let l = i - 1; l >= 0; l--) {
          const u = o[l]
          if (r.has(u.lane)) continue
          const c = n.get(u.lane)
          if (
            (c == null || u.end > c.end
              ? n.set(u.lane, u)
              : u.end < c.end && r.set(u.lane, !0),
            r.size === this.options.lanes)
          )
            break
        }
        return n.size === this.options.lanes
          ? Array.from(n.values()).sort((l, u) =>
              l.end === u.end ? l.index - u.index : l.end - u.end
            )[0]
          : void 0
      }),
      (this.getMeasurementOptions = Ht(
        () => [
          this.options.count,
          this.options.paddingStart,
          this.options.scrollMargin,
          this.options.getItemKey,
          this.options.enabled,
        ],
        (o, i, r, n, l) => (
          (this.pendingMeasuredCacheIndexes = []),
          {
            count: o,
            paddingStart: i,
            scrollMargin: r,
            getItemKey: n,
            enabled: l,
          }
        ),
        {
          key: !1,
        }
      )),
      (this.getMeasurements = Ht(
        () => [this.getMeasurementOptions(), this.itemSizeCache],
        (
          {
            count: o,
            paddingStart: i,
            scrollMargin: r,
            getItemKey: n,
            enabled: l,
          },
          u
        ) => {
          if (!l)
            return (
              (this.measurementsCache = []),
              this.itemSizeCache.clear(),
              []
            )
          this.measurementsCache.length === 0 &&
            ((this.measurementsCache = this.options.initialMeasurementsCache),
            this.measurementsCache.forEach(p => {
              this.itemSizeCache.set(p.key, p.size)
            }))
          const c =
            this.pendingMeasuredCacheIndexes.length > 0
              ? Math.min(...this.pendingMeasuredCacheIndexes)
              : 0
          this.pendingMeasuredCacheIndexes = []
          const d = this.measurementsCache.slice(0, c)
          for (let p = c; p < o; p++) {
            const f = n(p)
            const h =
              this.options.lanes === 1
                ? d[p - 1]
                : this.getFurthestMeasurement(d, p)
            const y = h ? h.end + this.options.gap : i + r
            const m = u.get(f)
            const b = typeof m === 'number' ? m : this.options.estimateSize(p)
            const x = y + b
            const E = h ? h.lane : p % this.options.lanes
            d[p] = {
              index: p,
              start: y,
              size: b,
              end: x,
              key: f,
              lane: E,
            }
          }
          return ((this.measurementsCache = d), d)
        },
        {
          key: !1,
          debug: /* @__PURE__ */ a(() => this.options.debug, 'debug'),
        }
      )),
      (this.calculateRange = Ht(
        () => [
          this.getMeasurements(),
          this.getSize(),
          this.getScrollOffset(),
          this.options.lanes,
        ],
        (o, i, r, n) =>
          (this.range =
            o.length > 0 && i > 0
              ? g0({
                  measurements: o,
                  outerSize: i,
                  scrollOffset: r,
                  lanes: n,
                })
              : null),
        {
          key: !1,
          debug: /* @__PURE__ */ a(() => this.options.debug, 'debug'),
        }
      )),
      (this.getVirtualIndexes = Ht(
        () => {
          let o = null
          let i = null
          const r = this.calculateRange()
          return (
            r && ((o = r.startIndex), (i = r.endIndex)),
            this.maybeNotify.updateDeps([this.isScrolling, o, i]),
            [
              this.options.rangeExtractor,
              this.options.overscan,
              this.options.count,
              o,
              i,
            ]
          )
        },
        (o, i, r, n, l) =>
          n === null || l === null
            ? []
            : o({
                startIndex: n,
                endIndex: l,
                overscan: i,
                count: r,
              }),
        {
          key: !1,
          debug: /* @__PURE__ */ a(() => this.options.debug, 'debug'),
        }
      )),
      (this.indexFromElement = o => {
        const i = this.options.indexAttribute
        const r = o.getAttribute(i)
        return r
          ? parseInt(r, 10)
          : (console.warn(
              `Missing attribute name '${i}={index}' on measured element.`
            ),
            -1)
      }),
      (this._measureElement = (o, i) => {
        const r = this.indexFromElement(o)
        const n = this.measurementsCache[r]
        if (!n) return
        const l = n.key
        const u = this.elementsCache.get(l)
        ;(u !== o &&
          (u && this.observer.unobserve(u),
          this.observer.observe(o),
          this.elementsCache.set(l, o)),
          o.isConnected &&
            this.resizeItem(r, this.options.measureElement(o, i, this)))
      }),
      (this.resizeItem = (o, i) => {
        const r = this.measurementsCache[o]
        if (!r) return
        const n = this.itemSizeCache.get(r.key) ?? r.size
        const l = i - n
        l !== 0 &&
          ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0
            ? this.shouldAdjustScrollPositionOnItemSizeChange(r, l, this)
            : r.start < this.getScrollOffset() + this.scrollAdjustments) &&
            this._scrollToOffset(this.getScrollOffset(), {
              adjustments: (this.scrollAdjustments += l),
              behavior: void 0,
            }),
          this.pendingMeasuredCacheIndexes.push(r.index),
          (this.itemSizeCache = new Map(this.itemSizeCache.set(r.key, i))),
          this.notify(!1))
      }),
      (this.measureElement = o => {
        if (!o) {
          this.elementsCache.forEach((i, r) => {
            i.isConnected ||
              (this.observer.unobserve(i), this.elementsCache.delete(r))
          })
          return
        }
        this._measureElement(o, void 0)
      }),
      (this.getVirtualItems = Ht(
        () => [this.getVirtualIndexes(), this.getMeasurements()],
        (o, i) => {
          const r = []
          for (let n = 0, l = o.length; n < l; n++) {
            const u = o[n]
            const c = i[u]
            r.push(c)
          }
          return r
        },
        {
          key: !1,
          debug: /* @__PURE__ */ a(() => this.options.debug, 'debug'),
        }
      )),
      (this.getVirtualItemForOffset = o => {
        const i = this.getMeasurements()
        if (i.length !== 0)
          return Mr(i[Zu(0, i.length - 1, r => Mr(i[r]).start, o)])
      }),
      (this.getOffsetForAlignment = (o, i, r = 0) => {
        const n = this.getSize()
        const l = this.getScrollOffset()
        ;(i === 'auto' && (i = o >= l + n ? 'end' : 'start'),
          i === 'center' ? (o += (r - n) / 2) : i === 'end' && (o -= n))
        const u = this.options.horizontal ? 'scrollWidth' : 'scrollHeight'
        const d =
          (this.scrollElement
            ? 'document' in this.scrollElement
              ? this.scrollElement.document.documentElement[u]
              : this.scrollElement[u]
            : 0) - n
        return Math.max(Math.min(d, o), 0)
      }),
      (this.getOffsetForIndex = (o, i = 'auto') => {
        o = Math.max(0, Math.min(o, this.options.count - 1))
        const r = this.measurementsCache[o]
        if (!r) return
        const n = this.getSize()
        const l = this.getScrollOffset()
        if (i === 'auto')
          if (r.end >= l + n - this.options.scrollPaddingEnd) i = 'end'
          else if (r.start <= l + this.options.scrollPaddingStart) i = 'start'
          else return [l, i]
        const u =
          i === 'end'
            ? r.end + this.options.scrollPaddingEnd
            : r.start - this.options.scrollPaddingStart
        return [this.getOffsetForAlignment(u, i, r.size), i]
      }),
      (this.isDynamicMode = () => this.elementsCache.size > 0),
      (this.cancelScrollToIndex = () => {
        this.scrollToIndexTimeoutId !== null &&
          this.targetWindow &&
          (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId),
          (this.scrollToIndexTimeoutId = null))
      }),
      (this.scrollToOffset = (o, { align: i = 'start', behavior: r } = {}) => {
        ;(this.cancelScrollToIndex(),
          r === 'smooth' &&
            this.isDynamicMode() &&
            console.warn(
              'The `smooth` scroll behavior is not fully supported with dynamic size.'
            ),
          this._scrollToOffset(this.getOffsetForAlignment(o, i), {
            adjustments: void 0,
            behavior: r,
          }))
      }),
      (this.scrollToIndex = (o, { align: i = 'auto', behavior: r } = {}) => {
        ;((o = Math.max(0, Math.min(o, this.options.count - 1))),
          this.cancelScrollToIndex(),
          r === 'smooth' &&
            this.isDynamicMode() &&
            console.warn(
              'The `smooth` scroll behavior is not fully supported with dynamic size.'
            ))
        const n = this.getOffsetForIndex(o, i)
        if (!n) return
        const [l, u] = n
        ;(this._scrollToOffset(l, { adjustments: void 0, behavior: r }),
          r !== 'smooth' &&
            this.isDynamicMode() &&
            this.targetWindow &&
            (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
              if (
                ((this.scrollToIndexTimeoutId = null),
                this.elementsCache.has(this.options.getItemKey(o)))
              ) {
                const [d] = Mr(this.getOffsetForIndex(o, u))
                $u(d, this.getScrollOffset()) ||
                  this.scrollToIndex(o, { align: u, behavior: r })
              } else this.scrollToIndex(o, { align: u, behavior: r })
            })))
      }),
      (this.scrollBy = (o, { behavior: i } = {}) => {
        ;(this.cancelScrollToIndex(),
          i === 'smooth' &&
            this.isDynamicMode() &&
            console.warn(
              'The `smooth` scroll behavior is not fully supported with dynamic size.'
            ),
          this._scrollToOffset(this.getScrollOffset() + o, {
            adjustments: void 0,
            behavior: i,
          }))
      }),
      (this.getTotalSize = () => {
        let o
        const i = this.getMeasurements()
        let r
        if (i.length === 0) r = this.options.paddingStart
        else if (this.options.lanes === 1)
          r = ((o = i[i.length - 1]) == null ? void 0 : o.end) ?? 0
        else {
          const n = Array(this.options.lanes).fill(null)
          let l = i.length - 1
          for (; l >= 0 && n.includes(null); ) {
            const u = i[l]
            ;(n[u.lane] === null && (n[u.lane] = u.end), l--)
          }
          r = Math.max(...n.filter(u => u !== null))
        }
        return Math.max(
          r - this.options.scrollMargin + this.options.paddingEnd,
          0
        )
      }),
      (this._scrollToOffset = (o, { adjustments: i, behavior: r }) => {
        this.options.scrollToFn(o, { behavior: r, adjustments: i }, this)
      }),
      (this.measure = () => {
        ;((this.itemSizeCache = /* @__PURE__ */ new Map()), this.notify(!1))
      }),
      this.setOptions(t))
  }
}
a(Vi, 'Virtualizer')
const Lr = Vi
var Zu = /* @__PURE__ */ a((e, t, o, i) => {
  for (; e <= t; ) {
    const r = ((e + t) / 2) | 0
    const n = o(r)
    if (n < i) e = r + 1
    else if (n > i) t = r - 1
    else return r
  }
  return e > 0 ? e - 1 : 0
}, 'findNearestBinarySearch')
function g0({ measurements: e, outerSize: t, scrollOffset: o, lanes: i }) {
  const r = e.length - 1
  const n = /* @__PURE__ */ a(c => e[c].start, 'getOffset')
  if (e.length <= i)
    return {
      startIndex: 0,
      endIndex: r,
    }
  let l = Zu(0, r, n, o)
  let u = l
  if (i === 1) for (; u < r && e[u].end < o + t; ) u++
  else if (i > 1) {
    const c = Array(i).fill(0)
    for (; u < r && c.some(p => p < o + t); ) {
      const p = e[u]
      ;((c[p.lane] = p.end), u++)
    }
    const d = Array(i).fill(o + t)
    for (; l >= 0 && d.some(p => p >= o); ) {
      const p = e[l]
      ;((d[p.lane] = p.start), l--)
    }
    ;((l = Math.max(0, l - (l % i))), (u = Math.min(r, u + (i - 1 - (u % i)))))
  }
  return { startIndex: l, endIndex: u }
}
a(g0, 'calculateRange')

// ../node_modules/@tanstack/react-virtual/dist/esm/index.js
const Ju = typeof document < 'u' ? Xt : H
function y0(e) {
  const t = Zt(() => ({}), {})[1]
  const o = {
    ...e,
    onChange: /* @__PURE__ */ a((r, n) => {
      let l
      ;(n ? Do(t) : t(), (l = e.onChange) == null || l.call(e, r, n))
    }, 'onChange'),
  }
  const [i] = K(() => new Lr(o))
  return (
    i.setOptions(o),
    Ju(() => i._didMount(), []),
    Ju(() => i._willUpdate()),
    i
  )
}
a(y0, 'useVirtualizerBase')
function ec(e) {
  return y0({
    observeElementRect: Yu,
    observeElementOffset: Qu,
    scrollToFn: Xu,
    ...e,
  })
}
a(ec, 'useVirtualizer')

// src/manager/components/sidebar/FIleSearchList.utils.tsx
const tc = /* @__PURE__ */ a(
  ({ parentRef: e, rowVirtualizer: t, selectedItem: o }) => {
    H(() => {
      const i = /* @__PURE__ */ a(r => {
        if (!e.current) return
        const n = t.options.count
        const l = document.activeElement
        const u = parseInt(l.getAttribute('data-index') || '-1', 10)
        const c = l.tagName === 'INPUT'
        const d = /* @__PURE__ */ a(
          () => document.querySelector('[data-index="0"]'),
          'getFirstElement'
        )
        const p = /* @__PURE__ */ a(
          () => document.querySelector(`[data-index="${n - 1}"]`),
          'getLastElement'
        )
        if (r.code === 'ArrowDown' && l) {
          if ((r.stopPropagation(), c)) {
            d()?.focus()
            return
          }
          if (u === n - 1) {
            ;(Do(() => {
              t.scrollToIndex(0, { align: 'start' })
            }),
              setTimeout(() => {
                d()?.focus()
              }, 100))
            return
          }
          if (o === u) {
            document
              .querySelector(`[data-index-position="${o}_first"]`)
              ?.focus()
            return
          }
          if (
            o !== null &&
            l.getAttribute('data-index-position')?.includes('last')
          ) {
            document.querySelector(`[data-index="${o + 1}"]`)?.focus()
            return
          }
          l.nextElementSibling?.focus()
        }
        if (r.code === 'ArrowUp' && l) {
          if (c) {
            ;(Do(() => {
              t.scrollToIndex(n - 1, { align: 'start' })
            }),
              setTimeout(() => {
                p()?.focus()
              }, 100))
            return
          }
          if (
            o !== null &&
            l.getAttribute('data-index-position')?.includes('first')
          ) {
            document.querySelector(`[data-index="${o}"]`)?.focus()
            return
          }
          l.previousElementSibling?.focus()
        }
      }, 'handleArrowKeys')
      return (
        document.addEventListener('keydown', i, { capture: !0 }),
        () => {
          document.removeEventListener('keydown', i, { capture: !0 })
        }
      )
    }, [t, o, e])
  },
  'useArrowKeyNavigation'
)

// src/manager/components/sidebar/FileList.tsx
const oc = I('div')(({ theme: e }) => ({
  marginTop: '-16px',
  // after element which fades out the list
  '&::after': {
    content: '""',
    position: 'fixed',
    pointerEvents: 'none',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    background: `linear-gradient(${so(e.barBg, 0)} 10%, ${e.barBg} 80%)`,
  },
}))
const Nr = I('div')(({ theme: e }) => ({
  height: '280px',
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  position: 'relative',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}))
const rc = I('li')(({ theme: e }) => ({
  ':focus-visible': {
    outline: 'none',
    '.file-list-item': {
      borderRadius: '4px',
      background:
        e.base === 'dark' ? 'rgba(255,255,255,.1)' : e.color.mediumlight,
      '> svg': {
        display: 'flex',
      },
    },
  },
}))
const Fr = I('div')(({ theme: e }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}))
const nc = I.div(({ theme: e, selected: t, disabled: o, error: i }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
  padding: '8px 16px',
  cursor: 'pointer',
  borderRadius: '4px',
  ...(t && {
    borderRadius: '4px',
    background:
      e.base === 'dark' ? 'rgba(255,255,255,.1)' : e.color.mediumlight,
    '> svg': {
      display: 'flex',
    },
  }),
  ...(o && {
    cursor: 'not-allowed',
    div: {
      color: `${e.color.mediumdark} !important`,
    },
  }),
  ...(i && {
    background: e.base === 'light' ? '#00000011' : '#00000033',
  }),
  '&:hover': {
    background: i
      ? '#00000022'
      : e.base === 'dark'
        ? 'rgba(255,255,255,.1)'
        : e.color.mediumlight,
    '> svg': {
      display: 'flex',
    },
  },
}))
const ic = I('ul')({
  margin: 0,
  padding: '0 0 0 0',
  width: '100%',
  position: 'relative',
})
const sc = I('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 'calc(100% - 50px)',
})
const ac = I('div')(({ theme: e, error: t }) => ({
  color: t ? e.color.negativeText : e.color.secondary,
}))
const lc = I('div')(({ theme: e, error: t }) => ({
  color: t
    ? e.color.negativeText
    : e.base === 'dark'
      ? e.color.lighter
      : e.color.darkest,
  fontSize: '14px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%',
}))
const uc = I('div')(({ theme: e }) => ({
  color: e.color.mediumdark,
  fontSize: '14px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%',
}))
const cc = I('ul')(({ theme: e }) => ({
  margin: 0,
  padding: 0,
}))
const pc = I('li')(({ theme: e, error: t }) => ({
  padding: '8px 16px 8px 16px',
  marginLeft: '30px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '4px',
  ':focus-visible': {
    outline: 'none',
  },
  ...(t && {
    background: '#F9ECEC',
    color: e.color.negativeText,
  }),
  '&:hover,:focus-visible': {
    background: t
      ? '#F9ECEC'
      : e.base === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : e.color.mediumlight,
    '> svg': {
      display: 'flex',
    },
  },
  '> div > svg': {
    color: t ? e.color.negativeText : e.color.secondary,
  },
}))
const dc = I('div')(({ theme: e }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: 'calc(100% - 20px)',
}))
const fc = I('span')(({ theme: e }) => ({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: 'calc(100% - 160px)',
  display: 'inline-block',
}))
const mc = I('span')(({ theme: e }) => ({
  display: 'inline-block',
  padding: `1px ${e.appBorderRadius}px`,
  borderRadius: '2px',
  fontSize: '10px',
  color: e.base === 'dark' ? e.color.lightest : '#727272',
  backgroundColor: e.base === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#F2F4F5',
}))
const hc = I('div')(({ theme: e }) => ({
  textAlign: 'center',
  maxWidth: '334px',
  margin: '16px auto 50px auto',
  fontSize: '14px',
  color: e.base === 'dark' ? e.color.lightest : '#000',
}))
const gc = I('p')(({ theme: e }) => ({
  margin: 0,
  color: e.base === 'dark' ? e.color.defaultText : e.color.mediumdark,
}))

// src/manager/components/sidebar/FileSearchListSkeleton.tsx
const b0 = I('div')(({ theme: e }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
  padding: '8px 16px',
}))
const v0 = I('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  borderRadius: '3px',
})
const x0 = I.div(({ theme: e }) => ({
  width: '14px',
  height: '14px',
  borderRadius: '3px',
  marginTop: '1px',
  background: e.base === 'dark' ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
}))
const yc = I.div(({ theme: e }) => ({
  height: '16px',
  borderRadius: '3px',
  background: e.base === 'dark' ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
  width: '100%',
  maxWidth: '100%',
  '+ div': {
    marginTop: '6px',
  },
}))
const bc = /* @__PURE__ */ a(
  () =>
    /* @__PURE__ */ s.createElement(
      Nr,
      null,
      [1, 2, 3].map(e =>
        /* @__PURE__ */ s.createElement(
          Fr,
          { key: e },
          /* @__PURE__ */ s.createElement(
            b0,
            null,
            /* @__PURE__ */ s.createElement(x0, null),
            /* @__PURE__ */ s.createElement(
              v0,
              null,
              /* @__PURE__ */ s.createElement(yc, { style: { width: '90px' } }),
              /* @__PURE__ */ s.createElement(yc, { style: { width: '300px' } })
            )
          )
        )
      )
    ),
  'FileSearchListLoa\
dingSkeleton'
)

// src/manager/components/sidebar/FileSearchList.tsx
const vc = I(Cn)(({ theme: e }) => ({
  display: 'none',
  alignSelf: 'center',
  color: e.color.mediumdark,
}))
const I0 = I(Ot)(({ theme: e }) => ({
  display: 'none',
  alignSelf: 'center',
  color: e.color.mediumdark,
}))
const xc = _t(
  /* @__PURE__ */ a(function ({
    isLoading: t,
    searchResults: o,
    onNewStory: i,
    errorItemId: r,
  }) {
    const [n, l] = K(null)
    const u = s.useRef()
    const c = G(
      () =>
        [...(o ?? [])].sort((m, b) => {
          const x =
            m.exportedComponents === null || m.exportedComponents?.length === 0
          const E = m.storyFileExists
          const g =
            b.exportedComponents === null || b.exportedComponents?.length === 0
          const v = b.storyFileExists
          return E && !v ? -1 : (v && !E) || (x && !g) ? 1 : !x && g ? -1 : 0
        }),
      [o]
    )
    const d = o?.length || 0
    const p = ec({
      count: d,
      // @ts-expect-error (non strict)
      getScrollElement: /* @__PURE__ */ a(() => u.current, 'getScrollElement'),
      paddingStart: 16,
      paddingEnd: 40,
      estimateSize: /* @__PURE__ */ a(() => 54, 'estimateSize'),
      overscan: 2,
    })
    tc({ rowVirtualizer: p, parentRef: u, selectedItem: n })
    const f = A(
      ({ virtualItem: m, searchResult: b, itemId: x }) => {
        b?.exportedComponents?.length > 1
          ? l(E => (E === m.index ? null : m.index))
          : b?.exportedComponents?.length === 1 &&
            i({
              componentExportName: b.exportedComponents[0].name,
              componentFilePath: b.filepath,
              componentIsDefaultExport: b.exportedComponents[0].default,
              selectedItemId: x,
              componentExportCount: 1,
            })
      },
      [i]
    )
    const h = A(
      ({ searchResult: m, component: b, id: x }) => {
        i({
          componentExportName: b.name,
          componentFilePath: m.filepath,
          componentIsDefaultExport: b.default,
          selectedItemId: x,
          // @ts-expect-error (non strict)
          componentExportCount: m.exportedComponents.length,
        })
      },
      [i]
    )
    const y = A(
      ({ virtualItem: m, selected: b, searchResult: x }) => {
        const E = r === x.filepath
        const g = b === m.index
        return /* @__PURE__ */ s.createElement(
          Fr,
          {
            'aria-expanded': g,
            'aria-controls': `file-list-export-${m.index}`,
            id: `file-list-item-wrapper-${m.index}`,
          },
          /* @__PURE__ */ s.createElement(
            nc,
            {
              className: 'file-list-item',
              selected: g,
              error: E,
              disabled:
                x.exportedComponents === null ||
                x.exportedComponents?.length === 0,
            },
            /* @__PURE__ */ s.createElement(
              ac,
              { error: E },
              /* @__PURE__ */ s.createElement(Xo, null)
            ),
            /* @__PURE__ */ s.createElement(
              sc,
              null,
              /* @__PURE__ */ s.createElement(
                lc,
                { error: E },
                x.filepath.split('/').at(-1)
              ),
              /* @__PURE__ */ s.createElement(uc, null, x.filepath)
            ),
            g
              ? /* @__PURE__ */ s.createElement(I0, null)
              : /* @__PURE__ */ s.createElement(vc, null)
          ),
          x?.exportedComponents?.length > 1 &&
            g &&
            /* @__PURE__ */ s.createElement(
              cc,
              {
                role: 'region',
                id: `file-list-export-${m.index}`,
                'aria-labelledby': `file-list-item-wrapper-${m.index}`,
                onClick: v => {
                  v.stopPropagation()
                },
                onKeyUp: v => {
                  v.key === 'Enter' && v.stopPropagation()
                },
              },
              x.exportedComponents?.map((v, S) => {
                const w = r === `${x.filepath}_${S}`
                const k =
                  S === 0
                    ? 'first'
                    : // @ts-expect-error (non strict)
                      S === x.exportedComponents.length - 1
                      ? 'last'
                      : 'middle'
                return /* @__PURE__ */ s.createElement(
                  pc,
                  {
                    tabIndex: 0,
                    'data-index-position': `${m.index}_${k}`,
                    key: v.name,
                    error: w,
                    onClick: () => {
                      h({
                        searchResult: x,
                        component: v,
                        id: `${x.filepath}_${S}`,
                      })
                    },
                    onKeyUp: _ => {
                      _.key === 'Enter' &&
                        h({
                          searchResult: x,
                          component: v,
                          id: `${x.filepath}_${S}`,
                        })
                    },
                  },
                  /* @__PURE__ */ s.createElement(
                    dc,
                    null,
                    /* @__PURE__ */ s.createElement(Xo, null),
                    v.default
                      ? /* @__PURE__ */ s.createElement(
                          s.Fragment,
                          null,
                          /* @__PURE__ */ s.createElement(
                            fc,
                            null,
                            x.filepath.split('/').at(-1)?.split('.')?.at(0)
                          ),
                          /* @__PURE__ */ s.createElement(
                            mc,
                            null,
                            'Default export'
                          )
                        )
                      : v.name
                  ),
                  /* @__PURE__ */ s.createElement(vc, null)
                )
              })
            )
        )
      },
      [h, r]
    )
    return t && (o === null || o?.length === 0)
      ? /* @__PURE__ */ s.createElement(bc, null)
      : o?.length === 0
        ? /* @__PURE__ */ s.createElement(
            hc,
            null,
            /* @__PURE__ */ s.createElement(
              'p',
              null,
              'We could not find any file with that name'
            ),
            /* @__PURE__ */ s.createElement(
              gc,
              null,
              'You may want to try using different keywords, check for typos, and adjust your filters'
            )
          )
        : c?.length > 0
          ? /* @__PURE__ */ s.createElement(
              oc,
              null,
              /* @__PURE__ */ s.createElement(
                Nr,
                { ref: u },
                /* @__PURE__ */ s.createElement(
                  ic,
                  {
                    style: {
                      height: `${p.getTotalSize()}px`,
                    },
                  },
                  p.getVirtualItems().map(m => {
                    const b = c[m.index]
                    const x =
                      b.exportedComponents === null ||
                      b.exportedComponents?.length === 0
                    const E = {}
                    return /* @__PURE__ */ s.createElement(
                      rc,
                      {
                        key: m.key,
                        'data-index': m.index,
                        ref: p.measureElement,
                        onClick: () => {
                          f({
                            virtualItem: m,
                            itemId: b.filepath,
                            searchResult: b,
                          })
                        },
                        onKeyUp: g => {
                          g.key === 'Enter' &&
                            f({
                              virtualItem: m,
                              itemId: b.filepath,
                              searchResult: b,
                            })
                        },
                        style: {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          transform: `translateY(${m.start}px)`,
                        },
                        tabIndex: 0,
                      },
                      x
                        ? /* @__PURE__ */ s.createElement(
                            ve,
                            {
                              ...E,
                              style: { width: '100%' },
                              hasChrome: !1,
                              closeOnOutsideClick: !0,
                              tooltip: /* @__PURE__ */ s.createElement(rt, {
                                note: x
                                  ? "We can't evaluate exports for this file. You can't create a story for it automatically"
                                  : null,
                              }),
                            },
                            /* @__PURE__ */ s.createElement(y, {
                              searchResult: b,
                              selected: n,
                              virtualItem: m,
                            })
                          )
                        : /* @__PURE__ */ s.createElement(y, {
                            ...E,
                            key: m.index,
                            searchResult: b,
                            selected: n,
                            virtualItem: m,
                          })
                    )
                  })
                )
              )
            )
          : null
  }, 'FileSearchList')
)

// src/manager/components/sidebar/FileSearchModal.tsx
const S0 = 418
const w0 = I(Mt)(() => ({
  boxShadow: 'none',
  background: 'transparent',
  overflow: 'visible',
}))
const E0 = I.div(({ theme: e, height: t }) => ({
  backgroundColor: e.background.bar,
  borderRadius: 6,
  boxShadow:
    'rgba(255, 255, 255, 0.05) 0 0 0 1px inset, rgba(14, 18, 22, 0.35) 0px 10px 18px -10px',
  padding: '16px',
  transition: 'height 0.3s',
  height: t ? `${t + 32}px` : 'auto',
  overflow: 'hidden',
}))
const T0 = I(Mt.Content)(({ theme: e }) => ({
  margin: 0,
  color: e.base === 'dark' ? e.color.lighter : e.color.mediumdark,
}))
const C0 = I(rr.Input)(({ theme: e }) => ({
  paddingLeft: 40,
  paddingRight: 28,
  fontSize: 14,
  height: 40,
  ...(e.base === 'light' && {
    color: e.color.darkest,
  }),
  '::placeholder': {
    color: e.color.mediumdark,
  },
  '&:invalid:not(:placeholder-shown)': {
    boxShadow: `${e.color.negative} 0 0 0 1px inset`,
  },
  '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
    {
      display: 'none',
    },
}))
const _0 = I.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'relative',
})
const k0 = I.div(({ theme: e }) => ({
  position: 'absolute',
  top: 0,
  left: 16,
  zIndex: 1,
  pointerEvents: 'none',
  color: e.darkest,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}))
const O0 = I.div(({ theme: e }) => ({
  position: 'absolute',
  top: 0,
  right: 16,
  zIndex: 1,
  color: e.darkest,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  animation: 'spin 1s linear infinite',
}))
const P0 = I(Mt.Error)({
  position: 'absolute',
  padding: '8px 40px 8px 16px',
  bottom: 0,
  maxHeight: 'initial',
  width: '100%',
  div: {
    wordBreak: 'break-word',
  },
  '> div': {
    padding: 0,
  },
})
const A0 = I(bo)({
  position: 'absolute',
  top: 4,
  right: -24,
  cursor: 'pointer',
})
const Ic = /* @__PURE__ */ a(
  ({
    open: e,
    onOpenChange: t,
    fileSearchQuery: o,
    setFileSearchQuery: i,
    isLoading: r,
    error: n,
    searchResults: l,
    onCreateNewStory: u,
    setError: c,
    container: d,
  }) => {
    const [p, f] = Ku()
    const [h, y] = K(f.height)
    const [, m] = ia()
    const [b, x] = K(o)
    return (
      H(() => {
        h < f.height && y(f.height)
      }, [f.height, h]),
      /* @__PURE__ */ s.createElement(
        w0,
        {
          height: S0,
          width: 440,
          open: e,
          onOpenChange: t,
          onEscapeKeyDown: () => {
            t(!1)
          },
          onInteractOutside: () => {
            t(!1)
          },
          container: d,
        },
        /* @__PURE__ */ s.createElement(
          E0,
          { height: o === '' ? f.height : h },
          /* @__PURE__ */ s.createElement(
            T0,
            { ref: p },
            /* @__PURE__ */ s.createElement(
              Mt.Header,
              null,
              /* @__PURE__ */ s.createElement(
                Mt.Title,
                null,
                'Add a new story'
              ),
              /* @__PURE__ */ s.createElement(
                Mt.Description,
                null,
                'We will create a new story for your component'
              )
            ),
            /* @__PURE__ */ s.createElement(
              _0,
              null,
              /* @__PURE__ */ s.createElement(
                k0,
                null,
                /* @__PURE__ */ s.createElement(So, null)
              ),
              /* @__PURE__ */ s.createElement(C0, {
                placeholder: './components/**/*.tsx',
                type: 'search',
                required: !0,
                autoFocus: !0,
                value: b,
                onChange: E => {
                  const g = E.target.value
                  ;(x(g),
                    m(() => {
                      i(g)
                    }))
                },
              }),
              r &&
                /* @__PURE__ */ s.createElement(
                  O0,
                  null,
                  /* @__PURE__ */ s.createElement(ct, null)
                )
            ),
            /* @__PURE__ */ s.createElement(xc, {
              errorItemId: n?.selectedItemId,
              isLoading: r,
              searchResults: l,
              onNewStory: u,
            })
          )
        ),
        n &&
          o !== '' &&
          /* @__PURE__ */ s.createElement(
            P0,
            null,
            /* @__PURE__ */ s.createElement('div', null, n.error),
            /* @__PURE__ */ s.createElement(A0, {
              onClick: () => {
                c(null)
              },
            })
          )
      )
    )
  },
  'FileSearchModal'
)

// src/manager/components/sidebar/FileSearchModal.utils.tsx
function Sc(e) {
  return Object.keys(e).reduce((o, i) => {
    const r = e[i]
    if (typeof r.control === 'object' && 'type' in r.control)
      switch (r.control.type) {
        case 'object':
          o[i] = {}
          break
        case 'inline-radio':
        case 'radio':
        case 'inline-check':
        case 'check':
        case 'select':
        case 'multi-select':
          o[i] = r.control.options?.[0]
          break
        case 'color':
          o[i] = '#000000'
          break
        default:
          break
      }
    return (Rr(r.type, o, i), o)
  }, {})
}
a(Sc, 'extractSeededRequiredArgs')
function Rr(e, t, o) {
  if (!(typeof e === 'string' || !e.required))
    switch (e.name) {
      case 'boolean':
        t[o] = !0
        break
      case 'number':
        t[o] = 0
        break
      case 'string':
        t[o] = o
        break
      case 'array':
        t[o] = []
        break
      case 'object':
        ;((t[o] = {}),
          Object.entries(e.value ?? {}).forEach(([i, r]) => {
            Rr(r, t[o], i)
          }))
        break
      case 'function':
        t[o] = () => {}
        break
      case 'intersection':
        e.value?.every(i => i.name === 'object') &&
          ((t[o] = {}),
          e.value?.forEach(i => {
            i.name === 'object' &&
              Object.entries(i.value ?? {}).forEach(([r, n]) => {
                Rr(n, t[o], r)
              })
          }))
        break
      case 'union':
        e.value?.[0] !== void 0 && Rr(e.value[0], t, o)
        break
      case 'enum':
        e.value?.[0] !== void 0 && (t[o] = e.value?.[0])
        break
      case 'other':
        typeof e.value === 'string' && e.value === 'tuple' && (t[o] = [])
        break
      default:
        break
    }
}
a(Rr, 'setArgType')
async function Br(e, t, o = 1) {
  if (o > 10)
    throw new Error('We could not select the new story. Please try again.')
  try {
    await e(t)
  } catch {
    return (await new Promise(r => setTimeout(r, 500)), Br(e, t, o + 1))
  }
}
a(Br, 'trySelectNewStory')

// src/manager/components/sidebar/CreateNewStoryFileModal.tsx
const D0 = /* @__PURE__ */ a(
  e =>
    JSON.stringify(e, (t, o) =>
      typeof o === 'function' ? '__sb_empty_function_arg__' : o
    ),
  'stringifyArgs'
)
const wc = /* @__PURE__ */ a(({ open: e, onOpenChange: t }) => {
  const [o, i] = K(!1)
  const [r, n] = K('')
  const l = ju(r, 600)
  const u = ra(l)
  const c = U(null)
  const [d, p] = K(null)
  const f = oe()
  const [h, y] = K(null)
  const m = A(
    g => {
      ;(f.addNotification({
        id: 'create-new-story-file-success',
        content: {
          headline: 'Story file created',
          subHeadline: `${g} was created`,
        },
        duration: 8e3,
        icon: /* @__PURE__ */ s.createElement(Be, null),
      }),
        t(!1))
    },
    [f, t]
  )
  const b = A(() => {
    ;(f.addNotification({
      id: 'create-new-story-file-error',
      content: {
        headline: 'Story already exists',
        subHeadline: 'Successfully navigated to existing story',
      },
      duration: 8e3,
      icon: /* @__PURE__ */ s.createElement(Be, null),
    }),
      t(!1))
  }, [f, t])
  const x = A(() => {
    i(!0)
    const g = He.getChannel()
    const v = /* @__PURE__ */ a(S => {
      S.id === u &&
        (S.success ? y(S.payload.files) : p({ error: S.error }),
        g.off(Yo, v),
        i(!1),
        (c.current = null))
    }, 'set')
    return (
      g.on(Yo, v),
      u !== '' && c.current !== u
        ? ((c.current = u),
          g.emit(fa, {
            id: u,
            payload: {},
          }))
        : (y(null), i(!1)),
      () => {
        g.off(Yo, v)
      }
    )
  }, [u])
  const E = A(
    async ({
      componentExportName: g,
      componentFilePath: v,
      componentIsDefaultExport: S,
      componentExportCount: w,
      selectedItemId: k,
    }) => {
      try {
        const _ = He.getChannel()
        const C = await Jo(_, pa, da, {
          componentExportName: g,
          componentFilePath: v,
          componentIsDefaultExport: S,
          componentExportCount: w,
        })
        p(null)
        const T = C.storyId
        await Br(f.selectStory, T)
        try {
          const P = (
            await Jo(_, aa, la, {
              storyId: T,
            })
          ).argTypes
          const D = Sc(P)
          await Jo(_, ha, ga, {
            args: D0(D),
            importPath: C.storyFilePath,
            csfId: T,
          })
        } catch {}
        ;(m(g), x())
      } catch (_) {
        switch (_?.payload?.type) {
          case 'STORY_FILE_EXISTS':
            const C = _
            ;(await Br(f.selectStory, C.payload.kind), b())
            break
          default:
            p({ selectedItemId: k, error: _?.message })
            break
        }
      }
    },
    [f?.selectStory, m, x, b]
  )
  return (
    H(() => {
      p(null)
    }, [u]),
    H(() => x(), [x]),
    /* @__PURE__ */ s.createElement(Ic, {
      error: d,
      fileSearchQuery: r,
      fileSearchQueryDeferred: u,
      onCreateNewStory: E,
      isLoading: o,
      onOpenChange: t,
      open: e,
      searchResults: h,
      setError: p,
      setFileSearchQuery: n,
    })
  )
}, 'CreateNewStoryFileModal')

// src/manager/components/sidebar/HighlightStyles.tsx
const Ec = /* @__PURE__ */ a(
  ({ refId: e, itemId: t }) =>
    /* @__PURE__ */ s.createElement(eo, {
      styles: ({ color: o }) => {
        const i = Te(0.85, o.secondary)
        return {
          [`[data-ref-id="${e}"][data-item-id="${t}"]:not([data-selected="true"])`]:
            {
              '&[data-nodetype="component"], &[data-nodetype="group"]': {
                background: i,
                '&:hover, &:focus': { background: i },
              },
              '&[data-nodetype="story"], &[data-nodetype="document"]': {
                color: o.defaultText,
                background: i,
                '&:hover, &:focus': { background: i },
              },
            },
        }
      },
    }),
  'HighlightStyles'
)

// src/manager/utils/tree.ts
const co = Ve(Di(), 1)
const { document: ji, window: M0 } = se
const Hr = /* @__PURE__ */ a(
  (e, t) => (!t || t === lt ? e : `${t}_${e}`),
  'createId'
)
const _c = /* @__PURE__ */ a(
  (e, t) => `${ji.location.pathname}?path=/${e.type}/${Hr(e.id, t)}`,
  'getLink'
)
const Tc = (0, co.default)(1e3)((e, t) => t[e])
const L0 = (0, co.default)(1e3)((e, t) => {
  const o = Tc(e, t)
  return o && o.type !== 'root' ? Tc(o.parent, t) : void 0
})
var kc = (0, co.default)(1e3)((e, t) => {
  const o = L0(e, t)
  return o ? [o, ...kc(o.id, t)] : []
})
const Fo = (0, co.default)(1e3)((e, t) => kc(t, e).map(o => o.id))
var at = (0, co.default)(1e3)((e, t, o) => {
  const i = e[t]
  return !i || i.type === 'story' || i.type === 'docs' || !i.children
    ? []
    : i.children.reduce((r, n) => {
        const l = e[n]
        return (
          !l ||
            (o && (l.type === 'story' || l.type === 'docs')) ||
            r.push(n, ...at(e, n, o)),
          r
        )
      }, [])
})
function Oc(e, t) {
  const o = e.type !== 'root' && e.parent ? t.index[e.parent] : null
  return o ? [...Oc(o, t), o.name] : t.id === lt ? [] : [t.title || t.id]
}
a(Oc, 'getPath')
const Ki = /* @__PURE__ */ a(
  (e, t) => ({ ...e, refId: t.id, path: Oc(e, t) }),
  'searchItem'
)
function Pc(e, t, o) {
  let i = t + (o % e.length)
  return (i < 0 && (i = e.length + i), i >= e.length && (i -= e.length), i)
}
a(Pc, 'cycle')
const zt = /* @__PURE__ */ a((e, t = !1) => {
  if (!e) return
  const { top: o, bottom: i } = e.getBoundingClientRect()
  if (!o || !i) return
  const r =
    ji?.querySelector('#sidebar-bottom-wrapper')?.getBoundingClientRect().top ||
    M0.innerHeight ||
    ji.documentElement.clientHeight
  i > r && e.scrollIntoView({ block: t ? 'center' : 'nearest' })
}, 'scrollIntoView')
const Ac = /* @__PURE__ */ a((e, t, o, i) => {
  switch (!0) {
    case t:
      return 'auth'
    case o:
      return 'error'
    case e:
      return 'loading'
    case i:
      return 'empty'
    default:
      return 'ready'
  }
}, 'getStateType')
var Wt = /* @__PURE__ */ a(
  (e, t) => (!e || !t ? !1 : e === t ? !0 : Wt(e.parentElement || void 0, t)),
  'isAncestor'
)
const Cc = /* @__PURE__ */ a(
  e => e.replaceAll(/(\s|-|_)/gi, ''),
  'removeNoiseFromName'
)
const Dc = /* @__PURE__ */ a((e, t) => Cc(e) === Cc(t), 'isStoryHoistable')

// src/manager/components/sidebar/Loader.tsx
const Mc = [0, 0, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3]
const N0 = I.div(
  {
    cursor: 'progress',
    fontSize: 13,
    height: '16px',
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ({ depth: e = 0 }) => ({
    marginLeft: e * 15,
    maxWidth: 85 - e * 5,
  }),
  ({ theme: e }) => e.animation.inlineGlow,
  ({ theme: e }) => ({
    background: e.appBorderColor,
  })
)
const Ro = I.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 20,
})
const Lc = /* @__PURE__ */ a(({ size: e }) => {
  const t = Math.ceil(e / Mc.length)
  const o = Array.from(Array(t)).fill(Mc).flat().slice(0, e)
  return /* @__PURE__ */ s.createElement(
    Ee,
    null,
    o.map((i, r) => /* @__PURE__ */ s.createElement(N0, { depth: i, key: r }))
  )
}, 'Loader')

// src/manager/components/sidebar/RefBlocks.tsx
const { window: Nc } = se
const F0 = I.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: '20px',
  margin: 0,
}))
const $i = I.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: '20px',
  margin: 0,
  code: {
    fontSize: e.typography.size.s1,
  },
  ul: {
    paddingLeft: 20,
    marginTop: 8,
    marginBottom: 8,
  },
}))
const R0 = I.pre(
  {
    width: 420,
    boxSizing: 'border-box',
    borderRadius: 8,
    overflow: 'auto',
    whiteSpace: 'pre',
  },
  ({ theme: e }) => ({
    color: e.color.dark,
  })
)
const Fc = /* @__PURE__ */ a(({ loginUrl: e, id: t }) => {
  const [o, i] = K(!1)
  const r = A(() => {
    Nc.document.location.reload()
  }, [])
  const n = A(l => {
    l.preventDefault()
    const u = Nc.open(e, `storybook_auth_${t}`, 'resizable,scrollbars')
    const c = setInterval(() => {
      u
        ? u.closed && (clearInterval(c), i(!0))
        : (ur.error('unable to access loginUrl window'), clearInterval(c))
    }, 1e3)
  }, [])
  return /* @__PURE__ */ s.createElement(
    Ro,
    null,
    /* @__PURE__ */ s.createElement(
      pt,
      null,
      o
        ? /* @__PURE__ */ s.createElement(
            Ee,
            null,
            /* @__PURE__ */ s.createElement(
              $i,
              null,
              'Authentication on ',
              /* @__PURE__ */ s.createElement('strong', null, e),
              ' concluded. Refresh the page to fetch t\
his Storybook.'
            ),
            /* @__PURE__ */ s.createElement(
              'div',
              null,
              /* @__PURE__ */ s.createElement(
                he,
                { size: 'small', variant: 'outline', onClick: r },
                /* @__PURE__ */ s.createElement(ct, null),
                'Refresh now'
              )
            )
          )
        : /* @__PURE__ */ s.createElement(
            Ee,
            null,
            /* @__PURE__ */ s.createElement(
              $i,
              null,
              'Sign in to browse this Storybook.'
            ),
            /* @__PURE__ */ s.createElement(
              'div',
              null,
              /* @__PURE__ */ s.createElement(
                he,
                {
                  size: 'smal\
l',
                  variant: 'outline',
                  onClick: n,
                },
                /* @__PURE__ */ s.createElement(xo, null),
                'Sign in'
              )
            )
          )
    )
  )
}, 'AuthBlock')
const Rc = /* @__PURE__ */ a(
  ({ error: e }) =>
    /* @__PURE__ */ s.createElement(
      Ro,
      null,
      /* @__PURE__ */ s.createElement(
        pt,
        null,
        /* @__PURE__ */ s.createElement(
          F0,
          null,
          'Oh no! Something went wrong loading this Storybook.',
          /* @__PURE__ */ s.createElement('br', null),
          /* @__PURE__ */ s.createElement(
            ve,
            {
              tooltip: /* @__PURE__ */ s.createElement(
                R0,
                null,
                /* @__PURE__ */ s.createElement(ka, { error: e })
              ),
            },
            /* @__PURE__ */ s.createElement(
              Pe,
              { isButton: !0 },
              'View error ',
              /* @__PURE__ */ s.createElement(Ot, null)
            )
          ),
          ' ',
          /* @__PURE__ */ s.createElement(
            Pe,
            {
              withArrow: !0,
              href: 'https://storybook.js.org/docs',
              cancel: !1,
              target: '_blank',
            },
            'View do\
cs'
          )
        )
      )
    ),
  'ErrorBlock'
)
const B0 = I(pt)({
  display: 'flex',
})
const H0 = I(pt)({
  flex: 1,
})
const Bc = /* @__PURE__ */ a(
  ({ isMain: e }) =>
    /* @__PURE__ */ s.createElement(
      Ro,
      null,
      /* @__PURE__ */ s.createElement(
        B0,
        { col: 1 },
        /* @__PURE__ */ s.createElement(
          H0,
          null,
          /* @__PURE__ */ s.createElement(
            $i,
            null,
            e
              ? /* @__PURE__ */ s.createElement(
                  s.Fragment,
                  null,
                  'Oh no! Your Storybo\
ok is empty. Possible reasons why:',
                  /* @__PURE__ */ s.createElement(
                    'ul',
                    null,
                    /* @__PURE__ */ s.createElement(
                      'li',
                      null,
                      'The glob speci\
fied in ',
                      /* @__PURE__ */ s.createElement('code', null, 'main.js'),
                      " isn't correct."
                    ),
                    /* @__PURE__ */ s.createElement(
                      'li',
                      null,
                      'No sto\
ries are defined in your story files.'
                    ),
                    /* @__PURE__ */ s.createElement(
                      'li',
                      null,
                      "You're using filter-functions, and all stories are fil\
tered away."
                    )
                  ),
                  ' '
                )
              : /* @__PURE__ */ s.createElement(
                  s.Fragment,
                  null,
                  "This composed storybook is empty, maybe you're using filter-functi\
ons, and all stories are filtered away."
                )
          )
        )
      )
    ),
  'EmptyBlock'
)
const Hc = /* @__PURE__ */ a(
  ({ isMain: e }) =>
    /* @__PURE__ */ s.createElement(
      Ro,
      null,
      /* @__PURE__ */ s.createElement(Lc, { size: e ? 17 : 5 })
    ),
  'LoaderBlock'
)

// src/manager/components/sidebar/RefIndicator.tsx
const { document: z0, window: W0 } = se
const V0 = I.aside(({ theme: e }) => ({
  height: 16,
  display: 'flex',
  alignItems: 'center',
  '& > * + *': {
    marginLeft: e.layoutMargin,
  },
}))
const j0 = I.button(({ theme: e }) => ({
  height: 20,
  width: 20,
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  outline: 'none',
  border: '1px solid transparent',
  borderRadius: '100%',
  cursor: 'pointer',
  color:
    e.base === 'light'
      ? Te(0.3, e.color.defaultText)
      : Te(0.6, e.color.defaultText),
  '&:hover': {
    color: e.barSelectedColor,
  },
  '&:focus': {
    color: e.barSelectedColor,
    borderColor: e.color.secondary,
  },
  svg: {
    height: 10,
    width: 10,
    transition: 'all 150ms ease-out',
    color: 'inherit',
  },
}))
const Vt = I.span(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
}))
const jt = I.a(({ theme: e }) => ({
  textDecoration: 'none',
  lineHeight: '16px',
  padding: 15,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  color: e.color.defaultText,
  '&:not(:last-child)': {
    borderBottom: `1px solid ${e.appBorderColor}`,
  },
  '&:hover': {
    background: e.background.hoverable,
    color: e.color.darker,
  },
  '&:link': {
    color: e.color.darker,
  },
  '&:active': {
    color: e.color.darker,
  },
  '&:focus': {
    color: e.color.darker,
  },
  '& > *': {
    flex: 1,
  },
  '& > svg': {
    marginTop: 3,
    width: 16,
    height: 16,
    marginRight: 10,
    flex: 'unset',
  },
}))
const K0 = I.div({
  width: 280,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'hidden',
})
const $0 = I.div(({ theme: e }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: e.typography.size.s1,
  fontWeight: e.typography.weight.regular,
  color:
    e.base === 'light'
      ? Te(0.3, e.color.defaultText)
      : Te(0.6, e.color.defaultText),
  '& > * + *': {
    marginLeft: 4,
  },
  svg: {
    height: 10,
    width: 10,
  },
}))
const U0 = /* @__PURE__ */ a(({ url: e, versions: t }) => {
  const o = G(() => {
    const i = Object.entries(t).find(([r, n]) => n === e)
    return i && i[0] ? i[0] : 'current'
  }, [e, t])
  return /* @__PURE__ */ s.createElement(
    $0,
    null,
    /* @__PURE__ */ s.createElement('span', null, o),
    /* @__PURE__ */ s.createElement(Ot, null)
  )
}, 'CurrentVersion')
const zc = s.memo(
  oa(({ state: e, ...t }, o) => {
    const i = oe()
    const r = G(() => Object.values(t.index || {}), [t.index])
    const n = G(() => r.filter(u => u.type === 'component').length, [r])
    const l = G(
      () => r.filter(u => u.type === 'docs' || u.type === 'story').length,
      [r]
    )
    return /* @__PURE__ */ s.createElement(
      V0,
      { ref: o },
      /* @__PURE__ */ s.createElement(
        ve,
        {
          placement: 'bottom-start',
          trigger: 'click',
          closeOnOutsideClick: !0,
          tooltip: /* @__PURE__ */ s.createElement(
            K0,
            null,
            /* @__PURE__ */ s.createElement(
              pt,
              { row: 0 },
              e === 'loading' &&
                /* @__PURE__ */ s.createElement(Z0, { url: t.url }),
              (e === 'error' || e === 'empty') &&
                /* @__PURE__ */ s.createElement(X0, { url: t.url }),
              e ===
                '\
ready' &&
                /* @__PURE__ */ s.createElement(
                  s.Fragment,
                  null,
                  /* @__PURE__ */ s.createElement(G0, {
                    url: t.url,
                    componentCount: n,
                    leafCount: l,
                  }),
                  t.sourceUrl &&
                    /* @__PURE__ */ s.createElement(q0, { url: t.sourceUrl })
                ),
              e === 'auth' && /* @__PURE__ */ s.createElement(Y0, { ...t }),
              t.type === 'auto-inject' &&
                e !== 'error' &&
                /* @__PURE__ */ s.createElement(J0, null),
              e !== 'loading' && /* @__PURE__ */ s.createElement(Q0, null)
            )
          ),
        },
        /* @__PURE__ */ s.createElement(
          j0,
          {
            'data-action': 'toggle-indicator',
            'aria-label': 'toggle indicator',
          },
          /* @__PURE__ */ s.createElement(Zo, null)
        )
      ),
      t.versions && Object.keys(t.versions).length
        ? /* @__PURE__ */ s.createElement(
            ve,
            {
              placement: 'bottom-start',
              trigger: 'click',
              closeOnOutsideClick: !0,
              tooltip: u =>
                /* @__PURE__ */ s.createElement(ot, {
                  links: Object.entries(t.versions).map(([c, d]) => ({
                    icon:
                      d === t.url
                        ? /* @__PURE__ */ s.createElement(Be, null)
                        : void 0,
                    id: c,
                    title: c,
                    href: d,
                    onClick: /* @__PURE__ */ a((p, f) => {
                      ;(p.preventDefault(),
                        i.changeRefVersion(t.id, f.href),
                        u.onHide())
                    }, 'onClick'),
                  })),
                }),
            },
            /* @__PURE__ */ s.createElement(U0, {
              url: t.url,
              versions: t.versions,
            })
          )
        : null
    )
  })
)
var G0 = /* @__PURE__ */ a(({ url: e, componentCount: t, leafCount: o }) => {
  const i = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    { href: e.replace(/\/?$/, '/index.html'), target: '_blank' },
    /* @__PURE__ */ s.createElement(Zo, { color: i.color.secondary }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(
        Vt,
        null,
        'View external Story\
book'
      ),
      /* @__PURE__ */ s.createElement(
        'div',
        null,
        'Explore ',
        t,
        ' components and ',
        o,
        ' stories in a new browser tab.'
      )
    )
  )
}, 'ReadyMessage')
var q0 = /* @__PURE__ */ a(({ url: e }) => {
  const t = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    { href: e, target: '_blank' },
    /* @__PURE__ */ s.createElement(Vn, { color: t.color.secondary }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(Vt, null, 'View source code')
    )
  )
}, 'SourceCodeMessage')
var Y0 = /* @__PURE__ */ a(({ loginUrl: e, id: t }) => {
  const o = De()
  const i = A(r => {
    r.preventDefault()
    const n = W0.open(e, `storybook_auth_${t}`, 'resizable,scrollbars')
    const l = setInterval(() => {
      n
        ? n.closed && (clearInterval(l), z0.location.reload())
        : clearInterval(l)
    }, 1e3)
  }, [])
  return /* @__PURE__ */ s.createElement(
    jt,
    { onClick: i },
    /* @__PURE__ */ s.createElement(xo, { color: o.color.gold }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(Vt, null, 'Log in required'),
      /* @__PURE__ */ s.createElement(
        'div',
        null,
        "You\
 need to authenticate to view this Storybook's components."
      )
    )
  )
}, 'LoginRequiredMessage')
var Q0 = /* @__PURE__ */ a(() => {
  const e = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    {
      href: 'https://storybook.js.org/docs/sharing/storybook-composition',
      target: '_blank',
    },
    /* @__PURE__ */ s.createElement(Pt, { color: e.color.green }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(
        Vt,
        null,
        'Read \
Composition docs'
      ),
      /* @__PURE__ */ s.createElement(
        'div',
        null,
        'Learn how to combine multiple Storybooks into one.'
      )
    )
  )
}, 'ReadDocsMessage')
var X0 = /* @__PURE__ */ a(({ url: e }) => {
  const t = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    { href: e.replace(/\/?$/, '/index.html'), target: '_blank' },
    /* @__PURE__ */ s.createElement(go, { color: t.color.negative }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(Vt, null, 'Something went wrong'),
      /* @__PURE__ */ s.createElement(
        'div',
        null,
        "This external Storybook didn't load. Debug it in a new tab now."
      )
    )
  )
}, 'ErrorOccurredMessage')
var Z0 = /* @__PURE__ */ a(({ url: e }) => {
  const t = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    { href: e.replace(/\/?$/, '/index.html'), target: '_blank' },
    /* @__PURE__ */ s.createElement(Qn, { color: t.color.secondary }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(Vt, null, 'Please wait'),
      /* @__PURE__ */ s.createElement('div', null, 'This Storybook is loading.')
    )
  )
}, 'LoadingMessage')
var J0 = /* @__PURE__ */ a(() => {
  const e = De()
  return /* @__PURE__ */ s.createElement(
    jt,
    {
      href: 'https://storybook.js.org/docs/sharing/storybook-composition',
      target: '_blank',
    },
    /* @__PURE__ */ s.createElement(zn, { color: e.color.gold }),
    /* @__PURE__ */ s.createElement(
      'div',
      null,
      /* @__PURE__ */ s.createElement(
        Vt,
        null,
        'Reduce\
 lag'
      ),
      /* @__PURE__ */ s.createElement(
        'div',
        null,
        'Learn how to speed up Composition performance.'
      )
    )
  )
}, 'PerformanceDegradedMessage')

// src/manager/components/sidebar/IconSymbols.tsx
const ex = I.svg`
  position: absolute;
  width: 0;
  height: 0;
  display: inline-block;
  shape-rendering: inherit;
  vertical-align: middle;
`
const Wc = 'icon--group'
const Vc = 'icon--component'
const jc = 'icon--document'
const Kc = 'icon--story'
const $c = 'icon--success'
const Uc = 'icon--error'
const Gc =
  'ic\
on--warning'
const qc = 'icon--dot'
const Yc = /* @__PURE__ */ a(
  () =>
    /* @__PURE__ */ s.createElement(
      ex,
      { 'data-chromatic': 'ignore' },
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: Wc },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M6.586 3.504l-1.5-1.5H1v9h12v-7.5H6.586zm.414-1L5.793 1.297a1 1 0 00-.707-.293H.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v\
-8.5a.5.5 0 00-.5-.5H7z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: Vc },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M3.5 1.004a2.5 2.5 0 00-2.5 2.5v7a2.5 2.5 0 002.5 2.5h7a2.5 2.5 0 002.5-2.5v-7a2.5 2.5 0 00-2.5-2.5h-7zm8.5 5.5H7.5v-4.5h3a1.5 1.5 0\
 011.5 1.5v3zm0 1v3a1.5 1.5 0 01-1.5 1.5h-3v-4.5H12zm-5.5 4.5v-4.5H2v3a1.5 1.5 0 001.5 1.5h3zM2 6.504h4.5v-4.5h-3a1.5 1.5 0 00-1.5 1.5v3z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: jc },
        /* @__PURE__ */ s.createElement('path', {
          d: 'M4 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM4.5 7.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zM4 10.5a.5.5 0 01.5-.5h5a.5.5 0 010 \
1h-5a.5.5 0 01-.5-.5z',
          fill: 'currentColor',
        }),
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M1.5 0a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V3.207a.5.5 0 00-.146-.353L10.146.146A.5.5 0 009.793 0H1.5zM2 1h7.5v2a.5.5 0\
 00.5.5h2V13H2V1z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: Kc },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M3.5 0h7a.5.5 0 01.5.5v13a.5.5 0 01-.454.498.462.462 0 01-.371-.118L7 11.159l-3.175 2.72a.46.46 0 01-.379.118A.5.5 0 013 13.5V.5a.5.\
5 0 01.5-.5zM4 12.413l2.664-2.284a.454.454 0 01.377-.128.498.498 0 01.284.12L10 12.412V1H4v11.413z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: $c },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M10.854 4.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L5.5 8.793l4.646-4.647a.5.5 0 01.708 0z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: Uc },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M7 4a3 3 0 100 6 3 3 0 000-6zM3 7a4 4 0 118 0 4 4 0 01-8 0z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: Gc },
        /* @__PURE__ */ s.createElement('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M7.206 3.044a.498.498 0 01.23.212l3.492 5.985a.494.494 0 01.006.507.497.497 0 01-.443.252H3.51a.499.499 0 01-.437-.76l3.492-5.984a.4\
97.497 0 01.642-.212zM7 4.492L4.37 9h5.26L7 4.492z',
          fill: 'currentColor',
        })
      ),
      /* @__PURE__ */ s.createElement(
        'symbol',
        { id: qc },
        /* @__PURE__ */ s.createElement('circle', {
          cx: '3',
          cy: '3',
          r: '3',
          fill: 'curre\
ntColor',
        })
      )
    ),
  'IconSymbols'
)
const Me = /* @__PURE__ */ a(
  ({ type: e }) =>
    e === 'group'
      ? /* @__PURE__ */ s.createElement('use', {
          xlinkHref: `\
#${Wc}`,
        })
      : e === 'component'
        ? /* @__PURE__ */ s.createElement('use', { xlinkHref: `#${Vc}` })
        : e === 'document'
          ? /* @__PURE__ */ s.createElement('use', { xlinkHref: `#${jc}` })
          : e === 'story'
            ? /* @__PURE__ */ s.createElement('use', { xlinkHref: `#${Kc}` })
            : e === 'success'
              ? /* @__PURE__ */ s.createElement('use', { xlinkHref: `#${$c}` })
              : e === 'error'
                ? /* @__PURE__ */ s.createElement('use', {
                    xlinkHref: `#${Uc}`,
                  })
                : e ===
                    'war\
ning'
                  ? /* @__PURE__ */ s.createElement('use', {
                      xlinkHref: `#${Gc}`,
                    })
                  : e === 'dot'
                    ? /* @__PURE__ */ s.createElement('use', {
                        xlinkHref: `\
#${qc}`,
                      })
                    : null,
  'UseSymbol'
)

// src/manager/utils/status.tsx
const tx = I(kn)({
  // specificity hack
  '&&&': {
    width: 6,
    height: 6,
  },
})
const ox = I(tx)(({ theme: { animation: e, color: t, base: o } }) => ({
  // specificity hack
  animation: `${e.glow} 1.5s ease-in-out infinite`,
  color: o === 'light' ? t.mediumdark : t.darker,
}))
const rx = [
  'status-value:unknown',
  'status-value:pending',
  'status-value:success',
  'status-value:warning',
  'status-value:error',
]
const Bo = {
  'status-value:unknown': [null, null],
  'status-value:pending': [
    /* @__PURE__ */ s.createElement(ox, { key: 'icon' }),
    'currentColor',
  ],
  'status-value:success': [
    /* @__PURE__ */ s.createElement(
      'svg',
      { key: 'icon', viewBox: '0 0 14 14', width: '14', height: '14' },
      /* @__PURE__ */ s.createElement(Me, { type: 'success' })
    ),
    'currentColor',
  ],
  'status-value:warning': [
    /* @__PURE__ */ s.createElement(
      'svg',
      { key: 'icon', viewBox: '0 0 14 14', width: '14', height: '14' },
      /* @__PURE__ */ s.createElement(Me, { type: 'warning' })
    ),
    '#A15C20',
  ],
  'status-value:error': [
    /* @__PURE__ */ s.createElement(
      'svg',
      { key: 'icon', viewBox: '0 0 14 14', width: '14', height: '14' },
      /* @__PURE__ */ s.createElement(Me, { type: 'error' })
    ),
    '#D43900',
  ],
}
const Ho = /* @__PURE__ */ a(
  e => rx.reduce((t, o) => (e.includes(o) ? o : t), 'status-value:unknown'),
  'getMostCriticalStatusValue'
)
function zr(e, t) {
  return Object.values(e).reduce((o, i) => {
    if (i.type === 'group' || i.type === 'component') {
      const r = at(e, i.id, !1)
        .map(l => e[l])
        .filter(l => l.type === 'story')
      const n = Ho(
        // @ts-expect-error (non strict)
        r.flatMap(l => Object.values(t[l.id] || {})).map(l => l.value)
      )
      n && (o[i.id] = n)
    }
    return o
  }, {})
}
a(zr, 'getGroupStatus')

// src/manager/components/sidebar/StatusButton.tsx
const Qc = /* @__PURE__ */ a(({ theme: e, status: t }) => {
  const o =
    e.base === 'light'
      ? Te(0.3, e.color.defaultText)
      : Te(0.6, e.color.defaultText)
  return {
    color: {
      'status-value:pending': o,
      'status-value:success': e.color.positive,
      'status-value:error': e.color.negative,
      'status-value:warning': e.color.warning,
      'status-value:unknown': o,
    }[t],
  }
}, 'withStatusColor')
const Xc = I.div(Qc, {
  margin: 3,
})
const zo = I(ee)(
  Qc,
  ({ theme: e, height: t, width: o }) => ({
    transition: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: o || 28,
    height: t || 28,
    '&:hover': {
      color: e.color.secondary,
      background:
        e.base === 'dark'
          ? Ir(0.3, e.color.secondary)
          : Po(0.4, e.color.secondary),
    },
    '[data-selected="true"] &': {
      background: e.color.secondary,
      boxShadow: `0 0 5px 5px ${e.color.secondary}`,
      '&:hover': {
        background: Po(0.1, e.color.secondary),
      },
    },
    '&:focus': {
      color: e.color.secondary,
      borderColor: e.color.secondary,
      '&:not(:focus-visible)': {
        borderColor: 'transparent',
      },
    },
  }),
  ({ theme: e, selectedItem: t }) =>
    t && {
      '&:hover': {
        boxShadow: `inset 0 0 0 2px ${e.color.secondary}`,
        background: 'rgba(255, 255, 255, 0.2)',
      },
    }
)

// src/manager/components/sidebar/ContextMenu.tsx
const nx = {
  onMouseEnter: /* @__PURE__ */ a(() => {}, 'onMouseEnter'),
  node: null,
}
const ix = I(ve)({
  position: 'absolute',
  right: 0,
  zIndex: 1,
})
const sx = I(zo)({
  background: 'var(--tree-node-background-hover)',
  boxShadow: '0 0 5px 5px var(--tree-node-background-hover)',
})
const Zc = /* @__PURE__ */ a((e, t, o) => {
  const [i, r] = K(0)
  const [n, l] = K(!1)
  const u = G(
    () => ({
      onMouseEnter: /* @__PURE__ */ a(() => {
        r(p => p + 1)
      }, 'onMouseEnter'),
      onOpen: /* @__PURE__ */ a(p => {
        ;(p.stopPropagation(), l(!0))
      }, 'onOpen'),
      onClose: /* @__PURE__ */ a(() => {
        l(!1)
      }, 'onClose'),
    }),
    []
  )
  const d =
    G(() => {
      const p = o.getElements(Ce.experimental_TEST_PROVIDER)
      return i ? Jc(p, e) : []
    }, [o, e, i]).length > 0 || t.length > 0
  return G(
    () =>
      globalThis.CONFIG_TYPE !== 'DEVELOPMENT'
        ? nx
        : {
            onMouseEnter: u.onMouseEnter,
            node: d
              ? /* @__PURE__ */ s.createElement(
                  ix,
                  {
                    'data-displayed': n ? 'on' : 'off',
                    closeOnOutsideClick: !0,
                    placement: 'bottom-end',
                    'data-testid': 'context-menu',
                    onVisibleChange: p => {
                      p ? l(!0) : u.onClose()
                    },
                    tooltip: /* @__PURE__ */ s.createElement(ax, {
                      context: e,
                      links: t,
                    }),
                  },
                  /* @__PURE__ */ s.createElement(
                    sx,
                    { type: 'button', status: 'status-value:pending' },
                    /* @__PURE__ */ s.createElement(An, null)
                  )
                )
              : null,
          },
    [e, u, n, d, t]
  )
}, 'useContextMenu')
var ax = /* @__PURE__ */ a(({ context: e, links: t, ...o }) => {
  const i = oe().getElements(Ce.experimental_TEST_PROVIDER)
  const r = Jc(i, e)
  const l = (Array.isArray(t[0]) ? t : [t]).concat([r])
  return /* @__PURE__ */ s.createElement(ot, { ...o, links: l })
}, 'LiveContextMenu')
function Jc(e, t) {
  return Object.entries(e)
    .map(([o, i]) => {
      if (!i) return null
      const r = i.sidebarContextMenu?.({ context: t })
      return r
        ? {
            id: o,
            content: r,
          }
        : null
    })
    .filter(Boolean)
}
a(Jc, 'generateTestProviderLinks')

// src/manager/components/sidebar/StatusContext.tsx
const Ui = Qt({})
const ep = /* @__PURE__ */ a(e => {
  const { data: t, allStatuses: o, groupStatus: i } = qo(Ui)
  const r = {
    counts: {
      'status-value:pending': 0,
      'status-value:success': 0,
      'status-value:error': 0,
      'status-value:warning': 0,
      'status-value:unknown': 0,
    },
    statusesByValue: {
      'status-value:pending': {},
      'status-value:success': {},
      'status-value:error': {},
      'status-value:warning': {},
      'status-value:unknown': {},
    },
  }
  if (
    t &&
    o &&
    i &&
    [
      'status-value:pending',
      'status-value:warning',
      'status-value:error',
    ].includes(i[e.id])
  )
    for (const n of at(t, e.id, !1))
      for (const l of Object.values(o[n] ?? {}))
        (r.counts[l.value]++,
          (r.statusesByValue[l.value][n] ??= []),
          r.statusesByValue[l.value][n].push(l))
  return r
}, 'useStatusSummary')

// src/manager/components/sidebar/components/CollapseIcon.tsx
const lx = I.div(({ theme: e, isExpanded: t }) => ({
  width: 8,
  height: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: Te(0.4, e.textMutedColor),
  transform: t ? 'rotateZ(90deg)' : 'none',
  transition: 'transform .1s ease-out',
}))
const Kt = /* @__PURE__ */ a(
  ({ isExpanded: e }) =>
    /* @__PURE__ */ s.createElement(
      lx,
      { isExpanded: e },
      /* @__PURE__ */ s.createElement(
        's\
vg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '8',
          height: '8',
          fill: 'none',
        },
        /* @__PURE__ */ s.createElement('path', {
          fill: '#73828C',
          fillRule: 'evenodd',
          d: 'M1.896 7.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 1 0-.708.708L5.043 4 1.896 7.146Z',
          clipRule: 'evenodd',
        })
      )
    ),
  'CollapseIcon'
)

// src/manager/components/sidebar/TreeNode.tsx
const wt = I.svg(({ theme: e, type: t }) => ({
  width: 14,
  height: 14,
  flex: '0 0 auto',
  color:
    t === 'group'
      ? e.base === 'dark'
        ? e.color.primary
        : e.color.ultraviolet
      : t === 'component'
        ? e.color.secondary
        : t ===
            'docume\
nt'
          ? e.base === 'dark'
            ? e.color.gold
            : '#ff8300'
          : t === 'story'
            ? e.color.seafoam
            : 'currentColor',
}))
const tp = I.button(({ theme: e, depth: t = 0, isExpandable: o = !1 }) => ({
  width: '100%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'start',
  textAlign: 'left',
  paddingLeft: `${(o ? 8 : 22) + t * 18}px`,
  color: 'inherit',
  fontSize: `${e.typography.size.s2}px`,
  background: 'transparent',
  minHeight: 28,
  borderRadius: 4,
  gap: 6,
  paddingTop: 5,
  paddingBottom: 4,
}))
const op = I.a(({ theme: e, depth: t = 0 }) => ({
  width: '100%',
  cursor: 'pointer',
  color: 'inherit',
  display: 'flex',
  gap: 6,
  flex: 1,
  alignItems: 'start',
  paddingLeft: `${22 + t * 18}px`,
  paddingTop: 5,
  paddingBottom: 4,
  fontSize: `${e.typography.size.s2}px`,
  textDecoration: 'none',
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}))
const rp = I.div(({ theme: e }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 16,
  marginBottom: 4,
  fontSize: `${e.typography.size.s1 - 1}px`,
  fontWeight: e.typography.weight.bold,
  lineHeight: '16px',
  minHeight: 28,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: e.textMutedColor,
}))
const Wr = I.div({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginTop: 2,
})
const np = s.memo(
  /* @__PURE__ */ a(function ({
    children: t,
    isExpanded: o = !1,
    isExpandable: i = !1,
    ...r
  }) {
    return /* @__PURE__ */ s.createElement(
      tp,
      { isExpandable: i, tabIndex: -1, ...r },
      /* @__PURE__ */ s.createElement(
        Wr,
        null,
        i && /* @__PURE__ */ s.createElement(Kt, { isExpanded: o }),
        /* @__PURE__ */ s.createElement(
          wt,
          { viewBox: '0 0 14 14', width: '14', height: '14', type: 'group' },
          /* @__PURE__ */ s.createElement(Me, { type: 'group' })
        )
      ),
      t
    )
  }, 'GroupNode')
)
const ip = s.memo(
  /* @__PURE__ */ a(function ({
    theme: t,
    children: o,
    isExpanded: i,
    isExpandable: r,
    isSelected: n,
    ...l
  }) {
    return /* @__PURE__ */ s.createElement(
      tp,
      { isExpandable: r, tabIndex: -1, ...l },
      /* @__PURE__ */ s.createElement(
        Wr,
        null,
        r && /* @__PURE__ */ s.createElement(Kt, { isExpanded: i }),
        /* @__PURE__ */ s.createElement(
          wt,
          {
            viewBox: '0 0 14 14',
            width: '12',
            height: '12',
            type: 'comp\
onent',
          },
          /* @__PURE__ */ s.createElement(Me, { type: 'component' })
        )
      ),
      o
    )
  }, 'ComponentNode')
)
const sp = s.memo(
  /* @__PURE__ */ a(function ({ theme: t, children: o, docsMode: i, ...r }) {
    return /* @__PURE__ */ s.createElement(
      op,
      { tabIndex: -1, ...r },
      /* @__PURE__ */ s.createElement(
        Wr,
        null,
        /* @__PURE__ */ s.createElement(
          wt,
          { viewBox: '0 0 14 14', width: '12', height: '12', type: 'document' },
          /* @__PURE__ */ s.createElement(Me, { type: 'document' })
        )
      ),
      o
    )
  }, 'DocumentNode')
)
const ap = s.memo(
  /* @__PURE__ */ a(function ({ theme: t, children: o, ...i }) {
    return /* @__PURE__ */ s.createElement(
      op,
      { tabIndex: -1, ...i },
      /* @__PURE__ */ s.createElement(
        Wr,
        null,
        /* @__PURE__ */ s.createElement(
          wt,
          { viewBox: '0 0 14 14', width: '12', height: '12', type: 'story' },
          /* @__PURE__ */ s.createElement(Me, { type: 'story' })
        )
      ),
      o
    )
  }, 'StoryNode')
)

// ../node_modules/es-toolkit/dist/function/debounce.mjs
function Vr(e, t, { signal: o, edges: i } = {}) {
  let r
  let n = null
  const l = i != null && i.includes('leading')
  const u = i == null || i.includes('trailing')
  const c = /* @__PURE__ */ a(() => {
    n !== null && (e.apply(r, n), (r = void 0), (n = null))
  }, 'invoke')
  const d = /* @__PURE__ */ a(() => {
    ;(u && c(), y())
  }, 'onTimerEnd')
  let p = null
  const f = /* @__PURE__ */ a(() => {
    ;(p != null && clearTimeout(p),
      (p = setTimeout(() => {
        ;((p = null), d())
      }, t)))
  }, 'schedule')
  const h = /* @__PURE__ */ a(() => {
    p !== null && (clearTimeout(p), (p = null))
  }, 'cancelTimer')
  const y = /* @__PURE__ */ a(() => {
    ;(h(), (r = void 0), (n = null))
  }, 'cancel')
  const m = /* @__PURE__ */ a(() => {
    ;(h(), c())
  }, 'flush')
  const b = /* @__PURE__ */ a(function (...x) {
    if (o?.aborted) return
    ;((r = this), (n = x))
    const E = p == null
    ;(f(), l && E && c())
  }, 'debounced')
  return (
    (b.schedule = f),
    (b.cancel = y),
    (b.flush = m),
    o?.addEventListener('abort', y, { once: !0 }),
    b
  )
}
a(Vr, 'debounce')

// ../node_modules/es-toolkit/dist/function/throttle.mjs
function Gi(e, t, { signal: o, edges: i = ['leading', 'trailing'] } = {}) {
  let r = null
  const n = Vr(e, t, { signal: o, edges: i })
  const l = /* @__PURE__ */ a(function (...u) {
    ;(r == null
      ? (r = Date.now())
      : Date.now() - r >= t && ((r = Date.now()), n.cancel()),
      n(...u))
  }, 'throttled')
  return ((l.cancel = n.cancel), (l.flush = n.flush), l)
}
a(Gi, 'throttle')

// ../node_modules/es-toolkit/dist/compat/function/debounce.mjs
function qi(e, t = 0, o = {}) {
  typeof o !== 'object' && (o = {})
  const { signal: i, leading: r = !1, trailing: n = !0, maxWait: l } = o
  const u = Array(2)
  ;(r && (u[0] = 'leading'), n && (u[1] = 'trailing'))
  let c
  let d = null
  const p = Vr(
    function (...y) {
      ;((c = e.apply(this, y)), (d = null))
    },
    t,
    { signal: i, edges: u }
  )
  const f = /* @__PURE__ */ a(function (...y) {
    if (l != null) {
      if (d === null) d = Date.now()
      else if (Date.now() - d >= l)
        return (
          (c = e.apply(this, y)),
          (d = Date.now()),
          p.cancel(),
          p.schedule(),
          c
        )
    }
    return (p.apply(this, y), c)
  }, 'debounced')
  const h = /* @__PURE__ */ a(() => (p.flush(), c), 'flush')
  return ((f.cancel = p.cancel), (f.flush = h), f)
}
a(qi, 'debounce')

// src/manager/keybinding.ts
const ux = {
  // event.code => event.key
  Space: ' ',
  Slash: '/',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  Escape: 'Escape',
  Enter: 'Enter',
}
const cx = { alt: !1, ctrl: !1, meta: !1, shift: !1 }
const Et = /* @__PURE__ */ a((e, t) => {
  const { alt: o, ctrl: i, meta: r, shift: n } = e === !1 ? cx : e
  return !(
    (typeof o === 'boolean' && o !== t.altKey) ||
    (typeof i === 'boolean' && i !== t.ctrlKey) ||
    (typeof r === 'boolean' && r !== t.metaKey) ||
    (typeof n === 'boolean' && n !== t.shiftKey)
  )
}, 'matchesModifiers')
const $e = /* @__PURE__ */ a(
  (e, t) => (t.code ? t.code === e : t.key === ux[e]),
  'matchesKeyCode'
)

// src/manager/components/sidebar/useExpanded.ts
const { document: Yi } = se
const px = /* @__PURE__ */ a(
  ({
    refId: e,
    data: t,
    initialExpanded: o,
    highlightedRef: i,
    rootIds: r,
  }) => {
    const n = i.current?.refId === e ? Fo(t, i.current?.itemId) : []
    return [...r, ...n].reduce(
      // @ts-expect-error (non strict)
      (l, u) => Object.assign(l, { [u]: u in o ? o[u] : !0 }),
      {}
    )
  },
  'initializeExpanded'
)
const dx = /* @__PURE__ */ a(() => {}, 'noop')
const lp = /* @__PURE__ */ a(
  ({
    containerRef: e,
    isBrowsing: t,
    refId: o,
    data: i,
    initialExpanded: r,
    rootIds: n,
    highlightedRef: l,
    setHighlightedItemId: u,
    selectedStoryId: c,
    onSelectStoryId: d,
  }) => {
    const p = oe()
    const [f, h] = Zt(
      (g, { ids: v, value: S }) =>
        v.reduce((w, k) => Object.assign(w, { [k]: S }), { ...g }),
      // @ts-expect-error (non strict)
      { refId: o, data: i, highlightedRef: l, rootIds: n, initialExpanded: r },
      px
    )
    const y = A(g => e.current?.querySelector(`[data-item-id="${g}"]`), [e])
    const m = A(
      g => {
        ;(u(g.getAttribute('data-item-id')), zt(g))
      },
      [u]
    )
    const b = A(
      ({ ids: g, value: v }) => {
        if ((h({ ids: g, value: v }), g.length === 1)) {
          const S = e.current?.querySelector(
            `[data-item-id="${g[0]}"][data-ref-id="${o}"]`
          )
          S && m(S)
        }
      },
      [e, m, o]
    )
    H(() => {
      h({ ids: Fo(i, c), value: !0 })
    }, [i, c])
    const x = A(() => {
      const g = Object.keys(i).filter(v => !n.includes(v))
      h({ ids: g, value: !1 })
    }, [i, n])
    const E = A(() => {
      h({ ids: Object.keys(i), value: !0 })
    }, [i])
    return (
      H(
        () =>
          p
            ? (p.on(ho, x),
              p.on(wn, E),
              () => {
                ;(p.off(ho, x), p.off(wn, E))
              })
            : dx,
        [p, x, E]
      ),
      H(() => {
        const g = Yi.getElementById('storybook-explorer-menu')
        const v = Gi(S => {
          const w = l.current?.refId === o && l.current?.itemId
          if (!t || !e.current || !w || S.repeat || !Et(!1, S)) return
          const k = $e('Enter', S)
          const _ = $e('Space', S)
          const C = $e('ArrowLeft', S)
          const T = $e('ArrowRight', S)
          if (!(k || _ || C || T)) return
          const O = y(w)
          if (!O || O.getAttribute('data-ref-id') !== o) return
          const P = S.target
          if (!Wt(g, P) && !Wt(P, g)) return
          if (P.hasAttribute('data-action')) {
            if (k || _) return
            P.blur()
          }
          const D = O.getAttribute('data-nodetype')
          ;(k || _) && ['component', 'story', 'document'].includes(D) && d(w)
          const M = O.getAttribute('aria-expanded')
          if (C) {
            if (M === 'true') {
              h({ ids: [w], value: !1 })
              return
            }
            const F = O.getAttribute('data-parent-id')
            const Z = F && y(F)
            if (Z && Z.getAttribute('data-highlightable') === 'true') {
              m(Z)
              return
            }
            h({ ids: at(i, w, !0), value: !1 })
            return
          }
          T &&
            (M === 'false'
              ? b({ ids: [w], value: !0 })
              : M === 'true' && b({ ids: at(i, w, !0), value: !0 }))
        }, 60)
        return (
          Yi.addEventListener('keydown', v),
          () => Yi.removeEventListener('keydown', v)
        )
      }, [e, t, o, i, l, u, d]),
      [f, b]
    )
  },
  'useExpanded'
)

// src/manager/components/sidebar/Tree.tsx
const fx = I.div(e => ({
  marginTop: e.hasOrphans ? 20 : 0,
  marginBottom: 20,
}))
const mx = I.button(({ theme: e }) => ({
  all: 'unset',
  display: 'flex',
  padding: '0px 8px',
  borderRadius: 4,
  transition: 'color 150ms, box-shadow 150ms',
  gap: 6,
  alignItems: 'center',
  cursor: 'pointer',
  height: 28,
  '&:hover, &:focus': {
    outline: 'none',
    background: 'var(--tree-node-background-hover)',
  },
}))
const up = I.div(({ theme: e }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  color: e.color.defaultText,
  background: 'transparent',
  minHeight: 28,
  borderRadius: 4,
  overflow: 'hidden',
  '--tree-node-background-hover': e.background.content,
  [Qe]: {
    '--tree-node-background-hover': e.background.app,
  },
  '&:hover, &:focus': {
    '--tree-node-background-hover':
      e.base === 'dark'
        ? Ir(0.35, e.color.secondary)
        : Po(0.45, e.color.secondary),
    background: 'var(--tree-node-background-hover)',
    outline: 'none',
  },
  '& [data-displayed="off"]': {
    visibility: 'hidden',
  },
  '&:hover [data-displayed="off"]': {
    visibility: 'visible',
  },
  '& [data-displayed="on"] + *': {
    visibility: 'hidden',
  },
  '&:hover [data-displayed="off"] + *': {
    visibility: 'hidden',
  },
  '&[data-selected="true"]': {
    color: e.color.lightest,
    background: e.color.secondary,
    fontWeight: e.typography.weight.bold,
    '&&:hover, &&:focus': {
      '--tree-node-background-hover': e.color.secondary,
      background: 'var(--tree-node-background-hover)',
    },
    svg: { color: e.color.lightest },
  },
  a: { color: 'currentColor' },
}))
const hx = I(he)(({ theme: e }) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    fontSize: '10px',
    overflow: 'hidden',
    width: 1,
    height: '20px',
    boxSizing: 'border-box',
    opacity: 0,
    padding: 0,
    '&:focus': {
      opacity: 1,
      padding: '5px 10px',
      background: 'white',
      color: e.color.secondary,
      width: 'auto',
    },
  },
}))
const gx = /* @__PURE__ */ a(e => {
  const t = De()
  return /* @__PURE__ */ s.createElement(Un, { ...e, color: t.color.positive })
}, 'SuccessStatusIcon')
const yx = /* @__PURE__ */ a(e => {
  const t = De()
  return /* @__PURE__ */ s.createElement($n, { ...e, color: t.color.negative })
}, 'ErrorStatusIcon')
const bx = /* @__PURE__ */ a(e => {
  const t = De()
  return /* @__PURE__ */ s.createElement(Gn, { ...e, color: t.color.warning })
}, 'WarnStatusIcon')
const vx = /* @__PURE__ */ a(e => {
  const t = De()
  return /* @__PURE__ */ s.createElement(ct, {
    ...e,
    size: 12,
    color: t.color.defaultText,
  })
}, 'PendingStatusIcon')
const Qi = {
  'status-value:success': /* @__PURE__ */ s.createElement(gx, null),
  'status-value:error': /* @__PURE__ */ s.createElement(yx, null),
  'status-value:warning': /* @__PURE__ */ s.createElement(bx, null),
  'status-value:pending': /* @__PURE__ */ s.createElement(vx, null),
  'status-value:unknown': null,
}
const cp = [
  'status-value:success',
  'status-value:error',
  'status-value:warning',
  'status-value:pending',
  'status-value:unknown',
]
const pp = s.memo(
  /* @__PURE__ */ a(function ({
    item: t,
    statuses: o,
    groupStatus: i,
    refId: r,
    docsMode: n,
    isOrphan: l,
    isDisplayed: u,
    isSelected: c,
    isFullyExpanded: d,
    setFullyExpanded: p,
    isExpanded: f,
    setExpanded: h,
    onSelectStoryId: y,
    api: m,
  }) {
    const { isDesktop: b, isMobile: x, setMobileMenuOpen: E } = ge()
    const { counts: g, statusesByValue: v } = ep(t)
    if (!u) return null
    const S = G(() => {
      if (t.type === 'story' || t.type === 'docs')
        return Object.entries(o)
          .filter(([, _]) => _.sidebarContextMenu !== !1)
          .sort((_, C) => cp.indexOf(_[1].value) - cp.indexOf(C[1].value))
          .map(([_, C]) => ({
            id: _,
            title: C.title,
            description: C.description,
            'aria-label': `Test status for ${C.title}: ${C.value}`,
            icon: Qi[C.value],
            onClick: /* @__PURE__ */ a(() => {
              ;(y(t.id), At.selectStatuses([C]))
            }, 'onClick'),
          }))
      if (t.type === 'component' || t.type === 'group') {
        const _ = []
        const C = g['status-value:error']
        const T = g['status-value:warning']
        return (
          C &&
            _.push({
              id: 'errors',
              icon: Qi['status-value:error'],
              title: `${C} ${C === 1 ? 'story' : 'stories'} with errors`,
              onClick: /* @__PURE__ */ a(() => {
                const [O] = Object.entries(v['status-value:error'])[0]
                y(O)
                const P = Object.values(v['status-value:error']).flat()
                At.selectStatuses(P)
              }, 'onClick'),
            }),
          T &&
            _.push({
              id: 'warnings',
              icon: Qi['status-value:warning'],
              title: `${T} ${T === 1 ? 'story' : 'stories'} with warnings`,
              onClick: /* @__PURE__ */ a(() => {
                const [O] = Object.entries(v['status-value:warning'])[0]
                y(O)
                const P = Object.values(v['status-value:warning']).flat()
                At.selectStatuses(P)
              }, 'onClick'),
            }),
          _
        )
      }
      return []
    }, [g, t.id, t.type, y, o, v])
    const w = Hr(t.id, r)
    const k =
      r === 'storybook_internal'
        ? Zc(t, S, m)
        : {
            node: null,
            onMouseEnter: /* @__PURE__ */ a(() => {}, 'onMouseEnter'),
          }
    if (t.type === 'story' || t.type === 'docs') {
      const _ = t.type === 'docs' ? sp : ap
      const C = Ho(Object.values(o || {}).map(P => P.value))
      const [T, O] = Bo[C]
      return /* @__PURE__ */ s.createElement(
        up,
        {
          key: w,
          className: 'sidebar-item',
          'data-selected': c,
          'data-ref-id': r,
          'data-item-id': t.id,
          'data-parent-id': t.parent,
          'data-nodetype': t.type === 'docs' ? 'document' : 'story',
          'data-highlightable': u,
          onMouseEnter: k.onMouseEnter,
        },
        /* @__PURE__ */ s.createElement(
          _,
          {
            style: c ? {} : { color: O },
            href: _c(t, r),
            id: w,
            depth: l ? t.depth : t.depth - 1,
            onClick: P => {
              ;(P.preventDefault(), y(t.id), x && E(!1))
            },
            ...(t.type === 'docs' && { docsMode: n }),
          },
          t.renderLabel?.(t, m) || t.name
        ),
        c &&
          /* @__PURE__ */ s.createElement(
            hx,
            { asChild: !0 },
            /* @__PURE__ */ s.createElement(
              'a',
              { href: '#storybook-preview-wrapper' },
              'Skip to canvas'
            )
          ),
        k.node,
        T
          ? /* @__PURE__ */ s.createElement(
              zo,
              {
                'aria-label': `Test status: ${C.replace('status-value:', '')}`,
                role: 'status',
                type: 'button',
                status: C,
                selectedItem: c,
              },
              T
            )
          : null
      )
    }
    if (t.type === 'root')
      return /* @__PURE__ */ s.createElement(
        rp,
        {
          key: w,
          id: w,
          className: 'sidebar-subheading',
          'data-ref-id': r,
          'data-item-id': t.id,
          'data-nodetype': 'root',
        },
        /* @__PURE__ */ s.createElement(
          mx,
          {
            type: 'button',
            'data-action': 'collapse-root',
            onClick: _ => {
              ;(_.preventDefault(), h({ ids: [t.id], value: !f }))
            },
            'aria-expanded': f,
          },
          /* @__PURE__ */ s.createElement(Kt, { isExpanded: f }),
          t.renderLabel?.(t, m) || t.name
        ),
        f &&
          /* @__PURE__ */ s.createElement(
            ee,
            {
              className: 'sidebar-subheading-action',
              'aria-label': d ? 'Expand' : 'Collapse',
              'data-action': 'expand-all',
              'data-expanded': d,
              onClick: _ => {
                ;(_.preventDefault(), p())
              },
            },
            d
              ? /* @__PURE__ */ s.createElement(On, null)
              : /* @__PURE__ */ s.createElement(Dn, null)
          )
      )
    if (t.type === 'component' || t.type === 'group') {
      const _ = i?.[t.id]
      const C = _ ? Bo[_][1] : null
      const T = t.type === 'component' ? ip : np
      return /* @__PURE__ */ s.createElement(
        up,
        {
          key: w,
          className: 'sidebar-item',
          'data-ref-id': r,
          'data-item-id': t.id,
          'data-parent-id': t.parent,
          'data-nodetype': t.type,
          'data-highlightable': u,
          onMouseEnter: k.onMouseEnter,
        },
        /* @__PURE__ */ s.createElement(
          T,
          {
            id: w,
            style: C ? { color: C } : {},
            'aria-controls': t.children && t.children.join(' '),
            'aria-expanded': f,
            depth: l ? t.depth : t.depth - 1,
            isComponent: t.type === 'component',
            isExpandable: t.children && t.children.length > 0,
            isExpanded: f,
            onClick: O => {
              ;(O.preventDefault(),
                h({ ids: [t.id], value: !f }),
                t.type === 'component' && !f && b && y(t.id))
            },
            onMouseEnter: () => {
              t.type === 'component' &&
                m.emit(kt, {
                  ids: [t.children[0]],
                  options: { target: r },
                })
            },
          },
          t.renderLabel?.(t, m) || t.name
        ),
        k.node,
        ['status-value:error', 'status-value:warning'].includes(_) &&
          /* @__PURE__ */ s.createElement(
            zo,
            { type: 'button', status: _ },
            /* @__PURE__ */ s.createElement(
              'svg',
              {
                key: 'icon',
                viewBox: '0 0 6 6',
                width: '6',
                height: '6',
                type: 'dot',
              },
              /* @__PURE__ */ s.createElement(Me, {
                type: '\
dot',
              })
            )
          )
      )
    }
    return null
  }, 'Node')
)
const xx = s.memo(
  /* @__PURE__ */ a(function ({
    setExpanded: t,
    isFullyExpanded: o,
    expandableDescendants: i,
    ...r
  }) {
    const n = A(() => t({ ids: i, value: !o }), [t, o, i])
    return /* @__PURE__ */ s.createElement(pp, {
      ...r,
      setExpanded: t,
      isFullyExpanded: o,
      setFullyExpanded: n,
    })
  }, 'Root')
)
const dp = s.memo(
  /* @__PURE__ */ a(function ({
    isBrowsing: t,
    isMain: o,
    refId: i,
    data: r,
    allStatuses: n,
    docsMode: l,
    highlightedRef: u,
    setHighlightedItemId: c,
    selectedStoryId: d,
    onSelectStoryId: p,
  }) {
    const f = U(null)
    const h = oe()
    const [y, m, b] = G(
      () =>
        Object.keys(r).reduce(
          (T, O) => {
            const P = r[O]
            return (
              P.type === 'root' ? T[0].push(O) : P.parent || T[1].push(O),
              P.type === 'root' && P.startCollapsed && (T[2][O] = !1),
              T
            )
          },
          [[], [], {}]
        ),
      [r]
    )
    const { expandableDescendants: x } = G(
      () =>
        [...m, ...y].reduce(
          (T, O) => (
            (T.expandableDescendants[O] = at(r, O, !1).filter(
              P => !['story', 'docs'].includes(r[P].type)
            )),
            T
          ),
          { orphansFirst: [], expandableDescendants: {} }
        ),
      [r, y, m]
    )
    const E = G(
      () =>
        Object.keys(r).filter(T => {
          const O = r[T]
          if (O.type !== 'component') return !1
          const { children: P = [], name: D } = O
          if (P.length !== 1) return !1
          const M = r[P[0]]
          return M.type === 'docs'
            ? !0
            : M.type === 'story'
              ? Dc(M.name, D)
              : !1
        }),
      [r]
    )
    const g = G(() => Object.keys(r).filter(T => !E.includes(T)), [E])
    const v = G(
      () =>
        E.reduce(
          (T, O) => {
            const { children: P, parent: D, name: M } = r[O]
            const [F] = P
            if (D) {
              const Z = [...r[D].children]
              ;((Z[Z.indexOf(O)] = F), (T[D] = { ...r[D], children: Z }))
            }
            return (
              (T[F] = {
                ...r[F],
                name: M,
                parent: D,
                depth: r[F].depth - 1,
              }),
              T
            )
          },
          { ...r }
        ),
      [r]
    )
    const S = G(
      () => g.reduce((T, O) => Object.assign(T, { [O]: Fo(v, O) }), {}),
      [g, v]
    )
    const [w, k] = lp({
      // @ts-expect-error (non strict)
      containerRef: f,
      isBrowsing: t,
      refId: i,
      data: v,
      initialExpanded: b,
      rootIds: y,
      highlightedRef: u,
      setHighlightedItemId: c,
      selectedStoryId: d,
      onSelectStoryId: p,
    })
    const _ = G(() => zr(v, n ?? {}), [v, n])
    const C = G(
      () =>
        g.map(T => {
          const O = v[T]
          const P = Hr(T, i)
          if (O.type === 'root') {
            const M = x[O.id]
            const F = M.every(Z => w[Z])
            return (
              // @ts-expect-error (TODO)
              /* @__PURE__ */ s.createElement(xx, {
                api: h,
                key: P,
                item: O,
                refId: i,
                collapsedData: v,
                isOrphan: !1,
                isDisplayed: !0,
                isSelected: d === T,
                isExpanded: !!w[T],
                setExpanded: k,
                isFullyExpanded: F,
                expandableDescendants: M,
                onSelectStoryId: p,
              })
            )
          }
          const D = !O.parent || S[T].every(M => w[M])
          return D === !1
            ? null
            : /* @__PURE__ */ s.createElement(pp, {
                api: h,
                collapsedData: v,
                key: P,
                item: O,
                statuses: n?.[T] ?? {},
                groupStatus: _,
                refId: i,
                docsMode: l,
                isOrphan: m.some(M => T === M || T.startsWith(`${M}-`)),
                isDisplayed: D,
                isSelected: d === T,
                isExpanded: !!w[T],
                setExpanded: k,
                onSelectStoryId: p,
              })
        }),
      [S, h, v, g, l, x, w, _, p, m, i, d, k, n]
    )
    return /* @__PURE__ */ s.createElement(
      Ui.Provider,
      { value: { data: r, allStatuses: n, groupStatus: _ } },
      /* @__PURE__ */ s.createElement(
        fx,
        { ref: f, hasOrphans: o && m.length > 0 },
        /* @__PURE__ */ s.createElement(Yc, null),
        C
      )
    )
  }, 'Tree')
)

// src/manager/components/sidebar/Refs.tsx
const Ix = I.div(({ isMain: e }) => ({
  position: 'relative',
  marginTop: e ? void 0 : 0,
}))
const Sx = I.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s2,
  // Similar to ListItem.tsx
  textDecoration: 'none',
  lineHeight: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'transparent',
  width: '100%',
  marginTop: 20,
  paddingTop: 16,
  paddingBottom: 12,
  borderTop: `1px solid ${e.appBorderColor}`,
  color:
    e.base === 'light' ? e.color.defaultText : Te(0.2, e.color.defaultText),
}))
const wx = I.div({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  overflow: 'hidden',
  marginLeft: 2,
})
const Ex = I.button(({ theme: e }) => ({
  all: 'unset',
  display: 'flex',
  padding: '0px 8px',
  gap: 6,
  alignItems: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  '&:focus': {
    borderColor: e.color.secondary,
    'span:first-of-type': {
      borderLeftColor: e.color.secondary,
    },
  },
}))
const fp = s.memo(
  /* @__PURE__ */ a(function (t) {
    const { docsOptions: o } = Ne()
    const i = oe()
    const {
      filteredIndex: r,
      id: n,
      title: l = n,
      isLoading: u,
      isBrowsing: c,
      selectedStoryId: d,
      highlightedRef: p,
      setHighlighted: f,
      loginUrl: h,
      type: y,
      expanded: m = !0,
      indexError: b,
      previewInitialized: x,
      allStatuses: E,
    } = t
    const g = G(() => (r ? Object.keys(r).length : 0), [r])
    const v = U(null)
    const S = n === lt
    const k =
      u ||
      (y === 'auto-inject' && !x) ||
      y ===
        'server-ch\
ecked' ||
      y === 'unknown'
    const O = Ac(k, !!h && g === 0, !!b, !k && g === 0)
    const [P, D] = K(m)
    H(() => {
      r && d && r[d] && D(!0)
    }, [D, r, d])
    const M = A(() => D(V => !V), [D])
    const F = A(V => f({ itemId: V, refId: n }), [f])
    const Z = A(
      // @ts-expect-error (non strict)
      V => i && i.selectStory(V, void 0, { ref: !S && n }),
      [i, S, n]
    )
    return /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      S ||
        /* @__PURE__ */ s.createElement(
          Sx,
          {
            'aria-label': `${P ? 'Hide' : 'Show'} ${l} stories`,
            'aria-expanded': P,
          },
          /* @__PURE__ */ s.createElement(
            Ex,
            { 'data-action': 'collapse-ref', onClick: M },
            /* @__PURE__ */ s.createElement(Kt, { isExpanded: P }),
            /* @__PURE__ */ s.createElement(wx, { title: l }, l)
          ),
          /* @__PURE__ */ s.createElement(zc, { ...t, state: O, ref: v })
        ),
      P &&
        /* @__PURE__ */ s.createElement(
          Ix,
          { 'data-title': l, isMain: S },
          O === 'auth' &&
            /* @__PURE__ */ s.createElement(Fc, { id: n, loginUrl: h }),
          O === 'error' && /* @__PURE__ */ s.createElement(Rc, { error: b }),
          O === 'loading' && /* @__PURE__ */ s.createElement(Hc, { isMain: S }),
          O === 'empty' && /* @__PURE__ */ s.createElement(Bc, { isMain: S }),
          O === 'ready' &&
            /* @__PURE__ */ s.createElement(dp, {
              allStatuses: E,
              isBrowsing: c,
              isMain: S,
              refId: n,
              data: r,
              docsMode: o.docsMode,
              selectedStoryId: d,
              onSelectStoryId: Z,
              highlightedRef: p,
              setHighlightedItemId: F,
            })
        )
    )
  }, 'Ref')
)

// src/manager/components/sidebar/useHighlighted.ts
const { document: jr, window: mp } = se
const hp = /* @__PURE__ */ a(
  e => (e ? { itemId: e.storyId, refId: e.refId } : null),
  'fromSelection'
)
var gp = /* @__PURE__ */ a((e, t = {}, o = 1) => {
  const { containerRef: i, center: r = !1, attempts: n = 3, delay: l = 500 } = t
  const u = (i ? i.current : jr)?.querySelector(e)
  u ? zt(u, r) : o <= n && setTimeout(gp, l, e, t, o + 1)
}, 'scrollToSelector')
const yp = /* @__PURE__ */ a(
  ({ containerRef: e, isLoading: t, isBrowsing: o, selected: i }) => {
    const r = hp(i)
    const n = U(r)
    const [l, u] = K(r)
    const c = oe()
    const d = A(
      f => {
        ;((n.current = f), u(f))
      },
      [n]
    )
    const p = A(
      (f, h = !1) => {
        const y = f.getAttribute('data-item-id')
        const m = f.getAttribute('data-ref-id')
        !y || !m || (d({ itemId: y, refId: m }), zt(f, h))
      },
      [d]
    )
    return (
      H(() => {
        const f = hp(i)
        ;(d(f),
          f &&
            gp(`[data-item-id="${f.itemId}"][data-ref-id="${f.refId}"]`, {
              containerRef: e,
              center: !0,
            }))
      }, [e, i, d]),
      H(() => {
        const f = jr.getElementById('storybook-explorer-menu')
        let h
        const y = /* @__PURE__ */ a(m => {
          if (t || !o || !e.current || !Et(!1, m)) return
          const b = $e('ArrowUp', m)
          const x = $e('ArrowDown', m)
          if (!(b || x)) return
          const E = mp.requestAnimationFrame(() => {
            ;(mp.cancelAnimationFrame(h), (h = E))
            const g = m.target
            if (!Wt(f, g) && !Wt(g, f)) return
            g.hasAttribute('data-action') && g.blur()
            const v = Array.from(
              e.current?.querySelectorAll('[data-highlightable=true]') || []
            )
            const S = v.findIndex(
              _ =>
                _.getAttribute('data-item-id') === n.current?.itemId &&
                _.getAttribute('data-ref-id') === n.current?.refId
            )
            const w = Pc(v, S, b ? -1 : 1)
            const k = b ? w === v.length - 1 : w === 0
            if (
              (p(v[w], k), v[w].getAttribute('data-nodetype') === 'component')
            ) {
              const { itemId: _, refId: C } = n.current
              const T = c.resolveStory(
                _,
                C === 'storybook_internal' ? void 0 : C
              )
              T.type === 'component' &&
                c.emit(kt, {
                  // @ts-expect-error (non strict)
                  ids: [T.children[0]],
                  options: { target: C },
                })
            }
          })
        }, 'navigateTree')
        return (
          jr.addEventListener('keydown', y),
          () => jr.removeEventListener('keydown', y)
        )
      }, [t, o, n, p]),
      [l, d, n]
    )
  },
  'useHighlighted'
)

// src/manager/components/sidebar/Explorer.tsx
const bp = s.memo(
  /* @__PURE__ */ a(function ({
    isLoading: t,
    isBrowsing: o,
    dataset: i,
    selected: r,
  }) {
    const n = U(null)
    const [l, u, c] = yp({
      containerRef: n,
      isLoading: t,
      isBrowsing: o,
      selected: r,
    })
    return /* @__PURE__ */ s.createElement(
      'div',
      {
        ref: n,
        id: 'storybook-explorer-tree',
        'data-highlighted-ref-id': l?.refId,
        'data-highlighted-item-id': l?.itemId,
      },
      l && /* @__PURE__ */ s.createElement(Ec, { ...l }),
      i.entries.map(([d, p]) =>
        /* @__PURE__ */ s.createElement(fp, {
          ...p,
          key: d,
          isLoading: t,
          isBrowsing: o,
          selectedStoryId: r?.refId === p.id ? r.storyId : null,
          highlightedRef: c,
          setHighlighted: u,
        })
      )
    )
  }, 'Explorer')
)

// src/manager/components/sidebar/Brand.tsx
const Tx = I(sr)(({ theme: e }) => ({
  width: 'auto',
  height: '22px !important',
  display: 'block',
  color: e.base === 'light' ? e.color.defaultText : e.color.lightest,
}))
const Cx = I.img({
  display: 'block',
  maxWidth: '150px !important',
  maxHeight: '100px',
})
const vp = I.a(({ theme: e }) => ({
  display: 'inline-block',
  height: '100%',
  margin: '-3px -4px',
  padding: '2px 3px',
  border: '1px solid transparent',
  borderRadius: 3,
  color: 'inherit',
  textDecoration: 'none',
  '&:focus': {
    outline: 0,
    borderColor: e.color.secondary,
  },
}))
const xp = Ca(({ theme: e }) => {
  const { title: t = 'Storybook', url: o = './', image: i, target: r } = e.brand
  const n = r || (o === './' ? '' : '_blank')
  if (i === null)
    return t === null
      ? null
      : o
        ? /* @__PURE__ */ s.createElement(vp, {
            href: o,
            target: n,
            dangerouslySetInnerHTML: { __html: t },
          })
        : /* @__PURE__ */ s.createElement('div', {
            dangerouslySetInnerHTML: { __html: t },
          })
  const l = i
    ? /* @__PURE__ */ s.createElement(Cx, { src: i, alt: t })
    : /* @__PURE__ */ s.createElement(Tx, { alt: t })
  return o
    ? /* @__PURE__ */ s.createElement(vp, { title: t, href: o, target: n }, l)
    : /* @__PURE__ */ s.createElement('div', null, l)
})

// src/manager/components/sidebar/Menu.tsx
const Xi = I(ee)(({ highlighted: e, theme: t, isMobile: o }) => ({
  position: 'relative',
  overflow: 'visible',
  marginTop: 0,
  zIndex: 1,
  ...(o && {
    width: 36,
    height: 36,
  }),
  ...(e && {
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: 6,
      right: 6,
      width: 5,
      height: 5,
      zIndex: 2,
      borderRadius: '50%',
      background: t.background.app,
      border: `1px solid ${t.background.app}`,
      boxShadow: `0 0 0 2px ${t.background.app}`,
    },
    '&:after': {
      background: t.color.positive,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: `0 0 0 2px ${t.background.app}`,
    },
    '&:hover:after, &:focus-visible:after': {
      boxShadow: `0 0 0 2px ${Te(0.88, t.color.secondary)}`,
    },
  }),
}))
const _x = I.div({
  display: 'flex',
  gap: 6,
})
const kx = /* @__PURE__ */ a(
  ({ menu: e, onClick: t }) =>
    /* @__PURE__ */ s.createElement(ot, { links: e, onClick: t }),
  'SidebarMenuList'
)
const Ip = /* @__PURE__ */ a(({ menu: e, isHighlighted: t, onClick: o }) => {
  const [i, r] = K(!1)
  const { isMobile: n, setMobileMenuOpen: l } = ge()
  return n
    ? /* @__PURE__ */ s.createElement(
        _x,
        null,
        /* @__PURE__ */ s.createElement(
          Xi,
          {
            title: 'About Storybook',
            'aria-label': 'About Storybook',
            highlighted: !!t,
            active: !1,
            onClick: o,
            isMobile: !0,
          },
          /* @__PURE__ */ s.createElement(Qo, null)
        ),
        /* @__PURE__ */ s.createElement(
          Xi,
          {
            title: 'Close menu',
            'aria-label': 'Close menu',
            highlighted: !1,
            active: !1,
            onClick: () => l(!1),
            isMobile: !0,
          },
          /* @__PURE__ */ s.createElement(je, null)
        )
      )
    : /* @__PURE__ */ s.createElement(
        ve,
        {
          placement: 'top',
          closeOnOutsideClick: !0,
          tooltip: ({ onHide: u }) =>
            /* @__PURE__ */ s.createElement(kx, { onClick: u, menu: e }),
          onVisibleChange: r,
        },
        /* @__PURE__ */ s.createElement(
          Xi,
          {
            title: 'Shortcuts',
            'aria-label': 'Shortcuts',
            highlighted: !!t,
            active: i,
            size: 'medium',
            isMobile: !1,
          },
          /* @__PURE__ */ s.createElement(Qo, null)
        )
      )
}, 'SidebarMenu')

// src/manager/components/sidebar/Heading.tsx
const Ox = I.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  fontWeight: e.typography.weight.bold,
  color: e.color.defaultText,
  marginRight: 20,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  minHeight: 22,
  '& > * > *': {
    maxWidth: '100%',
  },
  '& > *': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    flex: '1 1 auto',
  },
}))
const Px = I.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  minHeight: 42,
  paddingLeft: 8,
})
const Ax = I(he)(({ theme: e }) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    position: 'absolute',
    fontSize: e.typography.size.s1,
    zIndex: 3,
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    opacity: 0,
    transition: 'opacity 150ms ease-out',
    '&:focus': {
      width: '100%',
      height: 'inherit',
      padding: '10px 15px',
      margin: 0,
      clip: 'unset',
      overflow: 'unset',
      opacity: 1,
    },
  },
}))
const Sp = /* @__PURE__ */ a(
  ({
    menuHighlighted: e = !1,
    menu: t,
    skipLinkHref: o,
    isLoading: i,
    onMenuClick: r,
    ...n
  }) =>
    /* @__PURE__ */ s.createElement(
      Px,
      { ...n },
      o &&
        /* @__PURE__ */ s.createElement(
          Ax,
          { asChild: !0 },
          /* @__PURE__ */ s.createElement(
            'a',
            { href: o, tabIndex: 0 },
            'Skip to canvas'
          )
        ),
      /* @__PURE__ */ s.createElement(
        Ox,
        null,
        /* @__PURE__ */ s.createElement(xp, null)
      ),
      /* @__PURE__ */ s.createElement(Ip, {
        menu: t,
        isHighlighted: e,
        onClick: r,
      })
    ),
  'Heading'
)

// ../node_modules/downshift/dist/downshift.esm.js
const Y = Ve(si())
const Nx = Ve(Cp())

// ../node_modules/compute-scroll-into-view/dist/index.js
const _p = /* @__PURE__ */ a(
  e => typeof e === 'object' && e != null && e.nodeType === 1,
  't'
)
const kp = /* @__PURE__ */ a(
  (e, t) => (!t || e !== 'hidden') && e !== 'visible' && e !== 'clip',
  'e'
)
const en = /* @__PURE__ */ a((e, t) => {
  if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) {
    const o = getComputedStyle(e, null)
    return (
      kp(o.overflowY, t) ||
      kp(o.overflowX, t) ||
      (i => {
        const r = (n => {
          if (!n.ownerDocument || !n.ownerDocument.defaultView) return null
          try {
            return n.ownerDocument.defaultView.frameElement
          } catch {
            return null
          }
        })(i)
        return (
          !!r &&
          (r.clientHeight < i.scrollHeight || r.clientWidth < i.scrollWidth)
        )
      })(e)
    )
  }
  return !1
}, 'n')
const tn = /* @__PURE__ */ a(
  (e, t, o, i, r, n, l, u) =>
    (n < e && l > t) || (n > e && l < t)
      ? 0
      : (n <= e && u <= o) || (l >= t && u >= o)
        ? n - e - i
        : (l > t && u < o) || (n < e && u > o)
          ? l - t + r
          : 0,
  'o'
)
const Lx = /* @__PURE__ */ a(e => {
  const t = e.parentElement
  return t ?? (e.getRootNode().host || null)
}, 'l')
const Op = /* @__PURE__ */ a((e, t) => {
  let o, i, r, n
  if (typeof document > 'u') return []
  const {
    scrollMode: l,
    block: u,
    inline: c,
    boundary: d,
    skipOverflowHiddenElements: p,
  } = t
  const f = typeof d === 'function' ? d : V => V !== d
  if (!_p(e)) throw new TypeError('Invalid target')
  const h = document.scrollingElement || document.documentElement
  const y = []
  let m = e
  for (; _p(m) && f(m); ) {
    if (((m = Lx(m)), m === h)) {
      y.push(m)
      break
    }
    ;(m != null &&
      m === document.body &&
      en(m) &&
      !en(document.documentElement)) ||
      (m != null && en(m, p) && y.push(m))
  }
  const b =
    (i = (o = window.visualViewport) == null ? void 0 : o.width) != null
      ? i
      : innerWidth
  const x =
    (n = (r = window.visualViewport) == null ? void 0 : r.height) != null
      ? n
      : innerHeight
  const { scrollX: E, scrollY: g } = window
  const {
    height: v,
    width: S,
    top: w,
    right: k,
    bottom: _,
    left: C,
  } = e.getBoundingClientRect()
  const {
    top: T,
    right: O,
    bottom: P,
    left: D,
  } = (V => {
    const Q = window.getComputedStyle(V)
    return {
      top: parseFloat(Q.scrollMarginTop) || 0,
      right: parseFloat(Q.scrollMarginRight) || 0,
      bottom: parseFloat(Q.scrollMarginBottom) || 0,
      left: parseFloat(Q.scrollMarginLeft) || 0,
    }
  })(e)
  let M =
    u === 'start' || u === 'nearest'
      ? w - T
      : u === 'end'
        ? _ + P
        : w + v / 2 - T + P
  let F = c === 'center' ? C + S / 2 - D + O : c === 'end' ? k + O : C - D
  const Z = []
  for (let V = 0; V < y.length; V++) {
    const Q = y[V]
    const {
      height: z,
      width: q,
      top: W,
      right: re,
      bottom: R,
      left: B,
    } = Q.getBoundingClientRect()
    if (
      l === 'if-needed' &&
      w >= 0 &&
      C >= 0 &&
      _ <= x &&
      k <= b &&
      ((Q === h && !en(Q)) || (w >= W && _ <= R && C >= B && k <= re))
    )
      return Z
    const L = getComputedStyle(Q)
    const $ = parseInt(L.borderLeftWidth, 10)
    const J = parseInt(L.borderTopWidth, 10)
    const ie = parseInt(L.borderRightWidth, 10)
    const te = parseInt(L.borderBottomWidth, 10)
    let de = 0
    let ae = 0
    const ce = 'offsetWidth' in Q ? Q.offsetWidth - Q.clientWidth - $ - ie : 0
    const ue =
      'offs\
etHeight' in Q
        ? Q.offsetHeight - Q.clientHeight - J - te
        : 0
    const Ie =
      'offsetWidth' in Q ? (Q.offsetWidth === 0 ? 0 : q / Q.offsetWidth) : 0
    const ye =
      '\
offsetHeight' in Q
        ? Q.offsetHeight === 0
          ? 0
          : z / Q.offsetHeight
        : 0
    if (h === Q)
      ((de =
        u === 'start'
          ? M
          : u === 'end'
            ? M - x
            : u === 'nearest'
              ? tn(g, g + x, x, J, te, g + M, g + M + v, v)
              : M - x / 2),
        (ae =
          c === 'start'
            ? F
            : c === 'center'
              ? F - b / 2
              : c === 'end'
                ? F - b
                : tn(E, E + b, b, $, ie, E + F, E + F + S, S)),
        (de = Math.max(0, de + g)),
        (ae = Math.max(0, ae + E)))
    else {
      ;((de =
        u === 'start'
          ? M - W - J
          : u === 'end'
            ? M - R + te + ue
            : u === 'nearest'
              ? tn(W, R, z, J, te + ue, M, M + v, v)
              : M - (W + z / 2) + ue / 2),
        (ae =
          c === 'start'
            ? F - B - $
            : c === 'center'
              ? F - (B + q / 2) + ce / 2
              : c === 'end'
                ? F - re + ie + ce
                : tn(B, re, q, $, ie + ce, F, F + S, S)))
      const { scrollLeft: Oe, scrollTop: fe } = Q
      ;((de =
        ye === 0
          ? 0
          : Math.max(0, Math.min(fe + de / ye, Q.scrollHeight - z / ye + ue))),
        (ae =
          Ie === 0
            ? 0
            : Math.max(0, Math.min(Oe + ae / Ie, Q.scrollWidth - q / Ie + ce))),
        (M += fe - de),
        (F += Oe - ae))
    }
    Z.push({ el: Q, top: de, left: ae })
  }
  return Z
}, 'r')

// ../node_modules/tslib/tslib.es6.mjs
var $t = /* @__PURE__ */ a(function () {
  return (
    ($t =
      Object.assign ||
      /* @__PURE__ */ a(function (t) {
        for (var o, i = 1, r = arguments.length; i < r; i++) {
          o = arguments[i]
          for (const n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
        }
        return t
      }, '__assign')),
    $t.apply(this, arguments)
  )
}, '__assign')

// ../node_modules/downshift/dist/downshift.esm.js
let Fx = 0
function Pp(e) {
  return typeof e === 'function' ? e : Re
}
a(Pp, 'cbToCb')
function Re() {}
a(Re, 'noop')
function Rp(e, t) {
  if (e) {
    const o = Op(e, {
      boundary: t,
      block: 'nearest',
      scrollMode: 'if-needed',
    })
    o.forEach(function (i) {
      const r = i.el
      const n = i.top
      const l = i.left
      ;((r.scrollTop = n), (r.scrollLeft = l))
    })
  }
}
a(Rp, 'scrollIntoView')
function Ap(e, t, o) {
  const i = e === t || (t instanceof o.Node && e.contains && e.contains(t))
  return i
}
a(Ap, 'isOrContainsNode')
function hn(e, t) {
  let o
  function i() {
    o && clearTimeout(o)
  }
  a(i, 'cancel')
  function r() {
    for (var n = arguments.length, l = new Array(n), u = 0; u < n; u++)
      l[u] = arguments[u]
    ;(i(),
      (o = setTimeout(function () {
        ;((o = null), e.apply(void 0, l))
      }, t)))
  }
  return (a(r, 'wrapper'), (r.cancel = i), r)
}
a(hn, 'debounce')
function le() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o]
  return function (i) {
    for (
      var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), l = 1;
      l < r;
      l++
    )
      n[l - 1] = arguments[l]
    return t.some(function (u) {
      return (
        u && u.apply(void 0, [i].concat(n)),
        i.preventDownshiftDefault ||
          (i.hasOwnProperty('nativeEvent') &&
            i.nativeEvent.preventDownshiftDefault)
      )
    })
  }
}
a(le, 'callAllEventHandlers')
function Ze() {
  for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
    t[o] = arguments[o]
  return function (i) {
    t.forEach(function (r) {
      typeof r === 'function' ? r(i) : r && (r.current = i)
    })
  }
}
a(Ze, 'handleRefs')
function Bp() {
  return String(Fx++)
}
a(Bp, 'generateId')
function Rx(e) {
  const t = e.isOpen
  const o = e.resultCount
  const i = e.previousResultCount
  return t
    ? o
      ? o !== i
        ? o +
          ' result' +
          (o === 1 ? ' is' : 's are') +
          ' available, use up and down arrow keys to navigate. Press Enter ke\
y to select.'
        : ''
      : 'No results are available.'
    : ''
}
a(Rx, 'getA11yStatusMessage')
function Dp(e, t) {
  return (
    (e = Array.isArray(e) ? /* istanbul ignore next (preact) */ e[0] : e),
    !e && t ? t : e
  )
}
a(Dp, 'unwrapArray')
function Bx(e) {
  return typeof e.type === 'string'
}
a(Bx, 'isDOMElement')
function Hx(e) {
  return e.props
}
a(Hx, 'getElementProps')
const zx = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type']
function on(e) {
  e === void 0 && (e = {})
  const t = {}
  return (
    zx.forEach(function (o) {
      e.hasOwnProperty(o) && (t[o] = e[o])
    }),
    t
  )
}
a(on, 'pickState')
function Vo(e, t) {
  return !e || !t
    ? e
    : Object.keys(e).reduce(function (o, i) {
        return ((o[i] = ln(t, i) ? t[i] : e[i]), o)
      }, {})
}
a(Vo, 'getState')
function ln(e, t) {
  return e[t] !== void 0
}
a(ln, 'isControlledProp')
function po(e) {
  const t = e.key
  const o = e.keyCode
  return o >= 37 && o <= 40 && t.indexOf('Arrow') !== 0 ? 'Arrow' + t : t
}
a(po, 'normalizeArrowKey')
function Je(e, t, o, i, r) {
  r === void 0 && (r = !1)
  const n = o.length
  if (n === 0) return -1
  const l = n - 1
  ;(typeof e !== 'number' || e < 0 || e > l) && (e = t > 0 ? -1 : l + 1)
  let u = e + t
  u < 0 ? (u = r ? l : 0) : u > l && (u = r ? 0 : l)
  const c = Tt(u, t < 0, o, i, r)
  return c === -1 ? (e >= n ? -1 : e) : c
}
a(Je, 'getHighlightedIndex')
function Tt(e, t, o, i, r) {
  r === void 0 && (r = !1)
  const n = o.length
  if (t) {
    for (let l = e; l >= 0; l--) if (!i(o[l], l)) return l
  } else for (let u = e; u < n; u++) if (!i(o[u], u)) return u
  return r ? Tt(t ? n - 1 : 0, t, o, i) : -1
}
a(Tt, 'getNonDisabledIndex')
function un(e, t, o, i) {
  return (
    i === void 0 && (i = !0),
    o &&
      t.some(function (r) {
        return r && (Ap(r, e, o) || (i && Ap(r, o.document.activeElement, o)))
      })
  )
}
a(un, 'targetWithinDownshift')
const Wx = hn(function (e) {
  Hp(e).textContent = ''
}, 500)
function Hp(e) {
  let t = e.getElementById('a11y-status-message')
  return (
    t ||
    ((t = e.createElement('div')),
    t.setAttribute('id', 'a11y-status-message'),
    t.setAttribute('role', 'status'),
    t.setAttribute(
      'ar\
ia-live',
      'polite'
    ),
    t.setAttribute('aria-relevant', 'additions text'),
    Object.assign(t.style, {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
    }),
    e.body.appendChild(t),
    t)
  )
}
a(Hp, 'getStatusDiv')
function zp(e, t) {
  if (!(!e || !t)) {
    const o = Hp(t)
    ;((o.textContent = e), Wx(t))
  }
}
a(zp, 'setStatus')
function Vx(e) {
  const t = e?.getElementById('a11y-status-message')
  t && t.remove()
}
a(Vx, 'cleanupStatusDiv')
const Wp = 0
const Vp = 1
const jp = 2
const rn = 3
const nn = 4
const Kp = 5
const $p = 6
const Up = 7
const Gp = 8
const qp = 9
const Yp = 10
const Qp = 11
const Xp = 12
const Zp = 13
const Jp = 14
const ed = 15
const td = 16
const jx = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blurButton: Jp,
  blurInput: Yp,
  changeInput: Qp,
  clickButton: Zp,
  clickItem: qp,
  controlledPropUpdatedSelectedItem: ed,
  itemMouseEnter: jp,
  keyDownArrowDown: nn,
  keyDownArrowUp: rn,
  keyDownEnd: Gp,
  keyDownEnter: $p,
  keyDownEscape: Kp,
  keyDownHome: Up,
  keyDownSpaceButton: Xp,
  mouseUp: Vp,
  touchEnd: td,
  unknown: Wp,
})
const Kx = ['refKey', 'ref']
const $x = ['onClick', 'onPress', 'onKeyDown', 'onKeyUp', 'onBlur']
const Ux = ['onKeyDown', 'onBlur', 'onChange', 'onInput', 'onChangeText']
const Gx = ['refKey', 'ref']
const qx = ['onMouseMove', 'onMouseDown', 'onClick', 'onPress', 'index', 'item']
const qt = /* @__PURE__ */ (function () {
  const e = /* @__PURE__ */ (function (t) {
    function o(r) {
      let n
      ;((n = t.call(this, r) || this),
        (n.id = n.props.id || 'downshift-' + Bp()),
        (n.menuId = n.props.menuId || n.id + '-menu'),
        (n.labelId = n.props.labelId || n.id + '-label'),
        (n.inputId = n.props.inputId || n.id + '-input'),
        (n.getItemId =
          n.props.getItemId ||
          function (g) {
            return n.id + '-item-' + g
          }),
        (n.items = []),
        (n.itemCount = null),
        (n.previousResultCount = 0),
        (n.timeoutIds = []),
        (n.internalSetTimeout = function (g, v) {
          var S = setTimeout(function () {
            ;((n.timeoutIds = n.timeoutIds.filter(function (w) {
              return w !== S
            })),
              g())
          }, v)
          n.timeoutIds.push(S)
        }),
        (n.setItemCount = function (g) {
          n.itemCount = g
        }),
        (n.unsetItemCount = function () {
          n.itemCount = null
        }),
        (n.isItemDisabled = function (g, v) {
          const S = n.getItemNodeFromIndex(v)
          return S && S.hasAttribute('disabled')
        }),
        (n.setHighlightedIndex = function (g, v) {
          ;(g === void 0 && (g = n.props.defaultHighlightedIndex),
            v === void 0 && (v = {}),
            (v = on(v)),
            n.internalSetState(
              j(
                {
                  highlightedIndex: g,
                },
                v
              )
            ))
        }),
        (n.clearSelection = function (g) {
          n.internalSetState(
            {
              selectedItem: null,
              inputValue: '',
              highlightedIndex: n.props.defaultHighlightedIndex,
              isOpen: n.props.defaultIsOpen,
            },
            g
          )
        }),
        (n.selectItem = function (g, v, S) {
          ;((v = on(v)),
            n.internalSetState(
              j(
                {
                  isOpen: n.props.defaultIsOpen,
                  highlightedIndex: n.props.defaultHighlightedIndex,
                  selectedItem: g,
                  inputValue: n.props.itemToString(g),
                },
                v
              ),
              S
            ))
        }),
        (n.selectItemAtIndex = function (g, v, S) {
          const w = n.items[g]
          w != null && n.selectItem(w, v, S)
        }),
        (n.selectHighlightedItem = function (g, v) {
          return n.selectItemAtIndex(n.getState().highlightedIndex, g, v)
        }),
        (n.internalSetState = function (g, v) {
          let S
          let w
          const k = {}
          const _ = typeof g === 'function'
          return (
            !_ &&
              g.hasOwnProperty('inputValue') &&
              n.props.onInputValueChange(
                g.inputValue,
                j({}, n.getStateAndHelpers(), g)
              ),
            n.setState(
              function (C) {
                let T
                C = n.getState(C)
                let O = _ ? g(C) : g
                ;((O = n.props.stateReducer(C, O)),
                  (S = O.hasOwnProperty('selectedItem')))
                const P = {}
                return (
                  S &&
                    O.selectedItem !== C.selectedItem &&
                    (w = O.selectedItem),
                  (T = O).type || (T.type = Wp),
                  Object.keys(O).forEach(function (D) {
                    ;(C[D] !== O[D] && (k[D] = O[D]),
                      D !== 'type' && (O[D], ln(n.props, D) || (P[D] = O[D])))
                  }),
                  _ &&
                    O.hasOwnProperty('inputValue') &&
                    n.props.onInputValueChange(
                      O.inputValue,
                      j({}, n.getStateAndHelpers(), O)
                    ),
                  P
                )
              },
              function () {
                Pp(v)()
                const C = Object.keys(k).length > 1
                ;(C && n.props.onStateChange(k, n.getStateAndHelpers()),
                  S && n.props.onSelect(g.selectedItem, n.getStateAndHelpers()),
                  w !== void 0 && n.props.onChange(w, n.getStateAndHelpers()),
                  n.props.onUserAction(k, n.getStateAndHelpers()))
              }
            )
          )
        }),
        (n.rootRef = function (g) {
          return (n._rootNode = g)
        }),
        (n.getRootProps = function (g, v) {
          let S
          const w = g === void 0 ? {} : g
          const k = w.refKey
          const _ = k === void 0 ? 'ref' : k
          const C = w.ref
          const T = ke(w, Kx)
          const O = v === void 0 ? {} : v
          const P = O.suppressRefError
          const D = P === void 0 ? !1 : P
          ;((n.getRootProps.called = !0),
            (n.getRootProps.refKey = _),
            (n.getRootProps.suppressRefError = D))
          const M = n.getState()
          const F = M.isOpen
          return j(
            ((S = {}),
            (S[_] = Ze(C, n.rootRef)),
            (S.role = 'combobox'),
            (S['aria-expanded'] = F),
            (S['aria-haspopup'] = 'listbox'),
            (S['aria-owns'] = F ? n.menuId : void 0),
            (S['aria-labelledby'] = n.labelId),
            S),
            T
          )
        }),
        (n.keyDownHandlers = {
          ArrowDown: /* @__PURE__ */ a(function (v) {
            const S = this
            if ((v.preventDefault(), this.getState().isOpen)) {
              const w = v.shiftKey ? 5 : 1
              this.moveHighlightedIndex(w, {
                type: nn,
              })
            } else
              this.internalSetState(
                {
                  isOpen: !0,
                  type: nn,
                },
                function () {
                  const k = S.getItemCount()
                  if (k > 0) {
                    const _ = S.getState()
                    const C = _.highlightedIndex
                    const T = Je(
                      C,
                      1,
                      {
                        length: k,
                      },
                      S.isItemDisabled,
                      !0
                    )
                    S.setHighlightedIndex(T, {
                      type: nn,
                    })
                  }
                }
              )
          }, 'ArrowDown'),
          ArrowUp: /* @__PURE__ */ a(function (v) {
            const S = this
            if ((v.preventDefault(), this.getState().isOpen)) {
              const w = v.shiftKey ? -5 : -1
              this.moveHighlightedIndex(w, {
                type: rn,
              })
            } else
              this.internalSetState(
                {
                  isOpen: !0,
                  type: rn,
                },
                function () {
                  const k = S.getItemCount()
                  if (k > 0) {
                    const _ = S.getState()
                    const C = _.highlightedIndex
                    const T = Je(
                      C,
                      -1,
                      {
                        length: k,
                      },
                      S.isItemDisabled,
                      !0
                    )
                    S.setHighlightedIndex(T, {
                      type: rn,
                    })
                  }
                }
              )
          }, 'ArrowUp'),
          Enter: /* @__PURE__ */ a(function (v) {
            if (v.which !== 229) {
              const S = this.getState()
              const w = S.isOpen
              const k = S.highlightedIndex
              if (w && k != null) {
                v.preventDefault()
                const _ = this.items[k]
                const C = this.getItemNodeFromIndex(k)
                if (_ == null || (C && C.hasAttribute('disabled'))) return
                this.selectHighlightedItem({
                  type: $p,
                })
              }
            }
          }, 'Enter'),
          Escape: /* @__PURE__ */ a(function (v) {
            ;(v.preventDefault(),
              this.reset(
                j(
                  {
                    type: Kp,
                  },
                  !this.state.isOpen && {
                    selectedItem: null,
                    inputValue: '',
                  }
                )
              ))
          }, 'Escape'),
        }),
        (n.buttonKeyDownHandlers = j({}, n.keyDownHandlers, {
          ' ': /* @__PURE__ */ a(function (v) {
            ;(v.preventDefault(),
              this.toggleMenu({
                type: Xp,
              }))
          }, '_'),
        })),
        (n.inputKeyDownHandlers = j({}, n.keyDownHandlers, {
          Home: /* @__PURE__ */ a(function (v) {
            const S = this.getState()
            const w = S.isOpen
            if (w) {
              v.preventDefault()
              const k = this.getItemCount()
              if (!(k <= 0 || !w)) {
                const _ = Tt(
                  0,
                  !1,
                  {
                    length: k,
                  },
                  this.isItemDisabled
                )
                this.setHighlightedIndex(_, {
                  type: Up,
                })
              }
            }
          }, 'Home'),
          End: /* @__PURE__ */ a(function (v) {
            const S = this.getState()
            const w = S.isOpen
            if (w) {
              v.preventDefault()
              const k = this.getItemCount()
              if (!(k <= 0 || !w)) {
                const _ = Tt(
                  k - 1,
                  !0,
                  {
                    length: k,
                  },
                  this.isItemDisabled
                )
                this.setHighlightedIndex(_, {
                  type: Gp,
                })
              }
            }
          }, 'End'),
        })),
        (n.getToggleButtonProps = function (g) {
          const v = g === void 0 ? {} : g
          const S = v.onClick
          v.onPress
          const w = v.onKeyDown
          const k = v.onKeyUp
          const _ = v.onBlur
          const C = ke(v, $x)
          const T = n.getState()
          const O = T.isOpen
          const P = {
            onClick: le(S, n.buttonHandleClick),
            onKeyDown: le(w, n.buttonHandleKeyDown),
            onKeyUp: le(k, n.buttonHandleKeyUp),
            onBlur: le(_, n.buttonHandleBlur),
          }
          const D = C.disabled ? {} : P
          return j(
            {
              type: 'button',
              role: 'button',
              'aria-label': O ? 'close menu' : 'open menu',
              'aria-haspopup': !0,
              'data-toggle': !0,
            },
            D,
            C
          )
        }),
        (n.buttonHandleKeyUp = function (g) {
          g.preventDefault()
        }),
        (n.buttonHandleKeyDown = function (g) {
          const v = po(g)
          n.buttonKeyDownHandlers[v] && n.buttonKeyDownHandlers[v].call(n, g)
        }),
        (n.buttonHandleClick = function (g) {
          if ((g.preventDefault(), n.props.environment)) {
            const v = n.props.environment.document
            const S = v.body
            const w = v.activeElement
            S && S === w && g.target.focus()
          }
          n.internalSetTimeout(function () {
            return n.toggleMenu({
              type: Zp,
            })
          })
        }),
        (n.buttonHandleBlur = function (g) {
          const v = g.target
          n.internalSetTimeout(function () {
            if (!(n.isMouseDown || !n.props.environment)) {
              const S = n.props.environment.document.activeElement
              ;(S == null || S.id !== n.inputId) &&
                S !== v &&
                n.reset({
                  type: Jp,
                })
            }
          })
        }),
        (n.getLabelProps = function (g) {
          return j(
            {
              htmlFor: n.inputId,
              id: n.labelId,
            },
            g
          )
        }),
        (n.getInputProps = function (g) {
          const v = g === void 0 ? {} : g
          const S = v.onKeyDown
          const w = v.onBlur
          const k = v.onChange
          const _ = v.onInput
          v.onChangeText
          const C = ke(v, Ux)
          let T
          let O = {}
          T = 'onChange'
          const P = n.getState()
          const D = P.inputValue
          const M = P.isOpen
          const F = P.highlightedIndex
          if (!C.disabled) {
            let Z
            O =
              ((Z = {}),
              (Z[T] = le(k, _, n.inputHandleChange)),
              (Z.onKeyDown = le(S, n.inputHandleKeyDown)),
              (Z.onBlur = le(w, n.inputHandleBlur)),
              Z)
          }
          return j(
            {
              'aria-autocomplete': 'list',
              'aria-activedescendant':
                M && typeof F === 'number' && F >= 0 ? n.getItemId(F) : void 0,
              'aria-controls': M ? n.menuId : void 0,
              'aria-labelledby': C && C['aria-label'] ? void 0 : n.labelId,
              // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
              // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
              autoComplete: 'off',
              value: D,
              id: n.inputId,
            },
            O,
            C
          )
        }),
        (n.inputHandleKeyDown = function (g) {
          const v = po(g)
          v && n.inputKeyDownHandlers[v] && n.inputKeyDownHandlers[v].call(n, g)
        }),
        (n.inputHandleChange = function (g) {
          n.internalSetState({
            type: Qp,
            isOpen: !0,
            inputValue: g.target.value,
            highlightedIndex: n.props.defaultHighlightedIndex,
          })
        }),
        (n.inputHandleBlur = function () {
          n.internalSetTimeout(function () {
            let g
            if (!(n.isMouseDown || !n.props.environment)) {
              const v = n.props.environment.document.activeElement
              const S =
                (v == null || (g = v.dataset) == null ? void 0 : g.toggle) &&
                n._rootNode &&
                n._rootNode.contains(v)
              S ||
                n.reset({
                  type: Yp,
                })
            }
          })
        }),
        (n.menuRef = function (g) {
          n._menuNode = g
        }),
        (n.getMenuProps = function (g, v) {
          let S
          const w = g === void 0 ? {} : g
          const k = w.refKey
          const _ = k === void 0 ? 'ref' : k
          const C = w.ref
          const T = ke(w, Gx)
          const O = v === void 0 ? {} : v
          const P = O.suppressRefError
          const D = P === void 0 ? !1 : P
          return (
            (n.getMenuProps.called = !0),
            (n.getMenuProps.refKey = _),
            (n.getMenuProps.suppressRefError = D),
            j(
              ((S = {}),
              (S[_] = Ze(C, n.menuRef)),
              (S.role = 'listbox'),
              (S['aria-labelledby'] =
                T && T['aria-label'] ? void 0 : n.labelId),
              (S.id = n.menuId),
              S),
              T
            )
          )
        }),
        (n.getItemProps = function (g) {
          let v
          const S = g === void 0 ? {} : g
          const w = S.onMouseMove
          const k = S.onMouseDown
          const _ = S.onClick
          S.onPress
          let C = S.index
          const T = S.item
          const O = T === void 0 ? /* istanbul ignore next */ void 0 : T
          const P = ke(S, qx)
          C === void 0
            ? (n.items.push(O), (C = n.items.indexOf(O)))
            : (n.items[C] = O)
          const D = 'onClick'
          const M = _
          const F =
            ((v = {
              // onMouseMove is used over onMouseEnter here. onMouseMove
              // is only triggered on actual mouse movement while onMouseEnter
              // can fire on DOM changes, interrupting keyboard navigation
              onMouseMove: le(w, function () {
                C !== n.getState().highlightedIndex &&
                  (n.setHighlightedIndex(C, {
                    type: jp,
                  }),
                  (n.avoidScrolling = !0),
                  n.internalSetTimeout(function () {
                    return (n.avoidScrolling = !1)
                  }, 250))
              }),
              onMouseDown: le(k, function (V) {
                V.preventDefault()
              }),
            }),
            (v[D] = le(M, function () {
              n.selectItemAtIndex(C, {
                type: qp,
              })
            })),
            v)
          const Z = P.disabled
            ? {
                onMouseDown: F.onMouseDown,
              }
            : F
          return j(
            {
              id: n.getItemId(C),
              role: 'option',
              'aria-selected': n.getState().highlightedIndex === C,
            },
            Z,
            P
          )
        }),
        (n.clearItems = function () {
          n.items = []
        }),
        (n.reset = function (g, v) {
          ;(g === void 0 && (g = {}),
            (g = on(g)),
            n.internalSetState(function (S) {
              const w = S.selectedItem
              return j(
                {
                  isOpen: n.props.defaultIsOpen,
                  highlightedIndex: n.props.defaultHighlightedIndex,
                  inputValue: n.props.itemToString(w),
                },
                g
              )
            }, v))
        }),
        (n.toggleMenu = function (g, v) {
          ;(g === void 0 && (g = {}),
            (g = on(g)),
            n.internalSetState(
              function (S) {
                const w = S.isOpen
                return j(
                  {
                    isOpen: !w,
                  },
                  w && {
                    highlightedIndex: n.props.defaultHighlightedIndex,
                  },
                  g
                )
              },
              function () {
                const S = n.getState()
                const w = S.isOpen
                const k = S.highlightedIndex
                ;(w &&
                  n.getItemCount() > 0 &&
                  typeof k === 'number' &&
                  n.setHighlightedIndex(k, g),
                  Pp(v)())
              }
            ))
        }),
        (n.openMenu = function (g) {
          n.internalSetState(
            {
              isOpen: !0,
            },
            g
          )
        }),
        (n.closeMenu = function (g) {
          n.internalSetState(
            {
              isOpen: !1,
            },
            g
          )
        }),
        (n.updateStatus = hn(function () {
          let g
          if (
            (g = n.props) != null &&
            (g = g.environment) != null &&
            g.document
          ) {
            const v = n.getState()
            const S = n.items[v.highlightedIndex]
            const w = n.getItemCount()
            const k = n.props.getA11yStatusMessage(
              j(
                {
                  itemToString: n.props.itemToString,
                  previousResultCount: n.previousResultCount,
                  resultCount: w,
                  highlightedItem: S,
                },
                v
              )
            )
            ;((n.previousResultCount = w), zp(k, n.props.environment.document))
          }
        }, 200)))
      const l = n.props
      const u = l.defaultHighlightedIndex
      const c = l.initialHighlightedIndex
      const d = c === void 0 ? u : c
      const p = l.defaultIsOpen
      const f = l.initialIsOpen
      const h = f === void 0 ? p : f
      const y = l.initialInputValue
      const m = y === void 0 ? '' : y
      const b = l.initialSelectedItem
      const x = b === void 0 ? null : b
      const E = n.getState({
        highlightedIndex: d,
        isOpen: h,
        inputValue: m,
        selectedItem: x,
      })
      return (
        E.selectedItem != null &&
          n.props.initialInputValue === void 0 &&
          (E.inputValue = n.props.itemToString(E.selectedItem)),
        (n.state = E),
        n
      )
    }
    ;(a(o, 'Downshift'), no(o, t))
    const i = o.prototype
    return (
      (i.internalClearTimeouts = /* @__PURE__ */ a(function () {
        ;(this.timeoutIds.forEach(function (n) {
          clearTimeout(n)
        }),
          (this.timeoutIds = []))
      }, 'internalClearTimeouts')),
      (i.getState = /* @__PURE__ */ a(function (n) {
        return (n === void 0 && (n = this.state), Vo(n, this.props))
      }, 'getState$1')),
      (i.getItemCount = /* @__PURE__ */ a(function () {
        let n = this.items.length
        return (
          this.itemCount != null
            ? (n = this.itemCount)
            : this.props.itemCount !== void 0 && (n = this.props.itemCount),
          n
        )
      }, 'getItemCount')),
      (i.getItemNodeFromIndex = /* @__PURE__ */ a(function (n) {
        return this.props.environment
          ? this.props.environment.document.getElementById(this.getItemId(n))
          : null
      }, 'getItemNodeFromIndex')),
      (i.scrollHighlightedItemIntoView = /* @__PURE__ */ a(function () {
        {
          const n = this.getItemNodeFromIndex(this.getState().highlightedIndex)
          this.props.scrollIntoView(n, this._menuNode)
        }
      }, 'scrollHighlightedItemIntoView')),
      (i.moveHighlightedIndex = /* @__PURE__ */ a(function (n, l) {
        const u = this.getItemCount()
        const c = this.getState()
        const d = c.highlightedIndex
        if (u > 0) {
          const p = Je(
            d,
            n,
            {
              length: u,
            },
            this.isItemDisabled,
            !0
          )
          this.setHighlightedIndex(p, l)
        }
      }, 'moveHighlightedIndex')),
      (i.getStateAndHelpers = /* @__PURE__ */ a(function () {
        const n = this.getState()
        const l = n.highlightedIndex
        const u = n.inputValue
        const c = n.selectedItem
        const d = n.isOpen
        const p = this.props.itemToString
        const f = this.id
        const h = this.getRootProps
        const y = this.getToggleButtonProps
        const m = this.getLabelProps
        const b = this.getMenuProps
        const x = this.getInputProps
        const E = this.getItemProps
        const g = this.openMenu
        const v = this.closeMenu
        const S = this.toggleMenu
        const w = this.selectItem
        const k = this.selectItemAtIndex
        const _ = this.selectHighlightedItem
        const C = this.setHighlightedIndex
        const T = this.clearSelection
        const O = this.clearItems
        const P = this.reset
        const D = this.setItemCount
        const M = this.unsetItemCount
        const F = this.internalSetState
        return {
          // prop getters
          getRootProps: h,
          getToggleButtonProps: y,
          getLabelProps: m,
          getMenuProps: b,
          getInputProps: x,
          getItemProps: E,
          // actions
          reset: P,
          openMenu: g,
          closeMenu: v,
          toggleMenu: S,
          selectItem: w,
          selectItemAtIndex: k,
          selectHighlightedItem: _,
          setHighlightedIndex: C,
          clearSelection: T,
          clearItems: O,
          setItemCount: D,
          unsetItemCount: M,
          setState: F,
          // props
          itemToString: p,
          // derived
          id: f,
          // state
          highlightedIndex: l,
          inputValue: u,
          isOpen: d,
          selectedItem: c,
        }
      }, 'getStateAndHelpers')),
      (i.componentDidMount = /* @__PURE__ */ a(function () {
        const n = this
        if (!this.props.environment)
          this.cleanup = function () {
            n.internalClearTimeouts()
          }
        else {
          const l = /* @__PURE__ */ a(function () {
            n.isMouseDown = !0
          }, 'onMouseDown')
          const u = /* @__PURE__ */ a(function (y) {
            n.isMouseDown = !1
            const m = un(
              y.target,
              [n._rootNode, n._menuNode],
              n.props.environment
            )
            !m &&
              n.getState().isOpen &&
              n.reset(
                {
                  type: Vp,
                },
                function () {
                  return n.props.onOuterClick(n.getStateAndHelpers())
                }
              )
          }, 'onMouseUp')
          const c = /* @__PURE__ */ a(function () {
            n.isTouchMove = !1
          }, 'onTouchStart')
          const d = /* @__PURE__ */ a(function () {
            n.isTouchMove = !0
          }, 'onTouchMove')
          const p = /* @__PURE__ */ a(function (y) {
            const m = un(
              y.target,
              [n._rootNode, n._menuNode],
              n.props.environment,
              !1
            )
            !n.isTouchMove &&
              !m &&
              n.getState().isOpen &&
              n.reset(
                {
                  type: td,
                },
                function () {
                  return n.props.onOuterClick(n.getStateAndHelpers())
                }
              )
          }, 'onTouchEnd')
          const f = this.props.environment
          ;(f.addEventListener('mousedown', l),
            f.addEventListener('mouseup', u),
            f.addEventListener('touchstart', c),
            f.addEventListener(
              'touch\
move',
              d
            ),
            f.addEventListener('touchend', p),
            (this.cleanup = function () {
              ;(n.internalClearTimeouts(),
                n.updateStatus.cancel(),
                f.removeEventListener('mousedown', l),
                f.removeEventListener('mouseup', u),
                f.removeEventListener('touchstart', c),
                f.removeEventListener('touchmove', d),
                f.removeEventListener('touchend', p))
            }))
        }
      }, 'componentDidMount')),
      (i.shouldScroll = /* @__PURE__ */ a(function (n, l) {
        const u =
          this.props.highlightedIndex === void 0 ? this.getState() : this.props
        const c = u.highlightedIndex
        const d = l.highlightedIndex === void 0 ? n : l
        const p = d.highlightedIndex
        const f = c && this.getState().isOpen && !n.isOpen
        const h = c !== p
        return f || h
      }, 'shouldScroll')),
      (i.componentDidUpdate = /* @__PURE__ */ a(function (n, l) {
        ;(ln(this.props, 'selectedItem') &&
          this.props.selectedItemChanged(
            n.selectedItem,
            this.props.selectedItem
          ) &&
          this.internalSetState({
            type: ed,
            inputValue: this.props.itemToString(this.props.selectedItem),
          }),
          !this.avoidScrolling &&
            this.shouldScroll(l, n) &&
            this.scrollHighlightedItemIntoView(),
          this.updateStatus())
      }, 'componentDidUpdate')),
      (i.componentWillUnmount = /* @__PURE__ */ a(function () {
        this.cleanup()
      }, 'componentWillUnmount')),
      (i.render = /* @__PURE__ */ a(function () {
        const n = Dp(this.props.children, Re)
        ;(this.clearItems(),
          (this.getRootProps.called = !1),
          (this.getRootProps.refKey = void 0),
          (this.getRootProps.suppressRefError = void 0),
          (this.getMenuProps.called = !1),
          (this.getMenuProps.refKey = void 0),
          (this.getMenuProps.suppressRefError = void 0),
          (this.getLabelProps.called = !1),
          (this.getInputProps.called = !1))
        const l = Dp(n(this.getStateAndHelpers()))
        if (!l) return null
        if (this.getRootProps.called || this.props.suppressRefError) return l
        if (Bx(l)) return /* @__PURE__ */ ta(l, this.getRootProps(Hx(l)))
      }, 'render')),
      o
    )
  })(Le)
  return (
    (e.defaultProps = {
      defaultHighlightedIndex: null,
      defaultIsOpen: !1,
      getA11yStatusMessage: Rx,
      itemToString: /* @__PURE__ */ a(function (o) {
        return o == null ? '' : String(o)
      }, 'itemToString'),
      onStateChange: Re,
      onInputValueChange: Re,
      onUserAction: Re,
      onChange: Re,
      onSelect: Re,
      onOuterClick: Re,
      selectedItemChanged: /* @__PURE__ */ a(function (o, i) {
        return o !== i
      }, 'selectedItemChanged'),
      environment:
        /* istanbul ignore next (ssr) */
        typeof window > 'u' ? void 0 : window,
      stateReducer: /* @__PURE__ */ a(function (o, i) {
        return i
      }, 'stateReducer'),
      suppressRefError: !1,
      scrollIntoView: Rp,
    }),
    (e.stateChangeTypes = jx),
    e
  )
})()
const od = {
  highlightedIndex: -1,
  isOpen: !1,
  selectedItem: null,
  inputValue: '',
}
function Yx(e, t, o) {
  const i = e.props
  const r = e.type
  const n = {}
  ;(Object.keys(t).forEach(function (l) {
    ;(Qx(l, e, t, o), o[l] !== t[l] && (n[l] = o[l]))
  }),
    i.onStateChange &&
      Object.keys(n).length &&
      i.onStateChange(
        j(
          {
            type: r,
          },
          n
        )
      ))
}
a(Yx, 'callOnChangeProps')
function Qx(e, t, o, i) {
  const r = t.props
  const n = t.type
  const l = 'on' + os(e) + 'Change'
  r[l] &&
    i[e] !== void 0 &&
    i[e] !== o[e] &&
    r[l](
      j(
        {
          type: n,
        },
        i
      )
    )
}
a(Qx, 'invokeOnChangeHandler')
function Xx(e, t) {
  return t.changes
}
a(Xx, 'stateReducer')
const Mp = hn(function (e, t) {
  zp(e, t)
}, 200)
const Zx =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u'
    ? Xt
    : H
const rd =
  'useId' in s
    ? /* @__PURE__ */ a(function (t) {
        let o = t.id
        const i = t.labelId
        const r = t.menuId
        const n = t.getItemId
        const l = t.toggleButtonId
        const u = t.inputId
        const c = 'downshift-' + s.useId()
        o || (o = c)
        const d = U({
          labelId: i || o + '-label',
          menuId: r || o + '-menu',
          getItemId:
            n ||
            function (p) {
              return o + '-item-' + p
            },
          toggleButtonId: l || o + '-toggle-button',
          inputId: u || o + '-input',
        })
        return d.current
      }, 'useElementIds')
    : /* @__PURE__ */ a(function (t) {
        const o = t.id
        const i = o === void 0 ? 'downshift-' + Bp() : o
        const r = t.labelId
        const n = t.menuId
        const l = t.getItemId
        const u = t.toggleButtonId
        const c = t.inputId
        const d = U({
          labelId: r || i + '-label',
          menuId: n || i + '-menu',
          getItemId:
            l ||
            function (p) {
              return i + '-item-' + p
            },
          toggleButtonId: u || i + '-toggle-button',
          inputId: c || i + '-input',
        })
        return d.current
      }, 'useElementIds')
function ts(e, t, o, i) {
  let r, n
  if (e === void 0) {
    if (t === void 0) throw new Error(i)
    ;((r = o[t]), (n = t))
  } else ((n = t === void 0 ? o.indexOf(e) : t), (r = e))
  return [r, n]
}
a(ts, 'getItemAndIndex')
function Jx(e) {
  return /^\S{1}$/.test(e)
}
a(Jx, 'isAcceptedCharacterKey')
function os(e) {
  return '' + e.slice(0, 1).toUpperCase() + e.slice(1)
}
a(os, 'capitalizeString')
function gn(e) {
  const t = U(e)
  return ((t.current = e), t)
}
a(gn, 'useLatestRef')
function nd(e, t, o, i) {
  const r = U()
  const n = U()
  const l = A(
    function (y, m) {
      ;((n.current = m), (y = Vo(y, m.props)))
      const b = e(y, m)
      const x = m.props.stateReducer(
        y,
        j({}, m, {
          changes: b,
        })
      )
      return x
    },
    [e]
  )
  const u = Zt(l, t, o)
  const c = u[0]
  const d = u[1]
  const p = gn(t)
  const f = A(
    function (y) {
      return d(
        j(
          {
            props: p.current,
          },
          y
        )
      )
    },
    [p]
  )
  const h = n.current
  return (
    H(
      function () {
        const y = Vo(r.current, h?.props)
        const m = h && r.current && !i(y, c)
        ;(m && Yx(h, y, c), (r.current = c))
      },
      [c, h, i]
    ),
    [c, f]
  )
}
a(nd, 'useEnhancedReducer')
function id(e, t, o, i) {
  const r = nd(e, t, o, i)
  const n = r[0]
  const l = r[1]
  return [Vo(n, t), l]
}
a(id, 'useControlledReducer$1')
const Wo = {
  itemToString: /* @__PURE__ */ a(function (t) {
    return t ? String(t) : ''
  }, 'itemToString'),
  itemToKey: /* @__PURE__ */ a(function (t) {
    return t
  }, 'itemToKey'),
  stateReducer: Xx,
  scrollIntoView: Rp,
  environment:
    /* istanbul ignore next (ssr) */
    typeof window > 'u' ? void 0 : window,
}
function ut(e, t, o) {
  o === void 0 && (o = od)
  const i = e['default' + os(t)]
  return i !== void 0 ? i : o[t]
}
a(ut, 'getDefaultValue$1')
function Ut(e, t, o) {
  o === void 0 && (o = od)
  const i = e[t]
  if (i !== void 0) return i
  const r = e['initial' + os(t)]
  return r !== void 0 ? r : ut(e, t, o)
}
a(Ut, 'getInitialValue$1')
function sd(e) {
  const t = Ut(e, 'selectedItem')
  const o = Ut(e, 'isOpen')
  const i = eI(e)
  const r = Ut(e, 'inputValue')
  return {
    highlightedIndex:
      i < 0 && t && o
        ? e.items.findIndex(function (n) {
            return e.itemToKey(n) === e.itemToKey(t)
          })
        : i,
    isOpen: o,
    selectedItem: t,
    inputValue: r,
  }
}
a(sd, 'getInitialState$2')
function Gt(e, t, o) {
  const i = e.items
  const r = e.initialHighlightedIndex
  const n = e.defaultHighlightedIndex
  const l = e.isItemDisabled
  const u = e.itemToKey
  const c = t.selectedItem
  const d = t.highlightedIndex
  return i.length === 0
    ? -1
    : r !== void 0 && d === r && !l(i[r], r)
      ? r
      : n !== void 0 && !l(i[n], n)
        ? n
        : c
          ? i.findIndex(function (p) {
              return u(c) === u(p)
            })
          : o < 0 && !l(i[i.length - 1], i.length - 1)
            ? i.length - 1
            : o > 0 && !l(i[0], 0)
              ? 0
              : -1
}
a(Gt, 'getHighlightedIndexOnOpen')
function ad(e, t, o) {
  const i = U({
    isMouseDown: !1,
    isTouchMove: !1,
    isTouchEnd: !1,
  })
  return (
    H(
      function () {
        if (!e) return Re
        const r = o.map(function (p) {
          return p.current
        })
        function n() {
          ;((i.current.isTouchEnd = !1), (i.current.isMouseDown = !0))
        }
        a(n, 'onMouseDown')
        function l(p) {
          ;((i.current.isMouseDown = !1), un(p.target, r, e) || t())
        }
        a(l, 'onMouseUp')
        function u() {
          ;((i.current.isTouchEnd = !1), (i.current.isTouchMove = !1))
        }
        a(u, 'onTouchStart')
        function c() {
          i.current.isTouchMove = !0
        }
        a(c, 'onTouchMove')
        function d(p) {
          ;((i.current.isTouchEnd = !0),
            !i.current.isTouchMove && !un(p.target, r, e, !1) && t())
        }
        return (
          a(d, 'onTouchEnd'),
          e.addEventListener('mousedown', n),
          e.addEventListener('mouseup', l),
          e.addEventListener('touchstart', u),
          e.addEventListener('touchmove', c),
          e.addEventListener('touchend', d),
          /* @__PURE__ */ a(function () {
            ;(e.removeEventListener('mousedown', n),
              e.removeEventListener('mouseup', l),
              e.removeEventListener('touchstart', u),
              e.removeEventListener('touchmove', c),
              e.removeEventListener('touchend', d))
          }, 'cleanup')
        )
      },
      [o, e, t]
    ),
    i.current
  )
}
a(ad, 'useMouseAndTouchTracker')
const rs = /* @__PURE__ */ a(function () {
  return Re
}, 'useGetterPropsCalledChecker')
function ns(e, t, o, i) {
  i === void 0 && (i = {})
  const r = i.document
  const n = yn()
  ;(H(function () {
    if (!(!e || n || !r)) {
      const l = e(t)
      Mp(l, r)
    }
  }, o),
    H(
      function () {
        return function () {
          ;(Mp.cancel(), Vx(r))
        }
      },
      [r]
    ))
}
a(ns, 'useA11yMessageStatus')
function ld(e) {
  const t = e.highlightedIndex
  const o = e.isOpen
  const i = e.itemRefs
  const r = e.getItemNodeFromIndex
  const n = e.menuElement
  const l = e.scrollIntoView
  const u = U(!0)
  return (
    Zx(
      function () {
        t < 0 ||
          !o ||
          !Object.keys(i.current).length ||
          (u.current === !1 ? (u.current = !0) : l(r(t), n))
      },
      [t]
    ),
    u
  )
}
a(ld, 'useScrollIntoView')
const is = Re
function cn(e, t, o) {
  let i
  o === void 0 && (o = !0)
  const r = ((i = e.items) == null ? void 0 : i.length) && t >= 0
  return j(
    {
      isOpen: !1,
      highlightedIndex: -1,
    },
    r &&
      j(
        {
          selectedItem: e.items[t],
          isOpen: ut(e, 'isOpen'),
          highlightedIndex: ut(e, 'highlightedIndex'),
        },
        o && {
          inputValue: e.itemToString(e.items[t]),
        }
      )
  )
}
a(cn, 'getChangesOnSelection')
function ud(e, t) {
  return (
    e.isOpen === t.isOpen &&
    e.inputValue === t.inputValue &&
    e.highlightedIndex === t.highlightedIndex &&
    e.selectedItem === t.selectedItem
  )
}
a(ud, 'isDropdownsStateEqual')
function yn() {
  const e = s.useRef(!0)
  return (
    s.useEffect(function () {
      return (
        (e.current = !1),
        function () {
          e.current = !0
        }
      )
    }, []),
    e.current
  )
}
a(yn, 'useIsInitialMount')
function pn(e) {
  const t = ut(e, 'highlightedIndex')
  return t > -1 && e.isItemDisabled(e.items[t], t) ? -1 : t
}
a(pn, 'getDefaultHighlightedIndex')
function eI(e) {
  const t = Ut(e, 'highlightedIndex')
  return t > -1 && e.isItemDisabled(e.items[t], t) ? -1 : t
}
a(eI, 'getInitialHighlightedIndex')
const sn = {
  environment: Y.default.shape({
    addEventListener: Y.default.func.isRequired,
    removeEventListener: Y.default.func.isRequired,
    document: Y.default.shape({
      createElement: Y.default.func.isRequired,
      getElementById: Y.default.func.isRequired,
      activeElement: Y.default.any.isRequired,
      body: Y.default.any.isRequired,
    }).isRequired,
    Node: Y.default.func.isRequired,
  }),
  itemToString: Y.default.func,
  itemToKey: Y.default.func,
  stateReducer: Y.default.func,
}
const cd = j({}, sn, {
  getA11yStatusMessage: Y.default.func,
  highlightedIndex: Y.default.number,
  defaultHighlightedIndex: Y.default.number,
  initialHighlightedIndex: Y.default.number,
  isOpen: Y.default.bool,
  defaultIsOpen: Y.default.bool,
  initialIsOpen: Y.default.bool,
  selectedItem: Y.default.any,
  initialSelectedItem: Y.default.any,
  defaultSelectedItem: Y.default.any,
  id: Y.default.string,
  labelId: Y.default.string,
  menuId: Y.default.string,
  getItemId: Y.default.func,
  toggleButtonId: Y.default.string,
  onSelectedItemChange: Y.default.func,
  onHighlightedIndexChange: Y.default.func,
  onStateChange: Y.default.func,
  onIsOpenChange: Y.default.func,
  scrollIntoView: Y.default.func,
})
function pd(e, t, o) {
  const i = t.type
  const r = t.props
  let n
  switch (i) {
    case o.ItemMouseMove:
      n = {
        highlightedIndex: t.disabled ? -1 : t.index,
      }
      break
    case o.MenuMouseLeave:
      n = {
        highlightedIndex: -1,
      }
      break
    case o.ToggleButtonClick:
    case o.FunctionToggleMenu:
      n = {
        isOpen: !e.isOpen,
        highlightedIndex: e.isOpen ? -1 : Gt(r, e, 0),
      }
      break
    case o.FunctionOpenMenu:
      n = {
        isOpen: !0,
        highlightedIndex: Gt(r, e, 0),
      }
      break
    case o.FunctionCloseMenu:
      n = {
        isOpen: !1,
      }
      break
    case o.FunctionSetHighlightedIndex:
      n = {
        highlightedIndex: r.isItemDisabled(
          r.items[t.highlightedIndex],
          t.highlightedIndex
        )
          ? -1
          : t.highlightedIndex,
      }
      break
    case o.FunctionSetInputValue:
      n = {
        inputValue: t.inputValue,
      }
      break
    case o.FunctionReset:
      n = {
        highlightedIndex: pn(r),
        isOpen: ut(r, 'isOpen'),
        selectedItem: ut(r, 'selectedItem'),
        inputValue: ut(r, 'inputValue'),
      }
      break
    default:
      throw new Error('Reducer called without proper action type.')
  }
  return j({}, e, n)
}
a(pd, 'downshiftCommonReducer')
function tI(e) {
  for (
    var t = e.keysSoFar,
      o = e.highlightedIndex,
      i = e.items,
      r = e.itemToString,
      n = e.isItemDisabled,
      l = t.toLowerCase(),
      u = 0;
    u < i.length;
    u++
  ) {
    const c = (u + o + (t.length < 2 ? 1 : 0)) % i.length
    const d = i[c]
    if (d !== void 0 && r(d).toLowerCase().startsWith(l) && !n(d, c)) return c
  }
  return o
}
a(tI, 'getItemIndexByCharacterKey')
const VR = $t($t({}, cd), {
  items: Y.default.array.isRequired,
  isItemDisabled: Y.default.func,
})
const oI = $t($t({}, Wo), {
  isItemDisabled: /* @__PURE__ */ a(function () {
    return !1
  }, 'isItemDisabled'),
})
const rI = Re
const an = 0
const ss = 1
const as = 2
const dn = 3
const ls = 4
const us = 5
const cs = 6
const ps = 7
const ds = 8
const fs = 9
const ms = 10
const fn = 11
const dd = 12
const fd = 13
const hs = 14
const md = 15
const hd = 16
const gd = 17
const yd = 18
const gs = 19
const es = 20
const bd = 21
const vd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  FunctionCloseMenu: gd,
  FunctionOpenMenu: hd,
  FunctionReset: bd,
  FunctionSelectItem: gs,
  FunctionSetHighlightedIndex: yd,
  FunctionSetInputValue: es,
  FunctionToggleMenu: md,
  ItemClick: hs,
  ItemMouseMove: fd,
  MenuMouseLeave: dd,
  ToggleButtonBlur: fn,
  ToggleButtonClick: an,
  ToggleButtonKeyDownArrowDown: ss,
  ToggleButtonKeyDownArrowUp: as,
  ToggleButtonKeyDownCharacter: dn,
  ToggleButtonKeyDownEnd: cs,
  ToggleButtonKeyDownEnter: ps,
  ToggleButtonKeyDownEscape: ls,
  ToggleButtonKeyDownHome: us,
  ToggleButtonKeyDownPageDown: ms,
  ToggleButtonKeyDownPageUp: fs,
  ToggleButtonKeyDownSpaceButton: ds,
})
function nI(e, t) {
  let o
  const i = t.type
  const r = t.props
  const n = t.altKey
  let l
  switch (i) {
    case hs:
      l = {
        isOpen: ut(r, 'isOpen'),
        highlightedIndex: pn(r),
        selectedItem: r.items[t.index],
      }
      break
    case dn:
      {
        const u = t.key
        const c = '' + e.inputValue + u
        const d =
          !e.isOpen && e.selectedItem
            ? r.items.findIndex(function (y) {
                return r.itemToKey(y) === r.itemToKey(e.selectedItem)
              })
            : e.highlightedIndex
        const p = tI({
          keysSoFar: c,
          highlightedIndex: d,
          items: r.items,
          itemToString: r.itemToString,
          isItemDisabled: r.isItemDisabled,
        })
        l = {
          inputValue: c,
          highlightedIndex: p,
          isOpen: !0,
        }
      }
      break
    case ss:
      {
        const f = e.isOpen
          ? Je(e.highlightedIndex, 1, r.items, r.isItemDisabled)
          : n && e.selectedItem == null
            ? -1
            : Gt(r, e, 1)
        l = {
          highlightedIndex: f,
          isOpen: !0,
        }
      }
      break
    case as:
      if (e.isOpen && n) l = cn(r, e.highlightedIndex, !1)
      else {
        const h = e.isOpen
          ? Je(e.highlightedIndex, -1, r.items, r.isItemDisabled)
          : Gt(r, e, -1)
        l = {
          highlightedIndex: h,
          isOpen: !0,
        }
      }
      break
    // only triggered when menu is open.
    case ps:
    case ds:
      l = cn(r, e.highlightedIndex, !1)
      break
    case us:
      l = {
        highlightedIndex: Tt(0, !1, r.items, r.isItemDisabled),
        isOpen: !0,
      }
      break
    case cs:
      l = {
        highlightedIndex: Tt(r.items.length - 1, !0, r.items, r.isItemDisabled),
        isOpen: !0,
      }
      break
    case fs:
      l = {
        highlightedIndex: Je(
          e.highlightedIndex,
          -10,
          r.items,
          r.isItemDisabled
        ),
      }
      break
    case ms:
      l = {
        highlightedIndex: Je(e.highlightedIndex, 10, r.items, r.isItemDisabled),
      }
      break
    case ls:
      l = {
        isOpen: !1,
        highlightedIndex: -1,
      }
      break
    case fn:
      l = j(
        {
          isOpen: !1,
          highlightedIndex: -1,
        },
        e.highlightedIndex >= 0 &&
          ((o = r.items) == null ? void 0 : o.length) && {
            selectedItem: r.items[e.highlightedIndex],
          }
      )
      break
    case gs:
      l = {
        selectedItem: t.selectedItem,
      }
      break
    default:
      return pd(e, t, vd)
  }
  return j({}, e, l)
}
a(nI, 'downshiftSelectReducer')
const iI = ['onClick']
const sI = ['onMouseLeave', 'refKey', 'ref']
const aI = ['onBlur', 'onClick', 'onPress', 'onKeyDown', 'refKey', 'ref']
const lI = [
  'it\
em',
  'index',
  'onMouseMove',
  'onClick',
  'onMouseDown',
  'onPress',
  'refKey',
  'disabled',
  'ref',
]
xd.stateChangeTypes = vd
function xd(e) {
  ;(e === void 0 && (e = {}), rI(e, xd))
  const t = j({}, oI, e)
  const o = t.scrollIntoView
  const i = t.environment
  const r = t.getA11yStatusMessage
  const n = id(nI, t, sd, ud)
  const l = n[0]
  const u = n[1]
  const c = l.isOpen
  const d = l.highlightedIndex
  const p = l.selectedItem
  const f = l.inputValue
  const h = U(null)
  const y = U(null)
  const m = U({})
  const b = U(null)
  const x = rd(t)
  const E = gn({
    state: l,
    props: t,
  })
  const g = A(
    function (z) {
      return m.current[x.getItemId(z)]
    },
    [x]
  )
  ns(r, l, [c, d, p, f], i)
  const v = ld({
    menuElement: y.current,
    highlightedIndex: d,
    isOpen: c,
    itemRefs: m,
    scrollIntoView: o,
    getItemNodeFromIndex: g,
  })
  ;(H(function () {
    return (
      (b.current = hn(function (z) {
        z({
          type: es,
          inputValue: '',
        })
      }, 500)),
      function () {
        b.current.cancel()
      }
    )
  }, []),
    H(
      function () {
        f && b.current(u)
      },
      [u, f]
    ),
    is({
      props: t,
      state: l,
    }),
    H(function () {
      const z = Ut(t, 'isOpen')
      z && h.current && h.current.focus()
    }, []))
  const S = ad(
    i,
    A(
      /* @__PURE__ */ a(function () {
        E.current.state.isOpen &&
          u({
            type: fn,
          })
      }, 'handleBlur'),
      [u, E]
    ),
    G(
      function () {
        return [y, h]
      },
      [y.current, h.current]
    )
  )
  const w = rs('getMenuProps', 'getToggleButtonProps')
  H(
    function () {
      c || (m.current = {})
    },
    [c]
  )
  const k = G(
    function () {
      return {
        ArrowDown: /* @__PURE__ */ a(function (q) {
          ;(q.preventDefault(),
            u({
              type: ss,
              altKey: q.altKey,
            }))
        }, 'ArrowDown'),
        ArrowUp: /* @__PURE__ */ a(function (q) {
          ;(q.preventDefault(),
            u({
              type: as,
              altKey: q.altKey,
            }))
        }, 'ArrowUp'),
        Home: /* @__PURE__ */ a(function (q) {
          ;(q.preventDefault(),
            u({
              type: us,
            }))
        }, 'Home'),
        End: /* @__PURE__ */ a(function (q) {
          ;(q.preventDefault(),
            u({
              type: cs,
            }))
        }, 'End'),
        Escape: /* @__PURE__ */ a(function () {
          E.current.state.isOpen &&
            u({
              type: ls,
            })
        }, 'Escape'),
        Enter: /* @__PURE__ */ a(function (q) {
          ;(q.preventDefault(),
            u({
              type: E.current.state.isOpen ? ps : an,
            }))
        }, 'Enter'),
        PageUp: /* @__PURE__ */ a(function (q) {
          E.current.state.isOpen &&
            (q.preventDefault(),
            u({
              type: fs,
            }))
        }, 'PageUp'),
        PageDown: /* @__PURE__ */ a(function (q) {
          E.current.state.isOpen &&
            (q.preventDefault(),
            u({
              type: ms,
            }))
        }, 'PageDown'),
        ' ': /* @__PURE__ */ a(function (q) {
          q.preventDefault()
          const W = E.current.state
          if (!W.isOpen) {
            u({
              type: an,
            })
            return
          }
          W.inputValue
            ? u({
                type: dn,
                key: ' ',
              })
            : u({
                type: ds,
              })
        }, '_'),
      }
    },
    [u, E]
  )
  const _ = A(
    function () {
      u({
        type: md,
      })
    },
    [u]
  )
  const C = A(
    function () {
      u({
        type: gd,
      })
    },
    [u]
  )
  const T = A(
    function () {
      u({
        type: hd,
      })
    },
    [u]
  )
  const O = A(
    function (z) {
      u({
        type: yd,
        highlightedIndex: z,
      })
    },
    [u]
  )
  const P = A(
    function (z) {
      u({
        type: gs,
        selectedItem: z,
      })
    },
    [u]
  )
  const D = A(
    function () {
      u({
        type: bd,
      })
    },
    [u]
  )
  const M = A(
    function (z) {
      u({
        type: es,
        inputValue: z,
      })
    },
    [u]
  )
  const F = A(
    function (z) {
      const q = z === void 0 ? {} : z
      const W = q.onClick
      const re = ke(q, iI)
      const R = /* @__PURE__ */ a(function () {
        let L
        ;(L = h.current) == null || L.focus()
      }, 'labelHandleClick')
      return j(
        {
          id: x.labelId,
          htmlFor: x.toggleButtonId,
          onClick: le(W, R),
        },
        re
      )
    },
    [x]
  )
  const Z = A(
    function (z, q) {
      let W
      const re = z === void 0 ? {} : z
      const R = re.onMouseLeave
      const B = re.refKey
      const L = B === void 0 ? 'ref' : B
      const $ = re.ref
      const J = ke(re, sI)
      const ie = q === void 0 ? {} : q
      const te = ie.suppressRefError
      const de = te === void 0 ? !1 : te
      const ae = /* @__PURE__ */ a(function () {
        u({
          type: dd,
        })
      }, 'menuHandleMouseLeave')
      return (
        w('getMenuProps', de, L, y),
        j(
          ((W = {}),
          (W[L] = Ze($, function (ce) {
            y.current = ce
          })),
          (W.id = x.menuId),
          (W.role = 'listbox'),
          (W['aria-labelledby'] =
            J && J['aria-label'] ? void 0 : '' + x.labelId),
          (W.onMouseLeave = le(R, ae)),
          W),
          J
        )
      )
    },
    [u, w, x]
  )
  const V = A(
    function (z, q) {
      let W
      const re = z === void 0 ? {} : z
      const R = re.onBlur
      const B = re.onClick
      re.onPress
      const L = re.onKeyDown
      const $ = re.refKey
      const J = $ === void 0 ? 'ref' : $
      const ie = re.ref
      const te = ke(re, aI)
      const de = q === void 0 ? {} : q
      const ae = de.suppressRefError
      const ce = ae === void 0 ? !1 : ae
      const ue = E.current.state
      const Ie = /* @__PURE__ */ a(function () {
        u({
          type: an,
        })
      }, 'toggleButtonHandleClick')
      const ye = /* @__PURE__ */ a(function () {
        ue.isOpen &&
          !S.isMouseDown &&
          u({
            type: fn,
          })
      }, 'toggleButtonHandleBlur')
      const Oe = /* @__PURE__ */ a(function (_e) {
        const Ae = po(_e)
        Ae && k[Ae]
          ? k[Ae](_e)
          : Jx(Ae) &&
            u({
              type: dn,
              key: Ae,
            })
      }, 'toggleButtonHandleKeyDown')
      const fe = j(
        ((W = {}),
        (W[J] = Ze(ie, function (Se) {
          h.current = Se
        })),
        (W['aria-activedescendant'] =
          ue.isOpen && ue.highlightedIndex > -1
            ? x.getItemId(ue.highlightedIndex)
            : ''),
        (W['aria-controls'] = x.menuId),
        (W['aria-expanded'] = E.current.state.isOpen),
        (W['aria-haspopup'] = 'listbox'),
        (W['aria-labelledby'] =
          te && te['aria-label'] ? void 0 : '' + x.labelId),
        (W.id = x.toggleButtonId),
        (W.role = 'combobox'),
        (W.tabIndex = 0),
        (W.onBlur = le(R, ye)),
        W),
        te
      )
      return (
        te.disabled || ((fe.onClick = le(B, Ie)), (fe.onKeyDown = le(L, Oe))),
        w('getToggleButtonProps', ce, J, h),
        fe
      )
    },
    [u, x, E, S, w, k]
  )
  const Q = A(
    function (z) {
      let q
      const W = z === void 0 ? {} : z
      const re = W.item
      const R = W.index
      const B = W.onMouseMove
      const L = W.onClick
      const $ = W.onMouseDown
      W.onPress
      const J = W.refKey
      const ie = J === void 0 ? 'ref' : J
      const te = W.disabled
      const de = W.ref
      const ae = ke(W, lI)
      te !== void 0 &&
        console.warn(
          'Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled\
 prop from useSelect.'
        )
      const ce = E.current
      const ue = ce.state
      const Ie = ce.props
      const ye = ts(
        re,
        R,
        Ie.items,
        'Pass either item or index to getItemProps!'
      )
      const Oe = ye[0]
      const fe = ye[1]
      const Se = Ie.isItemDisabled(Oe, fe)
      const _e = /* @__PURE__ */ a(function () {
        S.isTouchEnd ||
          fe === ue.highlightedIndex ||
          ((v.current = !1),
          u({
            type: fd,
            index: fe,
            disabled: Se,
          }))
      }, 'itemHandleMouseMove')
      const Ae = /* @__PURE__ */ a(function () {
        u({
          type: hs,
          index: fe,
        })
      }, 'itemHandleClick')
      const et = /* @__PURE__ */ a(function (fo) {
        return fo.preventDefault()
      }, 'itemHandleMouseDown')
      const N = j(
        ((q = {}),
        (q[ie] = Ze(de, function (Ge) {
          Ge && (m.current[x.getItemId(fe)] = Ge)
        })),
        (q['aria-disabled'] = Se),
        (q['aria-selected'] = Oe === ue.selectedItem),
        (q.id = x.getItemId(fe)),
        (q.role = 'option'),
        q),
        ae
      )
      return (
        Se || (N.onClick = le(L, Ae)),
        (N.onMouseMove = le(B, _e)),
        (N.onMouseDown = le($, et)),
        N
      )
    },
    [E, x, S, v, u]
  )
  return {
    // prop getters.
    getToggleButtonProps: V,
    getLabelProps: F,
    getMenuProps: Z,
    getItemProps: Q,
    // actions.
    toggleMenu: _,
    openMenu: T,
    closeMenu: C,
    setHighlightedIndex: O,
    selectItem: P,
    reset: D,
    setInputValue: M,
    // state.
    highlightedIndex: d,
    isOpen: c,
    selectedItem: p,
    inputValue: f,
  }
}
a(xd, 'useSelect')
const ys = 0
const bs = 1
const vs = 2
const xs = 3
const Is = 4
const Ss = 5
const ws = 6
const Es = 7
const Ts = 8
const mn = 9
const Cs = 10
const Id = 11
const Sd = 12
const _s = 13
const wd = 14
const Ed = 15
const Td = 16
const Cd = 17
const _d = 18
const ks = 19
const kd = 20
const Od = 21
const Os = 22
const Pd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ControlledPropUpdatedSelectedItem: Os,
  FunctionCloseMenu: Cd,
  FunctionOpenMenu: Td,
  FunctionReset: Od,
  FunctionSelectItem: ks,
  FunctionSetHighlightedIndex: _d,
  FunctionSetInputValue: kd,
  FunctionToggleMenu: Ed,
  InputBlur: mn,
  InputChange: Ts,
  InputClick: Cs,
  InputKeyDownArrowDown: ys,
  InputKeyDownArrowUp: bs,
  InputKeyDownEnd: Is,
  InputKeyDownEnter: Es,
  InputKeyDownEscape: vs,
  InputKeyDownHome: xs,
  InputKeyDownPageDown: ws,
  InputKeyDownPageUp: Ss,
  ItemClick: _s,
  ItemMouseMove: Sd,
  MenuMouseLeave: Id,
  ToggleButtonClick: wd,
})
function uI(e) {
  const t = sd(e)
  const o = t.selectedItem
  let i = t.inputValue
  return (
    i === '' &&
      o &&
      e.defaultInputValue === void 0 &&
      e.initialInputValue === void 0 &&
      e.inputValue === void 0 &&
      (i = e.itemToString(o)),
    j({}, t, {
      inputValue: i,
    })
  )
}
a(uI, 'getInitialState$1')
const jR = j({}, cd, {
  items: Y.default.array.isRequired,
  isItemDisabled: Y.default.func,
  inputValue: Y.default.string,
  defaultInputValue: Y.default.string,
  initialInputValue: Y.default.string,
  inputId: Y.default.string,
  onInputValueChange: Y.default.func,
})
function cI(e, t, o, i) {
  const r = U()
  const n = nd(e, t, o, i)
  const l = n[0]
  const u = n[1]
  const c = yn()
  return (
    H(
      function () {
        if (ln(t, 'selectedItem')) {
          if (!c) {
            const d = t.itemToKey(t.selectedItem) !== t.itemToKey(r.current)
            d &&
              u({
                type: Os,
                inputValue: t.itemToString(t.selectedItem),
              })
          }
          r.current =
            l.selectedItem === r.current ? t.selectedItem : l.selectedItem
        }
      },
      [l.selectedItem, t.selectedItem]
    ),
    [Vo(l, t), u]
  )
}
a(cI, 'useControlledReducer')
const pI = Re
const dI = j({}, Wo, {
  isItemDisabled: /* @__PURE__ */ a(function () {
    return !1
  }, 'isItemDisabled'),
})
function fI(e, t) {
  let o
  const i = t.type
  const r = t.props
  const n = t.altKey
  let l
  switch (i) {
    case _s:
      l = {
        isOpen: ut(r, 'isOpen'),
        highlightedIndex: pn(r),
        selectedItem: r.items[t.index],
        inputValue: r.itemToString(r.items[t.index]),
      }
      break
    case ys:
      e.isOpen
        ? (l = {
            highlightedIndex: Je(
              e.highlightedIndex,
              1,
              r.items,
              r.isItemDisabled,
              !0
            ),
          })
        : (l = {
            highlightedIndex: n && e.selectedItem == null ? -1 : Gt(r, e, 1),
            isOpen: r.items.length >= 0,
          })
      break
    case bs:
      e.isOpen
        ? n
          ? (l = cn(r, e.highlightedIndex))
          : (l = {
              highlightedIndex: Je(
                e.highlightedIndex,
                -1,
                r.items,
                r.isItemDisabled,
                !0
              ),
            })
        : (l = {
            highlightedIndex: Gt(r, e, -1),
            isOpen: r.items.length >= 0,
          })
      break
    case Es:
      l = cn(r, e.highlightedIndex)
      break
    case vs:
      l = j(
        {
          isOpen: !1,
          highlightedIndex: -1,
        },
        !e.isOpen && {
          selectedItem: null,
          inputValue: '',
        }
      )
      break
    case Ss:
      l = {
        highlightedIndex: Je(
          e.highlightedIndex,
          -10,
          r.items,
          r.isItemDisabled,
          !0
        ),
      }
      break
    case ws:
      l = {
        highlightedIndex: Je(
          e.highlightedIndex,
          10,
          r.items,
          r.isItemDisabled,
          !0
        ),
      }
      break
    case xs:
      l = {
        highlightedIndex: Tt(0, !1, r.items, r.isItemDisabled),
      }
      break
    case Is:
      l = {
        highlightedIndex: Tt(r.items.length - 1, !0, r.items, r.isItemDisabled),
      }
      break
    case mn:
      l = j(
        {
          isOpen: !1,
          highlightedIndex: -1,
        },
        e.highlightedIndex >= 0 &&
          ((o = r.items) == null ? void 0 : o.length) &&
          t.selectItem && {
            selectedItem: r.items[e.highlightedIndex],
            inputValue: r.itemToString(r.items[e.highlightedIndex]),
          }
      )
      break
    case Ts:
      l = {
        isOpen: !0,
        highlightedIndex: pn(r),
        inputValue: t.inputValue,
      }
      break
    case Cs:
      l = {
        isOpen: !e.isOpen,
        highlightedIndex: e.isOpen ? -1 : Gt(r, e, 0),
      }
      break
    case ks:
      l = {
        selectedItem: t.selectedItem,
        inputValue: r.itemToString(t.selectedItem),
      }
      break
    case Os:
      l = {
        inputValue: t.inputValue,
      }
      break
    default:
      return pd(e, t, Pd)
  }
  return j({}, e, l)
}
a(fI, 'downshiftUseComboboxReducer')
const mI = ['onMouseLeave', 'refKey', 'ref']
const hI = [
  'item',
  'index',
  'refKey',
  'ref',
  'onMouseMove',
  'onMouseDown',
  'onClick',
  'onPress',
  'dis\
abled',
]
const gI = ['onClick', 'onPress', 'refKey', 'ref']
const yI = [
  'onKeyDown',
  'onChange',
  'onInput',
  'onBlur',
  'onChangeText',
  'onClick',
  'refKe\
y',
  'ref',
]
Ad.stateChangeTypes = Pd
function Ad(e) {
  ;(e === void 0 && (e = {}), pI(e, Ad))
  const t = j({}, dI, e)
  const o = t.items
  const i = t.scrollIntoView
  const r = t.environment
  const n = t.getA11yStatusMessage
  const l = cI(fI, t, uI, ud)
  const u = l[0]
  const c = l[1]
  const d = u.isOpen
  const p = u.highlightedIndex
  const f = u.selectedItem
  const h = u.inputValue
  const y = U(null)
  const m = U({})
  const b = U(null)
  const x = U(null)
  const E = yn()
  const g = rd(t)
  const v = U()
  const S = gn({
    state: u,
    props: t,
  })
  const w = A(
    function (R) {
      return m.current[g.getItemId(R)]
    },
    [g]
  )
  ns(n, u, [d, p, f, h], r)
  const k = ld({
    menuElement: y.current,
    highlightedIndex: p,
    isOpen: d,
    itemRefs: m,
    scrollIntoView: i,
    getItemNodeFromIndex: w,
  })
  ;(is({
    props: t,
    state: u,
  }),
    H(function () {
      const R = Ut(t, 'isOpen')
      R && b.current && b.current.focus()
    }, []),
    H(function () {
      E || (v.current = o.length)
    }))
  const _ = ad(
    r,
    A(
      /* @__PURE__ */ a(function () {
        S.current.state.isOpen &&
          c({
            type: mn,
            selectItem: !1,
          })
      }, 'handleBlur'),
      [c, S]
    ),
    G(
      function () {
        return [y, x, b]
      },
      [y.current, x.current, b.current]
    )
  )
  const C = rs('getInputProps', 'getMenuProps')
  ;(H(
    function () {
      d || (m.current = {})
    },
    [d]
  ),
    H(
      function () {
        let R
        !d ||
          !(r != null && r.document) ||
          !(b != null && (R = b.current) != null && R.focus) ||
          (r.document.activeElement !== b.current && b.current.focus())
      },
      [d, r]
    ))
  const T = G(
    function () {
      return {
        ArrowDown: /* @__PURE__ */ a(function (B) {
          ;(B.preventDefault(),
            c({
              type: ys,
              altKey: B.altKey,
            }))
        }, 'ArrowDown'),
        ArrowUp: /* @__PURE__ */ a(function (B) {
          ;(B.preventDefault(),
            c({
              type: bs,
              altKey: B.altKey,
            }))
        }, 'ArrowUp'),
        Home: /* @__PURE__ */ a(function (B) {
          S.current.state.isOpen &&
            (B.preventDefault(),
            c({
              type: xs,
            }))
        }, 'Home'),
        End: /* @__PURE__ */ a(function (B) {
          S.current.state.isOpen &&
            (B.preventDefault(),
            c({
              type: Is,
            }))
        }, 'End'),
        Escape: /* @__PURE__ */ a(function (B) {
          const L = S.current.state
          ;(L.isOpen ||
            L.inputValue ||
            L.selectedItem ||
            L.highlightedIndex > -1) &&
            (B.preventDefault(),
            c({
              type: vs,
            }))
        }, 'Escape'),
        Enter: /* @__PURE__ */ a(function (B) {
          const L = S.current.state
          !L.isOpen ||
            B.which === 229 ||
            (B.preventDefault(),
            c({
              type: Es,
            }))
        }, 'Enter'),
        PageUp: /* @__PURE__ */ a(function (B) {
          S.current.state.isOpen &&
            (B.preventDefault(),
            c({
              type: Ss,
            }))
        }, 'PageUp'),
        PageDown: /* @__PURE__ */ a(function (B) {
          S.current.state.isOpen &&
            (B.preventDefault(),
            c({
              type: ws,
            }))
        }, 'PageDown'),
      }
    },
    [c, S]
  )
  const O = A(
    function (R) {
      return j(
        {
          id: g.labelId,
          htmlFor: g.inputId,
        },
        R
      )
    },
    [g]
  )
  const P = A(
    function (R, B) {
      let L
      const $ = R === void 0 ? {} : R
      const J = $.onMouseLeave
      const ie = $.refKey
      const te = ie === void 0 ? 'ref' : ie
      const de = $.ref
      const ae = ke($, mI)
      const ce = B === void 0 ? {} : B
      const ue = ce.suppressRefError
      const Ie = ue === void 0 ? !1 : ue
      return (
        C('getMenuProps', Ie, te, y),
        j(
          ((L = {}),
          (L[te] = Ze(de, function (ye) {
            y.current = ye
          })),
          (L.id = g.menuId),
          (L.role = 'listbox'),
          (L['aria-labelledby'] =
            ae && ae['aria-label'] ? void 0 : '' + g.labelId),
          (L.onMouseLeave = le(J, function () {
            c({
              type: Id,
            })
          })),
          L),
          ae
        )
      )
    },
    [c, C, g]
  )
  const D = A(
    function (R) {
      let B
      let L
      const $ = R === void 0 ? {} : R
      const J = $.item
      const ie = $.index
      const te = $.refKey
      const de = te === void 0 ? 'ref' : te
      const ae = $.ref
      const ce = $.onMouseMove
      const ue = $.onMouseDown
      const Ie = $.onClick
      $.onPress
      const ye = $.disabled
      const Oe = ke($, hI)
      ye !== void 0 &&
        console.warn(
          'Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled\
 prop from useCombobox.'
        )
      const fe = S.current
      const Se = fe.props
      const _e = fe.state
      const Ae = ts(
        J,
        ie,
        Se.items,
        'Pass either item or index to getItemProps!'
      )
      const et = Ae[0]
      const N = Ae[1]
      const Ge = Se.isItemDisabled(et, N)
      const fo = 'onClick'
      const Uo = Ie
      const ht = /* @__PURE__ */ a(function () {
        _.isTouchEnd ||
          N === _e.highlightedIndex ||
          ((k.current = !1),
          c({
            type: Sd,
            index: N,
            disabled: Ge,
          }))
      }, 'itemHandleMouseMove')
      const Ct = /* @__PURE__ */ a(function () {
        c({
          type: _s,
          index: N,
        })
      }, 'itemHandleClick')
      const gt = /* @__PURE__ */ a(function (ff) {
        return ff.preventDefault()
      }, 'itemHandleMouseDown')
      return j(
        ((B = {}),
        (B[de] = Ze(ae, function (qe) {
          qe && (m.current[g.getItemId(N)] = qe)
        })),
        (B['aria-disabled'] = Ge),
        (B['aria-selected'] = N === _e.highlightedIndex),
        (B.id = g.getItemId(N)),
        (B.role = 'option'),
        B),
        !Ge && ((L = {}), (L[fo] = le(Uo, Ct)), L),
        {
          onMouseMove: le(ce, ht),
          onMouseDown: le(ue, gt),
        },
        Oe
      )
    },
    [c, g, S, _, k]
  )
  const M = A(
    function (R) {
      let B
      const L = R === void 0 ? {} : R
      const $ = L.onClick
      L.onPress
      const J = L.refKey
      const ie = J === void 0 ? 'ref' : J
      const te = L.ref
      const de = ke(L, gI)
      const ae = S.current.state
      const ce = /* @__PURE__ */ a(function () {
        c({
          type: wd,
        })
      }, 'toggleButtonHandleClick')
      return j(
        ((B = {}),
        (B[ie] = Ze(te, function (ue) {
          x.current = ue
        })),
        (B['aria-controls'] = g.menuId),
        (B['aria-expanded'] = ae.isOpen),
        (B.id = g.toggleButtonId),
        (B.tabIndex = -1),
        B),
        !de.disabled &&
          j(
            {},
            {
              onClick: le($, ce),
            }
          ),
        de
      )
    },
    [c, S, g]
  )
  const F = A(
    function (R, B) {
      let L
      const $ = R === void 0 ? {} : R
      const J = $.onKeyDown
      const ie = $.onChange
      const te = $.onInput
      const de = $.onBlur
      $.onChangeText
      const ae = $.onClick
      const ce = $.refKey
      const ue = ce === void 0 ? 'ref' : ce
      const Ie = $.ref
      const ye = ke($, yI)
      const Oe = B === void 0 ? {} : B
      const fe = Oe.suppressRefError
      const Se = fe === void 0 ? !1 : fe
      C('getInputProps', Se, ue, b)
      const _e = S.current.state
      const Ae = /* @__PURE__ */ a(function (gt) {
        const qe = po(gt)
        qe && T[qe] && T[qe](gt)
      }, 'inputHandleKeyDown')
      const et = /* @__PURE__ */ a(function (gt) {
        c({
          type: Ts,
          inputValue: gt.target.value,
        })
      }, 'inputHandleChange')
      const N = /* @__PURE__ */ a(function (gt) {
        if (r != null && r.document && _e.isOpen && !_.isMouseDown) {
          const qe =
            gt.relatedTarget === null &&
            r.document.activeElement !== r.document.body
          c({
            type: mn,
            selectItem: !qe,
          })
        }
      }, 'inputHandleBlur')
      const Ge = /* @__PURE__ */ a(function () {
        c({
          type: Cs,
        })
      }, 'inputHandleClick')
      const fo = 'onChange'
      let Uo = {}
      if (!ye.disabled) {
        let ht
        Uo =
          ((ht = {}),
          (ht[fo] = le(ie, te, et)),
          (ht.onKeyDown = le(J, Ae)),
          (ht.onBlur = le(de, N)),
          (ht.onClick = le(ae, Ge)),
          ht)
      }
      return j(
        ((L = {}),
        (L[ue] = Ze(Ie, function (Ct) {
          b.current = Ct
        })),
        (L['aria-activedescendant'] =
          _e.isOpen && _e.highlightedIndex > -1
            ? g.getItemId(_e.highlightedIndex)
            : ''),
        (L['aria-autocomplete'] = 'list'),
        (L['aria-controls'] = g.menuId),
        (L['aria-expanded'] = _e.isOpen),
        (L['aria-labelledby'] = ye && ye['aria-label'] ? void 0 : g.labelId),
        (L.autoComplete = 'off'),
        (L.id = g.inputId),
        (L.role = 'combobox'),
        (L.value = _e.inputValue),
        L),
        Uo,
        ye
      )
    },
    [c, g, r, T, S, _, C]
  )
  const Z = A(
    function () {
      c({
        type: Ed,
      })
    },
    [c]
  )
  const V = A(
    function () {
      c({
        type: Cd,
      })
    },
    [c]
  )
  const Q = A(
    function () {
      c({
        type: Td,
      })
    },
    [c]
  )
  const z = A(
    function (R) {
      c({
        type: _d,
        highlightedIndex: R,
      })
    },
    [c]
  )
  const q = A(
    function (R) {
      c({
        type: ks,
        selectedItem: R,
      })
    },
    [c]
  )
  const W = A(
    function (R) {
      c({
        type: kd,
        inputValue: R,
      })
    },
    [c]
  )
  const re = A(
    function () {
      c({
        type: Od,
      })
    },
    [c]
  )
  return {
    // prop getters.
    getItemProps: D,
    getLabelProps: O,
    getMenuProps: P,
    getInputProps: F,
    getToggleButtonProps: M,
    // actions.
    toggleMenu: Z,
    openMenu: Q,
    closeMenu: V,
    setHighlightedIndex: z,
    setInputValue: W,
    selectItem: q,
    reset: re,
    // state.
    highlightedIndex: p,
    isOpen: d,
    selectedItem: f,
    inputValue: h,
  }
}
a(Ad, 'useCombobox')
const Dd = {
  activeIndex: -1,
  selectedItems: [],
}
function Lp(e, t) {
  return Ut(e, t, Dd)
}
a(Lp, 'getInitialValue')
function Np(e, t) {
  return ut(e, t, Dd)
}
a(Np, 'getDefaultValue')
function bI(e) {
  const t = Lp(e, 'activeIndex')
  const o = Lp(e, 'selectedItems')
  return {
    activeIndex: t,
    selectedItems: o,
  }
}
a(bI, 'getInitialState')
function Fp(e) {
  if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return !1
  const t = e.target
  return !(
    t instanceof HTMLInputElement && // if element is a text input
    t.value !== '' && // and we have text in it
    // and cursor is either not at the start or is currently highlighting text.
    (t.selectionStart !== 0 || t.selectionEnd !== 0)
  )
}
a(Fp, 'isKeyDownOperationPermitted')
function vI(e, t) {
  return e.selectedItems === t.selectedItems && e.activeIndex === t.activeIndex
}
a(vI, 'isStateEqual')
const KR = {
  stateReducer: sn.stateReducer,
  itemToKey: sn.itemToKey,
  environment: sn.environment,
  selectedItems: Y.default.array,
  initialSelectedItems: Y.default.array,
  defaultSelectedItems: Y.default.array,
  getA11yStatusMessage: Y.default.func,
  activeIndex: Y.default.number,
  initialActiveIndex: Y.default.number,
  defaultActiveIndex: Y.default.number,
  onActiveIndexChange: Y.default.func,
  onSelectedItemsChange: Y.default.func,
  keyNavigationNext: Y.default.string,
  keyNavigationPrevious: Y.default.string,
}
const xI = {
  itemToKey: Wo.itemToKey,
  stateReducer: Wo.stateReducer,
  environment: Wo.environment,
  keyNavigationNext: 'ArrowRight',
  keyNavigationPrevious: 'ArrowLeft',
}
const II = Re
const Ps = 0
const As = 1
const Ds = 2
const Ms = 3
const Ls = 4
const Ns = 5
const Fs = 6
const Rs = 7
const Bs = 8
const Hs = 9
const zs = 10
const Ws = 11
const Vs = 12
const SI = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  DropdownClick: Rs,
  DropdownKeyDownBackspace: Fs,
  DropdownKeyDownNavigationPrevious: Ns,
  FunctionAddSelectedItem: Bs,
  FunctionRemoveSelectedItem: Hs,
  FunctionReset: Vs,
  FunctionSetActiveIndex: Ws,
  FunctionSetSelectedItems: zs,
  SelectedItemClick: Ps,
  SelectedItemKeyDownBackspace: Ds,
  SelectedItemKeyDownDelete: As,
  SelectedItemKeyDownNavigationNext: Ms,
  SelectedItemKeyDownNavigationPrevious: Ls,
})
function wI(e, t) {
  const o = t.type
  const i = t.index
  const r = t.props
  const n = t.selectedItem
  const l = e.activeIndex
  const u = e.selectedItems
  let c
  switch (o) {
    case Ps:
      c = {
        activeIndex: i,
      }
      break
    case Ls:
      c = {
        activeIndex: l - 1 < 0 ? 0 : l - 1,
      }
      break
    case Ms:
      c = {
        activeIndex: l + 1 >= u.length ? -1 : l + 1,
      }
      break
    case Ds:
    case As: {
      if (l < 0) break
      let d = l
      ;(u.length === 1 ? (d = -1) : l === u.length - 1 && (d = u.length - 2),
        (c = j(
          {
            selectedItems: [].concat(u.slice(0, l), u.slice(l + 1)),
          },
          {
            activeIndex: d,
          }
        )))
      break
    }
    case Ns:
      c = {
        activeIndex: u.length - 1,
      }
      break
    case Fs:
      c = {
        selectedItems: u.slice(0, u.length - 1),
      }
      break
    case Bs:
      c = {
        selectedItems: [].concat(u, [n]),
      }
      break
    case Rs:
      c = {
        activeIndex: -1,
      }
      break
    case Hs: {
      let p = l
      const f = u.findIndex(function (m) {
        return r.itemToKey(m) === r.itemToKey(n)
      })
      if (f < 0) break
      ;(u.length === 1 ? (p = -1) : f === u.length - 1 && (p = u.length - 2),
        (c = {
          selectedItems: [].concat(u.slice(0, f), u.slice(f + 1)),
          activeIndex: p,
        }))
      break
    }
    case zs: {
      const h = t.selectedItems
      c = {
        selectedItems: h,
      }
      break
    }
    case Ws: {
      const y = t.activeIndex
      c = {
        activeIndex: y,
      }
      break
    }
    case Vs:
      c = {
        activeIndex: Np(r, 'activeIndex'),
        selectedItems: Np(r, 'selectedItems'),
      }
      break
    default:
      throw new Error('Reducer called without proper action type.')
  }
  return j({}, e, c)
}
a(wI, 'downshiftMultipleSelectionReducer')
const EI = ['refKey', 'ref', 'onClick', 'onKeyDown', 'selectedItem', 'index']
const TI = [
  'refKey',
  'ref',
  'onKeyDown',
  'onClick',
  'preventKeyActio\
n',
]
Md.stateChangeTypes = SI
function Md(e) {
  ;(e === void 0 && (e = {}), II(e, Md))
  const t = j({}, xI, e)
  const o = t.getA11yStatusMessage
  const i = t.environment
  const r = t.keyNavigationNext
  const n = t.keyNavigationPrevious
  const l = id(wI, t, bI, vI)
  const u = l[0]
  const c = l[1]
  const d = u.activeIndex
  const p = u.selectedItems
  const f = yn()
  const h = U(null)
  const y = U()
  y.current = []
  const m = gn({
    state: u,
    props: t,
  })
  ;(ns(o, u, [d, p], i),
    H(
      function () {
        f ||
          (d === -1 && h.current
            ? h.current.focus()
            : y.current[d] && y.current[d].focus())
      },
      [d]
    ),
    is({
      props: t,
      state: u,
    }))
  const b = rs('getDropdownProps')
  const x = G(
    function () {
      let T
      return (
        (T = {}),
        (T[n] = function () {
          c({
            type: Ls,
          })
        }),
        (T[r] = function () {
          c({
            type: Ms,
          })
        }),
        (T.Delete = /* @__PURE__ */ a(function () {
          c({
            type: As,
          })
        }, 'Delete')),
        (T.Backspace = /* @__PURE__ */ a(function () {
          c({
            type: Ds,
          })
        }, 'Backspace')),
        T
      )
    },
    [c, r, n]
  )
  const E = G(
    function () {
      let T
      return (
        (T = {}),
        (T[n] = function (O) {
          Fp(O) &&
            c({
              type: Ns,
            })
        }),
        (T.Backspace = /* @__PURE__ */ a(function (P) {
          Fp(P) &&
            c({
              type: Fs,
            })
        }, 'Backspace')),
        T
      )
    },
    [c, n]
  )
  const g = A(
    function (T) {
      let O
      const P = T === void 0 ? {} : T
      const D = P.refKey
      const M = D === void 0 ? 'ref' : D
      const F = P.ref
      const Z = P.onClick
      const V = P.onKeyDown
      const Q = P.selectedItem
      const z = P.index
      const q = ke(P, EI)
      const W = m.current.state
      const re = ts(
        Q,
        z,
        W.selectedItems,
        'Pass either item or index to getSelectedItemProps!'
      )
      const R = re[1]
      const B = R > -1 && R === W.activeIndex
      const L = /* @__PURE__ */ a(function () {
        c({
          type: Ps,
          index: R,
        })
      }, 'selectedItemHandleClick')
      const $ = /* @__PURE__ */ a(function (ie) {
        const te = po(ie)
        te && x[te] && x[te](ie)
      }, 'selectedItemHandleKeyDown')
      return j(
        ((O = {}),
        (O[M] = Ze(F, function (J) {
          J && y.current.push(J)
        })),
        (O.tabIndex = B ? 0 : -1),
        (O.onClick = le(Z, L)),
        (O.onKeyDown = le(V, $)),
        O),
        q
      )
    },
    [c, m, x]
  )
  const v = A(
    function (T, O) {
      let P
      const D = T === void 0 ? {} : T
      const M = D.refKey
      const F = M === void 0 ? 'ref' : M
      const Z = D.ref
      const V = D.onKeyDown
      const Q = D.onClick
      const z = D.preventKeyAction
      const q = z === void 0 ? !1 : z
      const W = ke(D, TI)
      const re = O === void 0 ? {} : O
      const R = re.suppressRefError
      const B = R === void 0 ? !1 : R
      b('getDropdownProps', B, F, h)
      const L = /* @__PURE__ */ a(function (ie) {
        const te = po(ie)
        te && E[te] && E[te](ie)
      }, 'dropdownHandleKeyDown')
      const $ = /* @__PURE__ */ a(function () {
        c({
          type: Rs,
        })
      }, 'dropdownHandleClick')
      return j(
        ((P = {}),
        (P[F] = Ze(Z, function (J) {
          J && (h.current = J)
        })),
        P),
        !q && {
          onKeyDown: le(V, L),
          onClick: le(Q, $),
        },
        W
      )
    },
    [c, E, b]
  )
  const S = A(
    function (T) {
      c({
        type: Bs,
        selectedItem: T,
      })
    },
    [c]
  )
  const w = A(
    function (T) {
      c({
        type: Hs,
        selectedItem: T,
      })
    },
    [c]
  )
  const k = A(
    function (T) {
      c({
        type: zs,
        selectedItems: T,
      })
    },
    [c]
  )
  const _ = A(
    function (T) {
      c({
        type: Ws,
        activeIndex: T,
      })
    },
    [c]
  )
  const C = A(
    function () {
      c({
        type: Vs,
      })
    },
    [c]
  )
  return {
    getSelectedItemProps: g,
    getDropdownProps: v,
    addSelectedItem: S,
    removeSelectedItem: w,
    setSelectedItems: k,
    setActiveIndex: _,
    reset: C,
    selectedItems: p,
    activeIndex: d,
  }
}
a(Md, 'useMultipleSelection')

// src/manager/components/sidebar/Search.tsx
const Nd = Ve(Ld(), 1)

// src/manager/components/sidebar/types.ts
function Ko(e) {
  return !!(e && e.showAll)
}
a(Ko, 'isExpandType')
function Ks(e) {
  return !!(e && e.item)
}
a(Ks, 'isSearchResult')

// src/manager/components/sidebar/Search.tsx
const { document: CI } = se
const $s = 50
const _I = {
  shouldSort: !0,
  tokenize: !0,
  findAllMatches: !0,
  includeScore: !0,
  includeMatches: !0,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'path', weight: 0.3 },
  ],
}
const kI = I.div({
  display: 'flex',
  flexDirection: 'row',
  columnGap: 6,
})
const OI = I.label({
  position: 'absolute',
  left: -1e4,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden',
})
const PI = I.div(({ theme: e, isMobile: t }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: t ? 4 : 2,
  flexGrow: 1,
  height: t ? 36 : 32,
  width: '100%',
  boxShadow: `${e.button.border} 0 0 0 1px inset`,
  borderRadius: e.appBorderRadius + 2,
  '&:has(input:focus), &:has(input:active)': {
    boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
    background: e.background.app,
  },
}))
const AI = I.div(({ theme: e, onClick: t }) => ({
  cursor: t ? 'pointer' : 'default',
  flex: '0 0 28px',
  height: '100%',
  pointerEvents: t ? 'auto' : 'none',
  color: e.textMutedColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const DI = I.input(({ theme: e, isMobile: t }) => ({
  appearance: 'none',
  height: 28,
  width: '100%',
  padding: 0,
  border: 0,
  background: 'transparent',
  fontSize: t ? '16px' : `${e.typography.size.s1 + 1}px`,
  fontFamily: 'inherit',
  transition: 'all 150ms',
  color: e.color.defaultText,
  outline: 0,
  '&::placeholder': {
    color: e.textMutedColor,
    opacity: 1,
  },
  '&:valid ~ code, &:focus ~ code': {
    display: 'none',
  },
  '&:invalid ~ svg': {
    display: 'none',
  },
  '&:valid ~ svg': {
    display: 'block',
  },
  '&::-ms-clear': {
    display: 'none',
  },
  '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
    {
      display: 'none',
    },
}))
const MI = I.code(({ theme: e }) => ({
  margin: 5,
  marginTop: 6,
  height: 16,
  lineHeight: '16px',
  textAlign: 'center',
  fontSize: '11px',
  color: e.base === 'light' ? e.color.dark : e.textMutedColor,
  userSelect: 'none',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
}))
const LI = I.span({
  fontSize: '14px',
})
const NI = I.div({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
})
const FI = I.div({ outline: 0 })
const Fd = s.memo(
  /* @__PURE__ */ a(function ({
    children: t,
    dataset: o,
    enableShortcuts: i = !0,
    getLastViewed: r,
    initialQuery: n = '',
    searchBarContent: l,
    searchFieldContent: u,
  }) {
    const c = oe()
    const d = U(null)
    const [p, f] = K('Find components')
    const [h, y] = K(!1)
    const m = c ? Ye(c.getShortcutKeys().search) : '/'
    const b = A(() => {
      const w = o.entries.reduce((k, [_, { index: C, allStatuses: T }]) => {
        const O = zr(C || {}, T ?? {})
        return (
          C &&
            k.push(
              ...Object.values(C).map(P => {
                const D = T?.[P.id]
                const M = D ? Ho(Object.values(D).map(F => F.value)) : null
                return {
                  ...Ki(P, o.hash[_]),
                  status: M ?? O[P.id] ?? null,
                }
              })
            ),
          k
        )
      }, [])
      return new Nd.default(w, _I)
    }, [o])
    const x = A(
      w => {
        const k = b()
        if (!w) return []
        let _ = []
        const C = /* @__PURE__ */ new Set()
        const T = k.search(w).filter(({ item: O }) =>
          !(
            O.type === 'component' ||
            O.type === 'docs' ||
            O.type === 'story'
          ) || // @ts-expect-error (non strict)
          C.has(O.parent)
            ? !1
            : (C.add(O.id), !0)
        )
        return (
          T.length &&
            ((_ = T.slice(0, h ? 1e3 : $s)),
            T.length > $s &&
              !h &&
              _.push({
                showAll: /* @__PURE__ */ a(() => y(!0), 'showAll'),
                totalCount: T.length,
                moreCount: T.length - $s,
              })),
          _
        )
      },
      [h, b]
    )
    const E = A(
      w => {
        if (Ks(w)) {
          const { id: k, refId: _ } = w.item
          ;(c?.selectStory(k, void 0, { ref: _ !== lt && _ }),
            d.current.blur(),
            y(!1))
          return
        }
        Ko(w) && w.showAll()
      },
      [c]
    )
    const g = A((w, k) => {
      y(!1)
    }, [])
    const v = A((w, k) => {
      switch (k.type) {
        case qt.stateChangeTypes.blurInput:
          return {
            ...k,
            // Prevent clearing the input on blur
            inputValue: w.inputValue,
            // Return to the tree view after selecting an item
            isOpen: w.inputValue && !w.selectedItem,
          }
        case qt.stateChangeTypes.mouseUp:
          return w
        case qt.stateChangeTypes.keyDownEscape:
          return w.inputValue
            ? { ...k, inputValue: '', isOpen: !0, selectedItem: null }
            : { ...k, isOpen: !1, selectedItem: null }
        case qt.stateChangeTypes.clickItem:
        case qt.stateChangeTypes.keyDownEnter:
          return Ks(k.selectedItem)
            ? { ...k, inputValue: w.inputValue }
            : Ko(k.selectedItem)
              ? w
              : k
        default:
          return k
      }
    }, [])
    const { isMobile: S } = ge()
    return (
      // @ts-expect-error (non strict)
      /* @__PURE__ */ s.createElement(
        qt,
        {
          initialInputValue: n,
          stateReducer: v,
          itemToString: w => w?.item?.name || '',
          scrollIntoView: w => zt(w),
          onSelect: E,
          onInputValueChange: g,
        },
        ({
          isOpen: w,
          openMenu: k,
          closeMenu: _,
          inputValue: C,
          clearSelection: T,
          getInputProps: O,
          getItemProps: P,
          getLabelProps: D,
          getMenuProps: M,
          getRootProps: F,
          highlightedIndex: Z,
        }) => {
          const V = C ? C.trim() : ''
          let Q = V ? x(V) : []
          const z = !V && r()
          z &&
            z.length &&
            (Q = z.reduce((R, { storyId: B, refId: L }) => {
              const $ = o.hash[L]
              if ($ && $.index && $.index[B]) {
                const J = $.index[B]
                const ie = J.type === 'story' ? $.index[J.parent] : J
                R.some(te => te.item.refId === L && te.item.id === ie.id) ||
                  R.push({ item: Ki(ie, o.hash[L]), matches: [], score: 0 })
              }
              return R
            }, []))
          const q = 'storybook-explorer-searchfield'
          const W = O({
            id: q,
            ref: d,
            required: !0,
            type: 'search',
            placeholder: p,
            onFocus: /* @__PURE__ */ a(() => {
              ;(k(), f('Type to find...'))
            }, 'onFocus'),
            onBlur: /* @__PURE__ */ a(() => f('Find components'), 'onBlur'),
            onKeyDown: /* @__PURE__ */ a(R => {
              R.key === 'Escape' && C.length === 0 && d.current.blur()
            }, 'onKeyDown'),
          })
          const re = D({
            htmlFor: q,
          })
          return /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            /* @__PURE__ */ s.createElement(
              OI,
              { ...re },
              'Search for components'
            ),
            /* @__PURE__ */ s.createElement(
              kI,
              null,
              /* @__PURE__ */ s.createElement(
                PI,
                {
                  ...F({ refKey: '' }, { suppressRefError: !0 }),
                  isMobile: S,
                  className: 'search-field',
                },
                /* @__PURE__ */ s.createElement(
                  AI,
                  null,
                  /* @__PURE__ */ s.createElement(So, null)
                ),
                /* @__PURE__ */ s.createElement(DI, { ...W, isMobile: S }),
                !S &&
                  i &&
                  !w &&
                  /* @__PURE__ */ s.createElement(
                    MI,
                    null,
                    m === '\u2318 K'
                      ? /* @__PURE__ */ s.createElement(
                          s.Fragment,
                          null,
                          /* @__PURE__ */ s.createElement(LI, null, '\u2318'),
                          'K'
                        )
                      : m
                  ),
                /* @__PURE__ */ s.createElement(
                  NI,
                  null,
                  w &&
                    /* @__PURE__ */ s.createElement(
                      ee,
                      { onClick: () => T() },
                      /* @__PURE__ */ s.createElement(je, null)
                    ),
                  u
                )
              ),
              l
            ),
            /* @__PURE__ */ s.createElement(
              FI,
              { tabIndex: 0, id: 'storybook-explorer-menu' },
              t({
                query: V,
                results: Q,
                isBrowsing: !w && CI.activeElement !== d.current,
                closeMenu: _,
                getMenuProps: M,
                getItemProps: P,
                highlightedIndex: Z,
              })
            )
          )
        }
      )
    )
  }, 'Search')
)

// src/manager/components/sidebar/SearchResults.tsx
const { document: Rd } = se
const RI = I.ol({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})
const BI = I.li(({ theme: e, isHighlighted: t }) => ({
  width: '100%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  textAlign: 'left',
  color: 'inherit',
  fontSize: `${e.typography.size.s2}px`,
  background: t ? e.background.hoverable : 'transparent',
  minHeight: 28,
  borderRadius: 4,
  gap: 6,
  paddingTop: 7,
  paddingBottom: 7,
  paddingLeft: 8,
  paddingRight: 8,
  '&:hover, &:focus': {
    background: Te(0.93, e.color.secondary),
    outline: 'none',
  },
}))
const HI = I.div({
  marginTop: 2,
})
const zI = I.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})
const WI = I.div(({ theme: e }) => ({
  marginTop: 20,
  textAlign: 'center',
  fontSize: `${e.typography.size.s2}px`,
  lineHeight: '18px',
  color: e.color.defaultText,
  small: {
    color: e.textMutedColor,
    fontSize: `${e.typography.size.s1}px`,
  },
}))
const VI = I.mark(({ theme: e }) => ({
  background: 'transparent',
  color: e.color.secondary,
}))
const jI = I.div({
  marginTop: 8,
})
const KI = I.div(({ theme: e }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: `${e.typography.size.s1 - 1}px`,
  fontWeight: e.typography.weight.bold,
  minHeight: 28,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: e.textMutedColor,
  marginTop: 16,
  marginBottom: 4,
  alignItems: 'center',
  '.search-result-recentlyOpened-clear': {
    visibility: 'hidden',
  },
  '&:hover': {
    '.search-result-recentlyOpened-clear': {
      visibility: 'visible',
    },
  },
}))
const Bd = s.memo(
  /* @__PURE__ */ a(function ({ children: t, match: o }) {
    if (!o) return t
    const { value: i, indices: r } = o
    const { nodes: n } = r.reduce(
      ({ cursor: l, nodes: u }, [c, d], p, { length: f }) => (
        u.push(
          /* @__PURE__ */ s.createElement(
            'span',
            { key: `${p}-1` },
            i.slice(l, c)
          )
        ),
        u.push(
          /* @__PURE__ */ s.createElement(
            VI,
            { key: `${p}-2` },
            i.slice(c, d + 1)
          )
        ),
        p === f - 1 &&
          u.push(
            /* @__PURE__ */ s.createElement(
              'span',
              { key: `${p}-3` },
              i.slice(d + 1)
            )
          ),
        { cursor: d + 1, nodes: u }
      ),
      { cursor: 0, nodes: [] }
    )
    return /* @__PURE__ */ s.createElement('span', null, n)
  }, 'Highlight')
)
const $I = I.div(({ theme: e }) => ({
  display: 'grid',
  justifyContent: 'start',
  gridAutoColumns: 'auto',
  gridAutoFlow: 'column',
  '& > span': {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
const UI = I.div(({ theme: e }) => ({
  display: 'grid',
  justifyContent: 'start',
  gridAutoColumns: 'auto',
  gridAutoFlow: 'column',
  fontSize: `${e.typography.size.s1 - 1}px`,
  '& > span': {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& > span + span': {
    '&:before': {
      content: "' / '",
    },
  },
}))
const GI = s.memo(
  /* @__PURE__ */ a(function ({ item: t, matches: o, onClick: i, ...r }) {
    const n = A(
      p => {
        ;(p.preventDefault(), i?.(p))
      },
      [i]
    )
    const l = oe()
    H(() => {
      l &&
        r.isHighlighted &&
        t.type === 'component' &&
        l.emit(kt, { ids: [t.children[0]] }, { options: { target: t.refId } })
    }, [r.isHighlighted, t])
    const u = o.find(p => p.key === 'name')
    const c = o.filter(p => p.key === 'path')
    const [d] = t.status ? Bo[t.status] : []
    return /* @__PURE__ */ s.createElement(
      BI,
      { ...r, onClick: n },
      /* @__PURE__ */ s.createElement(
        HI,
        null,
        t.type === 'component' &&
          /* @__PURE__ */ s.createElement(
            wt,
            {
              viewBox: '0 0 14 14',
              width: '14',
              height: '14',
              type: 'component',
            },
            /* @__PURE__ */ s.createElement(Me, {
              type: 'com\
ponent',
            })
          ),
        t.type === 'story' &&
          /* @__PURE__ */ s.createElement(
            wt,
            { viewBox: '0 0 14 14', width: '14', height: '14', type: 'story' },
            /* @__PURE__ */ s.createElement(Me, { type: 'story' })
          ),
        !(t.type === 'component' || t.type === 'story') &&
          /* @__PURE__ */ s.createElement(
            wt,
            {
              viewBox:
                '\
0 0 14 14',
              width: '14',
              height: '14',
              type: 'document',
            },
            /* @__PURE__ */ s.createElement(Me, { type: 'document' })
          )
      ),
      /* @__PURE__ */ s.createElement(
        zI,
        { className: 'search-result-item--label' },
        /* @__PURE__ */ s.createElement(
          $I,
          null,
          /* @__PURE__ */ s.createElement(Bd, { match: u }, t.name)
        ),
        /* @__PURE__ */ s.createElement(
          UI,
          null,
          t.path.map((p, f) =>
            /* @__PURE__ */ s.createElement(
              'span',
              { key: f },
              /* @__PURE__ */ s.createElement(
                Bd,
                { match: c.find(h => h.arrayIndex === f) },
                p
              )
            )
          )
        )
      ),
      t.status
        ? /* @__PURE__ */ s.createElement(Xc, { status: t.status }, d)
        : null
    )
  }, 'Result')
)
const Hd = s.memo(
  /* @__PURE__ */ a(function ({
    query: t,
    results: o,
    closeMenu: i,
    getMenuProps: r,
    getItemProps: n,
    highlightedIndex: l,
    isLoading: u = !1,
    enableShortcuts: c = !0,
    clearLastViewed: d,
  }) {
    const p = oe()
    H(() => {
      const y = /* @__PURE__ */ a(m => {
        if (!(!c || u || m.repeat) && Et(!1, m) && $e('Escape', m)) {
          if (m.target?.id === 'storybook-explorer-searchfield') return
          ;(m.preventDefault(), i())
        }
      }, 'handleEscape')
      return (
        Rd.addEventListener('keydown', y),
        () => Rd.removeEventListener('keydown', y)
      )
    }, [i, c, u])
    const f = A(y => {
      if (!p) return
      const m = y.currentTarget
      const b = m.getAttribute('data-id')
      const x = m.getAttribute('data-refid')
      const E = p.resolveStory(
        b,
        x ===
          'storybook_interna\
l'
          ? void 0
          : x
      )
      E?.type === 'component' &&
        p.emit(kt, {
          // @ts-expect-error (TODO)
          ids: [E.isLeaf ? E.id : E.children[0]],
          options: { target: x },
        })
    }, [])
    const h = /* @__PURE__ */ a(() => {
      ;(d(), i())
    }, 'handleClearLastViewed')
    return /* @__PURE__ */ s.createElement(
      RI,
      { ...r(), key: 'results-list' },
      o.length > 0 &&
        !t &&
        /* @__PURE__ */ s.createElement(
          KI,
          {
            className:
              '\
search-result-recentlyOpened',
          },
          'Recently opened',
          /* @__PURE__ */ s.createElement(
            ee,
            {
              className: 'search-result-recentlyOpened-clear',
              onClick: h,
            },
            /* @__PURE__ */ s.createElement(Xn, null)
          )
        ),
      o.length === 0 &&
        t &&
        /* @__PURE__ */ s.createElement(
          'li',
          null,
          /* @__PURE__ */ s.createElement(
            WI,
            null,
            /* @__PURE__ */ s.createElement(
              'strong',
              null,
              'No components found'
            ),
            /* @__PURE__ */ s.createElement('br', null),
            /* @__PURE__ */ s.createElement(
              'small',
              null,
              'Find \
components by name or path.'
            )
          )
        ),
      o.map((y, m) => {
        if (Ko(y)) {
          const E = { ...o, ...n({ key: m, index: m, item: y }) }
          const { key: g, ...v } = E
          return /* @__PURE__ */ s.createElement(
            jI,
            { key: 'search-result-expand' },
            /* @__PURE__ */ s.createElement(
              he,
              {
                key: g,
                ...v,
                size: '\
small',
              },
              'Show ',
              y.moreCount,
              ' more results'
            )
          )
        }
        const { item: b } = y
        const x = `${b.refId}::${b.id}`
        return /* @__PURE__ */ s.createElement(GI, {
          ...y,
          ...n({ key: x, index: m, item: y }),
          isHighlighted: l === m,
          key: x,
          'data-id': y.item.id,
          'data-refid': y.item.refId,
          onMouseOver: f,
          className: 'search-result-item',
        })
      })
    )
  }, 'SearchResults')
)

// src/manager/components/sidebar/useDynamicFavicon.ts
const qI = ['active', 'critical', 'negative', 'positive', 'warning']
let $o
const YI = /* @__PURE__ */ a((e = './favicon.svg', t) => {
  $o ??= e
  const o = $o + (t && qI.includes(t) ? `?status=${t}` : '')
  return new Promise(i => {
    const r = new Image()
    ;((r.onload = () => i({ href: o, status: t })),
      (r.onerror = () => i({ href: $o, status: t })),
      (r.src = o))
  })
}, 'getFaviconUrl')
const zd = /* @__PURE__ */ a(e => {
  const t = U(document.head.querySelectorAll("link[rel*='icon']"))
  H(() => {
    let o = !0
    const [i, ...r] = t.current
    if (i && !r.length)
      return (
        YI(i.href, e).then(
          n => {
            o &&
              n.status === e &&
              i.dataset.status !== e &&
              ((i.href = n.href),
              n.status
                ? (i.dataset.status = n.status)
                : delete i.dataset.status)
          },
          () => {
            o && (i.href = $o)
          }
        ),
        () => {
          ;((o = !1), (i.href = $o))
        }
      )
  }, [e])
}, 'useDynamicFavicon')

// src/manager/components/sidebar/TestingModule.tsx
const Us = 500
const QI = Dt({
  '0%': { transform: 'rotate(0deg)' },
  '10%': { transform: 'rotate(10deg)' },
  '40%': { transform: 'rotate(170deg)' },
  '50%': { transform: 'rotate(180deg)' },
  '60%': { transform: 'rotate(190deg)' },
  '90%': { transform: 'rotate(350deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
const XI = I.div(
  ({ crashed: e, failed: t, running: o, updated: i, theme: r }) => ({
    position: 'relative',
    lineHeight: '16px',
    width: '100%',
    padding: 1,
    overflow: 'hidden',
    backgroundColor: `var(--sb-sidebar-bottom-card-background, ${r.background.content})`,
    borderRadius: `var(--sb-sidebar-bottom-card-border-radius, ${r.appBorderRadius + 1}px)`,
    boxShadow: `inset 0 0 0 1px ${e && !o ? r.color.negative : i ? r.color.positive : r.appBorderColor}, var(--sb-sidebar-bottom-card-box-shad\
ow, 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0px -5px 20px 10px ${r.background.app})`,
    transition: 'box-shadow 1s',
    '&:after': {
      content: '""',
      display: o ? 'block' : 'none',
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: 'calc(max(100vw, 100vh) * -0.5)',
      marginTop: 'calc(max(100vw, 100vh) * -0.5)',
      height: 'max(100vw, 100vh)',
      width: 'max(100vw, 100vh)',
      animation: `${QI} 3s linear infinite`,
      background: t
        ? // Hardcoded colors to prevent themes from messing with them (orange+gold, secondary+seafoam)
          'conic-gradient(transparent 90deg, #FC521F 150deg, #FFAE00 210deg, transparent 270deg)'
        : 'conic-gradient(transparent 90deg, #029CFD 150deg, #37D5D3 210deg, transparent 270deg)',
      opacity: 1,
      willChange: 'auto',
    },
  })
)
const ZI = I.div(({ theme: e }) => ({
  position: 'relative',
  zIndex: 1,
  borderRadius: e.appBorderRadius,
  backgroundColor: e.background.content,
  display: 'flex',
  flexDirection: 'column-reverse',
  '&:hover #testing-module-collapse-toggle': {
    opacity: 1,
  },
}))
const JI = I.div(({ theme: e }) => ({
  overflow: 'hidden',
  willChange: 'auto',
  boxShadow: `inset 0 -1px 0 ${e.appBorderColor}`,
}))
const eS = I.div({
  display: 'flex',
  flexDirection: 'column',
})
const tS = I.div(({ onClick: e }) => ({
  display: 'flex',
  width: '100%',
  cursor: e ? 'pointer' : 'default',
  userSelect: 'none',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  padding: 4,
  gap: 4,
}))
const oS = I.div({
  display: 'flex',
  flexBasis: '100%',
  containerType: 'inline-size',
})
const rS = I.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 4,
})
const nS = I(he)({
  opacity: 0,
  transition: 'opacity 250ms',
  willChange: 'auto',
  '&:focus, &:hover': {
    opacity: 1,
  },
})
const iS = I(he)({
  // 90px is the width of the button when the label is visible
  '@container (max-width: 90px)': {
    span: {
      display: 'none',
    },
  },
})
const Wd = I(he)(
  { minWidth: 28 },
  ({ active: e, status: t, theme: o }) =>
    !e &&
    (o.base === 'light'
      ? {
          background: {
            negative: o.background.negative,
            warning: o.background.warning,
          }[t],
          color: {
            negative: o.color.negativeText,
            warning: o.color.warningText,
          }[t],
        }
      : {
          background: {
            negative: `${o.color.negative}22`,
            warning: `${o.color.warning}22`,
          }[t],
          color: {
            negative: o.color.negative,
            warning: o.color.warning,
          }[t],
        })
)
const sS = I.div(({ theme: e }) => ({
  padding: 4,
  '&:not(:last-child)': {
    boxShadow: `inset 0 -1px 0 ${e.appBorderColor}`,
  },
}))
const Vd = /* @__PURE__ */ a(
  ({
    registeredTestProviders: e,
    testProviderStates: t,
    hasStatuses: o,
    clearStatuses: i,
    onRunAll: r,
    errorCount: n,
    errorsActive: l,
    setErrorsActive: u,
    warningCount: c,
    warningsActive: d,
    setWarningsActive: p,
    successCount: f,
  }) => {
    const h = U(null)
    const y = U(null)
    const [m, b] = K(Us)
    const [x, E] = K(!0)
    const [g, v] = K(!1)
    const [S, w] = K(!1)
    const k = U()
    ;(H(() => {
      const P = Jt.onSettingsChanged(() => {
        ;(w(!0),
          clearTimeout(k.current),
          (k.current = setTimeout(() => {
            w(!1)
          }, 1e3)))
      })
      return () => {
        ;(P(), clearTimeout(k.current))
      }
    }, []),
      H(() => {
        if (y.current) {
          b(y.current?.getBoundingClientRect().height || Us)
          const P = new ResizeObserver(() => {
            requestAnimationFrame(() => {
              if (y.current && !x) {
                const D = y.current?.getBoundingClientRect().height || Us
                b(D)
              }
            })
          })
          return (P.observe(y.current), () => P.disconnect())
        }
      }, [x]))
    const _ = A((P, D) => {
      ;(P?.stopPropagation(),
        v(!0),
        E(M => D ?? !M),
        h.current && clearTimeout(h.current),
        (h.current = setTimeout(() => {
          v(!1)
        }, 250)))
    }, [])
    const C = Object.values(t).includes('test-provider-state:running')
    const T = Object.values(t).includes('test-provider-state:crashed')
    const O = Object.values(e).length > 0
    return (
      H(() => {
        T && x && _(void 0, !1)
      }, [T, x, _]),
      zd(
        T
          ? 'critical'
          : n > 0
            ? 'negative'
            : c > 0
              ? 'warning'
              : C
                ? 'active'
                : f > 0
                  ? 'positive'
                  : void 0
      ),
      !O && !n && !c
        ? null
        : /* @__PURE__ */ s.createElement(
            XI,
            {
              id: 'storybook-testing-module',
              running: C,
              crashed: T,
              failed: n > 0,
              updated: S,
              'data-updated': S,
            },
            /* @__PURE__ */ s.createElement(
              ZI,
              null,
              /* @__PURE__ */ s.createElement(
                tS,
                {
                  ...(O
                    ? {
                        onClick: /* @__PURE__ */ a(
                          P => _(P),
                          'onClic\
k'
                        ),
                      }
                    : {}),
                },
                /* @__PURE__ */ s.createElement(
                  oS,
                  null,
                  O &&
                    /* @__PURE__ */ s.createElement(
                      ve,
                      {
                        hasChrome: !1,
                        tooltip: /* @__PURE__ */ s.createElement(rt, {
                          note: C ? 'Running tests...' : 'Start all tests',
                        }),
                        trigger: 'hover',
                      },
                      /* @__PURE__ */ s.createElement(
                        iS,
                        {
                          size: 'medium',
                          variant: 'ghost',
                          padding: 'small',
                          onClick: P => {
                            ;(P.stopPropagation(), r())
                          },
                          disabled: C,
                        },
                        /* @__PURE__ */ s.createElement(jn, null),
                        /* @__PURE__ */ s.createElement(
                          'span',
                          null,
                          C ? 'Running...' : 'Run tests'
                        )
                      )
                    )
                ),
                /* @__PURE__ */ s.createElement(
                  rS,
                  null,
                  O &&
                    /* @__PURE__ */ s.createElement(
                      ve,
                      {
                        hasChrome: !1,
                        tooltip: /* @__PURE__ */ s.createElement(rt, {
                          note: x
                            ? 'Expand testing module'
                            : 'Collapse testing module',
                        }),
                        trigger: 'hover',
                      },
                      /* @__PURE__ */ s.createElement(
                        nS,
                        {
                          size: 'medium',
                          variant: 'ghost',
                          padding: 'small',
                          onClick: P => _(P),
                          id: 'testing-module-collapse-toggle',
                          'aria-label': x
                            ? 'Expand testing module'
                            : 'Collapse testing module',
                        },
                        /* @__PURE__ */ s.createElement(_n, {
                          style: {
                            transform: x ? 'none' : 'rotate(180deg)',
                            transition: 'transform 250ms',
                            willChange: 'auto',
                          },
                        })
                      )
                    ),
                  n > 0 &&
                    /* @__PURE__ */ s.createElement(
                      ve,
                      {
                        hasChrome: !1,
                        tooltip: /* @__PURE__ */ s.createElement(rt, {
                          note: 'Toggle errors',
                        }),
                        trigger: 'hover',
                      },
                      /* @__PURE__ */ s.createElement(
                        Wd,
                        {
                          id: 'errors-found-filter',
                          size: 'medium',
                          variant: 'ghost',
                          padding: n < 10 ? 'medium' : 'small',
                          status: 'negative',
                          active: l,
                          onClick: P => {
                            ;(P.stopPropagation(), u(!l))
                          },
                          'aria-label': 'Toggle errors',
                        },
                        n < 1e3 ? n : '999+'
                      )
                    ),
                  c > 0 &&
                    /* @__PURE__ */ s.createElement(
                      ve,
                      {
                        hasChrome: !1,
                        tooltip: /* @__PURE__ */ s.createElement(rt, {
                          note: 'Toggle warnings',
                        }),
                        trigger: 'hover',
                      },
                      /* @__PURE__ */ s.createElement(
                        Wd,
                        {
                          id: 'warnings-found-filter',
                          size: 'medium',
                          variant: 'ghost',
                          padding: c < 10 ? 'medium' : 'small',
                          status: 'warning',
                          active: d,
                          onClick: P => {
                            ;(P.stopPropagation(), p(!d))
                          },
                          'aria-label': 'Toggle warnings',
                        },
                        c < 1e3 ? c : '999+'
                      )
                    ),
                  o &&
                    /* @__PURE__ */ s.createElement(
                      ve,
                      {
                        hasChrome: !1,
                        tooltip: /* @__PURE__ */ s.createElement(rt, {
                          note: C
                            ? "Can't clear statuses while tests are running"
                            : 'Clear all statuses',
                        }),
                        trigger: 'hover',
                      },
                      /* @__PURE__ */ s.createElement(
                        ee,
                        {
                          id: 'clear-statuses',
                          size: 'medium',
                          onClick: P => {
                            ;(P.stopPropagation(), i())
                          },
                          disabled: C,
                          'aria-label': C
                            ? "Can't clear statuses while tests are running"
                            : 'Clear all statuses',
                        },
                        /* @__PURE__ */ s.createElement(Yn, null)
                      )
                    )
                )
              ),
              O &&
                /* @__PURE__ */ s.createElement(
                  JI,
                  {
                    'data-testid': 'collapse',
                    ...(x && { inert: '' }),
                    style: {
                      transition: g ? 'max-height 250ms' : 'max-height 0ms',
                      display: O ? 'block' : 'none',
                      maxHeight: x ? 0 : m,
                    },
                  },
                  /* @__PURE__ */ s.createElement(
                    eS,
                    { ref: y },
                    Object.values(e).map(P => {
                      const { render: D, id: M } = P
                      return D
                        ? /* @__PURE__ */ s.createElement(
                            sS,
                            { key: M, 'data-module-id': M },
                            /* @__PURE__ */ s.createElement(D, null)
                          )
                        : (Ha.warn(
                            `No render function found for test provider with id '${M}', skipping...`
                          ),
                          null)
                    })
                  )
                )
            )
          )
    )
  },
  'TestingModule'
)

// src/manager/components/sidebar/SidebarBottom.tsx
const aS = 'sidebar-bottom-spacer'
const lS = 'sidebar-bottom-wrapper'
const uS = /* @__PURE__ */ a(() => !0, 'filterNone')
const cS = /* @__PURE__ */ a(
  ({ statuses: e = {} }) =>
    Object.values(e).some(({ value: t }) => t === 'status-value:warning'),
  'filterWarn'
)
const pS = /* @__PURE__ */ a(
  ({ statuses: e = {} }) =>
    Object.values(e).some(({ value: t }) => t === 'status-value:error'),
  'filterError'
)
const dS = /* @__PURE__ */ a(
  ({ statuses: e = {} }) =>
    Object.values(e).some(({ value: t }) =>
      ['status-value:warning', 'status-value:error'].includes(t)
    ),
  'filterBoth'
)
const fS = /* @__PURE__ */ a(
  (e = !1, t = !1) => (e && t ? dS : e ? cS : t ? pS : uS),
  'getFilter'
)
const mS = I.div({
  pointerEvents: 'none',
})
const hS = I.div(({ theme: e }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '12px 0',
  margin: '0 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  color: e.color.defaultText,
  fontSize: e.typography.size.s1,
  overflow: 'hidden',
  '&:empty': {
    display: 'none',
  },
  // Integrators can use these to style their custom additions
  '--sb-sidebar-bottom-card-background': e.background.content,
  '--sb-sidebar-bottom-card-border': `1px solid ${e.appBorderColor}`,
  '--sb-sidebar-bottom-card-border-radius': `${e.appBorderRadius + 1}px`,
  '--sb-sidebar-bottom-card-box-shadow': `0 1px 2px 0 rgba(0, 0, 0, 0.05), 0px -5px 20px 10px ${e.background.app}`,
}))
const gS = /* @__PURE__ */ a(
  ({
    api: e,
    notifications: t = [],
    errorCount: o,
    warningCount: i,
    successCount: r,
    hasStatuses: n,
    isDevelopment: l,
    testProviderStates: u,
    registeredTestProviders: c,
    onRunAll: d,
  }) => {
    const p = U(null)
    const f = U(null)
    const [h, y] = K(!1)
    const [m, b] = K(!1)
    return (
      H(() => {
        if (p.current && f.current) {
          const x = new ResizeObserver(() => {
            p.current &&
              f.current &&
              (p.current.style.height = `${f.current.scrollHeight}px`)
          })
          return (x.observe(f.current), () => x.disconnect())
        }
      }, []),
      H(() => {
        const x = fS(i > 0 && h, o > 0 && m)
        e.experimental_setFilter('sidebar-bottom-filter', x)
      }, [e, i, o, h, m]),
      !i && !o && Object.values(c).length === 0 && t.length === 0
        ? null
        : /* @__PURE__ */ s.createElement(
            Ee,
            null,
            /* @__PURE__ */ s.createElement(mS, { id: aS, ref: p }),
            /* @__PURE__ */ s.createElement(
              hS,
              { id: lS, ref: f },
              /* @__PURE__ */ s.createElement(Sr, {
                notifications: t,
                clearNotification: e.clearNotification,
              }),
              l &&
                /* @__PURE__ */ s.createElement(Vd, {
                  registeredTestProviders: c,
                  testProviderStates: u,
                  onRunAll: /* @__PURE__ */ a(() => {
                    ;(d(), b(!1), y(!1))
                  }, 'onRunAll'),
                  hasStatuses: n,
                  clearStatuses: /* @__PURE__ */ a(() => {
                    ;(At.unset(), Jt.clearAll(), b(!1), y(!1))
                  }, 'clearStatuses'),
                  errorCount: o,
                  errorsActive: m,
                  setErrorsActive: b,
                  warningCount: i,
                  warningsActive: h,
                  setWarningsActive: y,
                  successCount: r,
                })
            )
          )
    )
  },
  'SidebarBottomBase'
)
const jd = /* @__PURE__ */ a(({ isDevelopment: e }) => {
  const t = oe()
  const o = t.getElements(Ce.experimental_TEST_PROVIDER)
  const { notifications: i } = Ne()
  const {
    hasStatuses: r,
    errorCount: n,
    warningCount: l,
    successCount: u,
  } = Eo(d =>
    Object.values(d).reduce(
      (p, f) => (
        Object.values(f).forEach(h => {
          ;((p.hasStatuses = !0),
            h.value === 'status-value:error' && (p.errorCount += 1),
            h.value === 'status-value:warning' && (p.warningCount += 1),
            h.value === 'status-value:success' && (p.successCount += 1))
        }),
        p
      ),
      { errorCount: 0, warningCount: 0, successCount: 0, hasStatuses: !1 }
    )
  )
  const c = ri()
  return /* @__PURE__ */ s.createElement(gS, {
    api: t,
    notifications: i,
    hasStatuses: r,
    errorCount: n,
    warningCount: l,
    successCount: u,
    isDevelopment: e,
    testProviderStates: c,
    registeredTestProviders: o,
    onRunAll: Jt.runAll,
  })
}, 'SidebarBottom')

// src/manager/components/sidebar/TagsFilterPanel.tsx
const yS = /* @__PURE__ */ new Set(['play-fn'])
const bS = I.div({
  minWidth: 180,
  maxWidth: 220,
})
const Kd = /* @__PURE__ */ a(
  ({ api: e, allTags: t, selectedTags: o, toggleTag: i, isDevelopment: r }) => {
    const n = t.filter(c => !yS.has(c))
    const l = e.getDocsUrl({
      subpath: 'writing-stories/tags#filtering-by-custom-tags',
    })
    const u = [
      t.map(c => {
        const d = o.includes(c)
        const p = `tag-${c}`
        return {
          id: p,
          title: c,
          right: /* @__PURE__ */ s.createElement('input', {
            type: 'checkbox',
            id: p,
            name: p,
            value: c,
            checked: d,
            onChange: () => {},
          }),
          onClick: /* @__PURE__ */ a(() => i(c), 'onClick'),
        }
      }),
    ]
    return (
      t.length === 0 &&
        u.push([
          {
            id: 'no-tags',
            title:
              'There are no tags. Use tags to organize and filter your Storybook.',
            isIndented: !1,
          },
        ]),
      n.length === 0 &&
        r &&
        u.push([
          {
            id: 'tags-docs',
            title: 'Learn how to add tags',
            icon: /* @__PURE__ */ s.createElement(tt, null),
            href: l,
          },
        ]),
      /* @__PURE__ */ s.createElement(
        bS,
        null,
        /* @__PURE__ */ s.createElement(ot, { links: u })
      )
    )
  },
  'TagsFilterPanel'
)

// src/manager/components/sidebar/TagsFilter.tsx
const vS = 'tags-filter'
const xS = /* @__PURE__ */ new Set([
  'dev',
  'docs-only',
  'test-only',
  'autodocs',
  'test',
  'attached-mdx',
  'unattached-mdx',
])
const IS = I.div({
  position: 'relative',
})
const SS = I(or)(({ theme: e }) => ({
  position: 'absolute',
  top: 7,
  right: 7,
  transform: 'translate(50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  height: 6,
  minWidth: 6,
  lineHeight: 'px',
  boxShadow: `${e.barSelectedColor} 0 0 0 1px inset`,
  fontSize: e.typography.size.s1 - 1,
  background: e.color.secondary,
  color: e.color.lightest,
}))
const $d = /* @__PURE__ */ a(
  ({ api: e, indexJson: t, initialSelectedTags: o = [], isDevelopment: i }) => {
    const [r, n] = K(o)
    const [l, u] = K(!1)
    const c = r.length > 0
    H(() => {
      e.experimental_setFilter(vS, y =>
        r.length === 0 ? !0 : r.some(m => y.tags?.includes(m))
      )
    }, [e, r])
    const d = Object.values(t.entries).reduce(
      (y, m) => (
        m.tags?.forEach(b => {
          xS.has(b) || y.add(b)
        }),
        y
      ),
      /* @__PURE__ */ new Set()
    )
    const p = A(
      y => {
        r.includes(y) ? n(r.filter(m => m !== y)) : n([...r, y])
      },
      [r, n]
    )
    const f = A(
      y => {
        ;(y.preventDefault(), u(!l))
      },
      [l, u]
    )
    if (d.size === 0 && !i) return null
    const h = Array.from(d)
    return (
      h.sort(),
      /* @__PURE__ */ s.createElement(
        ve,
        {
          placement: 'bottom',
          trigger: 'click',
          onVisibleChange: u,
          tooltip: () =>
            /* @__PURE__ */ s.createElement(Kd, {
              api: e,
              allTags: h,
              selectedTags: r,
              toggleTag: p,
              isDevelopment: i,
            }),
          closeOnOutsideClick: !0,
        },
        /* @__PURE__ */ s.createElement(
          IS,
          null,
          /* @__PURE__ */ s.createElement(
            ee,
            { key: 'tags', title: 'Tag filters', active: c, onClick: f },
            /* @__PURE__ */ s.createElement(Rn, null)
          ),
          r.length > 0 && /* @__PURE__ */ s.createElement(SS, null)
        )
      )
    )
  },
  'TagsFilter'
)

// src/manager/components/sidebar/useLastViewed.ts
const xn = Ve(Ud(), 1)
const Gd = qi(e => xn.default.set('lastViewedStoryIds', e), 1e3)
const qd = /* @__PURE__ */ a(e => {
  const t = G(() => {
    const r = xn.default.get('lastViewedStoryIds')
    return !r || !Array.isArray(r)
      ? []
      : r.some(n => typeof n === 'object' && n.storyId && n.refId)
        ? r
        : []
  }, [xn.default])
  const o = U(t)
  const i = A(
    r => {
      const n = o.current
      const l = n.findIndex(
        ({ storyId: u, refId: c }) => u === r.storyId && c === r.refId
      )
      l !== 0 &&
        (l === -1
          ? (o.current = [r, ...n])
          : (o.current = [r, ...n.slice(0, l), ...n.slice(l + 1)]),
        Gd(o.current))
    },
    [o]
  )
  return (
    H(() => {
      e && i(e)
    }, [e]),
    {
      getLastViewed: A(() => o.current, [o]),
      clearLastViewed: A(() => {
        ;((o.current = o.current.slice(0, 1)), Gd(o.current))
      }, [o]),
    }
  )
}, 'useLastViewed')

// src/manager/components/sidebar/Sidebar.tsx
var lt = 'storybook_internal'
const wS = I.nav(({ theme: e }) => ({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: e.background.content,
  [Qe]: {
    background: e.background.app,
  },
}))
const ES = I(pt)({
  paddingLeft: 12,
  paddingRight: 12,
  paddingBottom: 20,
  paddingTop: 16,
  flex: 1,
})
const TS = I(rt)({
  margin: 0,
})
const CS = I(ee)(({ theme: e, isMobile: t }) => ({
  color: e.color.mediumdark,
  width: t ? 36 : 32,
  height: t ? 36 : 32,
  borderRadius: e.appBorderRadius + 2,
}))
const _S = s.memo(
  /* @__PURE__ */ a(function ({ children: t, condition: o }) {
    const [i, r] = s.Children.toArray(t)
    return /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      /* @__PURE__ */ s.createElement(
        'div',
        { style: { display: o ? 'block' : 'none' } },
        i
      ),
      /* @__PURE__ */ s.createElement(
        'div',
        { style: { display: o ? 'none' : 'block' } },
        r
      )
    )
  }, 'Swap')
)
const kS = /* @__PURE__ */ a((e, t, o, i, r) => {
  const n = G(
    () => ({
      [lt]: {
        index: e,
        filteredIndex: e,
        indexError: t,
        previewInitialized: o,
        allStatuses: i,
        title: null,
        id: lt,
        url: 'iframe.html',
      },
      ...r,
    }),
    [r, e, t, o, i]
  )
  return G(() => ({ hash: n, entries: Object.entries(n) }), [n])
}, 'useCombination')
const OS = se.STORYBOOK_RENDERER === 'react'
const Yd = s.memo(
  /* @__PURE__ */ a(function ({
    // @ts-expect-error (non strict)
    storyId: t = null,
    refId: o = lt,
    index: i,
    indexJson: r,
    indexError: n,
    allStatuses: l,
    previewInitialized: u,
    menu: c,
    menuHighlighted: d = !1,
    enableShortcuts: p = !0,
    isDevelopment: f = se.CONFIG_TYPE === 'DEVELOPMENT',
    refs: h = {},
    onMenuClick: y,
    showCreateStoryButton: m = f && OS,
  }) {
    const [b, x] = K(!1)
    const E = G(() => t && { storyId: t, refId: o }, [t, o])
    const g = kS(i, n, u, l, h)
    const v = !i && !n
    const S = qd(E)
    const { isMobile: w } = ge()
    const k = oe()
    return /* @__PURE__ */ s.createElement(
      wS,
      { className: 'container sidebar-container', 'aria-label': 'Global' },
      /* @__PURE__ */ s.createElement(
        ir,
        { vertical: !0, offset: 3, scrollbarSize: 6 },
        /* @__PURE__ */ s.createElement(
          ES,
          { row: 1.6 },
          /* @__PURE__ */ s.createElement(Sp, {
            className: 'sidebar-header',
            menuHighlighted: d,
            menu: c,
            skipLinkHref: '#storybook-preview-wrapper',
            isLoading: v,
            onMenuClick: y,
          }),
          /* @__PURE__ */ s.createElement(
            Fd,
            {
              dataset: g,
              enableShortcuts: p,
              searchBarContent:
                m &&
                /* @__PURE__ */ s.createElement(
                  s.Fragment,
                  null,
                  /* @__PURE__ */ s.createElement(
                    ve,
                    {
                      trigger: 'hover',
                      hasChrome: !1,
                      tooltip: /* @__PURE__ */ s.createElement(TS, {
                        note: 'Create a new story',
                      }),
                    },
                    /* @__PURE__ */ s.createElement(
                      CS,
                      {
                        'aria-label': 'Create a new story',
                        isMobile: w,
                        onClick: () => {
                          x(!0)
                        },
                        variant: 'outline',
                      },
                      /* @__PURE__ */ s.createElement(Kn, null)
                    )
                  ),
                  /* @__PURE__ */ s.createElement(wc, {
                    open: b,
                    onOpenChange: x,
                  })
                ),
              searchFieldContent:
                r &&
                /* @__PURE__ */ s.createElement($d, {
                  api: k,
                  indexJson: r,
                  isDevelopment: f,
                }),
              ...S,
            },
            ({
              query: _,
              results: C,
              isBrowsing: T,
              closeMenu: O,
              getMenuProps: P,
              getItemProps: D,
              highlightedIndex: M,
            }) =>
              /* @__PURE__ */ s.createElement(
                _S,
                { condition: T },
                /* @__PURE__ */ s.createElement(bp, {
                  dataset: g,
                  selected: E,
                  isLoading: v,
                  isBrowsing: T,
                }),
                /* @__PURE__ */ s.createElement(Hd, {
                  query: _,
                  results: C,
                  closeMenu: O,
                  getMenuProps: P,
                  getItemProps: D,
                  highlightedIndex: M,
                  enableShortcuts: p,
                  isLoading: v,
                  clearLastViewed: S.clearLastViewed,
                })
              )
          )
        ),
        w || v
          ? null
          : /* @__PURE__ */ s.createElement(jd, { isDevelopment: f })
      )
    )
  }, 'Sidebar')
)

// src/manager/container/Menu.tsx
const PS = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root',
}
const AS = I.span(({ theme: e }) => ({
  display: 'inline-block',
  height: 16,
  lineHeight: '16px',
  textAlign: 'center',
  fontSize: '11px',
  background:
    e.base === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
  color: e.base === 'light' ? e.color.dark : e.textMutedColor,
  borderRadius: 2,
  userSelect: 'none',
  pointerEvents: 'none',
  padding: '0 6px',
}))
const DS = I.code({
  padding: 0,
  verticalAlign: 'middle',
  '& + &': {
    marginLeft: 6,
  },
})
const We = /* @__PURE__ */ a(
  ({ keys: e }) =>
    /* @__PURE__ */ s.createElement(
      AS,
      null,
      e.map(t => /* @__PURE__ */ s.createElement(DS, { key: t }, Ye([t])))
    ),
  'Shortcut'
)
const Qd = /* @__PURE__ */ a((e, t, o, i, r, n, l) => {
  const u = t.getShortcutKeys()
  const c = G(
    () => ({
      id: 'about',
      title: 'About your Storybook',
      onClick: /* @__PURE__ */ a(() => t.changeSettingsTab('about'), 'onClick'),
      icon: /* @__PURE__ */ s.createElement(Hn, null),
    }),
    [t]
  )
  const d = G(
    () => ({
      id: 'documentation',
      title: 'Documentation',
      href: t.getDocsUrl({ versioned: !0, renderer: !0 }),
      icon: /* @__PURE__ */ s.createElement(tt, null),
    }),
    [t]
  )
  const p =
    e.whatsNewData?.status === 'SUCCESS' && !e.disableWhatsNewNotifications
  const f = t.isWhatsNewUnread()
  const h = G(
    () => ({
      id: 'whats-new',
      title: "What's new?",
      onClick: /* @__PURE__ */ a(
        () => t.changeSettingsTab('whats-new'),
        'onClick'
      ),
      right:
        p &&
        f &&
        /* @__PURE__ */ s.createElement(
          or,
          { status: 'positive' },
          'Check it out'
        ),
      icon: /* @__PURE__ */ s.createElement(Zn, null),
    }),
    [t, p, f]
  )
  const y = G(
    () => ({
      id: 'shortcuts',
      title: 'Keyboard shortcuts',
      onClick: /* @__PURE__ */ a(
        () => t.changeSettingsTab('shortcuts'),
        'onClick'
      ),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.shortcutsPage })
        : null,
      icon: /* @__PURE__ */ s.createElement(Pn, null),
    }),
    [t, l, u.shortcutsPage]
  )
  const m = G(
    () => ({
      id: 'S',
      title: 'Show sidebar',
      onClick: /* @__PURE__ */ a(() => t.toggleNav(), 'onClick'),
      active: n,
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.toggleNav })
        : null,
      icon: n ? /* @__PURE__ */ s.createElement(Be, null) : null,
    }),
    [t, l, u, n]
  )
  const b = G(
    () => ({
      id: 'T',
      title: 'Show toolbar',
      onClick: /* @__PURE__ */ a(() => t.toggleToolbar(), 'onClick'),
      active: o,
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.toolbar })
        : null,
      icon: o ? /* @__PURE__ */ s.createElement(Be, null) : null,
    }),
    [t, l, u, o]
  )
  const x = G(
    () => ({
      id: 'A',
      title: 'Show addons panel',
      onClick: /* @__PURE__ */ a(() => t.togglePanel(), 'onClick'),
      active: r,
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.togglePanel })
        : null,
      icon: r ? /* @__PURE__ */ s.createElement(Be, null) : null,
    }),
    [t, l, u, r]
  )
  const E = G(
    () => ({
      id: 'D',
      title: 'Change addons orientation',
      onClick: /* @__PURE__ */ a(() => t.togglePanelPosition(), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.panelPosition })
        : null,
    }),
    [t, l, u]
  )
  const g = G(
    () => ({
      id: 'F',
      title: 'Go full screen',
      onClick: /* @__PURE__ */ a(() => t.toggleFullscreen(), 'onClick'),
      active: i,
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.fullScreen })
        : null,
      icon: i ? /* @__PURE__ */ s.createElement(Be, null) : null,
    }),
    [t, l, u, i]
  )
  const v = G(
    () => ({
      id: '/',
      title: 'Search',
      onClick: /* @__PURE__ */ a(
        () => t.focusOnUIElement(PS.storySearchField),
        'onClick'
      ),
      right: l ? /* @__PURE__ */ s.createElement(We, { keys: u.search }) : null,
    }),
    [t, l, u]
  )
  const S = G(
    () => ({
      id: 'up',
      title: 'Previous component',
      onClick: /* @__PURE__ */ a(() => t.jumpToComponent(-1), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.prevComponent })
        : null,
    }),
    [t, l, u]
  )
  const w = G(
    () => ({
      id: 'down',
      title: 'Next component',
      onClick: /* @__PURE__ */ a(() => t.jumpToComponent(1), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.nextComponent })
        : null,
    }),
    [t, l, u]
  )
  const k = G(
    () => ({
      id: 'prev',
      title: 'Previous story',
      onClick: /* @__PURE__ */ a(() => t.jumpToStory(-1), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.prevStory })
        : null,
    }),
    [t, l, u]
  )
  const _ = G(
    () => ({
      id: 'next',
      title: 'Next story',
      onClick: /* @__PURE__ */ a(() => t.jumpToStory(1), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.nextStory })
        : null,
    }),
    [t, l, u]
  )
  const C = G(
    () => ({
      id: 'collapse',
      title: 'Collapse all',
      onClick: /* @__PURE__ */ a(() => t.emit(ho), 'onClick'),
      right: l
        ? /* @__PURE__ */ s.createElement(We, { keys: u.collapseAll })
        : null,
    }),
    [t, l, u]
  )
  const T = A(() => {
    const O = t.getAddonsShortcuts()
    const P = u
    return Object.entries(O)
      .filter(([D, { showInMenu: M }]) => M)
      .map(([D, { label: M, action: F }]) => ({
        id: D,
        title: M,
        onClick: /* @__PURE__ */ a(() => F(), 'onClick'),
        right: l ? /* @__PURE__ */ s.createElement(We, { keys: P[D] }) : null,
      }))
  }, [t, l, u])
  return G(
    () => [
      [
        c,
        ...(e.whatsNewData?.status === 'SUCCESS' ? [h] : []),
        d,
        ...(l ? [y] : []),
      ],
      [m, b, x, E, g, v, S, w, k, _, C],
      T(),
    ],
    [c, e, h, d, y, m, b, x, E, g, v, S, w, k, _, C, T, l]
  )
}, 'useMenu')

// src/manager/container/Sidebar.tsx
const MS = s.memo(
  /* @__PURE__ */ a(function ({ onMenuClick: t }) {
    return /* @__PURE__ */ s.createElement(
      me,
      {
        filter: /* @__PURE__ */ a(({ state: i, api: r }) => {
          const {
            ui: { name: n, url: l, enableShortcuts: u },
            viewMode: c,
            storyId: d,
            refId: p,
            layout: { showToolbar: f },
            // FIXME: This is the actual `index.json` index where the `index` below
            // is actually the stories hash. We should fix this up and make it consistent.
            internal_index: h,
            filteredIndex: y,
            indexError: m,
            previewInitialized: b,
            refs: x,
          } = i
          const E = Qd(
            i,
            r,
            f,
            r.getIsFullscreen(),
            r.getIsPanelShown(),
            r.getIsNavShown(),
            u
          )
          const g =
            i.whatsNewData?.status === 'SUCCESS' &&
            !i.disableWhatsNewNotifications
          return {
            title: n,
            url: l,
            indexJson: h,
            index: y,
            indexError: m,
            previewInitialized: b,
            refs: x,
            storyId: d,
            refId: p,
            viewMode: c,
            menu: E,
            menuHighlighted: g && r.isWhatsNewUnread(),
            enableShortcuts: u,
          }
        }, 'mapper'),
      },
      i => {
        const r = Eo()
        return /* @__PURE__ */ s.createElement(Yd, {
          ...i,
          allStatuses: r,
          onMenuClick: t,
        })
      }
    )
  }, 'Sideber')
)
const Xd = MS

// src/manager/App.tsx
const Zd = /* @__PURE__ */ a(
  ({
    managerLayoutState: e,
    setManagerLayoutState: t,
    pages: o,
    hasTab: i,
  }) => {
    const { setMobileAboutOpen: r } = ge()
    return /* @__PURE__ */ s.createElement(
      s.Fragment,
      null,
      /* @__PURE__ */ s.createElement(eo, { styles: Ea }),
      /* @__PURE__ */ s.createElement(Yl, {
        hasTab: i,
        managerLayoutState: e,
        setManagerLayoutState: t,
        slotMain: /* @__PURE__ */ s.createElement(Vu, {
          id: 'main',
          withLoader: !0,
        }),
        slotSidebar: /* @__PURE__ */ s.createElement(Xd, {
          onMenuClick: () => r(n => !n),
        }),
        slotPanel: /* @__PURE__ */ s.createElement(Zl, null),
        slotPages: o.map(({ id: n, render: l }) =>
          /* @__PURE__ */ s.createElement(l, { key: n })
        ),
      })
    )
  },
  'App'
)

// src/manager/provider.ts
const Gs = class Gs {
  getElements(t) {
    throw new Error('Provider.getElements() is not implemented!')
  }

  handleAPI(t) {
    throw new Error('Provider.handleAPI() is not implemented!')
  }

  getConfig() {
    return (console.error('Provider.getConfig() is not implemented!'), {})
  }
}
a(Gs, 'Provider')
const Yt = Gs

// src/manager/settings/About.tsx
const LS = I.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 40,
})
const NS = I.header({
  marginBottom: 32,
  alignItems: 'center',
  display: 'flex',
  '> svg': {
    height: 48,
    width: 'auto',
    marginRight: 8,
  },
})
const FS = I.div(({ theme: e }) => ({
  marginBottom: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: e.base === 'light' ? e.color.dark : e.color.lightest,
  fontWeight: e.typography.weight.regular,
  fontSize: e.typography.size.s2,
}))
const RS = I.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 24,
  marginTop: 24,
  gap: 16,
})
const Jd = I(Pe)(({ theme: e }) => ({
  '&&': {
    fontWeight: e.typography.weight.bold,
    color: e.base === 'light' ? e.color.dark : e.color.light,
  },
  '&:hover': {
    color: e.base === 'light' ? e.color.darkest : e.color.lightest,
  },
}))
const ef = /* @__PURE__ */ a(
  ({ onNavigateToWhatsNew: e }) =>
    /* @__PURE__ */ s.createElement(
      LS,
      null,
      /* @__PURE__ */ s.createElement(
        NS,
        null,
        /* @__PURE__ */ s.createElement(sr, { alt: 'Storybook' })
      ),
      /* @__PURE__ */ s.createElement(Er, { onNavigateToWhatsNew: e }),
      /* @__PURE__ */ s.createElement(
        FS,
        null,
        /* @__PURE__ */ s.createElement(
          RS,
          null,
          /* @__PURE__ */ s.createElement(
            he,
            { asChild: !0 },
            /* @__PURE__ */ s.createElement(
              'a',
              { href: 'https://github.com/storybookjs/storybook' },
              /* @__PURE__ */ s.createElement(vo, null),
              'GitHub'
            )
          ),
          /* @__PURE__ */ s.createElement(
            he,
            { asChild: !0 },
            /* @__PURE__ */ s.createElement(
              'a',
              { href: 'https://storybook.js.org/docs' },
              /* @__PURE__ */ s.createElement(Pt, {
                style: {
                  display: 'inline',
                  marginRight: 5,
                },
              }),
              'Documentation'
            )
          )
        ),
        /* @__PURE__ */ s.createElement(
          'div',
          null,
          'Open source software maintained by',
          ' ',
          /* @__PURE__ */ s.createElement(
            Jd,
            { href: 'https://www.chromatic.com/' },
            'Chromatic'
          ),
          ' and the',
          ' ',
          /* @__PURE__ */ s.createElement(
            Jd,
            {
              href: 'https://github.com/storybookjs/storybook/graphs/contributors',
            },
            'Storybook Community'
          )
        )
      )
    ),
  'AboutScreen'
)

// src/manager/settings/AboutPage.tsx
const Ys = class Ys extends Le {
  componentDidMount() {
    const { api: t, notificationId: o } = this.props
    t.clearNotification(o)
  }

  render() {
    const { children: t } = this.props
    return t
  }
}
a(Ys, 'NotificationClearer')
const qs = Ys
const tf = /* @__PURE__ */ a(() => {
  const e = oe()
  const t = Ne()
  const o = A(() => {
    e.changeSettingsTab('whats-new')
  }, [e])
  return /* @__PURE__ */ s.createElement(
    qs,
    { api: e, notificationId: 'update' },
    /* @__PURE__ */ s.createElement(ef, {
      onNavigateToWhatsNew: t.whatsNewData?.status === 'SUCCESS' ? o : void 0,
    })
  )
}, 'AboutPage')

// src/manager/settings/SettingsFooter.tsx
const BS = I.div(({ theme: e }) => ({
  display: 'flex',
  paddingTop: 20,
  marginTop: 20,
  borderTop: `1px solid ${e.appBorderColor}`,
  fontWeight: e.typography.weight.bold,
  '& > * + *': {
    marginLeft: 20,
  },
}))
const HS = /* @__PURE__ */ a(
  e =>
    /* @__PURE__ */ s.createElement(
      BS,
      { ...e },
      /* @__PURE__ */ s.createElement(
        Pe,
        {
          secondary: !0,
          href: '\
https://storybook.js.org',
          cancel: !1,
          target: '_blank',
        },
        'Docs'
      ),
      /* @__PURE__ */ s.createElement(
        Pe,
        {
          secondary: !0,
          href: 'https://gith\
ub.com/storybookjs/storybook',
          cancel: !1,
          target: '_blank',
        },
        'GitHub'
      ),
      /* @__PURE__ */ s.createElement(
        Pe,
        {
          secondary: !0,
          href: 'https://storybook.js.org/community#support',
          cancel: !1,
          target: '_blank',
        },
        'Support'
      )
    ),
  'SettingsFooter'
)
const of = HS

// src/manager/settings/shortcuts.tsx
const zS = I.header(({ theme: e }) => ({
  marginBottom: 20,
  fontSize: e.typography.size.m3,
  fontWeight: e.typography.weight.bold,
  alignItems: 'center',
  display: 'flex',
}))
const rf = I.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
}))
const WS = I.div({
  alignSelf: 'flex-end',
  display: 'grid',
  margin: '10px 0',
  gridTemplateColumns: '1fr 1fr 12px',
  '& > *:last-of-type': {
    gridColumn: '2 / 2',
    justifySelf: 'flex-end',
    gridRow: '1',
  },
})
const VS = I.div(({ theme: e }) => ({
  padding: '6px 0',
  borderTop: `1px solid ${e.appBorderColor}`,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 0px',
}))
const jS = I.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridAutoRows: 'minmax(auto, auto)',
  marginBottom: 20,
})
const KS = I.div({
  alignSelf: 'center',
})
const $S = I(rr.Input)(
  ({ valid: e, theme: t }) =>
    e === 'error'
      ? {
          animation: `${t.animation.jiggle} 700ms ease-out`,
        }
      : {},
  {
    display: 'flex',
    width: 80,
    flexDirection: 'column',
    justifySelf: 'flex-end',
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
  }
)
const US = Dt`
0%,100% { opacity: 0; }
  50% { opacity: 1; }
`
const GS = I(Be)(
  ({ valid: e, theme: t }) =>
    e === 'valid'
      ? {
          color: t.color.positive,
          animation: `${US} 2s ease forwards`,
        }
      : {
          opacity: 0,
        },
  {
    alignSelf: 'center',
    display: 'flex',
    marginLeft: 10,
    height: 14,
    width: 14,
  }
)
const qS = I.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  padding: '3rem 20px',
  maxWidth: 600,
  margin: '0 auto',
}))
const YS = {
  fullScreen: 'Go full screen',
  togglePanel: 'Toggle addons',
  panelPosition: 'Toggle addons orientation',
  toggleNav: 'Toggle sidebar',
  toolbar: 'Toggle canvas toolbar',
  search: 'Focus search',
  focusNav: 'Focus sidebar',
  focusIframe: 'Focus canvas',
  focusPanel: 'Focus addons',
  prevComponent: 'Previous component',
  nextComponent: 'Next component',
  prevStory: 'Previous story',
  nextStory: 'Next story',
  shortcutsPage: 'Go to shortcuts page',
  aboutPage: 'Go to about page',
  collapseAll: 'Collapse all items on sidebar',
  expandAll: 'Expand all items on sidebar',
  remount: 'Remount component',
}
const QS = ['escape']
function Qs(e) {
  return Object.entries(e).reduce(
    // @ts-expect-error (non strict)
    (t, [o, i]) =>
      QS.includes(o) ? t : { ...t, [o]: { shortcut: i, error: !1 } },
    {}
  )
}
a(Qs, 'toShortcutState')
const Xs = class Xs extends Le {
  constructor(o) {
    super(o)
    this.onKeyDown = /* @__PURE__ */ a(o => {
      const { activeFeature: i, shortcutKeys: r } = this.state
      if (o.key === 'Backspace') return this.restoreDefault()
      const n = va(o)
      if (!n) return !1
      const l = !!Object.entries(r).find(
        ([u, { shortcut: c }]) => u !== i && c && xa(n, c)
      )
      return this.setState({
        shortcutKeys: { ...r, [i]: { shortcut: n, error: l } },
      })
    }, 'onKeyDown')
    this.onFocus = /* @__PURE__ */ a(
      o => () => {
        const { shortcutKeys: i } = this.state
        this.setState({
          activeFeature: o,
          shortcutKeys: {
            ...i,
            [o]: { shortcut: null, error: !1 },
          },
        })
      },
      'onFocus'
    )
    this.onBlur = /* @__PURE__ */ a(async () => {
      const { shortcutKeys: o, activeFeature: i } = this.state
      if (o[i]) {
        const { shortcut: r, error: n } = o[i]
        return !r || n ? this.restoreDefault() : this.saveShortcut()
      }
      return !1
    }, 'onBlur')
    this.saveShortcut = /* @__PURE__ */ a(async () => {
      const { activeFeature: o, shortcutKeys: i } = this.state
      const { setShortcut: r } = this.props
      ;(await r(o, i[o].shortcut), this.setState({ successField: o }))
    }, 'saveShortcut')
    this.restoreDefaults = /* @__PURE__ */ a(async () => {
      const { restoreAllDefaultShortcuts: o } = this.props
      const i = await o()
      return this.setState({ shortcutKeys: Qs(i) })
    }, 'restoreDefaults')
    this.restoreDefault = /* @__PURE__ */ a(async () => {
      const { activeFeature: o, shortcutKeys: i } = this.state
      const { restoreDefaultShortcut: r } = this.props
      const n = await r(o)
      return this.setState({
        shortcutKeys: {
          ...i,
          ...Qs({ [o]: n }),
        },
      })
    }, 'restoreDefault')
    this.displaySuccessMessage = /* @__PURE__ */ a(o => {
      const { successField: i, shortcutKeys: r } = this.state
      return o === i && r[o].error === !1 ? 'valid' : void 0
    }, 'displaySuccessMessage')
    this.displayError = /* @__PURE__ */ a(o => {
      const { activeFeature: i, shortcutKeys: r } = this.state
      return o === i && r[o].error === !0 ? 'error' : void 0
    }, 'displayError')
    this.renderKeyInput = /* @__PURE__ */ a(() => {
      const { shortcutKeys: o, addonsShortcutLabels: i } = this.state
      return Object.entries(o).map(([n, { shortcut: l }]) =>
        /* @__PURE__ */ s.createElement(
          VS,
          { key: n },
          /* @__PURE__ */ s.createElement(KS, null, YS[n] || i[n]),
          /* @__PURE__ */ s.createElement($S, {
            spellCheck: 'false',
            valid: this.displayError(n),
            className: 'modalInput',
            onBlur: this.onBlur,
            onFocus: this.onFocus(n),
            onKeyDown: this.onKeyDown,
            value: l ? Ye(l) : '',
            placeholder: 'Type keys',
            readOnly: !0,
          }),
          /* @__PURE__ */ s.createElement(GS, {
            valid: this.displaySuccessMessage(n),
          })
        )
      )
    }, 'renderKeyInput')
    this.renderKeyForm = /* @__PURE__ */ a(
      () =>
        /* @__PURE__ */ s.createElement(
          jS,
          null,
          /* @__PURE__ */ s.createElement(
            WS,
            null,
            /* @__PURE__ */ s.createElement(rf, null, 'Commands'),
            /* @__PURE__ */ s.createElement(rf, null, 'Shortcut')
          ),
          this.renderKeyInput()
        ),
      'renderKeyForm'
    )
    this.state = {
      // @ts-expect-error (non strict)
      activeFeature: void 0,
      // @ts-expect-error (non strict)
      successField: void 0,
      // The initial shortcutKeys that come from props are the defaults/what was saved
      // As the user interacts with the page, the state stores the temporary, unsaved shortcuts
      // This object also includes the error attached to each shortcut
      // @ts-expect-error (non strict)
      shortcutKeys: Qs(o.shortcutKeys),
      addonsShortcutLabels: o.addonsShortcutLabels,
    }
  }

  render() {
    const o = this.renderKeyForm()
    return /* @__PURE__ */ s.createElement(
      qS,
      null,
      /* @__PURE__ */ s.createElement(zS, null, 'Keyboard shortcuts'),
      o,
      /* @__PURE__ */ s.createElement(
        he,
        {
          variant: 'outline',
          size: 'small',
          id: 'restoreDefaultsHotkeys',
          onClick: this.restoreDefaults,
        },
        'Restore defaults'
      ),
      /* @__PURE__ */ s.createElement(of, null)
    )
  }
}
a(Xs, 'ShortcutsScreen')
const In = Xs

// src/manager/settings/ShortcutsPage.tsx
const nf = /* @__PURE__ */ a(
  () =>
    /* @__PURE__ */ s.createElement(
      me,
      null,
      ({
        api: {
          getShortcutKeys: e,
          getAddonsShortcutLabels: t,
          setShortcut: o,
          restoreDefaultShortcut: i,
          restoreAllDefaultShortcuts: r,
        },
      }) =>
        /* @__PURE__ */ s.createElement(In, {
          shortcutKeys: e(),
          addonsShortcutLabels: t(),
          setShortcut: o,
          restoreDefaultShortcut: i,
          restoreAllDefaultShortcuts: r,
        })
    ),
  'ShortcutsPage'
)

// src/manager/settings/whats_new.tsx
const sf = I.div({
  top: '50%',
  position: 'absolute',
  transform: 'translateY(-50%)',
  width: '100%',
  textAlign: 'center',
})
const XS = I.div({
  position: 'relative',
  height: '32px',
})
const af = I.div(({ theme: e }) => ({
  paddingTop: '12px',
  color: e.textMutedColor,
  maxWidth: '295px',
  margin: '0 auto',
  fontSize: `${e.typography.size.s1}px`,
  lineHeight: '16px',
}))
const ZS = I.div(({ theme: e }) => ({
  position: 'absolute',
  width: '100%',
  bottom: '40px',
  background: e.background.bar,
  fontSize: '13px',
  borderTop: '1px solid',
  borderColor: e.appBorderColor,
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))
const JS = /* @__PURE__ */ a(
  ({ isNotificationsEnabled: e, onToggleNotifications: t, onCopyLink: o }) => {
    const i = De()
    const [r, n] = K('Copy Link')
    const l = /* @__PURE__ */ a(() => {
      ;(o(), n('Copied!'), setTimeout(() => n('Copy Link'), 4e3))
    }, 'copyLink')
    return /* @__PURE__ */ s.createElement(
      ZS,
      null,
      /* @__PURE__ */ s.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        /* @__PURE__ */ s.createElement(Bn, { color: i.color.mediumdark }),
        /* @__PURE__ */ s.createElement(
          'div',
          null,
          'Share this with your tea\
m.'
        ),
        /* @__PURE__ */ s.createElement(
          he,
          { onClick: l, size: 'small', variant: 'ghost' },
          r
        )
      ),
      e
        ? /* @__PURE__ */ s.createElement(
            he,
            {
              size: '\
small',
              variant: 'ghost',
              onClick: t,
            },
            /* @__PURE__ */ s.createElement(Ln, null),
            'Hide notifications'
          )
        : /* @__PURE__ */ s.createElement(
            he,
            { size: 'small', variant: 'ghost', onClick: t },
            /* @__PURE__ */ s.createElement(Nn, null),
            'Show notifications'
          )
    )
  },
  'WhatsNewFooter'
)
const ew = I.iframe(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    margin: 0,
    padding: 0,
    width: '100%',
    height: 'calc(100% - 80px)',
    background: 'white',
  },
  ({ isLoaded: e }) => ({ visibility: e ? 'visible' : 'hidden' })
)
const tw = I(e => /* @__PURE__ */ s.createElement(go, { ...e }))(
  ({ theme: e }) => ({
    color: e.textMutedColor,
    width: 32,
    height: 32,
    margin: '0 auto',
  })
)
const ow = /* @__PURE__ */ a(
  () =>
    /* @__PURE__ */ s.createElement(
      sf,
      null,
      /* @__PURE__ */ s.createElement(
        XS,
        null,
        /* @__PURE__ */ s.createElement(nr, null)
      ),
      /* @__PURE__ */ s.createElement(af, null, 'Loading...')
    ),
  'WhatsNewLoader'
)
const rw = /* @__PURE__ */ a(
  () =>
    /* @__PURE__ */ s.createElement(
      sf,
      null,
      /* @__PURE__ */ s.createElement(tw, null),
      /* @__PURE__ */ s.createElement(
        af,
        null,
        "The page couldn't be loaded. Check your inte\
rnet connection and try again."
      )
    ),
  'MaxWaitTimeMessaging'
)
const nw = /* @__PURE__ */ a(
  ({
    didHitMaxWaitTime: e,
    isLoaded: t,
    onLoad: o,
    url: i,
    onCopyLink: r,
    onToggleNotifications: n,
    isNotificationsEnabled: l,
  }) =>
    /* @__PURE__ */ s.createElement(
      Ee,
      null,
      !t && !e && /* @__PURE__ */ s.createElement(ow, null),
      e
        ? /* @__PURE__ */ s.createElement(rw, null)
        : /* @__PURE__ */ s.createElement(
            s.Fragment,
            null,
            /* @__PURE__ */ s.createElement(ew, {
              isLoaded: t,
              onLoad: o,
              src: i,
              title:
                "What\
's new?",
            }),
            /* @__PURE__ */ s.createElement(JS, {
              isNotificationsEnabled: l,
              onToggleNotifications: n,
              onCopyLink: r,
            })
          )
    ),
  'PureWhatsNewScreen'
)
const iw = 1e4
const lf = /* @__PURE__ */ a(() => {
  const e = oe()
  const t = Ne()
  const { whatsNewData: o } = t
  const [i, r] = K(!1)
  const [n, l] = K(!1)
  if (
    (H(() => {
      const c = setTimeout(() => !i && l(!0), iw)
      return () => clearTimeout(c)
    }, [i]),
    o?.status !== 'SUCCESS')
  )
    return null
  const u = !o.disableWhatsNewNotifications
  return /* @__PURE__ */ s.createElement(nw, {
    didHitMaxWaitTime: n,
    isLoaded: i,
    onLoad: () => {
      ;(e.whatsNewHasBeenRead(), r(!0))
    },
    url: o.url,
    isNotificationsEnabled: u,
    onCopyLink: () => {
      navigator.clipboard?.writeText(o.blogUrl ?? o.url)
    },
    onToggleNotifications: () => {
      u
        ? se.confirm(
            'All update notifications will no longer be shown. Are you sure?'
          ) && e.toggleWhatsNewNotifications()
        : e.toggleWhatsNewNotifications()
    },
  })
}, 'WhatsNewScreen')

// src/manager/settings/whats_new_page.tsx
const uf = /* @__PURE__ */ a(
  () => /* @__PURE__ */ s.createElement(lf, null),
  'WhatsNewPage'
)

// src/manager/settings/index.tsx
const { document: cf } = se
const sw = I.div(({ theme: e }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 40,
  boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
  background: e.barBg,
  paddingRight: 8,
}))
const Zs = s.memo(
  /* @__PURE__ */ a(function ({ changeTab: t, id: o, title: i }) {
    return /* @__PURE__ */ s.createElement(dr, null, ({ path: r }) => {
      const n = r.includes(`settings/${o}`)
      return /* @__PURE__ */ s.createElement(
        lr,
        {
          id: `tabbutton-${o}`,
          className: ['tabbutton']
            .concat(n ? ['tabbutton-active'] : [])
            .join(' '),
          type: 'button',
          key: 'id',
          active: n,
          onClick: () => t(o),
          role: 'tab',
        },
        i
      )
    })
  }, 'TabBarButton')
)
const aw = I(ir)(({ theme: e }) => ({
  background: e.background.content,
}))
const lw = /* @__PURE__ */ a(
  ({
    changeTab: e,
    onClose: t,
    enableShortcuts: o = !0,
    enableWhatsNew: i,
  }) => (
    s.useEffect(() => {
      const r = /* @__PURE__ */ a(n => {
        !o ||
          n.repeat ||
          (Et(!1, n) && $e('Escape', n) && (n.preventDefault(), t()))
      }, 'handleEscape')
      return (
        cf.addEventListener('keydown', r),
        () => cf.removeEventListener('keydown', r)
      )
    }, [o, t]),
    /* @__PURE__ */ s.createElement(
      Ee,
      null,
      /* @__PURE__ */ s.createElement(
        sw,
        { className: 'sb-bar' },
        /* @__PURE__ */ s.createElement(
          ar,
          { role: 'tablist' },
          /* @__PURE__ */ s.createElement(Zs, {
            id: 'about',
            title: 'About',
            changeTab: e,
          }),
          i &&
            /* @__PURE__ */ s.createElement(Zs, {
              id: 'whats-new',
              title: "What's new?",
              changeTab: e,
            }),
          /* @__PURE__ */ s.createElement(Zs, {
            id: 'shortcuts',
            title:
              'Keyboard shortc\
uts',
            changeTab: e,
          })
        ),
        /* @__PURE__ */ s.createElement(
          ee,
          {
            onClick: r => (r.preventDefault(), t()),
            title: 'Close settings page',
          },
          /* @__PURE__ */ s.createElement(je, null)
        )
      ),
      /* @__PURE__ */ s.createElement(
        aw,
        { vertical: !0, horizontal: !1 },
        /* @__PURE__ */ s.createElement(
          To,
          { path: 'about' },
          /* @__PURE__ */ s.createElement(tf, { key: 'about' })
        ),
        /* @__PURE__ */ s.createElement(
          To,
          { path: 'whats-new' },
          /* @__PURE__ */ s.createElement(uf, {
            key: '\
whats-new',
          })
        ),
        /* @__PURE__ */ s.createElement(
          To,
          { path: 'shortcuts' },
          /* @__PURE__ */ s.createElement(nf, { key: 'shortcuts' })
        )
      )
    )
  ),
  'P\
ages'
)
const uw = /* @__PURE__ */ a(() => {
  const e = oe()
  const t = Ne()
  const o = /* @__PURE__ */ a(i => e.changeSettingsTab(i), 'changeTab')
  return /* @__PURE__ */ s.createElement(lw, {
    enableWhatsNew: t.whatsNewData?.status === 'SUCCESS',
    enableShortcuts: t.ui.enableShortcuts,
    changeTab: o,
    onClose: e.closeSettings,
  })
}, 'SettingsPages')
const pf = {
  id: 'settings',
  url: '/settings/',
  title: 'Settings',
  type: be.experimental_PAGE,
  render: /* @__PURE__ */ a(
    () =>
      /* @__PURE__ */ s.createElement(
        To,
        { path: '/settings/', startsWith: !0 },
        /* @__PURE__ */ s.createElement(uw, null)
      ),
    'render'
  ),
}

// src/manager/index.tsx
ni.displayName = 'ThemeProvider'
vt.displayName = 'HelmetProvider'
const cw = /* @__PURE__ */ a(
  ({ provider: e }) =>
    /* @__PURE__ */ s.createElement(
      vt,
      { key: 'helmet.Provider' },
      /* @__PURE__ */ s.createElement(
        Ua,
        { key: 'location.provider' },
        /* @__PURE__ */ s.createElement(pw, { provider: e })
      )
    ),
  'Root'
)
var pw = /* @__PURE__ */ a(({ provider: e }) => {
  const t = qa()
  return /* @__PURE__ */ s.createElement(dr, { key: 'location.consumer' }, o =>
    /* @__PURE__ */ s.createElement(
      ba,
      {
        key: 'manager',
        provider: e,
        ...o,
        navigate: t,
        docsOptions: se?.DOCS_OPTIONS || {},
      },
      i => {
        const { state: r, api: n } = i
        const l = A(
          c => {
            n.setSizes(c)
          },
          [n]
        )
        const u = G(
          () => [pf, ...Object.values(n.getElements(be.experimental_PAGE))],
          [Object.keys(n.getElements(be.experimental_PAGE)).join()]
        )
        return /* @__PURE__ */ s.createElement(
          ni,
          { key: 'theme.provider', theme: Ta(r.theme) },
          /* @__PURE__ */ s.createElement(
            xl,
            null,
            /* @__PURE__ */ s.createElement(Zd, {
              key: 'app',
              pages: u,
              managerLayoutState: {
                ...r.layout,
                viewMode: r.viewMode,
              },
              hasTab: !!n.getQueryParam('tab'),
              setManagerLayoutState: l,
            })
          )
        )
      }
    )
  )
}, 'Main')
function df(e, t) {
  if (!(t instanceof Yt)) throw new $a()
  Ka(e).render(
    /* @__PURE__ */ s.createElement(cw, { key: 'root', provider: t })
  )
}
a(df, 'renderStorybookUI')

// src/manager/runtime.tsx
const dw = 'CORE/WS_DISCONNECTED'
He.register(bt, () =>
  He.add(bt, {
    title: bt,
    type: be.TOOL,
    match: /* @__PURE__ */ a(({ tabId: e }) => !e, 'match'),
    render: /* @__PURE__ */ a(
      () => /* @__PURE__ */ s.createElement(ja, null),
      'render'
    ),
  })
)
const ea = class ea extends Yt {
  constructor() {
    super()
    this.wsDisconnected = !1
    const o = sa({ page: 'manager' })
    ;(He.setChannel(o),
      o.emit(ua),
      (this.addons = He),
      (this.channel = o),
      (se.__STORYBOOK_ADDONS_CHANNEL__ = o))
  }

  getElements(o) {
    return this.addons.getElements(o)
  }

  getConfig() {
    return this.addons.getConfig()
  }

  handleAPI(o) {
    ;(this.addons.loadAddons(o),
      this.channel.on(ca, i => {
        ;((this.wsDisconnected = !0),
          o.addNotification({
            id: dw,
            content: {
              headline:
                i.code === 3008 ? 'Server timed out' : 'Connection lost',
              subHeadline:
                'Please restart your Storybook server and reload the page',
            },
            icon: /* @__PURE__ */ s.createElement(Fn, { color: wa.negative }),
            link: void 0,
          }))
      }))
  }
}
a(ea, 'ReactProvider')
const Js = ea
const { document: fw } = se
const mw = fw.getElementById('root')
setTimeout(() => {
  df(mw, new Js())
}, 0)
