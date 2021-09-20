import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { newWorkSpace, getAllWorkspace } from "../../actions/workspaceActions";
import { StateProvider } from "../../Context/StateContext";

import "./scss/style.scss";
const Home = () => {
  const { userAction: user, dispatch } = StateProvider();
  const [workspace, setWorkspace] = useState("");
  const [allWorkspaceCreated, setAllWorkspace] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      workspaceCreator: user.userLoginData.user._id,
      workspaceName: workspace,
    };
    newWorkSpace(userData);
    setWorkspace("");
    setToggle(!toggle);
    <Redirect to="/swit/home" />;
  };
  useEffect(() => {
    async function getAllWorkspaceCreated() {
      const res = await getAllWorkspace(user.userLoginData.user._id);
      console.log(res);
      setAllWorkspace(res);
    }
    getAllWorkspaceCreated();
  }, [toggle]);

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
              <button
                onClick={() => setToggle((prev) => !prev)}
                type="submit"
                disabled={!workspace}
              >
                + Build Workspace
              </button>
            </form>
          </div>

          {allWorkspaceCreated &&
            allWorkspaceCreated
              .slice(0)
              .reverse()
              .map((data) => {
                const { _id, workspaceName } = data;
                console.log(_id);
                return (
                  <Link
                    key={_id}
                    to={`/swit/channel/${_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="workspace">{workspaceName}</div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
