import React from 'react'
import Spinner from '../components/Spinner'

export const Logout_P = () => {
    return (
        <div className='flex items-center justify-center text-center'>
            <Spinner />
            <p className='text-3xl text-primaryDark font-extrabold absolute top-40 inset-x-12 grid justify-items-center  '>See you soon again Bye Bye</p>
        </div>
    )
}
