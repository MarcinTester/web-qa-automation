import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly form = this.page.getByTestId('login-form');
  private readonly heading = this.page.getByRole('heading', { name: 'Welcome back' });
  private readonly email = this.page.getByTestId('email-input');
  private readonly password = this.page.getByTestId('password-input');
  private readonly loginButton = this.page.getByTestId('login-submit');
  private readonly errorMessage = this.page.getByRole('alert');

  public constructor(page: Page) {
    super(page);
  }

  public async open(): Promise<void> {
    await this.navigate('/login');
  }

  public async expectLoaded(): Promise<void> {
    await this.expectVisible(this.heading);
    await this.expectVisible(this.form);
  }

  public async login(email: string, password: string): Promise<void> {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }

  public async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  public async expectValidationError(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.form.locator('input:invalid').first()).toBeVisible();
  }
}
