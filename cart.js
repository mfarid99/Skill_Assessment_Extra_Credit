const { test, expect } = require('@playwright/test');

async function assertItemInCart(page, {name, unitPrice, quantity, total}){
    const row = page.locator('table.table-bordered tr', {
        hasText: name,
    });
    await expect(row).toContainText(name);
    await expect(row).toContainText(unitPrice);
    await expect(row).toContainText(quantity);
    await expect(row).toContainText(total);
}

async function assertCartTotal(page, {subtotal, shipping, tax, total}) {
    await expect(page.locator('#totals_table tr', {hasText: 'Sub-Total'})).toContainText(subtotal);
    await expect(page.locator('#totals_table tr', {hasText: 'Flat Shipping Rate'})).toContainText(shipping);
    await expect(page.locator('#totals_table tr', {hasText: 'Retail'})).toContainText(tax);
    await expect(page.locator('#totals_table tr', {hasText: /^Total:/})).toContainText(total);
}

module.exports = { assertItemInCart, assertCartTotal }