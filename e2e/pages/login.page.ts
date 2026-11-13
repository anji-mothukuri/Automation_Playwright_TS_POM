import { Locator, Page , expect} from '@playwright/test';
import { Routes } from '../constants/routes';

export class LoginPage {
    private page: Page;
    private txtUserName: Locator;
    private txtPassword: Locator;
    private btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        //locators
        this.txtUserName = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', {name:'Login'});
    }

    async goto(){
        await this.page.goto(Routes.Login);
            await expect(this.page).toHaveURL(Routes.Login);
    };

    async EnterUserName(userName:string){
        await this.txtUserName.fill(userName);
    }

    async EnterPassword(password:string){
        await this.txtPassword.fill(password);
    }

    async ClickLoginButton(){
        await this.btnLogin.click();
    }

    async Login(userName:string, password:string){
        await this.EnterUserName(userName);
        await this.EnterPassword(password);
        await this.ClickLoginButton();        
        await expect(this.page.locator('.title')).toHaveText('Products');
    }
}

module.exports = {LoginPage};
