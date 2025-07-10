import React from 'react'
import {User}from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='nav-container'>
            <div className="left-side">
                PayFlow
            </div>
            <div className="right-side">
                <div className="profile-icon">
                    <User 
                    size={30}
                    onClick={()=>{navigate("/profile")}} 
                    ></User>
                </div>
            </div>
    </div>
  )
}

export default Navbar