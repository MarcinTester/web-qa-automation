export const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
export type User = { id: string; email: string; firstName: string; lastName: string; role: 'CUSTOMER' | 'ADMIN' };
export type Product = { id: string; name: string; description: string; price: number; stock: number; imageUrl: string; category: { name: string; slug: string } };
export async function request<T>(path: string, options: RequestInit = {}): Promise<T> { const response = await fetch(`${apiBase}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(localStorage.token ? { Authorization: `Bearer ${localStorage.token}` } : {}), ...options.headers } }); const body = response.status === 204 ? null : await response.json(); if (!response.ok) throw new Error(body.error?.message ?? 'Request failed.'); return body.data as T; }
export const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
