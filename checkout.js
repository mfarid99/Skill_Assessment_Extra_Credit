const { test, expect } = require('@playwright/test');

async function assertShippingInfo(page, {
    name, phone, address, cityStateZip, country, shipping
}){
    const section = page.locator('table.confirm_shippment_options');
    await expect(section).toContainText(name);
    await expect(section).toContainText(phone);
    await expect(section).toContainText(address);
    await expect(section).toContainText(cityStateZip);
    await expect(section).toContainText(country);
    await expect(section).toContainText(shipping);

}

async function assertPaymentInfo(page, {
    name, phone, address, cityStateZip, country, paymentMethod
}){
    const section = page.locator('table.confirm_payment_options');
    await expect(section).toContainText(name);
    await expect(section).toContainText(phone);
    await expect(section).toContainText(address);
    await expect(section).toContainText(cityStateZip);
    await expect(section).toContainText(country);
    await expect(section).toContainText(paymentMethod);

}

async function assertItemsInYourCart(page, expectedItems){
    const rows = page.locator('table.confirm_products tbody tr');
    const count = await rows.count();
    expect(count).toBe(expectedItems.length);

    for(let i = 0; i < count; i++){
        const row = rows.nth(i);
        const item = expectedItems[i];

    await expect(row).toContainText(item.name);
    await expect(row).toContainText(item.unitPrice);
    await expect(row).toContainText(item.quantity.toString());
    await expect(row).toContainText(item.total);
    }
}

module.exports = { assertShippingInfo, assertPaymentInfo, assertItemsInYourCart}