// backend/models/storeModel.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    level: { type: Number, required: false },
    atk: { type: Number, required: false },
    def: { type: Number, required: false },
    price: { type: Number, required: false }
});

const Store = mongoose.model('Store', cardSchema);

module.exports = Store;
