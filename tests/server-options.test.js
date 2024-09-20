process.env.TEST_OPTIONS    = JSON.stringify({basePath:'/test-base', apiPath: '/root', diagram:false, odataVersion:'4.0'})
process.env.TEST_OPTIONS_UI = JSON.stringify({customSiteTitle: 'My Custom Title'})

const cds = require('@sap/cds')

describe('with options', ()=>{
  const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

  afterAll(() =>{ delete process.env.TEST_OPTIONS })

  test('Main HTML', async()=>{
    const { data } = await GET `/test-base/browse`
    expect (data) .match (/swagger/i)
  })

  test('Diagram', async()=>{
    const { data } = await GET `/test-base/browse/openapi.json`
    expect (JSON.stringify(data)) .not.to.contain('yuml')
  })

  test('Swagger UI options', async()=>{
    const { data } = await GET `/test-base/browse`
    expect (data) .match (/My Custom Title/i)
  })

})
