import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  public constructor(page: Page) { super(page); }
  public async expectProduct(product: string): Promise<void> { await expect(this.page.getByText(product)).toBeVisible(); }
  public async removeProduct(product: string): Promise<void> {
    const cartItem = this.page.getByRole('button', { name: `View details for ${product}` }).locator('..');
    await this.click(cartItem.getByRole('button', { name: 'Remove' }));
  }
  public async expectEmpty(): Promise<void> { await expect(this.page.getByRole('button', { name: 'Remove' })).toHaveCount(0); }
}
