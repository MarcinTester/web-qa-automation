import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/clients/api-client';
import { PostsEndpoint } from '../api/endpoints/posts.endpoint';
import { testConfig, type TestConfig } from '../config/environment';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

type FrameworkFixtures = {
  config: TestConfig;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  apiClient: ApiClient;
  postsApi: PostsEndpoint;
  authenticatedPage: InventoryPage;
};

export const test = base.extend<FrameworkFixtures>({
  config: [testConfig, { option: true }],
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  apiClient: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({ baseURL: testConfig.apiBaseUrl, extraHTTPHeaders: testConfig.apiToken ? { Authorization: `Bearer ${testConfig.apiToken}` } : {} });
    await use(new ApiClient(request));
    await request.dispose();
  },
  postsApi: async ({ apiClient }, use) => { await use(new PostsEndpoint(apiClient)); },
  authenticatedPage: async ({ loginPage, inventoryPage, config }, use) => {
    await loginPage.open();
    await loginPage.login(config.username, config.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  }
});

export { expect };
