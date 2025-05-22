import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from   "axios"

function App() {
  
  const [idTarefa, setIdTarefa] = useState('')
  const [tituloTarefa, setTituloTarefa] = useState('')
  const [descricaoTarefa, setDescricaoTarefa] = useState('')
  const [loading, setLoading] = useState(false)
  const [tarefas, setTarefas] = useState([])


  const fetchTarefas = async () => {
    // altera o estado do "loading" para true, para ativar o spinner
    setLoading(true);
    try {
      // realiza o get da rota da api
      const response = await axios.get(`http://localhost:3000/tarefas`)
      console.log(response.data)
      setTarefas(response.data)
      console.log(`tarefas: `,tarefas)
    } catch (error){
      console.error(error)
    }
    finally {
      // altera o estado do "loading" para false, para desativar o spinner
      setLoading(false);
    }
  };
  // Sempre que inicializar a página, rodar essa função
  useEffect(() =>{
    fetchTarefas()
  },[])

  const adicionarTarefa = async () => {
    setLoading(false);
    try{
      const reponse = await axios.post(`http://localhost:3000/tarefas`,{
        titulo_tarefa: tituloTarefa,
        descricao_tarefa: descricaoTarefa
      })

      fetchTarefas();
      setTituloTarefa('');
      setDescricaoTarefa('');
    }
    catch (error){
      console.error('Erro ao adicionar tarefa:', error);
    }
    finally{
      setLoading(false);
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
              <input type="text" 
                    name='titulo'
                    placeholder='Título'
                    className='input-titulo'
                    value={tituloTarefa}
                    onChange={(e) => setTituloTarefa(e.target.value)}
                    required/>
            </div>
            <div className='div-input-descricao'>
              <input type="text" 
                    name='descricao'
                    placeholder='Descrição'
                    className='input-descricao'
                    onChange={(e) => setDescricaoTarefa(e.target.value)}
                    value={descricaoTarefa}
                    required/>
            </div>
        </div>
        <div className='div-btn-adicionar'>
          <button className='btn-adicionar'
                  onClick={adicionarTarefa} >Adicionar</button>
        </div>
      </div>
      <div className='div-tarefas'>
        <div className='div-h1-tarefas'>
          <h2>Minhas Tarefas</h2>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
