import React, { useContext, useEffect, useState } from "react";
import "./Home.module.css";
import Profile from "./../Profile/Profile";
import Footer from "./../Footer/Footer";
import { PostContext } from "../../Context/PostContext";

export default function Home() {
  let { getAllPosts } = useContext(PostContext);
  const [posts, setposts] = useState([]);

  async function getPosts() {
    let res = await getAllPosts();
    if (res.length) {
      console.log(res);
      setposts(res);
    } else {
      // log error
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full mx-auto md:w-[80%] lg:w-[70%] my-12 p-6 rounded-4xl border-4 border-slate-600"
        >
          <div className="post p-4">
            <div className="mb-3 flex flex-col gap-3 ">
              <div className="flex items-center gap-4">
                <img
                  src={post.user.photo}
                  className="size-12 rounded-full border-2 border-slate-900"
                  alt=""
                />
                <span>{post.user.name}</span>
              </div>
              <p className=" text-slate-500 text-xs">{post.createdAt}</p>
            </div>
            <h3 className="line-clamp-1 mb-4">{post.body}</h3>
            {post.image && (
              <img
                src={post.image}
                className="w-full"
                alt={post.body}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
