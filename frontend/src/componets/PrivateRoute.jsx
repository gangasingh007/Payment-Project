import React from 'react'
import { useRecoilValue } from 'recoil'
import { authSelector } from '../atoms/userAuthAtom'
import {useNavigate} from "react-router-dom"

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  
  const isAuthenticated = useRecoilValue(authSelector);
  return isAuthenticated ? children : navigate("/login");
};    

export default PrivateRoute