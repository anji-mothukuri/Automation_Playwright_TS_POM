import {test, expect} from '../fixtures/baseTest';
import {LoginPage} from '../Pages/loginPage';
import users from '../TestData/users.json';
import {Routes} from '../constants/routes';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goto(Routes.Login);
});

test('Positive scenario:User successfully logged into sauceLabs.com', async ({loginPage}) => {
    await loginPage.Login(users.standard_user.username, users.standard_user.password);
});