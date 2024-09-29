import { KeyRound, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    axios.defaults.withCredentials = true;

    try {
      const res = await axios.post("/api/v1/user/signin", {
        email,
        password,
      });
      toast.success(res.data.message);

      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="border rounded max-w-[90vw] md:max-w-xl mx-auto p-4">
      <h1 className="text-center mb-4 text-4xl font-bold">Login Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="email"
            name="email"
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter email"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <Mail size={15} className="text-neutral-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter password"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <KeyRound size={15} className="text-neutral-500" />
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold"
        >
          Login
        </button>

        <button className=" py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold">
          Demo login
        </button>

        <p>
          Don&#39;t have an account.{" "}
          <Link to="/auth/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
