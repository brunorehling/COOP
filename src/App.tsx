import { Routes, Route } from 'react-router-dom'
import './App.css'
import Land from './Land'
import { Login } from './Login'
import { Cadastro } from './cadastro'
import { CriarProjetos } from './CriarProjetos'
import Feed from './Feed'
import  FeedUser  from './components/meusProjetos/FeedMeusProjetos.tsx'
import { Cabecalho2 } from './components/Cabecalho2'
import { UserProfile } from './components/users/UserProfile'
import { GestaoProjeto } from './components/meusProjetos/GestãoProjeto.tsx'

export default function App() {
  const token = localStorage.getItem('token') 

  return (
    <div className="min-h-screen bg-[#212C42]">
      {token && <Cabecalho2 />}
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/publicar" element={<CriarProjetos />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/meusProjetos" element={<FeedUser />} />
        <Route path="/gestao/:id" element={<GestaoProjeto />} />
        <Route path="/" element={<Land />} />
      </Routes>
    </div>
  )
}
