const cds = require ('@sap/cds')
const DEBUG = cds.debug('swagger')
const { registered } = require ('./lib/etc')

cds.on ('bootstrap', app => {
  const { swagger } = cds.env
  if (!swagger)  {
    return DEBUG?.('Plugin disabled by configuration')
  }

  if (cds[registered]) {
    return DEBUG?.('Plugin disabled: already registered programmatically')
  }

  DEBUG?.('Plugin with options', swagger)
  const cds_swagger = require('./lib/middleware')
  app.use(cds_swagger(swagger))

})
