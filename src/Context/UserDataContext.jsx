import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";
export let UserDataContext = createContext();
export default function UserDataContextProvider(props) {
  const getUserData = () =>
    axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: localStorage.getItem("userToken") },
    });
  let { data } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  let userData = data;
  return (
    <UserDataContext.Provider value={{ userData }}>
      {props.children}
    </UserDataContext.Provider>
  );
}
