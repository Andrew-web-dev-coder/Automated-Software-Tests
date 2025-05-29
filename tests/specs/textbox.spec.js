const { test } = require('@playwright/test');
const TextBoxPage = require('../pages/TextBoxPage');
const { faker } = require('@faker-js/faker');

test.describe('DemoQA TextBox Tests', () => {
    let textBoxPage;

    test.beforeEach(async ({ page }) => {
        textBoxPage = new TextBoxPage(page);
        await textBoxPage.navigate();
    });

    test('Fill text box with random data', async () => {
        const testData = {
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            currentAddress: faker.location.streetAddress(),
            permanentAddress: faker.location.streetAddress()
        };

        await textBoxPage.fillForm(testData);
        await textBoxPage.submitForm();
        await textBoxPage.verifyOutput(testData);
    });
});