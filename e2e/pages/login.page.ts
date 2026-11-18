import { Locator, Page , expect} from '@playwright/test';
import { Routes } from '../constants/routes';
import { env } from '../../config/env';
import { BasePage } from './base.page';
import { TestLogger } from '../utils/logger';

export class LoginPage extends BasePage{
    private txtUserName: Locator;
    private txtPassword: Locator;
    private btnLogin: Locator;

    constructor(page: Page, log: TestLogger) {
        super(page, log);

        //locators
        this.txtUserName = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', {name:'Login'});
    }


    async EnterUserName(userName:string){
        await this.txtUserName.fill(userName);
    }

    async EnterPassword(password:string){
        await this.txtPassword.fill(password);
    }

    async clickLoginButton(){
        await this.btnLogin.click();
    }

    async login(){
        await this.EnterUserName(env.userName);
        await this.EnterPassword(env.password);
        await this.clickLoginButton();        
        await expect(this.page.locator('.title')).toHaveText('Products');
    }
}
