import React from 'react'
import { LoginForm } from '../components/LoginForm'
import { useNavigate, Navigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
import { useEffect } from 'react';

export const Login_P = ({ loginUser, userData, loading, serverErrors }) => {
    return (
        <div className='h-full'>
            {/* {userData.isLogedIn === "" && <h1>Loading........</h1>} */}
            {userData.isLogedIn === false && <LoginForm loginUser={loginUser} loading={loading} serverErrors={serverErrors} />}
            {userData.isLogedIn === true && <Navigate to="/user/jps" />}
        </div>
    )
}
