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

    return json({ snippets });
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
  const [sort, setSort] = useState("date");

  const activeSortClass = "text-white font-semibold py-2 px-4 bg-blue-500";
  const sortClass = "text-gray-800 font-semibold py-2 px-4";

  // Filter the snippets based on the search term. Includes snippets that contain the search term in the title or description.
  const filteredSnippets = data.snippets.filter((snippet) => {
    return (
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort the snippets based on the sort option.
  const sortedSnippets = filteredSnippets.sort((a, b) => {
    if (sort === "title") {
      return a.title.localeCompare(b.title);
    } else if (sort === "favorite") {
      return b.favorite - a.favorite;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex flex-row gap-x-8">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">{data.snippetFolder?.name ? data.snippetFolder?.name : "All Snippets"}</h1>
          <hr className="my-4" />
          <div className="flex flex-col lg:flex-row bg-gray-200 rounded">
            <button className={sort === "title" ? activeSortClass : sortClass} onClick={() => setSort("title")}>
              Title
            </button>
            <button className={sort === "date" ? activeSortClass : sortClass} onClick={() => setSort("date")}>
              Updated At
            </button>
            <button className={sort === "favorite" ? activeSortClass : sortClass} onClick={() => setSort("favorite")}>
              Favorites
            </button>
          </div>
          {sortedSnippets.map((snippet) => (
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
