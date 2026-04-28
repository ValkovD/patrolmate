import React from 'react'
import { useContext, useEffect } from 'react';
import WorkContext from '../context/WorkContext';

import GaugeComponent from 'react-gauge-component'
import Spinner from './Spinner';
// import GaugeComponent from 'react-gauge-component'

export const JpsGauge = () => {
    // Context
    const { workData } = useContext(WorkContext);
    const shiftLength = workData.todayShift.duration
    const jobsToday = workData.jobsToday.length
    // hooks

    const bigValue = { style: { fontSize: "20px", fill: "black", fontWeight: "bolder" } };
    const bigLine = { width: 4, length: 10, color: "black", distanceFromArc: 1 };

    const smallValue = { style: { fontSize: "12px", fontFamily: "fantasy", fontWeight: "bolder" } };
    const smallLine = { width: 2, length: 5, color: "black", distanceFromArc: 1 };

    return (
        <>
            <GaugeComponent
                className='h-35%'
                value={jobsToday / (shiftLength / 7.7)}
                minValue={1}
                maxValue={8}
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
                        type: "outer",
                        ticks: [
                            { value: 1, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 1.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 2, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 2.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 3, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 3.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 4, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 4.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 5, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 5.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 6, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 6.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 7, valueConfig: bigValue, lineConfig: bigLine },
                            { value: 7.5, valueConfig: smallValue, lineConfig: smallLine },
                            { value: 8, valueConfig: bigValue, lineConfig: bigLine }
                        ],
                        // defaultTickValueConfig: { style: { fontSize: "22px", fill: "black", fontWeight: "bolder" } }
                    },

                }}

                arc={{
                    colorArray: ['#F4C300', '#00E93E', '#FB0000'],
                    subArcs: [{ limit: 5 }, { limit: 7 }, { limit: 8 }],
                    cornerRadius: 2,
                    padding: 0,
                    width: 0.12
                }}
                pointer={{
                    color: "#564967",
                    length: 0.9,
                    width: 30,
                    // elastic: true,
                    animationDuration: 4000
                }}
            />
            <p className='text-xs font-bold'>Jobs per shift</p>
        </>


    )
}
