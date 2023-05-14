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

let paymentApprovalsDashPg

test.describe('Given a user on the Payment Approvals Dashboard Page', async () => {
  test.beforeEach(async({ page }) => {
    paymentApprovalsDashPg = new PaymentApprovalsDashboardPage(page)

    await page.goto(paymentApprovalsDashPg.relativeUrl)
  })

  test.describe('When the user examines the list of payments needing approval', async () => {
    test('Then the user can see a single payment needing approval on the my payments tab', async ({ page }) => {
      
      await expect.soft(paymentApprovalsDashPg.myPaymentsToApproveTab.locator('span')).toHaveText("1")
      await expect.soft(paymentApprovalsDashPg.allPaymentsToApproveTab.locator('span')).toHaveText("1")
      await paymentApprovalsDashPg.validateIfTabIsActiveForPaymentApprovals({
        childSelector: paymentApprovalsDashPg.myPaymentsToApproveTab,
      })
      await paymentApprovalsDashPg.validateDataInRow({
        selector: paymentApprovalsDashPg.rowsInTableInsideMyPaymentsTab,
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
      })
    })
  })
})
