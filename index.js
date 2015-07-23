if (process.versions['electron']) {
  module.exports = function (args) {
    var filename = args[1] || 'test.js'
    var old = process.stdout.write
    process.stdout.write = function (msg) {
      if (msg.toString().slice(0, 4) === '# ok' || msg.toString().slice(0, 6) === '# fail') {
        process.nextTick(function () {
          require('remote').require('app').quit()
        })
      }
      old.apply(process.stdout, arguments)
    }
    process.nextTick(function () {
      require(filename)
    })
  }
} else {
  module.exports = function (filename) {
    var path = require('path')
    var electronSpawn = require('electron-spawn')
    return electronSpawn(path.resolve(__dirname, 'index.js'), filename)
  }
}
