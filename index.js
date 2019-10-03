'use strict';
module.exports = function uuidv4(rng) {
  // RNG should be a function which takes a Uint8Array and completely fills it with random bytes
  var buffer = new Uint8Array(16);
  rng(buffer);
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;
  var out = '';
  for (var i = 0; i < buffer.length; ++i) {
    if (i === 4 || i === 6 || i === 8 || i === 10) {
      out += '-';
    }
    out += (buffer[i] + 0x100).toString(16).substring(1);
  }
  return out;
};
