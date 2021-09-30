import React, { useEffect, useRef } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const ChannelNav = ({
  channels,
  directedMessages,
  setToggleCreateChannel,
  setActiveChannel,
  isMember,
  socket,
  channelRef,
  workspaceId,
  userId,
}) => {
  useEffect(() => {
    socket.on("room-created", (room, channelMembers) => {
      // const newElement = document.createElement("h5");
      // newElement.setAttribute("class", "eachChannels");

      // newElement.onclick = function (event) {};
      // console.log("im here");
      // newElement.innerText = room;
      // channelRef.current?.appendChild(newElement);
      channelMembers.find((data) => data._id === userId) &&
        socket.emit("join-room", room);
    });
    socket.on("room", (room) => {
      const newElement = document.createElement("h5");
      newElement.setAttribute("class", "eachChannels");

      newElement.onclick = function (event) {
        console.log("shared");
      };
      console.log(userId);
      newElement.innerText = room;
      channelRef.current?.appendChild(newElement);
    });
  }, []);
  return (
    <>
      <div className="column">
        <div className="channelList">
          <div className="channelNav">
            <div className="row">
              <h5>Channels</h5>
              <div>
                <button
                  onClick={() => {
                    setToggleCreateChannel(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoIosAddCircleOutline />

                  <p style={{ padding: "0", margin: "0" }}>Create Channel</p>
                </button>
              </div>
            </div>

            <div className="allChannels" ref={channelRef}>
              {channels.map((data) => {
                const { _id, channelName } = data;

                return (
                  <h5
                    key={_id}
                    className="eachChannels"
                    onClick={() => {
                      setActiveChannel(data);
                      // socket.emit("room-created", _id);
                    }}
                  >
                    {channelName}
                  </h5>
                );
              })}
            </div>
          </div>
        </div>
        <div className="directMessagesList">
          <div className="directMessageNav">
            <h5>Direct Messages</h5>
            {/* <IoIosAddCircleOutline /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelNav;
