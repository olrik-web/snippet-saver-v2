import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import logo from "../images/dall-e-elephant.png";

export default function Index() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-24">
        <img className="w-52" src={logo} alt="Logo" />
        <h1 className="text-3xl font-bold p-4">Save and organize your code snippets in the cloud</h1>
        <p className="text-xl pt-4">
          Snip Elephant lets you save code you find across the Web and quickly access it on all devices
        </p>
        <p className="py-8">Get started for free</p>
        <span>
          <button className="rounded-xl mt-2 bg-blue-600 outline outline-blue-600 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out transform hover:bg-blue-400 hover:outline-blue-400 hover:-translate-y-1">
            <Link to="/login">Log in</Link>
          </button>
          <span className="px-4">or</span>
          <button className="rounded-xl mt-2 outline outline-blue-400 px-3 py-2 text-black font-semibold transition duration-300 ease-in-out transform hover:outline-blue-200 hover:-translate-y-1">
            <Link to="/signup">Sign up</Link>
          </button>
        </span>
      </div>
    </div>
  );
}
