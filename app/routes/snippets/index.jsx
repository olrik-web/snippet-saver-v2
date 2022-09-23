import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server";

export const loader = async () => {
 const db = await connectDb();
 const snippets = await db.models.Snippet.find();
 return json(snippets);
};

export default function SnippetIndex() {
  const snippets = useLoaderData();
  return (
    <div>
      <h2 className="text-2xl">All snippets</h2>
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet._id}>
            <Link to={snippet._id.toString()} className="text-blue-600 underline">
              {snippet.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
