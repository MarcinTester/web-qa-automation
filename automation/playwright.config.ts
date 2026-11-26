import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './config/environment';

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['html', { outputFolder: 'reports/html', open: 'never' }], ['list']],
  outputDir: 'reports/test-results',
  use: {
    baseURL: testConfig.uiBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', testIgnore: /tests\\api\\/, use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', testIgnore: /tests\\api\\/, use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', testIgnore: /tests\\api\\/, use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', testIgnore: /tests\\api\\/, use: { ...devices['Pixel 5'] } },
    { name: 'api', testMatch: '**/api/**/*.spec.ts' }
  ]
});
