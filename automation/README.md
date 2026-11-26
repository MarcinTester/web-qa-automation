# Playwright + TypeScript Automation Framework

A scalable baseline for web UI, REST API, and UI/API integration testing. It uses Playwright Test, TypeScript, dotenv, Ajv JSON-schema validation, ESLint, Prettier, and Playwright's HTML reporter.

## Architecture

```
tests/          UI, API, and integration specifications
pages/          Page Objects built on BasePage
fixtures/       Typed Playwright fixtures and authenticated sessions
api/            Request client and endpoint-focused API abstractions
data/           Isolated test data and JSON schemas
config/         Environment-aware configuration
utils/          Schema validation and dynamic data helpers
reports/        Generated test artifacts (gitignored)
```

The included examples target Sauce Demo for UI coverage and JSONPlaceholder for API coverage. Replace values in `.env` with your application endpoints before adapting Page Objects and endpoint classes.

## Installation

1. Use Node.js 22 LTS or later.
2. Run `npm install`.
3. Run `npx playwright install`.
4. Copy `.env.example` to `.env` and configure local credentials.

Never commit `.env`. Supply CI credentials through GitHub Actions secrets.

## Environment configuration

`TEST_ENV` accepts `development`, `staging`, or `production`. `config/environment.ts` centrally loads `UI_BASE_URL`, `API_BASE_URL`, `E2E_USERNAME`, `E2E_PASSWORD`, and `API_TOKEN`.

## Running tests

| Command | Purpose |
| --- | --- |
| `npm run test` | Run all tests and browser projects |
| `npm run test:ui` | Run UI tests |
| `npm run test:api` | Run API tests |
| `npm run test:integration` | Run integration tests |
| `npm run test:headed` | Run UI tests with a visible browser |
| `npm run test:debug` | Debug a test interactively |
| `npm run test:report` | Open the HTML report |
| `npm run lint` | Check style and common errors |
| `npm run typecheck` | Check TypeScript types |

Screenshots, video, and traces are retained for failures/retries under `reports/`; the HTML report is written to `reports/html`.

## Extending the framework

### Add a Page Object

Create a class in `pages/` that extends `BasePage`. Keep locators private and expose intent-based methods such as `submitOrder()`. Register it in `fixtures/test.fixture.ts`, then consume that fixture in specs. Prefer `getByRole`, `getByLabel`, and `getByTestId`; use web-first assertions and never arbitrary sleeps.

### Add an API endpoint

Create an endpoint class in `api/endpoints/` that receives `ApiClient` and maps business actions to paths and payloads. Register it as a fixture, keep request payloads in `data/test-data`, and place response schemas in `data/schemas`. `ApiClient` centralizes headers, query parameters, status checks, and request verbs.

## Conventions

- Tests describe externally visible behavior and use meaningful assertions.
- Page Objects and endpoint classes own selectors and routes, not tests.
- Fixtures manage lifecycle; API request contexts are disposed automatically.
- Dynamic payloads use `utils/test-data.ts` to keep runs independent.
- UI tests run Chromium, Firefox, WebKit, and mobile Chromium; CI retries failures and uploads artifacts.
- Production APIs should expose dedicated test data and cleanup mechanisms. JSONPlaceholder is a demo service and does not persist mutations.
