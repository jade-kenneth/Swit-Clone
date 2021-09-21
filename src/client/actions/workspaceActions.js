import * as api from "../api";

//create new workspace
export const newWorkSpace = async (workspaceName) => {
  try {
    const { data } = await api.newWorkSpace(workspaceName);

    return data;
  } catch (error) {}
};
//getAllWorkspace associated to user
export const getAllWorkspace = async (userId) => {
  try {
    const { data } = await api.getAllWorkspace(userId);

    return data;
  } catch (error) {
    // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
  }
};
//
export const getWorkspace = async (workspaceId) => {
  try {
    const { data } = await api.getWorkspace(workspaceId);

    return data;
  } catch (error) {
    console.log(error.message);
    // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
  }
};
//
export const newChannel = async (workspaceId, channelData) => {
  console.log(workspaceId, channelData);
  try {
    const { data } = await api.newChannel(workspaceId, channelData);

    return data;
  } catch (error) {
    console.log(error.message);
    // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
  }
};
