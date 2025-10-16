import { Routes, Route, Navigate } from 'react-router-dom'
import AuthForm from './components/Form'
import './App.css'
import Land from './Land'

export default function App() {
  return (
    <div className="min-h-screen bg-[#212C42]">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* redireciona raiz */}
        <Route path="/login" element={<AuthForm tipo="login" />} />
        <Route path="/cadastro" element={<AuthForm tipo="cadastro" />} />
        <Route path="/land" element={<Land/>} />
      </Routes>
    </div>
  )
}