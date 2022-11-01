import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SnippetCard from "~/components/SnippetCard";
import connectDb from "~/db/connectDb.server";
import { getUserId } from "~/utils/auth.server";

export async function loader({ params, request }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }

  // Find the snippet using the snippetId from the URL.
  const db = await connectDb();
  const snippet = await db.models.snippets.findById(params.snippetId);
  return json(snippet);
}

export default function Details() {
  const snippet = useLoaderData();
  return (
    <>
      <h1 className="text-3xl font-bold">{snippet.title}</h1>
      <hr className="my-4" />
      <SnippetCard key={snippet._id} snippet={snippet} details={true} />
    </>
  );
}
