import React, { useContext, useEffect } from 'react'
import WorkContext from '../context/WorkContext';
import { NavLink, useNavigate } from 'react-router-dom'




export const UserNav = ({ logOutUser }) => {
    // Context
    const { workData } = useContext(WorkContext);
    const shiftLength = workData.todayShift.duration
    const jobsToday = workData.jobsToday.length

    const navigate = useNavigate();
    const activeLink = ({ isActive }) => {
        return isActive ? { backgroundColor: "#383e44", width: "4rem", height: "4rem" } : {};
    }
    const onClick = () => {
        navigate("/logout");
        logOutUser()
        // navigate("/")
        setTimeout(() => { navigate("/") }, 2000)
    }
    return (
        <nav className="h-[10vh] bg-acent" >
            <ul className='flex h-100% justify-around items-center'>
                {/* logout button */}
                <button onClick={onClick} className="border-2 w-12 h-12 border-secondary rounded-lg  p-1">
                    <img src="https://img.icons8.com/office/80/exit.png" alt="exit" />
                </button>
                {/* PatrolPal */}
                <NavLink
                    to="/user/patrolmate"
                    className="border-2 w-12 h-12 border-secondary rounded-lg  p-1"
                    style={activeLink}
                >
                    <img src="https://img.icons8.com/office/80/learning.png" alt="learning" />
                </NavLink>
                {/* Jobs */}
                <NavLink
                    to="/user/jobs"
                    className="relative border-2 w-12 h-12 border-secondary rounded-lg  p-1"
                    style={activeLink}
                >
                    {jobsToday > 0 && <div className=' absolute w-6 h-6 border-[1px] border-secondary rounded-full bg-[#00E93E] bottom-[80%] left-[80%] text-center'>
                        <p className='font-black text-primaryDark'>{jobsToday}</p>

                    </div>}
                    <img className='' src="https://img.icons8.com/dusk/80/completed-task.png" alt="completed-task" />
                </NavLink>
                {/* Performance */}
                <NavLink
                    to="/user/jps"
                    className="border-2 w-12 h-12 border-secondary rounded-lg  p-1"
                    style={activeLink}
                >
                    <img src="https://img.icons8.com/officel/80/dashboard.png" alt="dashboard" />
                </NavLink>
            </ul>
        </nav>
    )
}






