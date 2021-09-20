import * as api from "../api";

export const createUsers = async (user, dispatch) => {
  dispatch({ type: "LOGIN_STARTED" });
  try {
    const { data } = await api.signUp(user);
    dispatch({ type: "CREATE_USER", newUser: data });
  } catch (error) {
    dispatch({
      type: "INCORRECT_CREDENTIALS",
    });
    return error.response.data;
  }
};
export const validateUsers = async (user, dispatch) => {
  dispatch({ type: "LOGIN_STARTED" });
  try {
    const { data } = await api.signIn(user);
    dispatch({ type: "VALIDATED_USER", oldUser: data });
  } catch (error) {
    dispatch({
      type: "INCORRECT_CREDENTIALS",
    });
    return error.response.data;
  }
};
export const getAllUser = async (dispatch) => {
  try {
    const { data } = await api.getAllUser();
    return data;
  } catch (error) {}
};
