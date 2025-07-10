import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Login from './components/Login'
import Register from './components/Register'
import {Toaster} from 'react-hot-toast'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App