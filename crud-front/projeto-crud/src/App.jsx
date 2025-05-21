import './App.css'

function App() {
  

  return (
    <>
    <div>
      <input type="text" 
             name='titulo'
             placeholder='Título'
             required/>
      <input type="text" 
             name='descricao'
             placeholder='Descrição'
             required/>
      <button>Adicionar</button>
    </div>
    </>
  )
}

export default App
