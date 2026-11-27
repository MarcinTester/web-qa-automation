import { test } from '../../fixtures/test.fixture';
import { buildRegistrationUser } from '../../utils/test-data';

test.describe('Register', () => {
  test('allows a visitor to register a new account', async ({ homePage, registerPage }) => {
    const newUser = buildRegistrationUser({ firstName: 'Jane', lastName: 'Doe' });

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToRegister();

    await registerPage.expectLoaded();
    await registerPage.register(newUser);

    await homePage.expectLoaded();
    await homePage.expectLoggedIn();
    await homePage.expectAccountVisible(newUser.firstName);
  });

  test('shows an error when registering with an existing email', async ({
    registerPage,
    config
  }) => {
    const existingUser = buildRegistrationUser({ email: config.username });

    await registerPage.open();
    await registerPage.expectLoaded();
    await registerPage.register(existingUser);

    await registerPage.expectError('An account with this email already exists.');
  });

  test('validates missing credentials and short password', async ({ homePage, registerPage }) => {
    await registerPage.open();
    await registerPage.expectLoaded();

    await registerPage.register({ firstName: '', lastName: '', email: '', password: '' });
    await registerPage.expectValidationError();

    await registerPage.register(buildRegistrationUser({ password: 'short' }));
    await registerPage.expectValidationError();
    await homePage.expectLoggedOut();
  });
});
