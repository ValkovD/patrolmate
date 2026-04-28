import React from 'react'
import { Navigate } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
// import { RegFormTEST } from '../components/RegFormTEST'

export const Register_P = ({ registerUser, userData, errorData, loading }) => {
    return (
        <div className='h-full '>
            {userData.isLogedIn === "" && <h1>Loading........</h1>}
            {userData.isLogedIn === false && <RegisterForm registerUser={registerUser} loading={loading} />}
            {/* {userData.isLogedIn === false && <RegFormTEST />} */}

            {userData.isLogedIn === true && <Navigate to="/user/jps" />}

        </div>
    )
}
