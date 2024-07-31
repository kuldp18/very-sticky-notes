/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { account } from "../appwrite/auth";
import { ID } from "appwrite";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    fetchUser();
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
      setAuthError(error.message);
    }
    setLoading(false);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      const { name, email, password } = userInfo;
      if (!name || !email || !password) {
        throw new Error("Please fill in all the fields");
      }

      let res = await account.create(ID.unique(), email, password, name);
      if (res) {
        //login user
        await loginUser({ email, password });
      }
    } catch (error) {
      console.error(error);
      setAuthError(error.message);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const currentUser = await account.get();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.log("Not logged in");
      setAuthError(null);
    }
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
    fetchUser,
    authError,
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
