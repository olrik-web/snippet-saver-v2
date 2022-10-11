import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import SnippetForm from "~/components/SnippetForm";
import connectDb from "~/db/connectDb.server";
import { createSnippet } from "~/utils/snippet.server";
import { getUserId } from "../../../utils/auth.server";

export async function loader({ request }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }

  // Display the user's snippet folders.
  const db = await connectDb();
  const snippetFolders = await db.models.snippetFolders.find({ createdBy: userId });

  return json(snippetFolders);
}

export default function Create() {
  const actionData = useActionData();
  const snippetFolders = useLoaderData();

  return (
    <div>
      <h4 className="text-3xl font-bold">New Snippet</h4>
      <hr className="my-4" />
      <SnippetForm errors={actionData} snippetFolders={snippetFolders} />
    </div>
  );
}


export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const snippetFolder = form.get("snippetFolder");
  const code = form.get("code");
  const language = form.get("language");

  // Create the snippet and return the response.
  return await createSnippet({ request, title, description, snippetFolder, code, language });
}

export function ErrorBoundary({ error }) {
  return (
    <div className="text-red-500 text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  );
}