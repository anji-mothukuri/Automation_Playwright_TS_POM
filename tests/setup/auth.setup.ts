import {test as setup, expect} from '@playwright/test';
import path from 'path';
import users from '../../TestData/users.json';

const authFile = path.join(__dirname, 'auth.json');

setup('authenticate as standard user', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', users.standard_user.username);
    await page.fill('[data-test="password"]', users.standard_user.password);
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.context().storageState({ path: authFile });

    console.log('Authentication state saved to', authFile);
});