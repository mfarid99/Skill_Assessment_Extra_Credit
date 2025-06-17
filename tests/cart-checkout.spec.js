const { test, expect } = require('@playwright/test');
const { isUserLoggedIn } = require('../login.js');
const { assertItemInCart, assertCartTotal } = require('../cart.js');
const { assertShippingInfo, assertPaymentInfo, assertItemsInYourCart } = require('../checkout.js');



test.describe('Add products to cart', () => {

test('Should add items to cart and checkout', async ({ page }) => {
    //Navigate to url
    await page.goto('https://automationteststore.com/');
    await expect(page).toHaveTitle('A place to practice your automation skills!');
    //Conditional logoff
    await isUserLoggedIn(page);
    //Login
    await page.locator('a:has-text("Login or register")').click({timeout:10000})
    await page.fill('[name="loginname"]', 'moefarid99');
    await page.fill('[name="password"]', 'clouds99xz');
    await page.click('button[title="Login"]');
    await expect(page.locator('div.menu_text')).toContainText('Mohamed');
    //Click on Apparel
    await page.getByRole('link', {name: /apparel/i}).click();
    //Click on T-shirts
    await page.click('a:has-text("T-shirts")');
    //Click on Formal Double Cuffs shirt
    const productLinkTshirt = page.locator('a[title="Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie"]');
    await productLinkTshirt.click()
    await expect(page.locator('h1')).toContainText("Formal Double Cuffs");
    //Update Shirt quantity to 2
    await page.fill('input[name="quantity"]', "2");
    //Add to cart
    await page.click('a:has-text("Add to Cart")');
    //Assert item added to shopping cart
    await assertItemInCart(page, {
        name: "Formal Double Cuffs",
        unitPrice: '32.00',
        quantity: '2',
        total: '$64.00'
    })
    //Assert item total is accurate
    await assertCartTotal(page, {
        subtotal: '$64.00',
        shipping: '$2.00',
        tax: '$5.44',
        total: '$71.44'
    })
    //Click makeup tab
    await page.getByRole('link', {name: /makeup/i}).click();
    //Click Lips
    await page.click('a:has-text("Lips")');
    //Click Viva Glam Lipstick
    await page.click('[title="Viva Glam Lipstick"]');
     //Add to cart
    await page.click('a:has-text("Add to Cart")');
    //Assert item added to shopping cart
    await assertItemInCart(page, {
        name: "Viva Glam Lipstick",
        unitPrice: '5.00',
        quantity: '1',
        total: '$5.00'
    })
    //Assert item total is accurate
    await assertCartTotal(page, {
        subtotal: '$69.00',
        shipping: '$2.00',
        tax: '$5.87',
        total: '$76.87'
    })

     //Click skincare tab
    await page.getByRole('link', {name: /skincare/i}).click();
    //Click Flash Bronzer
    await page.click('[title="Flash Bronzer Body Gel"]');
     //Add to cart
    await page.click('a:has-text("Add to Cart")');
    //Assert item added to shopping cart
    await assertItemInCart(page, {
        name: "Flash Bronzer Body Gel",
        unitPrice: '$29.00',
        quantity: '1',
        total: '$29.00'
    })
    //Assert item total is accurate
    await assertCartTotal(page, {
        subtotal: '$98.00',
        shipping: '$2.00',
        tax: '$8.33',
        total: '$108.33'
    })

     //Click hair care tab
    await page.getByRole('link', {name: /hair/i}).click();
    //Click Seaweed Conditioner
    await page.click('[title="Seaweed Conditioner"]');
     //Add to cart
    await page.click('a:has-text("Add to Cart")');
    //Assert item added to shopping cart
    await assertItemInCart(page, {
        name: "Seaweed Conditioner",
        unitPrice: '19.00',
        quantity: '1',
        total: '$19.00'
    })
    //Assert item total is accurate
    await assertCartTotal(page, {
        subtotal: '$117.00',
        shipping: '$2.00',
        tax: '$9.95',
        total: '$128.95'
    })

    //Checkout 
    await page.click('a[id="cart_checkout1"]');
    await expect(page.locator('h1')).toContainText(/checkout confirmation/i)

    //Assert shipping information
    await assertShippingInfo(page, {
        name: 'Moe Farid',
        phone: '310-876-5432',
        address: '1234 Main Street Ste 300',
        cityStateZip: 'Alexandria Virginia 22315',
        country: 'United States',
        shipping: 'Flat Shipping Rate'
    })

    //Assert payment information
    await assertPaymentInfo(page, {
        name: 'Moe Farid',
        phone: '310-876-5432',
        address: '1234 Main Street Ste 300',
        cityStateZip: 'Alexandria Virginia 22315',
        country: 'United States',
        paymentMethod: 'Cash On Delivery'
    })

    //Assert Items in cart
    await assertItemsInYourCart(page, [
        {
            name: 'Designer Men Casual Formal Double Cuffs',
            unitPrice: '$32.00',
            quantity: '2' ,
            total: '$64.00'
        },
        {
            name: 'Viva Glam Lipstick',
            unitPrice: '$5.00',
            quantity: '1' ,
            total: '$5.00'
        },
        {
            name: 'Flash Bronzer Body Gel',
            unitPrice: '$29.00' ,
            quantity: '1',
            total: '$29.00'
        },
        {
            name: 'Seaweed Conditioner' ,
            unitPrice: '$19.00',
            quantity: '1',
            total: '$19.00'
        }
    ])

    //Confirm Order
    await page.click('button[id="checkout_btn"]');
    //Assert order is processed
    await expect(page.locator('h1')).toHaveText(/your order has been processed!/i);
    //Click Continue
    await page.click('a[title="Continue"]');
    //Assert user is on home page
    await expect(page).toHaveURL('https://automationteststore.com/');

 });

});