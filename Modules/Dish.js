const Dish = require('../modele/Menu');
const { validationResult } = require("express-validator/check");
exports.addDish = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errore: errors.array() });
    }
    const { image, dishname, hotel, amount, rating } = req.body;
    try {
        let dish = await Dish.findOne({ dishname });
        if (dish) {
            return res.status(400).json({ errors: [{ msg: "Dish already exits" }] });
        }
        dish = new Dish({
            image,
            dishname,
            hotel,
            amount,
            rating
        });

        await dish.save();
        return res.send(dish);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("server error");
    }
};
exports.getallDish = async (req, res) => {
    try {
        const menu = await Dish.find().sort({ date: -1 });
        res.json(menu);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
};
exports.deleteDish = async (req, res) => {
    try {
        const id = req.params.id;
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).json({ msg: "dish not found" });
        }
        await Dish.findByIdAndDelete(id);
        res.send("dish deleted");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
}
exports.updateDish = async (req, res) => {
    const id = req.params.id;

    var response = await User.findByIdAndUpdate(id, {
        image: req.body.username,
        dishname: req.body.dishname,
        hotel: req.body.hotel,
        amount: req.body.amount,
        rating: req.body.rating,
    })
    res.send(response);
}
exports.findDish = async (req, res) => {
    try {
        const id = req.params.id;
        const dish = await Dish.findById(id);
        res.json(dish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error1");
    }
};
