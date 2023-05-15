const testCaseData = [{
  caseName: '33 Pending Payables',
  pendingPayableCount: "33",
  pendingReceivablesCount: "6",
  companyName: 'Laura Ashley',
  paymentDataRow: [
    {
      text: "On Hold",
      cell: 1
    },
    {
      text: "04 Oct 2021",
      cell: 2
    },
    {
      text: "07 Oct 2021",
      cell: 3
    },
    {
      text: "10.00 PHP\n0.20 USD",
      cell: 4,
    }
  ]
}

]

const testCaseSpecificSetup = async( {page, pendingPaymentsDashPg} ) => {
  await page.goto(pendingPaymentsDashPg.relativeUrl)
}


module.exports = {
  testCaseSpecificSetup,
  testCaseData
}