const { JSDOM } = require('jsdom')
const chalk = require('chalk')


async function getDOM(page) {
    const content = await page.content()

    return (new JSDOM(content))
}

async function solveCAPTCHA(page) {
    const iframeSelector = 'iframe'
    const iframeHandle = await page.$(iframeSelector)

    // Check if the iframe was found
    if (!iframeHandle) {
        console.log(chalk.red("No iframe found"))
        return
    }

    // Switch to the iframe context
    const iframeContent = await iframeHandle.contentFrame()

    // Check if the iframe has content
    if (!iframeContent) {
        console.log(chalk.red("Could not switch to iframe"))
        return
    }

    // Now find and click the button inside the iframe
    const buttonSelector = '#challenge-stage .ctp-checkbox-container .ctp-label'
    await iframeContent.click(buttonSelector)

    // Wait for the navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    console.log(chalk.greenBright("I solved CAPTCHA!"))
}

async function checkCAPTCHA(page) {
    const DOM = await getDOM(page)
    
    const iframes = DOM.window.document.querySelectorAll('iframe')

    if (iframes.length === 0) {
        return
    } else if (iframes.length === 2) {
        const secondIframeId = iframes[1].getAttribute('id')

        if (secondIframeId !== null) {
            console.log(chalk.red("I don't need to solve CAPTCHA!"))
            return
        } else {
            console.log(chalk.red("Wait. I need to solve CAPTCHA..."))
            await solveCAPTCHA(page)
        }
    }
}

module.exports = {
    checkCAPTCHA
}