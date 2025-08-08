import React, { useContext, useState } from "react";
import "./Navbar.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import myImage from "../../assets/istockphoto-1332100919-612x612.jpg";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Navbar() {
  const getUserData = () =>
    axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: localStorage.getItem("userToken") },
    });
  let { data } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
    setMenuAppearance(false);
  }
  const [MenuAppearance, setMenuAppearance] = useState(false);
  function showMenu() {
    setMenuAppearance((prev) => !prev);
  }
  return (
    <>
      <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 fixed z-10 top-0 right-0 left-0">
        <div className="container px-1.5 mx-auto text-white py-3.5 flex justify-between items-center">
          <Link className="sm:text-3xl text-xl font-mono" to="/">
            <i className="fa-solid fa-users mr-2"></i>Social App
          </Link>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className={`items-center`}>
                {userLogin !== null ? (
                  <div
                    onBlur={() => setMenuAppearance(false)}
                    onClick={() => showMenu()}
                    tabIndex={0}
                    className={`w-[40px] h-[40px] border-0 outline-1  rounded-3xl cursor-pointer focus:outline-4`}
                  >
                    {data?.photo ? (
                      <img
                        className="w-full border-solid rounded-full"
                        src={data.photo}
                      />
                    ) : (
                      <img
                        className="w-full border-solid rounded-full"
                        src={myImage}
                      />
                    )}
                    {MenuAppearance && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-[225px] bg-slate-800 absolute right-[10px] cursor-auto top-[70px] flex flex-col rounded-xl p-3 gap-y-3 text-left`}
                      >
                        <div>
                          <h1 className="text-xl font-bold break-all">
                            {data?.name
                              ? data?.name.charAt(0).toUpperCase() +
                                data?.name.slice(1)
                              : "Name"}
                          </h1>
                        </div>
                        <hr />
                        <div
                          onMouseDown={() => {
                            navigate("/");
                            setMenuAppearance(false);
                          }}
                          className="text-xl duration-300 hover:text-[#0D6EFD] cursor-pointer"
                        >
                          Home
                          <i className="fa-solid fa-house ml-1.5 text-lg"></i>
                        </div>
                        <div
                          onMouseDown={() => {
                            navigate("/profile");
                            setMenuAppearance(false);
                          }}
                          className="text-xl duration-200 hover:text-[#0D6EFD] cursor-pointer"
                        >
                          Profile
                          <i className="fa-solid fa-user ml-1.5 text-lg"></i>
                        </div>
                        <hr />
                        <span
                          onMouseDown={() => signout()}
                          to="login"
                          className="text-red-400 cursor-pointer text-xl duration-300 hover:text-[red]"
                        >
                          Sign out
                          <i className="fa-solid fa-arrow-right-from-bracket ml-1.5 text-lg"></i>
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-x-2 sm:gap-x-4">
                    <Link
                      to="login"
                      className="sm:py-4 sm:px-8 py-2 px-4 sm:text-xl text-md bg-gray-600 h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Login
                    </Link>
                    <Link
                      to="register"
                      className="sm:py-4 sm:px-8 py-2 px-4 sm:text-xl text-md bg-gray-600 h-[50px] flex items-center justify-center  hover:-translate-y-0 active:translate-y-1 rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300 before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
