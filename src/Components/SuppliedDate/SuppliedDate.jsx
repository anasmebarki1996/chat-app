import React, { useState, useEffect } from "react";

const SuppliedDate = ({ date }) => {
  // selectedDate to select the day from the supplied dates
  const [selectedDate, setSelectedDate] = useState(null);

  // orderDays is a function to order the array of days
  const orderDays = (date) => {
    // array of days of work
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // selectedDay is to get the index of day received from the socket
    let selectedDay = new Date(date).getDay() - 1;
    const orderedDays = [];
    let i = selectedDay;
    // a loop to order the days
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
            {/* mapping the ordered days */}
            {suppliedDate.map((item) => (
              <button key={item} onClick={() => setSelectedDate(item)}>
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
