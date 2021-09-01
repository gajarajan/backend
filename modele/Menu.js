
const mongoose = require('mongoose');
const DishSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    dishname: {
        type: String,
        required: true
    },
    hotel: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    data: {
        type: Date,
        default: Date.now

    }
});

const Dish = mongoose.model('Dish', DishSchema, 'dish');
module.exports = Dish;