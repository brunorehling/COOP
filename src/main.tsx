import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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