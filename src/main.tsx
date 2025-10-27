import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Land from './Land.tsx'
import Feed from './Feed.tsx'
import './App.css'
import { Cadastro } from './cadastro'
import { Login } from './Login.tsx'
import { CriarProjetos } from './CriarProjetos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/publicar" element={<CriarProjetos />} />
        <Route path="/" element={<Land/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,

)



