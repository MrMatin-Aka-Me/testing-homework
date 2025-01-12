const {assert} = require("chai");

describe('Каталог ', async () => {
    it('в карточках должна быть краткая информация о товаре', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store/catalog');
        await page.waitForSelector('.ProductItem');
        const productCards = await page.$$('.ProductItem');
        const products = await Promise.all(productCards.map(async (card) => ({
            name: await card.$eval('.ProductItem-Name', node => node.innerHTML),
            price: await card.$eval('.ProductItem-Price', node => node.innerHTML),
        })));
        products.forEach(({name, price}) => {
            assert.isNotFalse(Boolean(name.trim()), 'наименование товара отсутствует');
            assert.equal(price[0], '$', 'цена должна начинаться со знака $');
            assert.isNotFalse(price.length > 1, 'цена у товара отсутствует');
            assert.isNumber(+price.slice(1), 'цена должна быть числом');
        })
    });

    it("Сервер должен возвращать товар с id из запроса", async ({browser}) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        const res = (await page.goto('http://localhost:3000/hw/store/api/products/2'));
        const resJson = await res.json()

        assert.equal(resJson.id, 2, `id товара в запросе (id=2) не совпадает с id товара, возвращаемого из сервера (id=${resJson.id})`)
    });
})