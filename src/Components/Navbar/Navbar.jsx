import React, { useContext, useState } from "react";

import "./Navbar.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import myImage from "../../assets/istockphoto-1332100919-612x612.jpg";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);

  const [navBuuton, setNavBuuton] = useState("hidden");
  function showNav() {
    if (navBuuton == "hidden") {
      setNavBuuton("flex");
    } else {
      setNavBuuton("hidden");
    }
  }

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
    setNavBuuton("hidden");
  }

  return (
    <>
      <nav className="bg-linear-to-r from-slate-700 to-slate-800 fixed z-10 top-0 right-0 left-0">
        <div className="container px-1.5 mx-auto text-white py-3.5 flex justify-between items-center">
          <Link className="sm:text-3xl text-xl font-mono" to="/">
            Social App
          </Link>
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className={`items-center`}>
                {userLogin !== null ? (
                  <button
                    onClick={showNav}
                    className={`w-[40px] h-[40px] border-0 rounded-3xl  focus:outline-4`}
                  >
                    <img
                      src={myImage}
                      className="w-100 border border-solid rounded-3xl"
                    />
                  </button>
                ) : (
                  <div className="flex gap-x-2 sm:gap-x-4">
                    <Link
                      to="login"
                      className="sm:py-4 sm:px-8 py-2 px-4 sm:text-xl text-md bg-black h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-cyan-500 before:to-cyan-700 before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Login
                    </Link>
                    <Link
                      to="register"
                      className="sm:py-4 sm:px-8 py-2 px-4 sm:text-xl text-md bg-black h-[50px] flex items-center justify-center  hover:-translate-y-0 active:translate-y-1 rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-cyan-500 before:to-cyan-700 before:transition-all before:duration-300 before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`min-w-[225px] bg-slate-800 absolute right-0  top-[70px] ${navBuuton} flex-col rounded-xl p-3 gap-y-3 text-left`}
            >
              <div>
                <h1 className="text-xl whitespace-nowrap">Abdallah Sherif</h1>
              </div>
              <hr />
              <Link
                // onClick={showNav}
                to="/"
                className="text-xl duration-300 hover:text-[#0D6EFD]"
              >
                Home <i className="fa-solid fa-house ml-1.5 text-lg"></i>
              </Link>
              <Link
                // onClick={showNav}
                to="profile"
                className="text-xl duration-200 hover:text-[#0D6EFD]"
              >
                Profile <i className="fa-solid fa-user ml-1.5 text-lg"></i>
              </Link>
              <hr />
              <span
                onClick={() => signout()}
                to="login"
                className="text-red-400 cursor-pointer text-xl duration-300 hover:text-[red]"
              >
                Sign out
                <i className="fa-solid fa-arrow-right-from-bracket ml-1.5 text-lg"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
