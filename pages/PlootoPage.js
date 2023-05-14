import {expect} from '@playwright/test'

exports.PlootoPage = class PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page
    this.relativeUrl = '/' // default, pages should over-wright this
  }

  async checkTableDataHeaders({selector, expectedHeaders}) {
    const expHeaders = [...expectedHeaders]
    for (const header of await selector.allInnerTexts()) {
      const expectedHeader = expHeaders.shift()
      await expect.soft(header === expectedHeader, 
        `Expected header ${expHeaders} did not match ${header}`).toBeTruthy()
    }
  }

}