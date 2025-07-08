const { test } = require('@playwright/test');
const FormPage = require('../pages/FormPage');
const { faker } = require('@faker-js/faker');


const generateTestData = (options = {}) => ({
  firstName: options.firstName || faker.person.firstName(),
  lastName: options.lastName || faker.person.lastName(),
  email: options.email || faker.internet.email(),
  mobile: options.mobile || faker.string.numeric(10),
  gender: options.gender || ['male', 'female', 'other'][Math.floor(Math.random() * 3)]
});


const testCases = [
  {
    title: 'Standard valid data',
    data: generateTestData(),
    description: 'should submit form with all valid fields'
  },
  {
    title: 'Long names',
    data: generateTestData({
      firstName: faker.string.alpha({ length: 30 }),
      lastName: faker.string.alpha({ length: 30 })
    }),
    description: 'should handle long names @slow',
    timeout: 45000
  },
  {
    title: 'Minimum required fields',
    data: generateTestData({
      lastName: '',
      gender: undefined
    }),
    description: 'should submit with only required fields'
  }
];

test.describe('DemoQA Form Tests', () => {
  let formPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.navigate();
    await page.waitForTimeout(1000); 
  });

  
  test('Submit form with valid data', async () => {
    const data = generateTestData();
    await formPage.fillForm(data);
    await formPage.submitForm();
    await formPage.verifySubmittedData(data);
  });

  
  for (const testCase of testCases) {
    test(testCase.description, async () => {
      await formPage.fillForm(testCase.data);
      await formPage.submitForm();
      await formPage.verifySubmittedData(testCase.data);
    }, testCase.timeout ? { timeout: testCase.timeout } : {});
  }
});