import React from "react";
import "./NotFound.module.css";
import error from "../../assets/404 Error Page not Found with people connecting a plug-amico.png";
export default function NotFound() {
  return (
    <div className="w-full mt-20 flex justify-center">
      <img src={error} className="max-sm:w-[320px] w-[600px]" alt="" />
    </div>
  );
}
