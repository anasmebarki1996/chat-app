import React, { useState } from "react";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";

const App = () => {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const logout = () => {
    setUsername("");
    setIsLogged(false);
  };
  if (!isLogged)
    return (
      <Login
        username={username}
        setUsername={setUsername}
        setIsLogged={setIsLogged}
      />
    );
  else return <Messenger username={username} logout={logout} />;
};

export default App;
