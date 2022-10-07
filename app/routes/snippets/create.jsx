import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import SnippetForm from "~/components/SnippetForm";
import connectDb from "~/db/connectDb.server";
import { getUser } from "~/utils/auth.server";
import { createSnippet } from "~/utils/snippet.server";
import SearchBar from "../../components/SearchBar";

export async function action({ request }) {
  const form = await request.formData();
  const title = form.get("title");
  const desc = form.get("desc");
  const snippetFolder = form.get("snippetFolder");

  try {
    return await createSnippet({ request, title, desc, snippetFolder });
  } catch (error) {
    return json(error);
  }
}

export async function loader({ request }) {
  // Get the user that is currently logged in.
  const user = await getUser(request);
  // If the user is not logged in, redirect them to the login page.
  if (!user) {
    return redirect("/login");
  }

  // Display the user's snippet folders.
  const db = await connectDb();
  const snippetFolders = await db.models.snippetFolders.find({ createdBy: user._id });

  return json(snippetFolders);
}

export default function Create() {
  const actionData = useActionData();
  const snippetFolders = useLoaderData();

  return (
    <div>
      <SearchBar disabled={true} />
      <h4 className="text-2xl font-bold text-center">New Snippet</h4>
      <hr className="my-4" />
      <SnippetForm errors={actionData} action="/snippets/create" snippetFolders={snippetFolders} />
    </div>
  );
}
