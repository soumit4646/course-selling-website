import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import Signup from "./components/Signup";

export default function App() {
  return (
    <div>
      <Navbar />
      <Signup />
      <Login />
    </div>
  );
}
