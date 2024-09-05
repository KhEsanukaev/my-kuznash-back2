const mongoose = require("mongoose");

const carpetsSchema = mongoose.Schema({
    image: [String],
    name: String,
    size: {
        width: Number,
        height: Number,
    },
    description: String,
    price: Number,
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories',
    },
});

const Carpets = mongoose.model("Carpets", carpetsSchema);

module.exports = Carpets;
