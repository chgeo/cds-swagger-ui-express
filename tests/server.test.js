const cds = require('@sap/cds')

describe('Swagger UI', ()=>{

  const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

  test('Service endpoint', async()=>{
    const { data } = await GET `/browse/$metadata`
    expect (data) .match (/Books/)
  })
  test('Main HTML', async()=>{
    const { data } = await GET `/$api-docs-custom/browse`
    expect (data) .match (/swagger/i)
  })
  test('Diagram', async()=>{
    const { data } = await GET `/$api-docs-custom/browse/swagger-ui-init.js`
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
    let data  = (await GET `/$api-docs-custom/browse/openapi.json`).data
    expect (data) .to.be.a('object').to.have.property('openapi')
    expect (data) .to.be.a('object').to.have.property('x-sap-shortText')
    expect (data['x-sap-shortText'] ).to.match(/.*book.*catalog/i)
    expect (JSON.stringify(data)) .to.contain('yuml')

    data  = (await GET `/$api-docs-custom/admin/openapi.json`).data
    expect (data) .to.be.a('object').to.have.property('openapi')
    expect (data) .to.be.a('object').to.have.property('x-sap-shortText')
    expect (data['x-sap-shortText'] ).to.match(/manage/i)
    expect (JSON.stringify(data)) .to.contain('yuml')
  })

})
