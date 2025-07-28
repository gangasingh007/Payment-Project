import React from 'react'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import Login from './componets/Login'
import Register from './componets/Register'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App