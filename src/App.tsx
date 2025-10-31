import { Routes, Route} from 'react-router-dom'
import './App.css'
import Land from './Land'
import { Login } from './Login'
import { Cadastro } from './Cadastro'
import { CriarProjetos } from './CriarProjetos'
import Feed from './Feed'

import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default function App() {
  return (
    <div className="min-h-screen bg-[#212C42]">
      <Routes>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/publicar" element={<CriarProjetos />} />
        <Route path="/" element={<Land/>} />
      </Routes>
    </div>
  )
}