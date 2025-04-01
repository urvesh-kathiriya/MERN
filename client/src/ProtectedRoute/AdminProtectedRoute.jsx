import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/auth'

const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { data } = useContext(AuthContext)
    useEffect(() => {
        if(data){
            if(!data.isAdmin){
                navigate('/')
            }
        }
    }, [data])
    return children ? children : <Outlet />
}

export default AdminProtectedRoute
