import { Page , expect} from '@playwright/test';

export class LoginPage {
    private page: Page;
    private txtUserName: any;
    private txtPassword: any;
    private btnLogin: any;

    constructor(page: Page) {
        this.page = page;

        //locators
        this.txtUserName = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', {name:'Login'});
    }

    async goto(url:string){
        await this.page.goto(url);
            await expect(this.page).toHaveURL('/');
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
