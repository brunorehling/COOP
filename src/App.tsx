import { Routes, Route} from 'react-router-dom'
import './App.css'
import Land from './Land'

import Feed from './Feed'

export default function App() {
  return (
    <div className="min-h-screen bg-[#212C42]">
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/Feed" element={<Feed />} />
      </Routes>
    </div>
  )
}