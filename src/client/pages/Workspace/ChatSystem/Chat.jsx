import React, { useEffect, useState, useRef } from "react";
import { BiSend } from "react-icons/bi";

import Message from "./Message";
import { StateProvider } from "../../../Context/StateContext";
import { GoPerson } from "react-icons/go";
const Chat = ({ activeChannel, socket, user }) => {
  const [messageToArrive, setMessageToArrive] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState("");
  useEffect(() => {
    socket.on("chat-message", (data) => {
      console.log(`${data.message}`);
    });
  }, []);

  const sendMessage = () => {
    const payload = {
      content: message,
      to: activeChannel._id,
      sender: user,
    };

    socket.emit("send-chat-message", payload);
    setMessageData((prev) => [...prev, payload]);
  };

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
          <h4 onClick={() => setShowMembers((showMembers) => !showMembers)}>
            <GoPerson />

            {activeChannel && activeChannel.channelMembers.length}
          </h4>
          {showMembers && (
            <div className="memberList">
              {activeChannel &&
                activeChannel.channelMembers.map((data) => {
                  const { firstName, lastName } = data;
                  const user = `${firstName} ${lastName}`;
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div className="customAvatar">
                          <h2>{`${user.substring(0, 1)}${user
                            .split(" ")[1]
                            .substring(0, 1)}`}</h2>
                        </div>
                        <h4>
                          {firstName} {lastName}
                        </h4>
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </div>

        <div className="body">
          {messageData &&
            messageData.map((data, i) => {
              const { content } = data;
              return <Message key={i} message={content} />;
            })}
        </div>
        <div className="input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <BiSend
            style={{ fontSize: "1.5rem" }}
            onClick={() => {
              sendMessage();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
