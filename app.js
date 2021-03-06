var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler')

var users = require('./routes/users'),
  courses = require('./routes/courses'),
  enroll = require('./routes/enroll')

//initialize an express server
var app = express()

//Cấu hình liên quan đến express.js
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(errorHandler({ dumpExceptions: true, showStack: true }))

//add routers
app.use('/users', users)
  .use('/courses', courses)
  .use('/enroll', enroll)

app.listen(3000, function() {
  console.log('server is running on port 3000')
})