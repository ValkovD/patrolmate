import { useState, useEffect } from "react";
import React from "react";
import TimeDropdown from "../../timeUtils/TimeDropdown";
// import { calculateTimeString } from "../../timeUtils/calculateTimeString";
import { createStringFromDateObject } from "../../timeUtils/createStringFromDateObject";
import { today } from "../../timeUtils/today";
import { tomorrow } from "../../timeUtils/tomorrow";
import { addOneDay } from "../../timeUtils/addOneDay";
import { dateString } from "../../timeUtils/dateString";


export const ShiftSetModal = ({ closeShiftModal, submitShift, userData }) => {
  const [shiftStart, setShiftStart] = useState("--:--");
  const [shiftEnd, setShiftEnd] = useState("--:--");
  const [shiftSize, setShiftSize] = useState("--:--");
  useEffect(() => {
    // calculate shift length
    let shiftLength = ((shiftEnd - shiftStart) / 1000 / 60 / 60).toFixed(2);
    setShiftSize(shiftLength);
  }, [shiftEnd, shiftStart]);

  return (
    <div className="w-screen h-screen rounded-lg flex flex-col justify-center items-center text-primaryDark">
      <main className="w-90% h-90% bg-acent border-2 border-secondary rounded-lg flex flex-col justify-around items-center">
        <h2 className="text-primaryDark font-extrabold text-2xl">
          Shift Settings
        </h2>
        {/* section start =================================================*/}
        <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">
          <h3>Start {today()}</h3>

          <div className="h-50% w-100% p-2  flex justify-around">
            <button
              className="w-24 p-4 btn-gradient shadow-custom border-2 border-secondary rounded-lg text-xl font-extrabold duration-200 ease-in-out active:w-32 active:text-2xl"
              onClick={() => {
                setShiftStart(new Date());
              }}
            >
              START now
            </button>
            <TimeDropdown use="start" setShiftStart={setShiftStart} />
          </div>
        </section>
        {/* section end ====================================================*/}
        <section className="w-95% h-30% border-2 border-secondary rounded-lg flex flex-col justify-center items-center">
          <h3>End {today()}</h3>
          <p>or press tomorrow button</p>
          <div className="h-50% w-100% p-2 flex justify-around">
            <button
              onClick={() => {
                setShiftEnd(addOneDay(shiftEnd));
              }}
              className="w-28 border-2 border-secondary rounded-lg focus:bg-primaryDark focus:text-acent focus:text-xl focus:font-extrabold focus:w-32"
            >
              {tomorrow()}
            </button>
            <TimeDropdown
              className="w-24 border-2 border-secondary rounded-lg"
              use="end"
              setShiftEnd={setShiftEnd} shiftStart={shiftStart}
            />
          </div>
        </section>
        {/* section result =======================================================*/}
        <section className="w-95% h-10% border-2 border-secondary rounded-lg flex-row justify-center items-center  text-center text-primaryDark">
          <div>{`${shiftSize} hrs`}</div>
          <div className="text-xl font-extrabold ">
            {createStringFromDateObject(shiftStart)} to{" "}
            {createStringFromDateObject(shiftEnd)}
          </div>
        </section>
        {/* section buttons */}
        <section className="flex flex-col justify-center items-center">
          {/*  */}

          {(shiftSize > 0) & (shiftSize <= 12) ? (
            <button
              onClick={() => {
                // console.log("submit");
                submitShift({
                  date: dateString(),
                  start: shiftStart,
                  endDef: shiftEnd,
                  endActual: shiftEnd,
                  runningNow: true,
                  duration: shiftSize,
                  ownerId: localStorage.getItem("token"),
                  ownerName: userData.name,
                  ownerSurname: userData.surname
                });
                closeShiftModal();
              }}
              className="w-64 h-18 btn-gradient shadow-custom text-3xl text-primaryDark font-extrabold border-2 border-secondary p-4 rounded-lg mb-5 duration-200 ease-in-out active:w-32 active:text-2xl"
            >
              submit
            </button>
          ) : (
            <div className="bg-red-500 text-white p-2 mb-4 mx-2 text-center rounded-lg">
              FIRST set start time. Then END time <br /> If shift ends AT or
              after 00:00 CLICK tomorrow button
            </div>
          )}
          {/* cancel btn */}
          <button
            onClick={closeShiftModal}
            className="w-24 border-2 border-secondary rounded-lg duration-200 ease-in-out active:w-32 active:text-2xl"
          >
            cancel
          </button>
        </section>
      </main>
    </div>
  );
};
