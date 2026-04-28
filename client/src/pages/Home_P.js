import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'


export const Home_P = ({ userData }) => {
    return (
        userData.isLogedIn ? <Navigate to="/user/jps" /> : (
            <main className='h-full w-full flex flex-col' >
                <div className='bg-acent border-b-[1px] border-black text-xs flex justify-around flex px-1'>
                    <p>created from <strong>P</strong>atrol for patrol<strong>S</strong> </p>
                    <p className='font-bold'>Deyan Valkov 2024&copy;</p>
                </div>
                {/* header is 80% of the screen */}
                <header className='h-4/5 flex flex-col justify-center items-center'>
                    {/* <p>Welcome to</p> */}
                    <h1 className='text-5xl text-primaryDark font-extrabold'>Patrol Mate</h1>
                    <p className='text-xl text-secondary font-semibold'>Helps YOU Every Day</p>
                </header>

                <nav className='h-1/5 flex items-center justify-around'>
                    <NavLink to="/register" className="border-b-2 text-acent text-xl border-acent">Register</NavLink>
                    <NavLink to="/login" className="text-3xl text-primaryDark btn-gradient shadow-custom font-extrabold border-2 border-secondary p-4 rounded-lg">Login</NavLink>
                </nav>
            </main>
        )
    )
}
