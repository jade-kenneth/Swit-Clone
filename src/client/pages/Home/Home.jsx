import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";

import { io } from "socket.io-client";
import { newWorkSpace, getAllWorkspace } from "../../actions/workspaceActions";
import { StateProvider } from "../../Context/StateContext";

import "./scss/style.scss";
const Home = () => {
  const socket = useRef(null);
  const { userAction: user, dispatch } = StateProvider();
  const [workspace, setWorkspace] = useState("");
  const [allWorkspaceCreated, setAllWorkspace] = useState("");
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
  }, []);

  useEffect(() => {
    //send event to server
    //user who connect will send their id to socket server
    //to initialize their socket id
    socket.current.emit("sendUser", user.userLoginData.user._id);
    //get from server
    // socket.current.on("getUsers", (users) => {
    //   // setOnline(users);
    // });
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggle(!toggle);
    const userData = {
      isMember: false,
      workspaceCreator: user.userLoginData.user._id,
      workspaceName: workspace,
    };
    await newWorkSpace(userData);
    setWorkspace("");
    (async function getAllWorkspaceCreated() {
      const res = await getAllWorkspace(user.userLoginData.user._id);

      setAllWorkspace(res);
    })();
  };

  useEffect(() => {
    (async function getAllWorkspaceCreated() {
      const res = await getAllWorkspace(user.userLoginData.user._id);

      setAllWorkspace(res);
    })();
  }, [user.userLoginData.user._id]);

  return (
    <div>
      <div
        style={{
          fontSize: "2rem",
          borderBottom: "1px solid rgb(211, 209, 209)",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "1rem",
        }}
      >
        Swit Clone
      </div>
      <div style={{ height: "90vh" }} className="userProfile">
        <div className="head">
          <div className="customAvatar">
            <h2
              style={{ textTransform: "uppercase" }}
            >{`${user.userLoginData.user.firstName.substring(
              0,
              1
            )}${user.userLoginData.user.lastName.substring(0, 1)}`}</h2>
          </div>
          <div className="column">
            <div
              style={{
                width: "100%",

                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span className="login_indicator"></span>
              <h2>{`${user.userLoginData.user.firstName} ${user.userLoginData.user.lastName}`}</h2>
            </div>

            <p>{`${user.userLoginData.user.email}`}</p>
          </div>
        </div>
        <div className="allWorkspaces" style={{ display: "flex", gap: "10px" }}>
          <div className="workspace">
            <form className="form_workspace" onSubmit={handleSubmit}>
              <input
                type="text"
                name="workspace"
                id=""
                value={workspace}
                placeholder="Workspace name"
                autoComplete="off"
                onChange={(e) => setWorkspace(e.target.value)}
              />
              <button type="submit" disabled={!workspace}>
                + Build Workspace
              </button>
            </form>
          </div>

          {allWorkspaceCreated &&
            allWorkspaceCreated
              .slice(0)
              .reverse()
              .map((data) => {
                const { _id, isMember, workspaceName } = data;

                return (
                  <Link
                    key={_id}
                    to={`/swit/channel/${_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="workspace">
                      {workspaceName}
                      <h3>{isMember ? "Member" : "Master"}</h3>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
