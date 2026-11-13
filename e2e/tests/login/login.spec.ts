import {test} from '../../fixtures/base.test';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goto();
});

test('Positive scenario:User successfully logged into sauceLabs.com', async ({loginPage}) => {
    await loginPage.login();
});