import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API de usuarios funcionando correctamente');
});

export default router;
