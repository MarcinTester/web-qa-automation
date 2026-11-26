# QA Shop

QA Shop is a local full-stack e-commerce application designed as a deterministic target for UI, API, and integration automation practice. It is independent from any test framework.

## Stack

- React, TypeScript, Vite, React Router, Tailwind CSS
- Express, TypeScript, Prisma, SQLite
- JWT, bcryptjs, Zod

## Architecture

`src/` contains the Vite storefront; `server/` exposes the REST API; `prisma/` owns the schema and repeatable seed script. API responses use `{ "data": ... }`; errors use `{ "error": { "code", "message", "details?" } }`.

## Setup

```bash
cd ecommerce-qa-app
cp .env.example .env
npm install
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Open `http://localhost:5173`. The API runs on `http://localhost:3001`.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@qa-shop.local` | `Password123!` |
| Customer | `alice@qa-shop.local` | `Password123!` |
| Customer | `bob@qa-shop.local` | `Password123!` |

## Commands

- `npm run dev` starts frontend and API.
- `npm run build` builds the frontend and type checks all source.
- `npm run lint` runs ESLint.
- `npm run typecheck` validates TypeScript.
- `npm run db:migrate` creates/applies a Prisma migration.
- `npm run db:seed` resets deterministic application records and adds demo data.
- `npm run db:reset` recreates the SQLite database and runs the seed script.

## QA features

- Stable `data-testid` values for navigation, forms, catalog cards, cart, checkout, and confirmation.
- Accessible labels, semantic landmarks, visible loading/error states, deterministic sample data.
- Stock checks on cart mutation and transactional checkout.
- Customer ownership checks for orders; role middleware for administration.
- Repeatable reset/seed workflow and known demo credentials.

See [API.md](API.md) for complete endpoint documentation and sample requests.
