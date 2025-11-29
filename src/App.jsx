import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import DBPage from './pages/DBPage'
import SingleStock from './pages/SingleStock'
import Header from './components/Header'
 

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className='m-6' >
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={'/dashboard'} />} />
        <Route path="/dashboard" element={<DBPage />} />
        <Route path="/stock/:symbol" element={<SingleStock />} />


      </Routes>
    </div>
  )
}

export default App
