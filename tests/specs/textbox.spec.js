const { test } = require('@playwright/test');
const TextBoxPage = require('../pages/TextBoxPage');
const { faker } = require('@faker-js/faker');

// Генератор данных с ограничениями
const generateData = (options = {}) => {
  const maxLength = options.long ? 50 : 30;
  return {
    fullName: faker.person.fullName().substring(0, maxLength),
    email: faker.internet.email().substring(0, maxLength),
    currentAddress: faker.location.streetAddress().substring(0, maxLength * 2),
    permanentAddress: faker.location.streetAddress().substring(0, maxLength * 2)
  };
};

test.describe('DemoQA TextBox Tests', () => {
  let textBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();
  });

  test('Fill form with standard data', async () => {
    const data = generateData();
    await textBoxPage.fillForm(data);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutput(data);
  });

  test('Fill form with long data @slow', async () => {
    const data = generateData({ long: true });
    await textBoxPage.fillForm(data);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutput(data);
  });
});