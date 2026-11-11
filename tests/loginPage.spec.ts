import {test, expect} from '@playwright/test';
// const {test, expect} = require('@playwright/test');
import {LoginPage} from '../Pages/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
});

test('Navigate to Login page', async ({page}) => {
    await loginPage.navigateToLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/login');
    // await expect(page.locator('.login_logo')).toBeVisible();
    // await expect(page.locator('.login_logo')).toContainText('Swag Labs');
});