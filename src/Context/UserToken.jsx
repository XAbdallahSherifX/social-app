import { createContext, useEffect, useState } from "react";
export let UserTokenContext = createContext();
export default function UserTokenContextProvider(props) {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </UserTokenContext.Provider>
  );
}
