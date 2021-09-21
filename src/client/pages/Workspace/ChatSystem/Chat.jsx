import React, { useEffect, useState, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { io } from "socket.io-client";
import Message from "./Message";
import { StateProvider } from "../../../Context/StateContext";
import { GoPerson } from "react-icons/go";
const Chat = ({ activeChannel }) => {
  const socket = useRef(null);
  const { userAction: user } = StateProvider();
  const [messageToArrive, setMessageToArrive] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setMessageToArrive({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      // getSender(data.senderId);
    });
  });
  useEffect(() => {
    //send event to server

    socket.current.emit("sendUser", user.userLoginData.user._id);
    //get from server
    socket.current.on("getUsers", (users) => {
      // setOnline(users);
    });
  }, [user]);
  return (
    <>
      <div className="chatSystem">
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bolder ",
          }}
        >
          <h3>{activeChannel.channelName}</h3>
          <h4>
            <GoPerson />

            {activeChannel && activeChannel.channelMembers.length}
          </h4>
          {/* {<div className="memberList"></div>} */}
        </div>

        <div className="body">
          <Message />
          <Message />
          <Message />
        </div>
        <div className="input">
          <input type="text" />
          <BiSend style={{ fontSize: "1.5rem" }} />
        </div>
      </div>
    </>
  );
};

export default Chat;
