import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div>
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
