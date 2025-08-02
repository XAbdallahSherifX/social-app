import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";

const x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
          <CounterContextProvider>
            <RouterProvider router={x}></RouterProvider>
          </CounterContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  );
}
