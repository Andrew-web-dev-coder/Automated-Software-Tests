const { test, expect } = require('@playwright/test');
const AlertsPage = require('../pages/AlertsPage');

test.describe('DemoQA Alerts Tests', () => {
  let alertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
  });

  test('Simple alert appears', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });
    await alertsPage.clickAlertButton();
  });
});