'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const = app = express()

app.set('port', (process.env.PORT || 5000))

// Allows me to process the data
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
