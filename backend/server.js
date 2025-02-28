import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  // Conexión a la BD
import userRoutes from './src/routes/userRoutes.js';  // Asegúrate de que esta ruta es correcta

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
