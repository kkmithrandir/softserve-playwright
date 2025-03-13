import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000, // Global timeout for each test
  expect: {
    timeout: 5000, // Timeout for expect assertions
  },
  fullyParallel: true, // Run tests in parallel
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
