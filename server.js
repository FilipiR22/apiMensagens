const express = require('express');
const sequelize = require('./database');
const mensagensRouter = require('./routes/mensagens');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/mensagens', mensagensRouter);

// Sincronizar e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});