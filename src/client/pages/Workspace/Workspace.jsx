import React from "react";
import Header from "./Header";
import "./scss/style.scss";
import { StateProvider } from "../../Context/StateContext";
import { useState, useEffect } from "react";
import ChannelNav from "./ChannelNav";
import { useParams } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { IoCheckbox } from "react-icons/io5";
import Chat from "./Chat";
import Modal from "./Modal";
import { getWorkspace } from "../../actions/workspaceActions";
const Workspace = () => {
  const { userAction: user, dispatch } = StateProvider();
  const { workspaceId } = useParams();
  const [activeWorkspace, setActiveWorkspace] = useState("");
  const [toggleCreateChannel, setToggleCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState("");
  console.log(workspaceId);

  useEffect(() => {
    async function getActiveWorkspace() {
      const res = await getWorkspace(workspaceId);
      console.log(res);
      setActiveWorkspace(res);
    }
    getActiveWorkspace();
  }, [workspaceId, toggleCreateChannel]);
  console.log(activeChannel);
  activeWorkspace && console.log(activeWorkspace);
  return (
    <>
      <div className="container">
        <div>
          {activeWorkspace &&
            activeWorkspace.map((data) => {
              const { _id, workspaceName, channels, directedMessages } = data;
              return (
                <React.Fragment key={_id}>
                  <Header
                    workspaceName={workspaceName}
                    user={`${user.userLoginData.user.firstName} ${user.userLoginData.user.lastName}`}
                  />
                  <div className="row">
                    <div className="sideNav">
                      <BsChat
                        style={{
                          fontSize: "1.3rem",
                          background: "#3E81FE",
                          color: "white",
                          borderRadius: "5px",
                          padding: "0.4rem",
                        }}
                      />
                      <IoCheckbox
                        style={{
                          fontSize: "1.5rem",
                          background: "#3E81FE",
                          color: "white",
                          borderRadius: "5px",
                          padding: "0.3rem",
                        }}
                      />
                    </div>
                    <div className="channels">
                      <ChannelNav
                        channels={channels}
                        directedMessages={directedMessages}
                        setToggleCreateChannel={setToggleCreateChannel}
                        setActiveChannel={setActiveChannel}
                      />
                    </div>
                    <div className="chats">
                      <Chat activeChannel={activeChannel} />
                    </div>
                    {toggleCreateChannel && (
                      <div className="channel_creation_modal">
                        <Modal
                          workspaceId={workspaceId}
                          setToggleCreateChannel={setToggleCreateChannel}
                        />
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Workspace;
