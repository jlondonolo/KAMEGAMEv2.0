const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    atk: { type: Number },
    def: { type: Number },
    level: { type: Number },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Card', cardSchema);
