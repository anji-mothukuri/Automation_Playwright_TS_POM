import {test, expect} from '@playwright/test';
import {InventoryPage} from '../Pages/InventoryPage';

let inventoryPage: InventoryPage;

test.beforeEach(async({page})=>{
    inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
});

test('Validate shopping cart items count', async ({page})=>{
    // Remove all products from cart if already exists
    await inventoryPage.removeAllProductFromCart();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(await inventoryPage.getCartItemsCount()).toBe(1);

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(await inventoryPage.getCartItemsCount()).toBe(2);
});