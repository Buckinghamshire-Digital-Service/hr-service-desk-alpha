
export function isInBrowser () {
  return typeof window !== 'undefined' && window.document
}

export function isArray (obj) {
  return obj.constructor === Array
}

export function returnId (str) {
  return str.toLowerCase().trim().replace(/[^\w\s]|_/g, '').replace(/ /g, '-')
}

export function stringContains (haystack, needles) {
  if (isArray(needles)) {
    for (let needle of needles) {
      if (stringContains(haystack, needle)) return true
    }
    return false
  } else {
    return haystack.indexOf(needles) !== -1
  }
}

export function getObjectKeys (obj) {
  let keys = []
  for (let key in obj) {
    if (!obj.hasOwnProperty) { continue }
    keys.push(key)
  }
  return keys
}

export function isEmpty (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export const removeMarkdown = (string) => string.replace(/#|\*|_|-|\|>|\[|\]|\(.*\)|`/g, '')
export const removeTags = (string) => string.replace(/<\/?[^>]+(>|$)/g, '')
export const replaceNewLine = (str, replacement) => str.replace(/(?:\r\n|\r|\n)/g, replacement)

/**
 * Usage: getIfExists(obj, 'prop1.prop2')
 * Returns undefined if it does not exist
 * @param {*} obj
 * @param {*} key
 */
export function getIfExists (obj, key) {
  return key.split('.').reduce(function (o, x) {
    return (typeof o === 'undefined' || o === null) ? o : o[x]
  }, obj)
}

export function exists (obj, key) {
  return key.split('.').every(function (x) {
    if (typeof obj !== 'object' || obj === null || !(x in obj)) {
      return false
    }
    obj = obj[x]
    return true
  })
}

/**
 * https://gist.github.com/larsonjj/2bf44f1925237d67d5b65f74bc9e88f0
 * Animate scroll of a specified HTML Element (ease-in-out)
 * @param {HTMLElement} element HTML element's scroll to animate
 * @param {Number} to Scroll-Y position to scroll to
 * @param {Number} duration How long (ms) the animation should last
 * @param {Function} callback Function called after animation is complete
 * @returns {void}
 */

export function scrollIntoView (node, duration = 300, offset = 80, callback) {
  document.documentElement.scrollTop = 0
  const el = document.body || document.documentElement
  const start = el.scrollTop
  const change = (node.getBoundingClientRect().top - offset) - start
  const increment = 20
  let currentTime = 0
  let timerid

  const animateScroll = () => {
    currentTime += increment
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    document.documentElement.scrollTop = val

    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  if (timerid) {
    clearTimeout(timerid)
  }

  timerid = setTimeout(() => {
    animateScroll()
  }, duration)
}

/**
 * Animate scroll of a specified HTML Element (ease-in-out)
 * @param {HTMLElement} element HTML element's scroll to animate
 * @param {Number} to Scroll-Y position to scroll to
 * @param {Number} duration How long (ms) the animation should last
 * @param {Function} callback Function called after animation is complete
 * @returns {void}
 */
export function scrollTo(element, to, duration, callback) {
  // easing functions http://goo.gl/5HLl8
  const easeInOutQuad = (t, b, c, d) => {
    let _t = t || 0
    const _b = b || 0
    const _c = c || 0
    const _d = d || 0

    _t /= _d / 2
    if (_t < 1) {
      return _c / 2 * _t * _t + _b
    }
    _t--
    return -_c / 2 * (_t * (_t - 2) - 1) + _b
  }

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  const requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
  })()

  const body = () => {
    return document.body || document.documentElement
  }

  const ele = element || body() || {}
  const start = ele.scrollTop || 0
  const change = to - start
  let currentTime = 0
  const increment = 20
  const _duration = (typeof (duration) === 'undefined') ? 400 : duration

  const animateScroll = () => {
    if (!ele) {
      return
    }

    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, _duration)
    // move the element scroll
    ele.scrollTop = val
    // do the animation unless its over
    if (currentTime < _duration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof (callback) === 'function') {
      // the animation is done so lets callback
      callback()
    }
  }
  animateScroll()
}

