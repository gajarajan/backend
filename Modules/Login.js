const User = require('../modele/User');
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const gravatar = require("gravatar");

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
exports.changeDetial = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, passward, address, number } = req.body;
        const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
        const salt = await bcrypt.genSalt(10);
        passward = await bcrypt.hash(passward, salt);
        var response = await User.findByIdAndUpdate(id, {
            name,
            email,
            avatar,
            passward,
            address,
            number
        })
        res.send(response);
    }
    catch {
        console.log(err.message);
        return res.status(500).send("server error");
    }
}