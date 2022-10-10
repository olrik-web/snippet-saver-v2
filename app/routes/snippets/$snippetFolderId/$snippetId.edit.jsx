import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";
import { getUserId } from "~/utils/auth.server";

export async function action({ request }) {
  const body = await request.formData();

  return null;

  // TODO: Fix all of this :)

  // const postSnippit = await editSnippet(body);
  // return redirect(`/snippet/${postSnippit.id}`);
  return redirect("snippets/1");
}

// async function editSnippet(body) {
//   console.log(body);
//   return null;
// }

export async function loader({ params, request }) {
  // Get the user that is currently logged in.
  const userId = await getUserId(request);
  // If the user is not logged in, redirect them to the login page.
  if (!userId) {
    return redirect("/login");
  }

  console.log(params);
  const db = await connectDb();
  const snippets = await db.models.snippets.findById(params.snippetId);
  
  return json(snippets);
}

export default function Edit() {
  const snippet = useLoaderData();

  return (
    // TODO: Use the snippet data to populate the form. Also, add a delete button.
    // TODO: Use SnippetForm component here instead of the form below.
    <>
      <h1 className="text-3xl font-bold">Edit: {snippet.title}</h1>
      <hr className="my-4" />
      <section className="rounded-lg bg-slate-300 my-2 p-4">
        <article>
          <Form method="put">
            <label>
              <input name="title" type="text" defaultValue={snippet ? snippet.title : undefined} />
            </label>
            <label>
              <textarea name="description" defaultValue={snippet ? snippet.description : undefined}></textarea>
            </label>
            <button type="submit">Update</button>
          </Form>
          <code></code>
          <Link to={`../${snippet._id}`}>Cancel</Link>
        </article>
      </section>
    </>
  );
}
