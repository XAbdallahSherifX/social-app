import React, { useState } from "react";
import "./CreatePost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export default function CreatePost() {
  let myQuery = useQueryClient();
  const [isLoading, setisLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  async function handleAddPost(values) {
    setisLoading(true);
    const data = new FormData();
    data.append("body", values.body);
    data.append("image", values.image[0]);
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        data,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setisLoading(false);
      toast.success("Post is added successfully");
      myQuery.invalidateQueries(["getUserPost"]);
    } catch (err) {
      setisLoading(false);
      toast.error(
        `${err.response.data.error
          .replaceAll('"', " ")
          .replace("must be of type object", "is not allowed to be empty")}`
      );
    }
  }

  return (
    <>
      <div className="w-full mx-auto md:w-[70%] lg:w-[50%] py-6 px-3.5 rounded-xl bg-radial from-cyan-800 to-cyan-900 text-white">
        <div className="flex items-baseline gap-x-3">
          <h1 className="mb-2 text-3xl font-mono font-semibold">
            Create a Post
          </h1>
          <i className="fa-regular text-3xl fa-image"></i>
        </div>
        <form onSubmit={handleSubmit(handleAddPost)}>
          <div className="mb-4 flex flex-col gap-3">
            <input
              {...register("body")}
              type="text"
              placeholder="What's on your mind?"
              className="w-full h-11 px-5 py-2.5 rounded-xl outline-1 outline-white focus:outline-3"
            />
            <div className="w-full">
              <input
                type="file"
                {...register("image")}
                className="block w-full border border-gray-200 shadow-sm rounded-xl font-semibold disabled:opacity-50 disabled:pointer-events-none text-white text-xl file:bg-black file:border-0 file:me-4 file:py-3 file:px-4 cursor-pointer"
              />
            </div>
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
                <>
                  Publish <i className="fa-solid text-sm ml-1 fa-paper-plane"></i>
                </>
              )}
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
