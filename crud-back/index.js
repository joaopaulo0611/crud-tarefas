
import express from 'express';
import cors from 'cors';
import DatabaseTarefas  from './database-postgres.js';

const app = express();

const database = new DatabaseTarefas();

app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.listen(3000, () => {
     console.log('Servidor rodando na porta 3000');
});


app.get("/", (req, res) => {
     return res.send("teste");
});

app.post('/tarefas', async (req, res) => {
     try {
          const body = req.body;
          await database.createTarefa(body);
          res.status(201).send("Tarefa criada com sucesso!");
     } catch (error) {
          console.error("Erro ao criar tarefa!", error);
          res.status(500).send("Erro ao criar tarefa.");
     }
});


app.get('/tarefas', async (req, res) => {
     try {
          const tarefas = await database.listTarefas();
          res.status(200).json(tarefas);
     } catch (error) {
          console.error("Erro ao buscar tarefa!", error);
          res.status(500).send("Erro ao buscar tarefa.");
     }
});


app.delete("/tarefas/:id", async (req, res) => {
     try {
          const tarefaId = req.params.id;
          console.log(tarefaId);
          await database.deleteTarefa(tarefaId);
          res.status(200).send("Tarefa deletada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao deletar Tarefa!", error);
               res.status(500).send("Erro ao deletar Tarefa.");
          }
     }
});


app.put('/tarefas/:id', async (req, res) => {
     try {
          const id_tarefa = req.params.id;
          const { titulo_tarefa, descricao_tarefa } = req.body;

          const alteracoes = {
               titulo_tarefa,
               descricao_tarefa,
          };

          console.log('Atualizando tarefa:', alteracoes, id_tarefa);
          await database.updateTarefa(id_tarefa, alteracoes);
          res.status(200).send("Tarefa atualizada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao atualizar tarefa!", error);
               res.status(500).send("Erro ao atualizar tarefa.");
          }
     }
});
