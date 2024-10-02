import { Navigate, Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/admin/AdminNavbar";

import adminContext from "../../lib/globalContext";
import { useContext } from "react";

export default function AdminLayout() {
  const { admin } = useContext(adminContext);

  if (!admin) {
    return <Navigate to="/admin/auth/signup" />;
  }

  return (
    <div className="flex flex-col gap-20">
      <AdminNavbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
