import 'dotenv/config';

export type EnvironmentName = 'development' | 'staging' | 'production';

export interface TestConfig {
  environment: EnvironmentName;
  uiBaseUrl: string;
  apiBaseUrl: string;
  username: string;
  password: string;
  apiToken?: string;
}

const environment = (process.env.TEST_ENV ?? 'development') as EnvironmentName;
const allowedEnvironments: readonly EnvironmentName[] = ['development', 'staging', 'production'];

if (!allowedEnvironments.includes(environment)) {
  throw new Error(`Unsupported TEST_ENV: ${environment}`);
}

export const testConfig: TestConfig = {
  environment,
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  username: process.env.E2E_USERNAME ?? 'standard_user',
  password: process.env.E2E_PASSWORD ?? 'secret_sauce',
  apiToken: process.env.API_TOKEN
};
