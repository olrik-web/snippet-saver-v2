import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import data from "~/data.json";

export function loader({ params, request }) {
  const snippet = data.find((snippet) => snippet.id == params.snippetId);
  return json(snippet);
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
