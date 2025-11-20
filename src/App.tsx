import { Routes, Route } from 'react-router-dom'
import './App.css'
import Land from './Land'
import { Login } from './Login'
import { Cadastro } from './cadastro'
import { CriarProjetos } from './CriarProjetos'
import Feed from './Feed'
import  FeedUser  from './components/meusProjetos/FeedMeusProjetos.tsx'
import { Cabecalho2 } from './components/Cabecalho2'
import { UserProfile } from './components/users/UserLogado/UserProfile.tsx'
import { GestaoProjeto } from './components/meusProjetos/GestãoProjeto.tsx'
import { UserProfileEdit } from './components/users/UserLogado/ProfileEdit.tsx'
import  CreatePortfolio  from './components/users/portifolio/PortifolioCreate.tsx'
import EditarProjeto from './EditarProjeto.tsx'
import { PublicProfile } from './components/users/UserDeslogado/PublicProfile.tsx'

export default function App() {
  const token = localStorage.getItem('token') 

  return (
    <div className="min-h-screen">
      {token && <Cabecalho2 />}
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/publicar" element={<CriarProjetos />} />
        <Route path="/projetos/:id/editar" element={<EditarProjeto />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/perfil/:id" element={<PublicProfile />} />
        <Route path="/meusProjetos" element={<FeedUser />} />
        <Route path="/gestao/:id" element={<GestaoProjeto />} />
        <Route path="/editar_perfil/:id" element={<UserProfileEdit />} />
        <Route path="/criar_portifolio" element={<CreatePortfolio />} />
        <Route path="/" element={<Land />} />
      </Routes>
    </div>
  )
}
