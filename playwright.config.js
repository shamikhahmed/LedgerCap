// @ts-check
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:8769', viewport: { width: 390, height: 844 } },
  webServer: {
    command: 'python3 -m http.server 8769',
    url: 'http://127.0.0.1:8769',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
