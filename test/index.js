"use strict";

const expect = require("expect.js");

const sleep  = function(duration) {
  return new Promise(function(resolve, reject){
    setTimeout(resolve, duration);
  });
};


delete require.cache[require.resolve("mocha/lib/runnable")];
var Runnable = require("mocha/lib/runnable");

require('../lib/')(Runnable); //apply plugin
require('../lib/')(Runnable); //..only once




describe('mocha-plugin-co', function () {
  describe('synchronous', function () {
    it('should pass', function (done) {
      var test = new Runnable('synchronous', function () {})
      test.run(done);
    })

    it('should fail', function (done) {
      var test = new Runnable('synchronous', function () {
        throw new Error('You had one job')
      })

      test.run(function (err) {
        expect(err).to.be.ok();
        expect(err.message).to.equal('You had one job')

        return done();
      })
    })


  });

  describe('promise', function () {
    it('should pass', function (done) {
      var test = new Runnable('promise', function () {
        return Promise.resolve(true);
      })

      test.run(done)
    })


    it('should fail', function (done) {
      var test = new Runnable('promise', function () {
        return new Promise(function (resolve, reject) {
          return setTimeout(function () {
            return reject(new Error('You promised me'))
          }, 0)
        })
      })

      test.run(function (err) {
        expect(err).to.be.ok();
        expect(err.message).to.equal('You promised me')

        return done()
      })
    })
  })


  describe('callback', function () {
    it('should pass', function (done) {
      var test = new Runnable('callback', function (done) {
        return setTimeout(done, 0)
      })

      test.run(done)
    })

    it('should fail', function (done) {
      var test = new Runnable('callback', function (done) {
        return setTimeout(function () {
          return done(new Error('You never called me back'))
        }, 0)
      })

      test.run(function (err) {
        expect(err).to.be.ok();
        expect(err.message).to.equal('You never called me back')

        return done()
      })
    })
  })

  describe("Generators", function(){
    it("should pass", function(done){

      var test = new Runnable("generator", function* () {
        var start = Date.now();
        yield sleep(100);
        expect(Date.now()- start - 1).to.be.above(100);
      });

      test.run(function (err) {
        expect(err).not.to.be.ok();

        return done()
      })

    });

    it("should fail", function(done){

      var test = new Runnable("generator", function* () {
        var start = Date.now();
        yield sleep(100);
        throw "NEIN";
      });

      test.run(function (err) {
        expect(err).to.be.ok();
        expect(err.message).to.eql("NEIN");
        return done()
      })

    });


  });



});