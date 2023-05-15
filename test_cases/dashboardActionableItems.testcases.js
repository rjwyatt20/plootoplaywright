const testCaseData = [{
  caseName: 'PlootoInc',
  actionableItems: [
    {
      selector: 'paymentApprovalsLink',
      count: "1",
      expectation: {
        attr: 'href',
        val: '#user/dashboard/approvePayments'
      }
    },
    {
      selector: 'pendingPaymentsLink',
      count: "39",
      expectation: {
        attr: 'href',
        val: '#user/dashboard/pendingPayments'
      }
    },
  ]
},{
  caseName: 'PlootoInc Pt 2',
  actionableItems: [
    {
      selector: 'paymentApprovalsLink',
      count: "1",
      expectation: {
        attr: 'href',
        val: '#user/dashboard/approvePayments'
      }
    },
    {
      selector: 'pendingPaymentsLink',
      count: "39",
      expectation: {
        attr: 'href',
        val: '#user/dashboard/pendingPayments'
      }
    },
  ]
}]

const testCaseSpecificSetup = async( {page, dashboardPg} ) => {
  await page.goto(dashboardPg.relativeUrl)
}


module.exports = {
  testCaseSpecificSetup,
  testCaseData
}