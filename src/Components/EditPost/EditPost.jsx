import React, { useState } from "react";
import "./EditPost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function EditPost({ closeAll, PostId, PostBody, PostImage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [editModalAppearance, setEditModalAppearance] = useState(false);
  const [previewImage, setPreviewImage] = useState(PostImage);
  let myQuery = useQueryClient();
  let form = useForm({
    defaultValues: {
      body: PostBody,
    },
  });
  let { register, handleSubmit } = form;
  async function handleEditPost(values) {
    const myData = new FormData();
    myData.append("body", values.body);
    if (values.image?.[0]) {
      myData.append("image", values.image[0]);
    }
    setIsLoading(true);
    try {
      let res = await axios.put(
        `https://linked-posts.routemisr.com/posts/${PostId}`,
        myData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success("post is edited successfully");
      setIsLoading(false);
      closeAll(false);
      myQuery.invalidateQueries(["getUserPost"]);
    } catch (err) {
      toast.error(
        `${err.response.data.error
          .replaceAll('"', " ")
          .replace("must be of type object", "is not allowed to be empty")}`
      );
      setIsLoading(false);
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else {
      setPreviewImage(PostImage);
    }
  };
  return (
    <>
      <button
        onClick={() => setEditModalAppearance(true)}
        className="py-4 px-8 text-xl w-full mt-3 bg-sky-400 flex items-center gap-x-3 justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        type="button"
      >
        <span>Edit Post</span>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {editModalAppearance && (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 flex z-50 justify-center items-center w-screen max-sm:w-screen">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-slate-800 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <div className="text-xl sm:text-3xl">Edit Post</div>
                <button
                  onClick={() => setEditModalAppearance(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                >
                  <i className="fas fa-close"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="px-4 py-0.5 md:px-5">
                <div className="w-full mx-auto py-3 my-2 px-3.5 rounded-xl bg-radial from-cyan-800 to-cyan-900 text-white">
                  <form
                    className="flex gap-y-3 flex-col"
                    onSubmit={handleSubmit(handleEditPost)}
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Post Body
                      </label>
                      <input
                        type="text"
                        defaultValue={PostBody}
                        {...register("body")}
                        id="password"
                        className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-white focus:outline-3"
                      />
                    </div>
                    <h1 className="text-lg mb-2">Change Image &darr;</h1>
                    <div className="relative max-h-[600px]">
                      <input
                        type="file"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="block w-full border border-gray-200 shadow-sm rounded-xl font-semibold disabled:opacity-50 disabled:pointer-events-none text-transparent text-xl cursor-pointer absolute h-full hover:bg-[rgba(0,0,0,0.6)] duration-150"
                      />
                      <img
                        src={previewImage}
                        className="w-full object-cover bg-white max-h-[500px] border-[2px] border-slate-400 rounded-xl h-full"
                        alt="Preview"
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
                          <span className="flex justify-center items-baseline">
                            <span>Edit</span>
                            <i className="fa-solid ml-2 fa-pen-to-square"></i>
                          </span>
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
        </div>
      )}
    </>
  );
}
