const cds = require ('@sap/cds')
const cds_swagger = require('../..')

module.exports = cds.server

let options = {}
if (process.env.TEST_OPTIONS) {
  options = JSON.parse(process.env.TEST_OPTIONS)
}
let uiOptions = {}
if (process.env.TEST_OPTIONS_UI) {
  uiOptions = JSON.parse(process.env.TEST_OPTIONS_UI)
}

cds.on ('bootstrap', app => app.use(cds_swagger(options, uiOptions)))
