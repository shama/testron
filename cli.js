#!/usr/bin/env node

process.title = 'testron'
var path = require('path')
var argv = require('minimist')(process.argv.slice(2))

var testron = require('./index.js')
var tests = testron(path.resolve(process.cwd(), process.argv[2]))
tests.stdout.pipe(process.stdout)

if (argv['errors'] || argv['e']) {
  tests.stderr.pipe(process.stderr)
}
