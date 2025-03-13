import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000, // Global timeout for each test (increased time for testing purposes)
  expect: {
    timeout: 8000, // Timeout for expect assertions (increased time for testing purposes)
  },
  fullyParallel: false, // Run tests in parallel (for testing purposes)
  retries: 2, // 2 added retries (flaky tests on Mozilla)
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: false, //testing
      },
    },
  ],
  use: {
    baseURL: 'https://www.softserveinc.com',
    trace: 'on-first-retry', // Capture trace on failures
    headless: false, // Global headless mode set to false
  },
});
