# API Reference

Base URL: `http://localhost:3001/api`. Send JSON requests and use `Authorization: Bearer <jwt>` for protected endpoints. Successful responses use `{ "data": ... }`; errors use `{ "error": { "code": "…", "message": "…", "details"?: {} } }`.

## Authentication

| Method | Route | Auth | Body |
| --- | --- | --- | --- |
| POST | `/auth/register` | No | `firstName`, `lastName`, `email`, `password` |
| POST | `/auth/login` | No | `email`, `password` |
| GET | `/auth/me` | User | — |

Login/register return `{ user, token }`. Passwords require at least eight characters. Errors include `INVALID_CREDENTIALS`, `EMAIL_EXISTS`, `UNAUTHENTICATED`, and `INVALID_TOKEN`.

## Products

| Method | Route | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/products?page=1&limit=12&search=&category=&sort=newest` | No | Sort: `newest`, `name`, `price_asc`, `price_desc` |
| GET | `/products/:id` | No | `PRODUCT_NOT_FOUND` when absent |
| POST/PUT/PATCH | `/products` or `/products/:id` | Admin | Name, description, price in cents, categoryId, imageUrl, stock |
| DELETE | `/products/:id` | Admin | Returns 204 |
| GET | `/categories` | No | All categories |

## Cart

| Method | Route | Body |
| --- | --- | --- |
| GET | `/cart` | — |
| POST | `/cart/items` | `{ "productId": "…", "quantity": 1 }` |
| PATCH | `/cart/items/:id` | `{ "quantity": 2 }` |
| DELETE | `/cart/items/:id` | — |

All cart routes require a user. Stock errors return `INSUFFICIENT_STOCK`; invalid/missing items return `PRODUCT_NOT_FOUND` or `CART_ITEM_NOT_FOUND`.

## Orders and users

| Method | Route | Auth | Body |
| --- | --- | --- | --- |
| POST | `/orders` | User | `firstName,lastName,email,phone,street,city,postalCode,country` |
| GET | `/orders` | User | Current user's orders |
| GET | `/orders/:id` | Owner/Admin | — |
| PATCH | `/orders/:id/status` | Admin | `{ "status": "PROCESSING" }` |
| GET/PATCH | `/users/me` | User | Profile read/update |
| GET | `/admin/orders` | Admin | All orders |
| GET | `/admin/users` | Admin | All users |

Checkout returns `EMPTY_CART` or `INSUFFICIENT_STOCK` when appropriate. Admin status transitions are `PENDING → PROCESSING/CANCELLED`, `PROCESSING → SHIPPED/CANCELLED`, and `SHIPPED → DELIVERED`; invalid changes return `INVALID_STATUS_TRANSITION`.

## Example

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@qa-shop.local","password":"Password123!"}'
```
