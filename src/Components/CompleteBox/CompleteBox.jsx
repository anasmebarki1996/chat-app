import React, { useState } from "react";

const CompleteBox = ({ logout }) => {
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <div className="complete-box-container">
      {checkedValue === false ? (
        <div>You have selected to continue on this conversation</div>
      ) : (
        <>
          <div>Do you want to close the conversation ?</div>
          <button onClick={logout}>Yes</button>
          <button onClick={() => setCheckedValue(false)}>No</button>
        </>
      )}
    </div>
  );
};

export default CompleteBox;
