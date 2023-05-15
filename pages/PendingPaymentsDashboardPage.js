import {expect} from '@playwright/test'
import {DashboardPage} from './DashboardPage'

exports.PendingPaymentsDashboardPage  = class PendingPaymentsDashboardPage extends DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)
    this.relativeUrl = '/pending_payments.html'

    this.pendingPayablesTab = page.getByRole('tab', { name: 'Pending Payables' })
    this.pendingReceivablesTab = page.getByRole('tab', { name: 'Pending Receivables' })
    this.rowsInTableInsidePayablesTab = page.locator('#pending_payables tr');
  }

  async clickThroughToPendingApprovalsForCompany(companyName) {
    await this.rowsInTableInsidePayablesTab.filter({hasText: companyName}).click()
  }
}