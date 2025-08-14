import { sql } from './db.js';


export default class DatabaseTarefas { 

   async listTarefas() {
      return await sql`SELECT * FROM Tarefas ORDER BY id_tarefa ASC`;
  }

  async createTarefa(tarefa) {

    const titulo_tarefa = tarefa.titulo_tarefa;
    const descricao_tarefa = tarefa.descricao_tarefa;

    await sql`INSERT INTO Tarefas( titulo_tarefa, descricao_tarefa) 
              values ( ${titulo_tarefa}, ${descricao_tarefa})`;
  }

  async updateTarefa(id, tarefa) {
   
    const titulo_tarefa = tarefa.titulo_tarefa;
    const descricao_tarefa = tarefa.descricao_tarefa;

     await sql`UPDATE Tarefas SET
      titulo_tarefa = ${titulo_tarefa},
      descricao_tarefa = ${descricao_tarefa}
      where id_tarefa = ${id} 
     `;
  }


  async deleteTarefa(id) {
     await sql`DELETE FROM Tarefas WHERE id_tarefa = ${id}`
  }

}
