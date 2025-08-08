import React from "react";
import "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
export default function Layout() {
  return (
    <>
      <div className="bg-slate-950 min-h-screen selection:bg-slate-300 selection:text-slate-700 overflow-auto">
        <Navbar />
        <div className="container px-1.5 mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
