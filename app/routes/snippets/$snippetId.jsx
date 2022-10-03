import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { getUser } from "~/utils/auth.server";

export async function loader({ params, request }) {
  // Get the user that is currently logged in.
  const user = await getUser(request);
  // If the user is not logged in, redirect them to the login page.
  if (!user) {
    return redirect("/login");
  }

  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);
  return json(snippet);
}

export default function Details() {
  const snippet = useLoaderData();
  return (
    // TODO: Display the snippet details here (title, description, code) and add an edit button that links to the edit page. 
    // TODO: Add a delete button that deletes the snippet and redirects to the snippets page. 
    // TODO: Add a back button that links to the snippets page?
    // TODO: Add a copy button that copies the code to the clipboard. 
    <section>
      <h1 className="text-3xl font-bold">Details {snippet.title}</h1>
      <code></code>
      <Link to="edit">Edit</Link>
    </section>
  );
}
