// pages/BasePage.ts
import { expect, Locator, Page, test } from '@playwright/test';
import { TestLogger } from '../utils/logger';

export abstract class BasePage {
  constructor(protected readonly page: Page, protected readonly log: TestLogger)
  {
    
  }

  /**
   * Navigates to a relative or full URL with step reporting and logging.
   */
  async navigateTo(url: string): Promise<void> {
    await test.step(`Navigate to: ${url}`, async () => {
      this.log.info('Navigating to URL', { url });
      await this.page.goto(url);
    });
  }

  /**
   * Pattern 1: Click-and-Verify Retry
   * Repeatedly clicks triggerLocator until expectedTargetLocator becomes visible.
   * Ideal for hamburger menus, modals, or buttons where clicks occasionally drop.
   */
  protected async clickUntilVisible(
    triggerLocator: Locator,
    expectedTargetLocator: Locator,
    description: string,
    timeoutMs = 10000
  ): Promise<void> {
    await test.step(`Click until visible: ${description}`, async () => {
      await expect(async () => {
        this.log.debug(`Attempting click: ${description}`);
        await triggerLocator.click({ timeout: 2000 });
        await expect(expectedTargetLocator).toBeVisible({ timeout: 2000 });
      }).toPass({
        intervals: [1000],
        timeout: timeoutMs,
      });

      this.log.info(`Confirmed target visible after click: ${description}`);
    });
  }

  /**
   * Pattern 2: Resilient Click
   * Retries clicking an element if transient DOM re-renders or overlays briefly block it.
   */
  protected async resilientClick(
    locator: Locator,
    description: string,
    maxRetries = 3
  ): Promise<void> {
    await test.step(`Click: ${description}`, async () => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          this.log.info(`Clicking ${description} (Attempt ${attempt}/${maxRetries})`);
          await locator.waitFor({ state: 'visible', timeout: 5000 });
          await locator.click({ timeout: 3000 });
          return;
        } catch (error) {
          this.log.warn(`Click failed on ${description} (Attempt ${attempt}/${maxRetries})`, {
            error: (error as Error).message,
          });

          if (attempt === maxRetries) {
            this.log.error(`Exhausted all ${maxRetries} retries for: ${description}`);
            throw error;
          }

          await this.page.waitForTimeout(500);
        }
      }
    });
  }
}
