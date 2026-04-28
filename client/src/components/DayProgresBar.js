import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import WorkContext from '../context/WorkContext'
import ProgressBar from '@ramonak/react-progress-bar'
import vanIcon from "../icons/van-50.png"
import { createStringFromDateObject } from '../timeUtils/createStringFromDateObject'

export const DayProgresBar = () => {
    // Context
    const { workData } = useContext(WorkContext);
    const start = workData.todayShift.start;
    const end = workData.todayShift.endDef;
    const shiftLength = workData.todayShift.duration
    // these need to be dynamic inputs when shift is inserted by user an persisted straifgt to DB as date objects thes obj can not be stored in state

    // Time objects from server
    let timeNow = new Date()
    let initShiftStart = new Date(start);
    let initShiftEnd = new Date(end);

    let initShiftStartString = createStringFromDateObject(initShiftStart);
    let initShiftEndString = createStringFromDateObject(initShiftEnd)

    // ==============================================================
    const [curTime, setCurTime] = useState("calculating ...")
    const [shiftStart, setShiftStart] = useState("10:00")
    const [shift, setShift] = useState("11")
    const [shiftEnd, setShiftEnd] = useState("09:00")
    // ==================================
    useEffect(() => {
        const interval = setInterval(() => {
            setCurTime(timeNow.toLocaleTimeString('en-GB'));
        }, 1000);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [curTime])
    // ===================================
    // useEffect(() => {
    //     let newShiftStart = new Date('Jan 15 ,2025,09:00:00')
    //     // let time = 
    //     setShiftStart(newShiftStart.toLocaleString('en-GB'))
    //     console.log(newShiftStart.getTime())
    // }, [])
    // ==================================
    let shiftProgHrs = (timeNow.getTime() - initShiftStart.getTime()) / 1000 / 60 / 60;
    let shiftProgMin = (timeNow.getTime() - initShiftStart.getTime()) / 1000 / 60;
    let shiftMin = (initShiftEnd.getTime() - initShiftStart.getTime()) / 1000 / 60;
    let test = shiftProgMin / (shiftMin / 100)
    let shiftProgress = test.toFixed();

    return (<>{shiftLength && <div className='w-screen mb-2 flex justify-around flex-col justify-center items-center'>
        <div className='w-screen flex justify-between px-4'>
            {/* shift start | sift lenth | shoft end */}
            <span>{initShiftStartString}</span>
            <span>{shiftLength} hrs</span>
            <span>{initShiftEndString}</span>

        </div>
        <div className="w-90% h-8 mx-4">
            {/* Van Icon */}
            <img src={vanIcon} className="w-9 h-8 ease-in-out animate-wiggle" style={{ marginLeft: `${shiftProgress > 10 && shiftProgress - 12}%` }} />
        </div>
        <ProgressBar
            className='w-90%'
            height='15px'
            bgColor='#383e44'
            transitionDuration="1s"
            animateOnRender={true}
            labelSize='12px'
            borderRadius='5px'
            completed={shiftProgress}
            maxCompleted={100}
        />
        {/* <h2>{curTime}</h2> */}
        {/* <h2>{shiftProgHrs.toFixed(2)}<span> hrs</span></h2>
        <h2>{shiftProgMin.toFixed()}<span> min</span></h2> */}
    </div>}

    </>
    )
}




