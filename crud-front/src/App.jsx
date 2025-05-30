import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"
import { FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";


function App() {

  const [idTarefa, setIdTarefa] = useState('')
  const [tituloTarefa, setTituloTarefa] = useState('')
  const [descricaoTarefa, setDescricaoTarefa] = useState('')
  const [loading, setLoading] = useState(false)
  const [tarefas, setTarefas] = useState([])
  const [isEdit, setIsEdit] = useState(false);


  const fetchTarefas = async () => {
    // altera o estado do "loading" para true, para ativar o spinner
    setLoading(true);
    try {
      // realiza o get da rota da api
      const response = await axios.get(`http://localhost:3000/tarefas`)
      console.log(response.data)
      setTarefas(response.data)
      console.log(`tarefas: `, tarefas)
    } catch (error) {
      console.error(error)
    }
    finally {
      // altera o estado do "loading" para false, para desativar o spinner
      setLoading(false);
    }
  };
  // Sempre que inicializar a página, rodar essa função
  useEffect(() => {
    fetchTarefas()
  }, [])

  const addTarefa = async () => {
    setLoading(false);
    try {
      const reponse = await axios.post(`http://localhost:3000/tarefas`, {
        titulo_tarefa: tituloTarefa,
        descricao_tarefa: descricaoTarefa
      })

      fetchTarefas();
      setTituloTarefa('');
      setDescricaoTarefa('');
    }
    catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
    finally {
      setLoading(false);
    }

  }

  const handleEdit = async (tarefa) => {
    console.log(tarefa)
    setTituloTarefa(tarefa.titulo_tarefa)
    setIdTarefa(tarefa.id_tarefa)
    setDescricaoTarefa(tarefa.descricao_tarefa)
    setIsEdit(true)
  }

  const editTarefa = async (id) => {

    try {
      const response = await axios.put(`http://localhost:3000/tarefas/${id}`, {
        titulo_tarefa: tituloTarefa,
        descricao_tarefa: descricaoTarefa,
      })

      setIsEdit(false)

      setTituloTarefa(''),
        setDescricaoTarefa('')

      fetchTarefas()

    }

    catch (error) {
      console.error('Erro ao adicionar tarefa', error)
    }
  }

  const deleteTarefa = async (id) => {
    try{
      console.log(id)
      const response = await axios.delete(`http://localhost:3000/tarefas/${id}`)
      fetchTarefas()
    }
    catch(error){
      console.error('Erro ao deletar tarefa', error)
    }
  }


  return (
    <>
      <div className='h1-body'>
        <h1>Anotações de Tarefas</h1>
      </div>
      <div className='div-body'>
        <div className='div-container-main'>
          <div>
          </div>
          <div className='div-inputs'>
            <div className='div-input-titulo'>
              <textarea type="text"
                name='titulo'
                placeholder='Título'
                className='input-titulo'
                value={tituloTarefa}
                onChange={(e) => setTituloTarefa(e.target.value)}
                required />
            </div>
            <div className='div-input-descricao'>
              <textarea type="text"
                name='descricao'
                placeholder='Descrição'
                className='input-descricao'
                onChange={(e) => setDescricaoTarefa(e.target.value)}
                value={descricaoTarefa}
                required />
            </div>
          </div>
          <div className='div-btn-adicionar'>
            {isEdit ? (
              <>
                <button className='btn-adicionar'
                  onClick={() => editTarefa(idTarefa)} >Salvar</button>
              </>
            ) : (<>
              <button className='btn-adicionar'
                onClick={addTarefa} >Adicionar</button>
            </>)}
          </div>
        </div>
        <div className='div-tarefas'>
          <div className='div-h1-tarefas'>
            <h2>Minhas Tarefas</h2>
          </div>
          {loading ? (
            <div></div>
          ) : (
            <>
              <div>
                {tarefas.map((tarefa) => (
                  <div key={tarefa.id_tarefa} className='container-tarefas'>
                    <div className='unq-tarefa'>
                      <p className='tarefa-titulo'>{tarefa.titulo_tarefa}</p>
                      <p className='tarefa-descricao'>{tarefa.descricao_tarefa}</p>
                    </div>
                    <div className='div-delete_edit'>

                      <div>
                        <button onClick={() => deleteTarefa(tarefa.id_tarefa)} className='btn-excluir'>
                          <FaTrashAlt className='icon-trash'/>
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleEdit(tarefa)} className='btn-editar'>
                          <TiPencil className='icon-pencil' />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
          }
        </div>
      </div>
    </>
  )
}

export default App
