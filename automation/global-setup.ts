import { testConfig } from './config/environment';

export default async function globalSetup(): Promise<void> {
  console.info(`Running ${testConfig.environment} tests against ${testConfig.uiBaseUrl}`);
}
