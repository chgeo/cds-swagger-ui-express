process.env.TEST_OPTIONS = JSON.stringify({basePath:'/test-base', diagram:false})

const cds = require('@sap/cds/lib')
const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

describe('with options', ()=>{
  afterAll(() =>{ delete process.env.TEST_OPTIONS })

  test('Main HTML', async()=>{
    const { status } = await GET `/test-base/browse`
    expect (status) .equal (200)
  })

  test('Diagram', async()=>{
    const { status, data } = await GET `/test-base/browse/swagger-ui-init.js`
    expect (status) .equal (200)
    expect (data) .not.to.contain('yuml')
  })

})
