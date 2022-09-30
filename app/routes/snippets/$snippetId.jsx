import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";

export async function loader({ params, request }) {
  const db = await connectDb();
  const snippets = await db.models.Snippet.findById(params.snippetId);
  return json(snippets);
}

export default function Details() {
  const snippet = useLoaderData();
  return (
    <section>
      <h1 className="text-3xl font-bold">Details {snippet.title}</h1>
      <code></code>
      <Link to="edit">Edit</Link>
    </section>
  );
}
