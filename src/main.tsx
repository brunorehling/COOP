import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import Land from './Land.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Land />
  </StrictMode>,
)
=======
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <div className="min-h-screen bg-fundo">
    <StrictMode>
      <BrowserRouter>
        <App />
        <Footer/>
      </BrowserRouter>
    </StrictMode>
  </div>
)
>>>>>>> origin/feat/TelaCadastro
