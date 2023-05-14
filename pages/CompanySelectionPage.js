import {expect} from '@playwright/test'
import {PlootoPage} from './PlootoPage'

exports.CompanySelectionPage  = class CompanySelectionPage extends PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)
    this.relativeUrl = '/company_select.html'

    this.verificationData = {
      statusCodes: ['Active', 'Subscription Cancelled', 'Verification In Progress', 'Subscription Active'],
      outstandingItemsAllowed: [
        /None/, 
        /^[0-9]+ outstanding approvals$/, 
        /^[0-9]+ pending payments$/, 
      ],
      companyTableHeaders: ['Company Name', 'Status', 'Outstanding Items']
    }
    
    this.clientListCard = page.locator('.card-plooto')
    this.companyTableRow = page.getByRole('row')
    this.selectClientSection = page.locator('#select_clients')
    this.selectClientsTableHeaders = this.selectClientSection.locator('th')
    this.selectClientsTableStatusCodes = this.selectClientSection.locator('tr td:nth-child(2)')  
    this.selectClientsTableOutstandingItems = this.selectClientSection.locator('tr td:nth-child(3)')
  }

  async clickCompanyRowFromTable(companyName) {
    await this.page.getByRole('cell', { name: companyName, exact: true }).click()
  }

  async checkTableValuesInAllowedList({selector, allowedList, exactMatch}) {
    for (const value of await selector.allInnerTexts()) {
      if (exactMatch) {
        await expect(allowedList.filter(item => item === value).length, 
        `${value} was not in allowed list: ${allowedList}`).toEqual(1)
      } else {
        await expect(allowedList.filter(item => value.match(item)).length, 
        `${value} was not in allowed list: ${allowedList}`).toEqual(1)
      }
    }
  }
}