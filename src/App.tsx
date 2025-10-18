import { Routes, Route} from 'react-router-dom'

import './App.css'
import Land from './Land'
import { Login } from './Login'
import { Cadastro } from './Cadastro'

export default function App() {
  return (
    <div className="min-h-screen bg-[#212C42]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Land/>} />
      </Routes>
    </div>
  )
}