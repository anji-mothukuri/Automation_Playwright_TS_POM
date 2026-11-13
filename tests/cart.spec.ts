import {test,expect} from "@playwright/test";
import {InventoryPage} from "../Pages/InventoryPage";
import {CartPage} from "../Pages/CartPage";

let inventoryPage:InventoryPage;
let cartPage:CartPage;

test.beforeEach(async({page})=>{
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Remove all products from cart if already exists
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    await inventoryPage.removeAllProductFromCart();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    //Navigate to cart page
    await inventoryPage.navigateToCartPage();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});

test('Validate remove cart item', async ({page})=>{
    const allCartItems = await cartPage.getAllCartItems();
    expect(allCartItems.length).toBe(2);
    expect(allCartItems).toEqual(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    await cartPage.removeCartItem('Sauce Labs Backpack');
    const updatedCartItems = await cartPage.getAllCartItems();
    expect(updatedCartItems.length).toBe(1);
    expect(updatedCartItems).toEqual(['Sauce Labs Bike Light']);

    await cartPage.removeCartItem('Sauce Labs Bike Light');
    const finalCartItems = await cartPage.getAllCartItems();
    expect(finalCartItems.length).toBe(0);
    expect(finalCartItems).toEqual([]);
});