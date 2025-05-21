const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { sql } = require('./db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', async (req, res) => {
    try {
        const tarefas = await sql`SELECT * FROM tarefas`;
        res.json(tarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
});

app.listen(3000, () => {
    console.log("Rodando na porta 3000");
});
