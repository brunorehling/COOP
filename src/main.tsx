// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Feed from './Feed.tsx'
import { Login } from './Login.tsx'
import { Cadastro } from './cadastro.tsx'
import EditarProjeto from './EditarProjeto.tsx'
import { CriarProjetos } from './CriarProjetos.tsx'
import { UserProfile } from './components/users/UserLogado/UserProfile.tsx'
import { PublicProfile } from './components/users/UserDeslogado/PublicProfile.tsx'
import FeedUser from './components/meusProjetos/FeedMeusProjetos.tsx'
import { UserProfileEdit } from './components/users/UserLogado/ProfileEdit.tsx'
import { GestaoProjeto } from './components/meusProjetos/GestãoProjeto.tsx'
import CreatePortfolio from './components/users/portifolio/PortifolioCreate.tsx'
import Land from './Land.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
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
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)