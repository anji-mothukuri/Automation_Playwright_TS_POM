import {test, expect} from '@playwright/test';
import {InventoryPage} from '../Pages/InventoryPage';
import { Routes } from '../constants/routes';

let inventoryPage: InventoryPage;

test.beforeEach(async({page})=>{
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto(Routes.Inventory);
});

test('Validate shopping cart items count', async ({page})=>{
    // Remove all products from cart if already exists
    await inventoryPage.removeAllProductFromCart();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(await inventoryPage.getCartItemsCount()).toBe(1);

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(await inventoryPage.getCartItemsCount()).toBe(2);
});