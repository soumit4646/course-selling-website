import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function AuthLayout() {
  let { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-20">
      <Navbar />
      <div className="container mx-auto">
        {pathname !== "/auth/login" && pathname !== "/auth/signup" ? (
          <Navigate to={"/auth/login"} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
