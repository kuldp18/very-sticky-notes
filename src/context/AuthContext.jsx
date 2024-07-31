/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { account } from "../appwrite/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      const { email, password } = userInfo;
      if (!email || !password) {
        throw new Error("Please fill in all the fields");
      }

      let res = await account.createEmailPasswordSession(email, password);
      if (res) {
        const currentUser = await account.get();
        setUser(currentUser);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const registerUser = async (userInfo) => {};

  const logoutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
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
