describe('Страницы главная, доставка и контакты имеют статическое содержимое', () => {
    it('home', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store');
        await browser.pause(1000);
        await browser.assertView('home', '.Home')
    });

    it('delivery', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store/delivery');
        await browser.pause(1000);
        await browser.assertView('delivery', '.Delivery')
    });

    it('contacts', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages()

        await page.goto('http://localhost:3000/hw/store/contacts');
        await browser.pause(1000);
        await browser.assertView('contacts', '.Contacts')
    });
})