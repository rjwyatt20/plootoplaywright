/**
 * Purpose: Payment Approval Displays all the details about payment, its approval process and audit trail
 * 
 * 1a. Payment approval displays all payment details
 * 1b. Payment approval displays approval process
 * 1c. Payment approval displays audit trail
 * 
 */

const { test, expect } = require('@playwright/test')
const {testCaseSpecificSetup, testCaseData} = require('../test_cases/paymentApproval.testcases')

let pmtApprovalPg

test.describe('Given a user on the Payment Approval Page for a payment', async () => {
  test.beforeEach(async({ page }) => {
    pmtApprovalPg = new PaymentApprovalPage(page)

    await page.goto(pmtApprovalPg.relativeUrl)
  })

  test.describe('When the user examines the payment approval data', async () => {
    test('Then the user can see the correct data in the tab', async ({ page }) => {
      await pmtApprovalPg.validatePaymentDetails({
        contact: 'Cavages', 
        amount: '10.00 PHP = 0.20 USD *',
        exchangeRate: '0.020157294', 
        reqDebitDate: '01 Oct 2021', 
        status: 'On Hold', 
        initiatedBy: 'Robert Mason', 
        estCreditDate: '06 Oct 2021 (Estimate based on requested debit date)'
      })
      await pmtApprovalPg.validateApprovalProcess([ 'Kevin Honig ( me )', ' Approval Mandatory', ' Reject  Approve' ])
      await pmtApprovalPg.validateAuditTrail({
        expectedFieldsToValidate: 5, 
        validationData: [
          'This payment is on hold due to the following security issue: The account for user Carolyn Sears (CarolynSears@plooto.com) has been temporarily locked. Please contact Plooto support for assistance.',
          'October 1, 2021',
          '@ 10:53 am',
          'Payment initiated by Robert Mason (RobertMason@gmail.com)',
          '(Additional approvals required)'
        ]
      })
    })
  })
})
