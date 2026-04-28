import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate, Navigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
import { useEffect } from 'react';

export const UserHome_P = ({ isLogedIn }) => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isLogedIn) {
    //         navigate("/login")
    //     }
    // }, [isLogedIn])

    return (
        <>
            {!isLogedIn ? <Navigate to="/login" /> : <></>}
            <div className='absolute top-40 inset-x-12 grid justify-items-center'>User HomePage
                <Outlet />
            </div>

        </>


    )
}


{/* <>
{!isLogedIn ? <Navigate to="/login" /> : <div className='absolute top-40 inset-x-12 grid justify-items-center'>User HomePage
    <Outlet />
</div>}
</> */}