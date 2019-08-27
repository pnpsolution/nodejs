const express = require('express');
const mydb = require('../helper/mydb');
const myConfig = require('config');
const config = myConfig.get('Config');
const jwt = require('jwt-simple');
const router = express.Router();

router.post('/doLogin', function(req, res) {
  var dat = req.body;
  if (dat.userEmail && dat.userPassword) {
    var sql = `select user_email from sc_user where user_email = '${dat.userEmail}' and user_password = '${dat.userPassword}'`;
    mydb.executeSql(sql, (err, results) => {
      var userInfo = results[0];
      if (userInfo) {
        var token = jwt.encode(userInfo, config.auth.jwtSecret);
        res.json({
          success: true,
          token: token
        });
      } else {
        res.json({
          success: false,
          message: 'Login fail.'
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
