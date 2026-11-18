import {test as setup, expect} from '../../fixtures/base.test';
import path from 'path';

setup('authenticate as standard user', async({page, loginPage})=>{
    await loginPage.navigateTo('/');
    await loginPage.login();

    // Save authentication state to a file
    const authFile = path.resolve(__dirname, '../../../playwright/auth.json');
    await page.context().storageState({ path: authFile });
    console.log('Authentication state saved to', authFile);
});