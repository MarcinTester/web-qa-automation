import type { APIResponse } from '@playwright/test';
import type { Post, PostPayload } from '../../types/api';
import type { ApiClient } from '../clients/api-client';

export class PostsEndpoint {
  public constructor(private readonly client: ApiClient) {}

  public getById(id: number): Promise<APIResponse> { return this.client.get(`/posts/${id}`); }
  public create(payload: PostPayload): Promise<APIResponse> { return this.client.post('/posts', { data: payload }); }
  public replace(id: number, payload: PostPayload): Promise<APIResponse> { return this.client.put(`/posts/${id}`, { data: payload }); }
  public update(id: number, payload: Partial<Post>): Promise<APIResponse> { return this.client.patch(`/posts/${id}`, { data: payload }); }
  public remove(id: number): Promise<APIResponse> { return this.client.delete(`/posts/${id}`); }
}
