import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../../lib/globalContext";
import { Navbar } from "../components/Navbar";

export default function HomeLayout() {
  const { user } = useContext(userContext);

  if (user === "") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex flex-col gap-20">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
