var express = require('express');
var router = express.Router();
var UserModule = require('../Modules/Createuser')
const { check } = require("express-validator/check");

/* GET home page. */
router.get('/:id', UserModule.findUser)

router.post('/register', [
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
    ).isLength({ min: 9 })], UserModule.Register);

module.exports = router;
