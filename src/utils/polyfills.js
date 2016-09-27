import Bluebird from 'bluebird';

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
// const keys = Reflect.ownKeys;

console.log("[POLYFILL] Patching object.values");

if (!Object.values) {
  Object.values = function values(O) {
    return reduce(Object.getOwnPropertyNames(O).concat(Object.getOwnPropertySymbols(O)), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
  };
}

if (!Object.entries) {
  Object.entries = function entries(O) {
    return reduce(Object.getOwnPropertyNames(O).concat(Object.getOwnPropertySymbols(O)), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
  };
}

if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target) {
    // We must check against these specific cases.
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);
    for (let index = 1; index < arguments.length; index++) {
      const source = arguments[index];
      if (source !== undefined && source !== null) {
        for (let nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  };
}

if (typeof window !== 'undefined') {
  window.Promise = Bluebird;
  require('es6-map/implement');
  require('es6-symbol/implement');
}
