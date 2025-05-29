import { sql } from './db.js';


// classe que atua como service do backend onde ficam as funções para os controladores
export default class DatabaseTarefas { 

   // função de listar musicas
   async listTarefas() {
      return await sql`SELECT * FROM Tarefas ORDER BY id_tarefa ASC`;
  }

  // função de criar musicas, passando musica como um parametro
  async createTarefa(tarefa) {

   // cria as variaveis para utilizar em um script sql 
    const titulo_tarefa = tarefa.titulo_tarefa;
    const descricao_tarefa = tarefa.descricao_tarefa;

    // script sql para inserir a musica na tabela Musica
    await sql`INSERT INTO Tarefas( titulo_tarefa, descricao_tarefa) 
              values ( ${titulo_tarefa}, ${descricao_tarefa})`;
  }

  // função de atualizar musica, passando o id e musica como parametro
  async updateTarefa(id, tarefa) {
   
    const titulo_tarefa = tarefa.titulo_tarefa;
    const descricao_tarefa = tarefa.descricao_tarefa;

// script sql para atualizar a musica na tabela Musica onde o id é o mesmo id passado como parametro
     await sql`UPDATE Tarefas SET
      titulo_tarefa = ${titulo_tarefa},
      descricao_tarefa = ${descricao_tarefa}
      where id_tarefa = ${id} 
     `;
  }


  // funçãp de deletar a musica, passando o id como parametro
  async deleteTarefa(id) {
   // script sql para deletar a musica onde o id é igual ao id passado como parametro
     await sql`DELETE FROM Tarefas WHERE id_tarefa = ${id}`
  }

}