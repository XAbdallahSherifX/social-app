import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import UserTokenContextProvider from "./Context/UserToken";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SinglePost from "./Components/SinglePost/SinglePost";
import { Toaster } from "react-hot-toast";
import UserDataContextProvider, {
  UserDataContext,
} from "./Context/UserDataContext";

const query = new QueryClient();
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
      {
        path: "singlePost/:id",
        element: (
          <ProtectedRoute>
            <SinglePost />
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
      <UserTokenContextProvider>
        <PostContextProvider>
          <QueryClientProvider client={query}>
            <UserDataContextProvider>
              <RouterProvider router={x}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster />
            </UserDataContextProvider>
          </QueryClientProvider>
        </PostContextProvider>
      </UserTokenContextProvider>
    </>
  );
}
