import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useUserData() {
  const getUserData = () =>
    axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: localStorage.getItem("userToken") },
    });
  return useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
}
