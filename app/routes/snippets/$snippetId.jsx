import { Link } from "@remix-run/react";

export default function Details({snippetId}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Details page {snippetId}</h1>
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
