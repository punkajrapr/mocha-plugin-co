"use strict";

var coMocha = require('./lib/');

// Patch current mocha instance

try {
  var mocha_path = require.resolve('mocha');
  if(require.cache[mocha_path])
    coMocha(require.cache[mocha_path].exports.Runnable);
} catch(err){ }

