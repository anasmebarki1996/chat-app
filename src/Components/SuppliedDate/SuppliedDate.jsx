import React, { useState, useEffect } from "react";

const SuppliedDate = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(null);
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

  return (
    <div className="supplied-date-container">
      {selectedDate ? (
        <div className="selected-text">
          you have selected <b>{selectedDate}</b>
        </div>
      ) : (
        <>
          <div className="text"> please pick up a day</div>
          <div className="days-button">
            {suppliedDate.map((item) => (
              <button
                key={item}
                disabled={selectedDate === item}
                onClick={() => setSelectedDate(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SuppliedDate;
