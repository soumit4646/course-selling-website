import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </div>
  );
}
