import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Land from './Land.tsx'
import Feed from './Feed.tsx'
import './App.css'
import { Cadastro } from './cadastro.tsx'
import { Login } from './Login.tsx'
import  FeedUser  from './components/meusProjetos/FeedMeusProjetos.tsx'
import { CriarProjetos } from './CriarProjetos.tsx'
import  EditarProjeto  from './EditarProjeto.tsx'
import { GestaoProjeto } from './components/meusProjetos/GestãoProjeto.tsx'
import { UserProfile } from './components/users/UserProfile.tsx'
import {CreatePortfolio} from './components/users/portifolio/PortifolioCreate.tsx'
import axios from 'axios'
import { UserProfileEdit } from './components/users/ProfileEdit.tsx'

axios.defaults.baseURL = import.meta.env.DEV ? '/' : 'https://projeto-api-7h8d.onrender.com'


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/publicar" element={<CriarProjetos />} />
        <Route path="/projetos/:id/editar" element={<EditarProjeto />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/meus_projetos" element={<FeedUser />} />
        <Route path="/gestao/:id" element={<GestaoProjeto />} />
        <Route path="/editar_perfil/:id" element={<UserProfileEdit />} />
        <Route path="/criar_portifolio" element={<CreatePortfolio />} />
        <Route path="/" element={<Land />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
