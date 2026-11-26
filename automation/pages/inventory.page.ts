import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  private readonly title = this.page.getByText('Products', { exact: true });
  private readonly cartButton = this.page.getByRole('button', { name: /^Cart/ });
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });

  public constructor(page: Page) { super(page); }
  public async expectLoaded(): Promise<void> { await expect(this.title).toHaveText('Products'); }
  public async addToCart(product: string): Promise<void> {
    const productCard = this.page.getByRole('button', { name: `View details for ${product}` }).last().locator('xpath=../..');
    await this.click(productCard.getByRole('button', { name: 'Add to cart' }));
  }
  public async openCart(): Promise<void> { await this.click(this.cartButton); }
  public async logout(): Promise<void> {
    await this.click(this.menuButton);
    await this.click(this.page.getByTestId('logout-sidebar-link'));
  }
}
