import {test, expect} from '../fixtures/baseTest';
import { Routes } from '../constants/routes';
import{Products} from '../TestData/Products';

test.beforeEach(async({inventoryPage})=>{
    await inventoryPage.goto(Routes.Inventory);
});

test('Validate shopping cart items count', async ({inventoryPage})=>{
    // Remove all products from cart if already exists
    await inventoryPage.removeAllProductFromCart();

    await inventoryPage.addProductToCart(Products.SauceLabsBackpack);
    expect(await inventoryPage.getCartItemsCount()).toBe(1);

    await inventoryPage.addProductToCart(Products.SauceLabsBikeLight);
    expect(await inventoryPage.getCartItemsCount()).toBe(2);
});