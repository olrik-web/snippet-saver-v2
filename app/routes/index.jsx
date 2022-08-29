import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Remix</h1>
      <ul>
        <li>
          <Link className="text-blue-600 underline" to="/about">
            About Save Snip
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" to="/snippets">
            Snippets
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}
