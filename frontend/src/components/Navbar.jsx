import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Clapperboard, LogOut } from "lucide-react";

import userContext from "../../lib/globalContext";

export function Navbar() {
  const { user } = useContext(userContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <header className="bg-white p-6 flex justify-center border-b">
      <nav className="container flex justify-between items-center">
        <div className="logo flex gap-3 items-center text-xl">
          <Clapperboard size={50} className="text-blue-400" />
        </div>
        {user && (
          <div className="flex gap-10">
            <Link
              to={"/all-courses"}
              className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <p className="text-xl">All Courses</p>
            </Link>

            <Link
              to={"/profile"}
              className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <p className="text-xl">Profile</p>
            </Link>
          </div>
        )}

        <div className="flex gap-x-4">
          {user ? (
            <button
              onClick={async () => {
                try {
                  await axios.get("/api/v1/user/logout");
                  document.location.reload();
                } catch (error) {}
              }}
              className="bg-red-600 hover:bg-red-700  px-4 py-2 rounded-md flex gap-x-2 items-center text-white"
            >
              <p className="text-xl ">Logout</p>
              <LogOut />
            </button>
          ) : (
            <div className="flex">
              <Link
                to="/admin"
                className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
              >
                <p className="text-xl">Admin Site</p>
              </Link>

              <Link
                to="/auth/signup"
                className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center"
              >
                <p className="text-xl">Signup</p>
                <ArrowRight />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
