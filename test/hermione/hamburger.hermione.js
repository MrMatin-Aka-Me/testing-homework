const {assert} = require("chai");

describe('Гамбургер', function () {
    it("на ширине меньше 576px навигационное меню должно скрываться за гамбургер", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store');

        const page = await browser.$("nav");
        await page.waitForExist();

        await browser.assertView("plain", "nav", {
            compositeImage: false,
        });
    });

    it("при выборе элемента из меню гамбургера, меню должно закрываться", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store');

        const hamburger = await browser.$('.Application-Toggler')
        const menu = await browser.$('.Application-Menu')

        assert.equal(await hamburger.isDisplayed(), true)

        await hamburger.click()
        assert.equal(await menu.isDisplayed(), true)

        await menu.click()
        assert.equal(await menu.isDisplayed(), false)
    });
});