import { Locator, Page } from "@playwright/test";
import { listEndpoints } from "node:quic";

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

    async addProductToCart(productName:string){
        let cartItem = this.inventoryItem.filter({hasText:productName});
        await cartItem.getByRole('button', {name: 'Add to cart'}).click();
    }

    async removeAllProductFromCart(){
        let removeButtons = await this.inventoryItem.getByRole('button', {name: 'Remove'});
        const removeButtonCount = await removeButtons.count();
        console.log(`Number of remove buttons found: ${removeButtonCount}`);
        for(let i = 0; i < removeButtonCount; i++){
            console.log(`Clicking remove button ${i + 1} of ${removeButtonCount}`);
            await removeButtons.nth(i).click();
        }
        console.log('All products removed from cart');
    }

    async getCartItemsCount(){
        let cartCount = await this.shoppingCartBadge.textContent();
        if(cartCount === null){
            return 0;
        }
        return parseInt(cartCount);
    }

    async navigateToCartPage(){
        await this.shoppingCartLink.click();
    }
}

module.exports = {InventoryPage};