import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  public async navigate(path = '/'): Promise<void> { await this.page.goto(path); }
  protected async click(locator: Locator): Promise<void> { await locator.click(); }
  protected async fill(locator: Locator, value: string): Promise<void> { await locator.fill(value); }
  protected async expectVisible(locator: Locator): Promise<void> { await expect(locator).toBeVisible(); }
  public async screenshot(name: string): Promise<void> { await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true }); }
}
