# cache.js
    This is a very very very simple memory cache which inherit from Map.
    Use it just like the same with Map.
    It can use in browser, also node environment.

## Install

```sh
npm install memo-cache.js --save
```

## Usage

```js
const MemoCache = require('memo-cache.js');

const memoCache = new MemoCache();

const value = Promise.resolve('value');

// set a cache with expired after 60s;
memoCache.set('key', value, 60);

// get a cache value
const val = memoCache.get('key');

// delete a cache
memoCache.delete('key');

// check if exists
memoCache.has('key'); // return false
```

Also you can custom it with you own advanced features, by just inherit from it!

```js
class CustomCache extend MemoCache {
    // do want you want to do
}
```

## Class

Almost methods is the same with Map, but `set`:

* set(key, value, ttl=5)

Only add one argument `ttl` when compare with `Map.prototype.set`.

This `ttl` argument is used to set the expired time of this key. and the unit of `ttl` is second.

All the Map method see: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map>

## Compatibility

*In Node:* use it anyway.*

*In Browser:*

See caniusemap<http://caniuse.com/#search=map>

## Test

```sh
npm test
```