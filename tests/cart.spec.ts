import {test,expect} from "../fixtures/baseTest";
import {InventoryPage} from "../Pages/InventoryPage";
import {CartPage} from "../Pages/CartPage";
import {Routes} from "../constants/routes";
import {Products} from "../TestData/Products";

const productNames = [Products.SauceLabsBackpack, Products.SauceLabsBikeLight];

test.beforeEach(async({inventoryPage, cartPage})=>{
    // Remove all products from cart if already exists
    await inventoryPage.goto(Routes.Inventory);
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