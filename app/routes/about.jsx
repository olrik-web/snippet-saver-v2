import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold">About Save Snip</h1>
      <ul>
        <li>
          <Link className="text-blue-600 underline" to="/">
            Back
          </Link>
        </li>
      </ul>
    </div>
  );
}
