process.env.TEST_OPTIONS = JSON.stringify({basePath:'/test-base', apiPath: '/root', diagram:false})

const cds = require('@sap/cds/lib')
const { GET, expect } = cds.test.in(__dirname, 'app').run('serve', 'all')

describe('with options', ()=>{
  afterAll(() =>{ delete process.env.TEST_OPTIONS })

  test('Main HTML', async()=>{
    const { data } = await GET `/test-base/browse`
    expect (data) .match (/swagger/i)
  })

  test('Diagram', async()=>{
    const { data } = await GET `/test-base/browse/swagger-ui-init.js`
    expect (data) .not.to.contain('yuml')
  })

})
