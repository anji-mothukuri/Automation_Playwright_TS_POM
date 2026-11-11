import type { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private baseUrl: string | undefined;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = process.env.baseUrl;
    }

    async navigateToLoginPage(){
        console.log('Navigating to Login page');
        if(this.baseUrl)
        {
            await this.page.goto(this.baseUrl);
        }
        else
        {
            console.error('Base URL is not defined');
        }
    };
}

module.exports = {LoginPage};
