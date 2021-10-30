import React, { useState } from "react";
const Login = ({ username, setUsername, setIsLogged }) => {
  const [error, setError] = useState("");
  const onSubmit = (e) => {
    //e.preventDefault() to prevent the reload of the page
    e.preventDefault();
    if (username) {
      // this condition is to check if the entered data is not only spaces
      if (username.replace(/\s/g, "")) setIsLogged(true);
      else setError("Please check your username");
    } else setError("Please enter your username.");
  };

  const onChangeText = (e) => {
    if (e.target.value) {
      setError("");
    }
    setUsername(e.target.value);
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <div className="title">Chat App</div>
        <div className="input-container">
          <input
            className={error ? "error" : ""}
            type="text"
            maxLength="30"
            name="username"
            value={username}
            placeholder="enter your username"
            onChange={onChangeText}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
