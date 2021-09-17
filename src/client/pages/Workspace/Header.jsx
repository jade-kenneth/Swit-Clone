import React from "react";
import { MdLocalActivity } from "react-icons/md";
import { GoMention } from "react-icons/go";
const Header = ({ user, workspaceName }) => {
  return (
    <div className="header">
      <div className="branding">
        <h3 style={{ marginRight: "10px" }}>Swit Clone</h3>
        <h3 style={{ border: "1px solid red", textAlign: "center" }}>
          {workspaceName}
        </h3>
      </div>
      <MdLocalActivity className="activity" />

      <GoMention className="mention" />
      <div className="customAvatar">
        <h2>{`${user.substring(0, 1)}${user
          .split(" ")[1]
          .substring(0, 1)}`}</h2>
      </div>
    </div>
  );
};

export default Header;
