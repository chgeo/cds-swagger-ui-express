const cds = require ('@sap/cds-dk')
const swaggerUi = require('swagger-ui-express')
const express = require('express')

const debug = cds.debug('openapi')
const cache={}


module.exports = (options={basePath:'/$api-docs'}) => {
  const router = express.Router()
  cds.on ('serving', service => {
    if (!isOData (service))  return
    debug && debug (`Serving ${service.name} at ${apiPath}`)
    const apiPath = options.basePath+service.path
    const mount = apiPath.replace('$','[\\$]')
    router.use(mount, (req, _, next) => {
      req.swaggerDoc = toOpenApiDoc(service, options)
      next()
    }, swaggerUi.serve, swaggerUi.setup())
    addLinkToIndexHtml(service, apiPath)
  })
  return router
}

function toOpenApiDoc(service, options={}) {
  if (!cache[service.name]) {
    debug && debug ('Compiling Open API spec for', service.name)
    cache[service.name] = cds.compile.to.openapi (service.model, {
      service: service.name,
      'openapi:url': service.path,
      'openapi:diagram': ('diagram' in options ? options.diagram : true)
    })
  }
  return cache[service.name]
}

function addLinkToIndexHtml(service, apiPath) {
  const provider = (entity) => {
    if (entity)  return // avoid link on entity level, looks too messy
    return { href:apiPath, name:'Open API', title:'Show in Swagger UI' }
  }
  service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider]
}

function isOData(service) {
  return Object.keys(service._adapters) .find (a => a.startsWith ('odata'))
}
