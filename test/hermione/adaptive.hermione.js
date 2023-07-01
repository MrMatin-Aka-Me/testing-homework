const { assert } = require('chai');

let bug_id = '';

if (process.env.BUG_ID !== undefined) {
    bug_id = process.env.BUG_ID
}


describe("Общие требования", async function () {
    it("вёрстка должна адаптироваться под ширину экрана 1100px", async ({browser}) => {
        await browser.setWindowSize(1100, 800);
        await browser.url('/hw/store' + `?bug_id=${bug_id}`);
        const page = await browser.$(".Application");
        await page.waitForExist();

        await browser.assertView("plain", ".Application", {
            compositeImage: false,
        });
        await browser.url('/hw/store/catalog/0' + `?bug_id=${bug_id}`);
        const page1 = await browser.$(".Application");
        await page1.waitForExist();

        await browser.assertView("plain2", ".Application", {
            compositeImage: false,
        });
    });
    it("Вёрстка должна адаптироваться под ширину экрана 800px", async ({browser}) => {
        await browser.setWindowSize(800, 1000);

        await browser.url('/hw/store' + `?bug_id=${bug_id}`);

        const page = await browser.$(".Application");
        await page.waitForExist();

        await browser.assertView("plain", ".Application", {
            compositeImage: false,
        });

        await browser.url('/hw/store/catalog/0' + `?bug_id=${bug_id}`);
        const page1 = await browser.$(".Application");
        await page1.waitForExist();

        await browser.assertView("plain2", ".Application", {
            compositeImage: false,
        });
    });



    it("на ширине меньше 576px навигационное меню должно скрываться за гамбургер", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store' + `?bug_id=${bug_id}`);

        const page = await browser.$("nav");
        await page.waitForExist();

        await browser.assertView("plain", "nav", {
            compositeImage: false,
        });
    });

    it("при выборе элемента из меню гамбургера, меню должно закрываться", async ({browser}) => {
        await browser.setWindowSize(500, 1000);
        await browser.url('/hw/store' + `?bug_id=${bug_id}`); //bug_id=4

        const hamburger = await browser.$('.Application-Toggler')
        const menu = await browser.$('.Application-Menu')

        assert.equal(await hamburger.isDisplayed(), true)

        await hamburger.click()
        assert.equal(await menu.isDisplayed(), true)

        await menu.click()
        assert.equal(await menu.isDisplayed(), false)
    });
    //
    // it("Страницы главная, доставка и контакты имеют статическое содержимое", async ({browser}) => {
    //     await browser.setWindowSize(1920, 1080)
    //     await browser.url('/hw/store' + `?bug_id=${bug_id}`);
    //
    //     await browser.assertView("home", ".Application", {
    //         compositeImage: true,
    //     });
    //
    //     await browser.url('/hw/store/delivery' + `?bug_id=${bug_id}`);
    //     await browser.assertView("delivery", ".Application", {
    //         compositeImage: true,
    //     });
    //
    //     await browser.url('/hw/store/contacts' + `?bug_id=${bug_id}`);
    //     await browser.assertView("contacts", ".Application", {
    //         compositeImage: true,
    //     });
    // })
})