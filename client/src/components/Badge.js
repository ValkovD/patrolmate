import React from 'react'

const Badge = ({ outcome, data }) => {
    let color;
    if (outcome === "FIX") {
        color = "#00E93E"
        data = "F"
    }
    if (outcome === "TOW") {
        color = '#FB0000'
        data = "R"
    }
    if (outcome === "AUX") {
        color = '#F4C300'
        data = "A"
    }
    if (outcome === "CANCEL") {
        color = "white"
        data = "C"
    }
    return (
        <p style={{ backgroundColor: color }} className='w-6 h-6 border-[1px] border-secondary rounded-full  text-center'>
            <span className='font-black text-primaryDark'>{data}</span>

        </p>
    )
}

export default Badge