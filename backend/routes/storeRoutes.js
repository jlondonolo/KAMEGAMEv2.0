const express = require('express');
const Card = require('../models/Card');
const User = require('../models/User');
const router = express.Router();
const Store = require('../models/storeModel');

// Ruta para obtener todas las cartas de Yu-Gi-Oh
router.get('/cards', (req, res) => {
    fs.readFile(path.join(__dirname, '../imagenes/yu_gi_oh_detailed_cards.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo de cartas' });
        }
        const jsonData = JSON.parse(data);
        const allCards = Object.values(jsonData).flat(); // Aplanar los datos si es necesario
        res.json(allCards); // Enviar las cartas como respuesta
    });
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
