const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(express.json()); // Permite receber JSON no body

// Caminho para o arquivo JSON que armazenará as mensagens
const dbFile = path.join(__dirname, 'mensagens.json');

// Função para ler o banco de dados do arquivo JSON
const lerBancoDeDados = async () => {
    try {
        const data = await fs.readJson(dbFile);
        return data;
    } catch (err) {
        return []; // Retorna um array vazio caso o arquivo não exista
    }
};

// Função para salvar as mensagens no arquivo JSON
const salvarBancoDeDados = async (mensagens) => {
    await fs.writeJson(dbFile, mensagens);
};

// [CREATE] Criar uma nova mensagem
app.post('/mensagens', async (req, res) => {
    const { conteudo } = req.body;
    const mensagens = await lerBancoDeDados();
    const novaMensagem = { id: mensagens.length + 1, conteudo };

    mensagens.push(novaMensagem);
    await salvarBancoDeDados(mensagens);

    res.status(201).json(novaMensagem);
});

// [READ - ALL] Listar todas as mensagens
app.get('/mensagens', async (req, res) => {
    const mensagens = await lerBancoDeDados();
    res.json(mensagens);
});

// [READ - ONE] Obter uma mensagem por ID
app.get('/mensagens/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const mensagens = await lerBancoDeDados();
    const mensagem = mensagens.find(m => m.id === id);

    if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }

    res.json(mensagem);
});

// [UPDATE] Atualizar o conteúdo de uma mensagem
app.put('/mensagens/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { conteudo } = req.body;
    const mensagens = await lerBancoDeDados();
    const mensagem = mensagens.find(m => m.id === id);

    if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }

    mensagem.conteudo = conteudo;
    await salvarBancoDeDados(mensagens);

    res.json(mensagem);
});

// [DELETE] Deletar uma mensagem por ID
app.delete('/mensagens/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const mensagens = await lerBancoDeDados();
    const index = mensagens.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }

    mensagens.splice(index, 1);
    await salvarBancoDeDados(mensagens);

    res.status(204).send(); // No Content
});

// Subir o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});