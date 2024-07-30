/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginUser = async (userInfo) => {};
  const registerUser = async (userInfo) => {};
  const logoutUser = async () => {};
  const isAuthenticated = () => {};

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
