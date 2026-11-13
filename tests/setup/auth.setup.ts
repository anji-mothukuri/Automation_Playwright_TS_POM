import {test as setup, expect} from '@playwright/test';
import path from 'path';
import users from '../../TestData/users.json';
import { Routes } from '../../constants/routes';

setup('authenticate as standard user', async({page})=>{
    await page.goto('/');
    await page.fill('[data-test="username"]', users.standard_user.username);
    await page.fill('[data-test="password"]', users.standard_user.password);
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(Routes.Inventory);

    // Save authentication state to a file
    const authFile = path.join(__dirname, 'auth.json');
    await page.context().storageState({ path: authFile });
    console.log('Authentication state saved to', authFile);
});