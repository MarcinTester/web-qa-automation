import { test } from '../../fixtures/test.fixture';
import { invalidLogin } from '../../data/test-data/login';

test.describe('Login', () => {
  test('allows a registered user to sign in', async ({ loginPage, inventoryPage, config }) => {
    await loginPage.open();
    await loginPage.login(config.username, config.password);
    await inventoryPage.expectLoaded();
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(invalidLogin.username, invalidLogin.password);
    await loginPage.expectError('Username and password do not match');
  });

  test('validates missing credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', '');
    await loginPage.expectValidationError();
  });
});
