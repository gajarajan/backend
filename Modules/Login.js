const User = require('../modele/User');
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


exports.userLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errore: errors.array() });
    }
    const { email, passward } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
            res.json({ errors: [{ msg: "inivalid credentials" }] });
        };
        const isMatch = await bcrypt.compare(passward, user.passward);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "passward is not match" }] });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, "kaggroup", { expiresIn: '1hr' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })

    } catch {
        console.log(err.message);
        return res.status(500).send("server error");
    }

}