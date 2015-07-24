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
  var fs = require('fs')
  var path = require('path')
  var through = require('through2')
  var tempfile = require('tempfile')
  var electronSpawn = require('electron-spawn')

  module.exports = function (filename) {
    if (filename) {
      return electronSpawn(__filename, filename)
    } else {
      return stream()
    }
  }

  function stream () {
    var tmpname = tempfile('.js')
    var s = {
      stdin: fs.createWriteStream(tmpname),
      stdout: through(),
      stderr: through()
    }
    s.stdin.on('close', function () {
      var electron = electronSpawn(__filename, tmpname)
      electron.stdout.pipe(s.stdout)
      electron.stderr.pipe(s.stderr)
      electron.on('exit', function () {
        fs.unlink(tmpname)
      })
    })
    return s
  }
}
