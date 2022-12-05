import { createContext } from "react";

const GlobalContext = createContext({});

const state = {};

export const contextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ helo: "dfkj" }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
