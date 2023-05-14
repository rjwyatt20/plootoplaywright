import {expect} from '@playwright/test'
import {PlootoPage} from './PlootoPage'

exports.DashboardPage  = class DashboardPage extends PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)

    this.testCases = {
      PlootoIncHasActionableItems: {
        actionableItems: [
          {
            selector: 'paymentApprovalsLink',
            count: "1",
            expectation: {
              attr: 'href',
              val: '#user/dashboard/approvePayments'
            }
          },
          {
            selector: 'pendingPaymentsLink',
            count: "39",
            expectation: {
              attr: 'href',
              val: '#user/dashboard/pendingPayments'
            }
          },
        ]
      }
    }

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
    // console.log('selector', selector, 'rowFilter', rowFilterText)
    // const oneRow = await selector
    //   .filter({has: this.page.getByText(rowFilterText)}).length
    
    // console.log('onerow', oneRow)

    // const cells = oneRow.getByRole('cell')
    const selectorForCellsInThisRow = selector
      .filter({has: this.page.getByText(rowFilterText).first()})
      .getByRole('cell')

    const dataInRow = await selectorForCellsInThisRow.allInnerTexts()
    console.log('data in row', dataInRow)
    for (const validation of expectedData) {
      await expect.soft(selectorForCellsInThisRow.nth(validation.cell)).toHaveText(validation.text)
    }    
  }
}