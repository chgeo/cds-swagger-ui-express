# cds-swagger-ui-express

An express middleware to serve OpenAPI definitions for [CAP](https://cap.cloud.sap) services in Swagger UI.
Builds on top of [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).

![Preview](https://raw.githubusercontent.com/chgeo/cds-swagger-ui-express/main/assets/cds-swagger-ui.png)

## Installation

In your project, execute
```sh
npm install --save-dev cds-swagger-ui-express
```

## Usage

Have this in your [`server.js`](https://cap.cloud.sap/docs/node.js/cds-server#custom-server-js):

```js
const cds = require ('@sap/cds')
module.exports = cds.server

if (process.env.NODE_ENV !== 'production') {
  const cds_swagger = require ('cds-swagger-ui-express')
  cds.on ('bootstrap', app => app.use (cds_swagger()) )
}
```

Swagger UI is then served on `/$api-docs/<service-path>`, like http://localhost:4004/$api-docs/browse/

## Configuration

Call `cds_swagger ({...})` with the following object as first parameter:
```jsonc
{
  "basePath": "/$api-docs", // the root path to mount the middleware on
  "apiPath": "", // the root path for the services (useful if behind a reverse proxy)
  "diagram": true // whether to render the YUML diagram
}
```

## Swagger Configuration

Call `cds_swagger ({...}, {...})` with an additional object as second parameter. This object is passed to `swagger-ui-express` as [custom options](https://www.npmjs.com/package/swagger-ui-express#user-content-custom-swagger-options).

Example:

```jsonc
{
  "customSiteTitle": "My Custom Title",
  "swaggerOptions": {
    "requestInterceptor": ...
  }
}
```

See the [list of all options](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md).
For questions to specific properties, contact the maintainers of [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) or [swagger-ui](https://github.com/swagger-api/swagger-ui).

### Notes

If you call [`cds.serve`](https://cap.cloud.sap/docs/node.js/cds-serve#cds-serve) on your own in your `server.js`, make sure to install this middleware _before_, as it relies on CDS' [`serving` events](https://cap.cloud.sap/docs/node.js/cds-server#cdson--serving-service).
