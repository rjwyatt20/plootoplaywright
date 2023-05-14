/**
 * Purpose: Company Selection Displays list of companies (and their status) available to the user
 * 
 * Current Cases: 
 * 1. Company link for "Plooto Inc" will lead to Dashboard
 * 2. Company link for other company will not lead to Dashboard. 
 * 3a. Company selection table has correct fields
 * 3b. Company selection table status codes fall within allowed params
 * 3c. Company selection table outstanding items fall within allowed params - @skipped for issue ProjId-TicketId
 * 
 * 
 */

const { test, expect } = require('@playwright/test')
const { CompanySelectionPage } = require('../pages/CompanySelectionPage')
const { DashboardPage } = require('../pages/DashboardPage')
let companySelectionPg = {}
let dashboardPg = {}
// @positiveCase
test.describe('Given a user on the Company Selection Page', () => {
  test.beforeEach(async ({ page }) => {
    companySelectionPg = new CompanySelectionPage(page)
    dashboardPg = new DashboardPage(page)
    
    await page.goto(companySelectionPg.relativeUrl)
  })

  test.describe('When the user clicks the "Plooto Inc" cell within the list of companies', async () => {
    test('Then the browser redirects to the Company Dashboard Page', async ({ page }) => {
      await companySelectionPg.clickCompanyRowFromTable('Plooto Inc')
    
      await expect(page).toHaveURL(dashboardPg.relativeUrl)     
    })
  })
  
  test.describe('When the user clicks the "Plooto Inc 2" cell within the list of companies', async () => {
    test('Then the browser does not redirect to the Company Dashboard Page', async ({ page }) => {
      await companySelectionPg.clickCompanyRowFromTable('Plooto Inc 2')
    
      await expect(page).toHaveURL(companySelectionPg.relativeUrl)     
    })
  })
  
  // @slow
  test.describe('When the user inspects the company selection table', async () => {
    test('Then the user finds valid data in the table', async ({ page }) => {
  
      await companySelectionPg.checkTableDataHeaders({
        selector: companySelectionPg.selectClientsTableHeaders, 
        expectedHeaders: companySelectionPg.verificationData.companyTableHeaders
      })
      await companySelectionPg.checkTableValuesInAllowedList({
        selector: companySelectionPg.selectClientsTableStatusCodes, 
        allowedList: companySelectionPg.verificationData.statusCodes,
        exactMatch: true
      })
      /**
       * currently failing, moved to separate test  
       * re-enable when ticket ProjectId-TicketId is finished
       */
  
      // await companySelectionPg.checkTableValuesInAllowedList({
      //   selector: companySelectionPg.selectClientsTableOutstandingItems, 
      //   allowedList: companySelectionPg.verificationData.outstandingItemsAllowed,
      //   exactMatch: false
      // })
      
    })
  
    // @skipped @fileATicket for this issue, re-enable when ticket is complete
    test.skip('Then the values in the oustanding items column are in the allowed list', async ({ page }) => {
      // const companySelectionPg = new CompanySelectionPage(page)
      // await companySelectionPg.goto()
  
      // re-insert after checking status codes in prior test when the issue is fixed
      await companySelectionPg.checkTableValuesInAllowedList({
        selector: companySelectionPg.selectClientsTableOutstandingItems, 
        allowedList: companySelectionPg.verificationData.outstandingItemsAllowed,
        exactMatch: false
      })
    })
  })  
})

