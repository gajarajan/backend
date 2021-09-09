var express = require('express');
var router = express.Router();
var Login = require('../Modules/Login');
var Auth = require('../Middleware/auth')
const { check } = require("express-validator/check");
/* GET users listing. */

router.post('/loginuser', [
    check("email", "plse enter the valid email").isEmail(),
    check(
        "passward",
        "please enter a passward with 6 or more characters"
    ).isLength({ min: 6 })], Login.userLogin);

router.put('/changedetail', [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please enter the valid email").isEmail(),
    check(
        "passward",
        "please enter a passward with 6 or more characters"
    ).isLength({ min: 6 }),
    check("address", "Address is required").not().isEmpty(),
    check(
        "number",
        "please enter a number"
    ).isLength({ min: 9 })], Auth.auth, Login.changeDetial);
module.exports = router;