const User = require('../modele/User');
const { validationResult } = require("express-validator/check");
//const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
exports.findUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-passward");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error1");
    }
};
exports.Register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errore: errors.array() });
    }
    const { name, email, passward, address, number } = req.body;

    try {
        let user = await User.findOne({ email });
        let usernumber = await User.findOne({ number });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exits" }] });
        }
        if (usernumber) {
            return res.status(400).json({ errors: [{ msg: "Nuber already exits" }] });
        }
        const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
        user = new User({
            name,
            email,
            avatar,
            passward,
            address,
            number
        });
        const salt = await bcrypt.genSalt(10);
        user.passward = await bcrypt.hash(passward, salt);
        await user.save();
        return res.send("user register");
        // const payload = {
        //     user: {
        //         id: user.id
        //     }
        // };
        // jwt.sign(payload, config.get("mysecrettoken"), { expiresIn: 360000 }, (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        // });
        //  return res.send("user register");
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("server error");
    }



};
exports.login = async (req, res, next) => {
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
            s.json({ errors: [{ msg: "inivalid credentials" }] });
        };
        const isMatch = await bcrypt.compare(passward, user.passward);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "passward is not match" }] });
        }
        res.send("succes");
    } catch {
        console.log(err.message);
        return res.status(500).send("server error");
    }

}