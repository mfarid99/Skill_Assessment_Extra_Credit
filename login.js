const { test, expect } = require('@playwright/test');

async function isUserLoggedIn(page){
    const isLoggedIn = await page.locator('div.menu_text').count() > 0;

    if(isLoggedIn){
        await page.click('a[href="https://automationteststore.com/index.php?rt=account/logout"]');
        await page.click('a[title="Continue"]');
    }
}

module.exports = { isUserLoggedIn }