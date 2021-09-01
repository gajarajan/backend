const User = require('../modele/User');
const Dish = require('../modele/Menu');
const AddDish = require('../modele/AddDish')
const { validationResult } = require("express-validator/check");
exports.addDish = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {

        const user = await User.findById(req.user.id).select("-passward");
        let dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(400).json({ errors: [{ msg: "Dish no exits" }] });
        }
        const Dish1 = await AddDish.findById(req.params.id);
        if (Dish1) {
            return res.status(400).json({ errors: [{ msg: "Dish no exits" }] });
        }
        const {

            image,
            dishname,
            amount,
            rating
        } = dish;
        const dishid = req.params.id;
        const newaddeddish = {
            dishid,
            image,
            dishname,
            amount,
            rating
        }
        const adddish = new AddDish({
            name: user.name,
            user: req.user.id,
        });
        adddish.dishAdd.unshift(newaddeddish);
        res.json(adddish);
        const dishs = await adddish.save();
        res.json(dishs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
}