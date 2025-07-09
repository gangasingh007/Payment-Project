import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import Loader from './Loader';
import { useState } from'react';
import axios from 'axios';
import toast from'react-hot-toast';

const Login = () => {
    const [auth, setauth] = useRecoilState(authAtom)
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            const token = res.data;
            setauth({ token });
            localStorage.setItem("token", token);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        }
        finally {
            setloading(false);
        }
    }
  return (
    <>
        {!loading ?  <div className='login-container'>
            <div className="form">
                <h2>Login</h2>
                <div className="email">
                    <input
                        type="text"
                        placeholder='Username'
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div className="password">
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div className="btn">
                    <button onClick={handlesubmit}>Login Now</button>
                </div>
                <p>Need an Account ?<a href="/register"><span>Resgiter</span></a></p>
            </div>
        </div> : <Loader />}
       </>
  )
}

export default Login