import axios from "axios";

const url = "http://localhost:4000/api";

export const signUp = (newUser) => axios.post(`${url}/signup`, newUser);
export const signIn = (checkUser) => axios.post(`${url}/signin`, checkUser);
export const newWorkSpace = (workspaceName) =>
  axios.post(`${url}/workspace`, workspaceName);
export const getAllWorkspace = () => axios.get(`${url}/workspace`);
export const getWorkspace = (workspaceId) =>
  axios.get(`${url}/workspace/${workspaceId}`);
