const cds = require('@sap/cds-dk')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const { join } = require('path')
const LOG = cds.log('swagger')


/**
 * Creates express middleware to serve CDS services in the Swagger UI
 *
 * @param {CdsSwaggerOptions} options - options for cds-swagger-ui itself
 * @param {swaggerUi.SwaggerUiOptions} swaggerUiOptions - options passed to swagger-ui-express
 * @returns {express.RequestHandler} - an express middleware
 */
module.exports = (options={}, swaggerUiOptions={}) => {
  options = Object.assign({ basePath: '/$api-docs', apiPath: '' }, options)
  const router = express.Router()

  cds.on('serving', service => {
    const apiPath = options.basePath + service.path
    const mount = apiPath.replace('$', '[\\$]')
    LOG._debug && LOG.debug('serving Swagger UI for ', { service: service.name, at: apiPath })

    const uiOptions = Object.assign({ customSiteTitle: `${service.name} - Swagger UI` }, swaggerUiOptions)
    router.use(mount, (req, _, next) => {
      req.swaggerDoc = toOpenApiDoc(service, options)
      next()
    }, swaggerUi.serveFiles(), swaggerUi.setup(null, uiOptions))

    addLinkToIndexHtml(service, apiPath)
  })
  return router
}

const cache = {}
function toOpenApiDoc (service, options = {}) {
  if (!cache[service.name]) {
    cache[service.name] = cds.compile.to.openapi(service.model, {
      service: service.name,
      'openapi:url': join('/', options.apiPath, service.path),
      'openapi:diagram': ('diagram' in options ? options.diagram : true)
    })
  }
  return cache[service.name]
}

function addLinkToIndexHtml (service, apiPath) {
  const provider = (entity) => {
    if (entity) return // avoid link on entity level, looks too messy
    return { href: apiPath, name: 'Open API Preview', title: 'Show in Swagger UI' }
  }
  service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider]
}

/**
 * @typedef {Object} CdsSwaggerOptions
 * @property {string} basePath - the root path to mount the middleware on
 * @property {string} apiPath - the root path for the services (useful if behind a reverse proxy)
 * @property {boolean} diagram - whether to render the YUML diagram
 */
