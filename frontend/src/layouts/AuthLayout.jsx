import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useContext } from "react";
import userContext from "../../lib/globalContext";

export default function AuthLayout() {
  let { pathname } = useLocation();
  const { user } = useContext(userContext);

  if (user) {
    return <Navigate to={"/"} />;
  }

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
