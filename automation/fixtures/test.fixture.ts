import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/clients/api-client';
import { PostsEndpoint } from '../api/endpoints/posts.endpoint';
import { testConfig, type TestConfig } from '../config/environment';
import { CartPage } from '../pages/cart.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

type FrameworkFixtures = { config: TestConfig; loginPage: LoginPage; inventoryPage: InventoryPage; cartPage: CartPage; apiClient: ApiClient; postsApi: PostsEndpoint; authenticatedPage: InventoryPage };

export const test = base.extend<FrameworkFixtures>({
  config: [testConfig, { option: true }],
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
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
