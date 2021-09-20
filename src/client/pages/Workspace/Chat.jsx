import React from "react";
import { BiSend } from "react-icons/bi";
const Chat = ({ activeChannel }) => {
  console.log(activeChannel.channelName);
  return (
    <>
      <div className="chatSystem">
        <div
          className="header"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          {activeChannel.channelName}
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
