import { useContext } from "react";
import { AuthContext } from "../contexts/FirebaseContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
