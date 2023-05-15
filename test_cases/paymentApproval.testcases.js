const testCaseData = [{
  caseName: 'Cavages Approval Mandatory',
  validPaymentDetails: {
    contact: 'Cavages', 
    amount: '10.00 PHP = 0.20 USD *',
    exchangeRate: '0.020157294', 
    reqDebitDate: '01 Oct 2021', 
    status: 'On Hold', 
    initiatedBy: 'Robert Mason', 
    estCreditDate: '06 Oct 2021 (Estimate based on requested debit date)'
  }, 
  validApprovalProcess: [ 'Kevin Honig ( me )', ' Approval Mandatory', ' Reject  Approve' ],
  validAuditTrail: [
    'This payment is on hold due to the following security issue: The account for user Carolyn Sears (CarolynSears@plooto.com) has been temporarily locked. Please contact Plooto support for assistance.',
    'October 1, 2021',
    '@ 10:53 am',
    'Payment initiated by Robert Mason (RobertMason@gmail.com)',
    '(Additional approvals required)'
  ]
},
{
  caseName: 'Cavages Approval Mandatory Pt 2',
  validPaymentDetails: {
    contact: 'Cavages', 
    amount: '10.00 PHP = 0.20 USD *',
    exchangeRate: '0.020157294', 
    reqDebitDate: '01 Oct 2021', 
    status: 'On Hold', 
    initiatedBy: 'Robert Mason', 
    estCreditDate: '06 Oct 2021 (Estimate based on requested debit date)'
  }, 
  validApprovalProcess: [ 'Kevin Honig ( me )', ' Approval Mandatory', ' Reject  Approve' ],
  validAuditTrail: [
    'This payment is on hold due to the following security issue: The account for user Carolyn Sears (CarolynSears@plooto.com) has been temporarily locked. Please contact Plooto support for assistance.',
    'October 1, 2021',
    '@ 10:53 am',
    'Payment initiated by Robert Mason (RobertMason@gmail.com)',
    '(Additional approvals required)'
  ]
}]

const testCaseSpecificSetup = async( {page, pmtApprovalPg} ) => {
  await page.goto(pmtApprovalPg.relativeUrl)
}


module.exports = {
  testCaseSpecificSetup,
  testCaseData
}