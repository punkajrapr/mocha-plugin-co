"use strict";

var coRunnable = require('./lib/');


try {
  var mocha_path = require.resolve('mocha');
  if(require.cache[mocha_path])
    coRunnable(require.cache[mocha_path].exports.Runnable);
} catch(err){ }

