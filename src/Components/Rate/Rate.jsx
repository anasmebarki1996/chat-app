import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Rate = ({ data }) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    console.log(" data rate ");
    console.log(data);
  });
  return (
    <div>
      <img src="assets/star.png" width="20" height="20" alt="star" />
      <img src="assets/star_black.png" width="20" height="20" alt="star" />
      <img src="assets/star_gold.png" width="20" height="20" alt="star" />
      <div>Please rate our conversation</div>
    </div>
  );
};

export default Rate;
