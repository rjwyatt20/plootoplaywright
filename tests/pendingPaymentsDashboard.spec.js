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

let pendingPaymentsDashPg

test.describe('Given a user on the Pending Payments Dashboard Page', async () => {
  test.beforeEach(async({ page }) => {
    pendingPaymentsDashPg = new PendingPaymentsDashboardPage(page)

    await page.goto(pendingPaymentsDashPg.relativeUrl)
  })
  test.describe('When the user clicks the company name Cavages', async () => {
    test('Then the browser redirects to the payment approval page for Cavages', async ({ page }) => {
      const paymentApprovePg = new PaymentApprovalPage(page)

      await pendingPaymentsDashPg.clickThroughToPendingApprovalsForCompany('Cavages')
      await expect(page).toHaveURL(paymentApprovePg.relativeUrl)  
    })
  })

  test.describe('When the user examines the list of pending payables needing approval', async () => {
    test('Then the user can see 33 pending payables needing approval on the pending payables tab', async ({ page }) => {
      
      await expect.soft(await pendingPaymentsDashPg.pendingPayablesTab.locator('span span')).toHaveText("33")
      await expect.soft(pendingPaymentsDashPg.pendingReceivablesTab.locator('span span')).toHaveText("6")
      await pendingPaymentsDashPg.validateIfTabIsActiveForPaymentApprovals({
        childSelector: pendingPaymentsDashPg.pendingPayablesTab,
      })
      await pendingPaymentsDashPg.validateDataInRow({
        selector: pendingPaymentsDashPg.rowsInTableInsidePayablesTab,
        rowFilterText: "Laura Ashley",
        expectedData: [
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
      })
    })
  })
})
