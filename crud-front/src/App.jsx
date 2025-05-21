import './App.css'

function App() {
  

  return (
    <>
    <div>
      <div>
        <input type="text" 
               name='titulo'
               placeholder='Título'
               className='input-titulo'
               required/>
        <input type="text" 
               name='descricao'
               placeholder='Descrição'
               className='input-titulo'
               required/>
        </div>
      <button>Adicionar</button>
    </div>
    </>
  )
}

export default App
