import React, { useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { authAtom } from '../atoms/authAtom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Register = () => {
    const [auth, setauth] = useRecoilState(authAtom)
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName: firstname,
                lastName: lastname,
                username,
                password
            })
            const token = res.data;
            setauth({ token });
            localStorage.setItem("token", token);
            toast.success("Registration successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Registration failed");
        }
        finally {
            setloading(false);
        }
    }

    return (
       <>
        {!loading ?  <div className='register-container'>
            <div className="form">
                <h2>Register</h2>
                <div className="name-container">
                    <input
                        type="text"
                        placeholder='First Name'
                        onChange={(e) => setfirstname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Last Name'
                        onChange={(e) => setlastname(e.target.value)}
                    />
                </div>
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
                    <button onClick={handlesubmit}>Register Now</button>
                </div>
                <p>Already Have an account ?<a href="/login"><span>Login</span></a></p>
            </div>
        </div> : <Loader />}
       </>
    )
}

export default Register