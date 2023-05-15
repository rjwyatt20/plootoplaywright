import {expect} from '@playwright/test'
import {PlootoPage} from './PlootoPage'

exports.DashboardPage  = class DashboardPage extends PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)

    this.relativeUrl = '/dashboard.html'

    this.paymentApprovalsLink = page.getByRole('link', {name: "Payment Approvals"})
    this.pendingPaymentsLink = page.getByRole('link', {name: "Pending Payments"})

  }

  async validateIfTabIsActiveForPaymentApprovals({childSelector}) {
    const parent = this.page.getByRole('listitem').filter({has: childSelector})

    await expect.soft(parent).toHaveClass('active')
  }

  async validateDataInRow({
    selector,
    rowFilterText,
    expectedData
  }) {
    const selectorForCellsInThisRow = selector
      .filter({has: this.page.getByText(rowFilterText).first()})
      .getByRole('cell')

    const dataInRow = await selectorForCellsInThisRow.allInnerTexts()

    for (const validation of expectedData) {
      await expect.soft(selectorForCellsInThisRow.nth(validation.cell)).toHaveText(validation.text)
    }    
  }
}