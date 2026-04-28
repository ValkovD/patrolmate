import React, { useEffect, useState, useContext } from "react";
import WorkContext from "../../context/WorkContext";
import { timeString } from "../../timeUtils/timeString";
import { dateString } from "../../timeUtils/dateString";
const initialState = {
    jobOutcome: "",
    notes: ""
}
// ==================================================
const JobSetModal = ({ closeJobModal, submitJob }) => {
    const { getShift } = useContext(WorkContext)

    const [showBtn, setShowBtn] = useState(false);
    const [jobFields, setJobFields] = useState(initialState)
    const handleSelect = (e) => {
        // console.log(e.target.value)
        setJobFields(
            {
                ...jobFields,
                [e.target.name]: e.target.text,
                [e.target.name]: e.target.value,

            }
        )
    }
    // Checking if Outcome has selection
    useEffect(() => {
        if (jobFields.jobOutcome === "Select" || jobFields.jobOutcome === "") {
            setShowBtn(false)
        } else {
            setShowBtn(true)
        }
    }, [jobFields.jobOutcome])
    return (

        // <!-- Main modal -->
        <div className=" w-screen h-screen rounded-lg flex flex-col justify-center items-center text-primaryDark">
            <main className="w-90% h-90% bg-acent border-2 border-secondary rounded-lg flex flex-col justify-around items-center">
                <h2 className="text-primaryDark font-extrabold text-2xl">
                    New Job
                </h2>
                {/* Section outcome==================================== */}
                <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">

                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Outcome</label>
                    <select onChange={handleSelect} name="jobOutcome" id="category" className="w-60% border-2 border-secondary rounded-lg text-3xl text-primaryDark bg-primary font-extrabold">
                        <option>Select</option>
                        <option name="jobOutcome">FIX</option>
                        <option name="jobOutcome">TOW</option>
                        <option name="jobOutcome">AUX</option>
                        <option name="jobOutcome">CANCEL</option>
                        {/* <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option> */}
                    </select>

                </section >
                {/* Section Job Notes==================================== */}
                <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Notes</label>
                    <textarea onChange={handleSelect} name="notes" id="description" className="border-2 border-secondary rounded-lg w-95% h-70% p-2" placeholder="Write job notes here"></textarea>
                </section>

                {/* Showing btn based on input */}
                {showBtn ? <button onClick={() => {
                    submitJob({
                        ...jobFields,
                        endTime: timeString(),
                        date: dateString()
                    }); closeJobModal(); getShift()
                }} type="submit" className="w-64 h-18 btn-gradient shadow-custom text-3xl text-primaryDark font-extrabold border-2 border-secondary p-4 rounded-lg mb-5 duration-200 ease-in-out active:w-32 active:text-2xl">
                    submit
                </button> : null}
                {/* cancel btn */}
                <button
                    onClick={closeJobModal}
                    className="w-24 border-2 border-secondary rounded-lg duration-200 ease-in-out active:w-32 active:text-2xl"
                >
                    cancel
                </button>


            </main >
        </div >



    )
}


export default JobSetModal;


