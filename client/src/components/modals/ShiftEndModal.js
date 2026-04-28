import React, { useContext, useEffect } from 'react'
import WorkContext from '../../context/WorkContext'


const ShiftEndModal = ({ closeShiftEndModal, userData, endShift }) => {
    // Context
    const { workData } = useContext(WorkContext);
    const jobsToday = workData.jobsToday.length


    return (
        // <!-- Main modal -->
        <div className=" w-screen h-screen rounded-lg flex flex-col justify-center items-center text-primaryDark">
            <main className="w-90% h-50% bg-acent border-2 border-secondary rounded-lg flex flex-col justify-around items-center">
                <h2 className="text-primaryDark font-extrabold text-2xl">
                    Are YOU SURE ?
                </h2>
                <p className="text-primaryDark font-extrabold">{`${userData.name} ${userData.surname}`}</p>
                {/* Section outcome==================================== */}
                <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">

                    <p>Closing current shift with</p>
                    <p className='w-6 h-6 border-[1px] border-secondary rounded-full bg-[#00E93E] text-center'>
                        <span className='font-black text-primaryDark'>{jobsToday}</span>

                    </p>
                    <p>jobs done</p>

                </section >

                {/* <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">

                </section> */}

                {/* cancel btn */}
                <button
                    onClick={() => { closeShiftEndModal(); endShift() }}
                    className="w-24 border-2 border-secondary rounded-lg duration-200 ease-in-out active:w-32 active:text-2xl"
                >
                    Yes
                </button>
                {/* Showing btn based on input */}
                <button onClick={() => { closeShiftEndModal() }} type="submit" className="w-64 h-18 btn-gradient shadow-custom text-3xl text-primaryDark font-extrabold border-2 border-secondary p-4 rounded-lg mb-5 duration-200 ease-in-out active:w-32 active:text-2xl">
                    No
                </button>
            </main >
        </div >


    )
}

export default ShiftEndModal