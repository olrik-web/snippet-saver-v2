import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import SnippetFolderCard from "~/components/SnippetCard";
import connectDb from "~/db/connectDb.server";
import { getUser } from "~/utils/auth.server";
import SearchBar from "../../components/SearchBar";

export async function loader({ params, request }) {
  // Get the user that is currently logged in.
  const user = await getUser(request);
  // If the user is not logged in, redirect them to the login page.
  if (!user) {
    return redirect("/login");
  }

  const db = await connectDb();
  const snippets = await db.models.Snippet.find({ snippetFolder: params.snippetFolderId });
  const snippetFolder = await db.models.SnippetFolder.findById(params.snippetFolderId);
  return json({ snippets, snippetFolder });
}

export default function Details() {
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the snippets based on the search term. Includes snippets that contain the search term in the title or description.
  const filteredSnippets = data.snippets.filter((snippet) => {
    return (
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    // TODO: Add a delete button that deletes the snippet and redirects to the snippets page.
    // TODO: Add a copy button that copies the code to the clipboard.
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <h1 className="text-3xl font-bold">{data.snippetFolder.name}</h1>
      <div className="flex flex-row gap-x-8">
        <div>
          {filteredSnippets.map((snippet) => (
            <SnippetFolderCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
}
