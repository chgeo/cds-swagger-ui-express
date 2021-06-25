const cds = require ('@sap/cds')
const cds_swagger = require('../..')

cds.on ('bootstrap', app => app.use(cds_swagger()) )

module.exports = cds.server
