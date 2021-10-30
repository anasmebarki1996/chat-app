import React, { useState } from "react";

const Rate = () => {
  const [rate, setRate] = useState(0);

  const StarsComponent = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rate ? "assets/star_gold.png" : "assets/star.png"}
          width="20"
          height="20"
          alt="star"
          onClick={() => setRate(i)}
        />
      );
    }

    return stars;
  };

  return (
    <div className="stars-container">
      <div>{rate === 0 && "please rate our conversation"}</div>
      <div className="stars-component">
        <StarsComponent />
        {rate > 0 && <div>&nbsp; {rate}/5</div>}
      </div>
    </div>
  );
};

export default Rate;
