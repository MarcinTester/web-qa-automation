import { type Page } from '@playwright/test';
import { BasePage } from './base.page';

export type ProductSortOption = 'newest' | 'price_asc' | 'price_desc' | 'name';

export class HomePage extends BasePage {
  private readonly heading = this.page.getByRole('heading', {
    name: 'A storefront built for QA practice.'
  });
  private readonly navLogin = this.page.getByTestId('nav-login');
  private readonly navRegister = this.page.getByRole('link', { name: 'Create account' });
  private readonly navCart = this.page.getByTestId('nav-cart');
  private readonly logoutButton = this.page.getByTestId('logout-button');
  private readonly searchInput = this.page.getByTestId('product-search');
  private readonly categorySelect = this.page.getByLabel('Filter category');
  private readonly sortSelect = this.page.getByLabel('Sort products');
  private readonly productGrid = this.page.getByTestId('product-grid');
  private readonly productCards = this.page.getByTestId('product-card');
  private readonly emptyProducts = this.page.getByTestId('empty-products');
  private readonly previousPageButton = this.page.getByRole('button', { name: 'Previous' });
  private readonly nextPageButton = this.page.getByRole('button', { name: 'Next' });

  public constructor(page: Page) {
    super(page);
  }

  public async open(): Promise<void> {
    await this.navigate('/');
  }

  public async expectLoaded(): Promise<void> {
    await this.expectVisible(this.heading);
    await this.expectVisible(this.productGrid);
  }

  public async goToLogin(): Promise<void> {
    await this.click(this.navLogin);
  }

  public async goToRegister(): Promise<void> {
    await this.click(this.navRegister);
  }

  public async openCart(): Promise<void> {
    await this.click(this.navCart);
  }

  public async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  public async searchProducts(query: string): Promise<void> {
    await this.fill(this.searchInput, query);
  }

  public async filterByCategory(categorySlug: string): Promise<void> {
    await this.categorySelect.selectOption(categorySlug);
  }

  public async sortBy(sort: ProductSortOption): Promise<void> {
    await this.sortSelect.selectOption(sort);
  }

  public async openProduct(productName: string): Promise<void> {
    await this.click(this.productCards.getByRole('link', { name: productName, exact: true }));
  }

  public async goToNextPage(): Promise<void> {
    await this.click(this.nextPageButton);
  }

  public async goToPreviousPage(): Promise<void> {
    await this.click(this.previousPageButton);
  }

  public async expectProductVisible(productName: string): Promise<void> {
    await this.expectVisible(
      this.productCards.getByRole('link', { name: productName, exact: true })
    );
  }

  public async expectEmptyResults(): Promise<void> {
    await this.expectVisible(this.emptyProducts);
  }

  public async expectLoggedIn(): Promise<void> {
    await this.expectVisible(this.logoutButton);
  }

  public async expectAccountVisible(firstName: string): Promise<void> {
    await this.expectVisible(this.page.getByRole('link', { name: firstName, exact: true }));
  }

  public async expectLoggedOut(): Promise<void> {
    await this.expectVisible(this.navLogin);
  }
}
