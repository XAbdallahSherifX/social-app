import React, { useState } from "react";
import "./CommentOptions.module.css";
import EditComment from "./../EditComment/EditComment";
import DeleteComment from "./../DeleteComment/DeleteComment";
export default function CommentOptions({ id, content }) {
  const [optionsModalAppearance, setOptionsModalAppearance] = useState(false);
  return (
    <>
      <div
        onClick={() => setOptionsModalAppearance(true)}
        className="hover:bg-[rgba(153,161,175,0.4)] duration-100 rounded-lg flex justify-center items-center cursor-pointer relative"
      >
        <i className="fa-solid fa-ellipsis text-2xl"></i>
      </div>
      {optionsModalAppearance && (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 flex z-50 justify-center items-center w-[500px] max-sm:w-screen">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-slate-800 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <div className="text-xl sm:text-3xl">Options</div>
                <button
                  onClick={() => setOptionsModalAppearance(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                >
                  <i className="fas fa-close"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <EditComment
                  id={id}
                  content={content}
                  closeAll={setOptionsModalAppearance}
                />
                <DeleteComment id={id} closeAll={setOptionsModalAppearance} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
