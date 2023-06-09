import {expect, test} from '@playwright/test'
import {DashboardPage} from './DashboardPage'

exports.PaymentApprovalsDashboardPage  = class PaymentApprovalsDashboardPage extends DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)
    this.relativeUrl = '/payment_approvals.html'

    this.myPaymentsToApproveTab = page.getByRole('tab', { name: 'Payments Awaiting My Approval' })
    this.allPaymentsToApproveTab = page.getByRole('tab', { name: 'All Payments Awaiting Approval' })
    this.rowsInTableInsideMyPaymentsTab = page.locator('#approve_payments tr');
  }

}