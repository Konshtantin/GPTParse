const chalk = require('chalk')


async function clickSendButton(page) {
    const sendButton = await page.$("div > textarea + button")

    await sendButton.click()

    console.log(chalk.bgBlack.magenta(`Message sent into chat!"`))

    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 })

    console.log(chalk.bgBlack.magentaBright(`ChatGPT response completed"`))
}

async function typeToChat(page, message) {
    const textArea = await page.$('textarea')

    await textArea.click()

    await page.waitForTimeout(500)

    await textArea.type(message, {delay: 10})

    await page.waitForTimeout(500)

    console.log(chalk.bgBlack.magenta(`Message `) +  chalk.underline.bgBlack.white(`${message}`) + chalk.bgBlack.magenta(` typed into chat!`))

    await clickSendButton(page)
}

module.exports = {
    typeToChat
}


const obj = {
    action: "next",
    messages: [
      {
        id: "aaa24a4f-65ad-4f5e-9403-f4618d774171",
        author: {
          role: "user"
        },
        content: {
          content_type: "text",
          parts: [
            "привет мир\n"
          ]
        },
        metadata: {}
      }
    ],
    parent_message_id: "aaa1f9df-1c10-4b8c-9ae5-022be988b98c",
    model: "text-davinci-002-render-sha",
    timezone_offset_min: -180,
    suggestions: [
      "I love taking photos of nature. Can you come up with a 3-day itinerary visiting the most photogenic places in Iceland?",
      "Can you suggest fun activities for a family of 4 to do indoors on a rainy day?",
      "I'm going to cook for my date who claims to be a picky eater. Can you recommend me a dish that's easy to cook?",
      "Tell me a random fun fact about the Roman Empire"
    ],
    history_and_training_disabled: false,
    arkose_token: null,
    conversation_mode: {
      kind: "primary_assistant"
    },
    force_paragen: false,
    force_rate_limit: false
  }
  

// https://chat.openai.com/backend-api/conversations?offset=0&limit=28&order=updated