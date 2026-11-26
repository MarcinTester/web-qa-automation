import { test } from '../../fixtures/test.fixture';

const backpack = 'Sauce Labs Backpack';

test.describe('Inventory navigation and cart CRUD', () => {
  test('navigates to cart and adds, reads, then removes a product', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addToCart(backpack);
    await authenticatedPage.openCart();
    await cartPage.expectProduct(backpack);
    await cartPage.removeProduct(backpack);
    await cartPage.expectEmpty();
  });
});
