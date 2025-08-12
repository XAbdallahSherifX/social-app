import React, { useState } from "react";
import "./ChangePassword.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
export default function ChangePassword() {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { register, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });
  function handleChangePassword(values) {
    setIsLoading(true);
    axios
      .patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          toast.success("password is changed successfully");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error(
          `${err.response.data.error
            .replaceAll('"', " ")
            .replaceAll(
              "required pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/",
              "password format"
            )
            .replace("newPassword", "new password").replace("email or","")}`
        );
        setIsLoading(false);
      });
  }
  return (
    <>
      <div>
        <button
          onClick={() => setChangePasswordModal(true)}
          className="py-4 px-8 text-xl w-full bg-sky-400 h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          type="button"
        >
          Change Password
        </button>
        {changePasswordModal && (
          <div
            className="fixed top-1/2 left-1/2 -translate-1/2 z-50 flex justify-center items-center w-[500px] max-sm:w-screen"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-slate-800 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                  <h3 className="text-xl font-semibold text-white">
                    Change Password
                  </h3>
                  <button
                    onClick={() => setChangePasswordModal(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                  >
                    <i className="fas fa-close"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Your Old Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        id="password"
                        className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-sky-500 focus:outline-sky-700 focus:outline-3"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Your New Password
                      </label>
                      <input
                        type="password"
                        {...register("newPassword")}
                        id="newPassword"
                        className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-sky-500 focus:outline-sky-700 focus:outline-3"
                      />
                    </div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-1 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 cursor-pointer disabled:bg-gray-600"
                    >
                      <span className="text-lg">
                        {isLoading ? (
                          <i className="fas fa-spinner fa-spin text-white"></i>
                        ) : (
                          "Change Password"
                        )}
                      </span>
                      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                        <div className="relative h-full w-10 bg-white/20"></div>
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
