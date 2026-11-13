import {test,expect} from "@playwright/test";
import {InventoryPage} from "../Pages/InventoryPage";
import {CartPage} from "../Pages/CartPage";
import {Routes} from "../constants/routes";
import {Products} from "../TestData/Products";

let inventoryPage:InventoryPage;
let cartPage:CartPage;
let productNames = [Products.SauceLabsBackpack, Products.SauceLabsBikeLight];

test.beforeEach(async({page})=>{
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

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

test('Validate remove cart item', async ({page})=>{
    const allCartItems = await cartPage.getAllCartItems();
    expect(allCartItems.length).toBe(2);
    expect(allCartItems).toEqual(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    await cartPage.removeCartItem('Sauce Labs Backpack');
    const updatedCartItems = await cartPage.getAllCartItems();
    expect(updatedCartItems.length).toBe(1);
    expect(updatedCartItems).toEqual(['Sauce Labs Bike Light']);

    await cartPage.removeCartItem('Sauce Labs Bike Light');
    const finalCartItems = await cartPage.getAllCartItems();
    expect(finalCartItems.length).toBe(0);
    expect(finalCartItems).toEqual([]);
});