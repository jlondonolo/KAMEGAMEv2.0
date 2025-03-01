const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Obtener el inventario de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('inventory');
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(user.inventory);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
});

// Eliminar una carta del inventario
router.delete('/:userId/:cardId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        user.inventory = user.inventory.filter(card => card.toString() !== req.params.cardId);
        await user.save();

        res.json({ message: 'Carta eliminada', inventory: user.inventory });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la carta' });
    }
});

module.exports = router;
