import { ArrowRight, Clapperboard } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-white p-6 flex justify-center border-b">
      <nav className="container flex justify-between items-center">
        <div className="logo flex gap-3 items-center text-xl">
          <Clapperboard size={50} className="text-blue-400" />
        </div>
        <div className="flex gap-x-4">
          <button className="hover:bg-slate-100  px-4 py-2 rounded-md flex gap-x-2 items-center">
            <p className="text-xl">Login</p>
            <ArrowRight />
          </button>
        </div>
      </nav>
    </header>
  );
}
