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
    expect (data) .to.contain('yuml')
  })
  test('preview link in index.html', async()=>{
    const { data } = await GET `/`
    expect (data) .match (/Open API Preview/i)
    expect (data) .match (/Show in Swagger UI/i)
  })

  test('multiple services', async()=>{
    let data  = (await GET `/$api-docs/browse/swagger-ui-init.js`).data
    expect (data ) .to.be.a('string').that.contains('CatalogService')

    data  = (await GET `/$api-docs/admin/swagger-ui-init.js`).data
    expect (data ) .to.be.a('string').that.contains('AdminService')
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