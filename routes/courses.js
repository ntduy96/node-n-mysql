var express = require('express')
var router = express.Router()
var connection = require('../models/DB')

//retrieve all courses in the database
router.get('/', function(req, res) {
  connection.query('SELECT * FROM course', function(err, results) {
    if (err) {
      res.sendStatus(500) //lỗi server
    } else {
      res.json(results)
    }
  })
})

//retrieve all information about a course with a specific id
router.get('/:id', function(req, res) {
  connection.query('SELECT * FROM course WHERE id = ?', [req.params.id], function(err, result) {
    if (err) {
      res.sendStatus(500) //lỗi server
    } else {
      res.json(result)
    }
  })
})

module.exports = router