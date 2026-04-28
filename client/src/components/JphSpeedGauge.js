import React, { useState, useContext } from 'react'
import WorkContext from '../context/WorkContext';
import { createStringFromDateObject } from '../timeUtils/createStringFromDateObject';
import GaugeComponent from 'react-gauge-component'

export const JphSpeedGauge = () => {
    // Context
    const { workData } = useContext(WorkContext);
    const start = workData.todayShift.start;
    const end = workData.todayShift.endDef;
    // const shiftLength = workData.todayShift.duration
    const jobsToday = workData.jobsToday.length;
    // Time objects from server
    let timeNow = new Date()
    let initShiftStart = new Date(start);
    let initShiftEnd = new Date(end);
    // Calculation of the jps speed 
    let shiftProgHrs = (timeNow.getTime() - initShiftStart.getTime()) / 1000 / 60 / 60;
    let jpsSpeed = jobsToday / shiftProgHrs;
    // Gauge settings
    const bigValue = { style: { fontSize: "20px", fill: "black", fontWeight: "bolder" } };
    const bigLine = { width: 4, length: 10, color: "black", distanceFromArc: 1 };

    const smallValue = { style: { fontSize: "15px", fontFamily: "fantasy", fontWeight: "bolder" } };
    const smallLine = { width: 2, length: 5, color: "black", distanceFromArc: 1 };
    const smallerValue = { style: { fontSize: "10px", fontFamily: "fantasy", fontWeight: "bolder" } };
    const smallerLine = { width: 1, length: 2, color: "black", distanceFromArc: 1 };
    return (
        <>
            <GaugeComponent
                className='h-35%'
                value={jpsSpeed}
                minValue={0}
                maxValue={2}
                type="radial"
                labels={{
                    valueLabel: {
                        matchColorWithArc: true,
                        maxDecimalDigits: 2,
                        style: {
                            fontSize: "44px",
                            fontWeight: "bolder",
                            textShadow: "#564967 3px 1px 0px, #564967 2px 2px 2.5em, #564967 0px 0px 0.2em"
                        }
                    },
                    tickLabels: {
                        type: "inner",
                        ticks: [
                            { value: 0, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 0.25, valueConfig: smallerValue, lineConfig: smallerLine },
                            { value: 0.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 0.75, valueConfig: smallerValue, lineConfig: smallerLine },
                            { value: 1, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 1.25, valueConfig: smallerValue, lineConfig: smallerLine },
                            { value: 1.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 1.75, valueConfig: smallerValue, lineConfig: smallerLine },
                            { value: 2, valueConfig: bigValue, lineConfig: bigLine },
                        ],

                        // defaultTickValueConfig: { style: { fontSize: "22px", fill: "black", fontWeight: "bolder" } }
                    },

                }}

                arc={{
                    colorArray: ['#F4C300', '#00E93E', '#FB0000'],
                    subArcs: [{ limit: 0.75 }, { limit: 1.25 }, { limit: 2 }],
                    cornerRadius: 2,
                    padding: 0,
                    width: 0.12
                }}
                pointer={{
                    color: "#564967",
                    length: 0.55,
                    width: 40,
                    elastic: true,
                    // type: "arrow",
                    animationDuration: 4000
                }}
            />
            <p className='text-xs font-bold'>Jobs per hour</p>
        </>

    )
}
