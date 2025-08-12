import React from "react";
import "./UserPosts.module.css";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Comment from "./../Comment/Comment";
import CreateComment from "./../CreateComment/CreateComment";
import toast from "react-hot-toast";
import CreatePost from "../CreatePost/CreatePost";
import PostOptions from "./../PostOptions/PostOptions";
export default function UserPosts({ id }) {
  const queryClient = useQueryClient();
  const getUserPost = () =>
    axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: { token: localStorage.getItem("userToken") },
    });
  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["getUserPost"],
    queryFn: getUserPost,
  });
  async function deletePost(postid) {
    try {
      let res = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postid}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
    } catch (err) {
      toast.error("can't delete this post");
    }
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="p-4 text-2xl w-full sm:w-1/2 text-center mx-auto text-red-800 rounded-lg bg-red-50 border-1 border-red-300">
          {error.message}
        </h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="pt-14">
        <div className="w-full mx-auto md:w-[70%] lg:w-[50%] my-12 py-6 px-3.5 rounded-xl animate-pulse bg-radial from-cyan-800 to-cyan-900">
          <div className="post">
            <div className="mb-3">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <span className="flex justify-center items-center bg-gray-300 rounded-full w-12 h-12 "></span>
                </div>
                <div className="ml-4 mt-2 w-full">
                  <h3 className="h-3 bg-gray-300 rounded-full w-48 mb-4"></h3>
                  <p className="h-2 bg-gray-300 rounded-full w-32 mb-2.5"></p>
                </div>
              </div>
            </div>
            <>
              <h3 className="h-3 bg-gray-300 rounded-full w-full mb-4"></h3>
              <div className="animate-pulse w-full bg-gray-300 h-96 rounded-lg mb-5 flex justify-center items-center">
                <svg
                  className="w-8 h-8 stroke-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z"
                    stroke="stroke-current"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-xl">
                <div className="flex-shrink-0">
                  <span className="flex justify-center items-center bg-gray-300 rounded-full w-12 h-12 "></span>
                </div>
                <div className="ml-4 mt-2 w-full">
                  <h3 className="h-3 bg-gray-300 rounded-full w-24 mb-4"></h3>
                  <p className="h-2 bg-gray-300 rounded-full w-32 sm:w-52 mb-2.5"></p>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <CreatePost />
      {data?.data?.posts.map((post) => (
        <div
          key={post.id}
          className="w-full mx-auto md:w-[70%] lg:w-[50%] my-12 py-6 px-3.5 rounded-xl bg-radial from-cyan-800 to-cyan-900 text-white"
        >
          <div className="post">
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={post.user.photo}
                    className="size-14 rounded-full border-2 bg-white border-slate-900"
                    alt={post.user.photo}
                  />
                  <div>
                    <span className="text-lg font-[600]">{post.user.name}</span>
                    <p className=" text-slate-300 text-xs">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <PostOptions
                  id={post._id}
                  body={post.body}
                  image={post.image}
                />
              </div>
            </div>
            {post.image ? (
              <>
                <h3 className="mb-4 text-lg sm:text-xl">{post.body}</h3>
                <Link to={`/singlePost/${post.id}`}>
                  <img
                    src={post.image}
                    className="w-full object-cover bg-white max-h-[500px] border-[2px] border-slate-400 rounded-xl"
                    alt={post.body}
                  />
                </Link>
              </>
            ) : (
              <h3 className="mt-4">{post.body}</h3>
            )}
            {post?.comments.length > 0 && (
              <>
                <Comment comment={post?.comments[0]} postCreatorId={post.user._id} />
              </>
            )}
          </div>
          <CreateComment postId={post?.id} />
        </div>
      ))}
    </div>
  );
}
