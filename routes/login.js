var express = require('express');
var router = express.Router();
var Login = require('../Modules/Login');
const { check } = require("express-validator/check");
/* GET users listing. */

router.post('/loginuser', [
    check("email", "plse enter the valid email").isEmail(),
    check(
        "passward",
        "please enter a passward with 6 or more characters"
    ).isLength({ min: 6 })], Login.userLogin);

module.exports = router;