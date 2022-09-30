//TODO: create, read, update and delete snippets

import connectDb from "~/db/connectDb.server";

export async function createSnippet({ title, desc }) {
  const db = await connectDb();

  // Creating the snippet document
  const newSnippet = await db.models.Snippet.create({
    title: title,
    desc: desc,
  });
  return newSnippet;
}
