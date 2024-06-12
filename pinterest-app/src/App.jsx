import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Routes>
          <Route path='/' element={<Main />}/>
      </Routes>
    </div>
  )
}

export default App
