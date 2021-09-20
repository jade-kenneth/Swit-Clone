import React from "react";
import { MdLocalActivity } from "react-icons/md";
import { GoMention } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { StateProvider } from "../../Context/StateContext";

const Header = ({ user, workspaceName }) => {
  const { dispatch } = StateProvider();
  const history = useHistory();
  const handleLogout = async () => {
    await dispatch({ type: "LOGGED_OUT" });
    await history.push("/");
  };
  return (
    <div className="header">
      <div className="branding">
        <h3
          style={{
            fontWeight: "bolder",
            marginRight: "10px",
            background: "#0A286F",
            color: "white",
            padding: "0.5rem",
            borderRadius: "5px",
            width: "25px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          {`${workspaceName.substring(0, 1)}${workspaceName
            .split(" ")[1]
            .substring(0, 1)}`}
        </h3>
        <h4
          style={{
            fontWeight: "bolder",

            textAlign: "center",
          }}
        >
          {workspaceName}
        </h4>
      </div>
      <MdLocalActivity className="activity" />

      <GoMention className="mention" />
      <div className="customAvatar" onClick={() => handleLogout()}>
        <h2>{`${user.substring(0, 1)}${user
          .split(" ")[1]
          .substring(0, 1)}`}</h2>
      </div>
    </div>
  );
};

export default Header;
