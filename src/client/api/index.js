import axios from "axios";

const url = "http://localhost:4000/api";

export const signUp = (newUser) => axios.post(`${url}/signup`, newUser);
export const signIn = (checkUser) => axios.post(`${url}/signin`, checkUser);
