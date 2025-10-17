import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Land from './Land.tsx'
import Feed from './Feed.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/Feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)