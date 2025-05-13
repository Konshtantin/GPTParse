const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

const { login } = require('./helpers/login')
const { checkCAPTCHA } = require('./helpers/captcha')

puppeteer.use(StealthPlugin())


async function parse() {
    // Launch a new browser instance.
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
        defaultViewport: null
    })

    // Open a new page.
    const page = await browser.newPage({})

    // Navigate to the specified URL.
    await page.goto('https://chat.openai.com/auth/login', {
        waitUntil: 'networkidle2' // Wait for network to be idle before taking a screenshot.
    })

    await page.waitForTimeout(3000)

    await page.screenshot({ path: 'beforecapture.png' })

    await checkCAPTCHA(page) // после выполнения команды страница готова для нажатия на кнопку "Log in"

    await page.screenshot({ path: 'beforelogin.png' })

    await login(page)

    return page
}


module.exports = {
    parse
}