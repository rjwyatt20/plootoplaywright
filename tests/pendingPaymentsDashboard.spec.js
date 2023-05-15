/**
 * Purpose: Pending Payments Displays ongoing payments. Payment to Cavages will navigate to a Payment Approval page
 * 1. Clicking payment to Cavages will navigate to Payment Approval
 * 2a. Pending Payments shows 33 on pending payables tab
 * 2b. Pending payments shows 6 on pending receivables tab
 * 2c. Panding payables tab is active on initial load
 * 2d. Validate data for 2 pending payables awaiting approval
 */

const { test, expect } = require('@playwright/test')
const { PendingPaymentsDashboardPage } = require('../pages/PendingPaymentsDashboardPage')
const { PaymentApprovalPage } = require('../pages/PaymentApprovalPage')
const { testCaseData, testCaseSpecificSetup } = require('../test_cases/pendingPaymentsDashboard.testcases')

let pendingPaymentsDashPg

test.describe('Given a user on the Pending Payments Dashboard Page', async () => {
  test.beforeEach(async({ page }) => {
    pendingPaymentsDashPg = new PendingPaymentsDashboardPage(page)

    await testCaseSpecificSetup({page, pendingPaymentsDashPg})
  })
  test.describe('When the user clicks the company name Cavages', async () => {
    test('Then the browser redirects to the payment approval page for Cavages', async ({ page }) => {
      const paymentApprovePg = new PaymentApprovalPage(page)

      await pendingPaymentsDashPg.clickThroughToPendingApprovalsForCompany('Cavages')
      await expect(page).toHaveURL(paymentApprovePg.relativeUrl)  
    })
  })

  test.describe('When the user examines the list of pending payables needing approval', async () => {
    for (const testCase of testCaseData) {
      test(`${testCase.caseName}: Then the user can see ${testCase.pendingPayableCount} pending payables needing approval on the pending payables tab`, async ({ page }) => {
      
        await expect.soft(pendingPaymentsDashPg.pendingPayablesTab.locator('span span')).toHaveText(testCase.pendingPayableCount)
        await expect.soft(pendingPaymentsDashPg.pendingReceivablesTab.locator('span span')).toHaveText(testCase.pendingReceivablesCount)
        await pendingPaymentsDashPg.validateIfTabIsActiveForPaymentApprovals({
          childSelector: pendingPaymentsDashPg.pendingPayablesTab,
        })
        await pendingPaymentsDashPg.validateDataInRow({
          selector: pendingPaymentsDashPg.rowsInTableInsidePayablesTab,
          rowFilterText: testCase.companyName,
          expectedData: testCase.paymentDataRow
        })
      })  
    }
  })
})
