import React, { useState } from "react";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";

const App = () => {
  // username is to save the entered username
  const [username, setUsername] = useState("");

  // isLogged is to save the status of application to check if the user is connected
  // isLogged is a boolean variable
  const [isLogged, setIsLogged] = useState(false);

  // logout function to logout the user
  // in this function. We delete the username & we change the status of the user from connected to disconnected
  const logout = () => {
    setUsername("");
    setIsLogged(false);
  };

  // if the user not logged. He can see only the page Login. Else he can see only the Chat app.
  if (!isLogged)
    return (
      // We pass props:
      // * username , setUsername : we need to change the variable of username.
      // * setIsLogged : we need it  change the status of the user to connected after he submits the form
      <Login
        username={username}
        setUsername={setUsername}
        setIsLogged={setIsLogged}
      />
    );
  // We pass props:
  // * username : we need to send it to the server,
  // * logout : we need it to trigger the function logout when the user need to logout
  else return <Messenger username={username} logout={logout} />;
};

export default App;
