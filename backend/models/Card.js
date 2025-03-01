const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    atk: { type: Number, required: true },
    def: { type: Number, required: true },
    level: { type: Number, required: true},
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Card', cardSchema);
