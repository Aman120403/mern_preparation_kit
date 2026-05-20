import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/dashboard"  element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
        
    
    </>
  

  )
}

export default App