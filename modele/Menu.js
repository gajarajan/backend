
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
    },
    count: {
        type: Number,
        required: true
    },
    // customerid: [{
    //     userid: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "user"
    //     }

    // }]
});

const Dish = mongoose.model('Dish', DishSchema, 'dish');
module.exports = Dish;