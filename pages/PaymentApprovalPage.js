import {expect} from '@playwright/test'
import {PlootoPage} from './PlootoPage'

exports.PaymentApprovalPage  = class PaymentApprovalPage extends PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)
    this.relativeUrl = '/payment_approval.html'
    
    this.paymentDetailsRows = this.page.locator('.details-container').filter({hasText: 'Contact'}).locator('.row')
    this.paymentApprovalHistory = this.page.locator('#components-user-payments-paymentApprovalHistory tr').nth(1).getByRole('cell')
    this.auditorLogsList = this.page.locator('#components-user-auditLogs-auditLogsList div').filter({has: this.page.locator('i')}).locator('span')
  }

  // object version
  async validatePaymentDetails({...validationFields}) {

    const data = await this.paymentDetailsRows.allInnerTexts().then(text => {
      return text.map(t => t.split(':')[1].trim())
    })

    let index = 0;
    for (const key in validationFields) {
      const actualData = data[index]
      const expData = validationFields[key]

      await expect.soft(expData === actualData, `Expected: ${expData} did not match actual: ${actualData}`).toBeTruthy()
      index++
    }
  }
  
  // array version
  async  validateApprovalProcess({expectedFieldsToValidate, validationData}) {
    let count = 0
    for(const actualData of await this.paymentApprovalHistory.all()) {
      await expect.soft(actualData).toHaveText(validationData[count])
      count++
    }

    expect.soft(count === expectedFieldsToValidate, 
      `Expected to validate ${expectedFieldsToValidate} fields in approval process. Validated ${count} instead`).toBeTruthy()
  }

  async validateAuditTrail({expectedFieldsToValidate, validationData}) {
    let count = 0

    for (const auditLogRow of await this.auditorLogsList.all()) {
      await expect(auditLogRow).toHaveText(validationData[count])
      count++
    }

    expect.soft(count === expectedFieldsToValidate, 
      `Expected to validate ${expectedFieldsToValidate} fields in approval process. Validated ${count} instead`).toBeTruthy()


  }
  
}