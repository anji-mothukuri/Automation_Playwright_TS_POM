import {test, expect} from '@playwright/test';
import {LoginPage} from '../Pages/loginPage';
import {InventoryPage} from '../Pages/InventoryPage';
import users from '../TestData/users.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateToLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');    
    console.log('Navigating to Login page');
    await page.waitForLoadState('load');
    await loginPage.Login(users.standard_user.username, users.standard_user.password);
    await expect(page.locator('.title')).toHaveText('Products');
});

test('Validate shopping cart items count', async ({page})=>{
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(await inventoryPage.getCartItemsCount()).toBe(1);

    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(await inventoryPage.getCartItemsCount()).toBe(2);
});