const { bug_id } = require('./bugId');

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