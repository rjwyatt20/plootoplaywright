/**
 *  Purpose: Login Allows user to authenticate. 
 *  Current Cases: 
 *  1. "Sign In" button will navigate user to Company Selection screen
 * 
 *  Future Cases:
 *  1. Dealing with positive and negative cases around credentials
 *  2. Signup link
 *  3. Mock out handler for Intuit integration
 *  
 */


const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { CompanySelectionPage } = require('../pages/CompanySelectionPage')
let loginPg, companySelectionPg

test.describe('Given a user on the login page', async () => {
  test.beforeEach(async ({ page }) => {
    loginPg = new LoginPage(page)
    companySelectionPg = new CompanySelectionPage(page)
    
    await page.goto(loginPg.relativeUrl)
  })

  test.describe('When the user clicks the "Sign in" Button', async () => {
    test('Then the page redirects to the Company Selection Page', async ({ page }) => {
      await loginPg.submitLoginPageButton.click()
    
      // validates url redirected to
      await expect(page.url().includes(companySelectionPg.relativeUrl)).toBe(true)
      // validates expected content on that page
      await expect(companySelectionPg.clientListCard).toBeVisible()
    })
  })
})