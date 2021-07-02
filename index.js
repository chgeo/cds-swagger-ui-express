const cds = _require ('@sap/cds-dk', orPolyfillCompileOpenAPI)
const swaggerUi = require('swagger-ui-express')
const express = require('express')

module.exports = (options={basePath:'/$api-docs'}) => {
  const router = express.Router()
  cds.on ('serving', service => {
    if (!isOData (service))  return
    const apiPath = options.basePath+service.path
    const mount = apiPath.replace('$','[\\$]')
    console.log ('[cds] - serving Swagger UI for ', {service: service.name, at: apiPath})
    router.use(mount, (req, _, next) => {
      req.swaggerDoc = toOpenApiDoc(service, options)
      next()
    }, swaggerUi.serve, swaggerUi.setup())
    addLinkToIndexHtml(service, apiPath)
  })
  return router
}

const cache={}
function toOpenApiDoc(service, options={}) {
  if (!cache[service.name]) {
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

function _require(id, _else) {
  try {
    return require (id)
  } catch (e) {
    return _else()
  }
}

// polyfill for @sap/cds-dk < 4.3
function orPolyfillCompileOpenAPI() {
  const cds = require ('@sap/cds')
  const get_compile = Reflect.getOwnPropertyDescriptor(cds,'compile').get

  // extending cds to lazy-load additional submodules provided by cds-dk
  return Object.defineProperties (cds, {
    compile: {enumerable:true, get:()=> {
      // lazy-extending cds.compile.to only when cds.compile getter is invoked
      // otherwise we might cause cds.env being invoked too early.
      const compile = get_compile.call(cds)
      Object.defineProperties (compile.to, {
        openapi: {enumerable:true, get:()=> require('@sap/cds-dk/lib/compile/openapi')}
      })
      return compile
    }},
  })

}

/* eslint no-console:off */
