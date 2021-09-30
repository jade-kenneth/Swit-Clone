import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { getAllUser } from "../../actions/userActions";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { StateProvider } from "../../Context/StateContext";
import uuid from "uuid/dist/v4";
import { newChannel } from "../../actions/workspaceActions";
const Modal = ({
  isMember,
  workspaceName,
  setToggleCreateChannel,
  workspaceId,
  workspaceCreator,
  socket,
}) => {
  //NEXT GET ALL USER AND DISPLAY TO MODAL
  const { userAction: user } = StateProvider();
  let [allUsers, setAllUser] = useState("");
  const [channel, setChannel] = useState("");
  //include user as one of channel members
  const [memberId, setMemberId] = useState("");
  const [channelMembers, setChannelMembers] = useState([
    user.userLoginData.user,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const channelData = {
      _id: uuid(),
      workspaceId: workspaceId,
      workspaceName: workspaceName,
      workspaceCreator: workspaceCreator,
      channelName: channel,
      isMember: isMember,
      channelMembers: channelMembers,
    };

    await newChannel(workspaceId, channelData);
    const channelMembersWithoutUser = channelMembers.filter(
      (data) => data._id !== user.userLoginData.user._id
    );

    socket.emit(
      "send-socket-server",
      channelData.channelName,
      channelMembersWithoutUser
    );
    // socket.emit("channel-created", channelData);

    setToggleCreateChannel(false);
  };

  //insert channel data
  useEffect(() => {
    async function getAllUsers() {
      const res = await getAllUser();
      setAllUser(
        res.filter((data) => data._id !== user.userLoginData.user._id)
      );
    }
    getAllUsers();
  }, []);
  useEffect(() => {}, [channel]);

  return (
    <>
      <div className="modalContainer">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Create Channel</h2>
          <IoCloseOutline
            style={{ cursor: "pointer" }}
            onClick={() => setToggleCreateChannel(false)}
          />
        </div>

        <form className="create_channel_form">
          <label htmlFor="chName">Channel name</label>
          <input
            type="text"
            id="chName"
            name="chName"
            value={channel}
            autoComplete="off"
            onChange={(e) => setChannel(e.target.value)}
          />
        </form>
        <div className="adding_user">
          <div className="users">
            <h4>Swit Users</h4>
            <div className="userList">
              {allUsers &&
                allUsers.map((data) => {
                  const { _id, firstName, lastName } = data;
                  const user = `${firstName} ${lastName}`;
                  return (
                    <React.Fragment key={_id}>
                      <div className="eachUser">
                        <div className="customAvatar">
                          <h2>{`${user.substring(0, 1)}${user
                            .split(" ")[1]
                            .substring(0, 1)}`}</h2>
                        </div>
                        <h5>
                          {firstName} {lastName}
                        </h5>
                        <AiOutlineCheckCircle
                          className="add"
                          onClick={() => {
                            //add channel member
                            setChannelMembers((prev) => [...prev, data]);
                            //remove user when adding to channel member
                            setAllUser(
                              allUsers.filter((data) => data._id !== _id)
                            );
                          }}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
          <div className="added_user">
            <h4>User added</h4>
            <div className="userAdded">
              {channelMembers &&
                channelMembers.map((data) => {
                  const { _id, firstName, lastName } = data;

                  const userFullName = `${firstName} ${lastName}`;

                  return (
                    //do not render user in user_added UI
                    <React.Fragment key={_id}>
                      {_id !== user.userLoginData.user._id && (
                        <div className="eachUser">
                          <div className="customAvatar">
                            <h2>{`${userFullName.substring(0, 1)}${userFullName
                              .split(" ")[1]
                              .substring(0, 1)}`}</h2>
                          </div>

                          <h5>
                            {firstName} {lastName}
                          </h5>
                          <AiOutlineCloseCircle
                            className="unAdd"
                            onClick={() => {
                              // set new all user after filter
                              setAllUser((prev) => [...prev, data]);
                              // filter data when removing
                              setChannelMembers(
                                channelMembers.filter(
                                  (data) => data._id !== _id
                                )
                              );
                            }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="confirm_btn">
          <button
            disabled={channel && channelMembers.length > 0 ? false : true}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
