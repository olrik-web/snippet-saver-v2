import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const body = await request.formData();
  console.log(body);

  return null;

  // TODO: Fix this

  // const postSnippit = await editSnippet(body);
  // return redirect(`/snippet/${postSnippit.id}`);
  return redirect("snippets/1");
}

// async function editSnippet(body) {
//   console.log(body);
//   return null;
// }

export async function loader({ params, request }) {
  const db = await connectDb();
  const snippets = await db.models.Snippet.findById(params.snippetId);
  return json(snippets);
}

export default function Edit() {
  const snippet = useLoaderData();

  return (
    <section>
      <article>
        <h1 className="text-3xl font-bold">Edit {snippet.title}</h1>
        <Form method="put" action={`/snippets/${snippet.id}/edit`}>
          <label>
            <input
              name="title"
              type="text"
              defaultValue={snippet ? snippet.title : undefined}
            />
          </label>
          <label>
            <textarea
              name="description"
              defaultValue={snippet ? snippet.desc : undefined}
            ></textarea>
          </label>
          <button type="submit">Update</button>
        </Form>
        <code></code>
        <Link to={`../${snippet._id}`}>Cancel</Link>
      </article>
    </section>
  );
}
