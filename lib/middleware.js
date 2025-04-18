const cds = require('@sap/cds')
const openapi = require('@cap-js/openapi')
const debug = cds.debug('swagger')

const swaggerUi = require('swagger-ui-express')
const express = require('express')
const { join } = require('path')

const optionDefaults = { basePath: '/$api-docs', apiPath: '/' }

/**
 * Creates express middleware to serve CDS services in the Swagger UI
 *
 * @param {CdsSwaggerOptions} options - options for cds-swagger-ui itself
 * @param {swaggerUi.SwaggerUiOptions} swaggerUiOptions - options passed to swagger-ui-express
 * @returns {express.RequestHandler} - an express middleware
 */
module.exports = (options={}, swaggerUiOptions={}) => {
  options = Object.assign(optionDefaults, cds.env.swagger, options)
  debug?.('effective options', options)
  debug?.('effective swagger UI options', swaggerUiOptions)

  const router = express.Router()

  cds.on('serving', service => {
    const mountPath = options.basePath + service.path
    const openapiPath = mountPath + '/openapi.json'
    debug?.('serving Swagger UI for', { service: service.name, at: mountPath })

    const uiOptions = Object.assign({
      customSiteTitle: `${service.name} - Swagger UI`,
      swaggerUrl: openapiPath
    }, swaggerUiOptions)

    const mount = mountPath.replace(/\$/g, '[\\$]')
    router.get(mount + '/openapi.json', (_, res) => res.json(toOpenApiDoc(service, options)))
    router.use(mount, (_, _1, next) => {
      next()
    }, swaggerUi.serveFiles(null, uiOptions), swaggerUi.setup(null, uiOptions))

    addLinkToIndexHtml(service, mountPath)
  })
  return router
}

const cache = {}
function toOpenApiDoc (service, options = {}) {
  if (!cache[service.name]) {
    cache[service.name] = openapi.compile(service.model, {
      service: service.name,
      'odata-version': options.odataVersion,
      'openapi:url': join(options.apiPath, service.path),
      'openapi:diagram': ('diagram' in options ? options.diagram : true)
    })
    debug?.(JSON.stringify(cache[service.name], null, 2))
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
 * @property {string} odataVersion - the OData version used to compile the OpenAPI specs. Defaults to 4.01
 */
