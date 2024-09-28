import { KeyRound, Mail, User } from "lucide-react";

export default function Signup() {
  return (
    <div className="border max-w-md p-4 mt-20 ml-20">
      <h1 className="text-center mb-4 text-3xl">Signup Form</h1>
      <form className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Enter name"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <User size={15} className="text-neutral-500" />
          </div>
        </div>

        <div className="relative">
          <input
            type="email"
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
            className="py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm outline-blue-500"
            placeholder="Confirm password"
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-4">
            <KeyRound size={15} className="text-neutral-500" />
          </div>
        </div>

        <button className="py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600">
          Signup
        </button>
        <p>
          Already have a account,{" "}
          <a href="" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
