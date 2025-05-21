const express = require('express');
const { sql } = require('./db');
const routes = express.Router();

// CREATE Tarefa
routes.post('/', async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        const novaTarefa = await sql`
            INSERT INTO tarefas (titulo, descricao)
            VALUES (${titulo}, ${descricao})
            RETURNING *`;
        res.status(201).json(novaTarefa[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar tarefa' });
    }
});

// READ Tarefa específica
routes.get('/tarefas', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await sql`SELECT * FROM tarefas WHERE id = ${id}`;
        if (tarefa.length === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.json(tarefa[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tarefa' });
    }
});

// UPDATE Tarefa
routes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    try {
        const tarefaAtualizada = await sql`
            UPDATE tarefas
            SET titulo = ${titulo}, descricao = ${descricao}
            WHERE id = ${id}
            RETURNING *`;
        if (tarefaAtualizada.length === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada para atualizar' });
        }
        res.json(tarefaAtualizada[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
});

// DELETE Tarefa
routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefaDeletada = await sql`
            DELETE FROM tarefas
            WHERE id = ${id}
            RETURNING *`;
        if (tarefaDeletada.length === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada para deletar' });
        }
        res.json({ mensagem: 'Tarefa deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
});

module.exports = routes;
