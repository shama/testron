var test = require('tape')
var path = require('path')
var testron = require('../index.js')

test('runs some tests on client side', function (t) {
  t.plan(1)
  var tests = testron(path.resolve(__dirname, 'client-test.js'))
  var result = []
  tests.stdout.on('data', function (data) {
    result.push(data.toString())
  })
  tests.on('exit', function () {
    result = result.join('')
    t.ok(result.indexOf('client-test should have worked') != -1, 'should have been notified it worked')
    t.end()
  })
})
