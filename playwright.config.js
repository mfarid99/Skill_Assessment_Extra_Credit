const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    timeout: 60000,
    use: {
        headless: true, 
        viewport: { width: 1200, height: 720 },
    },
    reporter: [
        ['allure-playwright', {outputFolder: 'allure-results'}]
    ]
})