import { Locator, Page, expect } from "@playwright/test";
import { Routes } from "../constants/routes";

export class InventoryPage {

    private page : Page;
    private inventoryItem : Locator;
    private shoppingCartBadge:Locator;
    private shoppingCartLink:Locator;

    constructor(page:Page){
        this.page = page;

        //locators
        this.inventoryItem = this.page.locator('.inventory_item');
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
        this.shoppingCartLink=this.page.locator('[data-test="shopping-cart-link"]');
    }

    async goto(url:string){
        await this.page.goto(url);
        await expect(this.page.locator('.title')).toHaveText('Products');
    }

    async navigateToCartPage(){
        await this.shoppingCartLink.click();
        await expect(this.page).toHaveURL(Routes.Cart);
    }
    
    async addProductToCart(productName:string){
        let cartItem = this.inventoryItem.filter({hasText:productName});
        await cartItem.getByRole('button', {name: 'Add to cart'}).click();
    }

    async removeAllProductFromCart(){
        let removeButtons = await this.inventoryItem.getByRole('button', {name: 'Remove'});
        const removeButtonCount = await removeButtons.count();
        for(let i = 0; i < removeButtonCount; i++){
            await removeButtons.nth(i).click();
        }
    }

    async getCartItemsCount(){
        let cartCount = await this.shoppingCartBadge.textContent();
        if(cartCount === null){
            return 0;
        }
        return parseInt(cartCount);
    }
}

module.exports = {InventoryPage};