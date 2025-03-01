require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.log('❌ Error:', err));

// Importar rutas
const storeRoutes = require('./routes/storeRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const duelRoutes = require('./routes/duelRoutes');

app.use('/api/store', storeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/duel', duelRoutes);

app.listen(5000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:5000');
});
