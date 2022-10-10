import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server";
import { getUserId } from "./auth.server";

//TODO: CRUD functions for snippets go here.

/*
 * This function creates a snippet document in the database and returns the snippet document.
 * It is called when the user clicks the create snippet button.
 */
export async function createSnippet({ request, title, description, snippetFolder, code, language }) {
  console.log("createSnippet called");
  // TODO: add the user id to the snippet
  // Connecting to the database
  const db = await connectDb();

  // Checking if the title is empty and returning an error message and a status code of 400 (Bad Request) if it is.
  if (!title) {
    return json({ title: { message: "Title cannot be empty.", status: 400 } });
  }
  // Checking if the language is empty and returning an error message and a status code of 400 (Bad Request) if it is.
  if (!language) {
    return json({ language: { message: "Language cannot be empty.", status: 400 } });
  }

  // Getting the user from the request and returning an error message and a status code of 400 (Bad Request) if the user is not found.
  const userId = await getUserId(request);
  if (!userId) {
    return json({ error: "User not found.", status: 400 });
  }

  // Creating the snippet document in the database
  const newSnippet = await db.models.snippets.create({
    title: title,
    description: description,
    code: code,
    language: language,
    createdBy: userId,
    snippetFolder: snippetFolder,
  });
  console.log("newSnippet", newSnippet);
  return newSnippet;
}

/*
 * This function returns the snippet document with the given id.
 */
export async function getSnippet(id) {
  // Connecting to the database
  const db = await connectDb();

  // Getting the snippet document with the given id
  const snippet = await db.models.snippets.findById(id);
  return snippet;
}

/*
 * This function returns all the snippet documents in the database.
 */
export async function getSnippets() {
  // Connecting to the database
  const db = await connectDb();

  // Getting all the snippet documents in the database
  const snippets = await db.models.snippets.find();
  return snippets;
}

/*
 * This function updates the snippet document with the given id and returns the updated snippet document.
 */
export async function updateSnippet(id, { title, description, snippetFolder }) {
  // Connecting to the database
  const db = await connectDb();

  // Getting the snippet document with the given id
  const snippet = await db.models.snippets.findById(id);

  // Updating the snippet document
  snippet.title = title;
  snippet.description = description;
  snippet.snippetFolder = snippetFolder;

  // Saving the updated snippet document
  const updatedSnippet = await snippet.save();
  return updatedSnippet;
}

/*
 * This function deletes the snippet document with the given id.
 */
export async function deleteSnippet(id) {
  // Connecting to the database
  const db = await connectDb();

  // Getting the snippet document with the given id
  const snippet = await db.models.snippets.findById(id);

  // Deleting the snippet document
  await snippet.delete();
}

/*
 * This function creates a snippet folder document in the database and returns the snippet folder document.
 */
export async function createSnippetFolder({ request, name }) {
  // Connecting to the database
  const db = await connectDb();

  // Getting the user from the request and returning an error message and a status code of 400 (Bad Request) if the user is not found.
  const userId = await getUserId(request);
  if (!userId) {
    return json({ error: "User not found.", status: 400 });
  }

  if (!name) {
    return json({ name: { message: "Name cannot be empty.", status: 400 } });
  }

  // Creating the snippet folder document in the database
  const newSnippetFolder = await db.models.snippetFolders.create({
    name,
    createdBy: userId,
  });
  return newSnippetFolder;
}
