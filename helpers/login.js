const chalk = require('chalk')


async function typeEmail(page) {

    try {
        const emailInput = await page.$('input#username')

        await emailInput.click()
    
        await page.waitForTimeout(1000)
        
        await emailInput.type('<enter_your_email_from_ChatGPT_account_here>', {delay: 100});
    
        await page.waitForTimeout(1000)
        
        const continueButton = await page.$('button[type="submit"]')
    
        await continueButton.click()
    
        await page.waitForNavigation({ waitUntil: 'networkidle2' })

        console.log(chalk.greenBright('Email typed successfully📧'))
    } catch (err) {
        console.error(chalk.red('TypeEmail ERROR: '), err)
    }
}

async function typePassword(page) {
    try {
        const passwordInput = await page.$('input#password')

        await passwordInput.click()
    
        await page.waitForTimeout(1000)
    
        await passwordInput.type('<enter_your_password_from_ChatGPT_account_here>', {delay: 90});
    
        await page.waitForTimeout(1000)
    
        const buttons = await page.$$('button[type="submit"]')
    
        await buttons[1].click()
    
        await page.waitForNavigation({ waitUntil: 'networkidle2' })

        console.log(chalk.greenBright('Password typed successfully🔐'))
    } catch (err) {
        console.error(chalk.red('TypePassword ERROR: '), err)
    }
    
}

async function login(page) {
    const loginButton = await page.$('button')
    
    await loginButton.click()

    await page.waitForNavigation({ waitUntil: 'networkidle2' })

    console.log(chalk.greenBright("Login button clicked🚀"))

    await page.waitForTimeout(1000)

    await page.screenshot({ path: 'afterclicklogin.png' })

    await typeEmail(page)

    await page.screenshot({ path: 'aftertypeemail.png' })

    await typePassword(page)

    await page.screenshot({path: 'aftertypepassword.png'})

    console.log(chalk.greenBright("Logged In successfully👤"))
}


module.exports = {
    login
}