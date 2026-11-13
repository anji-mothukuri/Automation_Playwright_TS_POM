import {test,expect} from "@playwright/test";
import {LoginPage} from "../Pages/loginPage";
import {InventoryPage} from "../Pages/InventoryPage";
import {CartPage} from "../Pages/CartPage";
import users from "../TestData/users.json";

let loginPage:LoginPage;
let inventoryPage:InventoryPage;
let cartPage:CartPage;

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    //Login to website
    await loginPage.navigateToLoginPage();
    await loginPage.Login(users.standard_user.username, users.standard_user.password);

    //Add items to cart
    await page.waitForLoadState('load');
    // Remove all products from cart if already exists
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