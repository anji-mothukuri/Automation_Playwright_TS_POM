import {test,expect} from "../../fixtures/base.test";
import {Products} from "../../data/products";

const productNames = [Products.SauceLabsBackpack, Products.SauceLabsBikeLight];

test.beforeEach(async({inventoryPage})=>{
    // Remove all products from cart if already exists
    await inventoryPage.goto();
    await inventoryPage.removeAllProductFromCart();
    
    //Add products to cart
    for(const productName of productNames){
        await inventoryPage.addProductToCart(productName);
    }
    
    //Navigate to cart page
    await inventoryPage.navigateToCartPage();
});

test('Validate remove cart item', async ({cartPage})=>{
    const allCartItems = await cartPage.getAllCartItems();
    expect(allCartItems.length).toBe(2);
    expect(allCartItems).toEqual([Products.SauceLabsBackpack, Products.SauceLabsBikeLight]);

    await cartPage.removeCartItem(Products.SauceLabsBackpack);
    const updatedCartItems = await cartPage.getAllCartItems();
    expect(updatedCartItems.length).toBe(1);
    expect(updatedCartItems).toEqual([Products.SauceLabsBikeLight]);

    await cartPage.removeCartItem(Products.SauceLabsBikeLight);
    const finalCartItems = await cartPage.getAllCartItems();
    expect(finalCartItems.length).toBe(0);
    expect(finalCartItems).toEqual([]);
});