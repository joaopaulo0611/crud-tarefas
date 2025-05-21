import { sql } from './db.js'

// código em sql da tabela Musicas
sql`
    CREATE TABLE Tarefas(
        id_tarefa SERIAL PRIMARY KEY NOT NULL,
        titulo_tarefa VARCHAR(255) NOT NULL,
        descricao_tarefa VARCHAR(255) NOT NULL
    );
`
.then(() =>{
    console.log("tabela criada");
})