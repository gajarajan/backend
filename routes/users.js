var express = require('express');
var router = express.Router();
var Auth = require('../Middleware/auth')
var User = require('../Modules/User')
/* GET users listing. */
router.delete('/delete/:id', Auth.auth, User.deleteUser)
module.exports = router;
