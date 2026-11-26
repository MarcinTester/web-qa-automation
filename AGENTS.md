# Repository Guide

This repository contains two independent projects:

- `application/` is the QA Shop web application: React/Vite frontend, Express API, and Prisma/SQLite database.
- `automation/` is the Playwright + TypeScript framework.

## Project boundaries

- Make application changes only under `application/`.
- Make automation framework changes only under `automation/`.
- Keep dependencies, scripts, environment files, and documentation local to their project.
- Do not move files between the projects unless explicitly requested.
- The automation project targets the application at `http://localhost:5173` and its API at `http://localhost:3001/api` by default. Update the relevant local environment configuration when changing these addresses.

## Application commands

Run commands from `application/`:

- `npm run dev` starts the frontend and API.
- `npm run build` builds the frontend and checks TypeScript.
- `npm run lint` runs ESLint.
- `npm run typecheck` checks TypeScript.
- `npm run db:migrate` applies Prisma migrations.
- `npm run db:seed` repopulates deterministic demo data.
- `npm run db:reset` recreates and seeds the local database.

The application uses `.env` for local configuration. Do not commit secrets or the local SQLite database.

## Automation commands

Run commands from `automation/`:

- `npm run test` runs the full Playwright suite.
- `npm run test:ui`, `npm run test:api`, and `npm run test:integration` run individual test groups.
- `npm run lint` and `npm run typecheck` check code quality and types.

## Working conventions

- Preserve strict TypeScript typing and follow the conventions in each project's ESLint and Prettier configuration.
- Keep API input validation, authorization, and business rules in the application backend; UI checks alone are not security controls.
- Prefer accessible labels and stable `data-testid` selectors for UI behavior intended for automation.
- Keep seed data deterministic and safe to recreate.
- Never add real credentials, tokens, or production data to source control.
