import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Land from './Land.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Land />
  </StrictMode>,
)
