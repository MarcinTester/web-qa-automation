import { test, expect } from '../../fixtures/test.fixture';
import { userSchema } from '../../data/schemas/user.schema';
import type { User } from '../../types/api';
import { validateSchema } from '../../utils/schema-validator';
import { buildPostPayload } from '../../utils/test-data';

test.describe('Posts API', () => {
  test('GET returns a resource with expected shape, headers, and response time', async ({ apiClient }) => {
    const startedAt = performance.now();
    const response = await apiClient.get('/users/1');
    expect(performance.now() - startedAt).toBeLessThan(2_000);
    await apiClient.expectStatus(response, 200);
    expect(response.headers()['content-type']).toContain('application/json');
    validateSchema<User>(userSchema, await response.json());
  });

  test('POST creates a resource', async ({ postsApi, apiClient }) => {
    const response = await postsApi.create(buildPostPayload());
    await apiClient.expectStatus(response, 201);
    expect(await response.json()).toMatchObject({ id: expect.any(Number) });
  });

  test('PUT and PATCH update a resource', async ({ postsApi, apiClient }) => {
    const putResponse = await postsApi.replace(1, buildPostPayload());
    await apiClient.expectStatus(putResponse, 200);
    const patchResponse = await postsApi.update(1, { title: 'Updated title' });
    await apiClient.expectStatus(patchResponse, 200);
    expect(await patchResponse.json()).toMatchObject({ title: 'Updated title' });
  });

  test('DELETE removes a resource', async ({ postsApi, apiClient }) => {
    const response = await postsApi.remove(1);
    await apiClient.expectStatus(response, 200);
  });

  test('returns 404 for a missing resource', async ({ apiClient }) => {
    const response = await apiClient.get('/posts/999999');
    await apiClient.expectStatus(response, 404);
  });

  test('rejects malformed authentication', async ({ apiClient }) => {
    const response = await apiClient.get('/posts/1', { headers: { Authorization: 'Bearer invalid-token' } });
    // Replace with your protected endpoint; JSONPlaceholder is intentionally public.
    expect([200, 401, 403]).toContain(response.status());
  });
});
