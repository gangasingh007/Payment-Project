import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Login from './components/Login'
import Register from './components/Register'
import {Toaster} from 'react-hot-toast'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Transfer from './components/Transfer'

const App = () => {
  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      </Router>
    </>
  )
}

export default App