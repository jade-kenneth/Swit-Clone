import axios from "axios";

const url = "http://localhost:4000/api";

export const signUp = (newUser) => axios.post(`${url}/signup`, newUser);
export const signIn = (checkUser) => axios.post(`${url}/signin`, checkUser);
export const getWorkspace = (workspaceId) =>
  axios.get(`${url}/workspace/workspaceId/${workspaceId}`);
export const newWorkSpace = (workspaceName) =>
  axios.post(`${url}/workspace`, workspaceName);
export const getAllWorkspace = (userId) =>
  axios.get(`${url}/workspace/userId/${userId}`);
export const getAllUser = () => axios.get(`${url}/allUser`);

export const newChannel = (workspaceId, channelData) =>
  axios.put(`${url}/workspace/newChannel/${workspaceId}`, channelData);
export const getChannel = (channelId) =>
  axios.put(`${url}/workspace/getChannel`, channelId);
