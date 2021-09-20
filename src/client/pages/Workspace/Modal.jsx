import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { getAllUser } from "../../actions/userActions";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { StateProvider } from "../../Context/StateContext";
import uuid from "uuid/dist/v4";
import { newChannel } from "../../actions/workspaceActions";
const Modal = ({ setToggleCreateChannel, workspaceId }) => {
  //NEXT GET ALL USER AND DISPLAY TO MODAL
  const { userAction: user } = StateProvider();
  let [allUsers, setAllUser] = useState("");
  const [channel, setChannel] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const channelData = {
      _id: uuid(),
      channelName: channel,
      channelMembers: channelMembers,
    };
    console.log(channelData);
    newChannel(workspaceId, channelData);
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
  console.log(channelMembers);

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
                            setChannelMembers((prev) => [...prev, data]);
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
                        <AiOutlineCloseCircle
                          className="unAdd"
                          onClick={() => {
                            setAllUser((prev) => [...prev, data]);
                            setChannelMembers(
                              channelMembers.filter((data) => data._id !== _id)
                            );
                          }}
                        />
                      </div>
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
