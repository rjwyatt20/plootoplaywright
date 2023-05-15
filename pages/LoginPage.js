import {PlootoPage} from './PlootoPage'

exports.LoginPage = class LoginPage extends PlootoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    super(page)

    this.relativeUrl = '/login.html'
    this.submitLoginPageButton = page.getByRole('link', { name: 'Sign In' })

  }
} 