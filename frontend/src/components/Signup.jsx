import axios from "axios";
import { KeyRound, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/api/v1/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      toast.success(res.data.message);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="border max-w-[90vw] md:max-w-xl p-4 mx-auto rounded">
      <h1 className="text-center mb-4 text-4xl font-bold">Signup Form</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="firstName"
            required
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter firstname"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <User size={15} className="text-neutral-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            name="lastName"
            required
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter lastname"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <User size={15} className="text-neutral-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            required
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
            required
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter password"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <KeyRound size={15} className="text-neutral-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            required
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Confirm password"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <KeyRound size={15} className="text-neutral-500" />
          </div>
        </div>

        <button className="py-2 px-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Signup
        </button>
        <p>
          Already have a account.{" "}
          <Link to="/auth/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
