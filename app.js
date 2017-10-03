var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  uniqid = require('uniqid'),
  mysql = require('mysql')

//initialize an express server
var app = express()

//create connection to mysql database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nlproject',
  password: 'nlproject',
  database: 'demo'
})

connection.connect();