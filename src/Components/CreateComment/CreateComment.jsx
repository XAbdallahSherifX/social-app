import React, { useState } from "react";
import "./CreateComment.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
export default function CreateComment({ postId }) {
  const [commentModalAppearance, setCommentModalAppearance] = useState(false);
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let schema = z.object({
    content: z.string().regex(/^.{1,}$/, "Invalid Input."),
    post: z.string(),
  });
  let { register, handleSubmit, formState } = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
    resolver: zodResolver(schema),
  });
  function addComment(values) {
    setisLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/comments", values, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        setisLoading(false);
        setCommentModalAppearance(false);
      })
      .catch((err) => {
        setapiError(err.message);
        setisLoading(false);
      });
  }
  return (
    <>
      <h1
        onClick={() => setCommentModalAppearance(true)}
        className="text-center text-gray-300 cursor-pointer sm:text-lg text-sm mt-2 hover:text-white hover:underline hover:underline-offset-3 duration-300"
      >
        Add Comment
      </h1>
      {commentModalAppearance && (
        <div className="h-screen w-full fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
          <div className="bg-gradient-to-b relative from-slate-900 border-2 rounded-3xl w-96 h-96 to-cyan-950 max-sm:w-78 max-sm:h-104 ">
            <div
              onClick={() => setCommentModalAppearance(false)}
              className="hover:text-black hover:bg-white text-white cursor-pointer duration-200 rounded-3xl p-2 absolute top-3 right-3 flex justify-center items-center"
            >
              <i className="fa-solid text-2xl fa-x"></i>
            </div>
            <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
              <div className="text-2xl sm:text-3xl">
                Publish a Comment
                <i className="fa-solid fa-comment ml-2"></i>
              </div>
              {apiError && (
                <h2 className="p-4 text-[1.5rem] text-red-800 rounded-lg bg-red-50 border-1 border-red-300r capitalize text-center font-normal w-11/12 mx-auto mb-2">
                  {apiError}
                </h2>
              )}
              <form
                onSubmit={handleSubmit(addComment)}
                className="w-11/12 mx-auto"
              >
                <div className="flex flex-col gap-y-4">
                  <div>
                    <input
                      type="text"
                      {...register("content")}
                      className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
                      placeholder="What's in your mind...."
                    />
                    {formState.errors.content &&
                    formState.touchedFields.content ? (
                      <div className="p-4 mt-2 text-red-800 rounded-full bg-red-50 border-1 border-red-300 ">
                        <p className="text-[1.125rem]">
                          {formState.errors.content.message}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <input value={postId} {...register("post")} type="hidden" />
                  </div>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-slate-400 via-slate-950 to-slate-400 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-1 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 cursor-pointer disabled:bg-gray-600"
                >
                  <span className="text-lg">
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin text-white"></i>
                    ) : (
                      "Publish"
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
      )}
    </>
  );
}
