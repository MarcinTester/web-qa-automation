# E-Commerce QA Automation

Full-stack e-commerce practice application and Playwright + TypeScript test automation framework, organized as two independent projects:

- **`application/`** — **QA Shop**: React/Vite storefront (`http://localhost:5173`), Express REST API (`http://localhost:3001/api`), and Prisma/SQLite database.
- **`automation/`** — **Playwright Framework**: UI, API, and integration tests using TypeScript, Page Objects, fixtures, and Ajv schema validation.

## Quick Start

### 1. Start the application

```bash
cd application
cp .env.example .env
npm install
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

The storefront runs at `http://localhost:5173` and the API at `http://localhost:3001/api`.

### 2. Run the automation tests

In a separate terminal:

```bash
cd automation
cp .env.example .env
npm install
npx playwright install
npx playwright test tests/ui/login.spec.ts tests/ui/register.spec.ts --project=chromium
```

> Make sure `automation/.env` points to your local app (`UI_BASE_URL=http://localhost:5173/`) and uses QA Shop demo credentials before running UI tests.

## Documentation

Project-specific commands, architecture, credentials, and conventions live in each project's own documentation:

- [QA Shop Application README](application/README.md)
- [QA Shop API Reference](application/API.md)
- [Playwright Automation README](automation/README.md)
- [Repository Agent Guide](AGENTS.md)
