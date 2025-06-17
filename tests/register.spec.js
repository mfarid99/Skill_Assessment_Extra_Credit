const { test, expect } = require('@playwright/test');
const { generateRandonName } = require('../utils.js');
const firstName = generateRandonName();
const email = generateRandonName();
const loginName = generateRandonName();


test.describe('Add New User', () => {

test('Should create new user account', async ({ page }) => {
    //Navigate to url
    await page.goto('https://automationteststore.com/');
    await expect(page).toHaveTitle('A place to practice your automation skills!');
    //Click register
    await page.locator('a:has-text("Login or register")').click({timeout:10000})
    await expect(page).toHaveTitle("Account Login")
    //Select new account
    await page.click('#accountFrm_accountregister');
    await page.click('[title="Continue"]');
    await expect(page).toHaveTitle("Create Account");
    //Fill in personal information
    await page.fill('[name="firstname"]', firstName);
    await page.fill('[name="lastname"]', 'Farid');
    await page.fill('[name="email"]', email + '@gmail.com');
    await page.fill('[name="telephone"]', '310-999-5555');
    await page.fill('[name="fax"]', '310-987-5555');
    //Fill in address
    await page.fill('[name="company"]', "Foundry Co");
    await page.fill('[name="address_1"]', '1234 Main Street');
    await page.fill('[name="address_2"]', 'Ste 300');
    await page.fill('[name="telephone"]', '310-999-5555');
    await page.fill('[name="fax"]', '310-987-5555');
    await page.fill('[name="city"]', 'Alexandria');
    await page.selectOption('#AccountFrm_country_id', {label: 'United States'})
    await page.selectOption('#AccountFrm_zone_id', {label: 'Virginia'});
    await page.fill('[name="postcode"]', '22999');
    //Fill in login info
    await page.fill('[name="loginname"]', loginName);
    await page.fill('[name="password"]', 'qa999');
    await page.fill('[name="confirm"]', 'qa999');
    await page.check("#AccountFrm_newsletter0");
    await page.check("#AccountFrm_agree");
    await page.click('[title="Continue"]')
    //Assert account is created
    await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
    await expect(page.locator('div.menu_text')).toContainText(firstName);
});

});