import React, { createContext } from "react";
import useFirebase from "../hooks/useFirebase";

export const AuthContext = createContext();

const FirebaseContext = ({ children }) => {
  return (
    <AuthContext.Provider value={useFirebase()}>
      {children}
    </AuthContext.Provider>
  );
};

export default FirebaseContext;
