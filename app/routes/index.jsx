import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import logo from "../images/dall-e-elephant.png";

export default function Index() {
  return (
    <div>
      <Navbar />
        <div className="flex flex-col items-center justify-center">
          <img className="w-52" src={logo} alt="Logo" />
          <h1 className="text-3xl font-bold p-4">
            Save and organize your code snippets in the cloud
          </h1>
          <p className="text-xl pt-4">
            Stop Googling how to center a div. The snipping elephant lets you save
            code you find across the Web and quickly access it on all devices
          </p>
          <p className="pt-8">Get started for free</p>
          <Link to="/signup" className="bg-yellow-400 rounded-xl py-3 px-8">
            Sign up
          </Link>
        </div>
      </div>
  );
}
