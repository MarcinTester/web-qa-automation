import { test } from '../../fixtures/test.fixture';
import { invalidLogin } from '../../data/test-data/login';

test.describe('Login', () => {
  test('allows a registered user to sign in', async ({ homePage, loginPage, config }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToLogin();

    await loginPage.expectLoaded();
    await loginPage.login(config.username, config.password);

    await homePage.expectLoaded();
    await homePage.expectLoggedIn();
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(invalidLogin.email, invalidLogin.password);

    await loginPage.expectError('Email or password is incorrect.');
  });

  test('validates missing credentials', async ({ homePage, loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login('', '');
    await loginPage.expectValidationError();
    await homePage.expectLoggedOut();
  });
});
