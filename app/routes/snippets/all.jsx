import { json, redirect } from "@remix-run/node";
import connectDb from "~/db/connectDb.server";
import { useLoaderData } from "@remix-run/react";
import SnippetCard from "../../components/SnippetCard";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import { getUserId } from "../../utils/auth.server";

export async function loader({ request }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }

  const db = await connectDb();

  const snippets = await db.models.snippets.find({ createdBy: userId });
  // TODO: Get the snippet folders.
  return json({ snippets });
}

export default function SnippetIndex() {
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
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <h1 className="text-3xl font-bold">All Snippets</h1>
      <hr className="my-4" />

      {filteredSnippets.map((snippet) => (
        <SnippetCard key={snippet._id} snippet={snippet} snippetFolder={data.snippetFolder} />
      ))}
    </div>
  );
}
