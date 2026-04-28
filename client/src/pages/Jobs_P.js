import React, { useContext, useEffect } from 'react'
import WorkContext from '../context/WorkContext'
import Badge from '../components/Badge';

const Jobs_P = () => {
    // Context
    const { workData } = useContext(WorkContext);
    const jobsToday = workData.jobsToday;
    // useEffect(() => {
    //     console.log(jobsToday.length)
    // })
    return (
        <div className='p-2 w-[100vw] h-[90vh] flex flex-col  items-center'>

            {jobsToday.length >= 1 ? <h2 className="text-primaryDark font-extrabold text-2xl">Jobs Done So Far</h2> : <h2 className="text-primaryDark font-extrabold text-2xl">No jobs yet</h2>}
            <main className='h-100% w-100% overflow-scroll'>
                {jobsToday.map((job, key) => {
                    return <div key={key} className="w-100% p-1 mb-1 bg-acent h-auto border-2 border-secondary rounded-lg ">
                        <div className='flex justify-around items-center'>
                            <section className='flex w-[14%] justify-around'>
                                <p>{key + 1}.</p>
                                <Badge outcome={job.jobOutcome} />
                            </section>
                            <h2>{job.jobOutcome}</h2>
                            <textarea disabled value={job.notes} className='w-60% p-2 bg-acent text-pretty h-95% border-2 border-secondary rounded-lg'></textarea>
                        </div>
                        <section><span>end at : </span><strong>{job.endTime}</strong></section>
                    </div >

                })}
            </main>
        </div>
    )
}

export default Jobs_P