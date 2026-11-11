import { Locator, Page } from "@playwright/test";

export class InventoryPage {

    private page : Page;
    private inventoryItem : Locator;
    private shoppingCartBadge:Locator;

    constructor(page:Page){
        this.page = page;

        //locators
        this.inventoryItem = this.page.locator('.inventory_item');
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
    }

    async addProductToCart(productName:string){
        let cartItem = this.inventoryItem.filter({hasText:productName});
        await cartItem.getByRole('button', {name: 'Add to cart'}).click();
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