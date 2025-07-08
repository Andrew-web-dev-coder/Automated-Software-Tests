# Automated Tests for DemoQA


## Project Overview
Automated test suite for [demoqa.com](https://demoqa.com) using Playwright with Page Object Model pattern.

## 🚀 Installation
```bash
npm ci
npx playwright install
# Running Tests
Run all tests
bash
npx playwright test
Run specific test suite
bash
# Alerts tests
npx playwright test tests/specs/alerts.spec.js

# Form tests
npx playwright test tests/specs/form.spec.js

# Select Menu tests
npx playwright test tests/specs/selectmenu.spec.js

# Text Box tests
npx playwright test tests/specs/textbox.spec.js

# Tool Tips tests
npx playwright test tests/specs/tooltips.spec.js
Run in specific browser
bash
npx playwright test --project=chromium
npx playwright test --project=firefox
Run with different resolutions
bash
# 1920x1080
npx playwright test --viewport-size=1920,1080

# 1366x768 
npx playwright test --viewport-size=1366,768
Run with additional options
bash
# Run in headless mode
npx playwright test --headed

# Run with tracing
npx playwright test --trace=on

# Generate HTML report
npx playwright show-report
📂 Project Structure
tests/
  pages/
    AlertsPage.js       # Page object for alerts
    FormPage.js         # Page object for forms  
    SelectMenuPage.js   # Page object for select menus
    TextBoxPage.js      # Page object for text boxes
    ToolTipsPage.js     # Page object for tooltips
  specs/
    alerts.spec.js      # Test scenarios for alerts
    form.spec.js        # Test scenarios for forms
    selectmenu.spec.js  # Test scenarios for select menus
    textbox.spec.js     # Test scenarios for text boxes
    tooltips.spec.js    # Test scenarios for tooltips
✅ Test Scenarios
1. Alerts Testing
Covers all alert types:

Simple alert

Timer alert

Confirm alert

Prompt alert

2. Form Testing
Fills mandatory fields:

First Name

Last Name

Email

Gender

Mobile Number

Date of Birth

Subjects

Hobbies

Picture upload

Address

State and City

3. Text Box Testing
Fills text box with random data:

Full Name

Email

Current Address

Permanent Address

4. Tool Tips Testing
Verifies all tooltips:

Button tooltip

Input field tooltip

Contrary text tooltip

Section tooltip

5. Select Menu Testing
Covers all dropdowns:

Select Value (Group 2, option 1)

Select One (Other)

Old Style Select Menu (Green)

Multiselect drop down (Black, Blue)

📊 Reporting
HTML reports: playwright-report/

Screenshots on failure: test-results/

Trace viewer: npx playwright show-trace

🔄 CI/CD Integration
Tests run automatically:

On every push to main branch

On every pull request

Daily at midnight UTC

🛠 Technical Details
Framework: Playwright 1.42+

Browser Support: Chromium, Firefox

Screen Resolutions: 1920x1080, 1366x768

Parallel Execution: 4 workers

Error Handling: Automatic screenshots on failure

Test Data: Fully auto-generated

# Review 
* remove reports
* Move locators to the Page Object constructor seaction
* It has been observed that there is inconsistency in the structure of the tests. While some validations and assertions are implemented within the Page Object Model (POM), others are directly written in the test files. This inconsistency can lead to confusion, reduced maintainability, and difficulty in scaling the test suite.
* How to run separate test by keyword in crhomium or firefox with specific resolution?
* Remove all 'expect' to the tests from Page Objects.
* move generating data from test.spec. files to the src logic
