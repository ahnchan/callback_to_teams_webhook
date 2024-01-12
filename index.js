const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
const port = process.env.PORT || 8080
const webhookUrl = process.env.WEBHOOK_URL

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rooot
app.all('/', (req, res) => {
    console.log('received /');
    res.send('success');
});

// 404
app.get('*', function(req, res){
    res.send('error '+ req.url, 404);
});

// Callback
app.all('/callback', (req, res) => {

    let info = {
        method: req.method,
        url: req.protocol + '://' + req.get('host') + req.url,
        headers: req.headers,
        body: req.body
    }
    console.log(JSON.stringify(info))

    // send a infomation to webhook
    console.log('webhookUrl:', webhookUrl)

    let message = {
        "@type": "MessageCard",
        "summary": "A message from callbackUrl.",
        "sections": [{
            // "activityTitle": "",
            // "activitySubtitle": "On Project Tango",
            // "activityImage": "https://adaptivecards.io/content/cats/3.png",
            "facts": [{
                "name": "URL",
                "value": info.method + ' ' + info.url
            }, {
                "name": "Headers",
                "value": JSON.stringify(info.headers)
            }, {
                "name": "Body",
                "value": JSON.stringify(info.body)
            }],
            "markdown": true
        }]
    }
    axios.post(webhookUrl, message)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            // console.log(res)
        })
        .catch(error => {
            console.error(error)
        })

    res.send('success')
})

app.listen(port, () => {
    console.log('Started callback listener server (port:' + port + ')')
    console.log('webhook url:', webhookUrl)
})