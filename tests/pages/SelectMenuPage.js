class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';

        this.selectValueDropdown = page.locator('div#withOptGroup');
        this.selectOneDropdown = page.locator('div#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiSelectDropdown = page.locator('#cars');
        //Dynamic/Generated CSS Classes:
        //
        // The class name css-1uccc91 appears to be auto-generated, likely by a CSS-in-JS library like Emotion, Styled-components, or similar.
        // Such class names can change frequently due to updates or re-compilation of styles, breaking your tests unexpectedly.
        // Use xpath
        this.selectedGroupValue = page.locator('div#withOptGroup div.css-1uccc91-singleValue');
        this.selectedOneValue = page.locator('div#selectOne div.css-1uccc91-singleValue');
    }

    async navigate() {
        await this.page.goto(this.url);

        await this.page.waitForSelector('#oldSelectMenu', { state: 'visible', timeout: 30000 });
    }

    async selectGroupOption() {
        await this.selectValueDropdown.click();
        await this.page.locator('div#react-select-2-option-1-0').waitFor();
        await this.page.locator('div#react-select-2-option-1-0').click();
    }

    async selectOtherOption() {
        await this.selectOneDropdown.click();
        await this.page.locator('div#react-select-3-option-0-5').waitFor();
        await this.page.locator('div#react-select-3-option-0-5').click();
    }

    async selectOldStyleColor() {
        await this.oldStyleSelect.selectOption('Green');

        await this.page.waitForTimeout(500);
    }

    async selectMultiColors() {
        await this.multiSelectDropdown.selectOption(['volvo', 'opel']);

        await this.page.waitForTimeout(500);
    }
}

module.exports = SelectMenuPage;
