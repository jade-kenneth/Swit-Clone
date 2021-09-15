import React, { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "../reducer";
const StateContext = createContext();

export function StateProvider() {
  return useContext(StateContext);
}

export function StateContextProvider({ children }) {
  const [userAction, dispatch] = useReducer(reducer, [], () => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userAction));
    if (userAction.isLogged === false) {
      localStorage.removeItem("user");
    }
  }, [userAction]);

  return (
    <StateContext.Provider value={{ userAction, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
