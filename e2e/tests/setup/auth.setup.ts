import {test as setup, expect} from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/login.page';

setup('authenticate as standard user', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();

    // Save authentication state to a file
    const authFile = path.resolve(__dirname, '../../../playwright/auth.json');
    await page.context().storageState({ path: authFile });
    console.log('Authentication state saved to', authFile);
});