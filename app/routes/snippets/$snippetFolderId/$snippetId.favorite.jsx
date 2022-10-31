import { redirect } from "@remix-run/node";
import { updateSnippetFavorite } from "~/utils/snippet.server";
import { getUserId } from "../../../utils/auth.server";

export async function action({ request, params }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }
  // Refresh the page. Maybe add Form?
  await updateSnippetFavorite(params.snippetId);
  return redirect("/snippets/" + params.snippetFolderId);
}

export function ErrorBoundary({ error }) {
  return (
    <div className="text-red-500 text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
