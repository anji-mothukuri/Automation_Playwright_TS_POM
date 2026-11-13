import {Page, Locator} from "@playwright/test";

export class CartPage {
    private page : Page;
    private cartItem : Locator;

    constructor(page: Page){
        this.page = page;
        this.cartItem=this.page.locator('[data-test="inventory-item-name"]');
    }

    async getAllCartItems(){
        return await this.cartItem.allTextContents();;
    }

    async removeCartItem(productName: string){
        const cartItem = this.page.locator('[data-test="inventory-item"]').filter({hasText: productName});
        await cartItem.getByRole('button', {name: 'Remove'}).click();
    }
}
