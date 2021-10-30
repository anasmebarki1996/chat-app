import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SuppliedDate from "../../Components/SuppliedDate/SuppliedDate";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import Rate from "../../Components/Rate/Rate";
import CompleteBox from "../../Components/CompleteBox/CompleteBox";
const socket = io.connect("https://demo-chat-server.on.ag/");

const Messenger = ({ username, logout }) => {
  // message is the variable of entered message by the user
  const [message, setMessage] = useState("");

  // arrayComponent contains the components of the chat
  const [arrayComponent, setArrayComponent] = useState([]);

  // messengerRef is a reference to make the scroll bar to down on the bottom when we sent or receive a new message
  const messengerEndRef = useRef(null);

  const SentMessage = ({ message }) => {
    return (
      <div className="sent-message-container">
        <div className="sent">
          <span> {message}</span>
        </div>
      </div>
    );
  };

  const ReceivedMessage = ({ message, type }) => {
    return (
      <div className="received-message-container">
        <div className="profile-logo-container">
          <div className="profile">BT</div>
        </div>
        <div className="received">
          {type === "message" ? (
            <span> {message}</span>
          ) : type === "map" ? (
            <GoogleMaps position={message} />
          ) : type === "date" ? (
            <SuppliedDate date={message} />
          ) : type === "rate" ? (
            <Rate data={message} />
          ) : type === "complete" ? (
            <CompleteBox logout={logout} />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    socket.on("message", ({ author, message }) => {
      setArrayComponent((prevState) => [
        ...prevState,
        <ReceivedMessage message={message} type={"message"} />,
      ]);
    });

    socket.on("command", ({ command }) => {
      const { type, data } = command;
      setArrayComponent((prevState) => [
        ...prevState,
        <ReceivedMessage message={data} type={type} />,
      ]);
    });
  }, [socket]);

  const scrollToBottom = () => {
    messengerEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [arrayComponent]);

  const onMessageSubmit = (e) => {
    // this condition is to prevent the reload of the page if we click on enter "KEYBOARD"
    // Else we don't have to prevent the reload because we click on the the right icon
    if (e) e.preventDefault();

    // this condition is to check if entered message is not only spaces. EX : "    "
    if (message.replace(/\s/g, "")) {
      // When the user submit the message it should show his message on the right
      setArrayComponent((prevState) => [
        ...prevState,
        <SentMessage message={message} />,
      ]);

      // when the user submit the message. we trigger the  events message & command
      socket.emit("message", { author: username, message });
      socket.emit("command");

      // after that we add the sent message to SentMessage. We clear the input to let user write another message
      setMessage("");
    }
  };

  return (
    <div className="messenger-container">
      <div className="logout-container" onClick={logout}>
        logout <img src="assets/logout.png" alt="log out" width="20" />
      </div>
      <div className="content">
        <div>
          <div className="profile-container">
            <div className="icon"> BT</div>
            <div className="name"> Ottonova</div>
            <div className="app-name"> Chat App</div>
          </div>
          {arrayComponent}
          <div style={{ margin: 20 }} ref={messengerEndRef}></div>
        </div>
      </div>
      <form onSubmit={onMessageSubmit}>
        <input
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Aa"
        />
        <img
          src="assets/arrow.png"
          alt="arrow"
          onClick={onMessageSubmit}
          width="20"
          height="20"
        />
      </form>
    </div>
  );
};

export default Messenger;
