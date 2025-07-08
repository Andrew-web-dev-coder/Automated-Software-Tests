const { expect } = require('@playwright/test');

class AlertsPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/alerts';
    this.alertButton = page.locator('#alertButton');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async clickAlertButton() {
    await this.alertButton.click();
  }
}

module.exports = AlertsPage;