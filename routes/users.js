var express = require('express')
var router = express.Router()
var connection = require('../models/DB')

router.get('/', function(req, res) {
  connection.query('SELECT * FROM user', function(err, results) {
    if (err) {
      res.json(err)
    } else {
      res.json(results)
    }
  })
})

router.get('/:username', function(req, res) {
  connection.query('SELECT * FROM user WHERE user.username = ?', [req.params.username], function(err, results) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(results)
    }
  })
})

router.post('/login', function(req, res) {
  if (!req.body) {
    res.sendStatus(400)
  } else {
    var user = [req.body.username, req.body.password]
    var queryStr = 'SELECT * FROM user WHERE username = ? and password = ?';
    connection.query(queryStr, user, function(err, result) {
      if (err) res.sendStatus(500)
      else if (result.length == 0) {
        res.sendStatus(200) //username và password trùng khớp
      } else res.sendStatus(401) //username hoặc password bị sai
    })
  }
})

router.post('/signup', function(req, res) {
  if (!req.body) {
    res.sendStatus(400) //thiếu dữ liệu gửi kèm theo post
  } else {
    var user = {
      id: req.body.id,
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    }
    connection.query('INSERT INTO user SET ?', user, function(err, result) {
      if (err) res.sendStatus(500) //lỗi của server
      else if (result.affectedRows == 1) {
        res.sendStatus(200) //tạo tài khoản mới thành công
      } else res.sendStatus(409) //lỗi trùng tài khoản đã có người sử dụng
    })
  }
})

module.exports = router