const cds = require ('@sap/cds')
const DEBUG = cds.debug('swagger')

DEBUG?.('Programmatic registration')
const { registered } = require ('./lib/etc')
cds[registered] = true

module.exports = require('./lib/middleware')

// important: this file must not be loaded when running as plugin ('auto' registration mode)
