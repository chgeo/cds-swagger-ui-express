# cds-swagger-ui-express

Serves OpenAPI definitions for [CAP](https://cap.cloud.sap) services in Swagger UI

## Usage

Have this in your [`server.js`](https://cap.cloud.sap/docs/node.js/cds-server#custom-server-js):

```js
const cds = require ('@sap/cds')
const cds_swagger = require('cds-swagger-ui-express')

cds.on ('bootstrap', app => app.use(cds_swagger()) )

module.exports = cds.server
```

If you call [`cds.serve`](https://cap.cloud.sap/docs/node.js/cds-serve#cds-serve) on your own, make sure to have this code executed _before_, as it relies on the [`serving` events](https://cap.cloud.sap/docs/node.js/cds-server#cdson--serving-service).
