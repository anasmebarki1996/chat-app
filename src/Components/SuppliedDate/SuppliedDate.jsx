import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const SuppliedDate = ({ date }) => {
  const orderDays = (date) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let selectedDay = new Date(date).getDay() - 1;
    const orderedDays = [];
    let i = selectedDay;
    while (i < 5 && orderedDays.length < 5) {
      orderedDays.push(days[i]);
      if (i === 4) i = 0;
      else i++;
    }
    return orderedDays;
  };

  const [suppliedDate, setSuppliedDate] = useState([]);

  useEffect(() => {
    setSuppliedDate(orderDays(date));
  }, []);

  console.log(suppliedDate);

  return (
    <div>
      {suppliedDate.map((item) => (
        <button>{item}</button>
      ))}
      <div className=""> please choose a day</div>
    </div>
  );
};

export default SuppliedDate;
