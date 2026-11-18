import {test as base, expect} from '@playwright/test';
import { createTestLogger, TestLogger } from '../utils/logger';
import {LoginPage} from '../pages/login.page';
import {InventoryPage} from '../pages/inventory.page';
import {CartPage} from '../pages/cart.page';

type PageFixtures={
    log: TestLogger,    
    loginPage:LoginPage,
    inventoryPage:InventoryPage,
    cartPage:CartPage
};

export const test = base.extend<PageFixtures>({   
    log: async({}, use, testInfo) => {
        const logger = createTestLogger(testInfo.title, testInfo.workerIndex);
        logger.info(`=== starting test ${testInfo.title} ====`);

        await use(logger);

        logger.info(`Finished test ${testInfo.title} (status ${testInfo.status})`);
        await testInfo.attach('execution-logs.txt', {
            body : logger.getLogs(),
            contentType: 'text/plain'
        });
    },
    
    loginPage: async({page, log},use)=>{        
        await use(new LoginPage(page, log));
    },
    inventoryPage: async({page, log},use)=>{
        await use(new InventoryPage(page, log));
    },
    cartPage: async({page, log},use)=>{
        await use(new CartPage(page, log));
    },
});

export {expect};
