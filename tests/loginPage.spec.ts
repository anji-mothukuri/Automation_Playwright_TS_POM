import {test, expect} from '@playwright/test';
// const {test, expect} = require('@playwright/test');

test('Navigate to Login page', async ({page}) => {
    await page.goto('https://www.saucedemo.com/login');
    await expect(page).toHaveTitle('Swag Labs');
});