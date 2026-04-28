import React from "react";
import { useState, useContext } from "react";
import WorkContext from "../context/WorkContext";
import { DayProgresBar } from "../components/DayProgresBar";
import { JpsGauge } from "../components/JpsGauge";
import { JphSpeedGauge } from "../components/JphSpeedGauge";
import { ShiftSetModal } from "../components/modals/ShiftSetModal";
import JobSetModal from "../components/modals/JobSetModal";
import ShiftEndModal from "../components/modals/ShiftEndModal";
import Spinner from "../components/Spinner";


const JobsPerShift_P = ({ submitShift, submitJob, userData, endShift, loading, serverErrors }) => {

  // Context
  const { workData } = useContext(WorkContext);
  const shiftLength = workData.todayShift.duration

  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isShiftEndModalOpen, setIsShiftEndModalOpen] = useState(false);

  const openShiftModal = () => {
    setTimeout(() => {
      setIsShiftModalOpen(true);
    }, 400);
  };
  const closeShiftModal = () => {
    setTimeout(() => {
      setIsShiftModalOpen(false);
    }, 400);
  };

  const openJobModal = () => {
    setTimeout(() => {
      setIsJobModalOpen(true);
    }, 400);
  };
  const closeJobModal = () => {
    setTimeout(() => {
      setIsJobModalOpen(false);
    }, 400);
  };

  const openShiftEndModal = () => {
    setTimeout(() => {
      setIsShiftEndModalOpen(true);
    }, 400);
  };
  const closeShiftEndModal = () => {
    setTimeout(() => {
      setIsShiftEndModalOpen(false);
    }, 400);
  };
  return (
    <div className="flex relative flex-col justify-center items-center h-100%">
      {serverErrors && <p className="text-primaryDark text-center text-2xl font-extrabold text-red-700">{serverErrors.msg}</p>}
      <p className='text-2xl text-primaryDark font-extrabold'>{`${userData.name} ${userData.surname}`}</p>

      {/* JobsPerShift */}
      {/* Day Progress Bar */}
      <DayProgresBar />

      {/* Jobs Per Shift Gauge */}

      {loading && <Spinner />}
      {!loading & !shiftLength && <p className='text-xl text-secondary font-semibold'>No LIVE shift</p>}
      {shiftLength && !loading && <JpsGauge />}


      {/* Speed jobs per hour */}

      {loading && <Spinner />}
      {/* {!loading & !shiftLength && <h2>No shift</h2>} */}
      {shiftLength && !loading && <JphSpeedGauge />}


      {/* new Job btn in the bottom right corner */}

      {shiftLength && <button
        onClick={openJobModal}
        className="absolute bottom-2 right-2 btn-gradient text-center text-primaryDark font-extrabold border-2 border-secondary w-20 h-20 rounded-full p-2 duration-200 ease-in-out active:w-32 active:h-32 active:text-2xl">
        NEW JOB
      </button>}

      {/* <p>{`${userData.name} ${userData.surname}`}</p> */}
      {!shiftLength ? <button
        onClick={openShiftModal}
        className="absolute bottom-2 left-2 btn-gradient text-center text-primaryDark font-extrabold border-2 border-secondary w-20 h-20 rounded-full p-2 duration-200 ease-in-out active:w-32 active:h-32 active:text-2xl"
      >
        START SHIFT
      </button> : <button
        onClick={openShiftEndModal}
        className="absolute bottom-2 left-2 btn-gradient text-center text-primaryDark font-extrabold border-2 border-secondary w-20 h-20 rounded-full p-2 duration-200 ease-in-out active:w-32 active:h-32 active:text-2xl"
      >
        END SHIFT
      </button>}

      {isShiftModalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50">
          <ShiftSetModal closeShiftModal={closeShiftModal} submitShift={submitShift} userData={userData} />
        </div>
      )}

      {isShiftEndModalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50">
          <ShiftEndModal closeShiftEndModal={closeShiftEndModal} endShift={endShift} userData={userData} />
        </div>
      )}

      {isJobModalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50">
          <JobSetModal closeJobModal={closeJobModal} submitShift={submitShift} submitJob={submitJob} />
        </div>
      )}
    </div>
  );
};
export default JobsPerShift_P;