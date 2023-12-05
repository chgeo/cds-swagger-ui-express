const cds = require ('@sap/cds')

let options = {}
if (process.env.TEST_OPTIONS) {
  options = JSON.parse(process.env.TEST_OPTIONS)
}
let uiOptions = {}
if (process.env.TEST_OPTIONS_UI) {
  uiOptions = JSON.parse(process.env.TEST_OPTIONS_UI)
}

if (!process.env.TEST_AS_PLUGIN) {
  // do not load index.js if running as plugin
  const cds_swagger = require('../..')
  cds.on ('bootstrap', app => app.use(cds_swagger(options, uiOptions)))
}
