import React, { useContext, useState } from "react";

const urlDomain = "https://drc-reservations.onrender.com"
// const urlDomain = "http://localhost:4000"

const UserInfo = React.createContext();
const UserInfoUpdate = React.createContext();
const BackendUrlDomain = React.createContext();

export const useUserInfo = () => useContext(UserInfo);
export const useUserInfoUpdate = () => useContext(UserInfoUpdate);
export const useBackendUrlDomain = () => useContext(BackendUrlDomain);

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <UserInfo.Provider value={userData}>
      <UserInfoUpdate.Provider value={(a) => setUserData(a)}>
        <BackendUrlDomain.Provider value={urlDomain}>
          {children}
        </BackendUrlDomain.Provider>
      </UserInfoUpdate.Provider>
    </UserInfo.Provider>
  );
};
