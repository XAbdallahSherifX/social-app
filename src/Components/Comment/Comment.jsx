import React from "react";
import "./Comment.module.css";
import defaultUserImage from "../../assets/istockphoto-1332100919-612x612.jpg";
export default function Comment({ comment }) {
  let { commentCreator, content, createdAt } = comment;
  return (
    <div className="mt-2 bg-slate-900 w-full rounded-xl overflow-auto">
      <div className="mx-2 my-4 p-2">
        <div className="flex items-center gap-x-2">
          {commentCreator.photo.includes(
            "https://linked-posts.routemisr.com/uploads/undefined"
          ) || commentCreator.photo ? (
            <img
              className="sm:size-14 size-10 rounded-full border-2 border-slate-900"
              src={defaultUserImage}
            />
          ) : (
            <img
              className="sm:size-14 size-10 rounded-full border-2 border-slate-900"
              src={commentCreator.photo}
            />
          )}
          <div className="grow">
            <div className="flex justify-between items-baseline">
              <h1 className="sm:text-xl text-lg font-bold">
                {commentCreator.name}
              </h1>
              <h1 className="sm:text-sm text-[0.5rem] text-gray-300 font-light">
                {new Date(createdAt).toLocaleString()}
              </h1>
            </div>
            <div className="bg-white text-black rounded-xl grow flex items-center ">
              <h1 className="text-lg min-h-7 font-normal ml-4">{content}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
