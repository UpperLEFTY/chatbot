'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows me to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
    res.send("Hi I am a chatbot")
  })

   let token = "*************************"

  // Facebook

  app.get('/webhook/',function(req, res) {
    if(req.query['hub.verify_token'] === "***************") {
       res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
  })

  app.post('/webhook', function(req, res) {
      let messaging_events = req.body.entry[0].messaging
      for (let i = 0; i < messaging_events.length; i++) {
          let event = messaging_events[i]
          let sender = event.sender.id
          if (event.message && event.message.text) {
              let text = event.message.text
              decideMessage(sender, text)
              //sendText(sender, "Text echo: " + text.substring(0, 100))
          }
          if (event.postback) {
              let text = JSON.stringify(event.postback)
              decideMessage(sender, text)
              continue
          }
      }
      res.sendStatus(200)
  })

  function decideMessage(sender, text1) {
    let text = text1.toLowerCase()
    if (text.includes("How's it going?")) {

    } else if (text.includes("How are you?")) {

    } else {
        sendText(sender, "How's it going?")
        sendButtonMessage(sender, "What are you doing right now")

  }

  function sendText(sender, text) {
      let messageData = {text: text}
      sendRequest(sender, messageData)
  }
  function sendButtonMessage(sender, text) {
      let messageData = {
        "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"How's it going?",
            "payload":"How's it going?"
          },
          {
            "type":"postback",
            "title":"How are you?",
            "payload":"How are you?"
          },
          { }
        ]
      }
    }
      }
      sendRequest(sender, messageData)
   }


   function sendRequest(sender, messageData) {
     request({
          url: "https://graph.facebook.com/v2.6/me/messages"
          qs : {access_token: token},
          method: "POST",
          json: {
              recipient: {id: sender},
              message : messageData,
          }
       }, function(error, response, body) {
            if (error) {
                console.log("sending error")
            } else if (response.body.error) {
                console.log("response body error")
            }
          })
       }

  app.listen(app.get('port'), function() {
      console.log("running: port")
    })
