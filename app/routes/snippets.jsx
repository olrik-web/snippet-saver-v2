import { json, redirect } from "@remix-run/node";
import { Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import NavigationMenu from "~/components/NavigationMenu";
import connectDb from "~/db/connectDb.server";
import { getUser } from "~/utils/auth.server";
import { createSnippetFolder } from "~/utils/snippet.server";
import SearchBar from "../components/SearchBar";

export const loader = async ({ request }) => {
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
};

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");

  try {
    return await createSnippetFolder({ request, name });
  } catch (error) {
    return json(error);
  }
}

export default function Snippets() {
  const snippetFolders = useLoaderData();
  const actionData = useActionData();
  
  return (
    <div>
      <NavigationMenu actionData={actionData} snippetFolders={snippetFolders} />
      <Navbar />
      <div className="flex flex-col ml-80 mr-8 my-4 mt-24">
        
        <div className="mx-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
