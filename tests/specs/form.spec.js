const { test } = require('@playwright/test');
const FormPage = require('../pages/FormPage');
const { faker } = require('@faker-js/faker');

test.describe('DemoQA Form Tests', () => {
  let formPage;
  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobile: faker.string.numeric(10) 
  };

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.navigate();
  });

  test('Submit form with valid data', async () => {
    await formPage.fillForm(testData);
    await formPage.submitForm();
    await formPage.verifySubmittedData(testData);
  });
});