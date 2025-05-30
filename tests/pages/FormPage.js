const { expect } = require('@playwright/test');

class FormPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/automation-practice-form';
    
    // Локаторы
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderOptions = {
      male: page.locator('label[for="gender-radio-1"]'),
      female: page.locator('label[for="gender-radio-2"]'),
      other: page.locator('label[for="gender-radio-3"]')
    };
    this.mobile = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.resultTable = page.locator('.table-responsive');
  }

  async navigate() {
    // Упрощенная навигация с базовыми проверками
    await this.page.goto(this.url, { 
      waitUntil: 'commit',
      timeout: 60000 
    });
    
    // Ждем появления любого из основных элементов
    await Promise.race([
      this.firstName.waitFor({ state: 'visible', timeout: 30000 }),
      this.lastName.waitFor({ state: 'visible', timeout: 30000 })
    ]);
  }

  async fillForm(data) {
    // Заполнение с проверкой наличия данных
    const fieldsToFill = [
      { field: this.firstName, value: data.firstName },
      { field: this.lastName, value: data.lastName },
      { field: this.email, value: data.email },
      { field: this.mobile, value: data.mobile }
    ];

    for (const { field, value } of fieldsToFill) {
      if (value) {
        await field.fill(value);
        await this.page.waitForTimeout(200); // Короткая пауза
      }
    }

    // Выбор гендера
    const gender = data.gender || 'male';
    await this.genderOptions[gender].click();
  }

  async submitForm() {
    await this.submitButton.click();
    await this.modal.waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifySubmittedData(data) {
    const results = await this.resultTable.textContent();
    
    // Гибкая проверка результатов
    const expectedValues = {
      'First Name': data.firstName,
      'Last Name': data.lastName,
      'Email': data.email,
      'Mobile': data.mobile,
      'Gender': data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : 'Male'
    };

    for (const [field, value] of Object.entries(expectedValues)) {
      if (value) {
        expect(results).toContain(value);
      }
    }
  }
}

module.exports = FormPage;