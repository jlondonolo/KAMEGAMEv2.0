const mongoose = require('mongoose');
const Card = require('../models/storeModel'); // Asegúrate de que la ruta sea correcta

const cards = [
    {
        name: "Dark Magician",
        image_url: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
        level: 7,
        atk: 2500,
        def: 2100,
        price: 500
    },
    {
        name: "Blue-Eyes White Dragon",
        image_url: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
        level: 8,
        atk: 3000,
        def: 2500,
        price: 800
    }
];

mongoose.connect('mongodb+srv://juanj_araque:eMuug1XFgJZOlDPw@cluster0.wv9uh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Conectado a MongoDB");
        await Card.deleteMany(); // Borra los datos antiguos
        await Card.insertMany(cards);
        console.log("Cartas insertadas correctamente");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error al conectar con MongoDB:", err));
