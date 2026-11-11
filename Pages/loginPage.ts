import type { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private base_url: string | undefined;

    constructor(page: Page) {
        this.page = page;
        this.base_url = process.env.base_url;
    }
}
