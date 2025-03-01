const express = require('express');
const Card = require('../models/Card');
const User = require('../models/User');
const router = express.Router();

// Obtener todas las cartas disponibles en la tienda
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cartas' });
    }
});

// Comprar una carta y agregarla al inventario del usuario
router.post('/buy', async (req, res) => {
    const { userId, cardId } = req.body;

    try {
        const user = await User.findById(userId);
        const card = await Card.findById(cardId);

        if (!user || !card) {
            return res.status(404).json({ error: 'Usuario o carta no encontrados' });
        }

        user.inventory.push(card);
        await user.save();

        res.json({ message: 'Carta comprada con éxito', inventory: user.inventory });
    } catch (error) {
        res.status(500).json({ error: 'Error al comprar la carta' });
    }
});

module.exports = router;
