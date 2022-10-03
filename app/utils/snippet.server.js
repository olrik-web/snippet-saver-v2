import connectDb from "~/db/connectDb.server";

//TODO: CRUD functions for snippets go here. 

/*
 * This function creates a snippet document in the database and returns the snippet document.
 * It is called when the user clicks the create snippet button.
 */
export async function createSnippet({ title, desc }) {
  // TODO: validate the title and desc and throw an error if they are not valid
  // TODO: add the user id to the snippet
  // Connecting to the database
  const db = await connectDb();

  // Creating the snippet document in the database
  const newSnippet = await db.models.Snippet.create({
    title: title,
    desc: desc,
  });
  return newSnippet;
}
