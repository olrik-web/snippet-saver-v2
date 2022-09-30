import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server";



export default function SnippetIndex() {
  return (
    <div>
      <h4>snippets index</h4>
    </div>
  );
}
