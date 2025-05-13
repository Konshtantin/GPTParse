const chalk = require('chalk')
const express = require('express')
const { parse } = require('./parser')

const { typeToChat } = require('./helpers/chatgpt')

const app = express()

let page = null

app.use(express.json())

app.post('/', async (req, res) => {
    const message = req.body.message

    await typeToChat(page, message)

    res.json({code: 'OK'})
})

async function Start() {
    page = await parse()

    app.listen(5050, () => {
        console.log(chalk.blueBright('Server started on port 5050'))
    })
}

Start()

// сам чат - #intercom-frame