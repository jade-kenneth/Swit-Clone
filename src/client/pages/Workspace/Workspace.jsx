import React from "react";
import Header from "./Header";
import "./scss/style.scss";
import { StateProvider } from "../../Context/StateContext";
import { useState, useEffect } from "react";
import ChannelNav from "./ChannelNav";
import { useParams } from "react-router-dom";
import { getWorkspace } from "../../actions/workspaceActions";

const Workspace = () => {
  const { userAction: user, dispatch } = StateProvider();
  const { workspaceId } = useParams();
  const [activeWorkspace, setActiveWorkspace] = useState("");
  console.log(workspaceId);
  useEffect(() => {
    async function getActiveWorkspace() {
      const res = await getWorkspace(workspaceId);
      console.log(res);
      setActiveWorkspace(res);
    }
    getActiveWorkspace();
  }, []);
  activeWorkspace && console.log(activeWorkspace);
  return (
    <>
      <div className="container">
        <div>
          {activeWorkspace &&
            activeWorkspace.map((data) => {
              const { workspaceName } = data;
              return (
                <Header
                  workspaceName={workspaceName}
                  user={`${user.userLoginData.user.firstName} ${user.userLoginData.user.lastName}`}
                />
              );
            })}
        </div>
        <div>
          <ChannelNav />
        </div>
      </div>
    </>
  );
};

export default Workspace;
