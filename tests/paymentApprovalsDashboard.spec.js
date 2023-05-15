/**
 * Purpose: Payment Approvals Displays a single payment that still requires user's approval. No interactive elements
 * 
 * Current cases:
 * 1a. Payment Approvals show 1 on my payments tab
 * 1b. Payment Approvals show 1 on all payments tab
 * 1c. My payments tab is active on load
 * 1d. Validate data for payment awaiting approval
 * 
 */

const { test, expect } = require('@playwright/test')
const { PaymentApprovalsDashboardPage } = require('../pages/PaymentApprovalsDashboardPage')
const { testCaseData } = require('../test_cases/paymentApprovalsDashboard.testcases')

let paymentApprovalsDashPg

test.describe('Given a user on the Payment Approvals Dashboard Page', async () => {
  test.beforeEach(async({ page }) => {
    paymentApprovalsDashPg = new PaymentApprovalsDashboardPage(page)

    await page.goto(paymentApprovalsDashPg.relativeUrl)
  })

  test.describe('When the user examines the list of payments needing approval', async () => {
    for (const testCase of testCaseData) {
      test(`${testCase.caseName}: Then the user can see a single payment needing approval on the my payments tab`, async ({ page }) => {
      
        await expect.soft(paymentApprovalsDashPg.myPaymentsToApproveTab.locator('span')).toHaveText(testCase.myPaymentsCount)
        await expect.soft(paymentApprovalsDashPg.allPaymentsToApproveTab.locator('span')).toHaveText(testCase.allPaymentsCount)
        await paymentApprovalsDashPg.validateIfTabIsActiveForPaymentApprovals({
          childSelector: paymentApprovalsDashPg.myPaymentsToApproveTab,
        })
        await paymentApprovalsDashPg.validateDataInRow({
          selector: paymentApprovalsDashPg.rowsInTableInsideMyPaymentsTab,
          rowFilterText: testCase.rowFilterText,
          expectedData: testCase.expectedData
        })
      })  
    }
  })
})
