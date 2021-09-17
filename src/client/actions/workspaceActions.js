import * as api from "../api";
export const newWorkSpace = async (workspaceName) => {
  try {
    const { data } = await api.newWorkSpace(workspaceName);
    return data;
  } catch (error) {}
};
export const getAllWorkspace = async () => {
  try {
    const { data } = await api.getAllWorkspace();
    return data;
  } catch (error) {
    // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
  }
};
export const getWorkspace = async (workspaceId) => {
  try {
    const { data } = await api.getWorkspace(workspaceId);
    return data;
  } catch (error) {
    // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
  }
};
