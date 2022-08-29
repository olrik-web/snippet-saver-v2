import { Link } from "@remix-run/react";

export default function Create() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Create</h1>
      <ul>
        <li>
          <Link className="text-blue-600 underline" to="/snippets">
            Back
          </Link>
        </li>
      </ul>
    </div>
  );
}
