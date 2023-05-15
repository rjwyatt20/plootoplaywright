const testCaseData = [
  {
    caseName: "1 item showing on my payments tab",
    myPaymentsCount: "1",
    allPaymentsCount: "1",
    rowFilterText: "Buena Vista Realty Service",
    expectedData: [
      {
        text: "01 Oct 2021",
        cell: 2
      },
      {
        text: "10.00 PHP",
        cell: 3,
      }
    ]

  }
]

const testCaseSpecificSetup = async() => {
}


module.exports = {
  testCaseSpecificSetup,
  testCaseData
}