import { expect, type Page } from '@playwright/test';
import { type RegistrationUser } from '../utils/test-data';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  private readonly form = this.page.getByTestId('register-form');
  private readonly heading = this.page.getByRole('heading', { name: 'Create your account' });
  private readonly firstName = this.page.getByLabel('First name');
  private readonly lastName = this.page.getByLabel('Last name');
  private readonly email = this.page.getByTestId('email-input');
  private readonly password = this.page.getByTestId('password-input');
  private readonly registerButton = this.page.getByTestId('register-submit');
  private readonly errorMessage = this.page.getByRole('alert');

  public constructor(page: Page) {
    super(page);
  }

  public async open(): Promise<void> {
    await this.navigate('/register');
  }

  public async expectLoaded(): Promise<void> {
    await this.expectVisible(this.heading);
    await this.expectVisible(this.form);
  }

  public async register(user: RegistrationUser): Promise<void> {
    await this.fill(this.firstName, user.firstName);
    await this.fill(this.lastName, user.lastName);
    await this.fill(this.email, user.email);
    await this.fill(this.password, user.password);
    await this.click(this.registerButton);
  }

  public async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  public async expectValidationError(): Promise<void> {
    await expect(this.page).toHaveURL(/\/register$/);
    await expect(this.form.locator('input:invalid').first()).toBeVisible();
  }
}
