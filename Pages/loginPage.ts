import type { Page } from '@playwright/test';
import { threadCpuUsage } from 'node:process';

export class LoginPage {
    private page: Page;
    private baseUrl: string | undefined;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.baseUrl;
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

    async EnterUserName(){
        await this.page.locator('[data-test="username"]').fill('standard_user');
    }

    async EnterPassword(){
        await this.page.getByPlaceholder('Password').fill('secret_sauce');
    }

    async ClickLoginButton(){
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}

module.exports = {LoginPage};
