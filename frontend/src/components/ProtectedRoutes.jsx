import React from 'react'
import { isAuthenticatedSelector } from '../atoms/authAtom'
import { useRecoilValue } from 'recoil'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const isauthenticated = useRecoilValue(isAuthenticatedSelector)
    return isauthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoutes