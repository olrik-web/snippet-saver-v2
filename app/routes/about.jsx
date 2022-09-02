import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center m-4">About Snip Elephant</h1>
    </div>
  );
}
