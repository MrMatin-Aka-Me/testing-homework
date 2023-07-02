const { assert } = require('chai');
const { bug_id } = require('./bugId');

describe('Проверка корзины на функциональность', () => {
    it("Cодержимое корзины должно сохраняться между перезагрузками страницы;", async ({browser}) => {
        browser.setWindowSize(1366, 768); //bug_id=6

        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto('http://localhost:3000/hw/store/catalog/0' + (bug_id ? `?bug_id=${bug_id}` : ''));

        await page.evaluate(() => {
            localStorage.clear();
        });
        let addToCart = await page.waitForSelector('.ProductDetails-AddToCart');
        await addToCart.click()

        let text = (await page.$eval('.nav-link:nth-of-type(4)', node => node.innerHTML));
        if (text === 'Cart') {
            return;
        }

        await page.goto('http://localhost:3000/hw/store/catalog/0' + (bug_id ? `?bug_id=${bug_id}` : ''));
        addToCart = await page.waitForSelector('.ProductDetails-AddToCart');
        text = (await page.$eval('.nav-link:nth-of-type(4)', node => node.innerHTML));
        assert.equal(text, 'Cart (1)', 'товар должен сохраниться при перезагрузке');
        await page.evaluate(() => {
            localStorage.clear();
        });
    });

    describe('Проверка формы на функциональность', () => {
        it("Поля формы заполнены корректно и при нажатии на кнопку Checkout появляется сообщение об успехе", async ({browser}) => {
            const puppeteer = await browser.getPuppeteer(); //bug_id=10, 8, 5
            const [page] = await puppeteer.pages();
            const waitForSelectorOptions = { timeout: 5000 }

            await page.goto('http://localhost:3000/hw/store/cart' + (bug_id ? `?bug_id=${bug_id}` : ''));
            await page.evaluate(() => {
                localStorage.setItem('example-store-cart', '{"1":{"name":"товар1","count":1,"price":100}}');
            });
            await page.goto('http://localhost:3000/hw/store/cart' + (bug_id ? `?bug_id=${bug_id}` : ''));
            const nameInputSelector = '.Form-Field_type_name';
            const phoneInputSelector = '.Form-Field_type_phone';
            const addressTextareaSelector = '.Form-Field_type_address';
            await Promise.all([
                page.waitForSelector(nameInputSelector, waitForSelectorOptions),
                page.waitForSelector(phoneInputSelector, waitForSelectorOptions),
                page.waitForSelector(addressTextareaSelector, waitForSelectorOptions)
            ]);

            await page.type(nameInputSelector, 'Покупатель');
            await page.type(phoneInputSelector, '89272346726');
            await page.type(addressTextareaSelector, 'address');

            const submitButtonSelector = '.Form-Submit';
            await page.waitForSelector(submitButtonSelector, waitForSelectorOptions);
            await page.click(submitButtonSelector);

            await browser.assertView("Well_done", ".Application", {
                compositeImage: false,
                ignoreElements: ['.Cart-Number']
            });
        });
    })
})