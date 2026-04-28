import React from 'react'

export const Navbar = () => {
  return (
    <div className='absolute top-0 w-screen bg-neutral-300 h-auto p-1'>
      <h1 className='text-center font-bold'>Patrol Stocker</h1>
      <div className='flex justify-around font-extralight text-sm'>
        <p className=''>Stock icon</p>
        <p>Performance....</p>
        <p className=''>Easy to use...</p>
      </div>

    </div>

  )
}
