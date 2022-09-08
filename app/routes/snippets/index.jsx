import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import data from "~/data.json";

export const loader = async () => {
  return json(data);
};

export default function SnippetIndex() {
  const snippets = useLoaderData();
  return (
    <div>
      <h2 className="text-2xl">All snippets</h2>
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <Link to={snippet.id.toString()} className="text-blue-600 underline">
              {snippet.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
