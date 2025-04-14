const cds = require('@sap/cds')
const openapi = require('@cap-js/openapi')
const debug = cds.debug('swagger')

const swaggerUi = require('swagger-ui-express')
const express = require('express')
const { posix: { join } } = require('path')

const optionsDefaults = { basePath: '/$api-docs', proxyPathPrefix: '' } // needed if not used as a cds plugin
const swaggerFile = 'openapi.json'

/**
 * Creates express middleware to serve CDS services in the Swagger UI
 *
 * @param {CdsSwaggerOptions} options - options for cds-swagger-ui itself
 * @param {swaggerUi.SwaggerUiOptions} swaggerUiOptions - options passed to swagger-ui-express
 * @returns {express.RequestHandler} - an express middleware
 */
module.exports = (options={}, swaggerUiOptions={}) => {
  options = Object.assign(optionsDefaults, cds.env.swagger, options)

  const router = express.Router()

  cds.on('serving', service => {
    const swaggerPath = join(options.basePath, service.path, '/')
    const swaggerClientPath = join(options.proxyPathPrefix, swaggerPath)
    debug?.('serving Swagger UI for', { service: service.name, at: swaggerPath, client: swaggerClientPath })

    const uiOptions = Object.assign({
      customSiteTitle: `${service.name} - Swagger UI`,
      swaggerUrl: join(swaggerClientPath, swaggerFile)
    }, swaggerUiOptions)

    const mount = swaggerPath.replace(/\$/g, '[\\$]')
    router.get(join(mount, swaggerFile), (_, res) => res.json(toOpenApiDoc(service, options)))
    router.use(mount, swaggerUi.serveFiles(null, uiOptions), swaggerUi.setup(null, uiOptions))

    addLinkToIndexHtml(service, swaggerClientPath)
  })
  return router
}

const cache = {}
function toOpenApiDoc (service, options = {}) {
  if (!cache[service.name]) {
    cache[service.name] = openapi.compile(service.model, {
      service: service.name,
      'odata-version': options.odataVersion,
      'openapi:url': join(options.proxyPathPrefix, service.path),
      'openapi:diagram': ('diagram' in options ? options.diagram : true)
    })
    debug?.(JSON.stringify(cache[service.name], null, 2))
  }
  return cache[service.name]
}

function addLinkToIndexHtml (service, href) {
  const provider = (entity) => {
    if (entity) return // avoid link on entity level, looks too messy
    return { href: href, name: 'Open API Preview', title: 'Show in Swagger UI' }
  }
  service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider]
}

/**
 * @typedef {Object} CdsSwaggerOptions
 * @property {string} basePath - the root path to mount the middleware on
 * @property {boolean} diagram - whether to render the YUML diagram
 * @property {string} odataVersion - the OData version used to compile the OpenAPI specs. Defaults to 4.01
 * @property {string} proxyPathPrefix - a path prefix that clients expect when calling the Swagger UI. To be used in reverse proxy scenarios.
 */
