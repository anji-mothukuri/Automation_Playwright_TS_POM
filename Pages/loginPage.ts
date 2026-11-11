import type { Page } from '@playwright/test';
import { threadCpuUsage } from 'node:process';

export class LoginPage {
    private page: Page;
    private baseUrl: string | undefined;
    private txtUserName: any;
    private txtPassword: any;
    private btnLogin: any;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.baseUrl;

        //locators
        this.txtUserName = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', {name:'Login'});
    }

    async navigateToLoginPage(){
        if(this.baseUrl)
        {
            await this.page.goto(this.baseUrl);
        }
        else
        {
            console.error('Base URL is not defined');
        }
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
    }
}

module.exports = {LoginPage};
