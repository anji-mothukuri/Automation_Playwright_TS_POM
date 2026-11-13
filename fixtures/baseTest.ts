import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../Pages/loginPage';
import {InventoryPage} from '../Pages/InventoryPage';
import {CartPage} from '../Pages/CartPage';

type PageFixtures={
    loginPage:LoginPage,
    inventoryPage:InventoryPage,
    cartPage:CartPage
};

export const test = base.extend<PageFixtures>({    
    loginPage: async({page},use)=>{
        await use(new LoginPage(page));
    },
    inventoryPage: async({page},use)=>{
        await use(new InventoryPage(page));
    },
    cartPage: async({page},use)=>{
        await use(new CartPage(page));
    }
});

export {expect};