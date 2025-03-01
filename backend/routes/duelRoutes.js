const express = require('express');
const User = require('../models/User');
const Card = require('../models/Card');
const router = express.Router();

// Simular un duelo entre el usuario y la máquina
router.post('/start', async (req, res) => {
    const { userId, cardId } = req.body;

    try {
        const user = await User.findById(userId);
        const userCard = await Card.findById(cardId);

        if (!user || !userCard) {
            return res.status(404).json({ error: 'Usuario o carta no encontrados' });
        }

        // Simular carta de la máquina
        const allCards = await Card.find();
        const cpuCard = allCards[Math.floor(Math.random() * allCards.length)];

        let result;
        if (userCard.atk > cpuCard.def) {
            result = "¡Ganaste el duelo!";
        } else if (userCard.atk < cpuCard.def) {
            result = "Perdiste el duelo.";
        } else {
            result = "Empate.";
        }

        res.json({ userCard, cpuCard, result });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar el duelo' });
    }
});

module.exports = router;
