export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface Post extends PostPayload {
  id: number;
}
