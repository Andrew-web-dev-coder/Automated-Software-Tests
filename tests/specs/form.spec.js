const { test } = require('@playwright/test');
const FormPage = require('../pages/FormPage');
const { faker } = require('@faker-js/faker');


test.describe.configure({ mode: 'serial', timeout: 120000 });

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
    description: 'should submit form with all valid fields',
    timeout: 60000 
  },
  {
    title: 'Long names',
    data: generateTestData({
      firstName: faker.string.alpha({ length: 30 }),
      lastName: faker.string.alpha({ length: 30 })
    }),
    description: 'should handle long names @slow',
    timeout: 90000 
  },
  {
    title: 'Minimum required fields',
    data: generateTestData({
      lastName: '',
      gender: undefined
    }),
    description: 'should submit with only required fields',
    timeout: 60000
  }
];

test.describe('DemoQA Form Tests', () => {
  let formPage;

  test.beforeEach(async ({ page }, testInfo) => {
    formPage = new FormPage(page);
    
    
    if (testInfo.project.name === 'firefox') {
      test.setTimeout(120000);
    }
    
    try {
      await formPage.navigate();
      await page.waitForLoadState('domcontentloaded');
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  });

  test('Submit form with valid data', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'firefox') {
      test.setTimeout(120000);
    }
    
    const data = generateTestData();
    await formPage.fillForm(data);
    await formPage.submitForm();
    await formPage.verifySubmittedData(data);
  });

  for (const testCase of testCases) {
    test(testCase.description, async ({ page }, testInfo) => {
      
      const timeout = testInfo.project.name === 'firefox' 
        ? testCase.timeout * 1.5 || 90000 
        : testCase.timeout || 60000;
      
      test.setTimeout(timeout);

      await formPage.fillForm(testCase.data);
      await formPage.submitForm();
      await formPage.verifySubmittedData(testCase.data);
    });
  }
});