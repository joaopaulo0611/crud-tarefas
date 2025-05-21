const { sql } = require('./db.js');

async function criarTabela() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS tarefas (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        descricao TEXT
      )`;
    console.log("Tabela criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}