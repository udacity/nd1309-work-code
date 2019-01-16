'use strict'

module.exports = require('./abstract/test')

if (!module.parent) {
  var test = require('tape')
  var packager = require('./')
  var leveldown = require('leveldown')
  module.exports(test, packager(leveldown))
}
