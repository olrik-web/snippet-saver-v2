import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import SnippetCard from "~/components/SnippetCard";
import connectDb from "~/db/connectDb.server";
import SearchBar from "../../components/SearchBar";
import { getUserId } from "../../utils/auth.server";

export async function loader({ params, request }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }

  const db = await connectDb();
  if (params.snippetFolderId === "all") {
    // Display all of the user's snippets.
    const snippets = await db.models.snippets.find({ createdBy: userId });

    return json({snippets});
  } else {
    // Display the user's snippets in the specified snippet folder.
    const snippets = await db.models.snippets.find({ snippetFolder: params.snippetFolderId });
    const snippetFolder = await db.models.snippetFolders.findById(params.snippetFolderId);
    return json({ snippets, snippetFolder });
  }
}

export default function Details() {
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the snippets based on the search term. Includes snippets that contain the search term in the title or description.
  const filteredSnippets = data.snippets.filter((snippet) => {
    return (
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    // TODO: Add a delete button that deletes the snippet and redirects to the snippets page.
    // TODO: Add a copy button that copies the code to the clipboard.
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex flex-row gap-x-8">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">{data.snippetFolder?.name ? data.snippetFolder?.name : "All Snippets"}</h1>
          <hr className="my-4" />
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} snippetFolder={data?.snippetFolder} />
          ))}
        </div>
        <div className="w-1/2 h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
