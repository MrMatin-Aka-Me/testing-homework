const { assert } = require('chai');

let bug_id = '';

if (process.env.BUG_ID !== undefined) {
    bug_id = process.env.BUG_ID
}

describe('Проверка корзины на функциональность', () => {
    it("Cодержимое корзины должно сохраняться между перезагрузками страницы;", async ({browser}) => {
        browser.setWindowSize(1366, 768);
        await browser.url("/hw/store/catalog/0"+`?bug_id=${bug_id}`);

        const btn = await browser.$('.ProductDetails-AddToCart')

        await btn.click()

        await browser.url('/hw/store/cart' + `?bug_id=${bug_id}`)

        const productNameBefore = await browser.$(".Cart-Name");

        browser.refresh();

        const productNameAfter = await browser.$(".Cart-Name");

        assert.equal(
            await productNameBefore.getText(),
            await productNameAfter.getText(),
            "товар не сохранился при перезагрузке"
        );
    });

    describe('Проверка формы на функциональность', () => {
        it("Поля формы заполнены корректно и при нажатии на кнопку Checkout появляется сообщение об успехе", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer();
            const [page] = await puppeteer.pages();

            await page.goto('http://localhost:3000/hw/store/cart' + (bug_id ? `?bug_id=${bug_id}` : '')); //bug_id=10, bug_id=8

            const nameInputSelector = '.Form-Field_type_name';
            const phoneInputSelector = '.Form-Field_type_phone';
            const addressTextareaSelector = '.Form-Field_type_address';
            await Promise.all([
                page.waitForSelector(nameInputSelector),
                page.waitForSelector(phoneInputSelector),
                page.waitForSelector(addressTextareaSelector)
            ]);

            // Type into search box
            await page.type(nameInputSelector, 'Покупатель');
            await page.type(phoneInputSelector, '89272346726');
            await page.type(addressTextareaSelector, 'address');

            // Wait and click on first result
            const submitButtonSelector = '.Form-Submit';
            await page.waitForSelector(submitButtonSelector);
            await page.click(submitButtonSelector);

            await browser.assertView("Well_done", ".Application", {
                compositeImage: false,
                ignoreElements: ['.Cart-Number']
            });

        });
    })

    // it("Если товар уже добавлен в корзину, повторное нажатие кнопки добавить в корзину должно увеличивать его количество", async ({browser}) => {
    //     browser.setWindowSize(1366, 768);
    //     await browser.url("/hw/store/cart" + `?bug_id=${bug_id}`);
    //
    //     const countBefore = browser.$(".Cart-Count");
    //
    //     assert.equal(
    //         await countBefore.getText(),
    //         1,
    //         "В корзине должно быть 1 штука товара"
    //     );
    //
    //
    //     await browser.url("/hw/store/catalog/0" + `?bug_id=${bug_id}`);
    //     const btn = await browser.$('.ProductDetails-AddToCart')
    //     await btn.click()
    //
    //     await browser.url("/hw/store/cart"+`?bug_id=${bug_id}`);
    //     const countAfter = browser.$(".Cart-Count");
    //
    //     assert.equal(
    //         await countAfter.getText(),
    //         2,
    //         "В корзине количество должно увеличиться до 2"
    //     );
    // });
})