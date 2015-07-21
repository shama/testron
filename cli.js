#!/usr/bin/env node

process.title = 'testron'
var path = require('path')
var testron = require('./index.js')
testron(path.resolve(process.cwd(), process.argv[2]))
  .stdout.pipe(process.stdout)
