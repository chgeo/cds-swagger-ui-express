const cds = require('@sap/cds/lib')
const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

describe('Swagger UI', ()=>{

  test('Service endpoint', async()=>{
    const { status } = await GET `/browse/$metadata`
    expect (status) .equal (200)
  })
  test('Main HTML', async()=>{
    const { status } = await GET `/$api-docs/browse`
    expect (status) .equal (200)
  })
  test('Diagram', async()=>{
    const { status, data } = await GET `/$api-docs/browse/swagger-ui-init.js`
    expect (status) .equal (200)
    expect (data) .to.contain('yuml')
  })
  test('preview link in index.html', async()=>{
    const { status,data } = await GET `/`
    expect (status) .equal (200)
    expect (data) .match (/Show in Swagger UI/i)
  })

})
