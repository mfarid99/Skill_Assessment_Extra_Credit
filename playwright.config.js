const { timeout } = require("nodemon/lib/config");

module.exports = {
    timeout: 60000,
    use: {
        headless: true,
        viewport: {width: 1200, height: 720}
    }
}