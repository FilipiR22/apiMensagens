const express = require('express');
const router = express.Router();
const Mensagens = require('../models/Mensagens');

router.get('/', async (req, res) => {
    try {
        const mensagens = await Mensagens.findAll();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar mensagens: ' + error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const mensagem = await Mensagens.findByPk(id);
        if (!mensagem) {
            return res.status(404).json({ erro: 'Mensagem não encontrada' });
        }
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar a mensagem: ' + error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const novaMensagem = await Mensagens.create({
            id: req.body.id,
            conteudo: req.body.conteudo
        });
        res.status(201).json(novaMensagem);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar a mensagem: ' + error.message });
    }
});

router.put('/:id', async (req, res) => {
    const mensagemId = parseInt(req.params.id);
    try {
        const mensagem = await Mensagens.findByPk(mensagemId);
        if (!mensagem) {
            return res.status(404).json({ erro: 'Mensagem não encontrada' });
        }

        await mensagem.update(req.body);
        res.status(200).json({ mensagem: 'Mensagem atualizada com sucesso', dados: mensagem });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao atualizar a mensagem: ' + error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const deleteId = parseInt(req.params.id);
    try {
        const mensagem = await Mensagens.findByPk(deleteId);
        if (!mensagem) {
            return res.status(404).json({ erro: 'Mensagem não encontrada' });
        }

        await mensagem.destroy();
        res.status(200).json({ mensagem: 'Mensagem deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar a mensagem: ' + error.message });
    }
});

module.exports = router;