import React from "react";
import "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container px-1.5 mt-28 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
