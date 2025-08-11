import React, { useState } from "react";
import "./CreateComment.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export default function CreateComment({ postId }) {
  const [commentModalAppearance, setCommentModalAppearance] = useState(false);
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let myQuery = useQueryClient()
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
        if (res.data.message === "success") {
          setisLoading(false);
          setCommentModalAppearance(false);
          toast.success("Comment is published successfully !");
          myQuery.invalidateQueries(["getUserPost"])
        }
      })
      .catch((err) => {
        setisLoading(false);
        toast.error("Can not publish this comment");
      });
  }
  return (
    <>
      <div>
        <button
          onClick={() => setCommentModalAppearance(true)}
          className="sm:py-4 sm:px-8 sm:text-xl py-2 px-4 text-lg w-full mt-3 bg-sky-400 h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          type="button"
        >
          Add Comment
        </button>
        {commentModalAppearance && (
          <div className="fixed top-1/2 left-1/2 -translate-1/2 flex z-50 justify-center items-center w-[500px] max-sm:w-screen">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-slate-800 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                  <div className="text-xl sm:text-3xl">
                    Publish a Comment
                    <i className="fa-solid fa-comment ml-2"></i>
                  </div>
                  <button
                    onClick={() => setCommentModalAppearance(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                  >
                    <i className="fas fa-close"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(addComment)}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        {...register("content")}
                        className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-sky-500 focus:outline-sky-700 focus:outline-3"
                        placeholder="What's in your mind..."
                      />
                    </div>
                    <div>
                      <input
                        value={postId}
                        {...register("post")}
                        type="hidden"
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
