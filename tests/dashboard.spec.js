/**
 * Purpose: Dashboard Displays current status of the company verification as well highlights actionable items. Payment Approvals and Pending Payments are interactive
 * 1. Actionable items in sidebar nav show appropriate counts in badge
 * 2. Clicking payment approval link navigates to payment approvals page
 * 3. Clicking pending payments link navigates to pending payments page 
 * 
 */

const { test, expect } = require('@playwright/test')
const { DashboardPage } = require('../pages/DashboardPage')
const { PaymentApprovalsDashboardPage } = require('../pages/PaymentApprovalsDashboardPage')
const { PendingPaymentsDashboardPage } = require('../pages/PendingPaymentsDashboardPage')
let dashboardPg

test.describe('Given a user on the Dashboard Page', async () => {
  test.beforeEach(async ({ page }) => {
    dashboardPg = new DashboardPage(page)

    await page.goto(dashboardPg.relativeUrl)
  })

  test.describe('When the user examines sidebar nav', async () => {
    test('Then the user can see actionable items in the nav and actionableItems are links', async ({ page }) => {
      const { actionableItems } = dashboardPg.testCases.PlootoIncHasActionableItems

      for (const actItem of actionableItems) {
        await expect.soft(await dashboardPg[actItem.selector].locator('span.badge')).toHaveText(actItem.count)
        await expect.soft(await dashboardPg[actItem.selector]).toHaveAttribute(actItem.expectation.attr, actItem.expectation.val)
      }
    })
  })

  test.describe('When the user clicks the Payment Approvals link', async () => {
    test('Then the browser redirects to the Payment Approvals page', async ({ page }) => {
      const paymentApprovePg = new PaymentApprovalsDashboardPage(page)

      await dashboardPg.paymentApprovalsLink.click()
      await expect(page).toHaveURL(paymentApprovePg.relativeUrl)     
    })
  })

  test.describe('When the user clicks the Pending Payments link', async () => {
    test('Then the browser redirects to the Payment Approvals page', async ({ page }) => {
      const pendingPmtsPg = new PendingPaymentsDashboardPage(page)

      await dashboardPg.pendingPaymentsLink.click()
      await expect(page).toHaveURL(pendingPmtsPg.relativeUrl)     
    })
  })
})
