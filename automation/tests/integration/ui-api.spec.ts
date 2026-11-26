import { test, expect } from '../../fixtures/test.fixture';
import { buildPostPayload } from '../../utils/test-data';

test.describe('UI and API integration', () => {
  test('creates API test data while an authenticated user uses the UI', async ({ postsApi, apiClient, authenticatedPage }) => {
    const payload = buildPostPayload();
    const response = await postsApi.create(payload);
    await apiClient.expectStatus(response, 201);
    expect(await response.json()).toMatchObject({ title: payload.title });
    await authenticatedPage.expectLoaded();
  });
});
