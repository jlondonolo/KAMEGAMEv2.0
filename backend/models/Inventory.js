const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
});

module.exports = mongoose.model('Inventory', InventorySchema);
