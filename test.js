'use strict';

let crypto = require('crypto');
let assert = require('assert');

let uuidv4 = require('.');

function getRandomBytes(buffer) {
  buffer.set(crypto.randomBytes(buffer.length));
}

let format = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/


let N = 1e5;
let sets = Array.from({ length: 32 }).map(() => ({}));
for (let i = 0; i < N; ++i) {
  let uuid = uuidv4(getRandomBytes);
  assert(format.test(uuid));
  uuid = uuid.replace(/-/g, '');
  let byte6 = uuid.substring(12, 14);
  let byte8 = uuid.substring(16, 18);

  let version = Number.parseInt(byte6, 16) >> 4;
  let variant = Number.parseInt(byte8, 16) >> 6;
  assert(version === 4);
  assert(variant === 2);

  [...uuid].forEach((t, i) => {
    sets[i][t] = true;
  });
}

// nondeterministic, but given N, extremely likely to be OK.
sets.forEach((s, i) => {
  let keys = Object.keys(s).length;
  if (i === 12) {
    assert(keys === 1);
  } else if (i === 16) {
    assert(keys === 4);
  } else {
    assert(keys === 16);
  }
});
