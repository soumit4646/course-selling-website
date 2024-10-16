import { useEffect, useState } from "react";
import axios from "axios";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminAuthLayout from "./layouts/AdminAuthLayout";

import userContext from "../lib/globalContext";

import AllCourses, { loader as AllCoursesLoader } from "./components/AllCourses";
import UserProfile, { loader as LoadUserProfile, action as UserProfileAction } from "./components/user/UserProfile";
import CoursePage, { loader as CourseLoader } from "./components/course/CoursePage";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Page404 from "./components/404";
import AdminSignup from "./components/admin/AdminSignup";
import AdminSignin from "./components/admin/AdminSignin";
import CreateCourse from "./components/admin/CreateCourse";
import AllCourse from "./components/admin/AllCourse";
import EditCoursePage from "./components/admin/EditCoursePage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <Page404 />,
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
    errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: <Navigate to="/all-courses" />,
      },
      {
        path: "/all-courses",
        element: <AllCourses />,
        loader: AllCoursesLoader,
      },
      {
        path: "/profile",
        element: <UserProfile />,
        loader: LoadUserProfile,
        action: UserProfileAction,
      },
      {
        path: "/course/:courseId",
        element: <CoursePage />,
        loader: CourseLoader,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <Page404 />,

    children: [
      {
        path: "/admin",
        element: <AllCourse />,
      },
      {
        path: "/admin/create",
        element: <CreateCourse />,
      },
      {
        path: "/admin/course/:courseId",
        element: <EditCoursePage />,
      },
    ],
  },
  {
    path: "/admin/auth",
    element: <AdminAuthLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/admin/auth/signup",
        element: <AdminSignup />,
      },
      {
        path: "/admin/auth/signin",
        element: <AdminSignin />,
      },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/user/me");
      setUser(res.data.user);
    } catch (error) {
      setUser("");
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await axios.get("/api/v1/admin/me");
      setAdmin(res.data.admin);
    } catch (error) {
      setAdmin("");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAdmin();
  }, []);

  if (user === null || admin === null) {
    return <div></div>;
  }

  return (
    <userContext.Provider value={{ user, admin }}>
        <div>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </div>
    </userContext.Provider>
  );
}
