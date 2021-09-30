import React, { useRef } from "react";
import Header from "./Header";
import "./scss/style.scss";
import { StateProvider } from "../../Context/StateContext";
import { useState, useEffect } from "react";
import ChannelNav from "./ChannelNav";
import { useParams } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { IoCheckbox } from "react-icons/io5";
import Chat from "./ChatSystem/Chat";
import Modal from "./Modal";
import { getWorkspace } from "../../actions/workspaceActions";
import { io } from "socket.io-client";

const Workspace = () => {
  const { userAction: user } = StateProvider();
  const { workspaceName, workspaceId } = useParams();
  const [activeWorkspace, setActiveWorkspace] = useState("");
  const [toggleCreateChannel, setToggleCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState("");
  const socket = useRef(null);
  const channelRef = useRef(null);
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
  useEffect(() => {
    async function getActiveWorkspace() {
      const res = await getWorkspace(workspaceId);

      setActiveWorkspace(res);
    }
    getActiveWorkspace();
  }, [toggleCreateChannel]);

  return (
    <>
      <div className="container">
        <div>
          {activeWorkspace &&
            activeWorkspace.map((data) => {
              const {
                _id,
                isMember,
                workspaceName,
                channels,
                directedMessages,
              } = data;

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
                        isMember={isMember}
                        socket={socket.current}
                        channelRef={channelRef}
                        workspaceId={workspaceId}
                        userId={user.userLoginData.user._id}
                      />
                    </div>
                    <div className="chats">
                      <Chat
                        activeChannel={activeChannel}
                        socket={socket.current}
                        user={user.userLoginData.user.firstName}
                      />
                    </div>
                    {toggleCreateChannel && (
                      <div className="channel_creation_modal">
                        <Modal
                          workspaceId={workspaceId}
                          workspaceName={workspaceName}
                          setToggleCreateChannel={setToggleCreateChannel}
                          isMember={isMember}
                          workspaceCreator={user.userLoginData.user._id}
                          socket={socket.current}
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
