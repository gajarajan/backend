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
        const dishneedtoadd = {}
        dishneedtoadd.name = user.name;
        dishneedtoadd.user = req.user.id
        dishneedtoadd.dishAdd = {};
        dishneedtoadd.dishAdd.dishname = dish.dishname;
        dishneedtoadd.dishAdd.amount = dish.amount;
        dishneedtoadd.dishAdd.rating = dish.rating;
        dishneedtoadd.dishAdd.image = dish.image;
        dishneedtoadd.dishAdd.dishId = req.params.id;
        let userCart = await AddDish.findOne({ user: req.user.id });
        if (userCart) {
            //update
            if (dish.count > 0) {
                var total = userCart.totalbill + dish.amount
                Added = await AddDish.findOneAndUpdate(
                    {
                        user: req.user.id,
                    },
                    { $push: { dishAdd: dishneedtoadd.dishAdd } },

                    { new: true }
                );
                Added = await AddDish.findOneAndUpdate(
                    {
                        user: req.user.id,
                    },

                    { $set: { totalbill: total } },

                );
                //  reduce the count of item in dish
                var dishcount = dish.count - 1
                await Dish.findByIdAndUpdate(req.params.id, {

                    count: dishcount,
                })
                return res.json(Added);
            }
            else {
                res.status(200).send("no dish is avaliable at the time")
            }
        }
        //create
        dishneedtoadd.totalbill = dish.amount;
        Added = new AddDish(dishneedtoadd);
        await Added.save();
        //  reduce the count of item in dish
        var dishcount = dish.count - 1
        await Dish.findByIdAndUpdate(req.params.id, {

            count: dishcount,
        })
        res.json(Added);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
}
exports.removeDish = async (req, res) => {
    try {


        const cart = await AddDish.findOne({ user: req.user.id });
        const Id = cart.dishAdd
            .map((item) => item.dishId)
            .indexOf(req.params.id)
        // let dish = await Dish.findById(Id);
        console.log(Id);
        // var total = cart.totalbill - dish.amount
        const removedish = cart.dishAdd
            .map((item) => item.id)
            .indexOf(req.params.id);

        cart.dishAdd.splice(removedish);
        ;
        // cart = await AddDish.findOneAndUpdate(
        //     {
        //         user: req.user.id,
        //     },

        //     { $set: { totalbill: total } },

        // );
        await cart.save();

        // var dishcount = dish.count + 1
        // await Dish.findByIdAndUpdate(Id, {

        //     count: dishcount,
        // })
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
}