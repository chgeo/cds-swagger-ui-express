const cds = require('@sap/cds/lib')
const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

describe('Swagger UI', ()=>{

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

})
