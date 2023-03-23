import express from 'express';

const router = express.Router();

//Routing
router.get('/', (req, res) => {
    res.send('Hola Mundo en express')
});
router.get('/nosotros', (req, res) => {
    res.send('Hola Mundo nosotros')
});


export default router