"use strict";

const co = require('co')

/**
 * Monkey patch the mocha instance with generator support.
 *
 * @param {Function} mocha
 */

function coRunnable (Runnable) {
  // Avoid loading `mocha-plugin-co` twice.
  if (Runnable._cosupport)
    return

  var run = Runnable.prototype.run

  Runnable.prototype.run = function (fn) {
    var oldFn = this.fn;

    var oldFnAsync = oldFn.length;
    var oldFnSync  = !oldFnAsync;
    this.async = true;
    this.sync  = !this.async;

    this.fn = function(done){

      co(oldFn, done).then(function(){ if(oldFnSync) done() }).catch(function(err){
        if (!(err instanceof Error))
          err = Error(err);
        process.nextTick(done, err);
      });

    }

    // Replace `toString` to output the original function contents.
    this.fn.toString = function () {
      // https://github.com/mochajs/mocha/blob/7493bca76662318183e55294e906a4107433e20e/lib/utils.js#L251
      return Function.prototype.toString.call(oldFn)
        .replace(/^function *\* *\(.*\)\s*{/, 'function () {')
    }



    return run.call(this, fn)
  }

  Runnable._cosupport = true
}





module.exports = coRunnable;
