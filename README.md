# uuidv4-gen

A very simple library for generating [RFC 4122](https://tools.ietf.org/html/rfc4122) UUIDs, variant 4, given a source of randomness.

## Usage

On the web:

```js
let uuidv4 = require('uuidv4-gen');

let uuid = uuidv4(crypto.getRandomValues.bind(crypto));
```

In node:

```js
let uuidv4 = require('uuidv4-gen');
let crypto = require('crypto');
function getRandomBytes(buffer) {
  buffer.set(crypto.randomBytes(buffer.length));
}

let uuid = uuidv4(getRandomBytes);
```
