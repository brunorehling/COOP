import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Land from './Land.tsx'
import Feed from './Feed.tsx'
import './App.css'
import { Cadastro } from './Cadastro.tsx'
import { Login } from './Login.tsx'
import { CriarProjetos } from './CriarProjetos.tsx'
import axios from 'axios'

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
        <Route path="/" element={<Land />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
