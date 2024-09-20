const cds = require('@sap/cds')

describe.only('Swagger UI', ()=>{

  const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

  test('Service endpoint', async()=>{
    const { data } = await GET `/browse/$metadata`
    expect (data) .match (/Books/)
  })
  test('Main HTML', async()=>{
    const { data } = await GET `/$api-docs/browse`
    expect (data) .match (/swagger/i)
  })
  test('Diagram', async()=>{
    const { data } = await GET `/$api-docs/browse/swagger-ui-init.js`
    expect (data) .to.contain('swaggerUrl')
  })
  test('preview link in index.html', async()=>{
    const { data } = await GET `/`
    expect (data) .match (/Open API Preview/i)
    expect (data) .match (/Show in Swagger UI/i)
  })
  test('Admin endpoint is protected', async()=>{
    expect(GET `/admin/`).to.be.rejected
    const { data } = await GET(`/admin/`, { auth: { username: 'alice' }})
    expect (JSON.stringify(data)) .match (/Books/)
  })

  test('multiple services', async()=>{
    let data  = (await GET `/$api-docs/browse/openapi.json`).data
    expect (data ) .to.be.a('object').to.have.property('openapi')
    expect (data ) .to.be.a('object').to.have.property('x-sap-shortText', 'Service for namespace CatalogService')
    expect (JSON.stringify(data)) .to.contain('yuml')

    data  = (await GET `/$api-docs/admin/openapi.json`).data
    expect (data ) .to.be.a('object').to.have.property('openapi')
    expect (data ) .to.be.a('object').to.have.property('x-sap-shortText', 'Service for namespace AdminService')
    expect (JSON.stringify(data)) .to.contain('yuml')
  })

})

describe('Swagger UI as plugin', ()=>{

  beforeAll(()=> process.env.TEST_AS_PLUGIN = true)
  afterAll(()=> delete process.env.TEST_AS_PLUGIN)

  const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

  test('Main HTML', async()=>{
    const { data } = await GET `/$api-docs-plugin/browse`
    expect (data) .match (/swagger/i)
  })

})