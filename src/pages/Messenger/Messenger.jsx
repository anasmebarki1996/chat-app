import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SuppliedDate from "../../Components/SuppliedDate/SuppliedDate";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import "./style.css";
import Rate from "../../Components/Rate/Rate";
import CompleteBox from "../../Components/CompleteBox/CompleteBox";
const socket = io.connect("https://demo-chat-server.on.ag/");

const Messenger = ({ username }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const renderChat = () => {
    return chat.map(({ message, transmissionType, type }, index) => (
      <div key={index}>
        {transmissionType === "sent" ? (
          <SentMessage message={message} />
        ) : (
          <ReceivedMessage message={message} type={type} />
        )}
      </div>
    ));
  };

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
            <CompleteBox />
          ) : (
            <h1>ccc</h1>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    socket.on("message", ({ author, message }) => {
      setChat((prevState) => [
        ...prevState,
        {
          message,
          transmissionType: "received",
          type: "message",
        },
      ]);
    });

    socket.on("command", ({ command }) => {
      const { type, data } = command;
      setChat((prevState) => [
        ...prevState,
        {
          message: data,
          transmissionType: "received",
          type,
        },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const mapFunction = ({ lat, lng }) => {
    return <GoogleMaps position={{ lat, lng }} />;
  };

  const rateFunction = (data) => {
    console.log("###########################");
    console.log(data);
  };

  const completeFunction = () => {};

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };
  const messengerEndRef = useRef(null);
  const scrollToBottom = () => {
    messengerEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onMessageSubmit = (e) => {
    if (e) e.preventDefault();
    if (message.replace(/\s/g, "")) {
      setChat((prevState) => [
        ...prevState,
        {
          author: username,
          message,
          transmissionType: "sent",
        },
      ]);
      socket.emit("message", { author: username, message });
      socket.emit("command");
      setMessage("");
    }
  };

  const profile = () => {
    return (
      <div className="profile-container">
        <div className="icon"> BT</div>
        <div className="name"> Ottonova</div>
        <div className="app-name"> Chat App</div>
      </div>
    );
  };

  return (
    <div className="messenger-container">
      <div className="content">
        <div>
          {profile()}
          {renderChat()}
          <div ref={messengerEndRef}></div>
        </div>
      </div>
      <form onSubmit={onMessageSubmit}>
        <input
          name="message"
          onChange={onTextChange}
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
