yieldish
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

Generate a sync and async variant of some function. This is useful when you want to ensure the same code is used for both sync and async without needing to duplicate the implementation code.adders.sync(3)

### Usage

```js
const { yieldish } = require('yieldish');

const adders = yieldish(isSync => function *(firstNumber) {
  const secondNumber = yield isSync ? 1 : Promise.resolve(1);
  return firstNumber + secondNumber;
});

adders.sync(3) === 4; // true
await adders.sync(3) === 4; // true
```

[npm-image]: https://img.shields.io/npm/v/yieldish.svg?style=flat-square
[npm-url]: https://npmjs.org/package/yieldish
[travis-image]: https://img.shields.io/travis/kolodny/yieldish.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/yieldish
[downloads-image]: http://img.shields.io/npm/dm/yieldish.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/yieldish
