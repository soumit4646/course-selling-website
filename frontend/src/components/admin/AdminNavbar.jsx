import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";

import adminContext from "../../../lib/globalContext";
import axios from "axios";

export function AdminNavbar() {
  const { admin } = useContext(adminContext);
  const navigate = useNavigate();
  return (
    <header className="bg-white p-6 flex justify-center border-b">
      <nav className="container flex justify-between items-center">
        <div className="logo flex gap-3 items-center text-xl">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {admin && (
          <div className="flex gap-10">
            <Link
              to={"/admin"}
              className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <p className="text-xl">Go Home</p>
            </Link>

            <Link
              to={"/admin/create"}
              className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <p className="text-xl">Create Course</p>
            </Link>
          </div>
        )}

        {admin ? (
          <div className="flex gap-x-4 text-white">
            <button
              className="bg-red-500 hover:bg-red-700  px-4 py-2 rounded-md flex gap-x-2 items-center"
              onClick={async () => {
                try {
                  const res = await axios.get("/api/v1/admin/logout");
                  navigate(0);
                } catch (error) {}
              }}
            >
              <p className="text-xl ">Logout</p>
              <ArrowRight />
            </button>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <Link
              to="/admin/auth/signup"
              className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <p className="text-xl">Signup</p>
              <ArrowRight />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
