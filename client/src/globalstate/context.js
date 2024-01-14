import React, { useContext, useState } from "react";

const UserInfo = React.createContext();
const UserInfoUpdate = React.createContext();

export const useUserInfo = () => useContext(UserInfo);
export const useUserInfoUpdate = () => useContext(UserInfoUpdate);

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <UserInfo.Provider value={userData}>
      <UserInfoUpdate.Provider value={(a) => setUserData(a)}>
        {children}
      </UserInfoUpdate.Provider>
    </UserInfo.Provider>
  );
};
