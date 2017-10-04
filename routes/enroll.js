var express = require('express')
var router = express.Router()
var connection = require('../models/DB')

//get all courses this user enrolled
router.get('/:username', function(req, res) {
  var queryStr = 'SELECT DISTINCT c.id, c.name FROM enroll e INNER JOIN user u ON u.id = e.student INNER JOIN course c ON c.id = e.course WHERE u.username = ? ORDER BY c.id'
  connection.query(queryStr, [req.params.username], function(err, results) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(results)
    }
  })
})

module.exports = router