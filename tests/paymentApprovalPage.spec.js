/**
 * Purpose: Payment Approval Displays all the details about payment, its approval process and audit trail
 * 
 * 1a. Payment approval displays all payment details
 * 1b. Payment approval displays approval process
 * 1c. Payment approval displays audit trail
 * 
 */

const { test, expect } = require('@playwright/test')
const { PaymentApprovalPage } = require('../pages/PaymentApprovalPage')
const { testCaseSpecificSetup, testCaseData } = require('../test_cases/paymentApproval.testcases')

let pmtApprovalPg
test.describe('Given a user on the Payment Approval Page for a payment', async () => {
  test.beforeEach(async({ page }) => {
    pmtApprovalPg = new PaymentApprovalPage(page)

    await testCaseSpecificSetup({page, pmtApprovalPg})
  })

  test.describe('When the user examines the payment approval data', async () => {
    for (const testCase of testCaseData) {

      test(`${testCase.caseName}: Then the user can see the correct data in the tab`, async ({ page }) => {
        await pmtApprovalPg.validatePaymentDetails(testCase.validPaymentDetails)
        await pmtApprovalPg.validateApprovalProcess({
          expectedFieldsToValidate: 3, 
          validationData: testCase.validApprovalProcess
        })
        await pmtApprovalPg.validateAuditTrail({
          expectedFieldsToValidate: 5, 
          validationData: testCase.validAuditTrail
        })
      })
    }

  })
})  
