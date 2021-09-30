import React from "react";
import "./scss/style.scss";
// import { format } from "timeago.js";
const Message = ({ time, message, messageOwner, name }) => {
  let date = new Date();
  return (
    <div className="message-container">
      <div className={messageOwner ? "message-content own" : "message-content"}>
        <div className={messageOwner ? "custom-avatar" : "custom-avatar"}>
          <h2>{messageOwner ? "ME" : `F`}</h2>
        </div>
        <div className="message">
          <div className="rowS">
            <h4>Weaver</h4>
            <div className="message-time">12:44</div>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
