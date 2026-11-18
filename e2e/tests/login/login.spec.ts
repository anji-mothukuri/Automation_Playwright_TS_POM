import { Routes } from '../../constants/routes';
import {test} from '../../fixtures/base.test';

test.beforeEach(async ({loginPage, log})=>{
    log.info('Navigating to Login page.');
    await loginPage.navigateTo(Routes.Login);
});

test('Positive scenario:User successfully logged into sauceLabs.com', async ({loginPage, log}) => {
    log.info('Attempting Login...');
    await loginPage.login();
});