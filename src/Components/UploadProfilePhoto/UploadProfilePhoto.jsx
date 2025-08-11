import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadProfilePhoto() {
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let myQuery = useQueryClient()
  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });
  let { register, handleSubmit } = form;
  async function handleUploadPhoto(values) {
    const data = new FormData();
    data.append("photo", values.photo[0]);
    setIsLoading(true);
    try {
      let res = await axios.put(
        `https://linked-posts.routemisr.com/users/upload-photo`,
        data,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success("Photo is uploaded successfully");
      myQuery.invalidateQueries(["getUserData"]);
      setUploadPhotoModal(false);
      setIsLoading(false);
    } catch (err) {
      toast.error(`Invalid Input`);
      setIsLoading(false);
    }
  }
  return (
    <>
      <div>
        <button
          onClick={() => setUploadPhotoModal(true)}
          className="py-4 px-8 text-xl w-full bg-sky-400 h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300 shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300 before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          type="button"
        >
          Edit Profile Picture
        </button>
        {uploadPhotoModal && (
          <div
            className="fixed top-1/2 left-1/2 -translate-1/2 z-50 flex justify-center items-center w-[500px] max-sm:w-screen"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-slate-800 rounded-lg shadow-sm ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 ">
                  <h3 className="text-xl font-semibold text-white">
                    Upload Profile Picture
                  </h3>
                  <button
                    onClick={() => setUploadPhotoModal(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                  >
                    <i className="fas fa-close"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(handleUploadPhoto)}
                    className="space-y-4"
                  >
                    <div className="w-full">
                      <input
                        type="file"
                        {...register("photo")}
                        className="block w-full border border-gray-200 shadow-sm rounded-xl font-semibold disabled:opacity-50 disabled:pointer-events-none text-white text-xl file:bg-black file:cursor-pointer file:border-0 file:me-4 file:py-3 file:px-4 cursor-pointer"
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
                          "Upload Profile Picture"
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
