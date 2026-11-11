import {test, expect} from '@playwright/test';
// const {test, expect} = require('@playwright/test');
import {LoginPage} from '../Pages/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');    
    console.log('Navigating to Login page');
    await page.waitForLoadState('load');
});

test('Positive scenario:User successfully logged into sauceLabs.com', async ({page}) => {
    await loginPage.EnterUserName();
    await loginPage.EnterPassword();
    await loginPage.ClickLoginButton();
    await expect(page).toHaveTitle('Swag Labs');
});