#!/usr/bin/env node

process.title = 'testron'
var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var testron = require('./index.js')
var tests

if (argv._.length > 0) {
  tests = testron(argv._[0])
} else {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  tests = testron()
  process.stdin.pipe(tests.stdin)
}

tests.stdout.pipe(process.stdout)
if (argv['errors'] || argv['e']) {
  tests.stderr.pipe(process.stderr)
}
