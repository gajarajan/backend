const mongoose = require("mongoose");
const AddDishSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String
    },
    dishAdd: [{

        dishId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "dish",
        },
        image: {
            type: String,
        },
        dishname: {
            type: String,
        },
        amount: {
            type: Number,
        },
        rating: {
            type: Number
        },
        data: {
            type: Date,
            default: Date.now

        }
    }],
    totalbill: {
        type: Number,

    }
});

const AddDish = mongoose.model('AddDish', AddDishSchema, 'adddish');
module.exports = AddDish;