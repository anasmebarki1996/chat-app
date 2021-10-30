import React, { useState } from "react";

const Rate = () => {
  const [rate, setRate] = useState(0);

  const StarsComponent = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // we should have 5 stars so the loop is to create 5 stars
      stars.push(
        <img
          key={i}
          src={i <= rate ? "assets/star_gold.png" : "assets/star.png"}
          width="20"
          height="20"
          alt="star"
          onClick={() => (rate ? {} : setRate(i))}
          className={rate ? "disable" : "active"}
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
