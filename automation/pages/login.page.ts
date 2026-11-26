import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly username = this.page.getByLabel('Username');
  private readonly password = this.page.getByLabel('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorMessage = this.page.getByRole('alert');

  public constructor(page: Page) { super(page); }
  public async open(): Promise<void> { await this.navigate('/'); }
  public async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }
  public async expectError(message: string): Promise<void> { await expect(this.errorMessage).toContainText(message); }
  public async expectValidationError(): Promise<void> { await expect(this.errorMessage).toContainText('Username is required'); }
}
