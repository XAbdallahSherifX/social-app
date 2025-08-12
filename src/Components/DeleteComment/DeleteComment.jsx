import React, { useState } from "react";
import "./DeleteComment.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
export default function DeleteComment({ closeAll, id }) {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let myQuery = useQueryClient();
  let location = useLocation();
  let navigate = useNavigate();
  function deleteComment() {
    setIsLoading(true);
    axios
      .delete(`https://linked-posts.routemisr.com/comments/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        closeAll(false);
        toast.success("Comment is deleted successfully");
        myQuery.invalidateQueries(["getPosts", "getUserPost", "getSinglePost"]);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Can not delete this comment");
      });
  }
  return (
    <>
      <button
        onClick={() => setDeleteConfirmationModal(true)}
        className="py-4 px-8 text-xl w-full mt-3 bg-red-600 flex items-baseline gap-x-2 justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        type="button"
      >
        <span>Delete Comment</span>
        <i className="fa-solid fa-trash"></i>
      </button>
      {deleteConfirmationModal && (
        <div className="fixed top-1/2 left-1/2 -translate-1/2 flex z-50 justify-center items-center w-[500px] max-sm:w-screen">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-slate-800 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <div className="text-xl sm:text-3xl">Delete Comment</div>
                <button
                  onClick={() => setDeleteConfirmationModal(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                >
                  <i className="fas fa-close"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <button
                  disabled={isLoading}
                  onClick={() => deleteComment()}
                  className="py-4 px-8 text-xl w-full mt-3 bg-red-600 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] disabled:before:bg-red-600 disabled:cursor-no-drop"
                  type="button"
                >
                  <span>
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin text-white"></i>
                    ) : (
                      <>
                        Confirm
                        <i className="fa-solid text-sm ml-1 fa-trash"></i>
                      </>
                    )}
                  </span>
                </button>
                <button
                  onClick={() => setDeleteConfirmationModal(false)}
                  className="py-4 px-8 text-xl w-full mt-3 bg-gray-600 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-300  shadow-md hover:-translate-y-0 active:translate-y-1 hover:shadow-lg before:absolute  before:top-0 before:-left-full before:w-full before:h-full before:bg-slate-200 hover:text-black font-bold before:transition-all before:duration-300  before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
