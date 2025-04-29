const express = require('express');
const router = express.Router();
const Mensagens = require('../models/Mensagens');

// GET /mensagens
router.get('/', async (req, res) => {
    try {
        const mensagens = await Mensagens.findAll();
        res.json(mensagens);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const novaMensagem = await Mensagens.create({
            id: req.body.id,
            conteudo: req.body.conteudo
        })
        res.status(201).json(novaMensagem);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const mensagemId = parseInt(req.params.id);
    const newConteudo = req.body;
    try {
        const newMensagem = await Mensagens.update(newConteudo, {
            where: {
                id: mensagemId,
            },
        });
        res.status(201).json(newMensagem);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const deleteId = parseInt(req.params.id);
    try {
        const deleteMensagem = await Mensagens.destroy({
            where: {
                id: deleteId,
            },
        });
        res.status(200).json('deletou!');
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

module.exports = router;