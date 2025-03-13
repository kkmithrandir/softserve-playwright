import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000, // Global timeout for each test **increased time for testing purposes
  expect: {
    timeout: 8000, // Timeout for expect assertions **increased time for testing purposes
  },
  fullyParallel: false, // Run tests in parallel **for testing purposes (got timeout 3 times)
  retries: 2, // 2 added retires (flaky tests on mozilla)
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  use: {
    baseURL: 'https://www.softserveinc.com',
    trace: 'on-first-retry', // Capture trace on failures
  },
});
