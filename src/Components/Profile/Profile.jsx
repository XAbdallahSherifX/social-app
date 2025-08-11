import React from "react";
import "./Profile.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserPosts from "./../UserPosts/UserPosts";
import ChangePassModal from "../ChangePassword/ChangePassword";
import UploadProfilePhoto from "../UploadProfilePhoto/UploadProfilePhoto";
import ChangePassword from "./../ChangePassword/ChangePassword";
export default function Profile() {
  const getUserData = () =>
    axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: localStorage.getItem("userToken") },
    });
  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  if (isLoading) {
    return (
      <div className="h-screen absolute top-0 left-0 right-0 bottom-0 flex w-full justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="p-4 text-2xl w-full sm:w-1/2 text-center mx-auto text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
          {error.message}
        </h1>
      </div>
    );
  }
  return (
    <div className="py-14 text-white">
      <div className="w-full mx-auto md:w-[75%] my-12 py-6 px-3.5 rounded-xl bg-radial from-cyan-700 to-cyan-900 text-white">
        <div className="lg:flex justify-between items-center">
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <img
              className="rounded-full border-6 size-72 bg-white border-slate-900"
              src={data?.photo}
              alt=""
            />
            <h1 className="font-semibold text-4xl break-all">
              {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}
            </h1>
          </div>
        </div>
        <div className="py-6 bg-slate-950 rounded-2xl px-4 mt-4">
          <div className="row justify-between gap-y-4">
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1"> Name :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg">
                {`${data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}`}
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1">User Since :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg">
                {new Date(data?.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1">Born At :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg">
                {data?.dateOfBirth.replaceAll("-", "/")}
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1">Gender :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg">
                {data?.gender.charAt(0).toUpperCase() + data?.gender.slice(1)}
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1">Email :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg break-all">
                {data?.email}
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <span className=" px-1">Password :</span>
              <div className="w-full bg-slate-600 p-3 rounded-2xl sm:text-2xl text-lg">
                <div className="flex justify-between items-center">
                  <span>••••••••••••</span>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <ChangePassword />
            </div>
            <div className="lg:w-5/12 w-full sm:text-2xl text-lg">
              <UploadProfilePhoto />
            </div>
            <div className="flex justify-between items-center max-sm:flex-col w-full gap-y-4"></div>
          </div>
        </div>
      </div>
      <UserPosts id={data._id} />
    </div>
  );
}
