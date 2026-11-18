import {Page, Locator} from "@playwright/test";
import { BasePage } from "./base.page";
import { TestLogger } from "../utils/logger";

export class CartPage extends BasePage {
    private cartItem : Locator;

    constructor(page: Page, log: TestLogger){
        super(page, log);
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
