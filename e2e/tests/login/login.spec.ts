import {test, expect} from '../../fixtures/base.test';
import {LoginPage} from '../../pages/login.page';
import users from '../../data/users.json';
import {Routes} from '../../constants/routes';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goto(Routes.Login);
});

test('Positive scenario:User successfully logged into sauceLabs.com', async ({loginPage}) => {
    await loginPage.Login(users.standard_user.username, users.standard_user.password);
});