var express = require('express');
var router = express.Router();
var dishModule = require('../Modules/Dish');

const { check } = require('express-validator/check');
router.post(
    '/',
    [
        check('image', 'image is required').not().isEmpty(),
        check('dishname', 'dishname is required').not().isEmpty(),
        check('hotel', 'hotel is required').not().isEmpty(),
        check('amount', 'amount is required').not().isEmpty(),
        check('count', 'amount is required').not().isEmpty()

    ],
    dishModule.addDish
);
router.get('/menu', dishModule.getallDish);
router.delete('/delete/:id', dishModule.deleteDish);
router.get('/find/:id', dishModule.findDish);
router.put('/update/:id', [
    check('image', 'image is required').not().isEmpty(),
    check('dishname', 'dishname is required').not().isEmpty(),
    check('hotel', 'hotel is required').not().isEmpty(),
    check('amount', 'amount is required').not().isEmpty(),
    check('count', 'amount is required').not().isEmpty()
], dishModule.updateDish);
module.exports = router;
