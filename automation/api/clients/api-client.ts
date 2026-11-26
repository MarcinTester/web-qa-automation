import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { RequestOptions } from '../../types/api';

export class ApiClient {
  public constructor(
    private readonly request: APIRequestContext,
    private readonly defaultHeaders: Record<string, string> = {}
  ) {}

  public get(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('get', path, options);
  }

  public post(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('post', path, options);
  }

  public put(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('put', path, options);
  }

  public patch(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('patch', path, options);
  }

  public delete(path: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('delete', path, options);
  }

  public async expectStatus(response: APIResponse, status: number): Promise<void> {
    expect(response.status()).toBe(status);
  }

  private send(method: 'get' | 'post' | 'put' | 'patch' | 'delete', path: string, options: RequestOptions): Promise<APIResponse> {
    return this.request[method](path, {
      headers: { ...this.defaultHeaders, ...options.headers },
      params: options.params,
      data: options.data
    });
  }
}
