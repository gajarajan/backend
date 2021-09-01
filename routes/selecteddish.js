var express = require('express');
var router = express.Router();

var Auth = require('../Middleware/auth');
var adddishModule = require('../Modules/Adddish');
const { check } = require('express-validator/check');
router.post(
    '/addDish/:id',

    Auth.auth,
    adddishModule.addDish
);
module.exports = router;