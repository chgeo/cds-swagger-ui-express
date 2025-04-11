const cds = require('@sap/cds')

describe('Swagger UI as plugin', ()=>{

  beforeAll(()=> process.env.TEST_AS_PLUGIN = true)
  afterAll(()=> delete process.env.TEST_AS_PLUGIN)

  const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

  test('Main HTML', async()=>{
    const { data } = await GET `/$api-docs-plugin/browse`
    expect (data) .match (/swagger/i)
  })

})