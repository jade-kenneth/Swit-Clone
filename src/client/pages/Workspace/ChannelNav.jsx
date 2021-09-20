import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
const ChannelNav = ({
  channels,
  directedMessages,
  setToggleCreateChannel,
  setActiveChannel,
}) => {
  return (
    <>
      <div className="column">
        <div className="channelList">
          <div className="channelNav">
            <div className="row">
              <h5>Channels</h5>
              <div>
                <button
                  onClick={() => setToggleCreateChannel(true)}
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

            <div className="allChannels">
              {channels.map((data) => {
                const { _id, channelName, channelMembers } = data;
                return (
                  <h5
                    key={_id}
                    className="eachChannels"
                    onClick={() => setActiveChannel(data)}
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
