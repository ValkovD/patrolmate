import React, { useEffect } from "react";
// Component taht returns the dropdown hours menu and works diffrent
// baset on the use prop for the start or end of the shift sets diffrent state
import { createDateFromTimeString } from "./createDateFromTimeString";
import { createStringFromDateObject } from "./createStringFromDateObject";
const TimeDropdown = ({
  use,
  shiftStart,
  setShiftStart,
  shiftEnd,
  setShiftEnd,
}) => {
  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hours = String(Math.floor(i / 4)).padStart(2, "0");
    const minutes = String((i % 4) * 15).padStart(2, "0");
    return `${hours}:${minutes}`;
  });
  // ========================================
  // Time optionsend will get what the shift start time is and
  // will ad 12hrs to it then it will return string time array 
  // with the times 12hrs after the shift start
  // ''''''''''''''''EXPERIMENTAL
  // const timeOptionsEnd = (startTime) => {
  //   let endTimeOptionsArr = []
  //   return (
  //     endTimeOptionsArr = timeOptions.slice(timeOptions.indexOf(createStringFromDateObject(startTime)) + 1).slice(0, 48)
  //   )
  // }
  // useEffect(() => {
  //   console.log("shiftStart", shiftStart,
  //     timeOptionsEnd(shiftStart)
  //   )
  // })
  // useEffect(() => { timeOptionsEnd(shiftStart) }, [shiftStart])
  // =========================================
  if (use === "start") {
    return (
      <select
        className="w-28 border-2 border-secondary rounded-lg text-3xl text-primaryDark bg-primary font-extrabold"
        onChange={(e) =>
          setShiftStart(createDateFromTimeString(e.target.value))
        }
      >
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    );
  }
  if (use === "end") {
    return (
      <select
        className="w-28 border-2 border-secondary rounded-lg text-3xl text-primaryDark bg-primary font-extrabold"
        onChange={(e) => setShiftEnd(createDateFromTimeString(e.target.value))}
      >
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    );
  }
};

export default TimeDropdown;
