const { test } = require('@playwright/test');
const TextBoxPage = require('../pages/TextBoxPage');
const { faker } = require('@faker-js/faker');


const generateTestData = (options = {}) => {
  const maxLength = options.long ? 50 : 30;
  return {
    fullName: faker.person.fullName().substring(0, maxLength),
    email: faker.internet.email().substring(0, maxLength),
    currentAddress: faker.location.streetAddress().substring(0, maxLength * 2),
    permanentAddress: faker.location.streetAddress().substring(0, maxLength * 2)
  };
};


const testCases = [
  {
    name: 'Standard data',
    options: {},
    description: 'should submit form with standard length data'
  },
  {
    name: 'Long data',
    options: { long: true },
    description: 'should submit form with long data',
    slow: true
  },
  {
    name: 'Only required fields',
    options: { onlyRequired: true },
    description: 'should submit with only name and email'
  }
];

test.describe('DemoQA TextBox Tests', () => {
  let textBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();
  });

  
  test('Fill form with standard data', async () => {
    const data = generateTestData();
    await textBoxPage.fillForm(data);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutput(data);
  });

  test('Fill form with long data @slow', async () => {
    const data = generateTestData({ long: true });
    await textBoxPage.fillForm(data);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutput(data);
  });

  
  for (const testCase of testCases) {
    test(testCase.description + (testCase.slow ? ' @slow' : ''), async () => {
      let data = generateTestData(testCase.options);
      
      if (testCase.options.onlyRequired) {
        data = {
          fullName: data.fullName,
          email: data.email
        };
      }

      await textBoxPage.fillForm(data);
      await textBoxPage.submitForm();
      await textBoxPage.verifyOutput(data);
    });
  }
});