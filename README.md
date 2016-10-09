# Co Mocha

A mocha plugin to enable generators (using [co](https://github.com/tj/co)) support.


## Installation
* `npm install --save-dev mocha-plugin-co`
* just add `-r mocha-plugin-co` in your mocha command line script
```
# example npm scripts
{
 "scripts" : {
    "mocha": "node node_modules/mocha/bin/_mocha -r mocha-plugin-co",
    "coverage": "node node_modules/istanbul/lib/cli.js cover  node_modules/mocha/bin/_mocha -r mocha-plugin-co",
  }
}
```

## Usage (nothing fancy)
```
describe("sometest", function() {
  it("should do stuff", function*() {
    var start = Date.now();
    yield sleep(1000);
    expect(Date.now() - start).to.eql(1000);
  });

  it("does not change classical usage", function(done) {
    setTimeout(done, 2000);
    console.log("All good");
  });
});
```


## How It Works

The module monkey patches the `Runnable.prototype.run` method of `mocha` to enable generators. In contrast to other npm packages, this is a plugin and extends `mocha` at runtime - allowing you to use any compatible mocha version.

## License

MIT

# Credits / related
* mocha-co : mocha fork with co support
* co-mocha : same as this module, with some limitation (no support for errors, bigger fingerprint, disctinction between generator & non-generators in execution)

